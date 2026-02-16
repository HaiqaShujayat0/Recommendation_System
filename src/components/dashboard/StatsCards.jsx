import React from 'react';
import { Users, ClipboardList, TrendingUp } from 'lucide-react';
import { DASHBOARD_STATS } from '../../data/dummyData';

const cardConfig = [
  {
    gradient: 'from-primary-600 to-secondary-600',
    bgGlow: 'bg-primary-500/10',
    icon: Users,
    iconBg: 'bg-white/20',
  },
  {
    gradient: 'from-amber-500 to-orange-500',
    bgGlow: 'bg-amber-500/10',
    icon: ClipboardList,
    iconBg: 'bg-white/20',
  },
  {
    gradient: 'from-green-500 to-emerald-600',
    bgGlow: 'bg-green-500/10',
    icon: TrendingUp,
    iconBg: 'bg-white/20',
  },
];

/**
 * Premium KPI cards with gradient backgrounds, icons, and hover glow.
 */
export default function StatsCards({ className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 stagger-children ${className}`}>
      {DASHBOARD_STATS.map((stat, i) => {
        const config = cardConfig[i] || cardConfig[0];
        const Icon = config.icon;
        return (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl p-4 bg-gradient-to-br ${config.gradient} text-white shadow-md hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 cursor-default group`}
          >
            {/* Decorative glow circle */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500" />

            <div className="relative flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0 backdrop-blur-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold font-display leading-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
