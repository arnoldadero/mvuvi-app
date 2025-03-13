import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Select, ScrollView } from 'tamagui';
import { DatePicker } from '../../components/ui/DatePicker';
import { useTranslation } from 'react-i18next';
import { useCatchDataStore } from '../../services/catch-data/catchDataStore';
import { z } from 'zod';

interface AddCatchRecordScreenProps {
  navigation: any;
}

// Define fish species options
const fishSpecies = [
  'Nile Perch', 'Tilapia', 'Dagaa', 'Catfish', 'Lungfish', 
  'Nile Tilapia', 'Mudfish', 'Omena', 'Other'
];

// Define gear options
const gearOptions = [
  'Gill net', 'Beach seine', 'Hook and line', 'Longline', 
  'Cast net', 'Trap', 'Trawl', 'Other'
];

// Define unit options
const unitOptions = [
  'kg', 'g', 'piece', 'bucket', 'crate'
];

// Define schema for form validation
const catchSchema = z.object({
  fishSpecies: z.string().min(1, { message: 'Fish species is required' }),
  quantity: z.number().positive({ message: 'Quantity must be a positive number' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  gearUsed: z.string().min(1, { message: 'Gear used is required' }),
  effortHours: z.number().nonnegative({ message: 'Effort hours must be a non-negative number' }),
  notes: z.string().optional(),
});

type CatchFormData = z.infer<typeof catchSchema>;

export function AddCatchRecordScreen({ navigation }: AddCatchRecordScreenProps) {
  const { t } = useTranslation();
  const { isAddingRecord, addCatchRecord } = useCatchDataStore();

  const [formData, setFormData] = useState<Partial<CatchFormData>>({
    fishSpecies: '',
    quantity: undefined,
    unit: 'kg',
    location: '',
    date: new Date().toISOString(),
    gearUsed: '',
    effortHours: undefined,
    notes: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    try {
      catchSchema.parse(formData);
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
      await addCatchRecord({
        fishSpecies: formData.fishSpecies!,
        quantity: formData.quantity!,
        unit: formData.unit!,
        location: formData.location!,
        date: formData.date!,
        gearUsed: formData.gearUsed!,
        effortHours: formData.effortHours!,
        notes: formData.notes || '',
      });
      
      Alert.alert(
        t('common.success'),
        t('catchData.recordAddedSuccess'),
        [
          {
            text: t('common.ok'),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('catchData.recordAddedError'));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('catchData.addCatch')}</H2>
          <Paragraph>{t('catchData.addCatchDescription')}</Paragraph>
          
          <Form onSubmit={handleSubmit}>
            <YStack space="$4">
              {/* Fish Species Selection */}
              <YStack space="$2">
                <Text>{t('catchData.fishSpecies')}</Text>
                <Select
                  value={formData.fishSpecies}
                  onValueChange={(value) => setFormData({ ...formData, fishSpecies: value })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder={t('catchData.selectSpecies')} />
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
              
              {/* Quantity and Unit */}
              <YStack space="$2">
                <Text>{t('catchData.quantity')}</Text>
                <XStack space="$2" alignItems="center">
                  <Input
                    flex={1}
                    value={formData.quantity?.toString() || ''}
                    onChangeText={(text) => {
                      const numValue = parseFloat(text);
                      setFormData({ 
                        ...formData, 
                        quantity: isNaN(numValue) ? undefined : numValue 
                      });
                    }}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => setFormData({ ...formData, unit: value })}
                  >
                    <Select.Trigger width={100}>
                      <Select.Value placeholder={t('catchData.selectUnit')} />
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
                {validationErrors.quantity && (
                  <Text color="$red9" fontSize="$2">{validationErrors.quantity}</Text>
                )}
              </YStack>
              
              {/* Location */}
              <YStack space="$2">
                <Text>{t('catchData.location')}</Text>
                <Input
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                  placeholder={t('catchData.enterLocation')}
                />
                {validationErrors.location && (
                  <Text color="$red9" fontSize="$2">{validationErrors.location}</Text>
                )}
              </YStack>
              
              {/* Date */}
              <YStack space="$2">
                <Text>{t('catchData.date')}</Text>
                <DatePicker
                  value={formData.date ? new Date(formData.date) : new Date()}
                  onChange={(date) => setFormData({ ...formData, date: date.toISOString() })}
                  mode="date"
                />
                {validationErrors.date && (
                  <Text color="$red9" fontSize="$2">{validationErrors.date}</Text>
                )}
              </YStack>
              
              {/* Gear Used */}
              <YStack space="$2">
                <Text>{t('catchData.gearUsed')}</Text>
                <Select
                  value={formData.gearUsed}
                  onValueChange={(value) => setFormData({ ...formData, gearUsed: value })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder={t('catchData.selectGear')} />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        {gearOptions.map((gear) => (
                          <Select.Item key={gear} value={gear}>
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
                <Text>{t('catchData.effortHours')}</Text>
                <Input
                  value={formData.effortHours?.toString() || ''}
                  onChangeText={(text) => {
                    const numValue = parseFloat(text);
                    setFormData({ 
                      ...formData, 
                      effortHours: isNaN(numValue) ? undefined : numValue 
                    });
                  }}
                  placeholder="0.0"
                  keyboardType="numeric"
                />
                {validationErrors.effortHours && (
                  <Text color="$red9" fontSize="$2">{validationErrors.effortHours}</Text>
                )}
              </YStack>
              
              {/* Notes */}
              <YStack space="$2">
                <Text>{t('catchData.notes')}</Text>
                <Input
                  value={formData.notes}
                  onChangeText={(text) => setFormData({ ...formData, notes: text })}
                  placeholder={t('catchData.notesPlaceholder')}
                  multiline
                  numberOfLines={3}
                  height={80}
                />
              </YStack>
              
              {/* Submit Button */}
              <Button
                onPress={handleSubmit}
                disabled={isAddingRecord}
                backgroundColor="$blue9"
                color="white"
                marginTop="$2"
              >
                {isAddingRecord ? (
                  <ActivityIndicator color="white" />
                ) : (
                  t('catchData.submitRecord')
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
