import { useState, useCallback, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { 
  castHexagram, 
  type HexagramCastResult,
  setLanguage as setIchingLanguage
} from './utils/iching'
import { useLanguage } from './contexts/LanguageContext'
import { LanguageSelector } from './components/LanguageSelector'
import { ManualInput } from './components/ManualInput'
import { HexagramResult } from './components/HexagramResult'

function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<HexagramCastResult | null>(null)
  const [isCasting, setIsCasting] = useState(false)
  const [showInterpretation, setShowInterpretation] = useState(false) // 展开/隐藏通俗解读
  const [showChangedInterpretation, setShowChangedInterpretation] = useState(false) // 展开/隐藏变卦通俗解读
  const [showManualInput, setShowManualInput] = useState(false) // 显示手动输入界面
  const [dataKey, setDataKey] = useState(0) // Used to force re-render when language changes
  const { t, language } = useLanguage()

  // Sync iching language with UI language and force data refresh
  useEffect(() => {
    setIchingLanguage(language)
    setDataKey(prev => prev + 1) // Force re-render to get new data
  }, [language])

  const handleCast = useCallback(() => {
    setIsCasting(true)
    
    // 模拟起卦的仪式感，延迟显示结果
    setTimeout(() => {
      const castResult = castHexagram()
      setResult(castResult)
      setIsCasting(false)
    }, 1200)
  }, [])

  const handleReset = useCallback(() => {
    setResult(null)
    setQuestion('')
    setShowManualInput(false)
    setShowInterpretation(false)
    setShowChangedInterpretation(false)
  }, [])

  // 处理手动输入返回
  const handleManualInputBack = useCallback(() => {
    setShowManualInput(false)
  }, [])

  // 处理手动输入结果
  const handleManualInputResult = useCallback((manualResult: HexagramCastResult) => {
    setResult(manualResult)
    setShowManualInput(false)
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-stone-100 to-stone-200">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 顶部标题和语言选择器 */}
        <header className={cn(
          "text-center mb-10",
          showManualInput ? "opacity-0 pointer-events-none h-0" : ""
        )}>
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          <h1 className="text-4xl font-medium tracking-wider text-stone-800">
            {t.title}
          </h1>
          <p className="mt-3 text-stone-600 text-sm tracking-wide">
            {t.subtitle}
          </p>
        </header>

        {/* 问题输入区域 */}
        {!result && !showManualInput && (
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

        {/* 手动输入界面 */}
        {showManualInput && (
          <ManualInput
            question={question}
            onBack={handleManualInputBack}
            onResult={handleManualInputResult}
          />
        )}

        {/* 主要显示区域 */}
        <main className="space-y-6">
          {!showManualInput && (
            <>
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
                <HexagramResult
                  key={dataKey} // Force re-render when language changes
                  result={result}
                  question={question}
                  showInterpretation={showInterpretation}
                  showChangedInterpretation={showChangedInterpretation}
                  onToggleInterpretation={() => setShowInterpretation(!showInterpretation)}
                  onToggleChangedInterpretation={() => setShowChangedInterpretation(!showChangedInterpretation)}
                />
              ) : null}
            </>
          )}
        </main>

        {/* 底部按钮区域 */}
        <footer className="mt-10">
          <div className="flex justify-center gap-4">
            {!result ? (
              <>
                {!showManualInput && (
                  <>
                    <button
                      onClick={handleCast}
                      disabled={isCasting}
                      className={cn(
                        "group relative px-12 py-4 rounded-full",
                        "text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl",
                        isCasting 
                          ? "bg-stone-300 text-stone-500 cursor-not-allowed" 
                          : "bg-amber-600 text-white hover:bg-amber-700"
                      )}
                    >
                      <span className="relative z-10">{t.castButton}</span>
                      {!isCasting && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => setShowManualInput(true)}
                      className={cn(
                        "px-12 py-4 rounded-full",
                        "bg-amber-600 text-white hover:bg-amber-700",
                        "text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                      )}
                    >
                      {t.coinDivination}
                    </button>
                  </>
                )}
              </>
            ) : (
              <button
                onClick={handleReset}
                className={cn(
                  "group flex items-center gap-2 px-12 py-4 rounded-full",
                  "bg-amber-600 text-white hover:bg-amber-700",
                  "text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                )}
              >
                <RotateCcw className="w-4 h-4" />
                {t.resetButton}
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
