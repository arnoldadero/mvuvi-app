import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import './localization/i18n';
import { useTranslation } from 'react-i18next';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';

// Define a simple placeholder screen for SustainableFishing
function SustainableFishingScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sustainable Fishing</Text>
      <Text style={styles.message}>{t('common.webNotSupported')}</Text>
    </View>
  );
}

// Define a simple placeholder screen for EmergencyContacts
function EmergencyContactsScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <Text style={styles.message}>{t('common.webNotSupported')}</Text>
    </View>
  );
}

// Define a simple placeholder screen for any other screens
function PlaceholderScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mvuvi App</Text>
      <Text style={styles.message}>{t('common.webNotSupported')}</Text>
    </View>
  );
}

// Main screen component
function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mvuvi App</Text>
        <Text style={styles.subtitle}>{t('common.webNotSupported')}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>
          {t('common.webMessage')}
        </Text>
        <Text style={styles.instruction}>
          {t('common.downloadInstructions')}
        </Text>
      </View>
    </View>
  );
}

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Create a navigation ref that can be used outside of the Navigation Provider
export const navigationRef = createNavigationContainerRef();

// Custom navigation function that handles undefined screens
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    // Check if the screen exists in our navigation container
    const state = navigationRef.getRootState();
    const availableScreens = state?.routeNames || [];

    if (availableScreens.includes(name)) {
      // If the screen exists, navigate to it
      navigationRef.navigate(name, params);
    } else {
      // If the screen doesn't exist, navigate to the placeholder with the attempted screen name
      console.warn(`Screen "${name}" doesn't exist in the web version. Navigating to placeholder.`);
      navigationRef.navigate('PlaceholderScreen', { screen: name });
    }
  } else {
    // Navigation container is not ready yet
    console.warn('Navigation container is not ready yet');
  }
}

// Simple web-specific version of the app with basic navigation
export default function App() {
  // Create a custom navigation container to handle undefined routes
  return (
    <NavigationContainer
      ref={navigationRef}
      fallback={<Text>Loading...</Text>}
      onUnhandledAction={(action) => {
        // Handle unhandled navigation actions
        console.warn('Unhandled navigation action:', action);
      }}
      linking={{
        // Define a fallback handler for undefined routes
        getStateFromPath: (path) => {
          // Default state points to Home
          return {
            routes: [{ name: 'Home' }]
          };
        },
        // Custom configuration to handle navigation attempts
        config: {
          screens: {
            Home: '',
            SustainableFishing: 'sustainable-fishing',
            EmergencyContacts: 'emergency-contacts',
            // Add a wildcard route to catch all other paths
            PlaceholderScreen: '*',
          },
        },
      }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SustainableFishing" component={SustainableFishingScreen} />
        <Stack.Screen name="EmergencyContacts" component={EmergencyContactsScreen} />
        {/* Add a generic screen for any other navigation attempts */}
        <Stack.Screen
          name="PlaceholderScreen"
          component={PlaceholderScreen}
          options={({ route }) => ({
            title: route?.params?.screen || 'Mvuvi App'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
