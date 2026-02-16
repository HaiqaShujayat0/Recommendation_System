import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Edit3 } from 'lucide-react';

const statusConfig = {
  approved: {
    border: 'border-primary-300 bg-gradient-to-r from-primary-50/60 to-green-50/30',
    icon: CheckCircle,
    iconClass: 'text-green-600',
    bgIcon: 'bg-gradient-to-br from-green-100 to-green-50',
    accentBar: 'bg-green-500',
  },
  warning: {
    border: 'border-amber-300 bg-gradient-to-r from-amber-50/60 to-yellow-50/30',
    icon: AlertTriangle,
    iconClass: 'text-amber-600',
    bgIcon: 'bg-gradient-to-br from-amber-100 to-amber-50',
    accentBar: 'bg-amber-500',
  },
  modified: {
    border: 'border-accent-300 bg-gradient-to-r from-accent-50/60 to-pink-50/30',
    icon: Edit3,
    iconClass: 'text-accent-600',
    bgIcon: 'bg-gradient-to-br from-accent-100 to-accent-50',
    accentBar: 'bg-accent-500',
  },
  blocked: {
    border: 'border-red-300 bg-gradient-to-r from-red-50/60 to-rose-50/30',
    icon: XCircle,
    iconClass: 'text-red-600',
    bgIcon: 'bg-gradient-to-br from-red-100 to-red-50',
    accentBar: 'bg-red-500',
  },
};

/**
 * Premium medication recommendation card with gradient accent bar.
 */
export default function MedicationCard({
  recommendation,
  isActioned,
  onAccept,
  onModify,
  onReject,
  actionBadge,
}) {
  const config = statusConfig[recommendation.status] || statusConfig.approved;
  const Icon = config.icon;
  const showActions =
    recommendation.status !== 'blocked' && !isActioned && (onAccept || onModify || onReject);

  return (
    <div
      className={`relative backdrop-blur-sm rounded-xl shadow-sm border-2 p-3.5 transition-all duration-200 overflow-hidden ${config.border
        } ${isActioned ? 'opacity-50' : 'hover:shadow-md'}`}
    >
      {/* Left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[3px] ${config.accentBar} rounded-l-xl`}
      />

      <div className="flex items-start gap-3 pl-1">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bgIcon}`}
        >
          <Icon className={`w-4 h-4 ${config.iconClass}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4
              className={`font-bold text-sm ${recommendation.status === 'blocked'
                  ? 'line-through text-slate-400'
                  : 'text-slate-800'
                }`}
            >
              {recommendation.med.replace(/_/g, ' ')}
            </h4>
            {recommendation.status === 'blocked' && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-red-100 to-red-50 text-red-700 text-[10px] font-bold rounded-full border border-red-200/60">
                BLOCKED
              </span>
            )}
            {recommendation.status === 'modified' && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-accent-100 to-accent-50 text-accent-700 text-[10px] font-bold rounded-full border border-accent-200/60">
                MODIFIED
              </span>
            )}
            {actionBadge}
          </div>
          <p className="text-slate-600 text-xs mb-2 font-medium">
            {recommendation.dose}
          </p>

          {recommendation.status === 'modified' && recommendation.notes && (
            <p className="text-xs text-accent-700 mb-2 italic font-medium">
              Note: {recommendation.notes}
            </p>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex-1 h-2 bg-slate-200/60 rounded-full overflow-hidden max-w-[100px]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${recommendation.confidence >= 80
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : recommendation.confidence >= 60
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                style={{ width: `${recommendation.confidence}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 font-bold">
              {recommendation.confidence}%
            </span>
            {recommendation.guidelines?.[0] && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-secondary-50 to-teal-50 text-secondary-700 text-[10px] rounded-full hidden sm:inline font-medium border border-secondary-200/60">
                {recommendation.guidelines[0]}
              </span>
            )}
          </div>

          {recommendation.warnings?.length > 0 && (
            <p className="flex items-center gap-1 text-[10px] text-amber-600 font-medium">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              {recommendation.warnings[0]}
            </p>
          )}
        </div>

        {showActions && (
          <div className="flex gap-1.5 flex-shrink-0">
            {onAccept && (
              <button
                type="button"
                onClick={() => onAccept(recommendation)}
                className="p-2 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200"
                title="Accept"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
            {onModify && (
              <button
                type="button"
                onClick={() => onModify(recommendation)}
                className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 border border-blue-200/60"
                title="Modify"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            {onReject && (
              <button
                type="button"
                onClick={() => onReject(recommendation)}
                className="p-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:scale-105 transition-all duration-200"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {isActioned && (
          <span className="text-[10px] text-slate-400 flex-shrink-0 font-semibold">
            ✓ Saved
          </span>
        )}
      </div>
    </div>
  );
}
