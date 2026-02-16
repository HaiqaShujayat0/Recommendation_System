import React from 'react';
import { User, ChevronRight } from 'lucide-react';

/**
 * PatientCard Component
 * Displays individual patient information in dashboard list
 * Shows: patient name, MR number, age, gender, and HbA1c status indicator
 */
export default function PatientCard({ patient, onSelect }) {
  const hba1cNum = parseFloat(patient.hba1c);
  
  // Determine HbA1c status color
  let hba1cClass, statusBg;
  if (hba1cNum > 8) {
    hba1cClass = 'text-critical-700 font-bold';
    statusBg = 'bg-critical-100';
  } else if (hba1cNum > 7) {
    hba1cClass = 'text-warning-700 font-bold';
    statusBg = 'bg-warning-100';
  } else if (hba1cNum >= 5.7) {
    hba1cClass = 'text-neutral-600 font-semibold';
    statusBg = 'bg-neutral-100';
  } else {
    hba1cClass = 'text-success-700 font-bold';
    statusBg = 'bg-success-100';
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(patient)}
      className="w-full px-4 py-4 hover:bg-neutral-50 cursor-pointer flex items-center gap-3.5 transition-colors text-left rounded-lg focus:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
    >
      {/* Avatar */}
      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 border border-primary-200">
        <User className="w-5 h-5 text-primary-700" />
      </div>

      {/* Patient Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-neutral-900 truncate">{patient.name}</p>
        <p className="text-xs text-neutral-500 mt-0.5">
          {patient.mrNumber} • {patient.age}y • {patient.gender}
        </p>
      </div>

      {/* HbA1c Status */}
      <div className={`${statusBg} px-3 py-1.5 rounded-lg text-center flex-shrink-0`}>
        <p className="text-[10px] text-neutral-600 font-medium">HbA1c</p>
        <p className={`text-sm ${hba1cClass}`}>{patient.hba1c}%</p>
      </div>

      {/* Chevron */}
      <ChevronRight className="w-4 h-4 text-neutral-300 flex-shrink-0" />
    </button>
  );
}
