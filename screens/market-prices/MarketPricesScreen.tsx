import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, Select, View } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useMarketPricesStore } from '../../services/market-prices/marketPricesStore';
import MapView, { Marker, Callout } from 'react-native-maps';

interface MarketPricesScreenProps {
  navigation: any;
}

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
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('marketPrices.title')}</H2>
          <Paragraph>{t('marketPrices.description')}</Paragraph>
          
          {/* Map View */}
          <View height={250} borderRadius="$4" overflow="hidden">
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
                    <YStack padding="$2" width={150}>
                      <Text fontWeight="bold">{location.name}</Text>
                      <Text fontSize="$2">{location.region}</Text>
                    </YStack>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          </View>
          
          {/* Location Selector */}
          <Card borderRadius="$4">
            <YStack padding="$4" space="$3">
              <Text fontWeight="bold">{t('marketPrices.selectLocation')}</Text>
              
              {isLoadingLocations ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Select
                  value={selectedLocation || ''}
                  onValueChange={handleLocationChange}
                >
                  <Select.Trigger>
                    <Select.Value 
                      placeholder={t('marketPrices.selectLocationPlaceholder')} 
                    />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        {locations.map((location) => (
                          <Select.Item key={location.id} value={location.id}>
                            <Select.ItemText>{location.name}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              )}
              
              <XStack space="$2">
                <Button
                  flex={1}
                  onPress={handleViewAllPrices}
                  disabled={isLoadingPrices}
                >
                  {t('marketPrices.viewAllLocations')}
                </Button>
                <Button
                  flex={1}
                  backgroundColor="$blue9"
                  color="white"
                  onPress={handleReportPrice}
                >
                  {t('marketPrices.reportPrice')}
                </Button>
              </XStack>
            </YStack>
          </Card>
          
          {/* Market Prices */}
          <YStack space="$2">
            <Text fontWeight="bold" fontSize="$5">
              {selectedLocation 
                ? t('marketPrices.pricesForLocation', { 
                    location: locations.find(loc => loc.id === selectedLocation)?.name 
                  })
                : t('marketPrices.allPrices')
              }
            </Text>
            
            {isLoadingPrices ? (
              <YStack alignItems="center" padding="$4">
                <ActivityIndicator size="small" color="#0000ff" />
              </YStack>
            ) : prices.length === 0 ? (
              <Card padding="$4" marginTop="$2">
                <Text textAlign="center">{t('marketPrices.noPricesAvailable')}</Text>
              </Card>
            ) : (
              <YStack space="$3">
                {Object.entries(groupedPrices).map(([species, speciesPrices]) => (
                  <Card key={species} borderRadius="$4" bordered>
                    <YStack>
                      <XStack 
                        backgroundColor="$blue2" 
                        padding="$3"
                        borderBottomWidth={1}
                        borderBottomColor="$gray5"
                      >
                        <Text fontWeight="bold">{species}</Text>
                      </XStack>
                      
                      <YStack padding="$2">
                        {speciesPrices.map((price, index) => (
                          <XStack 
                            key={price.id} 
                            justifyContent="space-between" 
                            padding="$2"
                            borderBottomWidth={index < speciesPrices.length - 1 ? 1 : 0}
                            borderBottomColor="$gray3"
                          >
                            <Text>{price.location}</Text>
                            <Text fontWeight="bold">
                              KES {price.price}/{price.unit}
                            </Text>
                          </XStack>
                        ))}
                      </YStack>
                      
                      <XStack 
                        backgroundColor="$gray1" 
                        padding="$2"
                        justifyContent="flex-end"
                      >
                        <Text fontSize="$2" color="$gray9">
                          {t('marketPrices.lastUpdated')}: {new Date(
                            Math.max(...speciesPrices.map(p => new Date(p.date).getTime()))
                          ).toLocaleDateString()}
                        </Text>
                      </XStack>
                    </YStack>
                  </Card>
                ))}
              </YStack>
            )}
          </YStack>
          
          {/* Price Trends */}
          <Card borderRadius="$4" backgroundColor="$blue2">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('marketPrices.priceTrends')}</Text>
              <Paragraph fontSize="$2">
                {t('marketPrices.priceTrendsDescription')}
              </Paragraph>
              <Button
                marginTop="$2"
                onPress={() => navigation.navigate('PriceTrends')}
              >
                {t('marketPrices.viewTrends')}
              </Button>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
