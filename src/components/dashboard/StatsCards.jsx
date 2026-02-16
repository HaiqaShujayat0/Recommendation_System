import React from 'react';
import { DASHBOARD_STATS } from '../../data/dummyData';

const colorMap = {
  primary: {
    bg: 'bg-gradient-to-br from-primary-50 to-blue-50',
    border: 'border-2 border-primary-200',
    text: 'text-primary-700',
    label: 'text-primary-600',
    icon: 'bg-primary-100',
  },
  amber: {
    bg: 'bg-gradient-to-br from-warning-50 to-orange-50',
    border: 'border-2 border-warning-200',
    text: 'text-warning-700',
    label: 'text-warning-600',
    icon: 'bg-warning-100',
  },
  green: {
    bg: 'bg-gradient-to-br from-success-50 to-emerald-50',
    border: 'border-2 border-success-200',
    text: 'text-success-700',
    label: 'text-success-600',
    icon: 'bg-success-100',
  },
};

/**
 * Premium Dashboard KPI Cards Component
 * Displays key metrics with gradient backgrounds and premium shadows
 */
export default function StatsCards({ className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-5 ${className}`}>
      {DASHBOARD_STATS.map((stat, i) => {
        const colorScheme = colorMap[stat.color] || colorMap.primary;
        return (
          <div
            key={i}
            className={`${colorScheme.bg} ${colorScheme.border} rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm`}
          >
            <div className={`text-4xl font-bold font-display ${colorScheme.text} mb-2`}>
              {stat.value}
            </div>
            <div className={`text-xs font-bold uppercase tracking-widest ${colorScheme.label}`}>
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
