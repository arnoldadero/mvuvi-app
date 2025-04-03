import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider, Theme } from 'tamagui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'react-native';
import './localization/i18n';

// Import web CSS for Expo web
import './tamagui-web.css';

// Import Tamagui config
import config from './tamagui.config';

// Import the new AppNavigator from our navigation directory
import { AppNavigator } from './navigation/AppNavigator';

// Create React Query client
const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();
  
  return (
    <TamaguiProvider 
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      disableInjectCSS
      disableRootThemeClass
    >
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
