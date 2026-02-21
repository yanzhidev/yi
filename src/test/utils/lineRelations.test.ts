import { describe, it, expect } from 'vitest';
import { 
  isDangWei, 
  getDangWeiText, 
  getYingRelation, 
  getChengChengRelation, 
  getLinePositionAdvice,
  analyzeLineRelation,
  analyzeChangingLineRelations
} from '../../utils/lineRelations';
import type { LineResult } from '../../utils/iching';

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
      expect(getYingRelation(1, testLines, 'zh-CN')).toBe("阴阳相应，内外协调，有助益之象");
      
      // 二爻与五爻：阴爻(0)与阳爻(1)相应
      expect(getYingRelation(2, testLines, 'zh-CN')).toBe("阴阳相应，内外协调，有助益之象");
      
      // 三爻与上爻：阳爻(1)与阴爻(0)相应
      expect(getYingRelation(3, testLines, 'zh-CN')).toBe("阴阳相应，内外协调，有助益之象");
    });
    
    it('应该正确分析同性相斥且当位的情况', () => {
      // 创建同性相斥但当位的测试数据
      const sameGenderLines: LineResult[] = [
        { value: 1, isChanging: false, lineType: 'youngYang' },  // 初九（当位）
        { value: 0, isChanging: false, lineType: 'youngYin' },  // 六二（当位）
        { value: 1, isChanging: false, lineType: 'youngYang' },  // 九三（当位）
        { value: 1, isChanging: false, lineType: 'youngYang' },  // 九四（不当位）
        { value: 0, isChanging: false, lineType: 'youngYin' },  // 六五（不当位）
        { value: 0, isChanging: false, lineType: 'youngYin' }   // 上六（当位）
      ];
      
      // 初爻与四爻：阳爻与阳爻相斥，但初爻当位
      expect(getYingRelation(1, sameGenderLines, 'zh-CN')).toBe("虽无外应，但自身得位得正，可稳中求进");
      
      // 四爻与初爻：阳爻与阳爻相斥，且四爻不当位
      expect(getYingRelation(4, sameGenderLines, 'zh-CN')).toBe("同性相斥，缺乏呼应，需主动寻求支援");
    });
  });

  describe('getChengChengRelation', () => {
    it('应该正确分析承乘关系', () => {
      // 使用原来的测试数据：[1,0,1,0,1,0]
      // 六四（第4位阴爻）：承九五（第5位阳爻）+ 乘九三（第3位阳爻）
      const result = getChengChengRelation(4, testLines, 'zh-CN');
      expect(result).toContain("四爻承五爻，⚖️ 阴承阳：柔承刚 - 顺承得助，吉。阴爻在下承托阳爻，如臣辅君、妻助夫，柔顺得宜之象");
      expect(result).toContain("四爻乘三爻，❗ 阴乘阳：柔乘刚 - 僭越不顺，最凶。阴爻在上乘凌阳爻，如妇制夫、臣欺君，僭越不顺之象");
    });
    
    it('应该正确分析所有承乘关系类型', () => {
      // 创建包含各种关系的测试数据
      const comprehensiveLines: LineResult[] = [
        { value: 1, isChanging: false, lineType: 'youngYang' },  // 初九
        { value: 0, isChanging: false, lineType: 'youngYin' },  // 六二
        { value: 1, isChanging: false, lineType: 'youngYang' },  // 九三
        { value: 1, isChanging: false, lineType: 'youngYang' },  // 九四
        { value: 0, isChanging: false, lineType: 'youngYin' },  // 六五
        { value: 0, isChanging: false, lineType: 'youngYin' }   // 上六
      ];
      
      // 六二承九三：阴承阳（最吉）- 包含详细解释
      expect(getChengChengRelation(2, comprehensiveLines, 'zh-CN'))
        .toContain("二爻承三爻，⚖️ 阴承阳：柔承刚 - 顺承得助，吉。阴爻在下承托阳爻，如臣辅君、妻助夫，柔顺得宜之象");
      
      // 九四承六五：阳承阴（凶）
      expect(getChengChengRelation(4, comprehensiveLines, 'zh-CN'))
        .toContain("四爻承五爻，⚠️ 阳承阴：刚承柔 - 屈居其下，位不当");
      
      // 九四乘九三：阳乘阳（凶）
      expect(getChengChengRelation(4, comprehensiveLines, 'zh-CN'))
        .toContain("四爻乘三爻，⚡ 阳乘阳：刚乘刚 - 两刚相敌，多冲突");
      
      // 六五乘九四：阴乘阳（最凶）- 包含详细解释
      expect(getChengChengRelation(5, comprehensiveLines, 'zh-CN'))
        .toContain("五爻乘四爻，❗ 阴乘阳：柔乘刚 - 僭越不顺，最凶。阴爻在上乘凌阳爻，如妇制夫、臣欺君，僭越不顺之象");
    });
  });

  describe('getLinePositionAdvice', () => {
    it('应该返回基于爻位的现代解读', () => {
      const advice = getLinePositionAdvice(1, 1, "乾为天", 'zh-CN');
      expect(advice).toContain("乾为天的背景下");
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
      expect(analysis.yingRelation).toBe("阴阳相应，内外协调，有助益之象");
      expect(analysis.positionAdvice).toContain("乾为天的背景下");
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
