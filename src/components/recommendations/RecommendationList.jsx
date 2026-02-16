import React, { useState } from 'react';
import { Brain, Loader2, Pill, CheckCircle, Edit3, XCircle } from 'lucide-react';
import { SAMPLE_RECOMMENDATIONS } from '../../data/dummyData';
import MedicationCard from './MedicationCard';
import FormCard from '../ui/FormCard';
import Button from '../ui/Button';

/**
 * Recommendations view: generate button, loading state, list grouped by category.
 */
export default function RecommendationList({ patientData }) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionedRecs, setActionedRecs] = useState({});
  const [modifyingRec, setModifyingRec] = useState(null);

  const generate = () => {
    setIsLoading(true);
    setActionedRecs({});
    setTimeout(() => {
      setRecommendations(SAMPLE_RECOMMENDATIONS);
      setIsLoading(false);
    }, 1200);
  };

  const handleAccept = (rec) => {
    setActionedRecs((prev) => ({
      ...prev,
      [rec.id]: { action: 'accepted', timestamp: new Date().toISOString() },
    }));
  };

  const handleReject = (rec) => {
    setActionedRecs((prev) => ({
      ...prev,
      [rec.id]: { action: 'rejected', timestamp: new Date().toISOString() },
    }));
  };

  const handleModifySave = (modifiedRec) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === modifiedRec.id ? modifiedRec : r))
    );
    setActionedRecs((prev) => ({
      ...prev,
      [modifiedRec.id]: {
        action: 'modified',
        timestamp: new Date().toISOString(),
        notes: modifiedRec.notes,
      },
    }));
    setModifyingRec(null);
  };

  const getActionBadge = (recId) => {
    const action = actionedRecs[recId];
    if (!action) return null;
    const styles = {
      accepted: 'bg-gradient-to-r from-primary-50 to-green-50 text-primary-700 border-primary-200',
      rejected: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200',
      modified: 'bg-gradient-to-r from-accent-50 to-pink-50 text-accent-700 border-accent-200',
    };
    const icons = {
      accepted: <CheckCircle className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />,
      modified: <Edit3 className="w-3 h-3" />,
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[action.action]}`}
      >
        {icons[action.action]}
        {action.action.charAt(0).toUpperCase() + action.action.slice(1)}
      </span>
    );
  };

  const grouped = recommendations.reduce((acc, rec) => {
    const cat = rec.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(rec);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto space-y-4 animate-fade-in">
      {modifyingRec && (
        <ModifyModal
          recommendation={modifyingRec}
          onSave={handleModifySave}
          onClose={() => setModifyingRec(null)}
        />
      )}

      <FormCard
        title="AI Medication Recommendations"
        subtitle="Prototype engine using sample data to illustrate decision support."
        accentColor="primary"
        headerSlot={
          <Button
            type="button"
            onClick={generate}
            disabled={isLoading}
            loading={isLoading}
            icon={!isLoading ? <Brain className="w-4 h-4" /> : undefined}
          >
            {isLoading ? 'Analyzing...' : 'Generate Recommendations'}
          </Button>
        }
      >
        {/* Patient vitals bar */}
        {patientData && (
          <div className="mb-5 p-3.5 bg-gradient-to-r from-slate-50/80 to-white/60 rounded-xl flex items-center gap-5 flex-wrap text-sm border border-slate-100/80 backdrop-blur-sm">
            <span className="text-slate-500 font-medium">
              HbA1c:{' '}
              <strong
                className={
                  parseFloat(patientData.labs?.hba1c) > 7 ? 'text-red-500' : 'text-green-600'
                }
              >
                {patientData.labs?.hba1c || '--'}%
              </strong>
            </span>
            <span className="text-slate-500 font-medium">
              eGFR:{' '}
              <strong
                className={
                  parseFloat(patientData.labs?.egfr) < 60 ? 'text-amber-500' : 'text-green-600'
                }
              >
                {patientData.labs?.egfr || '--'}
              </strong>
            </span>
            <span className="text-slate-500 font-medium">
              BMI: <strong>{patientData.demographics?.bmi ?? '--'}</strong>
            </span>
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/60 rounded-xl border border-slate-100/80 p-4 animate-pulse backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full w-40 mb-2" />
                    <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations list */}
        {!isLoading && recommendations.length > 0 && (
          <div className="space-y-5 stagger-children">
            {Object.entries(grouped).map(([category, recs]) => (
              <div key={category}>
                <h3 className="text-sm font-bold text-slate-600 mb-2.5 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                    <Pill className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  {category} ({recs.length})
                </h3>
                <div className="space-y-2.5">
                  {recs.map((rec) => (
                    <MedicationCard
                      key={rec.id}
                      recommendation={rec}
                      isActioned={!!actionedRecs[rec.id]}
                      actionBadge={getActionBadge(rec.id)}
                      onAccept={handleAccept}
                      onModify={(rec) => setModifyingRec(rec)}
                      onReject={handleReject}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && recommendations.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="font-bold text-slate-600 mb-1 text-lg">
              No Recommendations Yet
            </h3>
            <p className="text-slate-400 text-sm mb-5">
              Click Generate to load sample recommendations
            </p>
            <Button type="button" onClick={generate} icon={<Brain className="w-4 h-4" />}>
              Generate Recommendations
            </Button>
          </div>
        )}

        {/* Decision Summary */}
        {Object.keys(actionedRecs).length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-slate-50/80 to-white/60 border border-slate-200/60 rounded-xl backdrop-blur-sm animate-fade-in">
            <h4 className="font-bold text-slate-700 mb-3 text-sm">
              Decision Summary
            </h4>
            <div className="flex gap-5 text-sm mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-sm" />
                <span className="font-medium">
                  Accepted:{' '}
                  {Object.values(actionedRecs).filter((a) => a.action === 'accepted').length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full shadow-sm" />
                <span className="font-medium">
                  Modified:{' '}
                  {Object.values(actionedRecs).filter((a) => a.action === 'modified').length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-sm" />
                <span className="font-medium">
                  Rejected:{' '}
                  {Object.values(actionedRecs).filter((a) => a.action === 'rejected').length}
                </span>
              </div>
            </div>
            <Button type="button" className="w-full">
              Submit All Decisions
            </Button>
          </div>
        )}
      </FormCard>
    </div>
  );
}

/** Modify modal with glassmorphism */
function ModifyModal({ recommendation, onSave, onClose }) {
  const [notes, setNotes] = useState('');
  const [dosage, setDosage] = useState(recommendation.dose || '');

  const handleSave = () => {
    if (!notes.trim()) return;
    onSave({
      ...recommendation,
      dose: dosage || recommendation.dose,
      notes: notes.trim(),
      status: 'modified',
      modifiedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col border border-white/40 animate-scale-in">
        <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white px-6 py-4 flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] animate-shimmer opacity-20" />
          <h3 className="text-lg font-bold font-display relative">Modify Medication</h3>
          <p className="text-primary-200 text-sm relative">{recommendation.med}</p>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="p-3.5 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/60 rounded-xl">
            <p className="text-xs text-primary-600 font-bold mb-1">AI Recommended</p>
            <p className="text-primary-900 font-semibold">{recommendation.dose}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Modified dosage / instructions
            </label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-200/80 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm bg-white/60 backdrop-blur-sm transition-all"
              placeholder="e.g. 500mg twice daily"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Modification reason *
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Required for audit trail..."
              rows={3}
              className="w-full px-3.5 py-2.5 border-2 border-slate-200/80 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm resize-none bg-white/60 backdrop-blur-sm transition-all"
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-gradient-to-r from-slate-50/80 to-white/60 border-t border-slate-200/60 flex items-center justify-end gap-3 flex-shrink-0">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!notes.trim()}
          >
            Save Modification
          </Button>
        </div>
      </div>
    </div>
  );
}
