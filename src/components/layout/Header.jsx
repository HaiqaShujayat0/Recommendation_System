import React from 'react';
import { Brain, User, Menu, Sparkles } from 'lucide-react';

/**
 * Premium app header with glassmorphism and gradient treatments.
 */
export default function Header({ selectedPatient, onMenuClick }) {
  return (
    <header className="relative bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white/95 shadow-lg z-10 overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] animate-shimmer opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {selectedPatient && (
            <button
              type="button"
              onClick={onMenuClick}
              className="p-2 hover:bg-white/10 rounded-xl lg:hidden border border-white/10 backdrop-blur-sm transition-all duration-200"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/15 shadow-inner-glow">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight font-display flex items-center gap-1.5">
                GLYERAL
                <Sparkles className="w-3.5 h-3.5 text-primary-300 opacity-70" />
              </h1>
              <p className="text-[11px] text-primary-200/80 -mt-0.5 font-medium">
                Healthcare Decision Support • Diabetes Care
              </p>
            </div>
          </div>
        </div>
        {selectedPatient && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{selectedPatient.name}</p>
              <p className="text-xs text-primary-200/80">
                MR# {selectedPatient.mrNumber}
              </p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-white/15 to-white/5 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm">
              <User className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
