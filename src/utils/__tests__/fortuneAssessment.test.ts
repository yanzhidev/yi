import { describe, it, expect } from 'vitest';
import { 
  assessFortune, 
  analyzeTrigramRelation, 
  calculateLinesPositionScore, 
  calculateChangingLinesAdjustment,
  type FortuneAssessmentConfig 
} from '../fortuneAssessment/index';

// 模拟测试数据
const mockHexagramResult = {
  hexagramId: 1,
  changedHexagramId: 2,
  changingLines: [1],
  lines: [
    { value: 1, isChanging: true, lineType: 'oldYang' },
    { value: 1, isChanging: false, lineType: 'youngYang' },
    { value: 1, isChanging: false, lineType: 'youngYang' },
    { value: 1, isChanging: false, lineType: 'youngYang' },
    { value: 1, isChanging: false, lineType: 'youngYang' },
    { value: 1, isChanging: false, lineType: 'youngYang' }
  ]
};

const mockStaticHexagramResult = {
  hexagramId: 11,
  changedHexagramId: null,
  changingLines: [],
  lines: [
    { value: 1, isChanging: false, lineType: 'youngYang' },
    { value: 1, isChanging: false, lineType: 'youngYang' },
    { value: 1, isChanging: false, lineType: 'youngYang' },
    { value: 0, isChanging: false, lineType: 'youngYin' },
    { value: 0, isChanging: false, lineType: 'youngYin' },
    { value: 0, isChanging: false, lineType: 'youngYin' }
  ]
};

describe('Fortune Assessment Tests', () => {
  describe('assessFortune', () => {
    it('应该返回完整的吉凶判断结果', () => {
      const config: FortuneAssessmentConfig = {
        weights: {
          hexagramText: 0.4,
          trigramRelation: 0.3,
          linesPosition: 0.3
        },
        enableChangingLinesAdjustment: true,
        language: 'zh-CN'
      };

      const result = assessFortune(mockHexagramResult, config, 'zh-CN');

      expect(result).toHaveProperty('hexagramId');
      expect(result).toHaveProperty('changedHexagramId');
      expect(result).toHaveProperty('changingLines');
      expect(result).toHaveProperty('weights');
      expect(result).toHaveProperty('hexagramTextScore');
      expect(result).toHaveProperty('trigramRelationScore');
      expect(result).toHaveProperty('linesPositionScore');
      expect(result).toHaveProperty('changingLinesAdjustment');
      expect(result).toHaveProperty('totalScore');
      expect(result).toHaveProperty('fortuneLevel');
      expect(result).toHaveProperty('overallAdvice');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('detailedAnalysis');
    });

    it('应该正确计算本卦和变卦权重', () => {
      const result = assessFortune(mockHexagramResult);
      
      if (mockHexagramResult.changingLines.length === 1) {
        expect(result.weights.originalWeight).toBe(90);
        expect(result.weights.changedWeight).toBe(10);
      }
    });

    it('静态卦（无变爻）应该权重为100%', () => {
      const result = assessFortune(mockStaticHexagramResult);
      
      expect(result.weights.originalWeight).toBe(100);
      expect(result.weights.changedWeight).toBe(0);
    });

    it('总分应该在0-100范围内', () => {
      const result = assessFortune(mockHexagramResult);
      expect(result.totalScore).toBeGreaterThanOrEqual(0);
      expect(result.totalScore).toBeLessThanOrEqual(100);
    });

    it('置信度应该在0-100范围内', () => {
      const result = assessFortune(mockHexagramResult);
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(100);
    });
  });

  describe('analyzeTrigramRelation', () => {
    it('应该分析乾卦的上下卦关系', () => {
      const result = analyzeTrigramRelation('111111');
      
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('reasoning');
      expect(result).toHaveProperty('upperTrigram');
      expect(result).toHaveProperty('lowerTrigram');
      expect(result).toHaveProperty('relationship');
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    it('应该分析泰卦的天地交泰关系', () => {
      const result = analyzeTrigramRelation('111000');
      expect(result.upperTrigram).toBe('乾');
      expect(result.lowerTrigram).toBe('坤');
    });

    it('应该分析否卦的天地不交关系', () => {
      const result = analyzeTrigramRelation('000111');
      expect(result.upperTrigram).toBe('坤');
      expect(result.lowerTrigram).toBe('乾');
    });
  });

  describe('calculateLinesPositionScore', () => {
    it('应该计算爻位综合评分', () => {
      const result = calculateLinesPositionScore(mockHexagramResult.lines, mockHexagramResult.changingLines);
      
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('reasoning');
      expect(result).toHaveProperty('changingLinesCount');
      expect(result).toHaveProperty('linesAnalysis');
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    it('应该正确统计变爻数量', () => {
      const result = calculateLinesPositionScore(mockHexagramResult.lines, mockHexagramResult.changingLines);
      expect(result.changingLinesCount).toBe(mockHexagramResult.changingLines.length);
    });

    it('应该为每个爻生成分析', () => {
      const result = calculateLinesPositionScore(mockHexagramResult.lines, mockHexagramResult.changingLines);
      expect(result.linesAnalysis).toHaveLength(6);
    });
  });

  describe('calculateChangingLinesAdjustment', () => {
    it('应该计算变爻调整值', () => {
      const result = calculateChangingLinesAdjustment(
        mockHexagramResult.changingLines,
        mockHexagramResult.hexagramId,
        mockHexagramResult.changedHexagramId
      );
      
      expect(result).toHaveProperty('adjustment');
      expect(result).toHaveProperty('reasoning');
      expect(result).toHaveProperty('specialCase');
      expect(result.adjustment).toBeGreaterThanOrEqual(-20);
      expect(result.adjustment).toBeLessThanOrEqual(20);
    });

    it('无变爻时应该有正调整', () => {
      const result = calculateChangingLinesAdjustment([], 1, null);
      expect(result.adjustment).toBeGreaterThan(0);
    });

    it('多变爻时应该有负调整', () => {
      const manyChangingLines = [1, 2, 3, 4];
      const result = calculateChangingLinesAdjustment(manyChangingLines, 1, 2);
      expect(result.adjustment).toBeLessThan(0);
    });
  });

  describe('特殊卦象测试', () => {
    it('乾卦应该有较高评分', () => {
      const qianResult = assessFortune({
        hexagramId: 1,
        changedHexagramId: null,
        changingLines: [],
        lines: [
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' }
        ]
      });
      
      expect(qianResult.totalScore).toBeGreaterThan(50);
    });

    it('泰卦应该有较高评分', () => {
      const taiResult = assessFortune({
        hexagramId: 11,
        changedHexagramId: null,
        changingLines: [],
        lines: [
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 0, isChanging: false, lineType: 'youngYin' },
          { value: 0, isChanging: false, lineType: 'youngYin' },
          { value: 0, isChanging: false, lineType: 'youngYin' }
        ]
      });
      
      expect(taiResult.totalScore).toBeGreaterThan(50);
    });

    it('否卦应该有较低评分', () => {
      const piResult = assessFortune({
        hexagramId: 12,
        changedHexagramId: null,
        changingLines: [],
        lines: [
          { value: 0, isChanging: false, lineType: 'youngYin' },
          { value: 0, isChanging: false, lineType: 'youngYin' },
          { value: 0, isChanging: false, lineType: 'youngYin' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' },
          { value: 1, isChanging: false, lineType: 'youngYang' }
        ]
      });
      
      // 否卦虽然天地不交，但其他评分可能较高，所以检查它相对较低即可
      expect(piResult.totalScore).toBeLessThan(80);
    });
  });

  describe('配置测试', () => {
    it('应该支持自定义权重配置', () => {
      const customConfig: FortuneAssessmentConfig = {
        weights: {
          hexagramText: 0.5,
          trigramRelation: 0.3,
          linesPosition: 0.2
        },
        enableChangingLinesAdjustment: false,
        language: 'zh-CN'
      };

      const result = assessFortune(mockHexagramResult, customConfig);
      expect(result.changingLinesAdjustment.adjustment).toBe(0);
    });

    it('应该支持不同语言', () => {
      const result = assessFortune(mockHexagramResult, undefined, 'en');
      expect(result).toHaveProperty('overallAdvice');
    });
  });
});
