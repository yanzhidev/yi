import { Target } from 'lucide-react';
import { FortuneAssessmentDisplay } from '../FortuneAssessmentDisplay';
import type { FortuneAssessment } from '../../utils/fortuneAssessment';

interface FortuneAssessmentSectionProps {
  assessment: FortuneAssessment;
  translations: {
    fortuneAssessment: string;
  };
}

export function FortuneAssessmentSection({ assessment, translations }: FortuneAssessmentSectionProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-md border border-stone-200 mt-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-stone-700" />
        <h2 className="text-lg font-semibold text-stone-800 tracking-wider">{translations.fortuneAssessment}</h2>
      </div>

      <div className="space-y-6">
        <FortuneAssessmentDisplay assessment={assessment} />
      </div>
    </div>
  );
}
