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

### Pending Tasks
- [ ] Localization setup (Swahili and English)
- [ ] Weather API integration
- [ ] Market price data collection system
- [ ] Agent network setup for price data
- [ ] Sustainable fishing information database
- [ ] Catch data logging system
- [ ] User profile and settings
- [ ] Offline data caching
- [ ] Push notification system
- [ ] Interactive onboarding tutorial
- [ ] Help/FAQ section
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
3. Set up environment variables
   ```
   cp .env.example .env
   ```
4. Start the development server
   ```
   yarn start
   ```

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

## Contributing

Guidelines for contributing to the project will be outlined here.

## License

This project is licensed under the [MIT License](LICENSE).
