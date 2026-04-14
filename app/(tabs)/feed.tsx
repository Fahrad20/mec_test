import * as Haptics from 'expo-haptics';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorBanner } from '../../src/components/ErrorBanner';
import { FeedFooterLoader } from '../../src/components/FeedFooterLoader';
import { PostCard } from '../../src/components/PostCard';
import { PostCardSkeleton } from '../../src/components/PostCardSkeleton';
import { useFeed } from '../../src/hooks/useFeed';
import { useThemeTokens } from '../../src/hooks/useThemeTokens';
import { feedStore } from '../../src/stores/feedStore';
import { themeStore } from '../../src/stores/themeStore';
import { Post } from '../../src/types/post';

export default observer(function FeedScreen() {
  const { i18n } = useTranslation();
  const tokens = useThemeTokens();
  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed();

  // --- Easter egg: multi-tap + hold ---
  const tapCountRef = useRef(0);
  const lastTapRef = useRef(0);
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePressIn = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 400) {
      tapCountRef.current += 1;

      // 2 taps + hold → switch language
      if (tapCountRef.current === 2) {
        holdTimeoutRef.current = setTimeout(() => {
          const newLang = i18n.language === 'ru' ? 'en' : 'ru';
          i18n.changeLanguage(newLang);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          tapCountRef.current = 0;
        }, 3000);
      }

      // 3 taps + hold → switch theme
      if (tapCountRef.current === 3) {
        // Cancel the pending language switch from 2-tap
        if (holdTimeoutRef.current) {
          clearTimeout(holdTimeoutRef.current);
        }
        holdTimeoutRef.current = setTimeout(() => {
          themeStore.toggle();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          tapCountRef.current = 0;
        }, 3000);
      }
    } else {
      tapCountRef.current = 1;
    }
    lastTapRef.current = now;
  }, [i18n]);

  const handlePressOut = useCallback(() => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (data?.pages) {
      const allPosts = data.pages.flatMap((page) => page.posts);
      feedStore.initFromPosts(allPosts);
    }
  }, [data]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    feedStore.reset();
    refetch();
  }, [refetch]);

  const renderItem = useCallback(({ item }: { item: Post }) => <PostCard post={item} />, []);

  const keyExtractor = useCallback((item: Post) => item.id, []);

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return <FeedFooterLoader />;
    }
    return null;
  }, [isFetchingNextPage]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: tokens.colors.background,
        },
        listContent: {
          padding: tokens.spacing.md,
        },
        easterEggArea: {
          position: 'absolute',
          top: 50,
          left: 20,
          width: 60,
          height: 60,
          zIndex: 999,
        },
      }),
    [tokens],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.listContent}>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return <ErrorBanner onRetry={refetch} />;
  }

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={handleRefresh}
            tintColor={tokens.colors.primary}
            colors={[tokens.colors.primary]}
          />
        }
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        windowSize={7}
        initialNumToRender={5}
      />

      <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={styles.easterEggArea} />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
});
