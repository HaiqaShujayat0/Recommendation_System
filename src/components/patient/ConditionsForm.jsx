import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';

/**
 * Conditions Form Component with Validation
 * 
 * VALIDATION RULES:
 * - DM (Diabetes Mellitus) must always be checked (required)
 * - Other conditions are optional
 * - At least DM must be selected (enforced by default value)
 */

const CONDITIONS = [
  {
    key: 'dm',
    label: 'Diabetes Mellitus',
    desc: 'Primary condition - always checked',
    required: true,
  },
  {
    key: 'ckd',
    label: 'Chronic Kidney Disease',
    desc: 'Affects Metformin dosing',
  },
  {
    key: 'cad',
    label: 'Coronary Artery Disease',
    desc: 'Favors SGLT2i/GLP-1 RA',
  },
  {
    key: 'hypertension',
    label: 'Hypertension',
    desc: 'CV risk factor',
  },
  {
    key: 'pregnancy',
    label: 'Pregnancy',
    desc: 'BLOCKS oral medications',
    warning: true,
  },
  {
    key: 'neuropathy',
    label: 'Neuropathy',
    desc: 'DM complication',
  },
  {
    key: 'retinopathy',
    label: 'Retinopathy',
    desc: 'DM complication',
  },
  {
    key: 'obesity',
    label: 'Obesity',
    desc: 'BMI > 30 or clinical diagnosis',
  },
];

export default function ConditionsForm({ data, setData, onNext }) {
  const { watch, setValue, handleSubmit, formState: { isValid } } = useForm({
    defaultValues: data.healthIssues,
    mode: 'onChange',
  });

  // Sync form data with parent state
  const watchedData = watch();
  useEffect(() => {
    setData({ ...data, healthIssues: watchedData });
  }, [watchedData]);

  // Ensure DM is always checked
  useEffect(() => {
    if (!watchedData.dm) {
      setValue('dm', true);
    }
  }, [watchedData.dm, setValue]);

  const toggle = (key) => {
    if (key === 'dm') return; // DM cannot be unchecked
    setValue(key, !watchedData[key]);
  };

  const onSubmit = (formData) => {
    setData({ ...data, healthIssues: formData });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 font-display mb-1">Health Issues & Conditions</h2>
        <p className="text-neutral-600 text-sm">Select all medical conditions that apply to this patient</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="space-y-2">
            {CONDITIONS.map(({ key, label, desc, required, warning }) => {
              const isChecked = watch(key);
              return (
                <div
                  key={key}
                  onClick={() => toggle(key)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3.5 ${
                    isChecked
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50'
                  } ${required ? 'cursor-not-allowed opacity-75' : ''}`}
                  role="button"
                  tabIndex={required ? -1 : 0}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !required) {
                      e.preventDefault();
                      toggle(key);
                    }
                  }}
                >
                  {/* Custom Checkbox */}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isChecked ? 'border-primary-600 bg-primary-600' : 'border-neutral-400 bg-white'
                    }`}
                  >
                    {isChecked && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>

                  {/* Condition Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 text-sm">{label}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {required && (
                      <span className="px-2.5 py-0.5 bg-critical-100 text-critical-700 text-[10px] rounded-full font-semibold">
                        Required
                      </span>
                    )}
                    {warning && isChecked && (
                      <span className="px-2.5 py-0.5 bg-critical-100 text-critical-700 text-[10px] rounded-full flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3 h-3" />
                        Blocks Oral
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-semibold transition-colors shadow-sm"
            >
              Next: Lab Values <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
