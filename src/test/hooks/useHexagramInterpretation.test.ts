import { describe, it, expect } from 'vitest';
import { useHexagramInterpretation } from '../../hooks/useHexagramInterpretation';
import type { HexagramCastResult } from '../../utils/iching';

// Mock React hooks for testing
function renderHook<T>(hook: () => T): T {
  return hook();
}

describe('useHexagramInterpretation Hook', () => {
  
  describe('0个变爻', () => {
    it('应该返回本卦卦辞解读', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [],
        hexagramId: 1,
        changedHexagramId: null,
        binary: '111111'
      };
      
      const { keyInterpretationInfo, isKeyMainGua, isKeyChangedGua } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('mainGuaText');
      expect(keyInterpretationInfo?.message).toContain('六爻皆为静爻');
      expect(isKeyMainGua).toBe(true);
      expect(isKeyChangedGua).toBe(false);
    });
  });

  describe('1个变爻', () => {
    it('应该返回单爻解读', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [3],
        hexagramId: 1,
        changedHexagramId: 2,
        binary: '111111'
      };
      
      const { keyInterpretationInfo, isKeyLine } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('singleLine');
      expect(keyInterpretationInfo?.line).toBe(3);
      expect(keyInterpretationInfo?.message).toContain('只有一个爻变动');
      expect(isKeyLine(3)).toBe(true);
      expect(isKeyLine(1)).toBe(false);
    });
  });

  describe('2个变爻', () => {
    it('应该以上爻为主', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [2, 5],
        hexagramId: 1,
        changedHexagramId: 10,
        binary: '111111'
      };
      
      const { keyInterpretationInfo, isKeyLine } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('twoLines');
      expect(keyInterpretationInfo?.lines).toEqual([2, 5]);
      expect(keyInterpretationInfo?.primaryLine).toBe(5);
      expect(isKeyLine(2)).toBe(true);
      expect(isKeyLine(5)).toBe(true);
      expect(isKeyLine(1)).toBe(false);
    });
  });

  describe('3个变爻', () => {
    it('应该返回本卦和变卦卦辞解读', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [1, 3, 5],
        hexagramId: 1,
        changedHexagramId: 43,
        binary: '111111'
      };
      
      const { keyInterpretationInfo, isKeyMainGua, isKeyChangedGua } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('bothGuaText');
      expect(keyInterpretationInfo?.message).toContain('三个爻变动');
      expect(isKeyMainGua).toBe(true);
      expect(isKeyChangedGua).toBe(true);
    });
  });

  describe('4个变爻', () => {
    it('应该以下爻中不变爻为主', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [2, 4, 5, 6], // 不变的是1,3
        hexagramId: 1,
        changedHexagramId: 20,
        binary: '111111'
      };
      
      const { keyInterpretationInfo, isKeyLine } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('changedLine');
      expect(keyInterpretationInfo?.line).toBe(3); // 下爻中靠下的不变爻
      expect(isKeyLine(3)).toBe(true);
      expect(isKeyLine(1)).toBe(false);
    });
  });

  describe('5个变爻', () => {
    it('应该以唯一不变爻为主', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [1, 2, 3, 4, 5], // 不变的是6
        hexagramId: 1,
        changedHexagramId: 64,
        binary: '111111'
      };
      
      const { keyInterpretationInfo, isKeyLine } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('changedLine');
      expect(keyInterpretationInfo?.line).toBe(6);
      expect(isKeyLine(6)).toBe(true);
      expect(isKeyLine(1)).toBe(false);
    });
  });

  describe('6个变爻', () => {
    it('乾卦应该返回用九', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [1, 2, 3, 4, 5, 6],
        hexagramId: 1, // 乾卦
        changedHexagramId: 2,
        binary: '111111'
      };
      
      const { keyInterpretationInfo, isKeyChangedGua } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('specialUse');
      expect(keyInterpretationInfo?.hexagramId).toBe(1);
      expect(keyInterpretationInfo?.message).toContain('乾卦看"用九"');
      expect(isKeyChangedGua).toBe(true);
    });

    it('坤卦应该返回用六', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [1, 2, 3, 4, 5, 6],
        hexagramId: 2, // 坤卦
        changedHexagramId: 1,
        binary: '000000'
      };
      
      const { keyInterpretationInfo } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('specialUse');
      expect(keyInterpretationInfo?.hexagramId).toBe(2);
      expect(keyInterpretationInfo?.message).toContain('坤卦看"用六"');
    });

    it('其他卦应该返回变卦卦辞', () => {
      const result: HexagramCastResult = {
        lines: [],
        changingLines: [1, 2, 3, 4, 5, 6],
        hexagramId: 3, // 屯卦
        changedHexagramId: 50,
        binary: '010001'
      };
      
      const { keyInterpretationInfo, isKeyChangedGua } = renderHook(() => 
        useHexagramInterpretation(result)
      );
      
      expect(keyInterpretationInfo?.type).toBe('changedGuaText');
      expect(keyInterpretationInfo?.message).toContain('直接看变卦的卦辞');
      expect(isKeyChangedGua).toBe(true);
    });
  });

  describe('边界情况', () => {
    it('null结果应该返回null', () => {
      const { keyInterpretationInfo, isKeyLine, isKeyMainGua, isKeyChangedGua } = renderHook(() => 
        useHexagramInterpretation(null)
      );
      
      expect(keyInterpretationInfo).toBeNull();
      expect(isKeyLine(1)).toBe(false);
      expect(isKeyMainGua).toBe(false);
      expect(isKeyChangedGua).toBe(false);
    });
  });
});
