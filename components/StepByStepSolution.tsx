import React from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import type { Step } from '../types.ts';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { ChevronDownIcon } from './Icons.tsx';

interface StepByStepSolutionProps {
  steps: Step[];
}

const StepByStepSolution: React.FC<StepByStepSolutionProps> = ({ steps }) => {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <details key={index} className="bg-bg-primary/50 dark:bg-bg-secondary/50 rounded-lg group transition-colors">
          <summary className="p-4 font-semibold text-base cursor-pointer list-none flex justify-between items-center group-open:border-b group-open:border-border-light">
            {step.title}
            <span className="transition-transform duration-300 transform group-open:rotate-180 ml-2">
              <ChevronDownIcon className="w-6 h-6 opacity-70" />
            </span>
          </summary>
          <div className="p-4 text-base leading-relaxed">
            <p>{step.explanation}</p>
          </div>
        </details>
      ))}
    </div>
  );
};

export default StepByStepSolution;
