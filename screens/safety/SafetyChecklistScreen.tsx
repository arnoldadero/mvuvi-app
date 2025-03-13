import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { YStack, H2, Text, Paragraph, ScrollView, Checkbox, XStack, Card, Button } from 'tamagui';
import { useTranslation } from 'react-i18next';

interface SafetyChecklistScreenProps {
  navigation: any;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
}

export function SafetyChecklistScreen({ navigation }: SafetyChecklistScreenProps) {
  const { t } = useTranslation();
  
  // Define safety checklist items
  const checklistItems: ChecklistItem[] = [
    {
      id: 'life-jacket',
      title: t('safety.checklist.lifeJacket'),
      description: t('safety.checklist.lifeJacketDesc'),
    },
    {
      id: 'weather',
      title: t('safety.checklist.checkWeather'),
      description: t('safety.checklist.checkWeatherDesc'),
    },
    {
      id: 'boat-check',
      title: t('safety.checklist.boatCheck'),
      description: t('safety.checklist.boatCheckDesc'),
    },
    {
      id: 'communication',
      title: t('safety.checklist.communication'),
      description: t('safety.checklist.communicationDesc'),
    },
    {
      id: 'first-aid',
      title: t('safety.checklist.firstAid'),
      description: t('safety.checklist.firstAidDesc'),
    },
    {
      id: 'fuel',
      title: t('safety.checklist.fuel'),
      description: t('safety.checklist.fuelDesc'),
    },
    {
      id: 'float-plan',
      title: t('safety.checklist.floatPlan'),
      description: t('safety.checklist.floatPlanDesc'),
    },
    {
      id: 'navigation',
      title: t('safety.checklist.navigation'),
      description: t('safety.checklist.navigationDesc'),
    },
    {
      id: 'water',
      title: t('safety.checklist.water'),
      description: t('safety.checklist.waterDesc'),
    },
    {
      id: 'emergency-contacts',
      title: t('safety.checklist.emergencyContacts'),
      description: t('safety.checklist.emergencyContactsDesc'),
    },
  ];
  
  // State to track checked items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  const handleToggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  const getCompletionPercentage = () => {
    const totalItems = checklistItems.length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };
  
  const resetChecklist = () => {
    setCheckedItems({});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('safety.safetyChecklist')}</H2>
          <Paragraph>{t('safety.safetyChecklistScreenDescription')}</Paragraph>
          
          {/* Completion Progress */}
          <Card borderRadius="$4" backgroundColor="$blue2">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('safety.completion')}: {getCompletionPercentage()}%</Text>
              <XStack height={10} backgroundColor="$gray5" borderRadius="$full" overflow="hidden">
                <YStack 
                  backgroundColor="$blue9" 
                  width={`${getCompletionPercentage()}%`} 
                  height="100%" 
                />
              </XStack>
              <Button 
                marginTop="$2" 
                variant="outlined" 
                onPress={resetChecklist}
                disabled={getCompletionPercentage() === 0}
              >
                {t('safety.resetChecklist')}
              </Button>
            </YStack>
          </Card>
          
          {/* Checklist Items */}
          <YStack space="$3">
            {checklistItems.map((item) => (
              <Card key={item.id} borderRadius="$4" bordered>
                <YStack padding="$3">
                  <XStack alignItems="center" space="$2">
                    <Checkbox
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      size="$4"
                    >
                      <Checkbox.Indicator>
                        <Text>✓</Text>
                      </Checkbox.Indicator>
                    </Checkbox>
                    <Text 
                      fontWeight="bold" 
                      textDecorationLine={checkedItems[item.id] ? 'line-through' : 'none'}
                    >
                      {item.title}
                    </Text>
                  </XStack>
                  <Paragraph 
                    marginTop="$1" 
                    marginLeft="$6" 
                    fontSize="$2"
                    opacity={checkedItems[item.id] ? 0.6 : 1}
                  >
                    {item.description}
                  </Paragraph>
                </YStack>
              </Card>
            ))}
          </YStack>
          
          {/* Safety Tips */}
          <Card borderRadius="$4" backgroundColor="$yellow2">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('safety.additionalTips')}</Text>
              <Paragraph fontSize="$2">{t('safety.additionalTipsContent')}</Paragraph>
            </YStack>
          </Card>
          
          {/* Emergency Numbers */}
          <Card borderRadius="$4" backgroundColor="$red2">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('safety.emergencyNumbers')}</Text>
              <YStack space="$1">
                <XStack justifyContent="space-between">
                  <Text>{t('safety.coastGuard')}</Text>
                  <Text fontWeight="bold">999</Text>
                </XStack>
                <XStack justifyContent="space-between">
                  <Text>{t('safety.police')}</Text>
                  <Text fontWeight="bold">999</Text>
                </XStack>
                <XStack justifyContent="space-between">
                  <Text>{t('safety.ambulance')}</Text>
                  <Text fontWeight="bold">999</Text>
                </XStack>
              </YStack>
            </YStack>
          </Card>
          
          {/* Back Button */}
          <Button
            variant="outlined"
            onPress={() => navigation.goBack()}
            marginTop="$2"
          >
            {t('common.back')}
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
