import { StyleSheet } from 'react-native';
import { AppTokens } from '../../../theme/tokens';

export function useCommentItemStyles(tokens: AppTokens) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: tokens.spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tokens.colors.border,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    initialsContainer: {
      backgroundColor: tokens.colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    initialsText: {
      ...tokens.typography.caption,
      fontWeight: '600',
      color: tokens.colors.primary,
      fontSize: 11,
    },
    content: {
      flex: 1,
      marginLeft: tokens.spacing.sm,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    authorName: {
      ...tokens.typography.caption,
      fontWeight: '600',
      color: tokens.colors.text.primary,
      flex: 1,
    },
    timestamp: {
      ...tokens.typography.caption,
      color: tokens.colors.text.secondary,
      marginLeft: tokens.spacing.sm,
    },
    text: {
      ...tokens.typography.body,
      fontSize: 14,
      color: tokens.colors.text.primary,
      lineHeight: 20,
    },
  });
}
