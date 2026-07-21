// Shared type definitions for Child Plus tracking system

export type SeverityLevel = 'NORMAL' | 'MAM' | 'SAM'; // Moderate / Severe Acute Malnutrition

export interface Child {
  id: string;
  name: string;
  date_of_birth: string;
  gender: 'MALE' | 'FEMALE';
  anganwadi_center_id: string;
  village_name: string;
  parent_name: string;
  parent_phone: string;
  created_at: string;
  updated_at: string;
}

export interface GrowthRecord {
  id: string;
  child_id: string;
  measured_at: string;
  height_cm: number;
  weight_kg: number;
  muac_mm?: number; // Mid-Upper Arm Circumference
  
  // Calculated WHO Z-Scores and Classifications
  weight_for_age_z?: number;
  height_for_age_z?: number; // Indicates stunting if low
  weight_for_height_z?: number; // Indicates wasting if low
  
  wasting_status: SeverityLevel;
  stunting_status: SeverityLevel;
  underweight_status: SeverityLevel;
  
  measured_by_aww_id: string;
  notes?: string;
  photo_validation_status?: 'PENDING' | 'VALID' | 'INVALID';
  photo_url?: string;
}

export interface Milestone {
  id: string;
  child_id: string;
  milestone_code: string; // e.g., "COGNITIVE_3Y_1", "LITERACY_5Y_3"
  milestone_name: string;
  category: 'COGNITIVE' | 'LITERACY' | 'NUMERACY' | 'MOTOR' | 'SOCIAL';
  target_age_months: number;
  completed: boolean;
  completed_at?: string;
  logged_by_aww_id: string;
  notes?: string;
}

export interface AnganwadiCenter {
  id: string;
  name: string;
  village: string;
  taluk: string; // e.g., "Anekal"
  district: string; // e.g., "Bengaluru Urban"
  supervisor_id: string;
  latitude?: number;
  longitude?: number;
}
