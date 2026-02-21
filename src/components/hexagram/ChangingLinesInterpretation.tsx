import { Mountain } from 'lucide-react';
import { cn } from '../../utils/styles';
import { 
  getChangingLineInterpretations,
  type LineInterpretation 
} from '../../utils/iching';
import type { HexagramCastResult } from '../../utils/iching';

interface ChangingLinesInterpretationProps {
  result: HexagramCastResult;
  currentHexagram: any;
  changedHexagram: any | null;
  isKeyLine: (position: number) => boolean;
  translations: {
    lineInterpretation: string;
    changingLines: string;
    changedHexagram: string;
    keyInterpretation: string;
    yaoText: string;
    xiang: string;
  };
}

export function ChangingLinesInterpretation({ 
  result, 
  currentHexagram, 
  changedHexagram,
  isKeyLine,
  translations 
}: ChangingLinesInterpretationProps) {
  if (!result.changingLines.length || !currentHexagram) return null;

  const showChangedGuaLines = result.changingLines.length === 4 || result.changingLines.length === 5;
  const targetHexagram = showChangedGuaLines && changedHexagram ? changedHexagram : currentHexagram;
  
  let targetLines: number[];
  if (result.changingLines.length === 4) {
    const unchangedPositions = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos));
    const unchangedInLower = unchangedPositions.filter(pos => pos <= 3)[0];
    targetLines = unchangedInLower ? [unchangedInLower] : [unchangedPositions[0]];
  } else if (result.changingLines.length === 5) {
    const unchanged = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos))[0];
    targetLines = [unchanged];
  } else {
    targetLines = result.changingLines;
  }
  
  const interpretations = getChangingLineInterpretations(targetHexagram.id, targetLines);

  return (
    <div className="mt-6 pt-6 border-t border-stone-200">
      <div className="flex items-center gap-2 mb-4">
        <Mountain className="w-4 h-4 text-amber-600" />
        <span className="text-sm text-stone-700 font-semibold">{translations.lineInterpretation}</span>
      </div>
      <div className="space-y-4">
        {interpretations.map((interp: LineInterpretation) => {
          const isKey = isKeyLine(interp.position);
          return (
            <div 
              key={interp.position} 
              className={cn(
                "rounded-lg p-4 border",
                isKey 
                  ? "bg-amber-100 border-amber-400 shadow-sm" 
                  : "bg-amber-50/50 border-amber-100"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded",
                  isKey ? "text-amber-800 bg-amber-200" : "text-amber-700 bg-amber-100"
                )}>
                  {showChangedGuaLines ? translations.changedHexagram : translations.changingLines} {interp.position}
                </span>
                <span className="text-sm font-semibold text-stone-800">
                  {interp.yao}
                </span>
                {isKey && (
                  <span className="ml-auto text-xs font-medium text-amber-800 bg-amber-200 px-2 py-0.5 rounded">
                    {translations.keyInterpretation}
                  </span>
                )}
              </div>
              <p className={cn("text-sm leading-relaxed mb-2", isKey ? "text-amber-900 font-medium" : "text-stone-800")}>
                <span className="font-medium">{translations.yaoText}：</span>{interp.text}
              </p>
              <p className="text-stone-600 text-xs leading-relaxed mb-2">
                <span className="font-medium">{translations.xiang}：</span>{interp.xiang}
              </p>
              {interp.interpretation && (
                <p className={cn("text-sm leading-relaxed mt-3 pt-3 border-t", isKey ? "text-amber-800 border-amber-300" : "text-stone-700 border-amber-200/50")}>
                  <span className={cn("font-medium", isKey ? "text-amber-800" : "text-amber-700")}>{translations.lineInterpretation}：</span>{interp.interpretation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
