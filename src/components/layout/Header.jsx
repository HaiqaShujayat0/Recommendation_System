import React from 'react';
import { Brain, User, Menu } from 'lucide-react';

/**
 * GLYERAL Header Component
 * Professional healthcare UI with deep teal gradient background
 * Displays app branding and optional patient information
 */
export default function Header({ selectedPatient, onMenuClick }) {
  return (
    <header className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 text-white px-4 py-3.5 shadow-md z-10 border-b border-primary-600">
      <div className="flex items-center justify-between max-w-full">
        {/* Logo & Branding Section */}
        <div className="flex items-center gap-3">
          {selectedPatient && (
            <button
              type="button"
              onClick={onMenuClick}
              className="p-2 hover:bg-white/15 rounded-lg lg:hidden transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/25 rounded-lg flex items-center justify-center border border-white/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight font-display">GLYERAL</h1>
              <p className="text-[10px] text-primary-100 -mt-1">Clinical AI Support</p>
            </div>
          </div>
        </div>

        {/* Patient Info Section */}
        {selectedPatient && (
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block border-l border-white/20 pl-3">
              <p className="text-sm font-semibold">{selectedPatient.name}</p>
              <p className="text-xs text-primary-100">MR# {selectedPatient.mrNumber}</p>
            </div>
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center border border-white/20">
              <User className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
