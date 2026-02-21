import { Scale, ChevronDown, Target, Users, Mountain } from 'lucide-react';
import { cn } from '../../utils/styles';
import { 
  analyzeChangingLineRelations, 
  type LineRelationAnalysis 
} from '../../utils/lineRelations';
import type { HexagramCastResult } from '../../utils/iching';

interface LineRelationsDisplayProps {
  result: HexagramCastResult;
  currentHexagram: any;
  isExpanded: boolean;
  onToggle: () => void;
  language: string;
  translations: {
    lineRelationsInterpretation: string;
    changingLine: string;
    dangWei: string;
    notDangWei: string;
    dangWeiAnalysis: string;
    yingRelation: string;
    chengChengRelation: string;
    modernInterpretation: string;
  };
}

export function LineRelationsDisplay({ 
  result, 
  currentHexagram, 
  isExpanded,
  onToggle,
  language,
  translations 
}: LineRelationsDisplayProps) {
  if (!result.changingLines.length || !currentHexagram) return null;

  const lineRelations = analyzeChangingLineRelations(
    result.changingLines,
    result.lines,
    currentHexagram.name,
    language as any
  );

  return (
    <div className="mt-4 pt-4 border-t border-stone-200">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 w-full text-left group"
      >
        <Scale className="w-4 h-4 text-stone-600" />
        <span className="text-sm text-stone-700 font-semibold">{translations.lineRelationsInterpretation}</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-stone-500 ml-auto transition-transform duration-300",
            isExpanded && "rotate-180"
          )} 
        />
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {lineRelations.map((relation: LineRelationAnalysis) => (
            <div 
              key={relation.position} 
              className="bg-stone-50 rounded-xl p-5 border border-stone-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  {translations.changingLine} {relation.position}
                </span>
                <span className="text-sm font-semibold text-stone-800">
                  {relation.yaoName}
                </span>
                <span className={cn(
                  "ml-auto text-xs font-medium px-2 py-0.5 rounded",
                  relation.isDangWei 
                    ? "text-green-700 bg-green-100" 
                    : "text-orange-700 bg-orange-100"
                )}>
                  {relation.isDangWei ? translations.dangWei : translations.notDangWei}
                </span>
              </div>
              
              <div className="space-y-3">
                {/* 当位判断 */}
                <div className="flex items-start gap-2">
                  <Target className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-stone-700">{translations.dangWeiAnalysis}：</span>
                    <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                      {relation.dangWeiText}
                    </p>
                  </div>
                </div>
                
                {/* 相应关系 */}
                {relation.yingRelation && (
                  <div className="flex items-start gap-2">
                    <Users className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-stone-700">{translations.yingRelation}：</span>
                      <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                        {relation.yingRelation}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* 承乘关系 */}
                {relation.chengChengRelation && (
                  <div className="flex items-start gap-2">
                    <Scale className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-stone-700">{translations.chengChengRelation}：</span>
                      <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                        {relation.chengChengRelation}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* 现代解读 */}
                <div className="pt-3 border-t border-stone-200">
                  <div className="flex items-start gap-2">
                    <Mountain className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-stone-700">{translations.modernInterpretation}：</span>
                      <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                        {relation.positionAdvice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
