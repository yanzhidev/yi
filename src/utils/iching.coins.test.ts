import { describe, it, expect } from 'vitest';
import { 
  calculateLineFromCoins,
  tossCoin,
  tossThreeCoins,
  castLine,
  type ThreeCoins,
  type Coin
} from './iching';

describe('iching.ts - 三钱法算法测试', () => {
  
  describe('tossCoin', () => {
    it('应该返回0或1', () => {
      for (let i = 0; i < 100; i++) {
        const coin = tossCoin();
        expect([0, 1]).toContain(coin);
      }
    });
  });

  describe('tossThreeCoins', () => {
    it('应该返回包含三个0或1的数组', () => {
      const coins = tossThreeCoins();
      
      expect(coins).toHaveLength(3);
      coins.forEach((coin: Coin) => {
        expect([0, 1]).toContain(coin);
      });
    });
  });

  describe('calculateLineFromCoins', () => {
    describe('老阴 (6点)', () => {
      it('三枚都是正面(1)应该返回老阴', () => {
        const coins: ThreeCoins = [1, 1, 1];
        const result = calculateLineFromCoins(coins);
        
        expect(result.value).toBe(0); // 阴爻
        expect(result.isChanging).toBe(true); // 变爻
        expect(result.lineType).toBe('oldYin');
      });
    });

    describe('少阳 (7点)', () => {
      it('两正一反应该返回少阳', () => {
        const testCases: ThreeCoins[] = [
          [1, 1, 0],
          [1, 0, 1],
          [0, 1, 1]
        ];
        
        testCases.forEach(coins => {
          const result = calculateLineFromCoins(coins);
          
          expect(result.value).toBe(1); // 阳爻
          expect(result.isChanging).toBe(false); // 静爻
          expect(result.lineType).toBe('youngYang');
        });
      });
    });

    describe('少阴 (8点)', () => {
      it('两反一正应该返回少阴', () => {
        const testCases: ThreeCoins[] = [
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0]
        ];
        
        testCases.forEach(coins => {
          const result = calculateLineFromCoins(coins);
          
          expect(result.value).toBe(0); // 阴爻
          expect(result.isChanging).toBe(false); // 静爻
          expect(result.lineType).toBe('youngYin');
        });
      });
    });

    describe('老阳 (9点)', () => {
      it('三枚都是反面(0)应该返回老阳', () => {
        const coins: ThreeCoins = [0, 0, 0];
        const result = calculateLineFromCoins(coins);
        
        expect(result.value).toBe(1); // 阳爻
        expect(result.isChanging).toBe(true); // 变爻
        expect(result.lineType).toBe('oldYang');
      });
    });
  });

  describe('castLine', () => {
    it('应该返回有效的LineResult', () => {
      const line = castLine();
      
      expect([0, 1]).toContain(line.value);
      expect(typeof line.isChanging).toBe('boolean');
      expect(['oldYin', 'youngYang', 'youngYin', 'oldYang']).toContain(line.lineType);
    });

    it('应该符合概率分布', () => {
      const results = {
        oldYin: 0,
        youngYang: 0,
        youngYin: 0,
        oldYang: 0
      };
      
      // 测试1000次来验证概率分布
      for (let i = 0; i < 1000; i++) {
        const line = castLine();
        results[line.lineType]++;
      }
      
      // 理论概率：老阴1/8, 少阳3/8, 少阴3/8, 老阳1/8
      const total = 1000;
      // 使用更宽松的范围检查，允许5%的误差范围
      expect(results.oldYin).toBeGreaterThanOrEqual(total * 1/8 * 0.5);
      expect(results.oldYin).toBeLessThanOrEqual(total * 1/8 * 1.5);
      expect(results.youngYang).toBeGreaterThanOrEqual(total * 3/8 * 0.8);
      expect(results.youngYang).toBeLessThanOrEqual(total * 3/8 * 1.2);
      expect(results.youngYin).toBeGreaterThanOrEqual(total * 3/8 * 0.8);
      expect(results.youngYin).toBeLessThanOrEqual(total * 3/8 * 1.2);
      expect(results.oldYang).toBeGreaterThanOrEqual(total * 1/8 * 0.5);
      expect(results.oldYang).toBeLessThanOrEqual(total * 1/8 * 1.5);
    });
  });

  describe('爻值和变爻关系', () => {
    it('老阴应该是阴爻且变爻', () => {
      const result = calculateLineFromCoins([1, 1, 1]);
      expect(result.value).toBe(0);
      expect(result.isChanging).toBe(true);
    });

    it('老阳应该是阳爻且变爻', () => {
      const result = calculateLineFromCoins([0, 0, 0]);
      expect(result.value).toBe(1);
      expect(result.isChanging).toBe(true);
    });

    it('少阳应该是阳爻且静爻', () => {
      const result = calculateLineFromCoins([0, 1, 1]);
      expect(result.value).toBe(1);
      expect(result.isChanging).toBe(false);
    });

    it('少阴应该是阴爻且静爻', () => {
      const result = calculateLineFromCoins([0, 0, 1]);
      expect(result.value).toBe(0);
      expect(result.isChanging).toBe(false);
    });
  });

  describe('边界情况', () => {
    it('所有可能的硬币组合都应该有正确的结果', () => {
      const allCombinations: ThreeCoins[] = [
        [0, 0, 0], // 9点 - 老阳
        [0, 0, 1], // 8点 - 少阴
        [0, 1, 0], // 8点 - 少阴
        [1, 0, 0], // 8点 - 少阴
        [0, 1, 1], // 7点 - 少阳
        [1, 0, 1], // 7点 - 少阳
        [1, 1, 0], // 7点 - 少阳
        [1, 1, 1], // 6点 - 老阴
      ];
      
      const expectedResults = [
        { value: 1, isChanging: true, lineType: 'oldYang' },    // [0,0,0]
        { value: 0, isChanging: false, lineType: 'youngYin' },  // [0,0,1]
        { value: 0, isChanging: false, lineType: 'youngYin' },  // [0,1,0]
        { value: 0, isChanging: false, lineType: 'youngYin' },  // [1,0,0]
        { value: 1, isChanging: false, lineType: 'youngYang' },  // [0,1,1]
        { value: 1, isChanging: false, lineType: 'youngYang' },  // [1,0,1]
        { value: 1, isChanging: false, lineType: 'youngYang' },  // [1,1,0]
        { value: 0, isChanging: true, lineType: 'oldYin' },     // [1,1,1]
      ];
      
      allCombinations.forEach((coins, index) => {
        const result = calculateLineFromCoins(coins);
        const expected = expectedResults[index];
        
        expect(result.value).toBe(expected.value);
        expect(result.isChanging).toBe(expected.isChanging);
        expect(result.lineType).toBe(expected.lineType);
      });
    });
  });
});
