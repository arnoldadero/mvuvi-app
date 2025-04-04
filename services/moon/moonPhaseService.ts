/**
 * Moon Phase Service
 * Calculates and provides moon phase data relevant for fishing activities
 */

export interface MoonPhaseData {
  date: Date;
  phase: MoonPhase;
  illumination: number; // 0-1 value representing how illuminated the moon is
  age: number; // Moon age in days (0-29.53)
  distance: number; // Distance to earth in km
  isFishingFavorable: boolean;
  fishingRecommendation: string;
  omenaDagaaRecommendation?: string; // Specific recommendations for Omena/Dagaa fishing
  imageFile?: string; // Path to the specific moon phase image file
}

export enum MoonPhase {
  NEW_MOON = 'NEW_MOON',
  WAXING_CRESCENT = 'WAXING_CRESCENT',
  FIRST_QUARTER = 'FIRST_QUARTER',
  WAXING_GIBBOUS = 'WAXING_GIBBOUS',
  FULL_MOON = 'FULL_MOON',
  WANING_GIBBOUS = 'WANING_GIBBOUS',
  LAST_QUARTER = 'LAST_QUARTER',
  WANING_CRESCENT = 'WANING_CRESCENT'
}

// Moon cycle constants
const LUNAR_MONTH = 29.53059; // Days in a lunar month

/**
 * Calculate moon age (days since last new moon) based on date
 * Uses a simplified algorithm based on known new moon reference date
 */
function calculateMoonAge(date: Date): number {
  // Known new moon reference date: January 6, 2000
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));

  // Calculate days since known new moon
  const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);

  // Calculate moon age in current cycle (0-29.53 days)
  const age = daysSinceKnownNewMoon % LUNAR_MONTH;

  return age >= 0 ? age : age + LUNAR_MONTH;
}

/**
 * Get moon phase based on moon age
 */
function getMoonPhase(age: number): MoonPhase {
  if (age < 1.84566) return MoonPhase.NEW_MOON;
  if (age < 5.53699) return MoonPhase.WAXING_CRESCENT;
  if (age < 9.22831) return MoonPhase.FIRST_QUARTER;
  if (age < 12.91963) return MoonPhase.WAXING_GIBBOUS;
  if (age < 16.61096) return MoonPhase.FULL_MOON;
  if (age < 20.30228) return MoonPhase.WANING_GIBBOUS;
  if (age < 23.99361) return MoonPhase.LAST_QUARTER;
  if (age < 27.68493) return MoonPhase.WANING_CRESCENT;
  return MoonPhase.NEW_MOON;
}

/**
 * Calculate moon illumination percentage based on age
 */
function calculateIllumination(age: number): number {
  // Simplified illumination calculation (sine function approximation)
  return Math.sin(age / LUNAR_MONTH * Math.PI) * 0.5 + 0.5;
}

/**
 * Determine if fishing conditions are favorable based on moon phase
 * and provide recommendations specific to Kenyan fishing contexts
 * @param phase The moon phase
 * @param age The age of the moon in days
 * @param fishType Optional parameter to get recommendations for specific fish types
 */
function getFishingRecommendation(
  phase: MoonPhase,
  age: number,
  fishType: string = 'general'
): { isFavorable: boolean; recommendation: string; omenaDagaaSpecific?: string } {
  // Get the current month (0-11)
  const currentMonth = new Date().getMonth();

  // Check if we're in the optimal Omena/Dagaa fishing season (November through April)
  const isOmenaDagaaSeason = currentMonth >= 10 || currentMonth <= 3;

  // Special recommendations for Omena/Dagaa fishing
  if (fishType === 'omena' || fishType === 'dagaa' || fishType === 'general') {
    // Dark moon phases are best for Omena/Dagaa fishing
    const isDarkMoonPhase = phase === MoonPhase.NEW_MOON ||
                           phase === MoonPhase.WANING_CRESCENT ||
                           phase === MoonPhase.WAXING_CRESCENT;

    // Omena/Dagaa specific recommendation
    let omenaDagaaSpecific = '';

    if (isDarkMoonPhase) {
      omenaDagaaSpecific = isOmenaDagaaSeason
        ? "Excellent conditions for Omena/Dagaa fishing. Dark moon provides optimal contrast for light attraction methods."
        : "Good darkness for Omena/Dagaa fishing, but outside peak season. Check local conditions.";
    } else if (phase === MoonPhase.FULL_MOON) {
      omenaDagaaSpecific = "Poor conditions for Omena/Dagaa fishing. Bright moonlight interferes with light attraction methods. Consider fishing near sunrise/sunset only.";
    } else {
      omenaDagaaSpecific = "Moderate conditions for Omena/Dagaa fishing. Best results near dawn or dusk when light contrast is higher.";
    }

    // General fishing recommendations based on moon phase
    switch (phase) {
      case MoonPhase.NEW_MOON:
        return {
          isFavorable: true,
          recommendation: "Excellent for night fishing. Fish are actively feeding due to darkness.",
          omenaDagaaSpecific
        };
      case MoonPhase.FULL_MOON:
        return {
          isFavorable: false,
          recommendation: "Bad for night fishing. The bright moon helps visibility and fish are more cautious.",
          omenaDagaaSpecific
        };
      case MoonPhase.FIRST_QUARTER:
      case MoonPhase.LAST_QUARTER:
        return {
          isFavorable: true,
          recommendation: "Good fishing, especially during dusk and dawn. Moderate tidal influence.",
          omenaDagaaSpecific
        };
      case MoonPhase.WAXING_CRESCENT:
      case MoonPhase.WANING_CRESCENT:
        return {
          isFavorable: isDarkMoonPhase, // Favorable for Omena/Dagaa
          recommendation: "Average fishing. Focus on early morning or late evening fishing.",
          omenaDagaaSpecific
        };
      case MoonPhase.WAXING_GIBBOUS:
      case MoonPhase.WANING_GIBBOUS:
        return {
          isFavorable: false,
          recommendation: "Below average fishing. Fish are less active except around dawn/dusk periods.",
          omenaDagaaSpecific
        };
      default:
        return {
          isFavorable: false,
          recommendation: "Check local conditions and traditional knowledge.",
          omenaDagaaSpecific
        };
    }
  }

  // Default recommendations for other fish types
  switch (phase) {
    case MoonPhase.NEW_MOON:
      return {
        isFavorable: true,
        recommendation: "Excellent for night fishing. Fish are actively feeding due to darkness.",
      };
    case MoonPhase.FULL_MOON:
      return {
        isFavorable: false,
        recommendation: "Bad for night fishing. The bright moon helps visibility and fish are more cautious.",
      };
    case MoonPhase.FIRST_QUARTER:
    case MoonPhase.LAST_QUARTER:
      return {
        isFavorable: true,
        recommendation: "Good fishing, especially during dusk and dawn. Moderate tidal influence.",
      };
    case MoonPhase.WAXING_CRESCENT:
    case MoonPhase.WANING_CRESCENT:
      return {
        isFavorable: false,
        recommendation: "Average fishing. Focus on early morning or late evening fishing.",
      };
    case MoonPhase.WAXING_GIBBOUS:
    case MoonPhase.WANING_GIBBOUS:
      return {
        isFavorable: false,
        recommendation: "Below average fishing. Fish are less active except around dawn/dusk periods.",
      };
    default:
      return {
        isFavorable: false,
        recommendation: "Check local conditions and traditional knowledge.",
      };
  }
}

/**
 * Get moon phase data for a specific date
 * @param date The date to calculate moon phase for
 * @param fishType Optional parameter to get recommendations for specific fish types
 */
export function getMoonPhaseData(date: Date = new Date(), fishType: string = 'general'): MoonPhaseData {
  const age = calculateMoonAge(date);
  const phase = getMoonPhase(age);
  const illumination = calculateIllumination(age);
  const fishingRecommendation = getFishingRecommendation(phase, age, fishType);

  // Approximate distance calculation - simplified for this implementation
  // In a real app, would use more precise astronomical calculations
  const distance = 384400; // Average distance in km

  // Get the appropriate image file for this moon phase based on moon age
  const imageFile = getMoonPhaseImageFile(phase, illumination, date);

  return {
    date,
    phase,
    illumination,
    age,
    distance,
    isFishingFavorable: fishingRecommendation.isFavorable,
    fishingRecommendation: fishingRecommendation.recommendation,
    omenaDagaaRecommendation: fishingRecommendation.omenaDagaaSpecific,
    imageFile,
  };
}

/**
 * Get moon phases for a date range (useful for calendar views)
 * @param startDate Beginning of date range
 * @param days Number of days to calculate
 */
export function getMoonPhaseCalendar(startDate: Date = new Date(), days: number = 30): MoonPhaseData[] {
  const calendar: MoonPhaseData[] = [];

  const currentDate = new Date(startDate);

  for (let i = 0; i < days; i++) {
    const dayDate = new Date(currentDate);
    calendar.push(getMoonPhaseData(dayDate));

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendar;
}

/**
 * Get next favorable fishing days based on moon phase
 * @param startDate Starting date to look from
 * @param daysToCheck How many days ahead to check
 * @param limit Maximum number of favorable days to return
 */
export function getNextFavorableFishingDays(
  startDate: Date = new Date(),
  daysToCheck: number = 30,
  limit: number = 5
): MoonPhaseData[] {
  const calendar = getMoonPhaseCalendar(startDate, daysToCheck);

  // Filter to only favorable days and limit results
  return calendar
    .filter(day => day.isFishingFavorable)
    .slice(0, limit);
}

/**
 * Get the appropriate moon phase image file based on moon age in days
 * @param phase The moon phase
 * @param illumination The illumination value (0-1) - used for backward compatibility
 * @param date Optional date to calculate moon age (defaults to current date)
 * @returns The image file name
 */
export function getMoonPhaseImageFile(phase: MoonPhase, illumination: number, date: Date = new Date()): string {
  // Get the moon age directly - this is more accurate than using illumination
  const age = calculateMoonAge(date);

  // Select the appropriate image based on moon age in days
  if (age < 1) return 'new-moon-day-0';
  if (age < 2) return 'new-moon-day-1';
  if (age < 3) return 'waxing-crescent-day-2';
  if (age < 5) return 'waxing-crescent-day-4';
  if (age < 6) return 'waxing-crescent-day-5';
  if (age < 7) return 'waxing-crescent-day-6';
  if (age < 8) return 'first-quarter-day-7';
  if (age < 9) return 'first-quarter-day-8';
  if (age < 11) return 'waxing-gibbous-day-10';
  if (age < 12) return 'waxing-gibbous-day-11';
  if (age < 13) return 'waxing-gibbous-day-12';
  if (age < 14) return 'waxing-gibbous-day-13';
  if (age < 14.5) return 'waxing-gibbous-day-14';
  if (age < 15) return 'waxing-gibbous-day-14.5';
  if (age < 15.5) return 'full-moon-day-15';
  if (age < 16) return 'full-moon-day-15.5';
  if (age < 17) return 'waning-gibbous-day-16';
  if (age < 18) return 'waning-gibbous-day-17';
  if (age < 19) return 'waning-gibbous-day-18';
  if (age < 20) return 'waning-gibbous-day-19';
  if (age < 21) return 'waning-gibbous-day-20';
  if (age < 22) return 'waning-gibbous-day-21';
  if (age < 23) return 'last-quarter-day-22';
  if (age < 24) return 'last-quarter-day-23';
  if (age < 25) return 'waning-crescent-day-24';
  if (age < 26) return 'waning-crescent-day-25';
  if (age < 27) return 'waning-crescent-day-26';
  if (age < 28) return 'waning-crescent-day-27';
  if (age < 29) return 'waning-crescent-day-28';
  return 'new-moon-day-0';
}

/**
 * Translate moon phase to Swahili
 * For integration with the app's localization system
 */
export function translateMoonPhaseToSwahili(phase: MoonPhase): string {
  switch (phase) {
    case MoonPhase.NEW_MOON:
      return "Mwezi Mchanga";
    case MoonPhase.WAXING_CRESCENT:
      return "Mwezi Unaongezeka (Hilali)";
    case MoonPhase.FIRST_QUARTER:
      return "Mwezi wa Kwanza";
    case MoonPhase.WAXING_GIBBOUS:
      return "Mwezi Unaongezeka";
    case MoonPhase.FULL_MOON:
      return "Mwezi Mpevu";
    case MoonPhase.WANING_GIBBOUS:
      return "Mwezi Unapungua";
    case MoonPhase.LAST_QUARTER:
      return "Mwezi wa Mwisho";
    case MoonPhase.WANING_CRESCENT:
      return "Mwezi Unapungua (Hilali)";
    default:
      return "Mwezi";
  }
}
