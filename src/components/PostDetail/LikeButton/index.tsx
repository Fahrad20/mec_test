import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useThemeTokens } from '../../../hooks/useThemeTokens';
import { postStore } from '../../../stores/postStore';
import { useLikeButtonStyles } from './styles';
import { LikeButtonProps } from './types';

export const LikeButton = observer(({ post }: LikeButtonProps) => {
  const tokens = useThemeTokens();
  const likeState = postStore.getLikeState(post.id, post);
  const { isLiked, likesCount } = likeState;
  const styles = useLikeButtonStyles(tokens);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(async () => {
    scale.value = withSpring(1.4, { damping: 6, stiffness: 200 }, () => {
      scale.value = withSpring(1, { damping: 8, stiffness: 250 });
    });

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    postStore.toggleLike(post.id);
  }, [post.id, scale]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, isLiked && styles.containerLiked]}
      hitSlop={8}
    >
      <Animated.View style={animatedStyle}>
        <Image
          source={
            isLiked
              ? require('../../../../assets/icons/favorite_filled_icon.svg')
              : require('../../../../assets/icons/favorite_icon.svg')
          }
          style={[styles.icon, isLiked && styles.iconLiked]}
          contentFit="contain"
        />
      </Animated.View>
      <Text style={[styles.count, isLiked && styles.countLiked]}>{likesCount}</Text>
    </Pressable>
  );
});
