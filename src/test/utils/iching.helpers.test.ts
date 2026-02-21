import { describe, it, expect } from 'vitest';
import { 
  getChangingLineInterpretations,
  getChangedLines,
  getLineSymbol,
  getLineDescription,
  getDaXiangImage,
  type LineInterpretation,
  type LineResult
} from '../../utils/iching';

describe('iching.ts - 辅助功能测试', () => {
  
  describe('getChangingLineInterpretations', () => {
    it('应该返回指定卦象的爻辞解读', () => {
      const interpretations = getChangingLineInterpretations(1, [1]);
      
      expect(Array.isArray(interpretations)).toBe(true);
      expect(interpretations).toHaveLength(1);
      
      const interpretation = interpretations[0];
      expect(interpretation.position).toBe(1);
      expect(interpretation.yao).toBeTruthy();
      expect(interpretation.text).toBeTruthy();
      expect(interpretation.xiang).toBeTruthy();
    });

    it('应该返回多个爻的解读', () => {
      const interpretations = getChangingLineInterpretations(1, [1, 3, 5]);
      
      expect(interpretations).toHaveLength(3);
      
      const positions = interpretations.map(interp => interp.position);
      expect(positions).toContain(1);
      expect(positions).toContain(3);
      expect(positions).toContain(5);
    });

    it('每个解读应该包含必需的字段', () => {
      const interpretations = getChangingLineInterpretations(1, [1]);
      
      interpretations.forEach((interp: LineInterpretation) => {
        expect(interp).toHaveProperty('position');
        expect(interp).toHaveProperty('yao');
        expect(interp).toHaveProperty('text');
        expect(interp).toHaveProperty('xiang');
        expect(typeof interp.position).toBe('number');
        expect(typeof interp.yao).toBe('string');
        expect(typeof interp.text).toBe('string');
        expect(typeof interp.xiang).toBe('string');
      });
    });
  });

  describe('getChangedLines', () => {
    it('应该正确处理变爻转换', () => {
      const lines: LineResult[] = [
        { value: 1, isChanging: true, lineType: 'oldYang' },  // 老阳变阴
        { value: 0, isChanging: false, lineType: 'youngYin' }, // 少阴不变
        { value: 1, isChanging: false, lineType: 'youngYang' }, // 少阳不变
        { value: 0, isChanging: true, lineType: 'oldYin' },   // 老阴变阳
        { value: 1, isChanging: false, lineType: 'youngYang' }, // 少阳不变
        { value: 0, isChanging: false, lineType: 'youngYin' }, // 少阴不变
      ];
      
      const changedLines = getChangedLines(lines);
      
      expect(changedLines).toHaveLength(6);
      expect(changedLines[0]).toBe(0); // 老阳变阴
      expect(changedLines[1]).toBe(0); // 少阴不变
      expect(changedLines[2]).toBe(1); // 少阳不变
      expect(changedLines[3]).toBe(1); // 老阴变阳
      expect(changedLines[4]).toBe(1); // 少阳不变
      expect(changedLines[5]).toBe(0); // 少阴不变
    });

    it('无变爻时应该保持原值', () => {
      const lines: LineResult[] = [
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
      ];
      
      const changedLines = getChangedLines(lines);
      
      expect(changedLines).toEqual([1, 0, 1, 0, 1, 0]);
    });
  });

  describe('getLineSymbol', () => {
    it('应该返回正确的爻符号', () => {
      const testCases = [
        { value: 0, isChanging: false, expected: '⚋' },
        { value: 1, isChanging: false, expected: '⚊' },
        { value: 0, isChanging: true, expected: '⚋' },
        { value: 1, isChanging: true, expected: '⚊' },
      ];
      
      testCases.forEach(({ value, isChanging, expected }) => {
        const line: LineResult = { value: value as 0 | 1, isChanging, lineType: 'youngYang' };
        expect(getLineSymbol(line)).toBe(expected);
      });
    });
  });

  describe('getLineDescription', () => {
    it('应该返回正确的爻描述', () => {
      const testCases = [
        { lineType: 'oldYin', expected: '老阴（变爻）' },
        { lineType: 'youngYang', expected: '少阳' },
        { lineType: 'youngYin', expected: '少阴' },
        { lineType: 'oldYang', expected: '老阳（变爻）' },
      ];
      
      testCases.forEach(({ lineType, expected }) => {
        const line: LineResult = { value: 0, isChanging: false, lineType: lineType as 'oldYang' | 'youngYin' | 'youngYang' | 'oldYin' };
        expect(getLineDescription(line)).toBe(expected);
      });
    });
  });

  describe('getDaXiangImage', () => {
    it('应该返回乾卦的大象图信息', () => {
      const result = getDaXiangImage('111111');
      
      expect(result.upper).toBe('天');
      expect(result.lower).toBe('天');
      expect(result.description).toBe('☀️ 天在天上');
    });

    it('应该返回坤卦的大象图信息', () => {
      const result = getDaXiangImage('000000');
      
      expect(result.upper).toBe('地');
      expect(result.lower).toBe('地');
      expect(result.description).toBe('🌍 地在地上');
    });

    it('应该返回屯卦的大象图信息', () => {
      const result = getDaXiangImage('010001');
      
      expect(result.upper).toBe('水');
      expect(result.lower).toBe('雷');
      expect(result.description).toBe('💧 水在雷上');
    });

    it('应该处理所有八卦组合', () => {
      const trigrams = {
        '111': '天', '000': '地', '001': '雷', '010': '水',
        '011': '山', '100': '风', '101': '火', '110': '泽'
      };
      
      Object.entries(trigrams).forEach(([upperBinary, upperName]) => {
        Object.entries(trigrams).forEach(([lowerBinary, lowerName]) => {
          const binary = upperBinary + lowerBinary;
          const result = getDaXiangImage(binary);
          
          expect(result.upper).toBe(upperName);
          expect(result.lower).toBe(lowerName);
          expect(result.description).toBeTruthy();
        });
      });
    });

    it('无效二进制应该返回默认值', () => {
      const result = getDaXiangImage('999999');
      
      expect(result.upper).toBe('象');
      expect(result.lower).toBe('象');
      expect(result.description).toBe('❓ 象在象上');
    });

    it('空字符串应该返回默认值', () => {
      const result = getDaXiangImage('');
      
      expect(result.upper).toBe('象');
      expect(result.lower).toBe('象');
      expect(result.description).toBe('❓ 象在象上');
    });
  });

  describe('边界情况', () => {
    it('getChangingLineInterpretations应该处理空数组', () => {
      const interpretations = getChangingLineInterpretations(1, []);
      expect(interpretations).toEqual([]);
    });

    it('getChangingLineInterpretations应该处理重复位置', () => {
      const interpretations = getChangingLineInterpretations(1, [1, 1, 1]);
      expect(interpretations).toHaveLength(3);
      interpretations.forEach(interp => {
        expect(interp.position).toBe(1);
      });
    });

    it('getDaXiangImage应该处理部分无效二进制', () => {
      const result = getDaXiangImage('111abc');
      
      expect(result.upper).toBe('天'); // '111'有效
      expect(result.lower).toBe('象'); // 'abc'无效，返回默认
    });
  });
});
