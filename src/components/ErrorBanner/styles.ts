import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AppTokens } from '../../theme/tokens';

export function useErrorBannerStyles(tokens: AppTokens) {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: tokens.spacing.xl,
          backgroundColor: tokens.colors.background,
        },
        image: {
          width: 112,
          height: 112,
          marginBottom: tokens.spacing.lg,
        },
        title: {
          ...tokens.typography.title,
          color: tokens.colors.text.primary,
          marginBottom: tokens.spacing.xl,
          textAlign: 'center',
        },
        button: {
          backgroundColor: tokens.colors.primary,
          paddingVertical: 14,
          paddingHorizontal: tokens.spacing.xl,
          borderRadius: tokens.radius.button,
          width: '100%',
          alignItems: 'center',
        },
        buttonText: {
          ...tokens.typography.buttonText,
          color: tokens.colors.text.inverse,
        },
      }),
    [tokens],
  );
}
