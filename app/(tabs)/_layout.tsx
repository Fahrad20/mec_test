import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'expo-router';
import { useThemeTokens } from '../../src/hooks/useThemeTokens';

export default observer(function TabLayout() {
  const { t } = useTranslation();
  const tokens = useThemeTokens();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.colors.primary,
        tabBarStyle: {
          backgroundColor: tokens.colors.surface,
          borderTopColor: tokens.colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: t('feed.title'),
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
});
