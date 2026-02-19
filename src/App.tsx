import { useState, useCallback, useEffect, useMemo } from 'react'
import { Sparkles, RotateCcw, Scroll, Mountain, Wind, ChevronDown, Cloud } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { 
  castHexagram, 
  getHexagramById, 
  type HexagramCastResult, 
  getChangedLines,
  type LineResult,
  getChangingLineInterpretations,
  type LineInterpretation,
  setLanguage as setIchingLanguage
} from './utils/iching'
import { useLanguage } from './contexts/LanguageContext'
import { LanguageSelector } from './components/LanguageSelector'

function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// 阴爻符号（断开的横线）
const YinYao = ({ isChanging, className }: { isChanging?: boolean; className?: string }) => (
  <div className={cn("flex items-center justify-center gap-1 w-20", className)}>
    <div className={cn("h-2 w-7 rounded-full", isChanging ? "bg-amber-600" : "bg-stone-700")} />
    <div className={cn("h-2 w-7 rounded-full", isChanging ? "bg-amber-600" : "bg-stone-700")} />
  </div>
)

// 阳爻符号（完整的横线）
const YangYao = ({ isChanging, className }: { isChanging?: boolean; className?: string }) => (
  <div className={cn("h-2 w-20 rounded-full", isChanging ? "bg-amber-600" : "bg-stone-700", className)} />
)

// 卦象显示组件
function HexagramLines({ lines }: { lines: LineResult[] }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {lines.map((line, index) => (
        line.value === 1 ? (
          <YangYao key={index} isChanging={line.isChanging} />
        ) : (
          <YinYao key={index} isChanging={line.isChanging} />
        )
      ))}
    </div>
  )
}

function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<HexagramCastResult | null>(null)
  const [isCasting, setIsCasting] = useState(false)
  const [dataKey, setDataKey] = useState(0) // Used to force re-render when language changes
  const [showInterpretation, setShowInterpretation] = useState(false) // 展开/隐藏通俗解读
  const [showChangedInterpretation, setShowChangedInterpretation] = useState(false) // 展开/隐藏变卦通俗解读
  const { t, language } = useLanguage()

  // Sync iching language with UI language and force data refresh
  useEffect(() => {
    setIchingLanguage(language)
    setDataKey(prev => prev + 1) // Force re-render to get new data
  }, [language])

  // Use useMemo to recompute hexagram data when language changes (via dataKey)
  const currentHexagram = useMemo(() => 
    result ? getHexagramById(result.hexagramId) : null, 
    [result, dataKey]
  )
  const changedHexagram = useMemo(() => 
    result?.changedHexagramId ? getHexagramById(result.changedHexagramId) : null, 
    [result, dataKey]
  )

  // 根据变爻数量确定重点解读规则
  const getKeyInterpretationInfo = useMemo(() => {
    if (!result) return null
    const count = result.changingLines.length
    
    switch (count) {
      case 0:
        return { 
          type: 'mainGuaText', 
          message: "六爻皆为静爻，没有变爻。直接解读本卦的卦辞即可，代表事情的整体趋势。"
        }
      case 1:
        return { 
          type: 'singleLine', 
          line: result.changingLines[0], 
          message: "只有一个爻变动。直接看这个动爻的爻辞，这是最核心的指引。"
        }
      case 2:
        return { 
          type: 'twoLines', 
          lines: result.changingLines, 
          primaryLine: Math.max(...result.changingLines), 
          message: "两个爻变动时，以位置靠上的那个爻为主（如九二和九四同时变动，以九四为主），下方的爻作为辅助参考。"
        }
      case 3:
        return { 
          type: 'bothGuaText', 
          message: "三个爻变动时，动爻本身的含义减弱，转而看本卦的整体卦辞和变卦的整体卦辞，两者结合解读。"
        }
      case 4:
        // 变卦的下爻（1、2、3位）中不变的爻
        const unchangedPositions = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos))
        // 先找下爻（1、2、3）中不变的
        const unchangedInLower = unchangedPositions.filter(pos => pos <= 3)[0]
        // 如果下爻中没有不变的（都在上爻），则取所有不变爻的第一个（这种情况理论上不会发生，因为4变=2不变）
        const targetLine = unchangedInLower || unchangedPositions[0]
        return { 
          type: 'changedLine', 
          line: targetLine, 
          message: "四个爻变动，只剩下两个爻没变。此时解读重点在变卦中位置靠下的那个不变爻的爻辞。"
        }
      case 5:
        // 变卦中唯一不变的爻
        const unchanged = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos))[0]
        return { 
          type: 'changedLine', 
          line: unchanged, 
          message: "五个爻变动，只剩下一个爻没变。此时解读重点就是变卦中唯一没变的那个爻的爻辞。"
        }
      case 6:
        if (result.hexagramId === 1 || result.hexagramId === 2) {
          return { 
            type: 'specialUse', 
            hexagramId: result.hexagramId, 
            message: "六爻全变：① 如果本卦是乾卦，看\"用九\"爻辞；② 如果本卦是坤卦，看\"用六\"爻辞；③ 如果是其余62卦，直接看变卦的卦辞。"
          }
        }
        return { 
          type: 'changedGuaText', 
          message: "六爻全变：① 如果本卦是乾卦，看\"用九\"爻辞；② 如果本卦是坤卦，看\"用六\"爻辞；③ 如果是其余62卦，直接看变卦的卦辞。"
        }
      default:
        return null
    }
  }, [result])

  // 判断某爻是否为重点解读爻
  const isKeyLine = useCallback((position: number) => {
    if (!getKeyInterpretationInfo) return false
    const info = getKeyInterpretationInfo
    if (info.type === 'singleLine' && info.line === position) return true
    if (info.type === 'twoLines' && info.lines?.includes(position)) return true
    if (info.type === 'changedLine' && info.line === position) return true
    return false
  }, [getKeyInterpretationInfo])

  // 判断是否为重点解读本卦卦辞
  const isKeyMainGua = useMemo(() => {
    if (!getKeyInterpretationInfo) return false
    return ['mainGuaText', 'bothGuaText'].includes(getKeyInterpretationInfo.type)
  }, [getKeyInterpretationInfo])

  // 判断是否为重点解读变卦卦辞
  const isKeyChangedGua = useMemo(() => {
    if (!getKeyInterpretationInfo) return false
    return ['changedGuaText', 'bothGuaText', 'specialUse'].includes(getKeyInterpretationInfo.type)
  }, [getKeyInterpretationInfo])

  const handleCast = useCallback(() => {
    if (!question.trim()) return
    
    setIsCasting(true)
    
    // 模拟起卦的仪式感，延迟显示结果
    setTimeout(() => {
      const castResult = castHexagram()
      setResult(castResult)
      setIsCasting(false)
    }, 1200)
  }, [question])

  const handleReset = useCallback(() => {
    setResult(null)
    setQuestion('')
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-stone-100 to-stone-200">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 顶部标题和语言选择器 */}
        <header className="text-center mb-10">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-stone-400" />
            <span className="text-sm tracking-[0.3em] text-stone-400 uppercase">{t.iChing}</span>
            <Sparkles className="w-5 h-5 text-stone-400" />
          </div>
          <h1 className="text-4xl font-medium tracking-wider text-stone-800">
            {t.title}
          </h1>
          <p className="mt-3 text-stone-600 text-sm tracking-wide">
            {t.subtitle}
          </p>
        </header>

        {/* 问题输入区域 */}
        {!result && (
          <div className="mb-10">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-stone-100">
              <label className="block text-sm text-stone-700 mb-3 tracking-wider font-medium">
                {t.questionLabel}
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t.questionPlaceholder}
                className={cn(
                  "w-full px-4 py-3 rounded-xl",
                  "bg-white border border-stone-300",
                  "text-stone-800 placeholder:text-stone-400",
                  "focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent",
                  "resize-none transition-all"
                )}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* 显示已输入的问题 */}
        {result && question && (
          <div className="mb-8 text-center">
            <p className="text-xs text-stone-500 tracking-wider mb-2">{t.yourQuestion}</p>
            <p className="text-lg text-stone-800 font-medium">「{question}」</p>
          </div>
        )}

        {/* 变爻重点解读规则 */}
        {result && getKeyInterpretationInfo && (
          <div className="mb-8 text-center">
            <div className="inline-block text-xs text-amber-700 bg-amber-50 rounded-lg px-4 py-2 max-w-lg">
              <span className="font-medium">重点解读：</span>
              <span className="text-amber-600 ml-1">{getKeyInterpretationInfo.message}</span>
            </div>
          </div>
        )}

        {/* 主要显示区域 */}
        <main className="space-y-6">
          {isCasting ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-sm border border-stone-100 text-center">
              <div className="relative inline-block">
                <div className="w-20 h-20 border-3 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-stone-500 tracking-widest">{t.castButton}</span>
                </div>
              </div>
              <p className="mt-8 text-stone-600 text-sm tracking-wide animate-pulse font-medium">
                {t.castingDescription}
              </p>
            </div>
          ) : result ? (
            <>
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
                  {/* 卦象图形 */}
                  <div className="flex-shrink-0">
                    <HexagramLines lines={result.lines} />
                  </div>
                  
                  {/* 卦名信息 */}
                  {currentHexagram && (
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-2xl font-semibold text-stone-900">
                          {currentHexagram.name}
                        </h3>
                        <p className="text-sm text-stone-600 mt-1 font-medium">
                          第 {currentHexagram.id} 卦 · {currentHexagram.pinyin}
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
                      onClick={() => setShowInterpretation(!showInterpretation)}
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
                        {/* 白话翻译 */}
                        <div>
                          <h4 className="text-sm font-semibold text-stone-800 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                            {t.plainTranslation}
                          </h4>
                          <p className="text-sm text-stone-700 leading-relaxed pl-3.5">
                            {currentHexagram.interpretation.plainTranslation}
                          </p>
                        </div>
                        
                        {/* 人生启示 */}
                        <div>
                          <h4 className="text-sm font-semibold text-stone-800 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                            {t.lifeInspiration}
                          </h4>
                          <p className="text-sm text-stone-700 leading-relaxed pl-3.5">
                            {currentHexagram.interpretation.lifeInspiration}
                          </p>
                        </div>
                        
                        {/* 决策建议 */}
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
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-stone-700 font-semibold">{t.lineInterpretation}</span>
                    </div>
                    <div className="space-y-4">
                      {(() => {
                        // 判断是否需要显示变卦的爻（4个或5个变爻时）
                        const showChangedGuaLines = result.changingLines.length === 4 || result.changingLines.length === 5;
                        const targetHexagram = showChangedGuaLines && changedHexagram ? changedHexagram : currentHexagram;
                        
                        // 4个变爻时，只显示变卦中下爻中不变的那一个（重点解读）
                        // 5个变爻时，只显示变卦中唯一不变的那一个（重点解读）
                        // 其他情况显示本卦的所有变爻
                        let targetLines: number[];
                        if (result.changingLines.length === 4) {
                          // 4变爻：只取下爻（1、2、3位）中不变的
                          const unchangedPositions = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos));
                          const unchangedInLower = unchangedPositions.filter(pos => pos <= 3)[0];
                          targetLines = unchangedInLower ? [unchangedInLower] : [unchangedPositions[0]];
                        } else if (result.changingLines.length === 5) {
                          // 5变爻：只取唯一不变的
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
              </div>

              {/* 变卦（如果有） */}
              {changedHexagram && result.changingLines.length > 0 && (
                <div className={cn(
                  "rounded-3xl p-8 shadow-md border",
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
                    {/* 变卦卦象 */}
                    <div className="flex-shrink-0">
                      <HexagramLines 
                        lines={getChangedLines(result.lines).map((value) => ({
                          value: value as 0 | 1,
                          isChanging: false,
                          lineType: value === 1 ? 'youngYang' : 'youngYin'
                        }))} 
                      />
                    </div>
                    
                    {/* 变卦信息 */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-2xl font-semibold text-amber-950">
                          {changedHexagram.name}
                        </h3>
                        <p className="text-sm text-amber-800 mt-1 font-medium">
                          第 {changedHexagram.id} 卦 · {changedHexagram.pinyin}
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
                    {getKeyInterpretationInfo?.type === 'specialUse' && getKeyInterpretationInfo.hexagramId === 1 ? (
                      <div>
                        <p className={cn("text-base leading-relaxed font-medium", isKeyChangedGua ? "text-amber-950" : "text-amber-950")}>
                          <span className={cn("font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>用九：</span>
                          {currentHexagram?.yongjiu}
                        </p>
                      </div>
                    ) : getKeyInterpretationInfo?.type === 'specialUse' && getKeyInterpretationInfo.hexagramId === 2 ? (
                      <div>
                        <p className={cn("text-base leading-relaxed font-medium", isKeyChangedGua ? "text-amber-950" : "text-amber-950")}>
                          <span className={cn("font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>用六：</span>
                          {currentHexagram?.yongliu}
                        </p>
                      </div>
                    ) : (
                      <p className={cn("text-base leading-relaxed", isKeyChangedGua ? "text-amber-950 font-medium" : "text-amber-950")}>
                        <span className={cn("font-semibold", isKeyChangedGua ? "text-amber-900" : "text-amber-800")}>{t.guaText}：</span>
                        {changedHexagram.text}
                      </p>
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
                        onClick={() => setShowChangedInterpretation(!showChangedInterpretation)}
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
                          {/* 白话翻译 */}
                          <div>
                            <h4 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              {t.plainTranslation}
                            </h4>
                            <p className="text-sm text-amber-800 leading-relaxed pl-3.5 font-medium">
                              {changedHexagram.interpretation.plainTranslation}
                            </p>
                          </div>
                          
                          {/* 人生启示 */}
                          <div>
                            <h4 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              {t.lifeInspiration}
                            </h4>
                            <p className="text-sm text-amber-800 leading-relaxed pl-3.5 font-medium">
                              {changedHexagram.interpretation.lifeInspiration}
                            </p>
                          </div>
                          
                          {/* 决策建议 */}
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
            </>
          ) : null}
        </main>

        {/* 底部按钮区域 */}
        <footer className="mt-10">
          <div className="flex justify-center gap-4">
            {!result ? (
              <button
                onClick={handleCast}
                disabled={isCasting || !question.trim()}
                className={cn(
                  "group relative px-12 py-4 rounded-full",
                  "bg-stone-700 text-stone-50",
                  "text-sm tracking-[0.2em] uppercase",
                  "transition-all duration-500 ease-out",
                  "hover:bg-stone-600 hover:shadow-lg",
                  "active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <span className="relative z-10">{t.castButton}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-stone-600 to-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className={cn(
                  "group flex items-center gap-2 px-8 py-4 rounded-full",
                  "bg-stone-200 text-stone-600",
                  "text-sm tracking-wider",
                  "transition-all duration-300",
                  "hover:bg-stone-300 hover:text-stone-700"
                )}
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.resetButton}</span>
              </button>
            )}
          </div>
          <p className="mt-8 text-center text-xs text-stone-500 tracking-widest font-medium">
            {t.footer}
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
