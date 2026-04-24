import { StyleSheet } from 'react-native';
import { AppTokens } from '../../theme/tokens';

export function useTabFilterStyles(tokens: AppTokens) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
    },
  });
}
