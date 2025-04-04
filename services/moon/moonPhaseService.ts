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
 */
function getFishingRecommendation(phase: MoonPhase, age: number): { isFavorable: boolean; recommendation: string } {
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
 */
export function getMoonPhaseData(date: Date = new Date()): MoonPhaseData {
  const age = calculateMoonAge(date);
  const phase = getMoonPhase(age);
  const illumination = calculateIllumination(age);
  const fishingRecommendation = getFishingRecommendation(phase, age);

  // Approximate distance calculation - simplified for this implementation
  // In a real app, would use more precise astronomical calculations
  const distance = 384400; // Average distance in km

  // Get the appropriate image file for this moon phase and illumination
  const imageFile = getMoonPhaseImageFile(phase, illumination);

  return {
    date,
    phase,
    illumination,
    age,
    distance,
    isFishingFavorable: fishingRecommendation.isFavorable,
    fishingRecommendation: fishingRecommendation.recommendation,
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
 * Get the appropriate moon phase image file based on phase and illumination percentage
 * @param phase The moon phase
 * @param illumination The illumination value (0-1)
 * @returns The image file name
 */
export function getMoonPhaseImageFile(phase: MoonPhase, illumination: number): string {
  // Convert illumination from 0-1 to 0-100 percentage
  const percentage = Math.round(illumination * 100);

  // Select the appropriate image based on phase and percentage
  switch (phase) {
    case MoonPhase.NEW_MOON:
      return percentage <= 0 ? 'new-moon-0%' : 'new-moon-1%';

    case MoonPhase.WAXING_CRESCENT:
      if (percentage <= 6) return 'waxing-crescent-6%';
      if (percentage <= 13) return 'waxing-crescent-13%';
      if (percentage <= 22) return 'waxing-crescent-22%';
      return 'waxing-crescent-33%';

    case MoonPhase.FIRST_QUARTER:
      return percentage <= 40 ? 'first-quarter-40%' : 'first-quarter-54%';

    case MoonPhase.WAXING_GIBBOUS:
      if (percentage <= 65) return 'waxing-gibbous-65%';
      if (percentage <= 74) return 'waxing-gibbous-74%';
      if (percentage <= 82) return 'waxing-gibbous-82%';
      if (percentage <= 89) return 'waxing-gibbous-89%';
      if (percentage <= 94) return 'waxing-gibbous-94%';
      return 'waxing-gibbous-98%';

    case MoonPhase.FULL_MOON:
      return percentage >= 100 ? 'full-moon-100%' : 'full-moon-99%';

    case MoonPhase.WANING_GIBBOUS:
      if (percentage <= 66) return 'waning-gibbous-66%';
      if (percentage <= 75) return 'waning-gibbous-75%';
      if (percentage <= 83) return 'waning-gibbous-83%';
      if (percentage <= 89) return 'waning-gibbous-89%';
      if (percentage <= 94) return 'waning-gibbous-94%';
      return 'waning-gibbous-98%';

    case MoonPhase.LAST_QUARTER:
      return percentage <= 46 ? 'third-quarter-46%' : 'third-quarter-56%';

    case MoonPhase.WANING_CRESCENT:
      if (percentage <= 3) return 'waning-crescent-3%';
      if (percentage <= 8) return 'waning-crescent-8%';
      if (percentage <= 16) return 'waning-crescent-16%';
      if (percentage <= 25) return 'waning-crescent-25%';
      return 'waning-crescent-35%';

    default:
      return 'new-moon-0%';
  }
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
