import { Mountain, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/styles';

interface HexagramInterpretationProps {
  hexagram: any;
  isExpanded: boolean;
  onToggle: () => void;
  variant?: 'original' | 'changed';
  translations: {
    interpretation: string;
    plainTranslation: string;
    lifeInspiration: string;
    decisionAdvice: string;
  };
}

export function HexagramInterpretation({ 
  hexagram, 
  isExpanded, 
  onToggle, 
  variant = 'original',
  translations 
}: HexagramInterpretationProps) {
  if (!hexagram?.interpretation) return null;

  const isChangedVariant = variant === 'changed';
  const bgColor = isChangedVariant ? 'bg-amber-50' : 'bg-stone-50';
  const dotColor = isChangedVariant ? 'bg-amber-400' : 'bg-stone-400';
  const textColor = isChangedVariant ? 'text-amber-900' : 'text-stone-800';
  const subTextColor = isChangedVariant ? 'text-amber-800' : 'text-stone-700';

  return (
    <div className="mt-4 pt-4 border-t border-stone-200">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 w-full text-left group"
      >
        <Mountain className={cn("w-4 h-4", isChangedVariant ? "text-amber-800" : "text-stone-600")} />
        <span className={cn("text-sm font-semibold", isChangedVariant ? "text-amber-900" : "text-stone-700")}>
          {translations.interpretation}
        </span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-stone-500 ml-auto transition-transform duration-300",
            isExpanded && "rotate-180"
          )} 
        />
      </button>
      
      {isExpanded && (
        <div className={cn("mt-4 space-y-4 rounded-xl p-5", bgColor)}>
          <div>
            <h4 className={cn("text-sm font-semibold mb-2 flex items-center gap-2", textColor)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)}></span>
              {translations.plainTranslation}
            </h4>
            <p className={cn("text-sm leading-relaxed pl-3.5", subTextColor)}>
              {hexagram.interpretation.plainTranslation}
            </p>
          </div>
          
          <div>
            <h4 className={cn("text-sm font-semibold mb-2 flex items-center gap-2", textColor)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)}></span>
              {translations.lifeInspiration}
            </h4>
            <p className={cn("text-sm leading-relaxed pl-3.5", subTextColor)}>
              {hexagram.interpretation.lifeInspiration}
            </p>
          </div>
          
          <div>
            <h4 className={cn("text-sm font-semibold mb-2 flex items-center gap-2", textColor)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)}></span>
              {translations.decisionAdvice}
            </h4>
            <p className={cn("text-sm leading-relaxed pl-3.5", subTextColor)}>
              {hexagram.interpretation.decisionAdvice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
