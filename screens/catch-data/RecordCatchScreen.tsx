import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Select, ScrollView, View } from 'tamagui';
import { useTranslation } from 'react-i18next';
import MapView, { Marker } from 'react-native-maps';
import { useCatchDataStore } from '../../services/catch-data/catchDataStore';
import { locationService } from '../../services/location/locationService';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';

interface RecordCatchScreenProps {
  navigation?: any;
  route?: {
    params?: {
      initialLocation?: {
        latitude: number;
        longitude: number;
      };
    };
  };
}

// Fish species options - these could be moved to a separate config file
const fishSpecies = [
  'Nile Perch', 'Tilapia', 'Dagaa', 'Catfish', 'Lungfish', 
  'Nile Tilapia', 'Mudfish', 'Omena', 'Other'
];

// Define units options
const unitOptions = [
  'kg', 'lbs', 'pieces', 'buckets'
];

// Define gears options
const gearOptions = [
  'Net', 'Trap', 'Hook and Line', 'Trawl', 'Spear', 'Other'
];

// Define schema for form validation
const catchSchema = z.object({
  fishSpecies: z.string().min(1, { message: 'Fish species is required' }),
  quantity: z.number().positive({ message: 'Quantity must be positive' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  location: z.string().min(1, { message: 'Location name is required' }),
  gearUsed: z.string().min(1, { message: 'Gear used is required' }),
  effortHours: z.number().nonnegative({ message: 'Effort hours must be zero or positive' }),
  notes: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type CatchFormData = z.infer<typeof catchSchema>;

export function RecordCatchScreen({ navigation, route }: RecordCatchScreenProps) {
  const { t } = useTranslation();
  const nav = useNavigation();
  const initialLocation = route?.params?.initialLocation;
  const { addCatchRecord, isAddingRecord, fetchCatchRecords } = useCatchDataStore();

  const [formData, setFormData] = useState<Partial<CatchFormData>>({
    fishSpecies: '',
    quantity: 0,
    unit: 'kg',
    location: '',
    gearUsed: '',
    effortHours: 0,
    notes: '',
    latitude: initialLocation?.latitude,
    longitude: initialLocation?.longitude,
  });

  const [isLoadingLocation, setIsLoadingLocation] = useState(!initialLocation);
  const [mapLocation, setMapLocation] = useState(initialLocation);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(true);
  const [recordSuccess, setRecordSuccess] = useState(false);

  useEffect(() => {
    if (!initialLocation) {
      getCurrentLocation();
    }
  }, [initialLocation]);

  const getCurrentLocation = async () => {
    try {
      setIsLoadingLocation(true);
      
      const result = await locationService.getCurrentLocation();
      
      if (result.error) {
        Alert.alert(t('common.error'), t('catch.locationError'));
        return;
      }
      
      if (result.coordinates) {
        setMapLocation(result.coordinates);
        
        setFormData(prev => ({
          ...prev,
          latitude: result.coordinates?.latitude,
          longitude: result.coordinates?.longitude,
          location: result.locationName || prev.location,
        }));
      }
    } catch (error) {
      Alert.alert(t('common.error'), t('catch.locationError'));
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleMapPress = (e: any) => {
    const { coordinate } = e.nativeEvent;
    
    setMapLocation(coordinate);
    setFormData(prev => ({
      ...prev,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
  };

  const validateForm = () => {
    try {
      catchSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          errors[path] = err.message;
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
      await addCatchRecord({
        fishSpecies: formData.fishSpecies!,
        quantity: formData.quantity!,
        unit: formData.unit!,
        location: formData.location!,
        date: new Date().toISOString(),
        gearUsed: formData.gearUsed!,
        effortHours: formData.effortHours!,
        notes: formData.notes,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });
      
      // Reset form and show success message
      setFormData({
        fishSpecies: '',
        quantity: 0,
        unit: 'kg',
        location: '',
        gearUsed: '',
        effortHours: 0,
        notes: '',
        latitude: mapLocation?.latitude,
        longitude: mapLocation?.longitude,
      });
      
      setRecordSuccess(true);
      fetchCatchRecords(); // Refresh the catch records
      
      setTimeout(() => {
        setRecordSuccess(false);
      }, 3000);
    } catch (error) {
      Alert.alert(t('common.error'), t('catch.recordError'));
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
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('catch.recordCatch')}</H2>
          
          {recordSuccess && (
            <YStack backgroundColor="$green2" padding="$3" borderRadius="$2">
              <Paragraph color="$green9">{t('catch.recordSuccess')}</Paragraph>
            </YStack>
          )}
          
          {isLoadingLocation ? (
            <YStack alignItems="center" padding="$4">
              <ActivityIndicator size="large" color="#0891b2" />
              <Text marginTop="$2">{t('catch.gettingLocation')}</Text>
            </YStack>
          ) : (
            <Form onSubmit={handleSubmit}>
              <YStack space="$4">
                {/* Map for location selection */}
                {mapLocation && (
                  <YStack>
                    <Text>{t('catch.mapLocation')}</Text>
                    <MapView
                      style={{ height: 200, width: '100%', borderRadius: 8 }}
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
                    <Text fontSize="$2" marginTop="$1">{t('catch.tapToSelectLocation')}</Text>
                  </YStack>
                )}

                {/* Species Selection */}
                <YStack space="$2">
                  <Text>{t('catch.fishSpecies')}</Text>
                  <Select
                    value={formData.fishSpecies}
                    onValueChange={(value: string) => setFormData({ ...formData, fishSpecies: value })}
                  >
                    <Select.Trigger>
                      <Select.Value placeholder={t('catch.selectSpecies')} />
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
                  {validationErrors.fishSpecies && (
                    <Text color="$red9" fontSize="$2">{validationErrors.fishSpecies}</Text>
                  )}
                </YStack>

                {/* Quantity and Units */}
                <XStack space="$2">
                  <YStack flex={1} space="$2">
                    <Text>{t('catch.quantity')}</Text>
                    <Input
                      value={formData.quantity?.toString() || ''}
                      onChangeText={(text: string) => {
                        const value = parseFloat(text) || 0;
                        setFormData({ ...formData, quantity: value });
                      }}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                    {validationErrors.quantity && (
                      <Text color="$red9" fontSize="$2">{validationErrors.quantity}</Text>
                    )}
                  </YStack>

                  <YStack flex={1} space="$2">
                    <Text>{t('catch.unit')}</Text>
                    <Select
                      value={formData.unit}
                      onValueChange={(value: string) => setFormData({ ...formData, unit: value })}
                    >
                      <Select.Trigger>
                        <Select.Value placeholder={t('catch.selectUnit')} />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.ScrollUpButton />
                        <Select.Viewport>
                          <Select.Group>
                            {unitOptions.map((unit, index) => (
                              <Select.Item key={unit} value={unit} index={index}>
                                <Select.ItemText>{unit}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </Select.Viewport>
                        <Select.ScrollDownButton />
                      </Select.Content>
                    </Select>
                    {validationErrors.unit && (
                      <Text color="$red9" fontSize="$2">{validationErrors.unit}</Text>
                    )}
                  </YStack>
                </XStack>

                {/* Location Name */}
                <YStack space="$2">
                  <Text>{t('catch.location')}</Text>
                  <Input
                    value={formData.location}
                    onChangeText={(text: string) => setFormData({ ...formData, location: text })}
                    placeholder={t('catch.locationPlaceholder')}
                  />
                  {validationErrors.location && (
                    <Text color="$red9" fontSize="$2">{validationErrors.location}</Text>
                  )}
                </YStack>

                {/* Gear Used */}
                <YStack space="$2">
                  <Text>{t('catch.gearUsed')}</Text>
                  <Select
                    value={formData.gearUsed}
                    onValueChange={(value: string) => setFormData({ ...formData, gearUsed: value })}
                  >
                    <Select.Trigger>
                      <Select.Value placeholder={t('catch.selectGear')} />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        <Select.Group>
                          {gearOptions.map((gear, index) => (
                            <Select.Item key={gear} value={gear} index={index}>
                              <Select.ItemText>{gear}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select>
                  {validationErrors.gearUsed && (
                    <Text color="$red9" fontSize="$2">{validationErrors.gearUsed}</Text>
                  )}
                </YStack>

                {/* Effort Hours */}
                <YStack space="$2">
                  <Text>{t('catch.effortHours')}</Text>
                  <Input
                    value={formData.effortHours?.toString() || ''}
                    onChangeText={(text: string) => {
                      const value = parseFloat(text) || 0;
                      setFormData({ ...formData, effortHours: value });
                    }}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                  {validationErrors.effortHours && (
                    <Text color="$red9" fontSize="$2">{validationErrors.effortHours}</Text>
                  )}
                </YStack>

                {/* Notes */}
                <YStack space="$2">
                  <Text>{t('catch.notes')}</Text>
                  <Input
                    value={formData.notes}
                    onChangeText={(text: string) => setFormData({ ...formData, notes: text })}
                    placeholder={t('catch.notesPlaceholder')}
                    multiline
                    numberOfLines={3}
                    height={80}
                  />
                </YStack>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isAddingRecord}
                  backgroundColor="$green9"
                  color="white"
                  marginTop="$2"
                >
                  {isAddingRecord ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    t('catch.submit')
                  )}
                </Button>
              </YStack>
            </Form>
          )}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
