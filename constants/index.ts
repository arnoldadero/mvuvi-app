/**
 * Application constants
 */

// App information
export const APP_INFO = {
  name: 'Mvuvi',
  version: '1.0.0',
  description: 'Smart Fishing Platform for Kenyan Fishermen',
};

// Screen names for navigation
export const SCREENS = {
  WEATHER: 'Weather',
  MOON_PHASE: 'MoonPhase',
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    FORGOT_PASSWORD: 'ForgotPassword',
  },
  FISH_FINDING: {
    MAP: 'FishMap',
    REPORT: 'ReportSighting',
  },
  MARKET_PRICES: {
    LIST: 'MarketPrices',
    DETAILS: 'PriceDetails',
  },
  SAFETY: {
    MAIN: 'Safety',
    CONTACTS: 'EmergencyContacts',
    CHECKLIST: 'SafetyChecklist',
  },
  CATCH_DATA: {
    LOG: 'LogCatch',
    HISTORY: 'CatchHistory',
    DETAILS: 'CatchDetails',
  },
  SUSTAINABLE_FISHING: {
    REGULATIONS: 'FishingRegulations',
    SEASONAL_CALENDAR: 'FishingSeasonalCalendar',
    SPECIES_GUIDE: 'FishSpeciesGuide',
  },
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
};

// API configuration
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_COUNT: 3,
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@mvuvi:auth_token',
  USER_PROFILE: '@mvuvi:user_profile',
  LANGUAGE: '@mvuvi:language',
  EMERGENCY_CONTACTS: '@mvuvi:emergency_contacts',
  CACHED_WEATHER: '@mvuvi:cached_weather',
  CACHED_MARKET_PRICES: '@mvuvi:cached_market_prices',
};

// Theme configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#2089dc',
    SECONDARY: '#ca71eb',
    WHITE: '#ffffff',
    BLACK: '#000000',
    GREY: '#86939e',
    LIGHT_GREY: '#f2f2f2',
    ERROR: '#ff190c',
    WARNING: '#ffae00',
    SUCCESS: '#52c41a',
  },
};
