import React from 'react';
import { SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { YStack, Text, Card, Tabs } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { UserManagement } from '../../components/admin/UserManagement';
import { AdminDashboard } from '../../components/profile/AdminDashboard';
import { AccountType, useAuthStore } from '../../store/auth/auth-store';
import { hasPermission } from '../../utils/permissions';

// Define aliases for Tamagui components with any type to fix type errors
const Y: any = YStack;
const T: any = Text;
const C: any = Card;
const H: any = Text;
const Ta: any = Tabs;

type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function AdminDashboardScreen({ navigation }: AdminDashboardScreenProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  // Check if user has permission to access this screen
  const hasAccess = user && user.accountType === AccountType.ADMIN;
  
  if (!hasAccess) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Y flex={1} alignItems="center" justifyContent="center" padding="$4">
          <T fontSize="$5" fontWeight="bold" textAlign="center">
            {t('common.accessDenied')}
          </T>
          <T marginTop="$2" textAlign="center">
            {t('common.noPermission')}
          </T>
        </Y>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Y flex={1}>
        <Ta defaultValue="dashboard" orientation="horizontal">
          <Ta.List>
            <Ta.Tab value="dashboard">
              <T>{t('admin.dashboard')}</T>
            </Ta.Tab>
            <Ta.Tab value="users">
              <T>{t('admin.users')}</T>
            </Ta.Tab>
            <Ta.Tab value="settings">
              <T>{t('admin.settings')}</T>
            </Ta.Tab>
          </Ta.List>
          
          <Ta.Content value="dashboard">
            <ScrollView>
              <Y padding="$4" space="$4">
                <H fontSize="$6" fontWeight="bold">{t('admin.systemOverview')}</H>
                <AdminDashboard />
              </Y>
            </ScrollView>
          </Ta.Content>
          
          <Ta.Content value="users">
            <ScrollView>
              <Y padding="$4" space="$4">
                <UserManagement />
              </Y>
            </ScrollView>
          </Ta.Content>
          
          <Ta.Content value="settings">
            <ScrollView>
              <Y padding="$4" space="$4">
                <H fontSize="$6" fontWeight="bold">{t('admin.systemSettings')}</H>
                
                <C padding="$4" bordered>
                  <Y space="$3">
                    <T fontSize="$4" fontWeight="bold">{t('admin.settingsComingSoon')}</T>
                    <T>{t('admin.settingsDescription')}</T>
                  </Y>
                </C>
              </Y>
            </ScrollView>
          </Ta.Content>
        </Ta>
      </Y>
    </SafeAreaView>
  );
}
