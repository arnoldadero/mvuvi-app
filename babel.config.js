module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'transform-inline-environment-variables',
        {
          include: ['NODE_ENV', 'EXPO_RUNTIME_VERSION']
        }
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
