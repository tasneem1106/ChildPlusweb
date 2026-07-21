import { SeverityLevel } from 'shared';

interface GrowthReference {
  medianHeight: number;
  sdHeight: number;
  medianWeight: number;
  sdWeight: number;
}

// WHO Child Growth Standards simplified references (Median and Standard Deviations)
// Indexed by age in months: 0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60
const BOYS_REFERENCE: Record<number, GrowthReference> = {
  0:  { medianHeight: 49.9,  sdHeight: 1.9, medianWeight: 3.3,  sdWeight: 0.4 },
  6:  { medianHeight: 67.6,  sdHeight: 2.1, medianWeight: 7.9,  sdWeight: 0.8 },
  12: { medianHeight: 75.7,  sdHeight: 2.4, medianWeight: 9.6,  sdWeight: 0.9 },
  18: { medianHeight: 82.3,  sdHeight: 2.7, medianWeight: 10.9, sdWeight: 1.0 },
  24: { medianHeight: 87.8,  sdHeight: 3.0, medianWeight: 12.2, sdWeight: 1.1 },
  30: { medianHeight: 92.1,  sdHeight: 3.3, medianWeight: 13.3, sdWeight: 1.2 },
  36: { medianHeight: 96.1,  sdHeight: 3.6, medianWeight: 14.3, sdWeight: 1.3 },
  42: { medianHeight: 99.9,  sdHeight: 3.8, medianWeight: 15.3, sdWeight: 1.5 },
  48: { medianHeight: 103.3, sdHeight: 4.1, medianWeight: 16.3, sdWeight: 1.7 },
  54: { medianHeight: 106.7, sdHeight: 4.3, medianWeight: 17.3, sdWeight: 1.9 },
  60: { medianHeight: 110.0, sdHeight: 4.5, medianWeight: 18.3, sdWeight: 2.1 }
};

const GIRLS_REFERENCE: Record<number, GrowthReference> = {
  0:  { medianHeight: 49.1,  sdHeight: 1.9, medianWeight: 3.2,  sdWeight: 0.4 },
  6:  { medianHeight: 65.7,  sdHeight: 2.1, medianWeight: 7.3,  sdWeight: 0.8 },
  12: { medianHeight: 74.0,  sdHeight: 2.4, medianWeight: 8.9,  sdWeight: 0.9 },
  18: { medianHeight: 80.7,  sdHeight: 2.7, medianWeight: 10.2, sdWeight: 1.0 },
  24: { medianHeight: 86.4,  sdHeight: 3.0, medianWeight: 11.5, sdWeight: 1.1 },
  30: { medianHeight: 90.7,  sdHeight: 3.2, medianWeight: 12.6, sdWeight: 1.2 },
  36: { medianHeight: 95.1,  sdHeight: 3.5, medianWeight: 13.9, sdWeight: 1.3 },
  42: { medianHeight: 99.0,  sdHeight: 3.8, medianWeight: 15.0, sdWeight: 1.5 },
  48: { medianHeight: 102.7, sdHeight: 4.0, medianWeight: 16.1, sdWeight: 1.7 },
  54: { medianHeight: 106.2, sdHeight: 4.3, medianWeight: 17.2, sdWeight: 1.9 },
  60: { medianHeight: 109.4, sdHeight: 4.5, medianWeight: 18.2, sdWeight: 2.1 }
};

/**
 * Linearly interpolates between two reference points to get values for specific age months.
 */
function getReferenceForAge(gender: 'MALE' | 'FEMALE', ageMonths: number): GrowthReference {
  const ref = gender === 'MALE' ? BOYS_REFERENCE : GIRLS_REFERENCE;
  const ages = Object.keys(ref).map(Number).sort((a, b) => a - b);
  
  if (ageMonths <= ages[0]) return ref[ages[0]];
  if (ageMonths >= ages[ages.length - 1]) return ref[ages[ages.length - 1]];
  
  // Find lower and upper bounds
  let lowerAge = ages[0];
  let upperAge = ages[ages.length - 1];
  for (let i = 0; i < ages.length - 1; i++) {
    if (ageMonths >= ages[i] && ageMonths <= ages[i + 1]) {
      lowerAge = ages[i];
      upperAge = ages[i + 1];
      break;
    }
  }
  
  const lowerRef = ref[lowerAge];
  const upperRef = ref[upperAge];
  const fraction = (ageMonths - lowerAge) / (upperAge - lowerAge);
  
  return {
    medianHeight: lowerRef.medianHeight + fraction * (upperRef.medianHeight - lowerRef.medianHeight),
    sdHeight: lowerRef.sdHeight + fraction * (upperRef.sdHeight - lowerRef.sdHeight),
    medianWeight: lowerRef.medianWeight + fraction * (upperRef.medianWeight - lowerRef.medianWeight),
    sdWeight: lowerRef.sdWeight + fraction * (upperRef.sdWeight - lowerRef.sdWeight),
  };
}

export interface GrowthAnalysisResult {
  weightForAgeZ: number;
  heightForAgeZ: number;
  weightForHeightZ: number;
  underweightStatus: SeverityLevel;
  stuntingStatus: SeverityLevel;
  wastingStatus: SeverityLevel;
}

/**
 * Calculates WHO Growth Z-Scores and determines severity levels for a child.
 */
export function analyzeGrowth(
  gender: 'MALE' | 'FEMALE',
  ageMonths: number,
  heightCm: number,
  weightKg: number
): GrowthAnalysisResult {
  const ref = getReferenceForAge(gender, ageMonths);
  
  // 1. Weight-for-Age Z-score (Underweight indicator)
  const weightForAgeZ = (weightKg - ref.medianWeight) / ref.sdWeight;
  
  // 2. Height-for-Age Z-score (Stunting indicator)
  const heightForAgeZ = (heightCm - ref.medianHeight) / ref.sdHeight;
  
  // 3. Weight-for-Height Z-score (Wasting indicator)
  // Simplified calculation based on height-to-weight relationship standard deviation
  // For a child at heightCm, the expected weight is computed using the height ratio
  const heightRatio = heightCm / ref.medianHeight;
  const expectedWeightForHeight = ref.medianWeight * heightRatio;
  const weightForHeightZ = (weightKg - expectedWeightForHeight) / ref.sdWeight;

  const determineStatus = (zScore: number): SeverityLevel => {
    if (zScore <= -3) return 'SAM';
    if (zScore <= -2) return 'MAM';
    return 'NORMAL';
  };

  return {
    weightForAgeZ: parseFloat(weightForAgeZ.toFixed(2)),
    heightForAgeZ: parseFloat(heightForAgeZ.toFixed(2)),
    weightForHeightZ: parseFloat(weightForHeightZ.toFixed(2)),
    underweightStatus: determineStatus(weightForAgeZ),
    stuntingStatus: determineStatus(heightForAgeZ),
    wastingStatus: determineStatus(weightForHeightZ)
  };
}
