import { useCallback, useMemo } from 'react';
import type { HexagramCastResult } from '../utils/iching';
import { useLanguage } from '../contexts/LanguageContext';

export interface KeyInterpretationInfo {
  type: 'mainGuaText' | 'singleLine' | 'twoLines' | 'bothGuaText' | 'changedLine' | 'changedGuaText' | 'specialUse';
  message: string;
  line?: number;
  lines?: number[];
  primaryLine?: number;
  hexagramId?: number;
}

export function useHexagramInterpretation(result: HexagramCastResult | null) {
  const { t } = useLanguage();
  
  // 根据变爻数量确定重点解读规则
  const keyInterpretationInfo = useMemo(() => {
    if (!result) return null;
    const count = result.changingLines.length;
    
    switch (count) {
      case 0:
        return { 
          type: 'mainGuaText' as const, 
          message: t.interpretation0Lines
        };
      case 1:
        return { 
          type: 'singleLine' as const, 
          line: result.changingLines[0], 
          message: t.interpretation1Line
        };
      case 2:
        return { 
          type: 'twoLines' as const, 
          lines: result.changingLines, 
          primaryLine: Math.max(...result.changingLines), 
          message: t.interpretation2Lines
        };
      case 3:
        return { 
          type: 'bothGuaText' as const, 
          message: t.interpretation3Lines
        };
      case 4:
        const unchangedPositions = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos));
        const unchangedInLower = unchangedPositions.filter(pos => pos <= 3)[0];
        const targetLine = unchangedInLower || unchangedPositions[0];
        return { 
          type: 'changedLine' as const, 
          line: targetLine, 
          message: t.interpretation4Lines
        };
      case 5:
        const unchanged = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos))[0];
        return { 
          type: 'changedLine' as const, 
          line: unchanged, 
          message: t.interpretation5Lines
        };
      case 6:
        if (result.hexagramId === 1 || result.hexagramId === 2) {
          return { 
            type: 'specialUse' as const, 
            hexagramId: result.hexagramId, 
            message: result.hexagramId === 1 ? t.interpretation6LinesQian : t.interpretation6LinesKun
          };
        }
        return { 
          type: 'changedGuaText' as const, 
          message: t.interpretation6LinesOthers
        };
      default:
        return null;
    }
  }, [result, t]);

  // 判断某爻是否为重点解读爻
  const isKeyLine = useCallback((position: number) => {
    if (!keyInterpretationInfo) return false;
    const info = keyInterpretationInfo;
    if (info.type === 'singleLine' && info.line === position) return true;
    if (info.type === 'twoLines' && info.lines?.includes(position)) return true;
    if (info.type === 'changedLine' && info.line === position) return true;
    return false;
  }, [keyInterpretationInfo]);

  // 判断是否为重点解读本卦卦辞
  const isKeyMainGua = useMemo(() => {
    if (!keyInterpretationInfo) return false;
    return ['mainGuaText', 'bothGuaText'].includes(keyInterpretationInfo.type);
  }, [keyInterpretationInfo]);

  // 判断是否为重点解读变卦卦辞
  const isKeyChangedGua = useMemo(() => {
    if (!keyInterpretationInfo) return false;
    return ['changedGuaText', 'bothGuaText', 'specialUse'].includes(keyInterpretationInfo.type);
  }, [keyInterpretationInfo]);

  return {
    keyInterpretationInfo,
    isKeyLine,
    isKeyMainGua,
    isKeyChangedGua
  };
}
