import React from 'react';
import { YStack, XStack, Text, Card, Button } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { AccountType } from '../../store/auth/auth-store';

// Define aliases for Tamagui components with any type to fix type errors
const Y: any = YStack;
const X: any = XStack;
const T: any = Text;
const C: any = Card;
const H: any = Text;

interface BusinessProfileDetailsProps {
  accountType: AccountType;
  businessProfile: {
    businessName?: string;
    businessType: 'boat_owner' | 'distributor';
    registrationNumber?: string;
    taxId?: string;
    businessAddress?: string;
    contactPerson?: string;
    contactEmail?: string;
    contactPhone?: string;
  } | null;
  onEditBusinessProfile: () => void;
}

export function BusinessProfileDetails({
  accountType,
  businessProfile,
  onEditBusinessProfile
}: BusinessProfileDetailsProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!businessProfile) {
    return (
      <C padding="$4" bordered>
        <Y space="$3">
          <H fontSize="$5" fontWeight="bold">{t('profile.businessInformation')}</H>
          <T>{t('profile.noBusinessProfileFound')}</T>
          <Button
            onPress={onEditBusinessProfile}
            icon={<Feather name="plus" size={16} />}
            marginTop="$2"
          >
            {t('profile.createBusinessProfile')}
          </Button>
        </Y>
      </C>
    );
  }

  // Render different sections based on account type
  const renderBusinessTypeSpecificInfo = () => {
    if (accountType === AccountType.BUSINESS_BOAT_OWNER) {
      return (
        <Y space="$4" marginTop="$4">
          <H fontSize="$4" fontWeight="bold">{t('profile.vesselManagement')}</H>
          <Button
            onPress={() => navigation.navigate('VesselDashboard')}
            icon={<Feather name="anchor" size={16} />}
          >
            {t('profile.manageVessels')}
          </Button>

          <H fontSize="$4" fontWeight="bold">{t('profile.catchLogging')}</H>
          <Button
            onPress={() => navigation.navigate('CatchHistory')}
            icon={<Feather name="clipboard" size={16} />}
          >
            {t('profile.viewCatchHistory')}
          </Button>

          <H fontSize="$4" fontWeight="bold">{t('inventory.title')}</H>
          <Button
            onPress={() => navigation.navigate('Inventory')}
            icon={<Feather name="package" size={16} />}
          >
            {t('profile.manageInventory')}
          </Button>

          <H fontSize="$4" fontWeight="bold">{t('profile.salesAnalytics')}</H>
          <Button
            onPress={() => navigation.navigate('MainTabs')}
            icon={<Feather name="bar-chart-2" size={16} />}
          >
            {t('profile.viewSalesAnalytics')}
          </Button>
        </Y>
      );
    } else if (accountType === AccountType.BUSINESS_DISTRIBUTOR) {
      return (
        <Y space="$4" marginTop="$4">
          <H fontSize="$4" fontWeight="bold">{t('profile.inventoryManagement')}</H>
          <Button
            onPress={() => navigation.navigate('Inventory')}
            icon={<Feather name="package" size={16} />}
          >
            {t('profile.manageInventory')}
          </Button>

          <H fontSize="$4" fontWeight="bold">{t('profile.orderProcessing')}</H>
          <Button
            onPress={() => navigation.navigate('Distribution')}
            icon={<Feather name="shopping-cart" size={16} />}
          >
            {t('profile.processOrders')}
          </Button>

          <H fontSize="$4" fontWeight="bold">{t('profile.qualityControl')}</H>
          <Button
            onPress={() => navigation.navigate('MainTabs')}
            icon={<Feather name="check-circle" size={16} />}
          >
            {t('profile.manageQualityControl')}
          </Button>
        </Y>
      );
    }

    return null;
  };

  return (
    <C padding="$4" bordered>
      <Y space="$3">
        <X justifyContent="space-between" alignItems="center">
          <H fontSize="$5" fontWeight="bold">{t('profile.businessInformation')}</H>
          <Button
            size="$2"
            onPress={onEditBusinessProfile}
            icon={<Feather name="edit" size={14} />}
          >
            {t('common.edit')}
          </Button>
        </X>

        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="briefcase" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('profile.businessName')}</T>
          </X>
          <T paddingLeft="$6">{businessProfile.businessName || t('profile.notProvided')}</T>
        </Y>

        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="tag" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('profile.businessType')}</T>
          </X>
          <T paddingLeft="$6">
            {businessProfile.businessType === 'boat_owner'
              ? t('profile.boatOwner')
              : t('profile.distributor')}
          </T>
        </Y>

        {businessProfile.registrationNumber && (
          <Y space="$2">
            <X space="$2" alignItems="center">
              <Feather name="file-text" size={16} color="#0891b2" />
              <T fontSize="$3" fontWeight="bold">{t('profile.registrationNumber')}</T>
            </X>
            <T paddingLeft="$6">{businessProfile.registrationNumber}</T>
          </Y>
        )}

        {businessProfile.businessAddress && (
          <Y space="$2">
            <X space="$2" alignItems="center">
              <Feather name="map-pin" size={16} color="#0891b2" />
              <T fontSize="$3" fontWeight="bold">{t('profile.businessAddress')}</T>
            </X>
            <T paddingLeft="$6">{businessProfile.businessAddress}</T>
          </Y>
        )}

        {renderBusinessTypeSpecificInfo()}
      </Y>
    </C>
  );
}
