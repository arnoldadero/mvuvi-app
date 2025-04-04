import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/auth/auth-store';

// Import screens
import { MoonPhaseScreen } from '../screens/weather/MoonPhaseScreen';
import { DetailedForecastScreen } from '../screens/weather/DetailedForecastScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ReportMarketPriceScreen } from '../screens/market-prices/ReportMarketPriceScreen';
import { EmergencyContactsScreen } from '../screens/safety/EmergencyContactsScreen';
import { SafetyChecklistScreen } from '../screens/safety/SafetyChecklistScreen';
import { SafetyTipsScreen } from '../screens/safety/SafetyTipsScreen';
import { FishSpeciesGuideScreen } from '../screens/sustainable-fishing/FishSpeciesGuideScreen';
import { FishSpeciesScreen } from '../screens/sustainable-fishing/FishSpeciesScreen';
import { FishingRegulationsScreen } from '../screens/sustainable-fishing/FishingRegulationsScreen';
import { FishingSeasonalCalendarScreen } from '../screens/sustainable-fishing/FishingSeasonalCalendarScreen';
import { SeasonalCalendarScreen } from '../screens/sustainable-fishing/SeasonalCalendarScreen';
import { ReportViolationScreen } from '../screens/sustainable-fishing/ReportViolationScreen';
import { SustainableFishingCategoryScreen } from '../screens/sustainable-fishing/SustainableFishingCategoryScreen';
import { EducationalVideosScreen } from '../screens/sustainable-fishing/EducationalVideosScreen';
import { CommunityForumsScreen } from '../screens/sustainable-fishing/CommunityForumsScreen';
import { FishingLicenseScreen } from '../screens/sustainable-fishing/FishingLicenseScreen';
import { CatchRecordDetailsScreen } from '../screens/catch-data/CatchRecordDetailsScreen';
import { CatchHistoryScreen } from '../screens/catch-data/CatchHistoryScreen';
import { CatchStatisticsScreen } from '../screens/catch-data/CatchStatisticsScreen';
import { UserProfileScreen } from '../screens/profile/UserProfileScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { HelpScreen } from '../screens/profile/HelpScreen';

// Import business screens
import { VesselDashboardScreen } from '../screens/business/VesselDashboardScreen';
import { InventoryScreen } from '../screens/business/InventoryScreen';
import { DistributionScreen } from '../screens/business/DistributionScreen';

// Import admin screens
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';

// Import TabNavigator
import { TabNavigator } from './TabNavigator';
import { PublicTabNavigator } from './PublicTabNavigator';

// Import UI components
import { ProfileButton } from '../components/profile/ProfileButton';

// Define the navigator type
export type RootStackParamList = {
  // Public tab navigator for unauthenticated users
  PublicTabs: undefined;

  // Auth screens
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;

  // Main app
  MainTabs: undefined;

  // Weather screens
  MoonPhase: undefined;
  DetailedForecast: undefined;

  // Market Prices screens
  ReportMarketPrice: undefined;

  // Safety screens
  EmergencyContacts: undefined;
  SafetyChecklist: undefined;
  SafetyTips: undefined;

  // Sustainable Fishing screens
  FishSpeciesGuide: undefined;
  FishSpecies: undefined;
  FishingRegulations: undefined;
  FishingSeasonalCalendar: undefined;
  SeasonalCalendar: undefined;
  ReportViolation: undefined;
  SustainableFishingCategory: { category: string };
  EducationalVideos: undefined;
  CommunityForums: undefined;

  // Catch Data screens
  CatchRecordDetails: { catchId: string };
  CatchHistory: undefined;
  CatchStatistics: undefined;

  // Profile and Settings screens
  UserProfile: undefined;
  Settings: undefined;
  Help: undefined;

  // Business screens
  VesselDashboard: undefined;
  Inventory: undefined;
  Distribution: undefined;

  // Admin screens
  AdminDashboard: undefined;
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
  const { user, isAuthenticated } = useAuthStore();

  // Set initial route name based on authentication status
  const initialRouteName = isAuthenticated ? 'MainTabs' : 'PublicTabs';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {!isAuthenticated ? (
          // Public and Auth screens for unauthenticated users
          <>
            {/* Public Tab Navigator for unauthenticated users */}
            <Stack.Screen
              name="PublicTabs"
              component={PublicTabNavigator}
              options={{
                headerShown: false,
              }}
            />

            {/* Auth screens */}
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

            {/* Public Weather related screens */}
            <Stack.Screen
              name="MoonPhase"
              component={MoonPhaseScreen}
              options={{
                title: t('moonPhase.title'),
              }}
            />
            <Stack.Screen
              name="DetailedForecast"
              component={DetailedForecastScreen}
              options={{
                title: t('weather.forecast'),
              }}
            />

            {/* Public Safety related screens */}
            <Stack.Screen
              name="SafetyChecklist"
              component={SafetyChecklistScreen}
              options={{
                title: t('safety.checklist'),
              }}
            />
            <Stack.Screen
              name="SafetyTips"
              component={SafetyTipsScreen}
              options={{
                title: t('safety.tips'),
              }}
            />

            {/* Public Sustainable Fishing screens */}
            <Stack.Screen
              name="FishingRegulations"
              component={FishingRegulationsScreen}
              options={{
                title: t('sustainableFishing.regulations'),
              }}
            />
            <Stack.Screen
              name="FishSpecies"
              component={FishSpeciesScreen}
              options={{
                title: t('sustainableFishing.fishSpecies'),
              }}
            />
            <Stack.Screen
              name="SeasonalCalendar"
              component={SeasonalCalendarScreen}
              options={{
                title: t('sustainableFishing.seasonalCalendar'),
              }}
            />
            <Stack.Screen
              name="FishingSeasonalCalendar"
              component={FishingSeasonalCalendarScreen}
              options={{
                title: t('sustainableFishing.seasonalCalendar'),
              }}
            />
            <Stack.Screen
              name="ReportViolation"
              component={ReportViolationScreen}
              options={{
                title: t('sustainableFishing.reportViolation'),
              }}
            />
            <Stack.Screen
              name="SustainableFishingCategory"
              component={SustainableFishingCategoryScreen}
              options={{
                title: t('sustainableFishing.category'),
              }}
            />
            <Stack.Screen
              name="EducationalVideos"
              component={EducationalVideosScreen}
              options={{
                title: t('sustainableFishing.educationalVideos'),
              }}
            />
            <Stack.Screen
              name="CommunityForums"
              component={CommunityForumsScreen}
              options={{
                title: t('sustainableFishing.communityForums'),
              }}
            />
            <Stack.Screen
              name="FishingLicense"
              component={FishingLicenseScreen}
              options={{
                title: t('sustainableFishing.fishingLicense'),
              }}
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
            <Stack.Screen
              name="DetailedForecast"
              component={DetailedForecastScreen}
              options={{
                title: t('weather.forecast'),
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
            <Stack.Screen
              name="FishingLicense"
              component={FishingLicenseScreen}
              options={{
                title: t('sustainableFishing.fishingLicense'),
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
            <Stack.Screen
              name="CatchHistory"
              component={CatchHistoryScreen}
              options={{
                title: t('catchData.catchHistory'),
                headerRight: () => <ProfileButton mini />,
              }}
            />
            <Stack.Screen
              name="CatchStatistics"
              component={CatchStatisticsScreen}
              options={{
                title: t('catchData.statistics'),
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

            {/* Business screens */}
            <Stack.Screen
              name="VesselDashboard"
              component={VesselDashboardScreen}
              options={{
                title: t('vessel.dashboard'),
              }}
            />
            <Stack.Screen
              name="Inventory"
              component={InventoryScreen}
              options={{
                title: t('inventory.dashboard'),
              }}
            />
            <Stack.Screen
              name="Distribution"
              component={DistributionScreen}
              options={{
                title: t('distribution.dashboard'),
              }}
            />

            {/* Admin screens */}
            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashboardScreen}
              options={{
                title: t('admin.dashboard'),
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
