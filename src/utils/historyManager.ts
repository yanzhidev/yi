import { saveHexagramHistory, type HexagramHistory } from '../lib/firebase'
import type { HexagramCastResult } from './iching'
import type { Translation } from './i18n';

/**
 * 将 HexagramCastResult 转换为历史记录格式
 */
export function convertCastResultToHistory(
  result: HexagramCastResult,
  question: string,
  userId: string
): Omit<HexagramHistory, 'id' | 'timestamp'> {
  // 获取卦象信息
  return {
    userId,
    question: question.trim(),
    originalHexagram: {
      number: result.hexagramId,
      name: '', // 将在调用处设置
      lines: result.lines.map(line => {
        if (line.lineType === 'oldYin') return 6
        if (line.lineType === 'youngYang') return 7
        if (line.lineType === 'youngYin') return 8
        return 9 // oldYang
      })
    },
    changedHexagram: result.changedHexagramId ? {
      number: result.changedHexagramId,
      name: '', // 将在调用处设置
      lines: [] // 这里可以计算变卦的爻值，但暂时留空
    } : null,
    changingLines: result.changingLines
  }
}

/**
 * 保存卦象到历史记录
 */
export async function saveHexagramToHistory(
  result: HexagramCastResult,
  question: string,
  user: { uid: string } | null,
  t: Translation
): Promise<void> {
  if (!user) {
    console.log('用户未登录，跳过历史记录保存')
    return
  }

  console.log('用户已登录，开始保存历史记录...')
  
  try {
    // 获取卦象信息
    const hexagramData = await import('../data/hexagrams.json')
    const hexagrams = hexagramData.default
    const originalHexagram = hexagrams.find(h => h.id === result.hexagramId)
    const changedHexagram = result.changedHexagramId ? hexagrams.find(h => h.id === result.changedHexagramId) : undefined
    
    console.log('卦象信息:', { originalHexagram, changedHexagram })
    
    if (!originalHexagram) {
      console.error('找不到本卦信息:', result.hexagramId)
      return
    }
    
    const historyData = convertCastResultToHistory(result, question, user.uid)
    
    // 设置卦象名称
    historyData.originalHexagram.name = originalHexagram.name || t.hexagramNameFormat.replace('{0}', result.hexagramId.toString())
    
    if (changedHexagram) {
      historyData.changedHexagram!.name = changedHexagram.name || t.hexagramNameFormat.replace('{0}', result.changedHexagramId!.toString())
    }
    
    console.log('准备保存的历史数据:', historyData)
    
    await saveHexagramHistory(historyData)
    console.log('历史记录保存成功!')
  } catch (error) {
    console.error('保存历史记录错误:', error)
  }
}

/**
 * 将历史记录转换为 HexagramCastResult 格式
 */
export function convertHistoryToCastResult(history: HexagramHistory): HexagramCastResult {
  return {
    lines: history.originalHexagram.lines.map((line: number, index: number) => {
      const isChanging = history.changingLines.includes(index + 1)
      const isYang = line === 7 || line === 9 // 7,9 are yang; 6,8 are yin
      
      let lineType: 'oldYin' | 'youngYang' | 'youngYin' | 'oldYang'
      if (isYang) {
        lineType = isChanging ? 'oldYang' : 'youngYang'
      } else {
        lineType = isChanging ? 'oldYin' : 'youngYin'
      }
      
      return {
        value: isYang ? 1 : 0,
        isChanging,
        lineType
      }
    }),
    changingLines: history.changingLines,
    hexagramId: history.originalHexagram.number,
    changedHexagramId: history.changedHexagram?.number || null,
    binary: history.originalHexagram.lines.map((line: number) => line >= 7 ? '1' : '0').join('')
  }
}
