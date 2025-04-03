module.exports = {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  // Disable extraction in development mode
  disableExtraction: process.env.NODE_ENV === 'development',
  // Exclude problematic components
  excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  // Disable optimization for certain paths
  disableExtractFoundComponents: [
    './components/maps/MapView',
    './screens/market-prices/MarketPricesScreen',
    './screens/catch-data/RecordCatchScreen',
    './screens/safety/SafetyScreen'
  ],
  // Improve performance
  logTimings: true,
};
