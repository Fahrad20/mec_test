import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { appendCommentToCache, useComments, useSendComment } from '../../src/api/comments';
import { usePostDetail } from '../../src/api/posts';
import { CommentInput } from '../../src/components/PostDetail/CommentInput';
import { CommentItem } from '../../src/components/PostDetail/CommentList';
import { PostDetailHeader } from '../../src/components/PostDetail/Header';
import { LikeButton } from '../../src/components/PostDetail/LikeButton';
import { useThemeTokens } from '../../src/hooks/useThemeTokens';
import { postStore } from '../../src/stores/postStore';
import { realtimeStore } from '../../src/stores/realtimeStore';
import { Comment } from '../../src/types/api';
import { usePostDetailStyles } from './[id].styles';

export default observer(function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const tokens = useThemeTokens();
  const queryClient = useQueryClient();
  const postId = id ?? '';

  // ─── Data fetching ─────────────────────────────────────────────
  const { data: postData, isLoading: isPostLoading, isError: isPostError } = usePostDetail(postId);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useComments(postId);

  const sendCommentMutation = useSendComment(postId);

  const post = postData?.post;

  // Initialize postStore from detail data
  useEffect(() => {
    if (post) {
      postStore.initFromPost(post);
    }
  }, [post]);

  // ─── WebSocket ──────────────────────────────────────────────────
  useEffect(() => {
    if (!postId) return;

    realtimeStore.connect(postId, {
      onNewComment: (comment: Comment) => {
        appendCommentToCache(queryClient, postId, comment);
      },
    });

    return () => {
      realtimeStore.disconnect();
    };
  }, [postId, queryClient]);

  // ─── Comments ────────────────────────────────────────────────────
  const allComments = useMemo(
    () => commentsData?.pages.flatMap((page) => page.comments) ?? [],
    [commentsData],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSendComment = useCallback(
    (text: string) => {
      sendCommentMutation.mutate(text);
    },
    [sendCommentMutation],
  );

  const renderComment = useCallback(
    ({ item }: { item: Comment }) => <CommentItem comment={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Comment) => item.id, []);

  // ─── Styles ──────────────────────────────────────────────────────
  const styles = usePostDetailStyles(tokens);

  // ─── Loading / Error ─────────────────────────────────────────────
  if (isPostLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={tokens.colors.primary} />
      </View>
    );
  }

  if (isPostError || !post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('error.title')}</Text>
      </View>
    );
  }

  // ─── List Header (Hero + Content + Actions + Comments heading) ─────
  const ListHeader = () => (
    <>
      {post.coverUrl && (
        <Image
          source={{ uri: post.coverUrl }}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
        />
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        {post.tier === 'paid' && !post.body ? (
          <Text style={styles.paidNotice}>{t('postDetail.paidContent')}</Text>
        ) : (
          <Text style={styles.body}>{post.body}</Text>
        )}
      </View>

      <View style={styles.actionsRow}>
        <LikeButton post={post} />
        <View style={styles.commentsBadge}>
          <Image
            source={require('../../assets/icons/comment_icon.svg')}
            style={styles.commentsBadgeIcon}
            contentFit="contain"
          />
          <Text style={styles.commentsBadgeText}>{post.commentsCount}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{t('postDetail.comments')}</Text>
    </>
  );

  // ─── List Empty Component ─────────────────────────────────────────
  const ListEmpty = () => {
    if (isCommentsLoading) {
      return (
        <View style={styles.emptyComments}>
          <ActivityIndicator color={tokens.colors.primary} />
        </View>
      );
    }
    if (isCommentsError) {
      return (
        <View style={styles.emptyComments}>
          <Text style={styles.emptyCommentsText}>{t('postDetail.errorComments')}</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyComments}>
        <Text style={styles.emptyCommentsText}>{t('postDetail.noComments')}</Text>
      </View>
    );
  };

  // ─── Render ───────────────────────────────────────────────────────
  const wsStatus = realtimeStore.status;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View style={styles.screen}>
        <PostDetailHeader author={post.author} />

        {(wsStatus === 'connecting' || wsStatus === 'disconnected') && (
          <View style={styles.wsIndicator}>
            {wsStatus === 'connecting' && <ActivityIndicator size="small" color="#FFFFFF" />}
            <Text style={styles.wsText}>
              {wsStatus === 'connecting' ? t('ws.connecting') : t('ws.reconnecting')}
            </Text>
          </View>
        )}

        <FlatList
          data={allComments}
          keyExtractor={keyExtractor}
          renderItem={renderComment}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                color={tokens.colors.primary}
                style={{ paddingVertical: tokens.spacing.md }}
              />
            ) : null
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />

        <CommentInput onSend={handleSendComment} isSubmitting={sendCommentMutation.isPending} />
      </View>
    </KeyboardAvoidingView>
  );
});
