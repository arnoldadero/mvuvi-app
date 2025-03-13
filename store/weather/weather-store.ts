import { create } from 'zustand';

// Define weather state interface
interface WeatherState {
  // Weather data
  currentWeather: CurrentWeather | null;
  forecast: ForecastData[] | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  
  // Actions
  fetchCurrentWeather: (location: { lat: number; lng: number }) => Promise<void>;
  fetchForecast: (location: { lat: number; lng: number }) => Promise<void>;
  resetErrors: () => void;
}

// Weather data interfaces
interface CurrentWeather {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  humidity: number;
  precipitation: number;
  description: string;
  location: string;
  timestamp: number;
}

interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  description: string;
}

// Create weather store with Zustand
export const useWeatherStore = create<WeatherState>((set) => ({
  // Initial state
  currentWeather: null,
  forecast: null,
  isLoading: false,
  hasError: false,
  errorMessage: null,
  
  // Actions
  fetchCurrentWeather: async (location) => {
    try {
      set({ isLoading: true, hasError: false, errorMessage: null });
      
      // Simulated API call - replace with actual API call
      const response = await fetch(
        `https://api.example.com/weather?lat=${location.lat}&lon=${location.lng}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch current weather data');
      }
      
      const data = await response.json();
      
      set({
        currentWeather: {
          temperature: data.temperature,
          windSpeed: data.wind_speed,
          windDirection: data.wind_direction,
          humidity: data.humidity,
          precipitation: data.precipitation,
          description: data.description,
          location: data.location_name,
          timestamp: Date.now(),
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false,
      });
    }
  },
  
  fetchForecast: async (location) => {
    try {
      set({ isLoading: true, hasError: false, errorMessage: null });
      
      // Simulated API call - replace with actual API call
      const response = await fetch(
        `https://api.example.com/forecast?lat=${location.lat}&lon=${location.lng}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast data');
      }
      
      const data = await response.json();
      
      // Transform API data to our format
      const forecastData = data.daily.map((day: any) => ({
        date: day.date,
        temperature: {
          min: day.temp_min,
          max: day.temp_max,
        },
        windSpeed: day.wind_speed,
        windDirection: day.wind_direction,
        precipitation: day.precipitation,
        description: day.description,
      }));
      
      set({
        forecast: forecastData,
        isLoading: false,
      });
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false,
      });
    }
  },
  
  resetErrors: () => {
    set({ hasError: false, errorMessage: null });
  },
}));
