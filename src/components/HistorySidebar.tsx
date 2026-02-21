import { useState, useEffect } from 'react'
import { X, Clock, Trash2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { getUserHistory, deleteHexagramHistory, type HexagramHistory } from '../lib/firebase'
import { getHexagramName } from '../data/hexagramNames'
import { cn } from '../utils/styles'

interface HistorySidebarProps {
  isOpen: boolean
  onClose: () => void
  onSelectHistory: (history: HexagramHistory) => void
}

export function HistorySidebar({ isOpen, onClose, onSelectHistory }: HistorySidebarProps) {
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const [history, setHistory] = useState<HexagramHistory[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && isOpen) {
      loadHistory()
    }
  }, [user, isOpen])

  const loadHistory = async () => {
    if (!user) return
    setLoading(true)
    try {
      const historyData = await getUserHistory(user.uid)
      setHistory(historyData)
    } catch (error) {
      console.error('Error loading history:', error)
    } finally {
      setLoading(false)
    }
  }

  // 删除历史记录
  const handleDeleteHistory = async (docId: string, event: React.MouseEvent) => {
    event.stopPropagation() // 防止触发选择历史记录
    
    if (!confirm(t.deleteConfirm)) {
      return
    }
    
    try {
      await deleteHexagramHistory(docId, user!.uid) // 传递用户ID进行权限验证
      // 重新加载历史记录
      await loadHistory()
    } catch (error) {
      console.error('删除历史记录失败:', error)
      alert(t.deleteError)
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60))
        return minutes <= 1 ? t.justNow : `${minutes}${t.minutesAgo}`
      }
      return `${hours}${t.hoursAgo}`
    } else if (days === 1) {
      return t.yesterday
    } else {
      return `${days}${t.daysAgo}`
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300",
        "w-80 max-w-[80vw]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h2 className="text-lg font-medium text-stone-800">{t.history}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {!user ? (
              <div className="text-center py-8">
                <p className="text-stone-500 mb-4">{t.loginToSave}</p>
              </div>
            ) : loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-500">{t.noHistory}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectHistory(item)
                      onClose()
                    }}
                    className={cn(
                      "p-3 rounded-lg border border-stone-200 cursor-pointer",
                      "hover:bg-stone-50 hover:border-stone-300",
                      "transition-all duration-200"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-800 truncate">
                          {getHexagramName(item.originalHexagram.number, language)}
                        </p>
                        <p className="text-xs text-stone-500 mb-2">{t.yourQuestionLabel}</p>
                        <p className="text-xs text-stone-500">{formatDate(item.timestamp)}</p>
                      </div>
                      {item.changedHexagram && (
                        <span className="text-xs text-stone-400">→ {getHexagramName(item.changedHexagram.number, language)}</span>
                      )}
                      <button
                        onClick={(e) => handleDeleteHistory(item.id!, e)}
                        className="p-1 rounded hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
                        title={t.deleteHistory}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {item.question && (
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {item.question}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
