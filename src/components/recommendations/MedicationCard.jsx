import React from 'react';
import {
  CheckCircle,
  X,
  Pen,
  Shield,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import Button from '../ui/Button';

/**
 * Individual medication recommendation card — clean design with clinical accents.
 */
export default function MedicationCard({
  rec,
  onAccept,
  onModify,
  onReject,
  actionedMap = {},
}) {
  const actioned = actionedMap[rec.id];

  const statusStyle = {
    approved: 'border-l-green-500',
    warning: 'border-l-amber-500',
    modified: 'border-l-blue-500',
    blocked: 'border-l-red-500',
  };

  const confidenceStyle =
    rec.confidence >= 80
      ? 'bg-green-50 text-green-700 border-green-200'
      : rec.confidence >= 60
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-red-50 text-red-700 border-red-200';

  const actionBadge = {
    accepted: {
      icon: CheckCircle,
      label: 'Accepted',
      cls: 'bg-green-100 text-green-700 border-green-200',
    },
    modified: {
      icon: Pen,
      label: 'Modified',
      cls: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    rejected: {
      icon: X,
      label: 'Rejected',
      cls: 'bg-red-100 text-red-700 border-red-200',
    },
  };

  return (
    <div
      className={`bg-white border border-slate-200/80 rounded-xl shadow-card p-4 animate-fade-in border-l-4 ${statusStyle[rec.status] || 'border-l-slate-300'
        } hover:shadow-card-md transition-shadow duration-200`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-bold text-slate-900 truncate">
            {rec.med}
          </h4>
          <p className="text-sm text-slate-600 mt-0.5">{rec.dose}</p>
        </div>
        <div
          className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold border ${confidenceStyle}`}
        >
          {rec.confidence}%
        </div>
      </div>

      {/* Guidelines */}
      {rec.guidelines?.length > 0 && (
        <div className="mb-3 space-y-1">
          {rec.guidelines.map((gl, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <Shield className="w-3 h-3 text-primary-500 flex-shrink-0" />
              <span className="text-slate-600">{gl}</span>
            </div>
          ))}
        </div>
      )}

      {/* Warnings */}
      {rec.warnings?.length > 0 && (
        <div className="mb-3 space-y-1">
          {rec.warnings.map((w, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs bg-amber-50 rounded-lg px-2.5 py-1.5 border border-amber-100"
            >
              <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0" />
              <span className="text-amber-700 font-medium">{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons or actioned badge */}
      {actioned ? (
        <div className="mt-3 pt-3 border-t border-slate-100">
          {(() => {
            const badge = actionBadge[actioned.action];
            const Icon = badge?.icon;
            return (
              <div
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${badge.cls}`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {badge.label}
                {actioned.detail && (
                  <span className="font-normal ml-1">
                    — {actioned.detail}
                  </span>
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="success"
            pill
            onClick={() => onAccept(rec.id)}
            icon={<CheckCircle className="w-3.5 h-3.5" />}
          >
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            pill
            onClick={() => onModify(rec.id)}
            icon={<Pen className="w-3.5 h-3.5" />}
          >
            Modify
          </Button>
          <Button
            size="sm"
            variant="danger"
            pill
            onClick={() => onReject(rec.id)}
            icon={<X className="w-3.5 h-3.5" />}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
