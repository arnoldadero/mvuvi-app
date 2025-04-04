import React from 'react';
import { XStack, YStack, Text, Card } from 'tamagui';
import { WeatherIcon, mapConditionToIcon } from './WeatherIcon';

interface DailyForecastItemProps {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  precipitation: number | string;
  isLast?: boolean;
}

const X: any = XStack;
const Y: any = YStack;
const T: any = Text;
const C: any = Card;

/**
 * Formats a date string to display day of week
 */
function formatDay(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}

/**
 * Component for displaying a single day's forecast in a list
 */
export function DailyForecastItem({ 
  date, 
  minTemp, 
  maxTemp, 
  condition, 
  precipitation, 
  isLast = false 
}: DailyForecastItemProps) {
  return (
    <X
      justifyContent="space-between"
      alignItems="center"
      paddingVertical="$2"
      borderBottomWidth={isLast ? 0 : 1}
      borderBottomColor="$borderColor"
    >
      <X alignItems="center" space="$2" flex={1}>
        <WeatherIcon 
          condition={mapConditionToIcon(condition)} 
          width={30} 
          height={30} 
          alt={condition}
        />
        <T>{formatDay(date)}</T>
      </X>
      
      <X alignItems="center" justifyContent="flex-end" flex={1}>
        <T fontWeight="bold">{Math.round(minTemp)}° - {Math.round(maxTemp)}°</T>
      </X>
      
      <X alignItems="center" justifyContent="flex-end" flex={1}>
        <T>{typeof precipitation === 'number' ? `${Math.round(precipitation * 100)}%` : precipitation}</T>
      </X>
    </X>
  );
}
