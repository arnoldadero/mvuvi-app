import React from 'react';
import { ScrollView, XStack, YStack, Text, Card } from 'tamagui';
import { WeatherIcon, mapConditionToIcon } from './WeatherIcon';

interface HourlyForecastItem {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

interface HourlyForecastListProps {
  hourlyData: HourlyForecastItem[];
}

const S: any = ScrollView;
const X: any = XStack;
const Y: any = YStack;
const T: any = Text;
const C: any = Card;

/**
 * Formats a time string to display hour
 */
function formatHour(timeString: string): string {
  const date = new Date(timeString);
  return date.toLocaleTimeString(undefined, { hour: 'numeric' });
}

/**
 * Component for displaying a horizontal scrollable list of hourly forecasts
 */
export function HourlyForecastList({ hourlyData }: HourlyForecastListProps) {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  return (
    <S
      horizontal
      showsHorizontalScrollIndicator={false}
      contentInset={{ left: 8, right: 8 }}
    >
      <X space="$2" paddingHorizontal="$2">
        {hourlyData.map((hour, index) => (
          <C
            key={index}
            width={80}
            height={120}
            alignItems="center"
            justifyContent="center"
            padding="$2"
          >
            <T fontWeight="bold">{formatHour(hour.time)}</T>
            <WeatherIcon 
              condition={mapConditionToIcon(hour.condition)} 
              width={40} 
              height={40} 
              alt={hour.condition}
            />
            <T fontSize="$5" fontWeight="bold" marginTop="$1">
              {Math.round(hour.temperature)}°
            </T>
            <T fontSize="$2" color="$gray10">
              {Math.round(hour.precipitation * 100)}%
            </T>
          </C>
        ))}
      </X>
    </S>
  );
}
