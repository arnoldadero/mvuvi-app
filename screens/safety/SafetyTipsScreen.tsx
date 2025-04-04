import React from 'react';
import { SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { YStack, H2, Text, Card, Paragraph, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

interface SafetyTipsScreenProps {
  navigation: any;
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const P: any = Paragraph;
const X: any = XStack;
const C: any = Card;

// Safety tips data
const safetyTips = [
  {
    id: '1',
    title: 'Always Wear a Life Jacket',
    description: 'Even if you\'re a strong swimmer, always wear a properly fitted life jacket when on the water.',
    icon: 'life-buoy',
  },
  {
    id: '2',
    title: 'Check Weather Forecasts',
    description: 'Always check weather forecasts before heading out and monitor conditions while fishing.',
    icon: 'cloud',
  },
  {
    id: '3',
    title: 'Tell Someone Your Plans',
    description: 'Always inform someone about where you\'re going and when you expect to return.',
    icon: 'message-circle',
  },
  {
    id: '4',
    title: 'Carry Communication Devices',
    description: 'Bring a fully charged mobile phone in a waterproof case and consider a marine radio.',
    icon: 'phone',
  },
  {
    id: '5',
    title: 'Know Your Boat\'s Capacity',
    description: 'Never overload your boat beyond its capacity for passengers or equipment.',
    icon: 'anchor',
  },
  {
    id: '6',
    title: 'Avoid Alcohol',
    description: 'Never consume alcohol while operating a boat or fishing vessel.',
    icon: 'x-circle',
  },
  {
    id: '7',
    title: 'Learn Basic First Aid',
    description: 'Know basic first aid and carry a well-stocked first aid kit.',
    icon: 'plus-square',
  },
  {
    id: '8',
    title: 'Watch for Other Vessels',
    description: 'Always maintain awareness of other boats and water traffic around you.',
    icon: 'eye',
  },
  {
    id: '9',
    title: 'Respect Water Conditions',
    description: 'Be aware of currents, tides, and underwater hazards in your fishing area.',
    icon: 'droplet',
  },
  {
    id: '10',
    title: 'Maintain Your Equipment',
    description: 'Regularly check and maintain your boat, engine, and safety equipment.',
    icon: 'tool',
  },
];

export function SafetyTipsScreen({ navigation }: SafetyTipsScreenProps) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <Y padding="$4" space="$4">
          <H>{t('safety.tips')}</H>
          <P>{t('safety.tipsDescription', 'Essential safety tips for fishermen to stay safe on the water.')}</P>

          {/* Safety Tips List */}
          <Y space="$3">
            {safetyTips.map((tip) => (
              <C key={tip.id} borderRadius="$4" bordered>
                <Y padding="$4" space="$2">
                  <X space="$2" alignItems="center">
                    <Feather name={tip.icon as any} size={24} color="#0891b2" />
                    <T fontWeight="bold" fontSize="$5">{tip.title}</T>
                  </X>
                  <P paddingLeft="$8">{tip.description}</P>
                </Y>
              </C>
            ))}
          </Y>

          {/* Additional Safety Information */}
          <C borderRadius="$4" backgroundColor="$blue2" borderColor="$blue7" bordered>
            <Y padding="$4" space="$2">
              <X space="$2" alignItems="center">
                <Feather name="info" size={24} color="#0891b2" />
                <T fontWeight="bold" fontSize="$5">{t('safety.rememberTitle', 'Remember')}</T>
              </X>
              <P paddingLeft="$8">
                {t('safety.rememberDescription', 'Safety should always be your top priority when fishing. No catch is worth risking your life.')}
              </P>
            </Y>
          </C>
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
