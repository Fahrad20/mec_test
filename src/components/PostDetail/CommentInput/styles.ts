import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { AppTokens } from '../../../theme/tokens';

export function useCommentInputStyles(tokens: AppTokens, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.sm,
      paddingBottom: Math.max(tokens.spacing.sm, insets.bottom),
      backgroundColor: tokens.colors.surface,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
      gap: tokens.spacing.sm,
    },
    input: {
      flex: 1,
      ...tokens.typography.body,
      fontSize: 14,
      color: tokens.colors.text.primary,
      backgroundColor: tokens.colors.background,
      borderRadius: tokens.radius.lg,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm + 2,
      maxHeight: 100,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: tokens.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonDisabled: {
      opacity: 0.4,
    },
    sendIcon: {
      width: 20,
      height: 20,
      tintColor: tokens.colors.text.inverse,
    },
  });
}
