import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Activity, ChevronRight } from 'lucide-react';

/**
 * Labs Form Component with Validation
 * 
 * VALIDATION RULES:
 * - HbA1c: Required, 0-20% (critical/primary)
 * - eGFR: Required, 0-200 mL/min (critical/primary)
 * - Creatinine: Optional, 0-10 mg/dL
 * - LDL: Optional, 0-500 mg/dL
 * - Urine Albumin: Optional, 0-1000 mg/L
 */

const LABS = [
  { key: 'hba1c', label: 'HbA1c', unit: '%', normal: '< 5.7', critical: true },
  { key: 'egfr', label: 'eGFR', unit: 'mL/min', normal: '> 90', critical: true },
  { key: 'creatinine', label: 'Creatinine', unit: 'mg/dL', normal: '0.7-1.3', critical: false },
  { key: 'lipidPanel', label: 'LDL', unit: 'mg/dL', normal: '< 100', critical: false },
  { key: 'urineAlbumin', label: 'Urine Albumin', unit: 'mg/L', normal: '< 30', critical: false },
];

export default function LabsForm({ data, setData, onNext }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: data.labs,
    mode: 'onChange',
  });

  // Sync form data with parent state
  const watchedData = watch();
  useEffect(() => {
    setData({ ...data, labs: watchedData });
  }, [watchedData]);

  const getStatusStyle = (key, value) => {
    if (!value) return 'border-neutral-300';
    const v = parseFloat(value);

    if (key === 'hba1c') {
      if (v < 5.7) return 'border-success-500 bg-success-50';
      if (v < 7) return 'border-warning-500 bg-warning-50';
      return 'border-critical-500 bg-critical-50';
    }

    if (key === 'egfr') {
      if (v >= 90) return 'border-success-500 bg-success-50';
      if (v >= 60) return 'border-warning-500 bg-warning-50';
      return 'border-critical-500 bg-critical-50';
    }

    return 'border-neutral-300';
  };

  const getCkdStage = (egfr) => {
    if (!egfr) return null;
    const v = parseFloat(egfr);

    if (v >= 90) return { stage: '1', label: 'Normal', color: 'bg-success-100 text-success-700' };
    if (v >= 60) return { stage: '2', label: 'Mild', color: 'bg-warning-100 text-warning-700' };
    if (v >= 30) return { stage: '3', label: 'Moderate', color: 'bg-warning-100 text-warning-700' };
    if (v >= 15) return { stage: '4', label: 'Severe', color: 'bg-critical-100 text-critical-700' };
    return { stage: '5', label: 'Failure', color: 'bg-critical-100 text-critical-700' };
  };

  const onSubmit = (formData) => {
    setData({ ...data, labs: formData });
    onNext();
  };

  const egfr = watch('egfr');
  const ckd = getCkdStage(egfr);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 font-display mb-1">Laboratory Values</h2>
        <p className="text-neutral-600 text-sm">Enter critical lab values for clinical assessment</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="grid grid-cols-2 gap-4">
            {LABS.map(({ key, label, unit, normal, critical }) => {
              const value = watch(key);
              const error = errors[key];
              const isRequired = critical;

              return (
                <div key={key}>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5">
                    {label}
                    {critical && (
                      <span className="px-1.5 py-0.5 bg-critical-100 text-critical-700 text-[10px] rounded-sm font-semibold">
                        REQUIRED
                      </span>
                    )}
                  </label>
                  <div
                    className={`flex items-center border-2 rounded-lg transition-colors ${getStatusStyle(
                      key,
                      value
                    )}`}
                  >
                    <input
                      type="number"
                      step="0.1"
                      {...register(key, {
                        required: isRequired ? `${label} is required` : false,
                        min: {
                          value: 0,
                          message: `${label} must be positive`,
                        },
                        max: {
                          value:
                            key === 'hba1c'
                              ? 20
                              : key === 'egfr'
                                ? 200
                                : key === 'creatinine'
                                  ? 10
                                  : key === 'lipidPanel'
                                    ? 500
                                    : 1000,
                          message: `Please enter a valid ${label} value`,
                        },
                        valueAsNumber: true,
                      })}
                      className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-sm"
                      placeholder="--"
                    />
                    <span className="px-3 text-slate-400 text-xs font-medium">{unit}</span>
                  </div>
                  {error && <p className="text-xs text-red-600 mt-1">{error.message}</p>}
                  <p className="text-[10px] text-slate-400 mt-1">Normal: {normal}</p>
                </div>
              );
            })}
          </div>

          {/* CKD Stage Display */}
          {ckd && (
            <div className="mt-5 p-4 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center gap-3">
              <Activity className="w-5 h-5 text-neutral-700 flex-shrink-0" />
              <div>
                <p className="text-xs text-neutral-600 mb-1.5 font-medium">Kidney Function Status</p>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${ckd.color}`}>
                  Stage {ckd.stage} - {ckd.label}
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Next: Blood Sugar <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
