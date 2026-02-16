import React, { useState } from 'react';
import { AUDIT_LOGS } from '../../data/dummyData';

/**
 * Audit trail table with date filters and status filter.
 * Uses dummy AUDIT_LOGS; export button is UI-only.
 */
export default function AuditTable() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = AUDIT_LOGS.filter((log) => {
    if (statusFilter !== 'All' && log.status !== statusFilter) return false;
    // Dummy data has no date field; in real app filter by log.time
    return true;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-success-100 text-success-700 font-semibold';
      case 'Modified':
        return 'bg-primary-100 text-primary-700 font-semibold';
      case 'Rejected':
        return 'bg-critical-100 text-critical-700 font-semibold';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 font-display mb-1">Audit Trail</h2>
        <p className="text-neutral-600 text-sm">Compliance log for all recommendations and physician decisions</p>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3 bg-neutral-50 flex-wrap">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-3 py-2 border-2 border-neutral-300 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
            aria-label="From date"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-3 py-2 border-2 border-neutral-300 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
            aria-label="To date"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border-2 border-neutral-300 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
            aria-label="Filter by status"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Modified">Modified</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            type="button"
            className="ml-auto px-4 py-2 bg-neutral-200 text-neutral-700 text-sm rounded-lg hover:bg-neutral-300 font-medium transition-colors"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead className="bg-neutral-100 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-neutral-700 uppercase tracking-wide">
                  Request ID
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-neutral-700 uppercase tracking-wide">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-neutral-700 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-neutral-700 uppercase tracking-wide">
                  Medications
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-neutral-700 uppercase tracking-wide">
                  Confidence
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-neutral-700 uppercase tracking-wide">
                  Physician Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-neutral-700 text-sm">{log.id}</td>
                  <td className="px-4 py-3 text-neutral-600 text-sm">{log.time}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${getStatusClass(log.status)}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-600 text-sm">{log.meds}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            log.confidence >= 80
                              ? 'bg-success-500'
                              : log.confidence >= 60
                                ? 'bg-warning-500'
                                : 'bg-critical-500'
                          }`}
                          style={{ width: `${log.confidence}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-neutral-600 font-semibold">{log.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600 text-sm">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
