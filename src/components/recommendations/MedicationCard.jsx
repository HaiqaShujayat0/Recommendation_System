import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Edit3 } from 'lucide-react';

const statusConfig = {
  approved: {
    border: 'border-success-500 bg-success-50',
    icon: CheckCircle,
    iconClass: 'text-success-600',
    bgIcon: 'bg-success-100',
  },
  warning: {
    border: 'border-warning-500 bg-warning-50',
    icon: AlertTriangle,
    iconClass: 'text-warning-600',
    bgIcon: 'bg-warning-100',
  },
  modified: {
    border: 'border-primary-500 bg-primary-50',
    icon: Edit3,
    iconClass: 'text-primary-600',
    bgIcon: 'bg-primary-100',
  },
  blocked: {
    border: 'border-critical-500 bg-critical-50',
    icon: XCircle,
    iconClass: 'text-critical-600',
    bgIcon: 'bg-critical-100',
  },
};

/**
 * Single recommendation card: medication name, dose, confidence bar, status, actions.
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
      className={`bg-white rounded-lg shadow-sm border-2 p-3 transition-all ${config.border} ${
        isActioned ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bgIcon}`}
        >
          <Icon className={`w-4 h-4 ${config.iconClass}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4
              className={`font-bold text-sm ${
                recommendation.status === 'blocked' ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {recommendation.med.replace(/_/g, ' ')}
            </h4>
            {recommendation.status === 'blocked' && (
              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-medium rounded">
                BLOCKED
              </span>
            )}
            {recommendation.status === 'modified' && (
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded">
                MODIFIED
              </span>
            )}
            {actionBadge}
          </div>
          <p className="text-slate-600 text-xs mb-2">{recommendation.dose}</p>

          {recommendation.status === 'modified' && recommendation.notes && (
            <p className="text-xs text-blue-600 mb-2 italic">Note: {recommendation.notes}</p>
          )}

          <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden max-w-[120px]">
                <div
                  className={`h-full rounded-full ${
                    recommendation.confidence >= 80
                      ? 'bg-success-500'
                      : recommendation.confidence >= 60
                        ? 'bg-warning-500'
                        : 'bg-critical-500'
                  }`}
                  style={{ width: `${recommendation.confidence}%` }}
                />
              </div>
              <span className="text-[10px] text-neutral-600 font-semibold">{recommendation.confidence}%</span>
            {recommendation.guidelines?.[0] && (
              <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] rounded hidden sm:inline">
                {recommendation.guidelines[0]}
              </span>
            )}
          </div>

          {recommendation.warnings?.length > 0 && (
            <p className="flex items-center gap-1 text-[10px] text-amber-600">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              {recommendation.warnings[0]}
            </p>
          )}
        </div>

        {showActions && (
          <div className="flex gap-2 flex-shrink-0">
            {onAccept && (
              <button
                type="button"
                onClick={() => onAccept(recommendation)}
                className="p-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors shadow-sm"
                title="Accept recommendation"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
            {onModify && (
              <button
                type="button"
                onClick={() => onModify(recommendation)}
                className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                title="Modify dosage"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            {onReject && (
              <button
                type="button"
                onClick={() => onReject(recommendation)}
                className="p-2 border-2 border-critical-300 text-critical-600 rounded-lg hover:bg-critical-50 transition-colors"
                title="Reject recommendation"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {isActioned && (
          <span className="text-[10px] text-slate-400 flex-shrink-0">✓ Saved</span>
        )}
      </div>
    </div>
  );
}
