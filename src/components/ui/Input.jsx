import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Professional Input Component
 * Fully integrated with react-hook-form for form validation
 * Includes real-time feedback, error messaging, and clinical-grade styling
 * 
 * @param {string} label - Field label
 * @param {string} type - Input type (text, number, date, etc.)
 * @param {string} value - Current value (for controlled mode)
 * @param {function} onChange - Change handler (for controlled mode)
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Is field required (marks with *)
 * @param {string} error - Error message to display
 * @param {object} register - react-hook-form register function
 * @param {string} name - Field name for react-hook-form
 * @param {string} hint - Helpful hint text below input
 */
export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  error,
  register,
  name,
  hint,
  ...rest
}) {
  // If using react-hook-form, use register; otherwise use controlled input
  const inputProps = register
    ? register(name, { required: required && `${label} is required` })
    : {
        value,
        onChange: (e) => onChange(e.target.value),
      };

  const hasError = !!error;
  const hasValue = value || rest.defaultValue;

  return (
    <div>
      {/* Label with required indicator */}
      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label}
        {required && <span className="text-critical-500 ml-1">*</span>}
      </label>

      {/* Input field with dynamic styling */}
      <div className="relative">
        <input
          type={type}
          {...inputProps}
          className={`w-full px-3.5 py-2.5 border-2 rounded-lg focus:outline-none text-sm transition-all ${
            hasError
              ? 'border-critical-300 bg-critical-50 focus:border-critical-500 focus:bg-white'
              : 'border-neutral-300 bg-white focus:border-primary-500'
          }`}
          placeholder={placeholder}
          {...rest}
        />
        
        {/* Status Icons */}
        {hasError && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-critical-500 flex-shrink-0" />
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p className="text-xs text-critical-600 mt-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}

      {/* Hint text */}
      {hint && !hasError && (
        <p className="text-xs text-neutral-500 mt-1.5">{hint}</p>
      )}
    </div>
  );
}
