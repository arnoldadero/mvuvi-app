import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, Select, View, TamaguiComponent } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useMarketPricesStore } from '../../services/market-prices/marketPricesStore';
import MapView, { Marker, Callout } from '../../components/maps/MapView';

interface MarketPricesScreenProps {
  navigation: any;
}

// Import directly without aliases to avoid Tamagui optimization issues
import { Y, H, T, C, B, X, P, S, Se, V } from 'tamagui';

export function MarketPricesScreen({ navigation }: MarketPricesScreenProps) {
  const { t } = useTranslation();
  const {
    prices,
    locations,
    selectedLocation,
    isLoadingPrices,
    isLoadingLocations,
    fetchMarketPrices,
    fetchMarketLocations,
    setSelectedLocation
  } = useMarketPricesStore();

  const [mapRegion, setMapRegion] = useState({
    latitude: -1.2921,
    longitude: 36.8219,
    latitudeDelta: 3,
    longitudeDelta: 3,
  });

  useEffect(() => {
    const loadData = async () => {
      await fetchMarketLocations();
      await fetchMarketPrices();
    };

    loadData();
  }, [fetchMarketLocations, fetchMarketPrices]);

  useEffect(() => {
    // Update map region when locations are loaded
    if (locations.length > 0) {
      // Calculate the center of all locations
      const totalLat = locations.reduce((sum, loc) => sum + loc.latitude, 0);
      const totalLng = locations.reduce((sum, loc) => sum + loc.longitude, 0);

      setMapRegion({
        latitude: totalLat / locations.length,
        longitude: totalLng / locations.length,
        latitudeDelta: 3,
        longitudeDelta: 3,
      });
    }
  }, [locations]);

  const handleLocationChange = async (locationId: string) => {
    setSelectedLocation(locationId);
    await fetchMarketPrices(locationId);

    // Update map region to focus on selected location
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
      setMapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }
  };

  const handleReportPrice = () => {
    navigation.navigate('ReportMarketPrice');
  };

  const handleViewAllPrices = async () => {
    setSelectedLocation(null);
    await fetchMarketPrices();

    // Reset map view to show all locations
    if (locations.length > 0) {
      const totalLat = locations.reduce((sum, loc) => sum + loc.latitude, 0);
      const totalLng = locations.reduce((sum, loc) => sum + loc.longitude, 0);

      setMapRegion({
        latitude: totalLat / locations.length,
        longitude: totalLng / locations.length,
        latitudeDelta: 3,
        longitudeDelta: 3,
      });
    }
  };

  const groupPricesBySpecies = () => {
    const grouped: Record<string, typeof prices> = {};

    prices.forEach(price => {
      if (!grouped[price.fishSpecies]) {
        grouped[price.fishSpecies] = [];
      }
      grouped[price.fishSpecies].push(price);
    });

    return grouped;
  };

  const groupedPrices = groupPricesBySpecies();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <S>
        <Y padding="$4" space="$4">
          <H>{t('marketPrices.title')}</H>
          <P>{t('marketPrices.description')}</P>

          {/* Map View */}
          <V height={250} borderRadius="$4" overflow="hidden">
            <MapView
              style={{ width: '100%', height: '100%' }}
              region={mapRegion}
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  pinColor={selectedLocation === location.id ? 'red' : 'blue'}
                  onPress={() => handleLocationChange(location.id)}
                >
                  <Callout>
                    <Y padding="$2" width={150}>
                      <T fontWeight="bold">{location.name}</T>
                      <T fontSize="$2">{location.region}</T>
                    </Y>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          </V>

          {/* Location Selector */}
          <C borderRadius="$4">
            <Y padding="$4" space="$3">
              <T fontWeight="bold">{t('marketPrices.selectLocation')}</T>

              {isLoadingLocations ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Se
                  value={selectedLocation || ''}
                  onValueChange={handleLocationChange}
                >
                  <Se.Trigger>
                    <Se.Value
                      placeholder={t('marketPrices.selectLocationPlaceholder')}
                    />
                  </Se.Trigger>
                  <Se.Content>
                    <Se.ScrollUpButton />
                    <Se.Viewport>
                      <Se.Group>
                        {locations.map((location) => (
                          <Se.Item key={location.id} value={location.id}>
                            <Se.ItemText>{location.name}</Se.ItemText>
                          </Se.Item>
                        ))}
                      </Se.Group>
                    </Se.Viewport>
                    <Se.ScrollDownButton />
                  </Se.Content>
                </Se>
              )}

              <X space="$2">
                <B
                  flex={1}
                  onPress={handleViewAllPrices}
                  disabled={isLoadingPrices}
                >
                  {t('marketPrices.viewAllLocations')}
                </B>
                <B
                  flex={1}
                  backgroundColor="$blue9"
                  color="white"
                  onPress={handleReportPrice}
                >
                  {t('marketPrices.reportPrice')}
                </B>
              </X>
            </Y>
          </C>

          {/* Market Prices */}
          <Y space="$2">
            <T fontWeight="bold" fontSize="$5">
              {selectedLocation
                ? t('marketPrices.pricesForLocation', {
                    location: locations.find(l => l.id === selectedLocation)?.name || ''
                  })
                : t('marketPrices.allPrices')
              }
            </T>

            {isLoadingPrices ? (
              <Y padding="$4" alignItems="center">
                <ActivityIndicator size="large" color="#0000ff" />
              </Y>
            ) : prices.length === 0 ? (
              <Y padding="$4" alignItems="center">
                <T>{t('marketPrices.noPricesAvailable')}</T>
              </Y>
            ) : (
              <Y space="$4">
                {Object.keys(groupedPrices).map((species) => (
                  <C key={species} borderRadius="$4" bordered>
                    <Y padding="$4" space="$3">
                      <T fontWeight="bold" fontSize="$4">{species}</T>

                      {groupedPrices[species].map((price) => {
                        const location = locations.find(l => l.id === price.location);
                        return (
                          <Y key={price.id} space="$1">
                            <X justifyContent="space-between">
                              <T>{location?.name || t('marketPrices.unknownLocation')}</T>
                              <T fontWeight="bold">
                                KES {price.price.toFixed(2)} / {price.unit}
                              </T>
                            </X>
                            <T fontSize="$2" color="$gray9">
                              {new Date(price.date).toLocaleDateString()}
                            </T>
                          </Y>
                        );
                      })}
                    </Y>
                  </C>
                ))}
              </Y>
            )}
          </Y>

          {/* Call to Action */}
          <C backgroundColor="$blue2" borderRadius="$4">
            <Y padding="$4" space="$2">
              <T fontWeight="bold">{t('marketPrices.helpImprove')}</T>
              <P fontSize="$2">
                {t('marketPrices.helpImproveDescription')}
              </P>
              <B
                marginTop="$2"
                backgroundColor="$blue9"
                color="white"
                onPress={handleReportPrice}
              >
                {t('marketPrices.reportPrice')}
              </B>
            </Y>
          </C>
        </Y>
      </S>
    </SafeAreaView>
  );
}
