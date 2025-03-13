import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, View } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Info, AlertTriangle } from '@tamagui/lucide-icons';

interface FishingSeasonalCalendarScreenProps {
  navigation: any;
}

interface FishSeason {
  id: string;
  species: string;
  localName: string;
  months: {
    name: string;
    abbreviation: string;
    status: 'good' | 'moderate' | 'poor' | 'closed';
  }[];
  notes: string;
}

export function FishingSeasonalCalendarScreen({ navigation }: FishingSeasonalCalendarScreenProps) {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const screenWidth = Dimensions.get('window').width;
  
  useEffect(() => {
    // Set current month on load
    const date = new Date();
    setCurrentMonth(date.getMonth());
  }, []);

  const months = [
    { name: t('months.january'), abbreviation: t('months.jan') },
    { name: t('months.february'), abbreviation: t('months.feb') },
    { name: t('months.march'), abbreviation: t('months.mar') },
    { name: t('months.april'), abbreviation: t('months.apr') },
    { name: t('months.may'), abbreviation: t('months.may') },
    { name: t('months.june'), abbreviation: t('months.jun') },
    { name: t('months.july'), abbreviation: t('months.jul') },
    { name: t('months.august'), abbreviation: t('months.aug') },
    { name: t('months.september'), abbreviation: t('months.sep') },
    { name: t('months.october'), abbreviation: t('months.oct') },
    { name: t('months.november'), abbreviation: t('months.nov') },
    { name: t('months.december'), abbreviation: t('months.dec') },
  ];

  const fishSeasons: FishSeason[] = [
    {
      id: '1',
      species: 'Nile Perch',
      localName: 'Mbuta',
      months: [
        { name: months[0].name, abbreviation: months[0].abbreviation, status: 'good' },
        { name: months[1].name, abbreviation: months[1].abbreviation, status: 'good' },
        { name: months[2].name, abbreviation: months[2].abbreviation, status: 'good' },
        { name: months[3].name, abbreviation: months[3].abbreviation, status: 'moderate' },
        { name: months[4].name, abbreviation: months[4].abbreviation, status: 'closed' },
        { name: months[5].name, abbreviation: months[5].abbreviation, status: 'closed' },
        { name: months[6].name, abbreviation: months[6].abbreviation, status: 'moderate' },
        { name: months[7].name, abbreviation: months[7].abbreviation, status: 'good' },
        { name: months[8].name, abbreviation: months[8].abbreviation, status: 'good' },
        { name: months[9].name, abbreviation: months[9].abbreviation, status: 'good' },
        { name: months[10].name, abbreviation: months[10].abbreviation, status: 'good' },
        { name: months[11].name, abbreviation: months[11].abbreviation, status: 'good' },
      ],
      notes: t('seasonalCalendar.nilePerchNotes'),
    },
    {
      id: '2',
      species: 'Tilapia',
      localName: 'Ngege',
      months: [
        { name: months[0].name, abbreviation: months[0].abbreviation, status: 'good' },
        { name: months[1].name, abbreviation: months[1].abbreviation, status: 'moderate' },
        { name: months[2].name, abbreviation: months[2].abbreviation, status: 'closed' },
        { name: months[3].name, abbreviation: months[3].abbreviation, status: 'closed' },
        { name: months[4].name, abbreviation: months[4].abbreviation, status: 'moderate' },
        { name: months[5].name, abbreviation: months[5].abbreviation, status: 'good' },
        { name: months[6].name, abbreviation: months[6].abbreviation, status: 'good' },
        { name: months[7].name, abbreviation: months[7].abbreviation, status: 'good' },
        { name: months[8].name, abbreviation: months[8].abbreviation, status: 'good' },
        { name: months[9].name, abbreviation: months[9].abbreviation, status: 'good' },
        { name: months[10].name, abbreviation: months[10].abbreviation, status: 'moderate' },
        { name: months[11].name, abbreviation: months[11].abbreviation, status: 'good' },
      ],
      notes: t('seasonalCalendar.tilapiaNotes'),
    },
    {
      id: '3',
      species: 'Dagaa',
      localName: 'Omena',
      months: [
        { name: months[0].name, abbreviation: months[0].abbreviation, status: 'good' },
        { name: months[1].name, abbreviation: months[1].abbreviation, status: 'good' },
        { name: months[2].name, abbreviation: months[2].abbreviation, status: 'good' },
        { name: months[3].name, abbreviation: months[3].abbreviation, status: 'closed' },
        { name: months[4].name, abbreviation: months[4].abbreviation, status: 'closed' },
        { name: months[5].name, abbreviation: months[5].abbreviation, status: 'closed' },
        { name: months[6].name, abbreviation: months[6].abbreviation, status: 'closed' },
        { name: months[7].name, abbreviation: months[7].abbreviation, status: 'moderate' },
        { name: months[8].name, abbreviation: months[8].abbreviation, status: 'good' },
        { name: months[9].name, abbreviation: months[9].abbreviation, status: 'good' },
        { name: months[10].name, abbreviation: months[10].abbreviation, status: 'good' },
        { name: months[11].name, abbreviation: months[11].abbreviation, status: 'good' },
      ],
      notes: t('seasonalCalendar.dagaaNotes'),
    },
    {
      id: '4',
      species: 'African Catfish',
      localName: 'Kamongo',
      months: [
        { name: months[0].name, abbreviation: months[0].abbreviation, status: 'moderate' },
        { name: months[1].name, abbreviation: months[1].abbreviation, status: 'poor' },
        { name: months[2].name, abbreviation: months[2].abbreviation, status: 'poor' },
        { name: months[3].name, abbreviation: months[3].abbreviation, status: 'moderate' },
        { name: months[4].name, abbreviation: months[4].abbreviation, status: 'good' },
        { name: months[5].name, abbreviation: months[5].abbreviation, status: 'good' },
        { name: months[6].name, abbreviation: months[6].abbreviation, status: 'good' },
        { name: months[7].name, abbreviation: months[7].abbreviation, status: 'good' },
        { name: months[8].name, abbreviation: months[8].abbreviation, status: 'moderate' },
        { name: months[9].name, abbreviation: months[9].abbreviation, status: 'moderate' },
        { name: months[10].name, abbreviation: months[10].abbreviation, status: 'moderate' },
        { name: months[11].name, abbreviation: months[11].abbreviation, status: 'moderate' },
      ],
      notes: t('seasonalCalendar.catfishNotes'),
    },
    {
      id: '5',
      species: 'Lungfish',
      localName: 'Kamongo',
      months: [
        { name: months[0].name, abbreviation: months[0].abbreviation, status: 'poor' },
        { name: months[1].name, abbreviation: months[1].abbreviation, status: 'poor' },
        { name: months[2].name, abbreviation: months[2].abbreviation, status: 'moderate' },
        { name: months[3].name, abbreviation: months[3].abbreviation, status: 'good' },
        { name: months[4].name, abbreviation: months[4].abbreviation, status: 'good' },
        { name: months[5].name, abbreviation: months[5].abbreviation, status: 'good' },
        { name: months[6].name, abbreviation: months[6].abbreviation, status: 'moderate' },
        { name: months[7].name, abbreviation: months[7].abbreviation, status: 'moderate' },
        { name: months[8].name, abbreviation: months[8].abbreviation, status: 'moderate' },
        { name: months[9].name, abbreviation: months[9].abbreviation, status: 'poor' },
        { name: months[10].name, abbreviation: months[10].abbreviation, status: 'poor' },
        { name: months[11].name, abbreviation: months[11].abbreviation, status: 'poor' },
      ],
      notes: t('seasonalCalendar.lungfishNotes'),
    },
  ];

  const getStatusColor = (status: 'good' | 'moderate' | 'poor' | 'closed') => {
    switch (status) {
      case 'good':
        return '$green9';
      case 'moderate':
        return '$yellow9';
      case 'poor':
        return '$orange9';
      case 'closed':
        return '$red9';
      default:
        return '$gray9';
    }
  };

  const getStatusText = (status: 'good' | 'moderate' | 'poor' | 'closed') => {
    switch (status) {
      case 'good':
        return t('seasonalCalendar.good');
      case 'moderate':
        return t('seasonalCalendar.moderate');
      case 'poor':
        return t('seasonalCalendar.poor');
      case 'closed':
        return t('seasonalCalendar.closed');
      default:
        return '';
    }
  };

  const handleSpeciesSelect = (speciesId: string) => {
    setSelectedSpecies(speciesId === selectedSpecies ? null : speciesId);
  };

  const getBestSpeciesForCurrentMonth = () => {
    const goodSpecies = fishSeasons
      .filter(season => season.months[currentMonth].status === 'good')
      .map(season => season.species);
    
    return goodSpecies.length > 0 
      ? goodSpecies.join(', ') 
      : t('seasonalCalendar.noBestSpecies');
  };

  const getClosedSpeciesForCurrentMonth = () => {
    const closedSpecies = fishSeasons
      .filter(season => season.months[currentMonth].status === 'closed')
      .map(season => season.species);
    
    return closedSpecies.length > 0 
      ? closedSpecies.join(', ') 
      : t('seasonalCalendar.noClosedSpecies');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <Button
            icon={<ArrowLeft />}
            variant="outlined"
            alignSelf="flex-start"
            onPress={() => navigation.goBack()}
          >
            {t('common.back')}
          </Button>
          
          <H2>{t('seasonalCalendar.title')}</H2>
          <Paragraph>{t('seasonalCalendar.description')}</Paragraph>
          
          {/* Current Month Summary */}
          <Card borderRadius="$4" bordered backgroundColor="$blue2">
            <YStack padding="$4" space="$3">
              <Text fontWeight="bold" fontSize="$5">
                {months[currentMonth].name} {t('seasonalCalendar.summary')}
              </Text>
              
              <XStack space="$2" alignItems="center">
                <Calendar size="$1" color="$blue9" />
                <Text fontWeight="bold">{t('seasonalCalendar.bestSpecies')}:</Text>
                <Text>{getBestSpeciesForCurrentMonth()}</Text>
              </XStack>
              
              <XStack space="$2" alignItems="center">
                <AlertTriangle size="$1" color="$red9" />
                <Text fontWeight="bold">{t('seasonalCalendar.closedSeasons')}:</Text>
                <Text>{getClosedSpeciesForCurrentMonth()}</Text>
              </XStack>
            </YStack>
          </Card>
          
          {/* Legend */}
          <Card borderRadius="$4" bordered>
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('seasonalCalendar.legend')}</Text>
              
              <XStack flexWrap="wrap" gap="$2">
                <XStack space="$1" alignItems="center">
                  <View width={12} height={12} borderRadius={6} backgroundColor="$green9" />
                  <Text fontSize="$2">{t('seasonalCalendar.good')}</Text>
                </XStack>
                
                <XStack space="$1" alignItems="center">
                  <View width={12} height={12} borderRadius={6} backgroundColor="$yellow9" />
                  <Text fontSize="$2">{t('seasonalCalendar.moderate')}</Text>
                </XStack>
                
                <XStack space="$1" alignItems="center">
                  <View width={12} height={12} borderRadius={6} backgroundColor="$orange9" />
                  <Text fontSize="$2">{t('seasonalCalendar.poor')}</Text>
                </XStack>
                
                <XStack space="$1" alignItems="center">
                  <View width={12} height={12} borderRadius={6} backgroundColor="$red9" />
                  <Text fontSize="$2">{t('seasonalCalendar.closed')}</Text>
                </XStack>
              </XStack>
            </YStack>
          </Card>
          
          {/* Calendar */}
          <YStack space="$4">
            {fishSeasons.map((season) => (
              <Card 
                key={season.id} 
                borderRadius="$4" 
                bordered
                pressStyle={{ opacity: 0.8 }}
                onPress={() => handleSpeciesSelect(season.id)}
              >
                <YStack>
                  <XStack 
                    padding="$3"
                    backgroundColor={selectedSpecies === season.id ? '$blue2' : 'transparent'}
                    borderBottomWidth={1}
                    borderBottomColor="$gray5"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <YStack>
                      <Text fontWeight="bold">{season.species}</Text>
                      <Text fontSize="$2">{season.localName}</Text>
                    </YStack>
                    
                    <XStack space="$1" alignItems="center">
                      <View 
                        width={12} 
                        height={12} 
                        borderRadius={6} 
                        backgroundColor={getStatusColor(season.months[currentMonth].status)} 
                      />
                      <Text fontSize="$2">
                        {getStatusText(season.months[currentMonth].status)}
                      </Text>
                    </XStack>
                  </XStack>
                  
                  {selectedSpecies === season.id && (
                    <YStack padding="$3" space="$3">
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <XStack>
                          {season.months.map((month, index) => {
                            const cellWidth = (screenWidth - 32) / 6; // 6 months visible at a time, 32px for padding
                            return (
                              <YStack 
                                key={index} 
                                width={cellWidth} 
                                alignItems="center"
                                opacity={index === currentMonth ? 1 : 0.7}
                              >
                                <Text 
                                  fontSize="$2" 
                                  fontWeight={index === currentMonth ? 'bold' : 'normal'}
                                >
                                  {month.abbreviation}
                                </Text>
                                <View 
                                  width={cellWidth - 8} 
                                  height={30} 
                                  backgroundColor={getStatusColor(month.status)}
                                  marginTop="$1"
                                  borderRadius="$2"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Text 
                                    color="white" 
                                    fontSize="$1"
                                    fontWeight="bold"
                                  >
                                    {month.status === 'closed' ? 'X' : ''}
                                  </Text>
                                </View>
                              </YStack>
                            );
                          })}
                        </XStack>
                      </ScrollView>
                      
                      <XStack space="$2" alignItems="flex-start">
                        <Info size="$1" color="$blue9" />
                        <Text fontSize="$2" flex={1}>{season.notes}</Text>
                      </XStack>
                    </YStack>
                  )}
                </YStack>
              </Card>
            ))}
          </YStack>
          
          <Button
            marginTop="$2"
            onPress={() => navigation.navigate('FishingRegulations')}
          >
            {t('seasonalCalendar.viewRegulations')}
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
