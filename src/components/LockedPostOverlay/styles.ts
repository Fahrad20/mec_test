import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AppTokens } from '../../theme/tokens';

export function useLockedPostOverlayStyles(tokens: AppTokens) {
  return useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: tokens.colors.locked.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.card,
          zIndex: 10,
        },
        text: {
          ...tokens.typography.lockedLabel,
          color: tokens.colors.text.inverse,
          textAlign: 'center',
          marginBottom: tokens.spacing.md,
        },
        button: {
          backgroundColor: tokens.colors.primary,
          paddingVertical: 10,
          paddingHorizontal: tokens.spacing.xl,
          borderRadius: tokens.radius.button,
        },
        buttonText: {
          ...tokens.typography.buttonText,
          color: tokens.colors.text.inverse,
        },
      }),
    [tokens],
  );
}
