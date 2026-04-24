import { StyleSheet } from 'react-native';
import { AppTokens } from '../../../theme/tokens';

export function useHeaderStyles(tokens: AppTokens, topInset: number) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: topInset + tokens.spacing.sm,
      paddingBottom: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      backgroundColor: tokens.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
    },
    backButton: {
      marginRight: tokens.spacing.sm,
      padding: tokens.spacing.xs,
    },
    backIcon: {
      fontSize: 24,
      color: tokens.colors.text.primary,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
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
    },
    authorInfo: {
      marginLeft: tokens.spacing.sm,
      flex: 1,
    },
    displayName: {
      ...tokens.typography.authorName,
      color: tokens.colors.text.primary,
    },
    subscribers: {
      ...tokens.typography.caption,
      color: tokens.colors.text.secondary,
      marginTop: 1,
    },
  });
}
