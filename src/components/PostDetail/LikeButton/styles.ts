import { StyleSheet } from 'react-native';
import { AppTokens } from '../../../theme/tokens';

export function useLikeButtonStyles(tokens: AppTokens) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: tokens.colors.background,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: tokens.radius.badge,
    },
    containerLiked: {
      backgroundColor: tokens.colors.badgeLiked,
    },
    icon: {
      width: 22,
      height: 22,
      tintColor: tokens.colors.text.secondary,
    },
    iconLiked: {
      tintColor: tokens.colors.like,
    },
    count: {
      ...tokens.typography.stats,
      color: tokens.colors.text.secondary,
    },
    countLiked: {
      color: tokens.colors.like,
    },
  });
}
