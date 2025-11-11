import type { RiskCategory } from '@/types/credit';

export interface RiskThreshold {
  min: number;
  max: number;
  color: string;
  badgeColor: string;
}

export const RISK_THRESHOLDS: Record<RiskCategory, RiskThreshold> = {
  Excellent: {
    min: 750,
    max: 850,
    color: 'text-green-500',
    badgeColor: 'bg-green-500',
  },
  Good: {
    min: 700,
    max: 749,
    color: 'text-blue-500',
    badgeColor: 'bg-blue-500',
  },
  Fair: {
    min: 650,
    max: 699,
    color: 'text-yellow-500',
    badgeColor: 'bg-yellow-500',
  },
  Poor: {
    min: 600,
    max: 649,
    color: 'text-orange-500',
    badgeColor: 'bg-orange-500',
  },
  'Very Poor': {
    min: 300,
    max: 599,
    color: 'text-red-500',
    badgeColor: 'bg-red-500',
  },
};

export const getRiskCategory = (score: number): RiskCategory => {
  if (score >= 750) return 'Excellent';
  if (score >= 700) return 'Good';
  if (score >= 650) return 'Fair';
  if (score >= 600) return 'Poor';
  return 'Very Poor';
};

export const getRiskThreshold = (score: number): RiskThreshold => {
  const category = getRiskCategory(score);
  return RISK_THRESHOLDS[category];
};