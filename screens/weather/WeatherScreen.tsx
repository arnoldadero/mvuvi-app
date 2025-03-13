import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ScrollView, YStack, H2, Text, Card, Button, XStack, Paragraph } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { MoonPhaseCalendar } from '../../components/weather/moon-phase/MoonPhaseCalendar';
import { getMoonPhaseData } from '../../services/moon/moonPhaseService';

interface WeatherScreenProps {
  navigation?: any;
}

export function WeatherScreen({ navigation }: WeatherScreenProps) {
  const { t } = useTranslation();
  const [currentMoonPhase, setCurrentMoonPhase] = useState(getMoonPhaseData());
  
  // Mock weather data - in a real app, this would come from a weather API
  const mockWeatherData = {
    temperature: 28,
    condition: 'Partly Cloudy',
    windSpeed: 10,
    windDirection: 'NE',
    precipitation: '10%',
    humidity: '65%',
    warnings: [],
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('weather.title')}</H2>
          
          {/* Current Weather Conditions */}
          <Card borderRadius="$4">
            <Card.Header padded>
              <Text fontWeight="bold">{t('weather.currentConditions')}</Text>
            </Card.Header>
            <YStack padding="$4" space="$2">
              <XStack justifyContent="space-between">
                <Text>{t('weather.temperature')}</Text>
                <Text fontWeight="bold">{mockWeatherData.temperature}°C</Text>
              </XStack>
              
              <XStack justifyContent="space-between">
                <Text>{t('weather.windSpeed')}</Text>
                <Text>{mockWeatherData.windSpeed} km/h {mockWeatherData.windDirection}</Text>
              </XStack>
              
              <XStack justifyContent="space-between">
                <Text>{t('weather.precipitation')}</Text>
                <Text>{mockWeatherData.precipitation}</Text>
              </XStack>
              
              <XStack justifyContent="space-between">
                <Text>{t('weather.humidity')}</Text>
                <Text>{mockWeatherData.humidity}</Text>
              </XStack>
              
              {mockWeatherData.warnings.length > 0 && (
                <YStack marginTop="$2" backgroundColor="$red2" padding="$2" borderRadius="$2">
                  <Text fontWeight="bold" color="$red9">{t('weather.warnings')}</Text>
                  {mockWeatherData.warnings.map((warning, index) => (
                    <Text key={index} color="$red9">{warning}</Text>
                  ))}
                </YStack>
              )}
            </YStack>
          </Card>
          
          {/* Moon Phase Widget */}
          <YStack>
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
              <Text fontWeight="bold" fontSize="$5">{t('moonPhase.title')}</Text>
              <Button 
                size="$3" 
                variant="outlined"
                onPress={() => navigation?.navigate('MoonPhase')}
              >
                {t('common.learnMore')}
              </Button>
            </XStack>
            
            <MoonPhaseCalendar isCompact={true} />
            
            <Card borderRadius="$4" marginTop="$3">
              <YStack padding="$3">
                <XStack space="$2" alignItems="center">
                  <Text fontSize="$3" flex={1}>
                    {currentMoonPhase.fishingRecommendation}
                  </Text>
                </XStack>
              </YStack>
            </Card>
          </YStack>
          
          {/* Weather Forecast Section */}
          <Card borderRadius="$4">
            <Card.Header padded>
              <XStack justifyContent="space-between" alignItems="center" width="100%">
                <Text fontWeight="bold">{t('weather.forecast')}</Text>
                {/* This could link to a detailed forecast screen */}
                <Button 
                  size="$2" 
                  variant="outlined"
                  onPress={() => {/* Navigate to detailed forecast */}}
                >
                  {t('common.learnMore')}
                </Button>
              </XStack>
            </Card.Header>
            <YStack padding="$4">
              {/* Simplified forecast - would be populated from API data */}
              {[1, 2, 3].map((day) => (
                <XStack 
                  key={day}
                  justifyContent="space-between" 
                  alignItems="center"
                  paddingVertical="$2"
                  borderBottomWidth={day < 3 ? 1 : 0}
                  borderBottomColor="$borderColor"
                >
                  <Text>Day {day}</Text>
                  <Text>27°C - 29°C</Text>
                  <Text>Sunny</Text>
                </XStack>
              ))}
            </YStack>
          </Card>
          
          {/* Local water conditions or other weather-related info could go here */}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
