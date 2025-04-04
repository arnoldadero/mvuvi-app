import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Text, Button } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import main screens for each tab
import { WeatherScreen } from '../screens/weather/WeatherScreen';
import { SafetyScreen } from '../screens/safety/SafetyScreen';
import { SustainableFishingScreen } from '../screens/sustainable-fishing/SustainableFishingScreen';
import { RootStackParamList } from './AppNavigator';

// Define the tab navigator param list
export type PublicTabParamList = {
  Weather: undefined;
  Safety: undefined;
  SustainableFishing: undefined;
};

const Tab = createBottomTabNavigator<PublicTabParamList>();

export function PublicTabNavigator() {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Login button for header right
  const LoginButton = () => (
    <Button
      size="$2"
      theme="blue"
      onPress={() => navigation.navigate('Login')}
      marginRight="$2"
    >
      {t('auth.login')}
    </Button>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Feather.glyphMap = 'help-circle';

          // Set the icon based on the route name
          if (route.name === 'Weather') {
            iconName = 'cloud';
          } else if (route.name === 'Safety') {
            iconName = 'shield';
          } else if (route.name === 'SustainableFishing') {
            iconName = 'anchor';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0891b2', // Cyan color for active tab
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: true,
        // Add login button to the header right of all tab screens
        headerRight: () => <LoginButton />,
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
    </Tab.Navigator>
  );
}
