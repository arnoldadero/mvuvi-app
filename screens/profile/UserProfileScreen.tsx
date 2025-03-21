import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { 
  YStack, XStack, Text, Button, Image, Card, H4, Paragraph, Spinner,
  Avatar, Sheet, Input
} from 'tamagui';
import { Feather } from '@expo/vector-icons';

import { useAuthStore } from '../../store/auth/auth-store';
import { RootStackParamList } from '../../navigation/AppNavigator';

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
  const { user, updateProfile, isLoading } = useAuthStore();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    location: user?.location || '',
  });
  
  // Stats data - in a real app, this would come from an API or local storage
  const [userStats, setUserStats] = useState({
    totalCatches: 0,
    favoriteFishingSpot: '',
    topCatch: '',
    fishingHours: 0,
  });
  
  // Fetch user stats
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
  }, []);
  
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
    });
  };
  
  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        fullName: editedProfile.fullName,
        phoneNumber: editedProfile.phoneNumber,
        location: editedProfile.location,
      });
      
      setIsEditingProfile(false);
      Alert.alert(t('common.success'), t('profile.profileUpdated'));
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
  
  return (
    <ScrollView>
      <Y padding="$4" space="$4">
        {/* Profile header */}
        <C padding="$4" bordered>
          <Y alignItems="center" space="$2">
            <A circular size="$12" borderWidth={2} borderColor="$blue8">
              <Avatar.Image 
                accessibilityLabel={user.fullName}
                src={null} 
              />
              <AF backgroundColor="$blue5">
                <T color="$blue11" fontSize="$8">
                  {user.fullName.charAt(0)}
                </T>
              </AF>
            </A>
            
            <H>{user.fullName}</H>
            <T fontSize="$2" color="$gray10">{user.email}</T>
            
            <X space="$2" marginTop="$2">
              <Button 
                size="$3" 
                onPress={handleEditProfile}
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
            </X>
          </Y>
        </C>
        
        {/* Fishing Stats */}
        <C padding="$4" bordered>
          <Y space="$3">
            <H>{t('profile.fishingStats')}</H>
            
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
        
        {/* Profile Info */}
        <C padding="$4" bordered>
          <Y space="$3">
            <H>{t('profile.contactInfo')}</H>
            
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
            <H>{t('profile.editProfile')}</H>
            
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
    </ScrollView>
  );
}
