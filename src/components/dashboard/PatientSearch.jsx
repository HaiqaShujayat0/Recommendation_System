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
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 font-display mb-2">Patient Dashboard</h2>
        <p className="text-neutral-600 text-base">Search for an existing patient or create a new profile</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5"
          aria-hidden
        />
        <input
          type="search"
          placeholder="Search by patient name, MR number, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border-2 border-neutral-300 rounded-xl focus:border-primary-500 focus:outline-none text-sm transition-colors bg-white"
          aria-label="Search patients by name or medical record number"
        />
      </div>

      {/* New Patient Button */}
      <button
        type="button"
        onClick={onNewPatient}
        className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mb-7 text-sm font-semibold shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Create New Patient
      </button>

      {/* Stats Cards Section */}
      <StatsCards className="mb-8" />

      {/* Recent Patients List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-4 py-3.5 border-b border-neutral-200 bg-neutral-50">
          <h3 className="font-semibold text-neutral-700 text-sm uppercase tracking-wide">Recent Patients</h3>
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
