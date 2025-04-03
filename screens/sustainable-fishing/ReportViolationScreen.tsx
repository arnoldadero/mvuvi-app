import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Select, ScrollView, TextArea } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import * as Location from 'expo-location';

interface ReportViolationScreenProps {
  navigation: any;
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const P: any = Paragraph;
const I: any = Input;
const B: any = Button;
const F: any = Form;
const X: any = XStack;
const S: any = ScrollView;
const Se: any = Select;
const Ta: any = TextArea;

// Violation types
const violationTypes = [
  'Illegal Fishing Gear',
  'Fishing in Protected Areas',
  'Catching Undersized Fish',
  'Exceeding Catch Limits',
  'Fishing Without License',
  'Fishing During Closed Season',
  'Other'
];

// Form data type
interface ViolationFormData {
  violationType: string;
  location: string;
  description: string;
  date: string;
  contactInfo?: string;
}

// Form validation schema
const formSchema = z.object({
  violationType: z.string().min(1, 'Violation type is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string(),
  contactInfo: z.string().optional(),
});

export function ReportViolationScreen({ navigation }: ReportViolationScreenProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const [formData, setFormData] = useState<Partial<ViolationFormData>>({
    violationType: '',
    location: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    contactInfo: '',
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          t('common.error'),
          t('common.locationPermissionDenied')
        );
        setIsGettingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      
      // Reverse geocode to get address
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode && geocode.length > 0) {
        const address = geocode[0];
        const locationString = [
          address.name,
          address.street,
          address.district,
          address.city,
          address.region,
        ]
          .filter(Boolean)
          .join(', ');

        setFormData({
          ...formData,
          location: locationString,
        });
      } else {
        // If geocoding fails, just use coordinates
        setFormData({
          ...formData,
          location: `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}`,
        });
      }
    } catch (error) {
      Alert.alert(
        t('common.error'),
        t('common.locationError')
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the report to a backend service
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        t('common.success'),
        t('regulations.violationReportSuccess'),
        [
          {
            text: t('common.ok'),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('regulations.violationReportError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <S>
        <Y padding="$4" space="$4">
          <H>{t('regulations.reportViolation')}</H>
          <P>{t('regulations.reportViolationDescription')}</P>
          
          <F onSubmit={handleSubmit}>
            <Y space="$4">
              {/* Violation Type Selection */}
              <Y space="$2">
                <T>{t('regulations.violationType')}</T>
                <Se
                  value={formData.violationType}
                  onValueChange={(value: string) => setFormData({ ...formData, violationType: value })}
                >
                  <Se.Trigger>
                    <Se.Value placeholder={t('regulations.selectViolationType')} />
                  </Se.Trigger>
                  <Se.Content>
                    <Se.ScrollUpButton />
                    <Se.Viewport>
                      <Se.Group>
                        {violationTypes.map((type) => (
                          <Se.Item key={type} value={type}>
                            <Se.ItemText>{type}</Se.ItemText>
                          </Se.Item>
                        ))}
                      </Se.Group>
                    </Se.Viewport>
                    <Se.ScrollDownButton />
                  </Se.Content>
                </Se>
                {validationErrors.violationType && (
                  <T color="$red9" fontSize="$2">{validationErrors.violationType}</T>
                )}
              </Y>
              
              {/* Location */}
              <Y space="$2">
                <X space="$2" alignItems="center">
                  <T flex={1}>{t('regulations.location')}</T>
                  <B 
                    size="$2" 
                    onPress={getCurrentLocation}
                    disabled={isGettingLocation}
                  >
                    {isGettingLocation ? 
                      t('common.loading') : 
                      t('regulations.useCurrentLocation')}
                  </B>
                </X>
                <I
                  value={formData.location}
                  onChangeText={(text: string) => setFormData({ ...formData, location: text })}
                  placeholder={t('regulations.enterLocation')}
                />
                {validationErrors.location && (
                  <T color="$red9" fontSize="$2">{validationErrors.location}</T>
                )}
              </Y>
              
              {/* Description */}
              <Y space="$2">
                <T>{t('regulations.description')}</T>
                <Ta
                  value={formData.description}
                  onChangeText={(text: string) => setFormData({ ...formData, description: text })}
                  placeholder={t('regulations.descriptionPlaceholder')}
                  numberOfLines={5}
                  height={120}
                />
                {validationErrors.description && (
                  <T color="$red9" fontSize="$2">{validationErrors.description}</T>
                )}
              </Y>
              
              {/* Contact Info (Optional) */}
              <Y space="$2">
                <T>{t('regulations.contactInfo')} ({t('common.optional')})</T>
                <I
                  value={formData.contactInfo}
                  onChangeText={(text: string) => setFormData({ ...formData, contactInfo: text })}
                  placeholder={t('regulations.contactInfoPlaceholder')}
                />
              </Y>
              
              {/* Submit Button */}
              <B
                marginTop="$2"
                backgroundColor="$green9"
                color="white"
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  t('common.submit')
                )}
              </B>
            </Y>
          </F>
        </Y>
      </S>
    </SafeAreaView>
  );
}
