import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Select, ScrollView, View, Stack, Card } from 'tamagui';
import { useTranslation } from 'react-i18next';
import MapView, { Marker } from '../../components/maps/MapView';
import { useCatchDataStore } from '../../services/catch-data/catchDataStore';
import { locationService } from '../../services/location/locationService';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import { MoonPhaseIndicator } from '../../components/catch-data/MoonPhaseIndicator';
import { Calendar, Camera } from '@tamagui/lucide-icons';

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

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const I: any = Input;
const B: any = Button;
const F: any = Form;
const P: any = Paragraph;
const X: any = XStack;
const Se: any = Select;
const Sc: any = ScrollView;
const V: any = View;
const St: any = Stack;
const C: any = Card;

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

  const [currentDate] = useState(new Date());
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
    <Sc style={{ flex: 1, backgroundColor: '#fff' }}>
      <Y padding="$4">
          <X justifyContent="space-between" alignItems="center" marginBottom="$4">
            <H>{t('catch.recordCatch')}</H>
            <MoonPhaseIndicator date={currentDate} size={40} showLabel />
          </X>

          {recordSuccess && (
            <Y backgroundColor="$green2" padding="$3" borderRadius="$2" marginTop="$2">
              <P>{t('catch.recordSuccess')}</P>
            </Y>
          )}

          {isLoadingLocation ? (
            <Y alignItems="center" padding="$4">
              <ActivityIndicator size="large" color="#0891b2" />
              <T marginTop="$2">{t('catch.gettingLocation')}</T>
            </Y>
          ) : (
            <F
              gap="$4"
              marginTop="$4"
              onSubmit={handleSubmit}
            >
              {/* Map for location selection */}
              {mapLocation && (
                <Y marginBottom="$4">
                  <T>{t('catch.mapLocation')}</T>
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
                  <T fontSize="$2" marginTop="$1">{t('catch.tapToSelectLocation')}</T>
                </Y>
              )}

              {/* Species Selection */}
              <Y marginBottom="$4">
                <T>{t('catch.fishSpecies')}</T>
                <Se
                  id="fish-species-select"
                  value={formData.fishSpecies || ''}
                  onValueChange={(value: string) => {
                    console.log('Selected species:', value);
                    setFormData({ ...formData, fishSpecies: value });
                  }}
                  native
                >
                  <Se.Trigger id="fish-species-trigger">
                    <Se.Value placeholder={t('catch.selectSpecies')} />
                  </Se.Trigger>
                  <Se.Content>
                    <Se.ScrollUpButton />
                    <Se.Viewport>
                      <Se.Group>
                        <Se.Item key="placeholder" value="" index={-1}>
                          <Se.ItemText>{t('catch.selectSpecies')}</Se.ItemText>
                        </Se.Item>
                        {fishSpecies.map((species, index) => (
                          <Se.Item key={species} value={species} index={index}>
                            <Se.ItemText>{species}</Se.ItemText>
                          </Se.Item>
                        ))}
                      </Se.Group>
                    </Se.Viewport>
                    <Se.ScrollDownButton />
                  </Se.Content>
                </Se>
                {validationErrors.fishSpecies && (
                  <T color="$red9" fontSize="$2">{validationErrors.fishSpecies}</T>
                )}
              </Y>

              {/* Quantity and Units */}
              <X marginBottom="$4">
                <Y flex={1} marginRight="$2">
                  <T>{t('catch.quantity')}</T>
                  <I
                    value={formData.quantity?.toString() || ''}
                    onChangeText={(text: string) => {
                      const value = parseFloat(text) || 0;
                      setFormData({ ...formData, quantity: value });
                    }}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                  {validationErrors.quantity && (
                    <T color="$red9" fontSize="$2">{validationErrors.quantity}</T>
                  )}
                </Y>

                <Y flex={1}>
                  <T>{t('catch.unit')}</T>
                  <Se
                    id="unit-select"
                    value={formData.unit || ''}
                    onValueChange={(value: string) => {
                      console.log('Selected unit:', value);
                      setFormData({ ...formData, unit: value });
                    }}
                    native
                  >
                    <Se.Trigger id="unit-trigger">
                      <Se.Value placeholder={t('catch.selectUnit')} />
                    </Se.Trigger>
                    <Se.Content>
                      <Se.ScrollUpButton />
                      <Se.Viewport>
                        <Se.Group>
                          <Se.Item key="placeholder" value="" index={-1}>
                            <Se.ItemText>{t('catch.selectUnit')}</Se.ItemText>
                          </Se.Item>
                          {unitOptions.map((unit, index) => (
                            <Se.Item key={unit} value={unit} index={index}>
                              <Se.ItemText>{unit}</Se.ItemText>
                            </Se.Item>
                          ))}
                        </Se.Group>
                      </Se.Viewport>
                      <Se.ScrollDownButton />
                    </Se.Content>
                  </Se>
                  {validationErrors.unit && (
                    <T color="$red9" fontSize="$2">{validationErrors.unit}</T>
                  )}
                </Y>
              </X>

              {/* Location Name */}
              <Y marginBottom="$4">
                <T>{t('catch.location')}</T>
                <I
                  value={formData.location}
                  onChangeText={(text: string) => setFormData({ ...formData, location: text })}
                  placeholder={t('catch.locationPlaceholder')}
                />
                {validationErrors.location && (
                  <T color="$red9" fontSize="$2">{validationErrors.location}</T>
                )}
              </Y>

              {/* Gear Used */}
              <Y marginBottom="$4">
                <T>{t('catch.gearUsed')}</T>
                <Se
                  id="gear-select"
                  value={formData.gearUsed || ''}
                  onValueChange={(value: string) => {
                    console.log('Selected gear:', value);
                    setFormData({ ...formData, gearUsed: value });
                  }}
                  native
                >
                  <Se.Trigger id="gear-trigger">
                    <Se.Value placeholder={t('catch.selectGear')} />
                  </Se.Trigger>
                  <Se.Content>
                    <Se.ScrollUpButton />
                    <Se.Viewport>
                      <Se.Group>
                        <Se.Item key="placeholder" value="" index={-1}>
                          <Se.ItemText>{t('catch.selectGear')}</Se.ItemText>
                        </Se.Item>
                        {gearOptions.map((gear, index) => (
                          <Se.Item key={gear} value={gear} index={index}>
                            <Se.ItemText>{gear}</Se.ItemText>
                          </Se.Item>
                        ))}
                      </Se.Group>
                    </Se.Viewport>
                    <Se.ScrollDownButton />
                  </Se.Content>
                </Se>
                {validationErrors.gearUsed && (
                  <T color="$red9" fontSize="$2">{validationErrors.gearUsed}</T>
                )}
              </Y>

              {/* Effort Hours */}
              <Y marginBottom="$4">
                <T>{t('catch.effortHours')}</T>
                <I
                  value={formData.effortHours?.toString() || ''}
                  onChangeText={(text: string) => {
                    const value = parseFloat(text) || 0;
                    setFormData({ ...formData, effortHours: value });
                  }}
                  keyboardType="numeric"
                  placeholder="0"
                />
                {validationErrors.effortHours && (
                  <T color="$red9" fontSize="$2">{validationErrors.effortHours}</T>
                )}
              </Y>

              {/* Moon Phase Information */}
              <C marginBottom="$4" bordered padding="$3">
                <X space="$2" alignItems="center" marginBottom="$2">
                  <Calendar size={18} color="#0891b2" />
                  <T fontWeight="bold">{t('weather.moonPhase')}</T>
                </X>
                <P fontSize="$3" marginBottom="$2">
                  {t('catch.moonPhaseHelp')}
                </P>
                <X justifyContent="center" marginTop="$2">
                  <MoonPhaseIndicator date={currentDate} size={60} showLabel />
                </X>
              </C>

              {/* Notes */}
              <Y marginBottom="$4">
                <T>{t('catch.notes')}</T>
                <I
                  value={formData.notes}
                  onChangeText={(text: string) => setFormData({ ...formData, notes: text })}
                  placeholder={t('catch.notesPlaceholder')}
                  multiline
                  numberOfLines={3}
                  height={80}
                />
              </Y>

              {/* Photo Button - Placeholder for future implementation */}
              <B
                marginBottom="$4"
                icon={<Camera size={18} />}
                variant="outlined"
                onPress={() => Alert.alert(t('common.comingSoon'), t('catch.photoFeatureComingSoon'))}
              >
                {t('catch.addPhoto')}
              </B>

              {/* Submit Button */}
              <B
                onPress={() => handleSubmit()}
                disabled={isAddingRecord}
                backgroundColor="$green9"
                marginTop="$2"
              >
                {isAddingRecord ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <T color="white">{t('catch.submit')}</T>
                )}
              </B>
            </F>
          )}
        </Y>
      </Sc>
  );
}
