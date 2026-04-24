import { StyleSheet } from 'react-native';
import { AppTokens } from '../../src/theme/tokens';

export function useFeedStyles(tokens: AppTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    listContent: {
      padding: tokens.spacing.md,
    },
  });
}
