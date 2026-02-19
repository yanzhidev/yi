import { useState, useCallback, useEffect } from 'react'
import { Sparkles, RotateCcw, Scroll, Mountain, Wind } from 'lucide-react'
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
  const { t, language } = useLanguage()

  // Sync iching language with UI language
  useEffect(() => {
    setIchingLanguage(language)
  }, [language])

  const currentHexagram = result ? getHexagramById(result.hexagramId) : null
  const changedHexagram = result?.changedHexagramId ? getHexagramById(result.changedHexagramId) : null

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
                  <div className="mt-6 pt-6 border-t border-stone-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Scroll className="w-4 h-4 text-stone-600" />
                      <span className="text-sm text-stone-700 font-semibold">{t.guaText}</span>
                    </div>
                    <p className="text-stone-800 leading-relaxed text-base">
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

                {/* 动爻详细解读（如果有变爻） */}
                {result && result.changingLines.length > 0 && currentHexagram && (
                  <div className="mt-6 pt-6 border-t border-stone-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-stone-700 font-semibold">{t.lineInterpretation}</span>
                    </div>
                    <div className="space-y-4">
                      {(() => {
                        const interpretations = getChangingLineInterpretations(
                          currentHexagram.id, 
                          result.changingLines
                        );
                        return interpretations.map((interp: LineInterpretation) => (
                          <div 
                            key={interp.position} 
                            className="bg-amber-50/50 rounded-lg p-4 border border-amber-100"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                                {t.changingLines} {interp.position}
                              </span>
                              <span className="text-sm font-semibold text-stone-800">
                                {interp.yao}
                              </span>
                            </div>
                            <p className="text-stone-800 text-sm leading-relaxed mb-2">
                              <span className="font-medium">{t.yaoText}：</span>{interp.text}
                            </p>
                            <p className="text-stone-600 text-xs leading-relaxed">
                              <span className="font-medium">{t.xiang}：</span>{interp.xiang}
                            </p>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* 变卦（如果有） */}
              {changedHexagram && result.changingLines.length > 0 && (
                <div className="bg-amber-50 rounded-3xl p-8 shadow-md border border-amber-200">
                  <div className="flex items-center gap-2 mb-6">
                    <Wind className="w-5 h-5 text-amber-800" />
                    <h2 className="text-lg font-semibold text-amber-900 tracking-wider">{t.changedHexagram}</h2>
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
                  <div className="mt-6 pt-6 border-t border-amber-300">
                    <p className="text-amber-950 text-base leading-relaxed">
                      <span className="text-amber-800 font-semibold">{t.guaText}：</span>
                      {changedHexagram.text}
                    </p>
                  </div>
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
