import React from 'react';
import { SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { YStack, Text, Card } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { DistributionManagement } from '../../components/business/DistributionManagement';
import { AccountType, useAuthStore } from '../../store/auth/auth-store';
import { hasPermission } from '../../utils/permissions';

// Define aliases for Tamagui components with any type to fix type errors
const Y: any = YStack;
const T: any = Text;
const C: any = Card;
const H: any = Text;

type DistributionScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function DistributionScreen({ navigation }: DistributionScreenProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  // Check if user has permission to access this screen
  const hasAccess = user && hasPermission(user.accountType, 'orders:process');
  
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
      <ScrollView>
        <Y padding="$4" space="$4">
          <H fontSize="$6" fontWeight="bold">{t('distribution.dashboard')}</H>
          
          <C padding="$4" bordered>
            <DistributionManagement />
          </C>
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
