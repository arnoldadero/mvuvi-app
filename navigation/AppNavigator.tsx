import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Import screens
import { MoonPhaseScreen } from '../screens/weather/MoonPhaseScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ReportMarketPriceScreen } from '../screens/market-prices/ReportMarketPriceScreen';
import { EmergencyContactsScreen } from '../screens/safety/EmergencyContactsScreen';
import { SafetyChecklistScreen } from '../screens/safety/SafetyChecklistScreen';
import { FishSpeciesGuideScreen } from '../screens/sustainable-fishing/FishSpeciesGuideScreen';
import { FishingRegulationsScreen } from '../screens/sustainable-fishing/FishingRegulationsScreen';
import { FishingSeasonalCalendarScreen } from '../screens/sustainable-fishing/FishingSeasonalCalendarScreen';
import { CatchRecordDetailsScreen } from '../screens/catch-data/CatchRecordDetailsScreen';

// Import TabNavigator
import { TabNavigator } from './TabNavigator';

// Define the navigator type
export type RootStackParamList = {
  // Auth screens
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // Main app
  MainTabs: undefined;
  
  // Weather screens
  MoonPhase: undefined;
  
  // Market Prices screens
  ReportMarketPrice: undefined;
  
  // Safety screens
  EmergencyContacts: undefined;
  SafetyChecklist: undefined;
  
  // Sustainable Fishing screens
  FishSpeciesGuide: undefined;
  FishingRegulations: undefined;
  FishingSeasonalCalendar: undefined;
  
  // Catch Data screens
  CatchRecordDetails: { catchId: string };
};

// Define screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Main application navigator
 */
export function AppNavigator() {
  const { t } = useTranslation();
  // Mock authentication state - in a real app, this would come from a auth store
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for development

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          // Auth screens
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ title: t('auth.register') }} 
            />
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPasswordScreen} 
              options={{ title: t('auth.forgotPassword') }} 
            />
          </>
        ) : (
          // Main app screens
          <>
            <Stack.Screen 
              name="MainTabs" 
              component={TabNavigator} 
              options={{ headerShown: false }} 
            />
            
            {/* Weather related screens */}
            <Stack.Screen 
              name="MoonPhase" 
              component={MoonPhaseScreen} 
              options={{ title: t('moonPhase.title') }} 
            />
            
            {/* Market Prices related screens */}
            <Stack.Screen 
              name="ReportMarketPrice" 
              component={ReportMarketPriceScreen} 
              options={{ title: t('marketPrices.reportPrice') }} 
            />
            
            {/* Safety related screens */}
            <Stack.Screen 
              name="EmergencyContacts" 
              component={EmergencyContactsScreen} 
              options={{ title: t('safety.emergencyContacts') }} 
            />
            <Stack.Screen 
              name="SafetyChecklist" 
              component={SafetyChecklistScreen} 
              options={{ title: t('safety.checklist') }} 
            />
            
            {/* Sustainable Fishing related screens */}
            <Stack.Screen 
              name="FishSpeciesGuide" 
              component={FishSpeciesGuideScreen} 
              options={{ title: t('sustainableFishing.speciesGuide') }} 
            />
            <Stack.Screen 
              name="FishingRegulations" 
              component={FishingRegulationsScreen} 
              options={{ title: t('sustainableFishing.regulations') }} 
            />
            <Stack.Screen 
              name="FishingSeasonalCalendar" 
              component={FishingSeasonalCalendarScreen} 
              options={{ title: t('sustainableFishing.seasonalCalendar') }} 
            />
            
            {/* Catch Data related screens */}
            <Stack.Screen 
              name="CatchRecordDetails" 
              component={CatchRecordDetailsScreen} 
              options={{ title: t('catchData.recordDetails') }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
