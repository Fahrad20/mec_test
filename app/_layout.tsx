import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import '../src/i18n';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="post/[id]"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
