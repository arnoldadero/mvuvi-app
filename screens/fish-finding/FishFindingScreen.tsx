import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, View } from 'tamagui';
import { useTranslation } from 'react-i18next';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFishSightingsStore } from '../../services/fish-finding/fishSightingsStore';

interface FishFindingScreenProps {
  navigation: any;
}

export function FishFindingScreen({ navigation }: FishFindingScreenProps) {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { sightings, fetchSightings, isLoadingSightings } = useFishSightingsStore();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg(t('fishFinding.locationPermissionDenied'));
          setIsLoading(false);
          return;
        }

        // Get current location
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        
        // Fetch fish sightings
        await fetchSightings();
      } catch (error) {
        setErrorMsg(t('common.error'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchSightings, t]);

  const handleAddSighting = () => {
    navigation.navigate('AddFishSighting', { 
      initialLocation: location?.coords 
    });
  };

  const handleViewSightingDetails = (sightingId: string) => {
    navigation.navigate('FishSightingDetails', { sightingId });
  };

  // Default to Lake Victoria region if location not available
  const defaultRegion = {
    latitude: -1.2921,
    longitude: 36.8219,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : defaultRegion;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <YStack flex={1}>
        {/* Header */}
        <YStack padding="$4">
          <H2>{t('fishFinding.title')}</H2>
          <Paragraph>{t('fishFinding.description')}</Paragraph>
        </YStack>

        {isLoading ? (
          <YStack flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text marginTop="$2">{t('common.loading')}</Text>
          </YStack>
        ) : errorMsg ? (
          <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
            <Text color="$red9">{errorMsg}</Text>
            <Button 
              marginTop="$4" 
              onPress={() => navigation.goBack()}
            >
              {t('common.back')}
            </Button>
          </YStack>
        ) : (
          <YStack flex={1}>
            {/* Map View */}
            <View height={300}>
              <MapView 
                style={{ width: '100%', height: '100%' }}
                region={mapRegion}
                showsUserLocation
              >
                {sightings.map((sighting) => (
                  <Marker
                    key={sighting.id}
                    coordinate={{
                      latitude: sighting.latitude,
                      longitude: sighting.longitude,
                    }}
                    pinColor={sighting.isFavorable ? 'green' : 'orange'}
                    onPress={() => handleViewSightingDetails(sighting.id)}
                  >
                    <Callout>
                      <YStack padding="$2" width={150}>
                        <Text fontWeight="bold">{sighting.species}</Text>
                        <Text fontSize="$2">
                          {new Date(sighting.reportedAt).toLocaleDateString()}
                        </Text>
                        <Text fontSize="$2">{sighting.quantity} {t('fishFinding.reported')}</Text>
                      </YStack>
                    </Callout>
                  </Marker>
                ))}
              </MapView>
            </View>

            {/* Recent Sightings */}
            <YStack flex={1} padding="$4">
              <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
                <Text fontWeight="bold" fontSize="$5">{t('fishFinding.recentSightings')}</Text>
                <Button 
                  size="$3" 
                  backgroundColor="$blue9"
                  color="white"
                  onPress={handleAddSighting}
                >
                  {t('fishFinding.reportSighting')}
                </Button>
              </XStack>

              {isLoadingSightings ? (
                <YStack justifyContent="center" alignItems="center" padding="$4">
                  <ActivityIndicator size="small" color="#0000ff" />
                </YStack>
              ) : sightings.length === 0 ? (
                <Card padding="$4" marginTop="$2">
                  <Text textAlign="center">{t('fishFinding.noSightings')}</Text>
                </Card>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <YStack space="$2">
                    {sightings.slice(0, 5).map((sighting) => (
                      <Card 
                        key={sighting.id}
                        bordered
                        pressStyle={{ scale: 0.98 }}
                        onPress={() => handleViewSightingDetails(sighting.id)}
                      >
                        <YStack padding="$3">
                          <XStack justifyContent="space-between">
                            <Text fontWeight="bold">{sighting.species}</Text>
                            <Text fontSize="$2">
                              {new Date(sighting.reportedAt).toLocaleDateString()}
                            </Text>
                          </XStack>
                          <XStack marginTop="$1" justifyContent="space-between">
                            <Text fontSize="$2">{sighting.location}</Text>
                            <Text 
                              fontSize="$2" 
                              color={sighting.isFavorable ? '$green9' : '$yellow9'}
                            >
                              {sighting.quantity} {t('fishFinding.reported')}
                            </Text>
                          </XStack>
                        </YStack>
                      </Card>
                    ))}
                  </YStack>
                </ScrollView>
              )}
            </YStack>
          </YStack>
        )}
      </YStack>
    </SafeAreaView>
  );
}
