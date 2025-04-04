import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  YStack, XStack, Text, Button, Image, Card, H4, Paragraph, Spinner,
  Avatar, Sheet, Input, Separator
} from 'tamagui';
import { Feather } from '@expo/vector-icons';

import { AccountType, useAuthStore } from '../../store/auth/auth-store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { BusinessProfileDetails } from '../../components/profile/BusinessProfileDetails';
import { AdminDashboard } from '../../components/profile/AdminDashboard';

type UserProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Define aliases for Tamagui components with any type to fix type errors
const Y: any = YStack;
const X: any = XStack;
const T: any = Text;
const C: any = Card;
const A: any = Avatar;
const H: any = H4;
const P: any = Paragraph;
const AF: any = Avatar.Fallback;

export function UserProfileScreen({ navigation }: UserProfileScreenProps) {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, businessProfile, updateProfile, updateBusinessProfile, fetchBusinessProfile, isLoading } = useAuthStore();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBusinessProfile, setIsEditingBusinessProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    location: user?.location || '',
    accountType: user?.accountType || AccountType.PERSONAL,
  });

  const [editedBusinessProfile, setEditedBusinessProfile] = useState({
    businessName: businessProfile?.businessName || '',
    registrationNumber: businessProfile?.registrationNumber || '',
    taxId: businessProfile?.taxId || '',
    businessAddress: businessProfile?.businessAddress || '',
    contactPerson: businessProfile?.contactPerson || '',
    contactEmail: businessProfile?.contactEmail || '',
    contactPhone: businessProfile?.contactPhone || '',
  });

  // Stats data - in a real app, this would come from an API or local storage
  const [userStats, setUserStats] = useState({
    totalCatches: 0,
    favoriteFishingSpot: '',
    topCatch: '',
    fishingHours: 0,
  });

  // Fetch user stats and business profile
  useEffect(() => {
    // Mock fetching user stats - in a real app, this would be an API call
    const fetchUserStats = async () => {
      // Simulating API delay
      setTimeout(() => {
        setUserStats({
          totalCatches: 42,
          favoriteFishingSpot: 'Lake Victoria - Dunga Beach',
          topCatch: 'Nile Perch - 8.5kg',
          fishingHours: 156,
        });
      }, 500);
    };

    fetchUserStats();

    // Fetch business profile if user is a business account
    if (user && (user.accountType === AccountType.BUSINESS_BOAT_OWNER ||
                 user.accountType === AccountType.BUSINESS_DISTRIBUTOR)) {
      fetchBusinessProfile();
    }
  }, [user, fetchBusinessProfile]);

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    // Reset form data
    setEditedProfile({
      fullName: user?.fullName || '',
      phoneNumber: user?.phoneNumber || '',
      location: user?.location || '',
      accountType: user?.accountType || AccountType.PERSONAL,
    });
  };

  const handleEditBusinessProfile = () => {
    setIsEditingBusinessProfile(true);
  };

  const handleCancelEditBusiness = () => {
    setIsEditingBusinessProfile(false);
    // Reset form data
    setEditedBusinessProfile({
      businessName: businessProfile?.businessName || '',
      registrationNumber: businessProfile?.registrationNumber || '',
      taxId: businessProfile?.taxId || '',
      businessAddress: businessProfile?.businessAddress || '',
      contactPerson: businessProfile?.contactPerson || '',
      contactEmail: businessProfile?.contactEmail || '',
      contactPhone: businessProfile?.contactPhone || '',
    });
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        fullName: editedProfile.fullName,
        phoneNumber: editedProfile.phoneNumber,
        location: editedProfile.location,
        accountType: editedProfile.accountType,
      });

      setIsEditingProfile(false);
      Alert.alert(t('common.success'), t('profile.profileUpdated'));
    } catch (error) {
      Alert.alert(t('common.error'), t('profile.updateFailed'));
    }
  };

  const handleSaveBusinessProfile = async () => {
    try {
      await updateBusinessProfile({
        businessName: editedBusinessProfile.businessName,
        registrationNumber: editedBusinessProfile.registrationNumber,
        taxId: editedBusinessProfile.taxId,
        businessAddress: editedBusinessProfile.businessAddress,
        contactPerson: editedBusinessProfile.contactPerson,
        contactEmail: editedBusinessProfile.contactEmail,
        contactPhone: editedBusinessProfile.contactPhone,
      });

      setIsEditingBusinessProfile(false);
      Alert.alert(t('common.success'), t('profile.businessProfileUpdated'));
    } catch (error) {
      Alert.alert(t('common.error'), t('profile.updateFailed'));
    }
  };

  if (!user) {
    return (
      <Y flex={1} alignItems="center" justifyContent="center" padding="$4">
        <T>{t('auth.notLoggedIn')}</T>
        <Button
          marginTop="$4"
          onPress={() => navigation.navigate('Login')}
        >
          {t('auth.login')}
        </Button>
      </Y>
    );
  }

  // Render different content based on account type
  const renderAccountTypeSpecificContent = () => {
    switch (user?.accountType) {
      case AccountType.ADMIN:
        return <AdminDashboard />;
      case AccountType.BUSINESS_BOAT_OWNER:
      case AccountType.BUSINESS_DISTRIBUTOR:
        return (
          <BusinessProfileDetails
            accountType={user.accountType}
            businessProfile={businessProfile}
            onEditBusinessProfile={handleEditBusinessProfile}
          />
        );
      case AccountType.PERSONAL:
      default:
        return (
          <>
            {/* Fishing Stats for personal accounts */}
            <C padding="$4" bordered>
              <Y space="$3">
                <H fontSize="$5" fontWeight="bold">{t('profile.fishingStats')}</H>

                <X flexWrap="wrap">
                  <Y padding="$2" width="50%" space="$1">
                    <T fontSize="$7" fontWeight="bold" color="$blue9">{userStats.totalCatches}</T>
                    <T fontSize="$2" color="$gray10">{t('profile.totalCatches')}</T>
                  </Y>

                  <Y padding="$2" width="50%" space="$1">
                    <T fontSize="$7" fontWeight="bold" color="$blue9">{userStats.fishingHours}</T>
                    <T fontSize="$2" color="$gray10">{t('profile.fishingHours')}</T>
                  </Y>
                </X>

                <Y space="$2" paddingTop="$2">
                  <X space="$2" alignItems="center">
                    <Feather name="map-pin" size={16} color="#0891b2" />
                    <T fontSize="$3" fontWeight="bold">{t('profile.favoriteFishingSpot')}</T>
                  </X>
                  <T paddingLeft="$6">{userStats.favoriteFishingSpot}</T>
                </Y>

                <Y space="$2">
                  <X space="$2" alignItems="center">
                    <Feather name="award" size={16} color="#0891b2" />
                    <T fontSize="$3" fontWeight="bold">{t('profile.topCatch')}</T>
                  </X>
                  <T paddingLeft="$6">{userStats.topCatch}</T>
                </Y>
              </Y>
            </C>
          </>
        );
    }
  };

  return (
    <ScrollView>
      <Y padding="$4" space="$4">
        {/* Profile header */}
        <ProfileHeader user={user} onEditProfile={handleEditProfile} />

        {/* Contact Info - shown for all account types */}
        <C padding="$4" bordered>
          <Y space="$3">
            <H fontSize="$5" fontWeight="bold">{t('profile.contactInfo')}</H>

            <Y space="$2">
              <X space="$2" alignItems="center">
                <Feather name="phone" size={16} color="#0891b2" />
                <T fontSize="$3" fontWeight="bold">{t('auth.phoneNumber')}</T>
              </X>
              <T paddingLeft="$6">{user.phoneNumber || t('profile.notProvided')}</T>
            </Y>

            <Y space="$2">
              <X space="$2" alignItems="center">
                <Feather name="map-pin" size={16} color="#0891b2" />
                <T fontSize="$3" fontWeight="bold">{t('profile.location')}</T>
              </X>
              <T paddingLeft="$6">{user.location || t('profile.notProvided')}</T>
            </Y>

            <Y space="$2">
              <X space="$2" alignItems="center">
                <Feather name="calendar" size={16} color="#0891b2" />
                <T fontSize="$3" fontWeight="bold">{t('profile.memberSince')}</T>
              </X>
              <T paddingLeft="$6">
                {new Date(user.created_at).toLocaleDateString()}
              </T>
            </Y>
          </Y>
        </C>

        {/* Account type specific content */}
        {renderAccountTypeSpecificContent()}
      </Y>

      {/* Edit Profile Sheet */}
      <Sheet
        modal
        open={isEditingProfile}
        onOpenChange={setIsEditingProfile}
        snapPoints={[60]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />

          <Y space="$4" marginTop="$4">
            <H fontSize="$5" fontWeight="bold">{t('profile.editProfile')}</H>

            <Y space="$3">
              <T>{t('profile.fullName')}</T>
              <Input
                value={editedProfile.fullName}
                onChangeText={(text: string) => setEditedProfile({...editedProfile, fullName: text})}
                placeholder={t('profile.fullNamePlaceholder')}
              />
            </Y>

            <Y space="$3">
              <T>{t('auth.phoneNumber')}</T>
              <Input
                value={editedProfile.phoneNumber}
                onChangeText={(text: string) => setEditedProfile({...editedProfile, phoneNumber: text})}
                placeholder={t('profile.phoneNumberPlaceholder')}
                keyboardType="phone-pad"
              />
            </Y>

            <Y space="$3">
              <T>{t('profile.location')}</T>
              <Input
                value={editedProfile.location}
                onChangeText={(text: string) => setEditedProfile({...editedProfile, location: text})}
                placeholder={t('profile.locationPlaceholder')}
              />
            </Y>

            <X space="$3" justifyContent="flex-end" marginTop="$4">
              <Button
                variant="outlined"
                onPress={handleCancelEdit}
                disabled={isLoading}
              >
                {t('common.cancel')}
              </Button>

              <Button
                onPress={handleSaveProfile}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : t('common.save')}
              </Button>
            </X>
          </Y>
        </Sheet.Frame>
      </Sheet>

      {/* Edit Business Profile Sheet */}
      <Sheet
        modal
        open={isEditingBusinessProfile}
        onOpenChange={setIsEditingBusinessProfile}
        snapPoints={[70]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />

          <Y space="$4" marginTop="$4">
            <H fontSize="$5" fontWeight="bold">{t('profile.editBusinessProfile')}</H>

            <Y space="$3">
              <T>{t('profile.businessName')}</T>
              <Input
                value={editedBusinessProfile.businessName}
                onChangeText={(text: string) => setEditedBusinessProfile({...editedBusinessProfile, businessName: text})}
                placeholder={t('profile.businessNamePlaceholder')}
              />
            </Y>

            <Y space="$3">
              <T>{t('profile.registrationNumber')}</T>
              <Input
                value={editedBusinessProfile.registrationNumber}
                onChangeText={(text: string) => setEditedBusinessProfile({...editedBusinessProfile, registrationNumber: text})}
                placeholder={t('profile.registrationNumberPlaceholder')}
              />
            </Y>

            <Y space="$3">
              <T>{t('profile.taxId')}</T>
              <Input
                value={editedBusinessProfile.taxId}
                onChangeText={(text: string) => setEditedBusinessProfile({...editedBusinessProfile, taxId: text})}
                placeholder={t('profile.taxIdPlaceholder')}
              />
            </Y>

            <Y space="$3">
              <T>{t('profile.businessAddress')}</T>
              <Input
                value={editedBusinessProfile.businessAddress}
                onChangeText={(text: string) => setEditedBusinessProfile({...editedBusinessProfile, businessAddress: text})}
                placeholder={t('profile.businessAddressPlaceholder')}
              />
            </Y>

            <X space="$3" justifyContent="flex-end" marginTop="$4">
              <Button
                variant="outlined"
                onPress={handleCancelEditBusiness}
                disabled={isLoading}
              >
                {t('common.cancel')}
              </Button>

              <Button
                onPress={handleSaveBusinessProfile}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : t('common.save')}
              </Button>
            </X>
          </Y>
        </Sheet.Frame>
      </Sheet>
    </ScrollView>
  );
}
