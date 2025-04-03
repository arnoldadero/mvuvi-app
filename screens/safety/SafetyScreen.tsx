import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator, Linking, Platform } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, View, Circle } from 'tamagui';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';
import MapView, { Marker } from '../../components/maps/MapView';
import { useSafetyStore } from '../../services/safety/safetyStore';

interface SafetyScreenProps {
  navigation: any;
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const P: any = Paragraph;
const X: any = XStack;
const C: any = Card;
const B: any = Button;
const Ci: any = Circle;

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
        <Y padding="$4" space="$4">
          <H>{t('safety.title')}</H>
          <P>{t('safety.description')}</P>

          {/* SOS Button */}
          <Y alignItems="center" marginVertical="$4">
            <Ci
              size={150}
              backgroundColor={sosActive ? '$red9' : '$red5'}
              pressStyle={{ scale: 0.97 }}
              onPress={handleSOS}
              animation="bouncy"
            >
              <T
                color="white"
                fontWeight="bold"
                fontSize="$8"
              >
                SOS
              </T>
            </Ci>
            <T marginTop="$2">
              {sosActive ? t('safety.sosActive') : t('safety.tapForSOS')}
            </T>
          </Y>

          {/* Location Sharing */}
          <C borderRadius="$4">
            <Y padding="$4" space="$3">
              <X justifyContent="space-between" alignItems="center">
                <T fontWeight="bold">{t('safety.locationSharing')}</T>
                <B
                  backgroundColor={isLocationSharingEnabled ? '$green9' : '$gray9'}
                  onPress={handleToggleLocationSharing}
                >
                  {isLocationSharingEnabled ? t('common.enabled') : t('common.disabled')}
                </B>
              </X>

              <P fontSize="$2">
                {t('safety.locationSharingDescription')}
              </P>

              {isLocationSharingEnabled && (
                <>
                  {isLoadingLocation ? (
                    <Y alignItems="center" padding="$2">
                      <ActivityIndicator size="small" color="#0000ff" />
                      <T marginTop="$1">{t('safety.gettingLocation')}</T>
                    </Y>
                  ) : location ? (
                    <Y height={200} borderRadius="$4" overflow="hidden" marginTop="$2">
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
                      <T fontSize="$2" marginTop="$1">
                        {t('safety.lastKnownLocation')}: {new Date().toLocaleTimeString()}
                      </T>
                    </Y>
                  ) : (
                    <T color="$red9">{t('safety.noLocationAvailable')}</T>
                  )}
                </>
              )}
            </Y>
          </C>

          {/* Emergency Contacts */}
          <C borderRadius="$4">
            <Y padding="$4" space="$3">
              <X justifyContent="space-between" alignItems="center">
                <T fontWeight="bold">{t('safety.emergencyContacts')}</T>
                <B
                  size="$3"
                  backgroundColor="$blue9"
                  color="white"
                  onPress={() => navigation.navigate('EmergencyContacts')}
                >
                  {t('safety.manageContacts')}
                </B>
              </X>

              {isLoadingContacts ? (
                <Y alignItems="center" padding="$2">
                  <ActivityIndicator size="small" color="#0000ff" />
                </Y>
              ) : emergencyContacts.length === 0 ? (
                <T textAlign="center" marginTop="$2">
                  {t('safety.noEmergencyContactsAdded')}
                </T>
              ) : (
                <Y space="$2" marginTop="$2">
                  {emergencyContacts.map((contact, index) => (
                    <C key={contact.id} bordered padding="$3">
                      <X justifyContent="space-between">
                        <T fontWeight="bold">{contact.name}</T>
                      </X>
                      <T>{contact.phoneNumber}</T>
                      <T fontSize="$2" color="$gray9">{contact.relationship}</T>
                    </C>
                  ))}
                </Y>
              )}
            </Y>
          </C>

          {/* Safety Checklist */}
          <C borderRadius="$4">
            <Y padding="$4" space="$2">
              <T fontWeight="bold">{t('safety.safetyChecklist')}</T>
              <P fontSize="$2">
                {t('safety.safetyChecklistDescription')}
              </P>
              <B
                marginTop="$2"
                onPress={() => navigation.navigate('SafetyChecklist')}
              >
                {t('safety.viewChecklist')}
              </B>
            </Y>
          </C>

          {/* Weather Alerts */}
          <C borderRadius="$4">
            <Y padding="$4" space="$2">
              <T fontWeight="bold">{t('safety.weatherAlerts')}</T>
              <P fontSize="$2">
                {t('safety.weatherAlertsDescription')}
              </P>
              <B
                marginTop="$2"
                onPress={() => navigation.navigate('Weather')}
              >
                {t('safety.checkWeather')}
              </B>
            </Y>
          </C>
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
