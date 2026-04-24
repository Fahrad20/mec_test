import { StyleSheet } from 'react-native';
import { AppTokens } from '../../src/theme/tokens';

export function usePostDetailStyles(tokens: AppTokens) {
  return StyleSheet.create({
    flex: { flex: 1 },
    screen: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tokens.colors.background,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tokens.colors.background,
      padding: tokens.spacing.xl,
    },
    errorText: {
      ...tokens.typography.body,
      color: tokens.colors.error,
      textAlign: 'center',
    },
    heroImage: {
      width: '100%',
      height: 260,
    },
    contentContainer: {
      backgroundColor: tokens.colors.surface,
      padding: tokens.spacing.md,
    },
    title: {
      ...tokens.typography.h1,
      color: tokens.colors.text.primary,
      marginBottom: tokens.spacing.sm,
    },
    body: {
      ...tokens.typography.body,
      color: tokens.colors.text.primary,
      lineHeight: 24,
      marginBottom: tokens.spacing.md,
    },
    paidNotice: {
      ...tokens.typography.body,
      color: tokens.colors.text.secondary,
      fontStyle: 'italic',
      textAlign: 'center',
      paddingVertical: tokens.spacing.xl,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      backgroundColor: tokens.colors.surface,
    },
    commentsBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: tokens.colors.background,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: tokens.radius.badge,
    },
    commentsBadgeIcon: {
      width: 22,
      height: 22,
      tintColor: tokens.colors.text.secondary,
    },
    commentsBadgeText: {
      ...tokens.typography.stats,
      color: tokens.colors.text.secondary,
    },
    sectionHeader: {
      ...tokens.typography.h2,
      color: tokens.colors.text.primary,
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.lg,
      paddingBottom: tokens.spacing.sm,
    },
    wsIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: tokens.spacing.xs,
      backgroundColor: tokens.colors.wsIndicator,
      gap: tokens.spacing.xs,
    },
    wsText: {
      ...tokens.typography.caption,
      color: '#FFFFFF',
    },
    emptyComments: {
      paddingVertical: tokens.spacing.xl,
      alignItems: 'center',
    },
    emptyCommentsText: {
      ...tokens.typography.body,
      color: tokens.colors.text.secondary,
    },
    listContent: {
      paddingBottom: tokens.spacing.lg,
    },
  });
}
