import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, Alert, Share } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, View } from 'tamagui';
import { useTranslation } from 'react-i18next';
import MapView, { Marker } from 'react-native-maps';
import { useFishSightingsStore } from '../../services/fish-finding/fishSightingsStore';

interface FishSightingDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      sightingId: string;
    };
  };
}

export function FishSightingDetailsScreen({ navigation, route }: FishSightingDetailsScreenProps) {
  const { t } = useTranslation();
  const { sightingId } = route.params;
  const { getSightingById, isLoadingSightings } = useFishSightingsStore();
  const [sighting, setSighting] = useState<any>(null);

  useEffect(() => {
    if (sightingId) {
      const fishSighting = getSightingById(sightingId);
      setSighting(fishSighting);
    }
  }, [sightingId, getSightingById]);

  const handleShareSighting = async () => {
    if (!sighting) return;

    try {
      const result = await Share.share({
        message: `${t('fishFinding.shareSightingMessage')}: ${sighting.species} ${t('fishFinding.atLocation')} ${sighting.location}. ${t('fishFinding.quantity')}: ${sighting.quantity}. ${t('fishFinding.reportedAt')}: ${new Date(sighting.reportedAt).toLocaleDateString()}`,
      });
    } catch (error) {
      Alert.alert(t('common.error'), t('fishFinding.shareError'));
    }
  };

  if (isLoadingSightings || !sighting) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <YStack flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text marginTop="$2">{t('common.loading')}</Text>
        </YStack>
      </SafeAreaView>
    );
  }

  const mapRegion = {
    latitude: sighting.latitude,
    longitude: sighting.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <H2>{sighting.species}</H2>
            <Text 
              color={sighting.isFavorable ? '$green9' : '$yellow9'}
              fontWeight="bold"
            >
              {sighting.isFavorable 
                ? t('fishFinding.favorable') 
                : t('fishFinding.lessFavorable')}
            </Text>
          </XStack>

          {/* Map View */}
          <View height={250} borderRadius="$4" overflow="hidden">
            <MapView 
              style={{ width: '100%', height: '100%' }}
              region={mapRegion}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: sighting.latitude,
                  longitude: sighting.longitude,
                }}
                pinColor={sighting.isFavorable ? 'green' : 'orange'}
              />
            </MapView>
          </View>

          {/* Sighting Details */}
          <Card borderRadius="$4">
            <YStack padding="$4" space="$3">
              <XStack justifyContent="space-between">
                <Text fontWeight="bold">{t('fishFinding.location')}</Text>
                <Text>{sighting.location}</Text>
              </XStack>
              
              <XStack justifyContent="space-between">
                <Text fontWeight="bold">{t('fishFinding.reportedAt')}</Text>
                <Text>{new Date(sighting.reportedAt).toLocaleString()}</Text>
              </XStack>
              
              <XStack justifyContent="space-between">
                <Text fontWeight="bold">{t('fishFinding.quantity')}</Text>
                <Text>{sighting.quantity}</Text>
              </XStack>
              
              {sighting.notes && (
                <YStack space="$1">
                  <Text fontWeight="bold">{t('fishFinding.notes')}</Text>
                  <Paragraph>{sighting.notes}</Paragraph>
                </YStack>
              )}
            </YStack>
          </Card>

          {/* Fishing Recommendations */}
          <Card borderRadius="$4" backgroundColor={sighting.isFavorable ? '$green2' : '$yellow2'}>
            <YStack padding="$4">
              <Text fontWeight="bold">{t('fishFinding.recommendation')}</Text>
              <Paragraph marginTop="$2">
                {sighting.isFavorable 
                  ? t('fishFinding.favorableRecommendation') 
                  : t('fishFinding.lessFavorableRecommendation')}
              </Paragraph>
            </YStack>
          </Card>

          {/* Action Buttons */}
          <XStack space="$2" marginTop="$2">
            <Button
              flex={1}
              backgroundColor="$blue9"
              color="white"
              onPress={handleShareSighting}
            >
              {t('common.share')}
            </Button>
            
            <Button
              flex={1}
              variant="outlined"
              onPress={() => navigation.goBack()}
            >
              {t('common.back')}
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
