import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { ScrollView, YStack, H2, Text, Card, Button, XStack, Paragraph } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { MoonPhaseCalendar } from '../../components/weather/moon-phase/MoonPhaseCalendar';
import { getMoonPhaseData } from '../../services/moon/moonPhaseService';
import { useWeatherStore } from '../../store/weather/weather-store';
import { locationService } from '../../services/location/locationService';
import { WeatherIcon, mapConditionToIcon } from '../../components/weather/WeatherIcon';
import { WindDirectionIndicator } from '../../components/weather/WindDirectionIndicator';
import { DailyForecastItem } from '../../components/weather/DailyForecastItem';
import { WeatherWarningBanner } from '../../components/weather/WeatherWarningBanner';

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
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('');

  // Get weather data from store
  const {
    currentWeather,
    forecast,
    isLoading,
    hasError,
    errorMessage,
    fetchCurrentWeather,
    fetchForecast
  } = useWeatherStore();

  // Mock warnings - would come from API in a real app
  const mockWarnings = currentWeather?.description?.toLowerCase().includes('rain') ? [
    {
      title: t('weather.rainWarning'),
      description: t('weather.rainWarningDesc'),
      severity: 'low' as const,
    },
  ] : [];

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
          setLocationName(locationResult.locationName || '');
          fetchCurrentWeather(weatherLocation);
          fetchForecast(weatherLocation);
        }
      } catch (error) {
        console.error('Error getting location or weather:', error);
      }
    };

    getLocationAndWeather();
  }, [fetchCurrentWeather, fetchForecast]);

  // Handle manual refresh
  const onRefresh = async () => {
    setRefreshing(true);

    if (location) {
      await Promise.all([
        fetchCurrentWeather(location),
        fetchForecast(location)
      ]);
    } else {
      try {
        const locationResult = await locationService.getCurrentLocation();

        if (locationResult.coordinates) {
          const weatherLocation = {
            lat: locationResult.coordinates.latitude,
            lng: locationResult.coordinates.longitude,
          };

          setLocation(weatherLocation);
          setLocationName(locationResult.locationName || '');
          await Promise.all([
            fetchCurrentWeather(weatherLocation),
            fetchForecast(weatherLocation)
          ]);
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
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Y padding="$4" space="$4">
          <X justifyContent="space-between" alignItems="center">
            <H>{t('weather.title')}</H>
            {locationName && <T color="$gray10">{locationName}</T>}
          </X>

          {/* Weather Warnings */}
          <WeatherWarningBanner warnings={mockWarnings} />

          {/* Current Weather Conditions */}
          {isLoading && !currentWeather && !refreshing ? (
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
            <C borderRadius="$4">
              <C.Header padded>
                <X justifyContent="space-between" alignItems="center" width="100%">
                  <T fontWeight="bold">{t('weather.currentConditions')}</T>
                  <T fontSize="$2" color="$gray10">
                    {currentWeather?.timestamp ? new Date(currentWeather.timestamp).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : ''}
                  </T>
                </X>
              </C.Header>
              <Y padding="$4" space="$2">
                <X justifyContent="space-between" alignItems="center">
                  <X alignItems="center" space="$2">
                    {currentWeather?.description && (
                      <WeatherIcon
                        condition={mapConditionToIcon(currentWeather.description)}
                        width={40}
                        height={40}
                        alt={currentWeather.description}
                      />
                    )}
                    <T>{currentWeather?.description || 'Unknown'}</T>
                  </X>
                  <T fontWeight="bold" fontSize="$8">
                    {currentWeather ? `${Math.round(currentWeather.temperature)}°C` : '--°C'}
                  </T>
                </X>

                <X justifyContent="space-between" alignItems="center" marginTop="$2">
                  <T>{t('weather.windSpeed')}</T>
                  <X alignItems="center" space="$2">
                    <T>{currentWeather ? `${Math.round(currentWeather.windSpeed)} km/h` : '--'}</T>
                    {currentWeather?.windDirection && (
                      <WindDirectionIndicator direction={currentWeather.windDirection} />
                    )}
                  </X>
                </X>

                <X justifyContent="space-between">
                  <T>{t('weather.precipitation')}</T>
                  <T>{currentWeather ? `${Math.round(currentWeather.precipitation * 100)}%` : '--'}</T>
                </X>

                <X justifyContent="space-between">
                  <T>{t('weather.humidity')}</T>
                  <T>{currentWeather ? `${Math.round(currentWeather.humidity)}%` : '--'}</T>
                </X>

                <X justifyContent="space-between">
                  <T>{t('weather.feelsLike')}</T>
                  <T>{currentWeather ? `${Math.round(currentWeather.temperature - 1)}°C` : '--'}</T>
                </X>
              </Y>
            </C>
          )}

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
                <B
                  size="$2"
                  variant="outlined"
                  onPress={() => navigation?.navigate('DetailedForecast')}
                >
                  {t('common.learnMore')}
                </B>
              </X>
            </C.Header>
            <Y padding="$4">
              {isLoading && !forecast && !refreshing ? (
                <ActivityIndicator size="small" color="#2089dc" />
              ) : hasError ? (
                <T color="$red9">{t('common.errorLoadingForecast')}</T>
              ) : (
                // Use real forecast data if available, otherwise use mock data
                (forecast ? forecast.slice(0, 3) : Array.from({ length: 3 })).map((day, index) => {
                  if (forecast) {
                    return (
                      <DailyForecastItem
                        key={day.date}
                        date={day.date}
                        minTemp={day.temperature.min}
                        maxTemp={day.temperature.max}
                        condition={day.description}
                        precipitation={day.precipitation}
                        isLast={index === 2}
                      />
                    );
                  } else {
                    // Mock data as fallback
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
                        isLast={index === 2}
                      />
                    );
                  }
                })
              )}
            </Y>
          </C>

          {/* Local water conditions or other weather-related info could go here */}
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
