import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useThemeTokens } from '../../hooks/useThemeTokens';
import { feedStore } from '../../stores/feedStore';
import { Post } from '../../types/post';
import { LockedPostOverlay } from '../LockedPostOverlay';
import { usePostCardStyles } from './styles';

type PostCardProps = {
  post: Post;
};

export const PostCard = observer(({ post }: PostCardProps) => {
  const tokens = useThemeTokens();
  const styles = usePostCardStyles(tokens);
  const likeState = feedStore.getLikeState(post.id, post);
  const { isLiked, likesCount } = likeState;

  const likeScale = useSharedValue(1);

  const handleLike = useCallback(() => {
    likeScale.value = withSequence(
      withTiming(1.4, { duration: 120 }),
      withSpring(1, { damping: 6, stiffness: 200 }),
    );

    feedStore.toggleLike(post.id);
  }, [post.id, likeScale]);

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const renderAvatar = () => {
    if (post.author.avatarUrl) {
      return (
        <Image
          source={{ uri: post.author.avatarUrl }}
          style={styles.avatar}
          recyclingKey={post.author.id}
        />
      );
    }
    const initials = post.author.displayName
      ? post.author.displayName.substring(0, 2).toUpperCase()
      : '??';
    return (
      <View style={[styles.avatar, styles.initialsContainer]}>
        <Text style={styles.initialsText}>{initials}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {renderAvatar()}
        <View style={styles.headerText}>
          <Text style={styles.authorName} numberOfLines={1}>
            {post.author.displayName || post.author.username}
          </Text>
        </View>
      </View>

      {post.title ? <Text style={styles.title}>{post.title}</Text> : null}

      <View style={styles.contentContainer}>
        {post.coverUrl ? (
          <Image
            source={{ uri: post.coverUrl }}
            style={styles.coverImage}
            contentFit="cover"
            recyclingKey={post.id}
            transition={200}
          />
        ) : null}

        {post.tier === 'paid' ? (
          <View style={styles.lockedContainer}>
            {!post.coverUrl && <View style={styles.coverImagePlaceholder} />}
            <LockedPostOverlay />
          </View>
        ) : post.preview ? (
          <Text style={styles.preview} numberOfLines={4}>
            {post.preview}
          </Text>
        ) : null}
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.badge, isLiked && styles.badgeLiked]}
          onPress={handleLike}
          hitSlop={8}
        >
          <Animated.View style={likeAnimatedStyle}>
            <Image
              source={
                isLiked
                  ? require('../../../assets/icons/favorite_filled_icon.svg')
                  : require('../../../assets/icons/favorite_icon.svg')
              }
              style={[styles.icon, isLiked && styles.iconLiked]}
              contentFit="contain"
            />
          </Animated.View>
          <Text style={[styles.badgeText, isLiked && styles.badgeTextLiked]}>{likesCount}</Text>
        </Pressable>

        <View style={styles.badge}>
          <Image
            source={require('../../../assets/icons/comment_icon.svg')}
            style={styles.icon}
            contentFit="contain"
          />
          <Text style={styles.badgeText}>{post.commentsCount}</Text>
        </View>
      </View>
    </View>
  );
});
