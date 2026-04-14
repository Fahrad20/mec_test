import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useThemeTokens } from '../../hooks/useThemeTokens';
import { usePostCardSkeletonStyles } from './styles';

export const PostCardSkeleton = observer(() => {
  const tokens = useThemeTokens();
  const styles = usePostCardSkeletonStyles(tokens);
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={[styles.avatar, { opacity }]} />
        <View style={styles.headerText}>
          <Animated.View style={[styles.titleSkeleton, { opacity }]} />
          <Animated.View style={[styles.subtitleSkeleton, { opacity }]} />
        </View>
      </View>
      <Animated.View style={[styles.imageSkeleton, { opacity }]} />
      <View style={styles.footer}>
        <Animated.View style={[styles.actionSkeleton, { opacity }]} />
        <Animated.View style={[styles.actionSkeleton, { opacity }]} />
      </View>
    </View>
  );
});
