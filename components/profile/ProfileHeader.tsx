import React from 'react';
import { YStack, XStack, Text, Button, Avatar, Card } from 'tamagui';
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
const A: any = Avatar;
const H: any = Text;
const AF: any = Avatar.Fallback;

interface ProfileHeaderProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    accountType: AccountType;
  };
  onEditProfile: () => void;
}

export function ProfileHeader({ user, onEditProfile }: ProfileHeaderProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Get account type label
  const getAccountTypeLabel = () => {
    switch (user.accountType) {
      case AccountType.PERSONAL:
        return t('profile.personalAccount');
      case AccountType.BUSINESS_BOAT_OWNER:
        return t('profile.boatOwnerAccount');
      case AccountType.BUSINESS_DISTRIBUTOR:
        return t('profile.distributorAccount');
      case AccountType.ADMIN:
        return t('profile.adminAccount');
      default:
        return t('profile.personalAccount');
    }
  };

  // Get account type color
  const getAccountTypeColor = () => {
    switch (user.accountType) {
      case AccountType.PERSONAL:
        return '$blue8';
      case AccountType.BUSINESS_BOAT_OWNER:
        return '$green8';
      case AccountType.BUSINESS_DISTRIBUTOR:
        return '$orange8';
      case AccountType.ADMIN:
        return '$purple8';
      default:
        return '$blue8';
    }
  };

  return (
    <C padding="$4" bordered>
      <Y alignItems="center" space="$2">
        <A circular size="$12" borderWidth={2} borderColor={getAccountTypeColor()}>
          <Avatar.Image
            accessibilityLabel={user.fullName}
            src={null}
          />
          <AF backgroundColor={getAccountTypeColor().replace('8', '5')}>
            <T color={getAccountTypeColor().replace('8', '11')} fontSize="$8">
              {user.fullName.charAt(0)}
            </T>
          </AF>
        </A>

        <H fontSize="$6" fontWeight="bold">{user.fullName}</H>
        <T fontSize="$2" color="$gray10">{user.email}</T>

        <X marginTop="$1">
          <T
            fontSize="$2"
            backgroundColor={getAccountTypeColor().replace('8', '2')}
            color={getAccountTypeColor().replace('8', '11')}
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius="$2"
          >
            {getAccountTypeLabel()}
          </T>
        </X>

        <X space="$2" marginTop="$3">
          <Button
            size="$3"
            onPress={onEditProfile}
            icon={<Feather name="edit" size={16} />}
          >
            {t('common.edit')}
          </Button>

          <Button
            size="$3"
            variant="outlined"
            onPress={() => navigation.navigate('Settings')}
            icon={<Feather name="settings" size={16} />}
          >
            {t('profile.settings')}
          </Button>

          {user.accountType === AccountType.ADMIN && (
            <Button
              size="$3"
              backgroundColor="$purple9"
              onPress={() => navigation.navigate('AdminDashboard')}
              icon={<Feather name="shield" size={16} />}
            >
              {t('admin.dashboard')}
            </Button>
          )}
        </X>
      </Y>
    </C>
  );
}
