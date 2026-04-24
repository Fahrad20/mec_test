import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useThemeTokens } from '../../hooks/useThemeTokens';
import { useFeedFooterLoaderStyles } from './styles';
import { PulsingDotProps } from './types';

const DOT_COUNT = 3;
const ANIMATION_DURATION = 400;
const DOT_DELAY = 150;

export const FeedFooterLoader = observer(() => {
  const tokens = useThemeTokens();
  const styles = useFeedFooterLoaderStyles(tokens);

  return (
    <View style={styles.container}>
      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <PulsingDot key={i} delay={i * DOT_DELAY} dotStyle={styles.dot} />
      ))}
    </View>
  );
});

const PulsingDot = ({ delay, dotStyle }: PulsingDotProps) => {
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: ANIMATION_DURATION }),
          withTiming(0.6, { duration: ANIMATION_DURATION }),
        ),
        -1,
        false,
      ),
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: ANIMATION_DURATION }),
          withTiming(0.3, { duration: ANIMATION_DURATION }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[dotStyle, animatedStyle]} />;
};
