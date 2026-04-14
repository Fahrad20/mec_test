import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AppTokens } from '../../theme/tokens';

export function useFeedFooterLoaderStyles(tokens: AppTokens) {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: tokens.spacing.lg,
          gap: tokens.spacing.sm,
        },
        dot: {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: tokens.colors.primary,
        },
      }),
    [tokens],
  );
}
