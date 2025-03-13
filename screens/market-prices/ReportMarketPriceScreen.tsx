import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Select, ScrollView } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useMarketPricesStore } from '../../services/market-prices/marketPricesStore';
import { z } from 'zod';

interface ReportMarketPriceScreenProps {
  navigation: any;
}

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
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('marketPrices.reportPrice')}</H2>
          <Paragraph>{t('marketPrices.reportPriceDescription')}</Paragraph>
          
          <Form onSubmit={handleSubmit}>
            <YStack space="$4">
              {/* Fish Species Selection */}
              <YStack space="$2">
                <Text>{t('marketPrices.fishSpecies')}</Text>
                <Select
                  value={formData.fishSpecies}
                  onValueChange={(value) => setFormData({ ...formData, fishSpecies: value })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder={t('marketPrices.selectSpecies')} />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        {fishSpecies.map((species) => (
                          <Select.Item key={species} value={species}>
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
              
              {/* Location Selection */}
              <YStack space="$2">
                <Text>{t('marketPrices.location')}</Text>
                {isLoadingLocations ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                  >
                    <Select.Trigger>
                      <Select.Value placeholder={t('marketPrices.selectLocation')} />
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
                {validationErrors.location && (
                  <Text color="$red9" fontSize="$2">{validationErrors.location}</Text>
                )}
              </YStack>
              
              {/* Price Input */}
              <YStack space="$2">
                <Text>{t('marketPrices.price')}</Text>
                <XStack space="$2" alignItems="center">
                  <Text>KES</Text>
                  <Input
                    flex={1}
                    value={formData.price?.toString() || ''}
                    onChangeText={(text) => {
                      const numValue = parseFloat(text);
                      setFormData({ 
                        ...formData, 
                        price: isNaN(numValue) ? undefined : numValue 
                      });
                    }}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                  <Text>per</Text>
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => setFormData({ ...formData, unit: value })}
                  >
                    <Select.Trigger width={100}>
                      <Select.Value placeholder={t('marketPrices.selectUnit')} />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        <Select.Group>
                          {unitOptions.map((unit) => (
                            <Select.Item key={unit} value={unit}>
                              <Select.ItemText>{unit}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select>
                </XStack>
                {validationErrors.price && (
                  <Text color="$red9" fontSize="$2">{validationErrors.price}</Text>
                )}
              </YStack>
              
              {/* Notes */}
              <YStack space="$2">
                <Text>{t('marketPrices.notes')}</Text>
                <Input
                  value={formData.notes}
                  onChangeText={(text) => setFormData({ ...formData, notes: text })}
                  placeholder={t('marketPrices.notesPlaceholder')}
                  multiline
                  numberOfLines={3}
                  height={80}
                />
              </YStack>
              
              {/* Submit Button */}
              <Button
                onPress={handleSubmit}
                disabled={isAddingPrice}
                backgroundColor="$blue9"
                color="white"
                marginTop="$2"
              >
                {isAddingPrice ? (
                  <ActivityIndicator color="white" />
                ) : (
                  t('marketPrices.submitPrice')
                )}
              </Button>
              
              <Button
                variant="outlined"
                onPress={() => navigation.goBack()}
                marginTop="$2"
              >
                {t('common.cancel')}
              </Button>
            </YStack>
          </Form>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
