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
import { ReportViolationScreen } from '../screens/sustainable-fishing/ReportViolationScreen';
import { SustainableFishingCategoryScreen } from '../screens/sustainable-fishing/SustainableFishingCategoryScreen';
import { EducationalVideosScreen } from '../screens/sustainable-fishing/EducationalVideosScreen';
import { CommunityForumsScreen } from '../screens/sustainable-fishing/CommunityForumsScreen';
import { CatchRecordDetailsScreen } from '../screens/catch-data/CatchRecordDetailsScreen';
import { UserProfileScreen } from '../screens/profile/UserProfileScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { HelpScreen } from '../screens/profile/HelpScreen';

// Import TabNavigator
import { TabNavigator } from './TabNavigator';

// Import UI components
import { ProfileButton } from '../components/profile/ProfileButton';

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
  ReportViolation: undefined;
  SustainableFishingCategory: { category: string };
  EducationalVideos: undefined;
  CommunityForums: undefined;

  // Catch Data screens
  CatchRecordDetails: { catchId: string };

  // Profile and Settings screens
  UserProfile: undefined;
  Settings: undefined;
  Help: undefined;
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
              options={{
                headerShown: false,
                // Add profile button to header right
                headerRight: () => <ProfileButton />,
              }}
            />

            {/* Weather related screens */}
            <Stack.Screen
              name="MoonPhase"
              component={MoonPhaseScreen}
              options={{
                title: t('moonPhase.title'),
                headerRight: () => <ProfileButton mini />,
              }}
            />

            {/* Market Prices related screens */}
            <Stack.Screen
              name="ReportMarketPrice"
              component={ReportMarketPriceScreen}
              options={{
                title: t('marketPrices.reportPrice'),
                headerRight: () => <ProfileButton mini />,
              }}
            />

            {/* Safety related screens */}
            <Stack.Screen
              name="EmergencyContacts"
              component={EmergencyContactsScreen}
              options={{
                title: t('safety.emergencyContacts'),
                headerRight: () => <ProfileButton mini />,
              }}
            />
            <Stack.Screen
              name="SafetyChecklist"
              component={SafetyChecklistScreen}
              options={{
                title: t('safety.checklist'),
                headerRight: () => <ProfileButton mini />,
              }}
            />

            {/* Sustainable Fishing related screens */}
            <Stack.Screen
              name="FishSpeciesGuide"
              component={FishSpeciesGuideScreen}
              options={{
                title: t('sustainableFishing.speciesGuide'),
                headerRight: () => <ProfileButton mini />,
              }}
            />
            <Stack.Screen
              name="FishingRegulations"
              component={FishingRegulationsScreen}
              options={{
                title: t('sustainableFishing.regulations'),
                headerRight: () => <ProfileButton mini />,
              }}
            />
            <Stack.Screen
              name="FishingSeasonalCalendar"
              component={FishingSeasonalCalendarScreen}
              options={{
                title: t('sustainableFishing.seasonalCalendar'),
                headerRight: () => <ProfileButton mini />,
              }}
            />
            <Stack.Screen
              name="ReportViolation"
              component={ReportViolationScreen}
              options={{
                title: t('regulations.reportViolation'),
                headerRight: () => <ProfileButton mini />,
              }}
            />
            <Stack.Screen
              name="SustainableFishingCategory"
              component={SustainableFishingCategoryScreen}
              options={{
                title: t('sustainableFishing.category'),
                headerRight: () => <ProfileButton mini />,
              }}
            />
            <Stack.Screen
              name="EducationalVideos"
              component={EducationalVideosScreen}
              options={{
                title: t('sustainableFishing.educationalVideos'),
                headerRight: () => <ProfileButton mini />,
              }}
            />
            <Stack.Screen
              name="CommunityForums"
              component={CommunityForumsScreen}
              options={{
                title: t('sustainableFishing.communityForums'),
                headerRight: () => <ProfileButton mini />,
              }}
            />

            {/* Catch Data related screens */}
            <Stack.Screen
              name="CatchRecordDetails"
              component={CatchRecordDetailsScreen}
              options={{
                title: t('catchData.recordDetails'),
                headerRight: () => <ProfileButton mini />,
              }}
            />

            {/* Profile and Settings screens */}
            <Stack.Screen
              name="UserProfile"
              component={UserProfileScreen}
              options={{
                title: t('profile.userProfile'),
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                title: t('profile.settings'),
              }}
            />
            <Stack.Screen
              name="Help"
              component={HelpScreen}
              options={{
                title: t('help.helpAndSupport'),
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
