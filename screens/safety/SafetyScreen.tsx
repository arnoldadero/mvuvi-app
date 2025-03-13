import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator, Linking, Platform } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, View, Circle } from 'tamagui';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useSafetyStore } from '../../services/safety/safetyStore';

interface SafetyScreenProps {
  navigation: any;
}

export function SafetyScreen({ navigation }: SafetyScreenProps) {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  
  const { 
    emergencyContacts, 
    isLocationSharingEnabled,
    isLoadingContacts,
    toggleLocationSharing,
    fetchEmergencyContacts
  } = useSafetyStore();

  useEffect(() => {
    fetchEmergencyContacts();
    if (isLocationSharingEnabled) {
      getCurrentLocation();
    }
  }, [fetchEmergencyContacts, isLocationSharingEnabled]);

  const getCurrentLocation = async () => {
    try {
      setIsLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(t('common.error'), t('safety.locationPermissionDenied'));
        return;
      }
      
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert(t('common.error'), t('safety.locationError'));
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSOS = async () => {
    if (!location) {
      Alert.alert(t('common.error'), t('safety.noLocationForSOS'));
      return;
    }

    if (emergencyContacts.length === 0) {
      Alert.alert(
        t('safety.noEmergencyContacts'),
        t('safety.addEmergencyContactsPrompt'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('safety.addContacts'),
            onPress: () => navigation.navigate('EmergencyContacts'),
          },
        ]
      );
      return;
    }

    setSosActive(true);
    
    // Create SOS message with location
    const locationUrl = `https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;
    const message = `${t('safety.sosMessage')} ${locationUrl}`;
    
    // Send SMS to all emergency contacts
    for (const contact of emergencyContacts) {
      try {
        if (Platform.OS === 'android') {
          await Linking.openURL(`sms:${contact.phoneNumber}?body=${encodeURIComponent(message)}`);
        } else {
          await Linking.openURL(`sms:${contact.phoneNumber}&body=${encodeURIComponent(message)}`);
        }
      } catch (error) {
        console.error('Error sending SMS:', error);
      }
    }
    
    // Show alert that SOS has been activated
    Alert.alert(
      t('safety.sosActivated'),
      t('safety.sosMessage'),
      [
        {
          text: t('safety.cancelSOS'),
          onPress: () => setSosActive(false),
          style: 'cancel',
        },
        {
          text: t('common.ok'),
        },
      ]
    );
  };

  const handleToggleLocationSharing = async () => {
    if (!isLocationSharingEnabled) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(t('common.error'), t('safety.locationPermissionDenied'));
        return;
      }
      
      await getCurrentLocation();
    }
    
    toggleLocationSharing();
    
    Alert.alert(
      t('common.success'),
      isLocationSharingEnabled 
        ? t('safety.locationSharingDisabled')
        : t('safety.locationSharingEnabled')
    );
  };

  const mapRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : undefined;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('safety.title')}</H2>
          <Paragraph>{t('safety.description')}</Paragraph>
          
          {/* SOS Button */}
          <YStack alignItems="center" marginVertical="$4">
            <Circle
              size={150}
              backgroundColor={sosActive ? '$red9' : '$red5'}
              pressStyle={{ scale: 0.97 }}
              onPress={handleSOS}
              animation="bouncy"
            >
              <Text 
                color="white" 
                fontWeight="bold" 
                fontSize="$8"
              >
                SOS
              </Text>
            </Circle>
            <Text marginTop="$2">
              {sosActive ? t('safety.sosActive') : t('safety.tapForSOS')}
            </Text>
          </YStack>
          
          {/* Location Sharing */}
          <Card borderRadius="$4">
            <YStack padding="$4" space="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">{t('safety.locationSharing')}</Text>
                <Button
                  backgroundColor={isLocationSharingEnabled ? '$green9' : '$gray9'}
                  onPress={handleToggleLocationSharing}
                >
                  {isLocationSharingEnabled ? t('common.enabled') : t('common.disabled')}
                </Button>
              </XStack>
              
              <Paragraph fontSize="$2">
                {t('safety.locationSharingDescription')}
              </Paragraph>
              
              {isLocationSharingEnabled && (
                <>
                  {isLoadingLocation ? (
                    <YStack alignItems="center" padding="$2">
                      <ActivityIndicator size="small" color="#0000ff" />
                      <Text marginTop="$1">{t('safety.gettingLocation')}</Text>
                    </YStack>
                  ) : location ? (
                    <YStack height={200} borderRadius="$4" overflow="hidden" marginTop="$2">
                      <MapView
                        style={{ width: '100%', height: '100%' }}
                        region={mapRegion}
                        scrollEnabled={false}
                        zoomEnabled={false}
                      >
                        <Marker
                          coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                          }}
                        />
                      </MapView>
                      <Text fontSize="$2" marginTop="$1">
                        {t('safety.lastKnownLocation')}: {new Date().toLocaleTimeString()}
                      </Text>
                    </YStack>
                  ) : (
                    <Text color="$red9">{t('safety.noLocationAvailable')}</Text>
                  )}
                </>
              )}
            </YStack>
          </Card>
          
          {/* Emergency Contacts */}
          <Card borderRadius="$4">
            <YStack padding="$4" space="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">{t('safety.emergencyContacts')}</Text>
                <Button
                  size="$3"
                  backgroundColor="$blue9"
                  color="white"
                  onPress={() => navigation.navigate('EmergencyContacts')}
                >
                  {t('safety.manageContacts')}
                </Button>
              </XStack>
              
              {isLoadingContacts ? (
                <YStack alignItems="center" padding="$2">
                  <ActivityIndicator size="small" color="#0000ff" />
                </YStack>
              ) : emergencyContacts.length === 0 ? (
                <Text textAlign="center" marginTop="$2">
                  {t('safety.noEmergencyContactsAdded')}
                </Text>
              ) : (
                <YStack space="$2" marginTop="$2">
                  {emergencyContacts.map((contact, index) => (
                    <Card key={contact.id} bordered padding="$3">
                      <XStack justifyContent="space-between">
                        <Text fontWeight="bold">{contact.name}</Text>
                      </XStack>
                      <Text>{contact.phoneNumber}</Text>
                      <Text fontSize="$2" color="$gray9">{contact.relationship}</Text>
                    </Card>
                  ))}
                </YStack>
              )}
            </YStack>
          </Card>
          
          {/* Safety Checklist */}
          <Card borderRadius="$4">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('safety.safetyChecklist')}</Text>
              <Paragraph fontSize="$2">
                {t('safety.safetyChecklistDescription')}
              </Paragraph>
              <Button
                marginTop="$2"
                onPress={() => navigation.navigate('SafetyChecklist')}
              >
                {t('safety.viewChecklist')}
              </Button>
            </YStack>
          </Card>
          
          {/* Weather Alerts */}
          <Card borderRadius="$4">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('safety.weatherAlerts')}</Text>
              <Paragraph fontSize="$2">
                {t('safety.weatherAlertsDescription')}
              </Paragraph>
              <Button
                marginTop="$2"
                onPress={() => navigation.navigate('Weather')}
              >
                {t('safety.checkWeather')}
              </Button>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
