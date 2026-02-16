import React, { useState } from 'react';
import { AUDIT_LOGS } from '../../data/dummyData';
import FormCard from '../ui/FormCard';
import Button from '../ui/Button';
import { Download } from 'lucide-react';

/**
 * Premium audit trail table with styled filters and refined table design.
 */
export default function AuditTable() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = AUDIT_LOGS.filter((log) => {
    if (statusFilter !== 'All' && log.status !== statusFilter) return false;
    return true;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-gradient-to-r from-primary-100 to-green-100 text-primary-700 border border-primary-200/60';
      case 'Modified':
        return 'bg-gradient-to-r from-accent-100 to-pink-100 text-accent-700 border border-accent-200/60';
      case 'Rejected':
        return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200/60';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <FormCard
        title="Audit Trail"
        subtitle="Prototype log for traceability and regulatory review (sample data only)."
        accentColor="secondary"
      >
        {/* Filter bar */}
        <div className="mb-5 p-3.5 -mx-5 -mt-5 md:-mx-6 md:-mt-6 border-b border-slate-100/80 flex items-center gap-3 bg-gradient-to-r from-slate-50/80 to-white/60 flex-wrap backdrop-blur-sm rounded-t-2xl">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            max={dateTo || undefined}
            className="px-3 py-2 border-2 border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white/60 backdrop-blur-sm transition-all hover:border-slate-300"
            aria-label="From date"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            min={dateFrom || undefined}
            className="px-3 py-2 border-2 border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white/60 backdrop-blur-sm transition-all hover:border-slate-300"
            aria-label="To date"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border-2 border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white/60 backdrop-blur-sm transition-all hover:border-slate-300 font-medium"
            aria-label="Filter by status"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Modified">Modified</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="ml-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100/80">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100/60">
                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Medications
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              {filtered.map((log, idx) => (
                <tr
                  key={log.id}
                  className={`transition-colors duration-150 hover:bg-primary-50/30 ${idx % 2 === 0 ? 'bg-white/40' : 'bg-slate-50/30'
                    }`}
                >
                  <td className="px-4 py-3.5 font-mono text-slate-600 font-semibold text-xs">
                    {log.id}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{log.time}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${getStatusClass(
                        log.status
                      )}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 font-medium">
                    {log.meds}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${log.confidence >= 80
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : log.confidence >= 60
                              ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                              : 'bg-gradient-to-r from-red-400 to-red-600'
                            }`}
                          style={{ width: `${log.confidence}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">
                        {log.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 font-medium">
                    {log.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FormCard>
    </div>
  );
}
