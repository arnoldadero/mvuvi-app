import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ScrollView, YStack, H2, Text, Card, Button, XStack, Paragraph } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { MoonPhaseCalendar } from '../../components/weather/moon-phase/MoonPhaseCalendar';
import { getMoonPhaseData } from '../../services/moon/moonPhaseService';

interface WeatherScreenProps {
  navigation?: any;
}

const Y: any = YStack;
const X: any = XStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const B: any = Button;

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
        <Y padding="$4" space="$4">
          <H>{t('weather.title')}</H>

          {/* Current Weather Conditions */}
          <C borderRadius="$4">
            <C.Header padded>
              <T fontWeight="bold">{t('weather.currentConditions')}</T>
            </C.Header>
            <Y padding="$4" space="$2">
              <X justifyContent="space-between">
                <T>{t('weather.temperature')}</T>
                <T fontWeight="bold">{mockWeatherData.temperature}°C</T>
              </X>

              <X justifyContent="space-between">
                <T>{t('weather.windSpeed')}</T>
                <T>{mockWeatherData.windSpeed} km/h {mockWeatherData.windDirection}</T>
              </X>

              <X justifyContent="space-between">
                <T>{t('weather.precipitation')}</T>
                <T>{mockWeatherData.precipitation}</T>
              </X>

              <X justifyContent="space-between">
                <T>{t('weather.humidity')}</T>
                <T>{mockWeatherData.humidity}</T>
              </X>

              {mockWeatherData.warnings.length > 0 && (
                <Y marginTop="$2" backgroundColor="$red2" padding="$2" borderRadius="$2">
                  <T fontWeight="bold" color="$red9">{t('weather.warnings')}</T>
                  {mockWeatherData.warnings.map((warning, index) => (
                    <T key={index} color="$red9">{warning}</T>
                  ))}
                </Y>
              )}
            </Y>
          </C>

          {/* Moon Phase Widget */}
          <Y>
            <X justifyContent="space-between" alignItems="center" marginBottom="$2">
              <T fontWeight="bold" fontSize="$5">{t('moonPhase.title')}</T>
              <B
                size="$3"
                variant="outlined"
                onPress={() => navigation?.navigate('MoonPhase')}
              >
                {t('common.learnMore')}
              </B>
            </X>

            <MoonPhaseCalendar isCompact={true} />

            <C borderRadius="$4" marginTop="$3">
              <Y padding="$3">
                <X space="$2" alignItems="center">
                  <T fontSize="$3" flex={1}>
                    {currentMoonPhase.fishingRecommendation}
                  </T>
                </X>
              </Y>
            </C>
          </Y>

          {/* Weather Forecast Section */}
          <C borderRadius="$4">
            <C.Header padded>
              <X justifyContent="space-between" alignItems="center" width="100%">
                <T fontWeight="bold">{t('weather.forecast')}</T>
                {/* This could link to a detailed forecast screen */}
                <B
                  size="$2"
                  variant="outlined"
                  onPress={() => {/* Navigate to detailed forecast */}}
                >
                  {t('common.learnMore')}
                </B>
              </X>
            </C.Header>
            <Y padding="$4">
              {/* Simplified forecast - would be populated from API data */}
              {[1, 2, 3].map((day) => (
                <X
                  key={day}
                  justifyContent="space-between"
                  alignItems="center"
                  paddingVertical="$2"
                  borderBottomWidth={day < 3 ? 1 : 0}
                  borderBottomColor="$borderColor"
                >
                  <T>Day {day}</T>
                  <T>27°C - 29°C</T>
                  <T>Sunny</T>
                </X>
              ))}
            </Y>
          </C>

          {/* Local water conditions or other weather-related info could go here */}
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
