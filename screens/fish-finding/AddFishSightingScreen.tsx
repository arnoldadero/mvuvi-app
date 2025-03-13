import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Select, Spinner } from 'tamagui';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useFishSightingsStore } from '../../services/fish-finding/fishSightingsStore';
import { z } from 'zod';

interface AddFishSightingScreenProps {
  navigation: any;
  route: {
    params: {
      initialLocation?: {
        latitude: number;
        longitude: number;
      };
    };
  };
}

// Define fish species options
const fishSpecies = [
  'Nile Perch', 'Tilapia', 'Dagaa', 'Catfish', 'Lungfish', 
  'Nile Tilapia', 'Mudfish', 'Omena', 'Other'
];

// Define quantity options
const quantityOptions = [
  'Few (1-10)', 'Some (10-50)', 'Many (50-100)', 'Abundant (100+)'
];

// Define schema for form validation
const sightingSchema = z.object({
  species: z.string().min(1, { message: 'Species is required' }),
  quantity: z.string().min(1, { message: 'Quantity is required' }),
  location: z.string().min(1, { message: 'Location name is required' }),
  notes: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
});

type SightingFormData = z.infer<typeof sightingSchema>;

export function AddFishSightingScreen({ navigation, route }: AddFishSightingScreenProps) {
  const { t } = useTranslation();
  const { initialLocation } = route.params || {};
  const { addSighting, isAddingSighting } = useFishSightingsStore();

  const [formData, setFormData] = useState<Partial<SightingFormData>>({
    species: '',
    quantity: '',
    location: '',
    notes: '',
    latitude: initialLocation?.latitude || 0,
    longitude: initialLocation?.longitude || 0,
  });

  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [mapLocation, setMapLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(initialLocation || null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(!initialLocation);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!initialLocation) {
      getCurrentLocation();
    }
  }, [initialLocation]);

  const getCurrentLocation = async () => {
    try {
      setIsLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(t("common.error"), t("fishFinding.locationPermissionDenied"));
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      setMapLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      setFormData(prev => ({
        ...prev,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
      
      // Get location name from coordinates
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      if (address) {
        const locationName = [
          address.district,
          address.subregion,
          address.region,
        ].filter(Boolean).join(', ');
        
        setFormData(prev => ({
          ...prev,
          location: locationName || t("fishFinding.unknownLocation"),
        }));
      }
    } catch (error) {
      Alert.alert(t("common.error"), t("fishFinding.locationError"));
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setMapLocation(coordinate);
    setFormData(prev => ({
      ...prev,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
  };

  const validateForm = (): boolean => {
    try {
      sightingSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await addSighting({
        species: formData.species!,
        quantity: formData.quantity!,
        location: formData.location!,
        notes: formData.notes || '',
        latitude: formData.latitude!,
        longitude: formData.longitude!,
        reportedAt: new Date().toISOString(),
        isFavorable: formData.quantity === 'Many (50-100)' || formData.quantity === 'Abundant (100+)',
      });
      
      Alert.alert(
        t("common.success"),
        t("fishFinding.sightingReportSuccess"),
        [
          {
            text: t("common.ok"),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(t("common.error"), t("fishFinding.sightingReportError"));
    }
  };

  const mapRegion = mapLocation ? {
    latitude: mapLocation.latitude,
    longitude: mapLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : undefined;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <YStack padding="$4" space="$4" flex={1}>
        <H2>{t("fishFinding.reportSighting")}</H2>
        <Paragraph>{t("fishFinding.reportSightingDescription")}</Paragraph>

        {isLoadingLocation ? (
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Spinner size="large" color="$blue9" />
            <Text marginTop="$2">{t("fishFinding.gettingLocation")}</Text>
          </YStack>
        ) : (
          <Form onSubmit={handleSubmit}>
            <YStack space="$4">
              {/* Map for selecting location */}
              {mapLocation && (
                <YStack height={200} borderRadius="$4" overflow="hidden">
                  <MapView
                    style={{ width: '100%', height: '100%' }}
                    region={mapRegion}
                    onPress={handleMapPress}
                  >
                    {mapLocation && (
                      <Marker
                        coordinate={{
                          latitude: mapLocation.latitude,
                          longitude: mapLocation.longitude,
                        }}
                        draggable
                        onDragEnd={(e) => handleMapPress(e)}
                      />
                    )}
                  </MapView>
                  <Text fontSize="$2" marginTop="$1">{t("fishFinding.tapToSelectLocation")}</Text>
                </YStack>
              )}

              {/* Species Selection */}
              <YStack space="$2">
                <Text>{t("fishFinding.fishSpecies")}</Text>
                <Select
                  value={formData.species}
                  onValueChange={(value: string) => setFormData({ ...formData, species: value })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder={t("fishFinding.selectSpecies")} />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        {fishSpecies.map((species, index) => (
                          <Select.Item key={species} value={species} index={index}>
                            <Select.ItemText>{species}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
                {validationErrors.species && (
                  <Text color="$red9" fontSize="$2">{validationErrors.species}</Text>
                )}
              </YStack>

              {/* Quantity Selection */}
              <YStack space="$2">
                <Text>{t("fishFinding.quantity")}</Text>
                <Select
                  value={formData.quantity}
                  onValueChange={(value: string) => setFormData({ ...formData, quantity: value })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder={t("fishFinding.selectQuantity")} />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        {quantityOptions.map((quantity, index) => (
                          <Select.Item key={quantity} value={quantity} index={index}>
                            <Select.ItemText>{quantity}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
                {validationErrors.quantity && (
                  <Text color="$red9" fontSize="$2">{validationErrors.quantity}</Text>
                )}
              </YStack>

              {/* Location Name */}
              <YStack space="$2">
                <Text>{t("fishFinding.location")}</Text>
                <Input
                  value={formData.location}
                  onChangeText={(text: string) => setFormData({ ...formData, location: text })}
                  placeholder={t("fishFinding.locationPlaceholder")}
                />
                {validationErrors.location && (
                  <Text color="$red9" fontSize="$2">{validationErrors.location}</Text>
                )}
              </YStack>

              {/* Notes */}
              <YStack space="$2">
                <Text>{t("fishFinding.notes")}</Text>
                <Input
                  value={formData.notes}
                  onChangeText={(text: string) => setFormData({ ...formData, notes: text })}
                  placeholder={t("fishFinding.notesPlaceholder")}
                  multiline
                  numberOfLines={3}
                  height={80}
                />
              </YStack>

              {/* Submit Button */}
              <Button
                onPress={handleSubmit}
                disabled={isAddingSighting}
                backgroundColor="$blue9"
                color="white"
                marginTop="$2"
              >
                {isAddingSighting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  t("fishFinding.submitSighting")
                )}
              </Button>

              <Button
                variant="outlined"
                onPress={() => navigation.goBack()}
                marginTop="$2"
              >
                {t("common.cancel")}
              </Button>
            </YStack>
          </Form>
        )}
      </YStack>
    </SafeAreaView>
  );
}
