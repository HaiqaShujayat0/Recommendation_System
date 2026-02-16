import React from 'react';
import {
  User,
  Activity,
  FlaskConical,
  Droplets,
  Pill,
  Brain,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { NAV_ITEMS } from '../../data/dummyData';

const iconMap = {
  User,
  Activity,
  FlaskConical,
  Droplets,
  Pill,
  Brain,
  FileText,
};

/**
 * Sidebar shown when a patient is selected.
 * Renders nav items and optional key metrics block.
 */
export default function Sidebar({
  currentScreen,
  onNavigate,
  onBackToSearch,
  patientData,
  open,
}) {
  if (!open) return null;

  return (
    <aside className="w-56 bg-white shadow-md transition-all duration-300 overflow-hidden flex-shrink-0 border-r border-neutral-200">
      <div className="p-4 w-56">
        {/* Back to Search Button */}
        <button
          type="button"
          onClick={onBackToSearch}
          className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 text-sm mb-5 w-full transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1" aria-label="Patient workflow sections">
          {NAV_ITEMS.map(({ id, iconId, label }) => {
            const Icon = iconMap[iconId];
            const isActive = currentScreen === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-sm border border-primary-500'
                    : 'text-neutral-600 hover:bg-neutral-50 border border-transparent'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Key Clinical Metrics Panel */}
        {patientData && (
          <div className="mt-6 p-3.5 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg border border-neutral-200">
            <h4 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Clinical Metrics
            </h4>
            <div className="space-y-2.5 text-sm">
              {/* HbA1c Metric */}
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">HbA1c</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-xs ${
                    parseFloat(patientData.labs?.hba1c) > 7
                      ? 'bg-critical-100 text-critical-700'
                      : parseFloat(patientData.labs?.hba1c) > 5.7
                        ? 'bg-warning-100 text-warning-700'
                        : 'bg-success-100 text-success-700'
                  }`}
                >
                  {patientData.labs?.hba1c || '--'}%
                </span>
              </div>

              {/* eGFR Metric */}
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">eGFR</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-xs ${
                    parseFloat(patientData.labs?.egfr) >= 90
                      ? 'bg-success-100 text-success-700'
                      : parseFloat(patientData.labs?.egfr) >= 60
                        ? 'bg-warning-100 text-warning-700'
                        : 'bg-critical-100 text-critical-700'
                  }`}
                >
                  {patientData.labs?.egfr || '--'}
                </span>
              </div>

              {/* BMI Metric */}
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">BMI</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-xs ${
                    patientData.demographics?.bmi > 30
                      ? 'bg-critical-100 text-critical-700'
                      : patientData.demographics?.bmi > 25
                        ? 'bg-warning-100 text-warning-700'
                        : patientData.demographics?.bmi > 18.5
                          ? 'bg-success-100 text-success-700'
                          : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {patientData.demographics?.bmi ?? '--'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
