import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Premium button component with consistent styling across the app.
 *
 * @param {'primary'|'secondary'|'accent'|'outline'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading
 * @param {boolean} pill – rounded-full shape
 * @param {React.ReactNode} icon – optional leading icon
 * @param {React.ReactNode} children
 */
export default function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    pill = true,
    icon,
    children,
    className = '',
    disabled,
    ...rest
}) {
    const baseClasses =
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none select-none';

    const variants = {
        primary:
            'bg-gradient-to-r from-primary-700 to-primary-900 text-white shadow-md hover:shadow-glow-primary hover:from-primary-600 hover:to-primary-800 focus-visible:ring-primary-500 active:scale-[0.98]',
        secondary:
            'bg-gradient-to-r from-secondary-600 to-secondary-800 text-white shadow-md hover:shadow-glow-primary hover:from-secondary-500 hover:to-secondary-700 focus-visible:ring-secondary-500 active:scale-[0.98]',
        accent:
            'bg-gradient-to-r from-accent-500 to-accent-700 text-white shadow-md hover:shadow-glow-accent hover:from-accent-400 hover:to-accent-600 focus-visible:ring-accent-500 active:scale-[0.98]',
        outline:
            'border-2 border-slate-200 text-slate-700 bg-white/60 backdrop-blur hover:border-primary-300 hover:bg-primary-50/50 focus-visible:ring-primary-500 active:scale-[0.98]',
        ghost:
            'text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 focus-visible:ring-slate-500',
        danger:
            'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-md hover:from-red-400 hover:to-red-600 focus-visible:ring-red-500 active:scale-[0.98]',
    };

    const sizes = {
        sm: 'text-xs px-3 py-1.5',
        md: 'text-sm px-5 py-2.5',
        lg: 'text-base px-6 py-3',
    };

    const shape = pill ? 'rounded-full' : 'rounded-xl';

    return (
        <button
            className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${shape} ${className}`}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                icon && <span className="flex-shrink-0">{icon}</span>
            )}
            {children}
        </button>
    );
}
