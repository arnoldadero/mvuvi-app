// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add resolver for mocks
config.resolver.extraNodeModules = {
  'react-native-web': path.resolve(__dirname, 'mocks/react-native-web.js'),
};

module.exports = config;
