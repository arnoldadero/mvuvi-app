import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { YStack, H2, Text, Card, Paragraph, XStack, Select } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

interface SeasonalCalendarScreenProps {
  navigation: any;
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const P: any = Paragraph;
const X: any = XStack;
const C: any = Card;
const S: any = Select;

// Seasonal calendar data
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const fishingCalendar = {
  'Lake Victoria': [
    { 
      species: 'Nile Perch',
      bestMonths: [0, 1, 2, 6, 7, 8], // Jan, Feb, Mar, Jul, Aug, Sep
      closedSeasons: [3, 4], // Apr, May
      notes: 'Breeding season in April-May. Fishing is restricted during this period.'
    },
    { 
      species: 'Tilapia',
      bestMonths: [1, 2, 8, 9, 10, 11], // Feb, Mar, Sep, Oct, Nov, Dec
      closedSeasons: [3, 4, 5], // Apr, May, Jun
      notes: 'Breeding season from April to June. Restricted fishing during this period.'
    },
    { 
      species: 'Omena/Dagaa',
      bestMonths: [0, 1, 6, 7, 8, 9, 10, 11], // Jan, Feb, Jul, Aug, Sep, Oct, Nov, Dec
      closedSeasons: [3, 4], // Apr, May
      notes: 'Best caught during dark moon phases. Restricted during April-May breeding season.'
    }
  ],
  'Coastal Waters': [
    { 
      species: 'Tuna',
      bestMonths: [0, 1, 2, 10, 11], // Jan, Feb, Mar, Nov, Dec
      closedSeasons: [], 
      notes: 'Peak season during northeast monsoon (November to March).'
    },
    { 
      species: 'Kingfish',
      bestMonths: [0, 1, 2, 3, 10, 11], // Jan, Feb, Mar, Apr, Nov, Dec
      closedSeasons: [], 
      notes: 'Best caught during northeast monsoon season.'
    },
    { 
      species: 'Snapper',
      bestMonths: [5, 6, 7, 8, 9], // Jun, Jul, Aug, Sep, Oct
      closedSeasons: [], 
      notes: 'Peak season during southeast monsoon (June to October).'
    }
  ],
  'Inland Rivers': [
    { 
      species: 'Catfish',
      bestMonths: [3, 4, 5, 9, 10, 11], // Apr, May, Jun, Oct, Nov, Dec
      closedSeasons: [], 
      notes: 'Best after rains when water levels are higher.'
    },
    { 
      species: 'Carp',
      bestMonths: [2, 3, 4, 9, 10, 11], // Mar, Apr, May, Oct, Nov, Dec
      closedSeasons: [], 
      notes: 'Good catches during and after rainy seasons.'
    }
  ]
};

export function SeasonalCalendarScreen({ navigation }: SeasonalCalendarScreenProps) {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('Lake Victoria');
  const currentMonth = new Date().getMonth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <Y padding="$4" space="$4">
          <H>{t('sustainableFishing.seasonalCalendar')}</H>
          <P>{t('sustainableFishing.seasonalCalendarDescription', 'Optimal fishing seasons for different species in Kenyan waters.')}</P>

          {/* Region Selector */}
          <Y space="$2">
            <T fontWeight="bold">{t('sustainableFishing.selectRegion')}</T>
            <S value={selectedRegion} onValueChange={(value) => setSelectedRegion(value)}>
              <S.Trigger>
                <S.Value placeholder={t('sustainableFishing.selectRegion')} />
              </S.Trigger>
              <S.Content>
                {Object.keys(fishingCalendar).map((region, index) => (
                  <S.Item key={region} value={region} index={index}>
                    <S.ItemText>{region}</S.ItemText>
                  </S.Item>
                ))}
              </S.Content>
            </S>
          </Y>

          {/* Current Month Highlight */}
          <C borderRadius="$4" backgroundColor="$blue2" borderColor="$blue7" bordered>
            <Y padding="$4" space="$2">
              <X space="$2" alignItems="center">
                <Feather name="calendar" size={24} color="#0891b2" />
                <T fontWeight="bold" fontSize="$5">{t('sustainableFishing.currentMonth')}</T>
              </X>
              <T fontSize="$6" fontWeight="bold" color="$blue9" textAlign="center">
                {months[currentMonth]}
              </T>
            </Y>
          </C>

          {/* Species Calendar */}
          <Y space="$3">
            <T fontWeight="bold" fontSize="$5">{selectedRegion}</T>
            {fishingCalendar[selectedRegion].map((item, index) => (
              <C key={index} borderRadius="$4" bordered marginTop="$2">
                <Y padding="$4" space="$2">
                  <T fontWeight="bold" fontSize="$4">{item.species}</T>
                  
                  {/* Month Calendar */}
                  <X flexWrap="wrap" marginTop="$2">
                    {months.map((month, monthIndex) => {
                      const isBestMonth = item.bestMonths.includes(monthIndex);
                      const isClosedSeason = item.closedSeasons.includes(monthIndex);
                      const isCurrentMonth = monthIndex === currentMonth;
                      
                      let backgroundColor = '$gray2';
                      let textColor = '$gray11';
                      let borderColor = '$gray5';
                      
                      if (isClosedSeason) {
                        backgroundColor = '$red2';
                        textColor = '$red11';
                        borderColor = '$red7';
                      } else if (isBestMonth) {
                        backgroundColor = '$green2';
                        textColor = '$green11';
                        borderColor = '$green7';
                      }
                      
                      if (isCurrentMonth) {
                        borderColor = '$blue9';
                      }
                      
                      return (
                        <Y 
                          key={monthIndex}
                          width="25%"
                          padding="$1"
                        >
                          <Y
                            backgroundColor={backgroundColor}
                            borderColor={borderColor}
                            borderWidth={isCurrentMonth ? 2 : 1}
                            borderRadius="$2"
                            padding="$2"
                            alignItems="center"
                          >
                            <T 
                              fontSize="$2"
                              color={textColor}
                              fontWeight={isCurrentMonth ? 'bold' : 'normal'}
                            >
                              {month.substring(0, 3)}
                            </T>
                          </Y>
                        </Y>
                      );
                    })}
                  </X>
                  
                  {/* Legend */}
                  <X space="$4" marginTop="$2">
                    <X space="$1" alignItems="center">
                      <Y width={12} height={12} backgroundColor="$green2" borderColor="$green7" borderWidth={1} borderRadius={2} />
                      <T fontSize="$2">{t('sustainableFishing.bestSeason')}</T>
                    </X>
                    <X space="$1" alignItems="center">
                      <Y width={12} height={12} backgroundColor="$red2" borderColor="$red7" borderWidth={1} borderRadius={2} />
                      <T fontSize="$2">{t('sustainableFishing.closedSeason')}</T>
                    </X>
                    <X space="$1" alignItems="center">
                      <Y width={12} height={12} backgroundColor="$gray2" borderColor="$gray5" borderWidth={1} borderRadius={2} />
                      <T fontSize="$2">{t('sustainableFishing.regularSeason')}</T>
                    </X>
                  </X>
                  
                  {/* Notes */}
                  <Y space="$1" marginTop="$2">
                    <X space="$2" alignItems="center">
                      <Feather name="info" size={16} color="#0891b2" />
                      <T fontWeight="bold">{t('sustainableFishing.notes')}</T>
                    </X>
                    <T paddingLeft="$6">{item.notes}</T>
                  </Y>
                </Y>
              </C>
            ))}
          </Y>
          
          {/* Sustainable Fishing Reminder */}
          <C borderRadius="$4" backgroundColor="$green2" borderColor="$green7" bordered>
            <Y padding="$4" space="$2">
              <X space="$2" alignItems="center">
                <Feather name="alert-circle" size={24} color="#059669" />
                <T fontWeight="bold" fontSize="$5">{t('sustainableFishing.reminder')}</T>
              </X>
              <P paddingLeft="$8">
                {t('sustainableFishing.reminderText', 'Always respect fishing seasons and regulations to ensure sustainable fish populations for future generations.')}
              </P>
            </Y>
          </C>
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
