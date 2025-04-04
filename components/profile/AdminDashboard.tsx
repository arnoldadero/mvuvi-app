import React from 'react';
import { YStack, XStack, Text, Card, Button, Separator } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

// Define aliases for Tamagui components with any type to fix type errors
const Y: any = YStack;
const X: any = XStack;
const T: any = Text;
const C: any = Card;
const H: any = Text;
const S: any = Separator;

export function AdminDashboard() {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Mock system stats
  const systemStats = {
    totalUsers: 156,
    activeUsers: 87,
    totalTransactions: 423,
    pendingDisputes: 3,
  };

  return (
    <>
      <C padding="$4" bordered>
        <Y space="$3">
          <H fontSize="$5" fontWeight="bold">{t('admin.dashboard')}</H>
          
          <X flexWrap="wrap">
            <Y padding="$2" width="50%" space="$1">
              <T fontSize="$7" fontWeight="bold" color="$purple9">{systemStats.totalUsers}</T>
              <T fontSize="$2" color="$gray10">{t('admin.totalUsers')}</T>
            </Y>
            
            <Y padding="$2" width="50%" space="$1">
              <T fontSize="$7" fontWeight="bold" color="$purple9">{systemStats.activeUsers}</T>
              <T fontSize="$2" color="$gray10">{t('admin.activeUsers')}</T>
            </Y>
            
            <Y padding="$2" width="50%" space="$1">
              <T fontSize="$7" fontWeight="bold" color="$purple9">{systemStats.totalTransactions}</T>
              <T fontSize="$2" color="$gray10">{t('admin.totalTransactions')}</T>
            </Y>
            
            <Y padding="$2" width="50%" space="$1">
              <T fontSize="$7" fontWeight="bold" color="$red9">{systemStats.pendingDisputes}</T>
              <T fontSize="$2" color="$gray10">{t('admin.pendingDisputes')}</T>
            </Y>
          </X>
        </Y>
      </C>
      
      <C padding="$4" bordered>
        <Y space="$4">
          <H fontSize="$5" fontWeight="bold">{t('admin.systemManagement')}</H>
          
          <Y space="$3">
            <Button 
              onPress={() => navigation.navigate('MainTabs')}
              icon={<Feather name="users" size={16} />}
              backgroundColor="$purple9"
            >
              {t('admin.userManagement')}
            </Button>
            
            <Button 
              onPress={() => navigation.navigate('MainTabs')}
              icon={<Feather name="settings" size={16} />}
              backgroundColor="$blue9"
            >
              {t('admin.systemConfiguration')}
            </Button>
            
            <Button 
              onPress={() => navigation.navigate('MainTabs')}
              icon={<Feather name="activity" size={16} />}
              backgroundColor="$green9"
            >
              {t('admin.transactionMonitoring')}
            </Button>
            
            <Button 
              onPress={() => navigation.navigate('MainTabs')}
              icon={<Feather name="file-text" size={16} />}
              backgroundColor="$orange9"
            >
              {t('admin.reportGeneration')}
            </Button>
          </Y>
        </Y>
      </C>
      
      <C padding="$4" bordered>
        <Y space="$3">
          <H fontSize="$5" fontWeight="bold">{t('admin.recentActivity')}</H>
          
          <Y space="$3">
            {/* Mock recent activities */}
            <Y space="$1" paddingVertical="$2">
              <X space="$2" alignItems="center">
                <Feather name="user-plus" size={16} color="#0891b2" />
                <T fontSize="$3" fontWeight="bold">{t('admin.newUserRegistered')}</T>
              </X>
              <T paddingLeft="$6" fontSize="$2" color="$gray10">John Doe - 2 hours ago</T>
            </Y>
            
            <S />
            
            <Y space="$1" paddingVertical="$2">
              <X space="$2" alignItems="center">
                <Feather name="alert-triangle" size={16} color="#f59e0b" />
                <T fontSize="$3" fontWeight="bold">{t('admin.disputeReported')}</T>
              </X>
              <T paddingLeft="$6" fontSize="$2" color="$gray10">Order #12345 - 5 hours ago</T>
            </Y>
            
            <S />
            
            <Y space="$1" paddingVertical="$2">
              <X space="$2" alignItems="center">
                <Feather name="check-circle" size={16} color="#10b981" />
                <T fontSize="$3" fontWeight="bold">{t('admin.systemUpdateCompleted')}</T>
              </X>
              <T paddingLeft="$6" fontSize="$2" color="$gray10">Version 1.2.3 - 1 day ago</T>
            </Y>
            
            <Button 
              onPress={() => navigation.navigate('MainTabs')}
              variant="outlined"
              marginTop="$2"
            >
              {t('admin.viewAllActivity')}
            </Button>
          </Y>
        </Y>
      </C>
    </>
  );
}
