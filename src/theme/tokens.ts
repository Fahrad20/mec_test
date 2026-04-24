import { ThemeMode } from '../stores/themeStore';

const lightColors = {
  primary: '#6B28E0',
  primaryLight: '#E8DEFF',
  background: '#F5F5F8',
  surface: '#FFFFFF',
  text: {
    primary: '#111111',
    secondary: '#888888',
    inverse: '#FFFFFF',
  },
  locked: {
    overlay: 'rgba(0, 0, 0, 0.65)',
  },
  like: '#FF2D55',
  border: '#E8E8E8',
  badgeLiked: '#FFE6EC',
  skeleton: '#E8E8E8',
  error: '#FF3B30',
  wsIndicator: '#FF9500',
};

const darkColors = {
  primary: '#9B6BF7',
  primaryLight: '#2A1A4E',
  background: '#121212',
  surface: '#1E1E1E',
  text: {
    primary: '#F0F0F0',
    secondary: '#999999',
    inverse: '#FFFFFF',
  },
  locked: {
    overlay: 'rgba(0, 0, 0, 0.75)',
  },
  like: '#FF4D6D',
  border: '#2E2E2E',
  badgeLiked: '#3D1A2A',
  skeleton: '#2E2E2E',
  error: '#FF453A',
  wsIndicator: '#FFB340',
};

const shared = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 24, fontWeight: '700' as const },
    h2: { fontSize: 20, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const },
    caption: { fontSize: 12, fontWeight: '400' as const },
    title: { fontSize: 16, fontWeight: '700' as const },
    authorName: { fontSize: 14, fontWeight: '600' as const },
    postPreview: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    stats: { fontSize: 13, fontWeight: '500' as const },
    lockedLabel: { fontSize: 14, fontWeight: '600' as const },
    buttonText: { fontSize: 15, fontWeight: '600' as const },
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
    card: 16,
    avatar: 20,
    button: 12,
    badge: 16,
  },
};

export type AppTokens = typeof shared & { colors: typeof lightColors };

export function getTokens(mode: ThemeMode): AppTokens {
  return {
    ...shared,
    colors: mode === 'dark' ? darkColors : lightColors,
  };
}

/** Static light tokens — for backward-compat or non-reactive contexts */
export const tokens = getTokens('light');
