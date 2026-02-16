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
    <aside className="w-56 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0 border-r-2 border-primary-100">
      <div className="p-5 w-56">
        {/* Back to Search Button */}
        <button
          type="button"
          onClick={onBackToSearch}
          className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 text-sm mb-6 w-full transition-all duration-200 hover:gap-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </button>

        {/* Navigation Items */}
        <nav className="space-y-2" aria-label="Patient workflow sections">
          {NAV_ITEMS.map(({ id, iconId, label }) => {
            const Icon = iconMap[iconId];
            const isActive = currentScreen === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg border border-primary-400'
                    : 'text-neutral-700 hover:bg-primary-50 border-2 border-transparent hover:border-primary-100'
                }`}
              >
                {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Key Clinical Metrics Panel */}
        {patientData && (
          <div className="mt-7 p-4 bg-gradient-to-br from-primary-50 via-white to-neutral-50 rounded-xl border-2 border-primary-100 shadow-sm">
            <h4 className="text-[11px] font-bold text-primary-700 uppercase tracking-widest mb-4">
              Vital Metrics
            </h4>
            <div className="space-y-3 text-sm">
              {/* HbA1c Metric */}
              <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-lg">
                <span className="text-neutral-700 font-medium">HbA1c</span>
                <span
                  className={`font-bold px-2.5 py-1 rounded-lg text-xs ${
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
              <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-lg">
                <span className="text-neutral-700 font-medium">eGFR</span>
                <span
                  className={`font-bold px-2.5 py-1 rounded-lg text-xs ${
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
              <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-lg">
                <span className="text-neutral-700 font-medium">BMI</span>
                <span
                  className={`font-bold px-2.5 py-1 rounded-lg text-xs ${
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
