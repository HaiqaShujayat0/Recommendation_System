import React from 'react';
import { DASHBOARD_STATS } from '../../data/dummyData';

const colorMap = {
  primary: {
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    text: 'text-primary-700',
    label: 'text-primary-600',
  },
  amber: {
    bg: 'bg-warning-50',
    border: 'border-warning-200',
    text: 'text-warning-700',
    label: 'text-warning-600',
  },
  green: {
    bg: 'bg-success-50',
    border: 'border-success-200',
    text: 'text-success-700',
    label: 'text-success-600',
  },
};

/**
 * Dashboard KPI Cards Component
 * Displays key metrics: patients today, pending reviews, acceptance rate
 * Professional healthcare styling with color-coded indicators
 */
export default function StatsCards({ className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      {DASHBOARD_STATS.map((stat, i) => {
        const colorScheme = colorMap[stat.color] || colorMap.primary;
        return (
          <div
            key={i}
            className={`${colorScheme.bg} border ${colorScheme.border} rounded-xl p-5 shadow-sm transition-all hover:shadow-md`}
          >
            <div className={`text-3xl font-bold font-display ${colorScheme.text} mb-1`}>
              {stat.value}
            </div>
            <div className={`text-xs font-medium uppercase tracking-wide ${colorScheme.label}`}>
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
