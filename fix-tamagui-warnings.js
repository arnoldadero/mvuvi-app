// Script to fix Tamagui warnings
const fs = require('fs');
const path = require('path');

console.log('Fixing Tamagui warnings...');

// Create a .tamaguirc.js file with the correct configuration
const tamaguiRcPath = path.join(__dirname, '.tamaguirc.js');
const tamaguiRcContent = `module.exports = {
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
  // Fix for skipped modules warning
  includeReactNativeWebExports: ['Image', 'View', 'Text', 'ScrollView', 'Animated', 'StyleSheet'],
  // Specify the exact modules to include
  includedModules: ['tamagui', '@tamagui/core', '@tamagui/web', '@tamagui/react-native-media-driver'],
};`;

fs.writeFileSync(tamaguiRcPath, tamaguiRcContent);
console.log('✅ Updated .tamaguirc.js');

// Update babel.config.js to fix Tamagui optimization
const babelConfigPath = path.join(__dirname, 'babel.config.js');
const babelConfig = fs.readFileSync(babelConfigPath, 'utf8');
const updatedBabelConfig = babelConfig.replace(
  /\[\s*'@tamagui\/babel-plugin',\s*\{[^}]*\}\s*\]/s,
  `[
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          // Improve optimization
          disableExtraction: process.env.NODE_ENV === 'development',
          // Fix for skipped modules
          excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
          // Include necessary exports
          includeReactNativeWebExports: ['Image', 'View', 'Text', 'ScrollView', 'Animated', 'StyleSheet'],
        }
      ]`
);

fs.writeFileSync(babelConfigPath, updatedBabelConfig);
console.log('✅ Updated babel.config.js');

// Update tamagui.config.ts to fix media queries and optimization
const tamaguiConfigPath = path.join(__dirname, 'tamagui.config.ts');
const tamaguiConfig = fs.readFileSync(tamaguiConfigPath, 'utf8');

// Fix media queries
const updatedTamaguiConfig = tamaguiConfig
  .replace(
    /import { createTamagui, createMedia[^}]*} from 'tamagui';/,
    `import { createTamagui } from 'tamagui';`
  )
  .replace(
    /const media = createMedia[^;]*;/s,
    `// Define media breakpoints directly
const media = {
  xs: { maxWidth: 660 },
  sm: { maxWidth: 800 },
  md: { maxWidth: 1020 },
  lg: { maxWidth: 1280 },
  xl: { maxWidth: 1420 },
  xxl: { maxWidth: 1600 },
  gtXs: { minWidth: 660 + 1 },
  gtSm: { minWidth: 800 + 1 },
  gtMd: { minWidth: 1020 + 1 },
  gtLg: { minWidth: 1280 + 1 },
  short: { maxHeight: 820 },
  tall: { minHeight: 820 },
  hoverNone: { hover: 'none' },
  pointerCoarse: { pointer: 'coarse' },
};`
  )
  .replace(
    /disableExtractInlineMedia: [^,]*,/,
    `disableExtractInlineMedia: false,`
  )
  .replace(
    /disableExtractInlineProps: [^,]*,/,
    `disableExtractInlineProps: false,`
  );

fs.writeFileSync(tamaguiConfigPath, updatedTamaguiConfig);
console.log('✅ Updated tamagui.config.ts');

console.log('\nTamagui warnings fixed. Please restart your app with: npx expo start --clear');
