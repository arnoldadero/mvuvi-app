import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Text } from 'tamagui';
import { Feather } from '@expo/vector-icons';

// Import main screens for each tab
import { WeatherScreen } from '../screens/weather/WeatherScreen';
import { MarketPricesScreen } from '../screens/market-prices/MarketPricesScreen';
import { SafetyScreen } from '../screens/safety/SafetyScreen';
import { SustainableFishingScreen } from '../screens/sustainable-fishing/SustainableFishingScreen';
import { RecordCatchScreen } from '../screens/catch-data/RecordCatchScreen';

// Define the tab navigator param list
export type TabParamList = {
  Weather: undefined;
  MarketPrices: undefined;
  Safety: undefined;
  SustainableFishing: undefined;
  CatchData: { initialLocation?: { latitude: number; longitude: number } };
};

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Feather.glyphMap = 'help-circle';

          // Set the icon based on the route name
          if (route.name === 'Weather') {
            iconName = 'cloud';
          } else if (route.name === 'MarketPrices') {
            iconName = 'dollar-sign';
          } else if (route.name === 'Safety') {
            iconName = 'shield';
          } else if (route.name === 'SustainableFishing') {
            iconName = 'anchor';
          } else if (route.name === 'CatchData') {
            iconName = 'clipboard';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0891b2', // Cyan color for active tab
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: true,
      })}
    >
      <Tab.Screen 
        name="Weather" 
        component={WeatherScreen} 
        options={{ 
          title: t('weather.title'),
        }}
      />
      <Tab.Screen 
        name="MarketPrices" 
        component={MarketPricesScreen} 
        options={{ 
          title: t('marketPrices.title'),
        }}
      />
      <Tab.Screen 
        name="Safety" 
        component={SafetyScreen} 
        options={{ 
          title: t('safety.title'),
        }}
      />
      <Tab.Screen 
        name="SustainableFishing" 
        component={SustainableFishingScreen} 
        options={{ 
          title: t('sustainableFishing.title'),
        }}
      />
      <Tab.Screen 
        name="CatchData" 
        component={RecordCatchScreen} 
        options={{ 
          title: t('catch.recordCatch'),
        }}
      />
    </Tab.Navigator>
  );
}
