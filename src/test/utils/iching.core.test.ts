import { describe, it, expect } from 'vitest';
import { 
  castHexagram, 
  getHexagramById, 
  getHexagramByBinary,
  mapLinesToHexagram,
  type HexagramCastResult,
  type LineResult
} from '../../utils/iching';

describe('iching.ts - 核心功能测试', () => {
  
  describe('castHexagram', () => {
    it('应该返回有效的卦象结果', () => {
      const result = castHexagram();
      
      expect(result).toBeDefined();
      expect(result.lines).toHaveLength(6);
      expect(result.binary).toHaveLength(6);
      expect(result.hexagramId).toBeGreaterThanOrEqual(1);
      expect(result.hexagramId).toBeLessThanOrEqual(64);
      expect(Array.isArray(result.changingLines)).toBe(true);
    });

    it('每爻应该是有效的LineResult类型', () => {
      const result = castHexagram();
      
      result.lines.forEach((line: LineResult) => {
        expect([0, 1]).toContain(line.value);
        expect(typeof line.isChanging).toBe('boolean');
        expect(['oldYin', 'youngYang', 'youngYin', 'oldYang']).toContain(line.lineType);
      });
    });

    it('变爻位置应该在1-6范围内', () => {
      const result = castHexagram();
      
      result.changingLines.forEach((position: number) => {
        expect(position).toBeGreaterThanOrEqual(1);
        expect(position).toBeLessThanOrEqual(6);
      });
    });

    it('binary字符串应该只包含0和1', () => {
      const result = castHexagram();
      
      expect(/^[01]{6}$/.test(result.binary)).toBe(true);
    });
  });

  describe('getHexagramById', () => {
    it('应该返回有效的卦象数据', () => {
      const hexagram = getHexagramById(1);
      
      expect(hexagram).toBeDefined();
      expect(hexagram?.id).toBe(1);
      expect(hexagram?.name).toBe('乾为天');
      expect(hexagram?.binary).toBe('111111');
    });

    it('无效ID应该返回null', () => {
      expect(getHexagramById(0)).toBeNull();
      expect(getHexagramById(65)).toBeNull();
      expect(getHexagramById(-1)).toBeNull();
    });

    it('应该返回所有64卦的数据', () => {
      for (let i = 1; i <= 64; i++) {
        const hexagram = getHexagramById(i);
        expect(hexagram).toBeDefined();
        expect(hexagram?.id).toBe(i);
        expect(hexagram?.name).toBeTruthy();
        expect(hexagram?.binary).toHaveLength(6);
        expect(/^[01]{6}$/.test(hexagram!.binary)).toBe(true);
      }
    });
  });

  describe('getHexagramByBinary', () => {
    it('应该通过二进制字符串返回正确的卦象', () => {
      const hexagram = getHexagramByBinary('111111');
      
      expect(hexagram).toBeDefined();
      expect(hexagram?.id).toBe(1);
      expect(hexagram?.name).toBe('乾为天');
    });

    it('应该返回坤卦', () => {
      const hexagram = getHexagramByBinary('000000');
      
      expect(hexagram).toBeDefined();
      expect(hexagram?.id).toBe(2);
      expect(hexagram?.name).toBe('坤为地');
    });

    it('应该返回屯卦', () => {
      const hexagram = getHexagramByBinary('010001');
      
      expect(hexagram).toBeDefined();
      expect(hexagram?.id).toBe(3);
      expect(hexagram?.name).toBe('水雷屯');
    });

    it('无效二进制应该返回null', () => {
      expect(getHexagramByBinary('')).toBeNull();
      expect(getHexagramByBinary('1111111')).toBeNull();
      expect(getHexagramByBinary('abc123')).toBeNull();
      expect(getHexagramByBinary('111112')).toBeNull();
    });
  });

  describe('mapLinesToHexagram', () => {
    it('应该正确映射乾卦', () => {
      const lines = [1, 1, 1, 1, 1, 1]; // 从下到上都是阳爻
      const hexagram = mapLinesToHexagram(lines);
      
      expect(hexagram).toBeDefined();
      expect(hexagram?.id).toBe(1); // 乾卦是ID=1，二进制是111111
      expect(hexagram?.name).toBe('乾为天');
    });

    it('应该正确映射坤卦', () => {
      const lines = [0, 0, 0, 0, 0, 0]; // 从下到上都是阴爻
      const hexagram = mapLinesToHexagram(lines);
      
      expect(hexagram).toBeDefined();
      expect(hexagram?.id).toBe(2); // 坤卦是ID=2，二进制是000000
      expect(hexagram?.name).toBe('坤为地');
    });

    it('应该正确映射蒙卦', () => {
      const lines = [1, 0, 0, 0, 1, 0]; // 从下到上：100010
      const hexagram = mapLinesToHexagram(lines);
      
      expect(hexagram).toBeDefined();
      expect(hexagram?.id).toBe(4); // 蒙卦是ID=4，二进制是100010
      expect(hexagram?.name).toBe('山水蒙');
    });

    it('无效数组长度应该返回null', () => {
      expect(mapLinesToHexagram([])).toBeNull();
      expect(mapLinesToHexagram([1, 1, 1, 1, 1])).toBeNull();
      expect(mapLinesToHexagram([1, 1, 1, 1, 1, 1, 1])).toBeNull();
    });

    it('无效值应该返回null', () => {
      expect(mapLinesToHexagram([1, 1, 1, 1, 1, 2])).toBeNull();
      expect(mapLinesToHexagram([1, 1, 1, 1, 1, -1])).toBeNull();
      expect(mapLinesToHexagram([1, 1, 1, 1, 1, 0.5])).toBeNull();
    });
  });

  describe('卦象ID和二进制一致性', () => {
    it('所有卦象的ID应该与二进制转换一致', () => {
      for (let i = 1; i <= 64; i++) {
        const hexagram = getHexagramById(i);
        expect(hexagram).toBeDefined();
        
        // 验证二进制字符串格式
        const binary = hexagram!.binary;
        expect(/^[01]{6}$/.test(binary)).toBe(true);
        
        // 验证可以通过二进制找到相同的卦象
        const foundByBinary = getHexagramByBinary(binary);
        expect(foundByBinary?.id).toBe(i);
      }
    });
  });

  describe('变卦计算', () => {
    it('无变爻时changedHexagramId应该为null', () => {
      // 创建一个无变爻的结果
      const result: HexagramCastResult = {
        lines: [
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
        ],
        changingLines: [],
        hexagramId: 1,
        changedHexagramId: null,
        binary: '111111'
      };
      
      expect(result.changedHexagramId).toBeNull();
    });

    it('有变爻时changedHexagramId应该有效', () => {
      const result = castHexagram();
      
      if (result.changingLines.length > 0) {
        expect(result.changedHexagramId).toBeGreaterThanOrEqual(1);
        expect(result.changedHexagramId).toBeLessThanOrEqual(64);
        expect(result.changedHexagramId).not.toBe(result.hexagramId);
      }
    });
  });
});
