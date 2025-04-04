import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Linking, Alert, Platform, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Paragraph, ScrollView, Checkbox, XStack, Card, Button } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useSafetyStore } from '../../services/safety/safetyStore';

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

  // Group checklist items by category
  const essentialItems = checklistItems.slice(0, 5);
  const additionalItems = checklistItems.slice(5);

  // Get checklist state from safety store
  const {
    checkedItems,
    isSavingChecklist,
    saveCheckedItems,
    fetchCheckedItems,
    resetChecklist
  } = useSafetyStore();

  // Local state for loading indicator
  const [isLoading, setIsLoading] = useState(true);

  // Fetch checklist items on mount
  useEffect(() => {
    const loadChecklist = async () => {
      setIsLoading(true);
      await fetchCheckedItems();
      setIsLoading(false);
    };
    loadChecklist();
  }, [fetchCheckedItems]);

  const handleToggleItem = async (id: string) => {
    const updatedItems = {
      ...checkedItems,
      [id]: !checkedItems[id],
    };
    await saveCheckedItems(updatedItems);
  };

  const getCompletionPercentage = () => {
    const totalItems = checklistItems.length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  const handleResetChecklist = async () => {
    await resetChecklist();
  };

  const handleCallEmergency = (phoneNumber: string, serviceName: string) => {
    Alert.alert(
      t('safety.emergencyCall'),
      `${t('safety.callConfirmation')} ${serviceName}?`,
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('safety.call'),
          onPress: () => {
            const phoneUrl = Platform.OS === 'android'
              ? `tel:${phoneNumber}`
              : `telprompt:${phoneNumber}`;

            Linking.canOpenURL(phoneUrl)
              .then(supported => {
                if (supported) {
                  return Linking.openURL(phoneUrl);
                }
                Alert.alert(t('common.error'), t('safety.callNotSupported'));
              })
              .catch(err => {
                console.error('Error making phone call:', err);
                Alert.alert(t('common.error'), t('safety.callError'));
              });
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Y flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#0891b2" />
          <T marginTop="$4">{t('common.loading')}</T>
        </Y>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <Y padding="$4" space="$4">
          <H>{t('safety.safetyChecklist')}</H>
          <P>{t('safety.safetyChecklistScreenDescription')}</P>

          {/* Completion Progress */}
          <C borderRadius="$4" backgroundColor={getCompletionPercentage() === 100 ? '$green2' : '$blue2'} borderColor={getCompletionPercentage() === 100 ? '$green7' : '$blue7'} bordered>
            <Y padding="$4" space="$3">
              <X justifyContent="space-between" alignItems="center">
                <T fontWeight="bold" fontSize="$5">{t('safety.completion')}</T>
                <X alignItems="center" space="$2">
                  {isSavingChecklist && <ActivityIndicator size="small" color="#0891b2" />}
                  <T fontWeight="bold" fontSize="$6" color={getCompletionPercentage() === 100 ? '$green9' : '$blue9'}>{getCompletionPercentage()}%</T>
                </X>
              </X>
              <X height={12} backgroundColor="$gray5" borderRadius="$full" overflow="hidden">
                <Y
                  backgroundColor={getCompletionPercentage() === 100 ? '$green9' : '$blue9'}
                  width={`${getCompletionPercentage()}%`}
                  height="100%"
                />
              </X>
              {getCompletionPercentage() === 100 && (
                <T color="$green9" textAlign="center" marginTop="$1">
                  All safety checks completed! You're ready to go fishing safely.
                </T>
              )}
              <B
                marginTop="$2"
                variant="outlined"
                onPress={handleResetChecklist}
                disabled={getCompletionPercentage() === 0 || isSavingChecklist}
                color={getCompletionPercentage() === 0 ? '$gray8' : '$blue9'}
                borderColor={getCompletionPercentage() === 0 ? '$gray5' : '$blue7'}
              >
                {t('safety.resetChecklist')}
              </B>
            </Y>
          </C>

          {/* Essential Checklist Items */}
          <Y space="$4">
            <T fontWeight="bold" fontSize="$5" color="$blue9">Essential Safety Items</T>
            <Y space="$3">
              {essentialItems.map((item) => (
                <C key={item.id} borderRadius="$4" bordered borderColor={checkedItems[item.id] ? '$green7' : '$gray5'}>
                  <Y padding="$3" backgroundColor={checkedItems[item.id] ? '$green1' : 'white'}>
                    <X alignItems="center" space="$2">
                      <Ch
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => handleToggleItem(item.id)}
                        size="$4"
                        backgroundColor={checkedItems[item.id] ? '$green9' : undefined}
                      >
                        <Checkbox.Indicator>
                          <T>✓</T>
                        </Checkbox.Indicator>
                      </Ch>
                      <T
                        fontWeight="bold"
                        textDecorationLine={checkedItems[item.id] ? 'line-through' : 'none'}
                        color={checkedItems[item.id] ? '$green9' : '$gray12'}
                      >
                        {item.title}
                      </T>
                    </X>
                    <P
                      marginTop="$1"
                      marginLeft="$6"
                      fontSize="$2"
                      opacity={checkedItems[item.id] ? 0.7 : 1}
                    >
                      {item.description}
                    </P>
                  </Y>
                </C>
              ))}
            </Y>
          </Y>

          {/* Additional Checklist Items */}
          <Y space="$4">
            <T fontWeight="bold" fontSize="$5" color="$blue9">Additional Safety Items</T>
            <Y space="$3">
              {additionalItems.map((item) => (
                <C key={item.id} borderRadius="$4" bordered borderColor={checkedItems[item.id] ? '$green7' : '$gray5'}>
                  <Y padding="$3" backgroundColor={checkedItems[item.id] ? '$green1' : 'white'}>
                    <X alignItems="center" space="$2">
                      <Ch
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => handleToggleItem(item.id)}
                        size="$4"
                        backgroundColor={checkedItems[item.id] ? '$green9' : undefined}
                      >
                        <Checkbox.Indicator>
                          <T>✓</T>
                        </Checkbox.Indicator>
                      </Ch>
                      <T
                        fontWeight="bold"
                        textDecorationLine={checkedItems[item.id] ? 'line-through' : 'none'}
                        color={checkedItems[item.id] ? '$green9' : '$gray12'}
                      >
                        {item.title}
                      </T>
                    </X>
                    <P
                      marginTop="$1"
                      marginLeft="$6"
                      fontSize="$2"
                      opacity={checkedItems[item.id] ? 0.7 : 1}
                    >
                      {item.description}
                    </P>
                  </Y>
                </C>
              ))}
            </Y>
          </Y>

          {/* Safety Tips */}
          <C borderRadius="$4" backgroundColor="$yellow2" borderColor="$yellow7" bordered>
            <Y padding="$4" space="$3">
              <T fontWeight="bold" fontSize="$5" color="$yellow9">{t('safety.additionalTips')}</T>
              <P fontSize="$3">{t('safety.additionalTipsContent')}</P>
              <Y backgroundColor="$yellow3" padding="$3" borderRadius="$3" marginTop="$1">
                <T fontWeight="bold" color="$yellow9">Remember:</T>
                <P fontSize="$2" marginTop="$1">• Always check your boat and equipment before heading out</P>
                <P fontSize="$2">• Monitor weather conditions throughout your trip</P>
                <P fontSize="$2">• Keep your mobile phone in a waterproof case</P>
              </Y>
            </Y>
          </C>

          {/* Emergency Numbers */}
          <C borderRadius="$4" backgroundColor="$red2" borderColor="$red7" bordered>
            <Y padding="$4" space="$3">
              <T fontWeight="bold" fontSize="$5" color="$red9">{t('safety.emergencyNumbers')}</T>
              <Y space="$2" backgroundColor="white" padding="$3" borderRadius="$3">
                <X justifyContent="space-between" alignItems="center">
                  <X alignItems="center" space="$2">
                    <Y width={40} height={40} backgroundColor="$red5" borderRadius="$circular" alignItems="center" justifyContent="center">
                      <T fontWeight="bold" color="white">CG</T>
                    </Y>
                    <T fontWeight="bold">{t('safety.coastGuard')}</T>
                  </X>
                  <B size="$3" backgroundColor="$red9" onPress={() => handleCallEmergency('999', t('safety.coastGuard'))}>
                    <T color="white" fontWeight="bold">999</T>
                  </B>
                </X>
              </Y>
              <Y space="$2" backgroundColor="white" padding="$3" borderRadius="$3">
                <X justifyContent="space-between" alignItems="center">
                  <X alignItems="center" space="$2">
                    <Y width={40} height={40} backgroundColor="$blue5" borderRadius="$circular" alignItems="center" justifyContent="center">
                      <T fontWeight="bold" color="white">P</T>
                    </Y>
                    <T fontWeight="bold">{t('safety.police')}</T>
                  </X>
                  <B size="$3" backgroundColor="$blue9" onPress={() => handleCallEmergency('999', t('safety.police'))}>
                    <T color="white" fontWeight="bold">999</T>
                  </B>
                </X>
              </Y>
              <Y space="$2" backgroundColor="white" padding="$3" borderRadius="$3">
                <X justifyContent="space-between" alignItems="center">
                  <X alignItems="center" space="$2">
                    <Y width={40} height={40} backgroundColor="$green5" borderRadius="$circular" alignItems="center" justifyContent="center">
                      <T fontWeight="bold" color="white">A</T>
                    </Y>
                    <T fontWeight="bold">{t('safety.ambulance')}</T>
                  </X>
                  <B size="$3" backgroundColor="$green9" onPress={() => handleCallEmergency('999', t('safety.ambulance'))}>
                    <T color="white" fontWeight="bold">999</T>
                  </B>
                </X>
              </Y>
            </Y>
          </C>

          {/* Back Button */}
          <B
            variant="outlined"
            onPress={() => navigation.goBack()}
            marginTop="$2"
          >
            {t('common.back')}
          </B>
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
