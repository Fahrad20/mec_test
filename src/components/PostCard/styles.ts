import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AppTokens } from '../../theme/tokens';

export function usePostCardStyles(tokens: AppTokens) {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: tokens.colors.surface,
          marginBottom: tokens.spacing.md,
          borderRadius: tokens.radius.card,
          padding: tokens.spacing.md,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: tokens.spacing.md,
        },
        avatar: {
          width: 40,
          height: 40,
          borderRadius: tokens.radius.avatar,
        },
        initialsContainer: {
          backgroundColor: tokens.colors.primaryLight,
          justifyContent: 'center',
          alignItems: 'center',
        },
        initialsText: {
          ...tokens.typography.authorName,
          color: tokens.colors.primary,
        },
        headerText: {
          marginLeft: tokens.spacing.sm,
          flex: 1,
        },
        authorName: {
          ...tokens.typography.authorName,
          color: tokens.colors.text.primary,
        },
        title: {
          ...tokens.typography.title,
          color: tokens.colors.text.primary,
          marginBottom: tokens.spacing.sm,
        },
        contentContainer: {
          position: 'relative',
          marginBottom: tokens.spacing.md,
        },
        coverImage: {
          width: '100%',
          height: 200,
          borderRadius: tokens.radius.card,
          marginBottom: tokens.spacing.sm,
        },
        coverImagePlaceholder: {
          width: '100%',
          height: 200,
          borderRadius: tokens.radius.card,
          backgroundColor: tokens.colors.border,
        },
        preview: {
          ...tokens.typography.postPreview,
          color: tokens.colors.text.primary,
        },
        lockedContainer: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          minHeight: 200,
          borderRadius: tokens.radius.card,
          overflow: 'hidden',
        },
        footer: {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
        },
        badge: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: tokens.colors.background,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: tokens.radius.badge,
          gap: 6,
        },
        badgeLiked: {
          backgroundColor: tokens.colors.badgeLiked,
        },
        icon: {
          width: 18,
          height: 18,
          tintColor: tokens.colors.text.secondary,
        },
        iconLiked: {
          tintColor: tokens.colors.like,
        },
        badgeText: {
          ...tokens.typography.stats,
          color: tokens.colors.text.secondary,
        },
        badgeTextLiked: {
          color: tokens.colors.like,
        },
      }),
    [tokens],
  );
}
