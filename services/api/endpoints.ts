/**
 * API endpoints configuration
 */

export const ENDPOINTS = {
  // Weather endpoints
  WEATHER: {
    FORECAST: '/api/weather/forecast',
    CURRENT: '/api/weather/current',
  },
  
  // Fish finding endpoints
  FISH_FINDING: {
    SIGHTINGS: '/api/fish/sightings',
    REPORT: '/api/fish/report',
  },
  
  // Market price endpoints
  MARKET: {
    PRICES: '/api/market/prices',
    BEACHES: '/api/market/beaches',
  },
  
  // Safety endpoints
  SAFETY: {
    SOS: '/api/safety/sos',
    LOCATION: '/api/safety/location',
  },
  
  // Catch data endpoints
  CATCH: {
    LOG: '/api/catch/log',
    HISTORY: '/api/catch/history',
  },
  
  // User profile endpoints
  USER: {
    PROFILE: '/api/user/profile',
    SETTINGS: '/api/user/settings',
  },
};
