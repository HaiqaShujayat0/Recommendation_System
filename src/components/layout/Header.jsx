import React from 'react';
import { Brain, User, Menu } from 'lucide-react';

/**
 * GLYERAL Header Component
 * Professional healthcare UI with deep teal gradient background
 * Displays app branding and optional patient information
 */
export default function Header({ selectedPatient, onMenuClick }) {
  return (
    <header className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white px-6 py-4 shadow-xl z-10 border-b-2 border-primary-600 backdrop-blur-md bg-opacity-95">
      <div className="flex items-center justify-between max-w-full">
        {/* Logo & Branding Section */}
        <div className="flex items-center gap-3.5">
          {selectedPatient && (
            <button
              type="button"
              onClick={onMenuClick}
              className="p-2.5 hover:bg-white/20 rounded-lg lg:hidden transition-all duration-200"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight font-display">GLYERAL</h1>
              <p className="text-[10px] text-primary-100 -mt-1 font-medium">Clinical AI Support</p>
            </div>
          </div>
        </div>

        {/* Patient Info Section */}
        {selectedPatient && (
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block border-l-2 border-white/30 pl-4">
              <p className="text-sm font-bold">{selectedPatient.name}</p>
              <p className="text-xs text-primary-100 font-medium">MR# {selectedPatient.mrNumber}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center border border-white/30 shadow-lg">
              <User className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
