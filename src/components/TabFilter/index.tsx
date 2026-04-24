import { observer } from 'mobx-react-lite';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useThemeTokens } from '../../hooks/useThemeTokens';
import { useTabFilterStyles } from './styles';

import { TabFilterProps, TabPillProps } from './types';
export * from './types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const TabFilter = observer(({ tabs, activeKey, onTabPress }: TabFilterProps) => {
  const tokens = useThemeTokens();
  const styles = useTabFilterStyles(tokens);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TabPill
          key={tab.key}
          label={tab.label}
          isActive={tab.key === activeKey}
          onPress={() => onTabPress(tab.key)}
          tokens={tokens}
        />
      ))}
    </View>
  );
});

const TabPill = ({ label, isActive, onPress, tokens }: TabPillProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      style={[
        {
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.badge,
          backgroundColor: isActive ? tokens.colors.primary : tokens.colors.surface,
          borderWidth: isActive ? 0 : 1,
          borderColor: tokens.colors.border,
        },
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text
        style={{
          ...tokens.typography.buttonText,
          color: isActive ? tokens.colors.text.inverse : tokens.colors.text.primary,
        }}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
};
