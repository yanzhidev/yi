import type { Language } from '../i18n';

/**
 * 吉凶等级枚举
 */
export const FortuneLevel = {
  EXTREMELY_AUSPICIOUS: 'extremely_auspicious',  // 大吉
  VERY_AUSPICIOUS: 'very_auspicious',          // 吉
  AUSPICIOUS: 'auspicious',                     // 小吉
  NEUTRAL: 'neutral',                           // 中平
  INAUSPICIOUS: 'inauspicious',                 // 小凶
  VERY_INAUSPICIOUS: 'very_inauspicious',      // 凶
  EXTREMELY_INAUSPICIOUS: 'extremely_inauspicious' // 大凶
} as const;

export type FortuneLevel = typeof FortuneLevel[keyof typeof FortuneLevel];

/**
 * 吉凶等级配置
 */
export interface FortuneLevelConfig {
  level: FortuneLevel;
  score: number;
  label: string;
  color: string;
  description: string;
}

/**
 * 卦辞断语评分结果
 */
export interface HexagramTextScore {
  score: number;        // 0-100
  reasoning: string;    // 评分理由
  keywords: string[];   // 关键词
}

/**
 * 上下卦关系评分结果
 */
export interface TrigramRelationScore {
  score: number;        // 0-100
  reasoning: string;    // 评分理由
  upperTrigram: string; // 上卦
  lowerTrigram: string; // 下卦
  relationship: string; // 关系描述
}

/**
 * 爻位综合评分结果
 */
export interface LinesPositionScore {
  score: number;        // 0-100
  reasoning: string;    // 评分理由
  changingLinesCount: number; // 变爻数量
  linesAnalysis: string[];     // 各爻分析
}

/**
 * 变爻规则调整
 */
export interface ChangingLinesAdjustment {
  adjustment: number;   // 调整值 -20 到 +20
  reasoning: string;    // 调整理由
  specialCase: string; // 特殊情况描述
}

/**
 * 综合吉凶判断结果
 */
export interface FortuneAssessment {
  // 基本信息
  hexagramId: number;
  changedHexagramId: number | null;
  changingLines: number[];
  
  // 权重信息
  weights: {
    originalWeight: number;  // 本卦权重
    changedWeight: number; // 变卦权重
  };
  
  // 各维度评分
  hexagramTextScore: HexagramTextScore;      // 卦辞断语 (40%)
  trigramRelationScore: TrigramRelationScore; // 上下卦关系 (30%)
  linesPositionScore: LinesPositionScore;     // 爻位综合 (30%)
  
  // 变爻调整
  changingLinesAdjustment: ChangingLinesAdjustment;
  
  // 最终结果
  totalScore: number;           // 综合评分 0-100
  fortuneLevel: FortuneLevel;   // 吉凶等级
  overallAdvice: string;        // 总体建议
  confidence: number;           // 判断置信度 0-100
  
  // 详细分析
  detailedAnalysis: {
    strengths: string[];        // 优势
    weaknesses: string[];       // 劣势
    opportunities: string[];    // 机遇
    threats: string[];          // 威胁
  };
}

/**
 * 吉凶判断配置选项
 */
export interface FortuneAssessmentConfig {
  weights: {
    hexagramText: number;       // 卦辞断语权重 (默认 0.4)
    trigramRelation: number;    // 上下卦关系权重 (默认 0.3)
    linesPosition: number;      // 爻位综合权重 (默认 0.3)
  };
  enableChangingLinesAdjustment: boolean; // 是否启用变爻调整
  language: 'zh-CN' | 'zh-TW' | 'en' | 'es'; // 语言设置
}

/**
 * 八卦属性定义
 */
export interface TrigramAttributes {
  nameKey: string;
  elementKey: string;
  natureKey: string;
  qualityKey: string;
  positionKey: string;
}

/**
 * 爻位属性定义
 */
export interface LinePosition {
  nameKey: string;
  positionKey: string;
  natureKey: string;
  weight: number;
}

/**
 * 关键词组定义
 */
export interface KeywordGroup {
  veryStrong: string[];
  medium: string[];
  weak: string[];
}

/**
 * 五行关系定义
 */
export interface FiveElementsRelations {
  generate: Record<string, string>;
  overcome: Record<string, string>;
}

/**
 * 天地关系评分配置
 */
export interface HeavenEarthRelation {
  score: number;
  description: string;
}

/**
 * 爻型权重配置
 */
export interface LineTypeWeight {
  score: number;
  description: string;
}

/**
 * 特殊组合配置
 */
export interface SpecialCombination {
  score: number;
  description: string;
}

/**
 * 评分结果基础接口
 */
export interface BaseScore {
  score: number;
  reasoning: string;
}

/**
 * 权重信息
 */
export interface HexagramWeights {
  originalWeight: number;
  changedWeight: number;
}
