# Mvuvi - Smart Fishing Platform for Kenyan Fishermen

## Overview

Mvuvi (meaning "Fisherman" in Swahili) is a mobile application built with Expo Go designed to empower Kenyan small-scale fishermen. The app provides real-time information about weather conditions, fish findings, local market prices, safety tools, sustainable fishing practices, and allows fishermen to record their catch data.

## Target Audience

Small-scale fishermen in Kenya, particularly those operating around Lake Victoria, rivers, lakes, and coastal areas, with varying levels of literacy and technical proficiency.

## Core Features

### 1. Localized & Real-Time Weather Forecasts
- Hyper-local weather data for Kenyan water bodies
- Wind speed/direction, precipitation, temperature, water conditions
- Visual and textual displays in Swahili and English
- Moon phase calendar with fishing recommendations
- Push notifications for dangerous weather changes
- Offline access through cached data

### 2. Fish Finding Assistance
- Location-specific guidance based on water body type
- Community-based fish sightings reporting
- Map display of verified sightings
- Environmental data integration (when feasible)
- Focus on Lake Victoria and Kenyan inland waters

### 3. Local Beach Market Price Data
- Agent network for collecting daily beach prices
- Agent data input system
- Price display by fish species and landing beach location
- Primary processing price focus
- Catch data collection by agents

### 4. Safety & Communication Tools
- GPS location sharing (opt-in)
- SOS/distress button with SMS alerts
- Emergency contact management

### 5. Sustainable Fishing Information
- Digital library of Kenyan fishing regulations
- Educational resources on sustainable practices

### 6. Fisherman Catch Data Input
- Personal catch logging system
- Data fields: date/time, location, species, quantity, gear, effort
- Simple, intuitive input interface
- Personal catch history display
- Private data control with opt-in sharing options

### 7. User Profile & Settings
- Language selection (Swahili, English)
- Emergency contact management
- Notification preferences

### 8. Onboarding & Tutorial
- Interactive first-launch tutorial
- Help/FAQ section

## Technical Stack

- **Frontend**: Expo Go (React Native)
- **UI Library**: Tamagui
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Mapping**: react-native-maps
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Localization**: i18next with expo-localization
- **Push Notifications**: Expo Push Notifications
- **SMS Gateway**: Twilio (for SOS features)

## Project Structure

```
mvuvi-app/
├── assets/                # Static assets
│   ├── fonts/            # Custom fonts
│   ├── images/           # App images and photos
│   ├── icons/            # SVG and other icons
├── components/           # Reusable UI components
│   ├── common/           # Shared UI components
│   ├── weather/          # Weather-related components
│   ├── fish-finding/     # Fish finding components
│   ├── safety/           # Safety feature components
├── constants/            # App-wide constants and configuration
├── hooks/                # Custom React hooks
├── localization/         # i18n translations (Swahili and English)
├── navigation/           # Navigation configuration
│   ├── AppNavigator.tsx  # Main app navigator
│   ├── index.ts          # Navigation exports
├── screens/              # App screens by feature
│   ├── auth/             # Authentication screens
│   ├── weather/          # Weather screens
│   ├── fish-finding/     # Fish finding screens
│   ├── market-prices/    # Market price screens
│   ├── safety/           # Safety screens
│   ├── sustainable-fishing/ # Sustainable fishing info screens
│   ├── catch-data/       # Catch data input screens
├── services/             # API and external services
│   ├── api/              # API client and configuration
│   │   ├── client.ts     # Base API client
│   │   ├── endpoints.ts  # API endpoints
│   ├── supabase/         # Supabase client and queries
│   ├── moon/             # Moon phase service
│   ├── weather/          # Weather service
├── store/                # State management with Zustand
│   ├── auth/             # Authentication state
│   ├── weather/          # Weather state
│   ├── index.ts          # Store exports
├── types/                # TypeScript type definitions
│   ├── navigation.types.ts # Navigation types
├── utils/                # Utility functions and helpers
├── App.tsx               # App entry point
├── app.json              # Expo configuration
├── index.ts              # App registration
├── tamagui.config.ts     # Tamagui UI configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Development Phases

### Phase 1
- Core app functionality
- Weather forecasts
- Basic fish finding features
- Beach market prices (agent data)
- Safety features (SOS)
- Sustainable fishing information
- Personal catch data logging

### Phase 2
- Enhanced fish finding
- Expanded market price coverage
- Optional anonymized data sharing
- Community insights from aggregated data
- Pre-trip checklist for safety

### Phase 3
- Marketplace connecting fishermen and buyers
- Advanced analytics
- Premium features for monetization

## Monetization Strategy

- Initial focus on organic growth and free value
- Future premium data access for processors
- Premium features for fishermen (later phases)
- Potential marketplace with transaction fees

## Success Metrics

- App downloads and active users
- Feature usage statistics
- Agent network growth
- User feedback and reviews
- Impact on livelihoods
- Data quality and coverage
- Adoption rate of optional data sharing

## Implementation Checklist

### Completed Tasks
- [x] Project structure setup
- [x] Basic app configuration
- [x] Moon phase calendar implementation
- [x] Moon phase service integration
- [x] Weather screen foundation
- [x] Basic navigation setup
- [x] Project documentation (README)
- [x] Authentication system implementation
- [x] Fish finding feature implementation
- [x] Safety features (GPS sharing, SOS button)
- [x] Emergency contact management
- [x] Improved project structure
- [x] Zustand store implementation
- [x] API service structure
- [x] Catch data logging system
- [x] Localization setup (Swahili and English)
- [x] User profile and settings
- [x] Sustainable fishing information database
- [x] Fish species guide implementation
- [x] Fishing regulations information
- [x] Seasonal fishing calendar
- [x] Fixed component error in FishingRegulationsScreen
- [x] Added ReportViolation screen for reporting fishing violations
- [x] Updated react-native from 0.76.8 to 0.76.9 for better Expo compatibility
- [x] Created platform-specific MapView component for web compatibility
- [x] Added web-specific version of the app with proper fallback UI
- [x] Fixed Tamagui CSS loading issues for web platform
- [x] Renamed moon phase images to use day-based naming convention instead of illumination percentage

### Pending Tasks
- [ ] Weather API integration
- [ ] Market price data collection system
- [ ] Agent network setup for price data
- [ ] Offline data caching
- [ ] Push notification system
- [ ] Interactive onboarding tutorial
- [ ] Help/FAQ section content
- [ ] Testing across different devices
- [ ] Performance optimization
- [ ] Deployment to app stores

## Getting Started

### Prerequisites

- Node.js (LTS version)
- Yarn or npm
- Expo CLI
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies
   ```
   yarn install
   ```
   or
   ```
   npm install
   ```
3. Set up environment variables
   ```
   cp .env.example .env
   ```
4. Start the development server
   ```
   yarn start
   ```
   or
   ```
   npx expo start
   ```

### Development Commands

- Start the development server: `yarn start` or `npx expo start`
- Run on Android: `yarn android` or `npx expo start --android`
- Run on iOS: `yarn ios` or `npx expo start --ios`
- Run on web: `yarn web` or `npx expo start --web`
- Run TypeScript type checking: `yarn tsc` or `npx tsc`
- Run linting: `yarn lint` or `npx eslint . --ext .js,.jsx,.ts,.tsx`
- Fix linting issues: `yarn lint:fix` or `npx eslint . --ext .js,.jsx,.ts,.tsx --fix`

### Web Development Notes

When running the app on web, some native-only features like maps will display fallback components. The app uses platform-specific code to handle these differences:

- `components/maps/MapView.tsx` provides a cross-platform map component that works on both native and web platforms
- Native-only modules are conditionally imported based on the platform

## Implementation Plan

A detailed implementation plan for the remaining features is available in the [docs/implementation-plan.md](docs/implementation-plan.md) file. This document outlines the step-by-step approach for each feature, including technical requirements, dependencies, and estimated timelines.

### GitHub Issues

The following GitHub issues have been created to track the implementation of the remaining features:

1. [Implement Weather API Integration](https://github.com/arnoldadero/mvuvi-app/issues/2)
2. [Implement Market Price Data Collection System](https://github.com/arnoldadero/mvuvi-app/issues/3)
3. [Implement Offline Data Caching](https://github.com/arnoldadero/mvuvi-app/issues/4)
4. [Implement Push Notification System](https://github.com/arnoldadero/mvuvi-app/issues/5)
5. [Create Interactive Onboarding Tutorial](https://github.com/arnoldadero/mvuvi-app/issues/6)
6. [Develop Help/FAQ Section](https://github.com/arnoldadero/mvuvi-app/issues/7)
7. [Conduct Testing Across Different Devices](https://github.com/arnoldadero/mvuvi-app/issues/8)
8. [Optimize App Performance](https://github.com/arnoldadero/mvuvi-app/issues/9)
9. [Prepare App for Deployment to App Stores](https://github.com/arnoldadero/mvuvi-app/issues/10)
10. [Fix undefined component error in FishingRegulationsScreen](https://github.com/arnoldadero/mvuvi-app/issues/11)

All these issues are part of the [MVP Release](https://github.com/arnoldadero/mvuvi-app/milestone/1) milestone.

## Best Practices

### Code Organization
- Follow feature-based folder structure
- Keep components modular and reusable
- Use TypeScript interfaces for type safety
- Implement Zustand for state management
- Use React Query for data fetching

### Styling
- Use Tamagui for cross-platform UI components
- Maintain consistent spacing and typography
- Create reusable UI components

### Performance
- Implement proper list rendering with FlatList
- Use React.memo for expensive components
- Cache API responses with React Query
- Optimize images for mobile devices

### Code Quality
- Use ESLint for code linting
- Follow TypeScript best practices
- Write clean, self-documenting code
- Use consistent naming conventions
- Document complex logic with comments

## Contributing

Guidelines for contributing to the project will be outlined here.

## License

This project is licensed under the [MIT License](LICENSE).
