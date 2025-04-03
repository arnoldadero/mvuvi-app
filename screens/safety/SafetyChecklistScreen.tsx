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

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const P: any = Paragraph;
const X: any = XStack;
const C: any = Card;
const B: any = Button;
const Ch: any = Checkbox;

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
        <Y $padding={"$4" as any} $space={"$4" as any}>
          <H>{t('safety.safetyChecklist')}</H>
          <P>{t('safety.safetyChecklistScreenDescription')}</P>
          
          {/* Completion Progress */}
          <C borderRadius={"$4" as any} backgroundColor={"$blue2" as any}>
            <Y $padding={"$4" as any} $space={"$2" as any}>
              <T fontWeight="bold">{t('safety.completion')}: {getCompletionPercentage()}%</T>
              <X height={10} backgroundColor={"$gray5" as any} borderRadius={"$full" as any} overflow="hidden">
                <Y 
                  backgroundColor={"$blue9" as any} 
                  width={`${getCompletionPercentage()}%` as any} 
                  height="100%" 
                />
              </X>
              <B 
                $marginTop={"$2" as any} 
                variant="outlined" 
                onPress={resetChecklist}
                disabled={getCompletionPercentage() === 0}
              >
                {t('safety.resetChecklist')}
              </B>
            </Y>
          </C>
          
          {/* Checklist Items */}
          <Y $space={"$3" as any}>
            {checklistItems.map((item) => (
              <C key={item.id} borderRadius={"$4" as any} bordered>
                <Y $padding={"$3" as any}>
                  <X $alignItems="center" $space={"$2" as any}>
                    <Ch
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      size={"$4" as any}
                    >
                      <Checkbox.Indicator>
                        <T>✓</T>
                      </Checkbox.Indicator>
                    </Ch>
                    <T 
                      fontWeight="bold" 
                      textDecorationLine={checkedItems[item.id] ? 'line-through' : 'none'}
                    >
                      {item.title}
                    </T>
                  </X>
                  <P 
                    $marginTop={"$1" as any} 
                    $marginLeft={"$6" as any} 
                    fontSize={"$2" as any}
                    opacity={checkedItems[item.id] ? 0.6 : 1}
                  >
                    {item.description}
                  </P>
                </Y>
              </C>
            ))}
          </Y>
          
          {/* Safety Tips */}
          <C borderRadius={"$4" as any} backgroundColor={"$yellow2" as any}>
            <Y $padding={"$4" as any} $space={"$2" as any}>
              <T fontWeight="bold">{t('safety.additionalTips')}</T>
              <P fontSize={"$2" as any}>{t('safety.additionalTipsContent')}</P>
            </Y>
          </C>
          
          {/* Emergency Numbers */}
          <C borderRadius={"$4" as any} backgroundColor={"$red2" as any}>
            <Y $padding={"$4" as any} $space={"$2" as any}>
              <T fontWeight="bold">{t('safety.emergencyNumbers')}</T>
              <Y $space={"$1" as any}>
                <X $justifyContent="space-between">
                  <T>{t('safety.coastGuard')}</T>
                  <T fontWeight="bold">999</T>
                </X>
                <X $justifyContent="space-between">
                  <T>{t('safety.police')}</T>
                  <T fontWeight="bold">999</T>
                </X>
                <X $justifyContent="space-between">
                  <T>{t('safety.ambulance')}</T>
                  <T fontWeight="bold">999</T>
                </X>
              </Y>
            </Y>
          </C>
          
          {/* Back Button */}
          <B
            variant="outlined"
            onPress={() => navigation.goBack()}
            $marginTop={"$2" as any}
          >
            {t('common.back')}
          </B>
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
