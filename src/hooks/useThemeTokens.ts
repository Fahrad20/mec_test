import { useMemo } from 'react';
import { themeStore } from '../stores/themeStore';
import { AppTokens, getTokens } from '../theme/tokens';

/**
 * Returns the current theme tokens reactively.
 * Must be used inside an `observer()` component to react to theme changes.
 */
export function useThemeTokens(): AppTokens {
  const mode = themeStore.mode;
  return useMemo(() => getTokens(mode), [mode]);
}
