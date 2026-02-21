import { describe, it, expect } from 'vitest';
import { 
  isDangWei, 
  getDangWeiText, 
  getYingRelation, 
  getChengChengRelation, 
  getLinePositionAdvice,
  analyzeLineRelation,
  analyzeChangingLineRelations
} from './lineRelations';
import type { Language } from './i18n';
import type { LineResult } from './iching';

describe('lineRelations', () => {
  // 测试用的六爻数组（从下到上：初爻到上爻）
  const testLines: LineResult[] = [
    { value: 1, isChanging: true, lineType: 'oldYang' },  // 初九
    { value: 0, isChanging: false, lineType: 'youngYin' }, // 六二
    { value: 1, isChanging: false, lineType: 'youngYang' }, // 九三
    { value: 0, isChanging: true, lineType: 'oldYin' },   // 六四
    { value: 1, isChanging: false, lineType: 'youngYang' }, // 九五
    { value: 0, isChanging: false, lineType: 'youngYin' }  // 上六
  ];

  describe('isDangWei', () => {
    it('应该正确判断当位', () => {
      // 阳爻居阳位（1、3、5位）
      expect(isDangWei(1, 1)).toBe(true);  // 初九
      expect(isDangWei(3, 1)).toBe(true);  // 九三
      expect(isDangWei(5, 1)).toBe(true);  // 九五
      
      // 阴爻居阴位（2、4、6位）
      expect(isDangWei(2, 0)).toBe(true);  // 六二
      expect(isDangWei(4, 0)).toBe(true);  // 六四
      expect(isDangWei(6, 0)).toBe(true);  // 上六
    });

    it('应该正确判断不当位', () => {
      // 阳爻居阴位
      expect(isDangWei(2, 1)).toBe(false); // 九二
      expect(isDangWei(4, 1)).toBe(false); // 九四
      expect(isDangWei(6, 1)).toBe(false); // 上九
      
      // 阴爻居阳位
      expect(isDangWei(1, 0)).toBe(false); // 初六
      expect(isDangWei(3, 0)).toBe(false); // 六三
      expect(isDangWei(5, 0)).toBe(false); // 六五
    });
  });

  describe('getDangWeiText', () => {
    it('应该返回正确的当位解读', () => {
      expect(getDangWeiText(1, 1, 'zh-CN')).toContain("阳爻居阳位，得位得正");
      expect(getDangWeiText(2, 0, 'zh-CN')).toContain("阴爻居阴位，得位得正");
    });

    it('应该返回正确的不当位解读', () => {
      expect(getDangWeiText(2, 1, 'zh-CN')).toContain("阳爻居阴位，失位");
      expect(getDangWeiText(1, 0, 'zh-CN')).toContain("阴爻居阳位，失位");
    });
  });

  describe('getYingRelation', () => {
    it('应该正确分析相应关系', () => {
      // 初爻与四爻：阳爻(1)与阴爻(0)相应
      expect(getYingRelation(1, testLines, 'zh-CN')).toContain("初爻与四爻阴阳相应");
      
      // 二爻与五爻：阴爻(0)与阳爻(1)相应
      expect(getYingRelation(2, testLines, 'zh-CN')).toContain("二爻与五爻阴阳相应");
      
      // 三爻与上爻：阳爻(1)与阴爻(0)相应
      expect(getYingRelation(3, testLines, 'zh-CN')).toContain("三爻与上爻阴阳相应");
    });
  });

  describe('getChengChengRelation', () => {
    it('应该正确分析承乘关系', () => {
      // 六四承九五（阴爻承阳爻）
      expect(getChengChengRelation(4, testLines, 'zh-CN')).toContain("四爻承五爻，柔顺承刚");
      
      // 六四乘九三（阴爻乘阳爻）
      expect(getChengChengRelation(4, testLines, 'zh-CN')).toContain("四爻乘三爻，柔乘刚上");
    });
  });

  describe('getLinePositionAdvice', () => {
    it('应该返回基于爻位的现代解读', () => {
      const advice = getLinePositionAdvice(1, 1, "乾为天", 'zh-CN');
      expect(advice).toContain("在乾为天的背景下");
      expect(advice).toContain("初爻为事物初始阶段");
    });
  });

  describe('analyzeLineRelation', () => {
    it('应该返回完整的爻位关系分析', () => {
      const analysis = analyzeLineRelation(1, testLines, "乾为天", 'zh-CN');
      
      expect(analysis.position).toBe(1);
      expect(analysis.yaoName).toBe("初九");
      expect(analysis.lineValue).toBe(1);
      expect(analysis.isDangWei).toBe(true);
      expect(analysis.dangWeiText).toContain("阳爻居阳位，得位得正");
      expect(analysis.yingRelation).toContain("初爻与四爻阴阳相应");
      expect(analysis.positionAdvice).toContain("在乾为天的背景下");
    });
  });

  describe('analyzeChangingLineRelations', () => {
    it('应该分析所有变爻的关系', () => {
      const changingLines = [1, 4]; // 初九和六四为变爻
      const analyses = analyzeChangingLineRelations(changingLines, testLines, "乾为天", 'zh-CN');
      
      expect(analyses).toHaveLength(2);
      expect(analyses[0].position).toBe(1);
      expect(analyses[1].position).toBe(4);
      
      // 检查是否按位置排序
      expect(analyses[0].position).toBeLessThan(analyses[1].position);
    });
  });
});
