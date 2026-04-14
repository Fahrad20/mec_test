import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AppTokens } from '../../theme/tokens';

export function usePostCardSkeletonStyles(tokens: AppTokens) {
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
          backgroundColor: tokens.colors.skeleton,
        },
        headerText: {
          marginLeft: tokens.spacing.sm,
          flex: 1,
        },
        titleSkeleton: {
          height: 16,
          width: '60%',
          backgroundColor: tokens.colors.skeleton,
          borderRadius: 4,
          marginBottom: 6,
        },
        subtitleSkeleton: {
          height: 12,
          width: '40%',
          backgroundColor: tokens.colors.skeleton,
          borderRadius: 4,
        },
        imageSkeleton: {
          width: '100%',
          height: 200,
          backgroundColor: tokens.colors.skeleton,
          borderRadius: tokens.radius.card,
          marginBottom: tokens.spacing.md,
        },
        footer: {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
        },
        actionSkeleton: {
          width: 60,
          height: 32,
          backgroundColor: tokens.colors.skeleton,
          borderRadius: tokens.radius.badge,
        },
      }),
    [tokens],
  );
}
