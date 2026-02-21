import { Mountain, Scroll, Wind, Cloud, ChevronDown, Scale, Users, Target } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { 
  getHexagramById, 
  type HexagramCastResult, 
  getChangingLineInterpretations,
  type LineInterpretation,
  getChangedLines
} from '../utils/iching';
import { 
  analyzeChangingLineRelations, 
  type LineRelationAnalysis 
} from '../utils/lineRelations';
import { HexagramLines } from './HexagramLines';
import { FortuneAssessmentDisplay } from './FortuneAssessmentDisplay';
import { assessFortune } from '../utils/fortuneAssessment';
import { useLanguage } from '../contexts/LanguageContext';
import { useHexagramInterpretation } from '../hooks/useHexagramInterpretation';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

interface HexagramDisplayProps {
  result: HexagramCastResult;
  question: string;
  showInterpretation: boolean;
  showChangedInterpretation: boolean;
  showLineRelations: boolean;
  onToggleInterpretation: () => void;
  onToggleChangedInterpretation: () => void;
  onToggleLineRelations: () => void;
}

export function HexagramResult({ 
  result, 
  question, 
  showInterpretation, 
  showChangedInterpretation,
  showLineRelations,
  onToggleInterpretation,
  onToggleChangedInterpretation,
  onToggleLineRelations
}: HexagramDisplayProps) {
  const { t, language } = useLanguage();
  const { keyInterpretationInfo, isKeyLine, isKeyMainGua, isKeyChangedGua } = useHexagramInterpretation(result);

  // 获取卦象数据
  const currentHexagram = getHexagramById(result.hexagramId);
  const changedHexagram = result.changedHexagramId ? getHexagramById(result.changedHexagramId) : null;

  // 计算吉凶判断
  const fortuneAssessment = assessFortune(result, undefined, language);

  return (
    <>
      {/* 显示已输入的问题 */}
      {question && (
        <div className="mb-8 text-center">
          <p className="text-xs text-stone-500 tracking-wider mb-2">{t.yourQuestion}</p>
          <p className="text-lg text-stone-800 font-medium">「{question}」</p>
        </div>
      )}

      {/* 变爻重点解读规则 */}
      {keyInterpretationInfo && (
        <div className="mb-8 text-center">
          <div className="inline-block text-xs text-amber-700 bg-amber-50 rounded-lg px-4 py-2 max-w-lg">
            <span className="font-medium">{t.keyInterpretationNote}：</span>
            <span className="text-amber-600 ml-1">{keyInterpretationInfo.message}</span>
          </div>
        </div>
      )}

      {/* 本卦 */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-stone-200">
        <div className="flex items-center gap-2 mb-6">
          <Mountain className="w-5 h-5 text-stone-700" />
          <h2 className="text-lg font-semibold text-stone-800 tracking-wider">{t.originalHexagram}</h2>
          {result.changingLines.length > 0 && (
            <span className="ml-auto text-xs text-amber-700 bg-amber-100 px-3 py-1 rounded-full font-medium">
              {result.changingLines.length} {t.changingLinesCount}
            </span>
          )}
        </div>

        <div className="flex items-start gap-8">
          <HexagramLines lines={result.lines} />
          
          {currentHexagram && (
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-2xl font-semibold text-stone-900">
                  {currentHexagram.name}
                </h3>
                <p className="text-sm text-stone-600 mt-1 font-medium">
                  {t.hexagramNumber.replace('{0}', currentHexagram.id.toString())} · {currentHexagram.pinyin}
                </p>
              </div>
              <p className="text-stone-700 text-base leading-relaxed">
                {currentHexagram.symbol}
              </p>
            </div>
          )}
        </div>

        {/* 卦辞 */}
        {currentHexagram && (
          <div className={cn(
            "mt-6 pt-6 border-t",
            isKeyMainGua ? "border-amber-400 bg-amber-50/30 rounded-xl p-4 -mx-4" : "border-stone-200"
          )}>
            <div className="flex items-center gap-2 mb-3">
              <Scroll className={cn("w-4 h-4", isKeyMainGua ? "text-amber-600" : "text-stone-600")} />
              <span className={cn("text-sm font-semibold", isKeyMainGua ? "text-amber-800" : "text-stone-700")}>{t.guaText}</span>
              {isKeyMainGua && (
                <span className="ml-auto text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  {t.keyInterpretation}
                </span>
              )}
            </div>
            <p className={cn("leading-relaxed text-base", isKeyMainGua ? "text-amber-900 font-medium" : "text-stone-800")}>
              {currentHexagram.text}
            </p>
          </div>
        )}

        {/* 彖曰 */}
        {currentHexagram && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-3">
              <Wind className="w-4 h-4 text-stone-600" />
              <span className="text-sm text-stone-700 font-semibold">{t.tuan}</span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              {currentHexagram.tuan}
            </p>
          </div>
        )}

        {/* 大象图 */}
        {currentHexagram && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <div className="flex justify-center">
              <img 
                src={`/images/hexagrams/${currentHexagram.id}.png`}
                alt={`${currentHexagram.name}大象图`}
                width={450}
                height={270}
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
        )}

        {/* 大象 */}
        {currentHexagram && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="w-4 h-4 text-stone-600" />
              <span className="text-sm text-stone-700 font-semibold">{t.daXiang}</span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              {currentHexagram.daxiang}
            </p>
          </div>
        )}

        {/* 通俗解读（可展开） */}
        {currentHexagram?.interpretation && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <button
              onClick={onToggleInterpretation}
              className="flex items-center gap-2 w-full text-left group"
            >
              <Mountain className="w-4 h-4 text-stone-600" />
              <span className="text-sm text-stone-700 font-semibold">{t.interpretation}</span>
              <ChevronDown 
                className={cn(
                  "w-4 h-4 text-stone-500 ml-auto transition-transform duration-300",
                  showInterpretation && "rotate-180"
                )} 
              />
            </button>
            
            {showInterpretation && (
              <div className="mt-4 space-y-4 bg-stone-50 rounded-xl p-5">
                <div>
                  <h4 className="text-sm font-semibold text-stone-800 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                    {t.plainTranslation}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed pl-3.5">
                    {currentHexagram.interpretation.plainTranslation}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-stone-800 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                    {t.lifeInspiration}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed pl-3.5">
                    {currentHexagram.interpretation.lifeInspiration}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-stone-800 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                    {t.decisionAdvice}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed pl-3.5">
                    {currentHexagram.interpretation.decisionAdvice}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 动爻详细解读（如果有变爻） */}
        {result && result.changingLines.length > 0 && currentHexagram && (
          <div className="mt-6 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-stone-700 font-semibold">{t.lineInterpretation}</span>
            </div>
            <div className="space-y-4">
              {(() => {
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
                
                const interpretations = getChangingLineInterpretations(
                  targetHexagram.id, 
                  targetLines
                );
                return interpretations.map((interp: LineInterpretation) => {
                  const isKey = isKeyLine(interp.position)
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
                          {showChangedGuaLines ? t.changedHexagram : t.changingLines} {interp.position}
                        </span>
                        <span className="text-sm font-semibold text-stone-800">
                          {interp.yao}
                        </span>
                        {isKey && (
                          <span className="ml-auto text-xs font-medium text-amber-800 bg-amber-200 px-2 py-0.5 rounded">
                            {t.keyInterpretation}
                          </span>
                        )}
                      </div>
                      <p className={cn("text-sm leading-relaxed mb-2", isKey ? "text-amber-900 font-medium" : "text-stone-800")}>
                        <span className="font-medium">{t.yaoText}：</span>{interp.text}
                      </p>
                      <p className="text-stone-600 text-xs leading-relaxed mb-2">
                        <span className="font-medium">{t.xiang}：</span>{interp.xiang}
                      </p>
                      {interp.interpretation && (
                        <p className={cn("text-sm leading-relaxed mt-3 pt-3 border-t", isKey ? "text-amber-800 border-amber-300" : "text-stone-700 border-amber-200/50")}>
                          <span className={cn("font-medium", isKey ? "text-amber-800" : "text-amber-700")}>{t.lineInterpretation}：</span>{interp.interpretation}
                        </p>
                      )}
                    </div>
                  )
                });
              })()}
            </div>
          </div>
        )}

        {/* 爻位关系解读（如果有变爻） */}
        {result && result.changingLines.length > 0 && currentHexagram && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <button
              onClick={onToggleLineRelations}
              className="flex items-center gap-2 w-full text-left group"
            >
              <Scale className="w-4 h-4 text-stone-600" />
              <span className="text-sm text-stone-700 font-semibold">{t.lineRelationsInterpretation}</span>
              <ChevronDown 
                className={cn(
                  "w-4 h-4 text-stone-500 ml-auto transition-transform duration-300",
                  showLineRelations && "rotate-180"
                )} 
              />
            </button>
            
            {showLineRelations && (
              <div className="mt-4 space-y-4">
                {(() => {
                  const lineRelations = analyzeChangingLineRelations(
                    result.changingLines,
                    result.lines,
                    currentHexagram.name,
                    language
                  );
                  
                  return lineRelations.map((relation: LineRelationAnalysis) => (
                    <div 
                      key={relation.position} 
                      className="bg-stone-50 rounded-xl p-5 border border-stone-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          {t.changingLine} {relation.position}
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
                          {relation.isDangWei ? t.dangWei : t.notDangWei}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {/* 当位判断 */}
                        <div className="flex items-start gap-2">
                          <Target className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-medium text-stone-700">{t.dangWeiAnalysis}：</span>
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
                              <span className="text-xs font-medium text-stone-700">{t.yingRelation}：</span>
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
                              <span className="text-xs font-medium text-stone-700">{t.chengChengRelation}：</span>
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
                              <span className="text-xs font-medium text-stone-700">{t.modernInterpretation}：</span>
                              <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                                {relation.positionAdvice}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 变卦（如果有） */}
      {changedHexagram && result.changingLines.length > 0 && (
        <div className={cn(
          "rounded-3xl p-8 shadow-md border mt-6",
          isKeyChangedGua 
            ? "bg-amber-100 border-amber-400" 
            : "bg-amber-50 border-amber-200"
        )}>
          <div className="flex items-center gap-2 mb-6">
            <Wind className={cn("w-5 h-5", isKeyChangedGua ? "text-amber-900" : "text-amber-800")} />
            <h2 className={cn("text-lg font-semibold tracking-wider", isKeyChangedGua ? "text-amber-950" : "text-amber-900")}>{t.changedHexagram}</h2>
            {isKeyChangedGua && (
              <span className="ml-2 text-xs font-medium text-amber-800 bg-amber-200 px-2 py-0.5 rounded">
                {t.keyInterpretation}
              </span>
            )}
            <span className="ml-auto text-xs text-amber-800 font-medium">
              {t.changingLines}：{result.changingLines.join('、')}
            </span>
          </div>

          <div className="flex items-start gap-8">
            <HexagramLines 
              lines={getChangedLines(result.lines).map((value) => ({
                value: value as 0 | 1,
                isChanging: false,
                lineType: value === 1 ? 'youngYang' : 'youngYin'
              }))} 
            />
            
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-2xl font-semibold text-amber-950">
                  {changedHexagram.name}
                </h3>
                <p className="text-sm text-amber-800 mt-1 font-medium">
                  {t.hexagramNumber.replace('{0}', changedHexagram.id.toString())} · {changedHexagram.pinyin}
                </p>
              </div>
              <p className="text-amber-900 text-base leading-relaxed">
                {changedHexagram.symbol}
              </p>
            </div>
          </div>

          {/* 变卦卦辞 */}
          <div className={cn(
            "mt-6 pt-6 border-t",
            isKeyChangedGua ? "border-amber-400" : "border-amber-300"
          )}>
            {keyInterpretationInfo?.type === 'specialUse' && keyInterpretationInfo.hexagramId === 1 ? (
              <div>
                <p className={cn("text-base leading-relaxed font-medium", isKeyChangedGua ? "text-amber-950" : "text-amber-950")}>
                  <span className={cn("font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>用九：</span>
                  {currentHexagram?.yongjiu}
                </p>
              </div>
            ) : keyInterpretationInfo?.type === 'specialUse' && keyInterpretationInfo.hexagramId === 2 ? (
              <div>
                <p className={cn("text-base leading-relaxed font-medium", isKeyChangedGua ? "text-amber-950" : "text-amber-950")}>
                  <span className={cn("font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>用六：</span>
                  {currentHexagram?.yongliu}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Scroll className={cn("w-4 h-4", isKeyChangedGua ? "text-amber-900" : "text-amber-800")} />
                  <span className={cn("text-sm font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>{t.guaText}</span>
                </div>
                <p className={cn("text-base leading-relaxed", isKeyChangedGua ? "text-amber-950 font-medium" : "text-amber-950")}>
                  {changedHexagram.text}
                </p>
              </div>
            )}
          </div>

          {/* 变卦彖曰 */}
          <div className="mt-4 pt-4 border-t border-amber-300">
            <div className="flex items-center gap-2 mb-3">
              <Wind className={cn("w-4 h-4", isKeyChangedGua ? "text-amber-900" : "text-amber-800")} />
              <span className={cn("text-sm text-stone-700 font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>{t.tuan}</span>
            </div>
            <p className={cn("text-sm text-stone-700 leading-relaxed font-medium", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>
              {changedHexagram.tuan}
            </p>
          </div>

          {/* 变卦大象图 */}
          <div className="mt-4 pt-4 border-t border-amber-300">
            <div className="flex justify-center">
              <img 
                src={`/images/hexagrams/${changedHexagram.id}.png`}
                alt={`${changedHexagram.name}大象图`}
                width={450}
                height={270}
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>

          {/* 变卦大象 */}
          <div className="mt-4 pt-4 border-t border-amber-300">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className={cn("w-4 h-4", isKeyChangedGua ? "text-amber-900" : "text-amber-800")} />
              <span className={cn("text-sm text-stone-700 font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>{t.daXiang}</span>
            </div>
            <p className={cn("text-sm text-stone-700 leading-relaxed font-medium", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>
              {changedHexagram.daxiang}
            </p>
          </div>

          {/* 变卦通俗解读（可展开） */}
          {changedHexagram?.interpretation && (
            <div className="mt-4 pt-4 border-t border-amber-300">
              <button
                onClick={onToggleChangedInterpretation}
                className="flex items-center gap-2 w-full text-left group"
              >
                <Mountain className={cn("w-4 h-4", isKeyChangedGua ? "text-amber-900" : "text-amber-800")} />
                <span className={cn("text-sm text-stone-700 font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>{t.interpretation}</span>
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 text-stone-500 ml-auto transition-transform duration-300",
                    showChangedInterpretation && "rotate-180"
                  )} 
                />
              </button>
              
              {showChangedInterpretation && (
                <div className="mt-4 space-y-4 bg-amber-50 rounded-xl p-5">
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {t.plainTranslation}
                    </h4>
                    <p className="text-sm text-amber-800 leading-relaxed pl-3.5 font-medium">
                      {changedHexagram.interpretation.plainTranslation}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {t.lifeInspiration}
                    </h4>
                    <p className="text-sm text-amber-800 leading-relaxed pl-3.5 font-medium">
                      {changedHexagram.interpretation.lifeInspiration}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {t.decisionAdvice}
                    </h4>
                    <p className="text-sm text-amber-800 leading-relaxed pl-3.5 font-medium">
                      {changedHexagram.interpretation.decisionAdvice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 吉凶判断 */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-stone-200 mt-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-stone-700" />
          <h2 className="text-lg font-semibold text-stone-800 tracking-wider">{t.fortuneAssessment}</h2>
        </div>

        {/* 吉凶判断总览 */}
        <div className="space-y-6">
          <FortuneAssessmentDisplay
            assessment={fortuneAssessment}
          />
        </div>
      </div>
    </>
  );
}
