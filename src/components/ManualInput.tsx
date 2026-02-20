import { useState } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import type { LineResult, HexagramCastResult } from '../utils/iching'

function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// 爻的类型定义
type YaoType = 'oldYang' | 'youngYang' | 'youngYin' | 'oldYin' | null

// 爻的选项配置
const yaoOptions = [
  { type: 'oldYang' as const, label: '3正', symbol: '⚊变', color: 'orange' },
  { type: 'youngYang' as const, label: '2正1反', symbol: '⚊', color: 'green' },
  { type: 'youngYin' as const, label: '1正2反', symbol: '⚋', color: 'blue' },
  { type: 'oldYin' as const, label: '3反', symbol: '⚋变', color: 'orange' }
]

// 爻的名称（从下到上）
const yaoNames = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻']

interface ManualInputProps {
  question: string
  onBack: () => void
  onResult: (result: HexagramCastResult) => void
}

export function ManualInput({ question, onBack, onResult }: ManualInputProps) {
  const [selectedYaos, setSelectedYaos] = useState<YaoType[]>(Array(6).fill(null))

  // 处理爻的选择
  const handleYaoSelect = (position: number, type: YaoType) => {
    const newSelectedYaos = [...selectedYaos]
    newSelectedYaos[position] = type
    setSelectedYaos(newSelectedYaos)
  }

  // 计算本卦二进制（从下往上，阳=1，阴=0）
  const calculateOriginalBinary = (): string => {
    return selectedYaos.map(yao => {
      if (!yao) return '0'
      return (yao === 'oldYang' || yao === 'youngYang') ? '1' : '0'
    }).reverse().join('')
  }

  // 计算变卦二进制（老阳变阴，老阴变阳）
  const calculateChangedBinary = (): string => {
    return selectedYaos.map(yao => {
      if (!yao) return '0'
      if (yao === 'oldYang') return '0'  // 老阳变阴
      if (yao === 'oldYin') return '1'   // 老阴变阳
      return (yao === 'youngYang') ? '1' : '0'  // 少阳少阴不变
    }).reverse().join('')
  }

  // 获取变爻位置列表
  const getChangingLines = (): number[] => {
    return selectedYaos.map((yao, index) => {
      if (yao === 'oldYang' || yao === 'oldYin') {
        return index + 1  // 位置从1开始
      }
      return -1
    }).filter(pos => pos > 0)
  }

  // 转换为LineResult格式
  const convertToLineResults = (): LineResult[] => {
    return selectedYaos.map((yao): LineResult => {
      if (!yao) {
        return { value: 0, isChanging: false, lineType: 'youngYin' }
      }
      
      switch (yao) {
        case 'oldYang':
          return { value: 1, isChanging: true, lineType: 'oldYang' }
        case 'youngYang':
          return { value: 1, isChanging: false, lineType: 'youngYang' }
        case 'youngYin':
          return { value: 0, isChanging: false, lineType: 'youngYin' }
        case 'oldYin':
          return { value: 0, isChanging: true, lineType: 'oldYin' }
        default:
          return { value: 0, isChanging: false, lineType: 'youngYin' }
      }
    })
  }

  // 二进制转卦ID
  const binaryToHexagramId = (binary: string): number => {
    return parseInt(binary, 2) + 1
  }

  // 检查是否可以查看结果
  const canViewResult = selectedYaos.every(yao => yao !== null)

  // 处理查看结果
  const handleViewResult = () => {
    if (!canViewResult) return

    // 先滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const originalBinary = calculateOriginalBinary()
    const changedBinary = calculateChangedBinary()
    const changingLines = getChangingLines()
    const lines = convertToLineResults()
    
    const result: HexagramCastResult = {
      lines,
      changingLines,
      hexagramId: binaryToHexagramId(originalBinary),
      changedHexagramId: changingLines.length > 0 ? binaryToHexagramId(changedBinary) : null,
      binary: originalBinary
    }

    // 延迟一下确保滚动完成后再跳转
    setTimeout(() => {
      onResult(result)
    }, 300)
  }

  // 重置选择
  const handleReset = () => {
    setSelectedYaos(Array(6).fill(null))
  }

  // 获取按钮样式
  const getButtonStyle = (position: number, type: YaoType) => {
    const isSelected = selectedYaos[position] === type
    const option = yaoOptions.find(opt => opt.type === type)
    
    if (!option) return ''

    const baseColors = {
      orange: isSelected ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200',
      green: isSelected ? 'bg-green-500 text-white border-green-500' : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200',
      blue: isSelected ? 'bg-blue-500 text-white border-blue-500' : 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200'
    }

    return cn(
      "px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-1",
      baseColors[option.color as keyof typeof baseColors] || baseColors.green
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-stone-100 to-stone-200">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 顶部标题和返回按钮 */}
        <header className="text-center mb-10">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onBack}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-white/70 backdrop-blur-sm border border-stone-200",
                "text-stone-700 hover:bg-stone-50 transition-colors"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              返回
            </button>
            
            <button
              onClick={handleReset}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-white/70 backdrop-blur-sm border border-stone-200",
                "text-stone-700 hover:bg-stone-50 transition-colors"
              )}
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
          </div>
          
          <h1 className="text-3xl font-medium tracking-wider text-stone-800 mb-3">
            手动摇卦输入
          </h1>
          <p className="text-stone-600 text-sm">
            请按照从下到上的顺序，为每一爻选择铜钱投掷结果
          </p>
        </header>

        {/* 显示问题 */}
        {question && (
          <div className="mb-8 text-center">
            <p className="text-xs text-stone-500 mb-2">您的问题</p>
            <p className="text-lg text-stone-800 font-medium">「{question}」</p>
          </div>
        )}

        {/* 爻位选择区域 */}
        <main className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-stone-100">
            <div className="space-y-4">
              {/* 从上到下显示爻位（上爻到初爻） */}
              {[5, 4, 3, 2, 1, 0].map((position) => (
                <div key={position} className="border-b border-stone-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-stone-800">
                      {yaoNames[position]}
                    </h3>
                    {selectedYaos[position] && (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {yaoOptions.find(opt => opt.type === selectedYaos[position])?.symbol}
                        </span>
                        <span className="text-sm text-stone-600">
                          {yaoOptions.find(opt => opt.type === selectedYaos[position])?.label}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {yaoOptions.map((option) => (
                      <button
                        key={option.type}
                        onClick={() => handleYaoSelect(position, option.type)}
                        className={getButtonStyle(position, option.type)}
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">{option.symbol}</div>
                          <div className="text-xs">{option.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 查看结果按钮 */}
          <div className="flex justify-center">
            <button
              onClick={handleViewResult}
              disabled={!canViewResult}
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
              <span className="relative z-10">查看结果</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-stone-600 to-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
