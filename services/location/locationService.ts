import * as Location from 'expo-location';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationError {
  message: string;
}

export interface LocationServiceResult {
  coordinates?: LocationCoordinates;
  locationName?: string;
  error?: LocationError;
}

/**
 * Service to handle location-related operations
 */
export const locationService = {
  /**
   * Request location permission and get the current position of the user
   * @returns Promise with location coordinates and address or error
   */
  getCurrentLocation: async (): Promise<LocationServiceResult> => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        return {
          error: { 
            message: 'Location permission not granted' 
          }
        };
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const coordinates = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      // Get location name from coordinates
      try {
        const [address] = await Location.reverseGeocodeAsync(coordinates);
        
        if (address) {
          const locationName = [
            address.street,
            address.district,
            address.subregion,
            address.region,
          ]
            .filter(Boolean)
            .join(', ');
          
          return {
            coordinates,
            locationName: locationName || 'Unknown location',
          };
        }
      } catch (error) {
        // If reverse geocoding fails, still return the coordinates
        console.log('Reverse geocoding error:', error);
      }

      return { coordinates };
    } catch (error) {
      console.error('Error getting location:', error);
      return {
        error: { 
          message: 'Failed to get location' 
        }
      };
    }
  },
};
