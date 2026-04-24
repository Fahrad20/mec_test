import { useThemeTokens } from '../../hooks/useThemeTokens';

export type TabItem = {
  key: string;
  label: string;
};

export type TabFilterProps = {
  tabs: TabItem[];
  activeKey: string;
  onTabPress: (key: string) => void;
};

export type TabPillProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
  tokens: ReturnType<typeof useThemeTokens>;
};
