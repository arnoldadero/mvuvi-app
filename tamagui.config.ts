import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

const headingFont = createInterFont({
  size: {
    6: 15,
    7: 18,
    8: 22,
    9: 28,
    10: 36,
    12: 46,
    14: 56,
    16: 66,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    16: -6,
  },
  face: {
    700: { normal: 'InterBold' },
    500: { normal: 'InterMedium' },
    400: { normal: 'InterRegular' },
  },
});

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
      500: { normal: 'InterMedium' },
      400: { normal: 'InterRegular' },
    },
    size: {
      1: 12,
      2: 14,
      3: 16,
      4: 18,
      5: 20,
      6: 22,
      7: 24,
      8: 28,
      9: 32,
      10: 36,
      11: 40,
      12: 44,
      13: 48,
      14: 56,
      15: 64,
      16: 72,
    },
    letterSpacing: {
      1: 0.5,
      2: 0.5,
      3: 0.25,
      4: 0,
      5: -0.25,
      6: -0.5,
      7: -0.75,
      8: -1,
    },
  },
  {
    sizeLineHeight: (size) => Math.round(size * 1.5),
    sizeSize: (size) => size,
  }
);

// Custom colors for fishing app context
const customTokens = {
  ...tokens,
  color: {
    ...tokens.color,
    oceanBlue: '#0077be',
    deepSea: '#006994',
    skyBlue: '#87ceeb',
    sandyBeach: '#f5deb3',
    coral: '#ff7f50',
    seaweed: '#2e8b57',
    sunset: '#ffa07a',
    moonlight: '#f8f8ff',
  },
};

const config = createTamagui({
  defaultFont: 'body',
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: customTokens,
  themes,
  shorthands,
  // Add media queries for responsive design
  media: {
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
  },
});

// Enable type checking for the design system
declare module 'tamagui' {
  interface TamaguiCustomConfig extends ReturnType<typeof createTamagui> {}
}

export default config;
