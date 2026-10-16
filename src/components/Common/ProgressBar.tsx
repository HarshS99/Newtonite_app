import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  stepName?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 5,
  stepName,
  className = '',
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={`w-full ${className}`} aria-label={`Onboarding progress: Step ${currentStep} of ${totalSteps}`}>
      <div className="flex items-center justify-between text-xs font-semibold text-[#526359] mb-1.5">
        <span className="text-[#176B45]">
          Step {currentStep} of {totalSteps}
        </span>
        {stepName && <span className="text-[#17251D]">{stepName}</span>}
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 bg-[#E2ECE5] rounded-full overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full bg-[#176B45] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
