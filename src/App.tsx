import { useState, useCallback, useEffect } from 'react'
import { RotateCcw, Menu } from 'lucide-react'
import { cn } from './utils/styles'
import { 
  castHexagram, 
  type HexagramCastResult,
  setLanguage as setIchingLanguage
} from './utils/iching'
import { useLanguage } from './contexts/LanguageContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageSelector } from './components/LanguageSelector'
import { AuthButton } from './components/AuthButton'
import { ManualInput } from './components/ManualInput'
import { HexagramResult } from './components/HexagramResult'
import { HistorySidebar } from './components/HistorySidebar'
import { saveHexagramToHistory, convertHistoryToCastResult } from './utils/historyManager'
import type { HexagramHistory } from './lib/firebase'

function AppContent() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<HexagramCastResult | null>(null)
  const [isCasting, setIsCasting] = useState(false)
  const [showInterpretation, setShowInterpretation] = useState(false) // 展开/隐藏通俗解读
  const [showChangedInterpretation, setShowChangedInterpretation] = useState(false) // 展开/隐藏变卦通俗解读
  const [showLineRelations, setShowLineRelations] = useState(false) // 展开/隐藏爻位关系解读
  const [showManualInput, setShowManualInput] = useState(false) // 显示手动输入界面
  const [dataKey, setDataKey] = useState(0) // Used to force re-render when language changes
  const [sidebarOpen, setSidebarOpen] = useState(false) // 侧边栏开关
  const { t, language } = useLanguage()
  const { user } = useAuth()

  // Sync iching language with UI language and force data refresh
  useEffect(() => {
    setIchingLanguage(language)
    setDataKey(prev => prev + 1) // Force re-render to get new data
  }, [language])

  const handleCast = useCallback(async () => {
    setIsCasting(true)
    
    // 模拟起卦的仪式感，延迟显示结果
    setTimeout(async () => {
      const castResult = castHexagram()
      setResult(castResult)
      setIsCasting(false)
      
      // 保存历史记录
      await saveHexagramToHistory(castResult, question, user, t)
    }, 1200)
  }, [user, question, t])

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
  const handleManualInputResult = useCallback(async (manualResult: HexagramCastResult) => {
    setResult(manualResult)
    setShowManualInput(false)
    
    // 保存历史记录
    await saveHexagramToHistory(manualResult, question, user, t)
  }, [user, question, t])

  // 处理历史记录选择
  const handleSelectHistory = useCallback((history: HexagramHistory) => {
    setQuestion(history.question)
    // 将历史记录转换为 HexagramCastResult 格式
    const castResult = convertHistoryToCastResult(history)
    setResult(castResult)
    setShowInterpretation(true)
    setShowChangedInterpretation(true)
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-stone-100 to-stone-200 flex">
      {/* 侧边栏 */}
      <HistorySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectHistory={handleSelectHistory}
      />
      
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 固定的历史记录按钮 */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-6 left-6 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-stone-600" />
          </button>
        )}
        
        {/* 顶部工具栏 */}
        <div className="flex justify-end items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <AuthButton />
            <LanguageSelector />
          </div>
        </div>
        
        {/* 主要内容 */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">

        {/* 标题和副标题 */}
        <header className="text-center mb-10">
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
                  showLineRelations={showLineRelations}
                  onToggleInterpretation={() => setShowInterpretation(!showInterpretation)}
                  onToggleChangedInterpretation={() => setShowChangedInterpretation(!showChangedInterpretation)}
                  onToggleLineRelations={() => setShowLineRelations(!showLineRelations)}
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
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
