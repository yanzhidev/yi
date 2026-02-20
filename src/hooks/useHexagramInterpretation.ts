import { useCallback, useMemo } from 'react';
import type { HexagramCastResult } from '../utils/iching';

export interface KeyInterpretationInfo {
  type: 'mainGuaText' | 'singleLine' | 'twoLines' | 'bothGuaText' | 'changedLine' | 'changedGuaText' | 'specialUse';
  message: string;
  line?: number;
  lines?: number[];
  primaryLine?: number;
  hexagramId?: number;
}

export function useHexagramInterpretation(result: HexagramCastResult | null) {
  // 根据变爻数量确定重点解读规则
  const keyInterpretationInfo = useMemo(() => {
    if (!result) return null;
    const count = result.changingLines.length;
    
    switch (count) {
      case 0:
        return { 
          type: 'mainGuaText' as const, 
          message: "六爻皆为静爻，没有变爻。直接解读本卦的卦辞即可，代表事情的整体趋势。"
        };
      case 1:
        return { 
          type: 'singleLine' as const, 
          line: result.changingLines[0], 
          message: "只有一个爻变动。直接看这个动爻的爻辞，这是最核心的指引。"
        };
      case 2:
        return { 
          type: 'twoLines' as const, 
          lines: result.changingLines, 
          primaryLine: Math.max(...result.changingLines), 
          message: "两个爻变动时，以位置靠上的那个爻为主（如九二和九四同时变动，以九四为主），下方的爻作为辅助参考。"
        };
      case 3:
        return { 
          type: 'bothGuaText' as const, 
          message: "三个爻变动时，动爻本身的含义减弱，转而看本卦的整体卦辞和变卦的整体卦辞，两者结合解读。"
        };
      case 4:
        const unchangedPositions = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos));
        const unchangedInLower = unchangedPositions.filter(pos => pos <= 3)[0];
        const targetLine = unchangedInLower || unchangedPositions[0];
        return { 
          type: 'changedLine' as const, 
          line: targetLine, 
          message: "四个爻变动，只剩下两个爻没变。此时解读重点在变卦中位置靠下的那个不变爻的爻辞。"
        };
      case 5:
        const unchanged = [1, 2, 3, 4, 5, 6].filter(pos => !result.changingLines.includes(pos))[0];
        return { 
          type: 'changedLine' as const, 
          line: unchanged, 
          message: "五个爻变动，只剩下一个爻没变。此时解读重点就是变卦中唯一没变的那个爻的爻辞。"
        };
      case 6:
        if (result.hexagramId === 1 || result.hexagramId === 2) {
          return { 
            type: 'specialUse' as const, 
            hexagramId: result.hexagramId, 
            message: "六爻全变：① 如果本卦是乾卦，看\"用九\"爻辞；② 如果本卦是坤卦，看\"用六\"爻辞；③ 如果是其余62卦，直接看变卦的卦辞。"
          };
        }
        return { 
          type: 'changedGuaText' as const, 
          message: "六爻全变：① 如果本卦是乾卦，看\"用九\"爻辞；② 如果本卦是坤卦，看\"用六\"爻辞；③ 如果是其余62卦，直接看变卦的卦辞。"
        };
      default:
        return null;
    }
  }, [result]);

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
