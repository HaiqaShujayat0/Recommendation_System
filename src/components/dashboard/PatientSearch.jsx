import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { PATIENTS } from '../../data/dummyData';
import PatientCard from './PatientCard';
import StatsCards from './StatsCards';

/**
 * Dashboard: search input, "New Patient" button, stats, and filtered patient list.
 * Uses dummy PATIENTS; filters by name or MR number.
 */
export default function PatientSearch({ onSelectPatient, onNewPatient }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PATIENTS;
    return PATIENTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.mrNumber.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent font-display mb-3">GLYERAL Dashboard</h2>
        <p className="text-neutral-700 text-lg">Comprehensive patient management and AI-powered medication recommendations</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-7">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5"
          aria-hidden
        />
        <input
          type="search"
          placeholder="Search by patient name, MR number, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 text-sm transition-all bg-white/90 backdrop-blur-sm font-medium"
          aria-label="Search patients by name or medical record number"
        />
      </div>

      {/* New Patient Button */}
      <button
        type="button"
        onClick={onNewPatient}
        className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl hover:from-primary-700 hover:to-primary-600 transition-all duration-300 mb-8 text-sm font-bold shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        Create New Patient
      </button>

      {/* Stats Cards Section */}
      <StatsCards className="mb-10" />

      {/* Recent Patients List */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border-2 border-primary-100 overflow-hidden">
        <div className="px-6 py-4 border-b-2 border-primary-100 bg-gradient-to-r from-primary-50 to-white">
          <h3 className="font-bold text-primary-700 text-sm uppercase tracking-widest">Active Patients</h3>
        </div>
        <div className="divide-y divide-neutral-200">
          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-neutral-500 text-sm">No patients match your search criteria.</p>
            </div>
          ) : (
            filtered.map((patient) => (
              <PatientCard key={patient.id} patient={patient} onSelect={onSelectPatient} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
