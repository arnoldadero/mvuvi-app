import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Select, ScrollView } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useMarketPricesStore } from '../../services/market-prices/marketPricesStore';
import { z } from 'zod';

interface ReportMarketPriceScreenProps {
  navigation: any;
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
const S: any = ScrollView;

// Define fish species options
const fishSpecies = [
  'Nile Perch', 'Tilapia', 'Dagaa', 'Catfish', 'Lungfish', 
  'Nile Tilapia', 'Mudfish', 'Omena', 'Other'
];

// Define unit options
const unitOptions = [
  'kg', 'g', 'piece', 'bucket', 'crate'
];

// Define schema for form validation
const priceSchema = z.object({
  fishSpecies: z.string().min(1, { message: 'Fish species is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  notes: z.string().optional(),
});

type PriceFormData = z.infer<typeof priceSchema>;

export function ReportMarketPriceScreen({ navigation }: ReportMarketPriceScreenProps) {
  const { t } = useTranslation();
  const { 
    locations, 
    isLoadingLocations,
    isAddingPrice,
    fetchMarketLocations,
    addMarketPrice
  } = useMarketPricesStore();

  const [formData, setFormData] = useState<Partial<PriceFormData>>({
    fishSpecies: '',
    location: '',
    price: undefined,
    unit: 'kg',
    notes: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchMarketLocations();
  }, [fetchMarketLocations]);

  const validateForm = (): boolean => {
    try {
      priceSchema.parse(formData);
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
      await addMarketPrice({
        fishSpecies: formData.fishSpecies!,
        location: formData.location!,
        price: formData.price!,
        unit: formData.unit!,
        date: new Date().toISOString(),
        notes: formData.notes || '',
      });
      
      Alert.alert(
        t('common.success'),
        t('marketPrices.priceReportSuccess'),
        [
          {
            text: t('common.ok'),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('marketPrices.priceReportError'));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <S>
        <Y padding="$4" space="$4">
          <H>{t('marketPrices.reportPrice')}</H>
          <P>{t('marketPrices.reportPriceDescription')}</P>
          
          <F onSubmit={handleSubmit}>
            <Y space="$4">
              {/* Fish Species Selection */}
              <Y space="$2">
                <T>{t('marketPrices.fishSpecies')}</T>
                <Se
                  value={formData.fishSpecies}
                  onValueChange={(value: string) => setFormData({ ...formData, fishSpecies: value })}
                >
                  <Se.Trigger>
                    <Se.Value placeholder={t('marketPrices.selectSpecies')} />
                  </Se.Trigger>
                  <Se.Content>
                    <Se.ScrollUpButton />
                    <Se.Viewport>
                      <Se.Group>
                        {fishSpecies.map((species) => (
                          <Se.Item key={species} value={species}>
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
              
              {/* Location Selection */}
              <Y space="$2">
                <T>{t('marketPrices.location')}</T>
                {isLoadingLocations ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <Se
                    value={formData.location}
                    onValueChange={(value: string) => setFormData({ ...formData, location: value })}
                  >
                    <Se.Trigger>
                      <Se.Value placeholder={t('marketPrices.selectLocation')} />
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
                {validationErrors.location && (
                  <T color="$red9" fontSize="$2">{validationErrors.location}</T>
                )}
              </Y>
              
              {/* Price Input */}
              <Y space="$2">
                <T>{t('marketPrices.price')}</T>
                <X space="$2" alignItems="center">
                  <T>KES</T>
                  <I
                    flex={1}
                    value={formData.price?.toString() || ''}
                    onChangeText={(text: string) => {
                      const numValue = parseFloat(text);
                      setFormData({ 
                        ...formData, 
                        price: isNaN(numValue) ? undefined : numValue 
                      });
                    }}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                  <T>per</T>
                  <Se
                    value={formData.unit}
                    onValueChange={(value: string) => setFormData({ ...formData, unit: value })}
                  >
                    <Se.Trigger width={100}>
                      <Se.Value placeholder={t('marketPrices.unit')} />
                    </Se.Trigger>
                    <Se.Content>
                      <Se.ScrollUpButton />
                      <Se.Viewport>
                        <Se.Group>
                          {unitOptions.map((unit) => (
                            <Se.Item key={unit} value={unit}>
                              <Se.ItemText>{unit}</Se.ItemText>
                            </Se.Item>
                          ))}
                        </Se.Group>
                      </Se.Viewport>
                      <Se.ScrollDownButton />
                    </Se.Content>
                  </Se>
                </X>
                {validationErrors.price && (
                  <T color="$red9" fontSize="$2">{validationErrors.price}</T>
                )}
              </Y>
              
              {/* Notes */}
              <Y space="$2">
                <T>{t('marketPrices.notes')}</T>
                <I
                  multiline
                  numberOfLines={3}
                  height={80}
                  value={formData.notes}
                  onChangeText={(text: string) => setFormData({ ...formData, notes: text })}
                  placeholder={t('marketPrices.notesPlaceholder')}
                />
              </Y>
              
              {/* Submit Button */}
              <B
                marginTop="$2"
                backgroundColor="$blue9"
                color="white"
                onPress={handleSubmit}
                disabled={isAddingPrice}
              >
                {isAddingPrice ? (
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
