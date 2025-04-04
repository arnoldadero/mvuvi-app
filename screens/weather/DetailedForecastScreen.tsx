import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import { ScrollView, YStack, H2, Text, Card, Button, XStack, Paragraph } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useWeatherStore } from '../../store/weather/weather-store';
import { locationService } from '../../services/location/locationService';
import { DailyForecastItem } from '../../components/weather/DailyForecastItem';
import { HourlyForecastList } from '../../components/weather/HourlyForecastList';
import { WeatherWarningBanner } from '../../components/weather/WeatherWarningBanner';

interface DetailedForecastScreenProps {
  navigation?: any;
}

const Y: any = YStack;
const X: any = XStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const B: any = Button;
const P: any = Paragraph;
const S: any = ScrollView;

export function DetailedForecastScreen({ navigation }: DetailedForecastScreenProps) {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  // Get weather data from store
  const { 
    forecast, 
    isLoading, 
    hasError, 
    errorMessage, 
    fetchForecast 
  } = useWeatherStore();

  // Mock hourly data - would come from API in a real app
  const mockHourlyData = [
    { time: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), temperature: 28, condition: 'Partly Cloudy', precipitation: 0.1 },
    { time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), temperature: 29, condition: 'Sunny', precipitation: 0.05 },
    { time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), temperature: 30, condition: 'Sunny', precipitation: 0 },
    { time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), temperature: 30, condition: 'Sunny', precipitation: 0 },
    { time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), temperature: 29, condition: 'Partly Cloudy', precipitation: 0.2 },
    { time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), temperature: 28, condition: 'Cloudy', precipitation: 0.3 },
    { time: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString(), temperature: 27, condition: 'Rain', precipitation: 0.6 },
    { time: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), temperature: 26, condition: 'Rain', precipitation: 0.7 },
  ];

  // Mock warnings - would come from API in a real app
  const mockWarnings = [
    {
      title: t('weather.stormWarning'),
      description: t('weather.stormWarningDesc'),
      severity: 'medium' as const,
    },
  ];

  // Get user location and fetch weather data
  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        const locationResult = await locationService.getCurrentLocation();
        
        if (locationResult.coordinates) {
          const weatherLocation = {
            lat: locationResult.coordinates.latitude,
            lng: locationResult.coordinates.longitude,
          };
          
          setLocation(weatherLocation);
          fetchForecast(weatherLocation);
        }
      } catch (error) {
        console.error('Error getting location or weather:', error);
      }
    };

    getLocationAndWeather();
  }, [fetchForecast]);

  // Handle manual refresh
  const onRefresh = async () => {
    setRefreshing(true);
    
    if (location) {
      await fetchForecast(location);
    } else {
      try {
        const locationResult = await locationService.getCurrentLocation();
        
        if (locationResult.coordinates) {
          const weatherLocation = {
            lat: locationResult.coordinates.latitude,
            lng: locationResult.coordinates.longitude,
          };
          
          setLocation(weatherLocation);
          await fetchForecast(weatherLocation);
        }
      } catch (error) {
        console.error('Error refreshing weather data:', error);
      }
    }
    
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <S refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Y padding="$4" space="$4">
          <H>{t('weather.forecast')}</H>

          {isLoading && !refreshing ? (
            <Y alignItems="center" justifyContent="center" height={200}>
              <ActivityIndicator size="large" color="#2089dc" />
              <T marginTop="$2">{t('common.loading')}</T>
            </Y>
          ) : hasError ? (
            <C backgroundColor="$red2" padding="$3" borderRadius="$4">
              <T color="$red9">{errorMessage || t('common.errorOccurred')}</T>
              <B marginTop="$2" onPress={onRefresh}>
                {t('common.tryAgain')}
              </B>
            </C>
          ) : (
            <>
              {/* Weather Warnings */}
              <WeatherWarningBanner warnings={mockWarnings} />

              {/* Hourly Forecast */}
              <C borderRadius="$4">
                <C.Header padded>
                  <T fontWeight="bold">{t('weather.hourlyForecast')}</T>
                </C.Header>
                <Y padding="$2">
                  <HourlyForecastList hourlyData={mockHourlyData} />
                </Y>
              </C>

              {/* Daily Forecast */}
              <C borderRadius="$4">
                <C.Header padded>
                  <T fontWeight="bold">{t('weather.dailyForecast')}</T>
                </C.Header>
                <Y padding="$4">
                  {/* Use real forecast data if available, otherwise use mock data */}
                  {forecast ? (
                    forecast.map((day, index) => (
                      <DailyForecastItem
                        key={day.date}
                        date={day.date}
                        minTemp={day.temperature.min}
                        maxTemp={day.temperature.max}
                        condition={day.description}
                        precipitation={day.precipitation}
                        isLast={index === forecast.length - 1}
                      />
                    ))
                  ) : (
                    // Mock data as fallback
                    Array.from({ length: 5 }).map((_, index) => {
                      const date = new Date();
                      date.setDate(date.getDate() + index);
                      
                      return (
                        <DailyForecastItem
                          key={index}
                          date={date.toISOString()}
                          minTemp={25 + Math.floor(Math.random() * 3)}
                          maxTemp={29 + Math.floor(Math.random() * 3)}
                          condition={index % 2 === 0 ? 'Sunny' : 'Partly Cloudy'}
                          precipitation={`${10 + index * 5}%`}
                          isLast={index === 4}
                        />
                      );
                    })
                  )}
                </Y>
              </C>

              {/* Additional Information */}
              <C borderRadius="$4">
                <C.Header padded>
                  <T fontWeight="bold">{t('weather.marineConditions')}</T>
                </C.Header>
                <Y padding="$4" space="$2">
                  <X justifyContent="space-between">
                    <T>{t('weather.waveHeight')}</T>
                    <T>1.2 - 1.5m</T>
                  </X>
                  <X justifyContent="space-between">
                    <T>{t('weather.waterTemperature')}</T>
                    <T>26°C</T>
                  </X>
                  <X justifyContent="space-between">
                    <T>{t('weather.visibility')}</T>
                    <T>10 km</T>
                  </X>
                </Y>
              </C>
            </>
          )}
        </Y>
      </S>
    </SafeAreaView>
  );
}
