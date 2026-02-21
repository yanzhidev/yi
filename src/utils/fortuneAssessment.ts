import { getHexagramById } from './iching';
import { getTranslation } from './i18n';
import type { Language, Translation } from './i18n';

// ==================== 吉凶判断类型定义 ====================

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

// ==================== 吉凶等级配置 ====================

/**
 * 获取吉凶等级配置
 * @param language 语言
 * @returns 吉凶等级配置
 */
export function getFortuneLevels(language: Language = 'zh-CN'): Record<FortuneLevel, FortuneLevelConfig> {
  return {
    [FortuneLevel.EXTREMELY_AUSPICIOUS]: {
      level: FortuneLevel.EXTREMELY_AUSPICIOUS,
      score: 90,
      label: getTranslation(language, 'extremelyAuspicious'),
      color: '#dc2626', // red-600
      description: getTranslation(language, 'extremelyAuspiciousDesc')
    },
    [FortuneLevel.VERY_AUSPICIOUS]: {
      level: FortuneLevel.VERY_AUSPICIOUS,
      score: 75,
      label: getTranslation(language, 'veryAuspicious'),
      color: '#ea580c', // orange-600
      description: getTranslation(language, 'veryAuspiciousDesc')
    },
    [FortuneLevel.AUSPICIOUS]: {
      level: FortuneLevel.AUSPICIOUS,
      score: 60,
      label: getTranslation(language, 'auspicious'),
      color: '#d97706', // amber-600
      description: getTranslation(language, 'auspiciousDesc')
    },
    [FortuneLevel.NEUTRAL]: {
      level: FortuneLevel.NEUTRAL,
      score: 45,
      label: getTranslation(language, 'neutral'),
      color: '#65a30d', // lime-600
      description: getTranslation(language, 'neutralDesc')
    },
    [FortuneLevel.INAUSPICIOUS]: {
      level: FortuneLevel.INAUSPICIOUS,
      score: 30,
      label: getTranslation(language, 'inauspicious'),
      color: '#0891b2', // cyan-600
      description: getTranslation(language, 'inauspiciousDesc')
    },
    [FortuneLevel.VERY_INAUSPICIOUS]: {
      level: FortuneLevel.VERY_INAUSPICIOUS,
      score: 15,
      label: getTranslation(language, 'veryInauspicious'),
      color: '#2563eb', // blue-600
      description: getTranslation(language, 'veryInauspiciousDesc')
    },
    [FortuneLevel.EXTREMELY_INAUSPICIOUS]: {
      level: FortuneLevel.EXTREMELY_INAUSPICIOUS,
      score: 0,
      label: getTranslation(language, 'extremelyInauspicious'),
      color: '#7c3aed', // violet-600
      description: getTranslation(language, 'extremelyInauspiciousDesc')
    }
  };
}

// 保持向后兼容的常量（默认中文）
export const FORTUNE_LEVELS = getFortuneLevels('zh-CN');

// ==================== 默认配置 ====================

export const DEFAULT_FORTUNE_CONFIG: FortuneAssessmentConfig = {
  weights: {
    hexagramText: 0.4,
    trigramRelation: 0.3,
    linesPosition: 0.3
  },
  enableChangingLinesAdjustment: true,
  language: 'zh-CN'
};

// ==================== 卦辞断语评分算法 (40%权重) ====================

/**
 * 吉凶关键词映射
 */
const FORTUNE_KEYWORDS = {
  positive: {
    // 强吉词汇
    veryStrong: ['元亨利贞', '大吉', '亨通', '利涉大川', '无不利', '永贞吉', '元吉'],
    // 中等吉词汇
    medium: ['利', '吉', '亨', '贞', '往', '有攸往', '得', '庆', '福'],
    // 弱吉词汇
    weak: ['可', '宜', '善', '美', '嘉', '喜']
  },
  negative: {
    // 强凶词汇
    veryStrong: ['凶', '厉', '灾', '眚', '悔', '吝', '困', '险', '难'],
    // 中等凶词汇
    medium: ['勿用', '不利', '有险', '有灾', '有悔', '有吝'],
    // 弱凶词汇
    weak: ['慎', '戒', '勿', '毋', '勿用有攸往']
  }
};

/**
 * 分析卦辞文本
 * @param hexagramData 卦象数据
 * @param language 语言
 * @returns 卦辞评分
 */
function analyzeHexagramText(hexagramData: any, language: Language = 'zh-CN'): HexagramTextScore {
  const { name, text } = hexagramData;
  const fullText = `${name} ${text}`;
  
  let score = 50; // 基础分数
  const keywords: string[] = [];
  let reasoning = getTranslation(language, 'hexagramTextAnalysisLabel') + '\n';
  
  // 分析卦辞原文
  reasoning += getTranslation(language, 'hexagramNameLabel') + name + '\n';
  reasoning += getTranslation(language, 'hexagramTextLabel') + text + '\n';
  
  // 计算吉凶关键词得分
  const positiveScore = calculateKeywordScore(fullText, FORTUNE_KEYWORDS.positive, keywords);
  const negativeScore = calculateKeywordScore(fullText, FORTUNE_KEYWORDS.negative, keywords);
  
  // 调整分数
  score += positiveScore - negativeScore;
  
  // 特殊卦象调整
  const specialAdjustment = getSpecialHexagramAdjustment(hexagramData.id, language);
  score += specialAdjustment.adjustment;
  reasoning += specialAdjustment.reasoning;
  
  // 确保分数在合理范围内
  score = Math.max(0, Math.min(100, score));
  
  reasoning += `\n${getTranslation(language, 'keywordAnalysisLabel')}${keywords.join('、')}`;
  reasoning += `\n${getTranslation(language, 'finalScoreLabel')}${score.toFixed(1)}`;
  
  return {
    score,
    reasoning,
    keywords
  };
}

/**
 * 关键词评分计算
 * @param text 待分析文本
 * @param keywordGroups 关键词组
 * @param foundKeywords 找到的关键词数组
 * @returns 评分
 */
function calculateKeywordScore(
  text: string, 
  keywordGroups: typeof FORTUNE_KEYWORDS.positive | typeof FORTUNE_KEYWORDS.negative,
  foundKeywords: string[]
): number {
  let totalScore = 0;
  
  // 强关键词权重更高
  for (const keyword of keywordGroups.veryStrong) {
    if (text.includes(keyword)) {
      foundKeywords.push(keyword);
      totalScore += 15;
    }
  }
  
  // 中等关键词
  for (const keyword of keywordGroups.medium) {
    if (text.includes(keyword)) {
      foundKeywords.push(keyword);
      totalScore += 8;
    }
  }
  
  // 弱关键词
  for (const keyword of keywordGroups.weak) {
    if (text.includes(keyword)) {
      foundKeywords.push(keyword);
      totalScore += 3;
    }
  }
  
  return totalScore;
}

/**
 * 特殊卦象调整
 * @param hexagramId 卦象ID
 * @param language 语言
 * @returns 调整值和理由
 */
function getSpecialHexagramAdjustment(hexagramId: number, language: Language = 'zh-CN'): { adjustment: number; reasoning: string } {
  const specialCases: Record<number, { adjustment: number; reasoningKey: keyof Translation }> = {
    // 乾卦 - 至阳至刚，大吉
    1: { adjustment: 20, reasoningKey: 'hexagram1Adjustment' },
    // 坤卦 - 厚德载物，吉
    2: { adjustment: 15, reasoningKey: 'hexagram2Adjustment' },
    // 泰卦 - 天地交泰，大吉
    11: { adjustment: 25, reasoningKey: 'hexagram11Adjustment' },
    // 否卦 - 天地不交，凶
    12: { adjustment: -20, reasoningKey: 'hexagram12Adjustment' },
    // 既济 - 水火既济，事成，吉
    63: { adjustment: 18, reasoningKey: 'hexagram63Adjustment' },
    // 未济 - 水火未济，事未成，中平
    64: { adjustment: -5, reasoningKey: 'hexagram64Adjustment' }
  };
  
  const specialCase = specialCases[hexagramId];
  if (specialCase) {
    return {
      adjustment: specialCase.adjustment,
      reasoning: getTranslation(language, specialCase.reasoningKey as keyof Translation)
    };
  }
  
  return { adjustment: 0, reasoning: '' };
}

// ==================== 上下卦关系评分算法 (30%权重) ====================

/**
 * 八卦属性定义
 */
const TRIGRAM_ATTRIBUTES = {
  '111': { nameKey: 'trigramQian', elementKey: 'elementMetal', natureKey: 'natureHeaven', qualityKey: 'qualityFirm', positionKey: 'positionHighest' },
  '000': { nameKey: 'trigramKun', elementKey: 'elementEarth', natureKey: 'natureEarth', qualityKey: 'qualityGentle', positionKey: 'positionLowest' },
  '001': { nameKey: 'trigramZhen', elementKey: 'elementWood', natureKey: 'natureThunder', qualityKey: 'qualityMoving', positionKey: 'positionLowest' },
  '010': { nameKey: 'trigramKan', elementKey: 'elementWater', natureKey: 'natureWater', qualityKey: 'qualityDangerous', positionKey: 'positionLowest' },
  '011': { nameKey: 'trigramGen', elementKey: 'elementEarth', natureKey: 'natureMountain', qualityKey: 'qualityStill', positionKey: 'positionHighest' },
  '100': { nameKey: 'trigramXun', elementKey: 'elementWood', natureKey: 'natureWind', qualityKey: 'qualityObedient', positionKey: 'positionLowest' },
  '101': { nameKey: 'trigramLi', elementKey: 'elementFire', natureKey: 'natureFire', qualityKey: 'qualityClinging', positionKey: 'positionHighest' },
  '110': { nameKey: 'trigramDui', elementKey: 'elementMetal', natureKey: 'natureLake', qualityKey: 'qualityJoyful', positionKey: 'positionHighest' }
};

/**
 * 五行相生相克关系
 */
const FIVE_ELEMENTS_RELATIONS = {
  generate: {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
  },
  overcome: {
    '木': '土', '土': '水', '水': '火', '火': '金', '金': '木'
  }
};

/**
 * 获取天地关系评分
 * @param language 语言
 * @returns 天地关系评分配置
 */
function getHeavenEarthRelations(language: Language = 'zh-CN'): Record<string, { score: number; description: string }> {
  return {
    '天-地': { score: 25, description: getTranslation(language, 'heavenEarthRelation') },
    '天-天': { score: 15, description: getTranslation(language, 'heavenHeavenRelation') },
    '地-地': { score: 10, description: getTranslation(language, 'earthEarthRelation') },
    '天-山': { score: 12, description: getTranslation(language, 'heavenMountainRelation') },
    '天-泽': { score: 18, description: getTranslation(language, 'heavenLakeRelation') },
    '天-火': { score: 20, description: getTranslation(language, 'heavenFireRelation') },
    '天-风': { score: 16, description: getTranslation(language, 'heavenWindRelation') },
    '天-水': { score: 8, description: getTranslation(language, 'heavenWaterRelation') },
    '天-雷': { score: 14, description: getTranslation(language, 'heavenThunderRelation') },
    '地-山': { score: 12, description: getTranslation(language, 'earthMountainRelation') },
    '地-泽': { score: 16, description: getTranslation(language, 'earthLakeRelation') },
    '地-火': { score: 8, description: getTranslation(language, 'earthFireRelation') },
    '地-风': { score: 14, description: getTranslation(language, 'earthWindRelation') },
    '地-水': { score: 10, description: getTranslation(language, 'earthWaterRelation') },
    '地-雷': { score: 18, description: getTranslation(language, 'earthThunderRelation') }
  };
}

/**
 * 分析上下卦关系
 * @param binary 卦象二进制字符串
 * @param language 语言
 * @returns 上下卦关系评分
 */
export function analyzeTrigramRelation(binary: string, language: Language = 'zh-CN'): TrigramRelationScore {
  // 分离上下卦
  const upperTrigramBinary = binary.slice(0, 3);
  const lowerTrigramBinary = binary.slice(3);
  
  const upperTrigram = TRIGRAM_ATTRIBUTES[upperTrigramBinary as keyof typeof TRIGRAM_ATTRIBUTES];
  const lowerTrigram = TRIGRAM_ATTRIBUTES[lowerTrigramBinary as keyof typeof TRIGRAM_ATTRIBUTES];
  
  if (!upperTrigram || !lowerTrigram) {
    return {
      score: 50,
      reasoning: getTranslation(language, 'invalidHexagramStructureLabel'),
      upperTrigram: getTranslation(language, 'unknownLabel'),
      lowerTrigram: getTranslation(language, 'unknownLabel'),
      relationship: getTranslation(language, 'cannotAnalyzeLabel')
    };
  }
  
  let score = 50; // 基础分数
  let reasoning = getTranslation(language, 'trigramRelationAnalysisLabel') + '\n';
  reasoning += getTranslation(language, 'upperTrigramLabel') + `${getTranslation(language, upperTrigram.nameKey as keyof Translation)}（${getTranslation(language, upperTrigram.natureKey as keyof Translation)}，${getTranslation(language, upperTrigram.elementKey as keyof Translation)}）\n`;
  reasoning += getTranslation(language, 'lowerTrigramLabel') + `${getTranslation(language, lowerTrigram.nameKey as keyof Translation)}（${getTranslation(language, lowerTrigram.natureKey as keyof Translation)}，${getTranslation(language, lowerTrigram.elementKey as keyof Translation)}）\n`;
  
  // 1. 天地关系评分
  const heavenEarthKey = `${getTranslation(language, upperTrigram.natureKey as keyof Translation)}-${getTranslation(language, lowerTrigram.natureKey as keyof Translation)}`;
  const heavenEarthRelations = getHeavenEarthRelations(language);
  const heavenEarthRelation = heavenEarthRelations[heavenEarthKey];
  if (heavenEarthRelation) {
    score += heavenEarthRelation.score;
    reasoning += getTranslation(language, 'heavenEarthRelationLabel') + `${heavenEarthRelation.description} (+${heavenEarthRelation.score}${getTranslation(language, 'pointsText')})\n`;
  }
  
  // 2. 五行关系评分
  const elementRelation = getElementRelationScore(getTranslation(language, upperTrigram.elementKey as keyof Translation), getTranslation(language, lowerTrigram.elementKey as keyof Translation), language);
  score += elementRelation.score;
  reasoning += getTranslation(language, 'fiveElementsRelationLabel') + `${elementRelation.description} (${elementRelation.score > 0 ? '+' : ''}${elementRelation.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 3. 阴阳调和评分
  const yinYangBalance = getYinYangBalanceScore(upperTrigramBinary, lowerTrigramBinary, language);
  score += yinYangBalance.score;
  reasoning += getTranslation(language, 'yinYangHarmonyLabel') + `${yinYangBalance.description} (${yinYangBalance.score > 0 ? '+' : ''}${yinYangBalance.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 4. 特殊组合调整
  const specialCombination = getSpecialCombinationAdjustment(upperTrigramBinary, lowerTrigramBinary);
  score += specialCombination.score;
  reasoning += getTranslation(language, 'specialCombinationLabel') + `${specialCombination.description} (${specialCombination.score > 0 ? '+' : ''}${specialCombination.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 确保分数在合理范围内
  score = Math.max(0, Math.min(100, score));
  
  const relationship = `${getTranslation(language, upperTrigram.nameKey as keyof Translation)}${getTranslation(language, lowerTrigram.nameKey as keyof Translation)}（${getTranslation(language, upperTrigram.natureKey as keyof Translation)}在${getTranslation(language, lowerTrigram.natureKey as keyof Translation)}上）`;
  reasoning += `\n${getTranslation(language, 'relationshipSummary')}${relationship}`;
  reasoning += `\n${getTranslation(language, 'finalScoreLabel')}${score.toFixed(1)}`;
  
  return {
    score,
    reasoning,
    upperTrigram: getTranslation(language, upperTrigram.nameKey as keyof Translation),
    lowerTrigram: getTranslation(language, lowerTrigram.nameKey as keyof Translation),
    relationship
  };
}

/**
 * 五行关系评分
 * @param upperElement 上卦五行
 * @param lowerElement 下卦五行
 * @param language 语言
 * @returns 五行关系评分
 */
function getElementRelationScore(upperElement: string, lowerElement: string, language: Language = 'zh-CN'): { score: number; description: string } {
  const relations = FIVE_ELEMENTS_RELATIONS;
  
  // 上生下（上卦生下卦）- 吉
  if (relations.generate[upperElement as keyof typeof relations.generate] === lowerElement) {
    return { score: 15, description: getTranslation(language, 'upperGeneratesLower') };
  }
  
  // 下生上（下卦生上卦）- 吉
  if (relations.generate[lowerElement as keyof typeof relations.generate] === upperElement) {
    return { score: 12, description: getTranslation(language, 'lowerGeneratesUpper') };
  }
  
  // 上克下（上卦克下卦）- 凶
  if (relations.overcome[upperElement as keyof typeof relations.overcome] === lowerElement) {
    return { score: -10, description: getTranslation(language, 'upperRestrictsLower') };
  }
  
  // 下克上（下卦克上卦）- 凶
  if (relations.overcome[lowerElement as keyof typeof relations.overcome] === upperElement) {
    return { score: -8, description: getTranslation(language, 'lowerRestrictsUpper') };
  }
  
  // 同五行 - 中平
  if (upperElement === lowerElement) {
    return { score: 5, description: getTranslation(language, 'sameElement') };
  }
  
  return { score: 0, description: getTranslation(language, 'fiveElementsNoFeature') };
}

/**
 * 阴阳调和评分
 * @param upperBinary 上卦二进制
 * @param lowerBinary 下卦二进制
 * @param language 语言
 * @returns 阴阳调和评分
 */
function getYinYangBalanceScore(upperBinary: string, lowerBinary: string, language: Language = 'zh-CN'): { score: number; description: string } {
  const upperYangCount = (upperBinary.match(/1/g) || []).length;
  const lowerYangCount = (lowerBinary.match(/1/g) || []).length;
  const upperYinCount = 3 - upperYangCount;
  const lowerYinCount = 3 - lowerYangCount;
  
  // 理想状态：上卦多阳，下卦多阴（天在上，地在下）
  if (upperYangCount > upperYinCount && lowerYinCount > lowerYangCount) {
    return { score: 10, description: getTranslation(language, 'yinYangIdeal') };
  }
  
  // 次佳状态：上下卦阴阳平衡
  if (upperYangCount === upperYinCount && lowerYangCount === lowerYinCount) {
    return { score: 8, description: getTranslation(language, 'yinYangBalanced') };
  }
  
  // 不佳状态：上卦多阴，下卦多阳（天地倒置）
  if (upperYinCount > upperYangCount && lowerYangCount > lowerYinCount) {
    return { score: -12, description: getTranslation(language, 'yinYangInverted') };
  }
  
  return { score: 0, description: getTranslation(language, 'yinYangNoFeature') };
}

/**
 * 特殊组合调整
 * @param upperBinary 上卦二进制
 * @param lowerBinary 下卦二进制
 * @param language 语言
 * @returns 特殊组合调整
 */
function getSpecialCombinationAdjustment(upperBinary: string, lowerBinary: string, language: Language = 'zh-CN'): { score: number; description: string } {
  const combination = upperBinary + lowerBinary;
  
  const specialCases: Record<string, { score: number; description: string }> = {
    // 乾卦 - 纯阳
    '111111': { score: 20, description: getTranslation(language, 'pureYangHexagram') },
    // 坤卦 - 纯阴
    '000000': { score: 15, description: getTranslation(language, 'pureYinHexagram') },
    // 泰卦 - 天地交泰
    '111000': { score: 25, description: getTranslation(language, 'taiHexagram') },
    // 否卦 - 天地不交
    '000111': { score: -20, description: getTranslation(language, 'piHexagram') },
    // 既济 - 水火既济
    '010101': { score: 18, description: getTranslation(language, 'jiJiHexagram') },
    // 未济 - 水火未济
    '101010': { score: -5, description: getTranslation(language, 'weiJiHexagram') },
    // 丰卦 - 雷火丰
    '101001': { score: 12, description: getTranslation(language, 'fengHexagram') },
    // 困卦 - 泽水困
    '110010': { score: -10, description: getTranslation(language, 'kunHexagram') }
  };
  
  return specialCases[combination] || { score: 0, description: getTranslation(language, 'noSpecialCombination') };
}

// ==================== 爻位综合评分算法 (30%权重) ====================

/**
 * 爻位属性定义
 */
const LINE_POSITIONS = {
  1: { nameKey: 'lineFirst', positionKey: 'positionLowest', natureKey: 'natureBeginning', weight: 1.0 },
  2: { nameKey: 'lineSecond', positionKey: 'positionLowerMiddle', natureKey: 'natureMiddle', weight: 1.1 },
  3: { nameKey: 'lineThird', positionKey: 'positionLowerUpper', natureKey: 'natureDangerous2', weight: 0.9 },
  4: { nameKey: 'lineFourth', positionKey: 'positionUpperLower', natureKey: 'natureDangerous2', weight: 0.9 },
  5: { nameKey: 'lineFifth', positionKey: 'positionUpperMiddle', natureKey: 'natureAuspicious', weight: 1.2 },
  6: { nameKey: 'lineSixth', positionKey: 'positionHighest', natureKey: 'natureEnd', weight: 1.0 }
};

/**
 * 获取爻型吉凶权重
 * @param language 语言
 * @returns 爻型吉凶权重配置
 */
function getLineTypeWeights(language: Language = 'zh-CN'): Record<string, { score: number; description: string }> {
  return {
    'oldYang': { score: 8, description: getTranslation(language, 'oldYangDesc') },
    'youngYang': { score: 6, description: getTranslation(language, 'youngYangDesc') },
    'youngYin': { score: 4, description: getTranslation(language, 'youngYinDesc') },
    'oldYin': { score: 2, description: getTranslation(language, 'oldYinDesc') }
  };
}

/**
 * 获取特殊爻位组合
 * @param lines 六爻数组
 * @param changingLines 变爻位置数组
 * @param language 语言
 * @returns 特殊组合评分
 */
function getSpecialLineCombinations(lines: any[], changingLines: number[], language: Language = 'zh-CN'): { score: number; description: string } {
  let totalScore = 0;
  const descriptions: string[] = [];
  const specialCombinations = {
    'all-yang': { score: 20, description: getTranslation(language, 'allYangDesc') },
    'all-yin': { score: 15, description: getTranslation(language, 'allYinDesc') },
    '2-5': { score: 15, description: getTranslation(language, 'middlePositionDesc') },
    'proper-position': { score: 10, description: getTranslation(language, 'properPositionDesc') },
    'improper-position': { score: -8, description: getTranslation(language, 'improperPositionDesc') }
  };
  
  // 检查纯阳纯阴
  const allYang = lines.every((line: any) => line.value === 1);
  const allYin = lines.every((line: any) => line.value === 0);
  
  if (allYang) {
    totalScore += specialCombinations['all-yang'].score;
    descriptions.push(specialCombinations['all-yang'].description);
  }
  
  if (allYin) {
    totalScore += specialCombinations['all-yin'].score;
    descriptions.push(specialCombinations['all-yin'].description);
  }
  
  // 检查特殊爻位组合
  for (const position of changingLines) {
    const line = lines[position - 1];
    if (line?.isChanging) {
      if (position === 2 || position === 5) {
        totalScore += specialCombinations['2-5'].score;
        descriptions.push(specialCombinations['2-5'].description);
      }
    }
  }
  
  // 检查爻位得当性
  let properCount = 0;
  let improperCount = 0;
  lines.forEach((line: any, index: number) => {
    const position = index + 1;
    const isProper = (line.value === 1 && position % 2 === 1) || (line.value === 0 && position % 2 === 0);
    if (isProper) {
      properCount++;
    } else {
      improperCount++;
    }
  });
  
  if (properCount > improperCount) {
    totalScore += specialCombinations['proper-position'].score;
    descriptions.push(specialCombinations['proper-position'].description);
  } else if (improperCount > properCount) {
    totalScore += specialCombinations['improper-position'].score;
    descriptions.push(specialCombinations['improper-position'].description);
  }
  
  return {
    score: totalScore,
    description: descriptions.join('；') || getTranslation(language, 'noSpecialCombination')
  };
}

/**
 * 爻位综合评分函数
 * @param lines 六爻数组
 * @param changingLines 变爻位置数组
 * @param language 语言
 * @returns 爻位综合评分结果
 */
export function calculateLinesPositionScore(lines: any[], changingLines: number[], language: Language = 'zh-CN'): LinesPositionScore {
  let score = 50; // 基础分数
  const linesAnalysis: string[] = [];
  let reasoning = getTranslation(language, 'linesPositionAnalysisLabel') + '\n';
  
  // 构建 binary 字符串
  const binary = lines.map(line => line.value.toString()).join('');
  
  // 1. 分析各爻位置和类型
  let properPositionCount = 0;
  let improperPositionCount = 0;
  let yangCount = 0;
  let yinCount = 0;
  
  reasoning += '\n' + getTranslation(language, 'eachLineAnalysis') + '\n';
  
  lines.forEach((line, index) => {
    const position = index + 1;
    const positionInfo = LINE_POSITIONS[position as keyof typeof LINE_POSITIONS];
    const lineTypeWeights = getLineTypeWeights(language);
    const lineTypeWeight = lineTypeWeights[line.lineType as keyof typeof lineTypeWeights];
    
    // 计算爻位得分
    const positionScore = lineTypeWeight.score * positionInfo.weight;
    score += positionScore;
    
    // 判断当位与否
    const isProperPosition = (line.value === 1 && position % 2 === 1) || // 阳爻居阳位
                             (line.value === 0 && position % 2 === 0);   // 阴爻居阴位
    
    if (isProperPosition) {
      properPositionCount++;
    } else {
      improperPositionCount++;
    }
    
    // 统计阴阳爻数量
    if (line.value === 1) {
      yangCount++;
    } else {
      yinCount++;
    }
    
    const positionName = getTranslation(language, positionInfo.nameKey as keyof Translation);
    const analysis = `${positionName}(${lineTypeWeight.description})：${isProperPosition ? getTranslation(language, 'properPosition') : getTranslation(language, 'improperPosition')} (+${positionScore.toFixed(1)}${getTranslation(language, 'pointsText2')})`;
    linesAnalysis.push(analysis);
    reasoning += `${analysis}\n`;
  });
  
  // 2. 特殊组合评分
  const specialCombinations = getSpecialLineCombinations(lines, changingLines, language);
  score += specialCombinations.score;
  reasoning += `\n${getTranslation(language, 'specialCombinationsLabel')}${specialCombinations.description} (${specialCombinations.score > 0 ? '+' : ''}${specialCombinations.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 3. 特殊组合调整
  const upperBinary = binary.slice(0, 3);
  const lowerBinary = binary.slice(3);
  const specialCombination = getSpecialCombinationAdjustment(upperBinary, lowerBinary, language);
  score += specialCombination.score;
  reasoning += `\n${getTranslation(language, 'specialCombinationAdjustmentLabel')}${specialCombination.description} (${specialCombination.score > 0 ? '+' : ''}${specialCombination.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 3. 变爻分析
  const changingLinesAnalysis = analyzeChangingLines(lines, changingLines, language);
  score += changingLinesAnalysis.score;
  reasoning += `\n${getTranslation(language, 'changingLinesAnalysisLabel')}${changingLinesAnalysis.description} (${changingLinesAnalysis.score > 0 ? '+' : ''}${changingLinesAnalysis.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 4. 阴阳平衡分析
  const yinYangBalance = analyzeLinesYinYangBalance(yangCount, yinCount, language);
  score += yinYangBalance.score;
  reasoning += `\n${getTranslation(language, 'yinYangBalanceLabel')}${yinYangBalance.description} (${yinYangBalance.score > 0 ? '+' : ''}${yinYangBalance.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 5. 爻位结构分析
  const positionStructure = analyzePositionStructure(lines, language);
  score += positionStructure.score;
  reasoning += `\n${getTranslation(language, 'positionStructureLabel')}${positionStructure.description} (${positionStructure.score > 0 ? '+' : ''}${positionStructure.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 确保分数在合理范围内
  score = Math.max(0, Math.min(100, score));
  
  reasoning += `\n${getTranslation(language, 'finalScoreLabel')}${score.toFixed(1)}`;
  
  return {
    score,
    reasoning,
    changingLinesCount: changingLines.length,
    linesAnalysis
  };
}

/**
 * 分析变爻
 * @param lines 六爻数组
 * @param changingLines 变爻位置数组
 * @param language 语言
 * @returns 变爻分析结果
 */
function analyzeChangingLines(_lines: any[], changingLines: number[], language: Language = 'zh-CN'): { score: number; description: string } {
  const changingCount = changingLines.length;
  
  if (changingCount === 0) {
    return { score: 5, description: getTranslation(language, 'noChangingLines') };
  }
  
  if (changingCount === 1) {
    return { score: 8, description: getTranslation(language, 'oneChangingLine') };
  }
  
  if (changingCount === 2) {
    return { score: 6, description: getTranslation(language, 'twoChangingLines') };
  }
  
  if (changingCount === 3) {
    return { score: 4, description: getTranslation(language, 'threeChangingLines') };
  }
  
  if (changingCount >= 4) {
    return { score: -5, description: getTranslation(language, 'manyChangingLines') };
  }
  
  return { score: 0, description: getTranslation(language, 'changingLinesUnknown') };
}

/**
 * 分析阴阳平衡
 * @param yangCount 阳爻数量
 * @param yinCount 阴爻数量
 * @param language 语言
 * @returns 阴阳平衡分析结果
 */
function analyzeLinesYinYangBalance(yangCount: number, yinCount: number, language: Language = 'zh-CN'): { score: number; description: string } {
  if (yangCount === yinCount) {
    return { score: 10, description: getTranslation(language, 'yinYangBalancedHarmony') };
  }
  
  if (yangCount === 4 && yinCount === 2) {
    return { score: 8, description: getTranslation(language, 'yangMoreThanYin') };
  }
  
  if (yangCount === 2 && yinCount === 4) {
    return { score: 6, description: getTranslation(language, 'yinMoreThanYang') };
  }
  
  if (yangCount === 5 && yinCount === 1) {
    return { score: 4, description: getTranslation(language, 'yangExtreme') };
  }
  
  if (yangCount === 1 && yinCount === 5) {
    return { score: 3, description: getTranslation(language, 'yinExtreme') };
  }
  
  return { score: 0, description: getTranslation(language, 'yinYangNoFeature') };
}

/**
 * 分析爻位结构
 * @param lines 六爻数组
 * @param language 语言
 * @returns 爻位结构分析结果
 */
function analyzePositionStructure(lines: any[], language: Language = 'zh-CN'): { score: number; description: string } {
  let score = 0;
  const descriptions: string[] = [];
  
  // 分析三爻四爻（人位）
  const line3 = lines[2]; // 三爻
  const line4 = lines[3]; // 四爻
  
  if (line3 && line4) {
    // 三四爻为阴阳相济为佳
    if (line3.value !== line4.value) {
      score += 5;
      descriptions.push(getTranslation(language, 'lines34Harmony'));
    }
    
    // 三四爻凶位，宜静不宜动
    if (line3.value === 0 && line4.value === 0) {
      score += 3;
      descriptions.push(getTranslation(language, 'lines34Gentle'));
    }
  }
  
  // 分析初上爻（天地位）
  const line1 = lines[0]; // 初爻
  const line6 = lines[5]; // 上爻
  
  if (line1 && line6) {
    // 初上爻相应为佳
    if (line1.value === line6.value) {
      score += 4;
      descriptions.push(getTranslation(language, 'lines16Correspondence'));
    }
  }
  
  // 分析二五爻（中位）
  const line2 = lines[1]; // 二爻
  const line5 = lines[4]; // 五爻
  
  if (line2 && line5) {
    // 二五爻相应为佳
    if (line2.value !== line5.value) {
      score += 6;
      descriptions.push(getTranslation(language, 'lines25Correspondence'));
    }
  }
  
  return {
    score,
    description: descriptions.join('；') || getTranslation(language, 'positionStructureNoFeature')
  };
}

// ==================== 变爻规则特殊调整 ====================

/**
 * 变爻规则调整函数
 * @param changingLines 变爻位置数组
 * @param hexagramId 原卦象ID
 * @param changedHexagramId 变卦象ID
 * @returns 变爻调整结果
 */
export function calculateChangingLinesAdjustment(
  changingLines: number[], 
  hexagramId: number, 
  changedHexagramId: number | null,
  language: Language = 'zh-CN'
): ChangingLinesAdjustment {
  let adjustment = 0;
  let reasoning = getTranslation(language, 'changingLinesAnalysisLabel') + '\n';
  let specialCase = getTranslation(language, 'generalCase');
  
  const changingCount = changingLines.length;
  
  // 1. 根据变爻数量调整
  if (changingCount === 0) {
    adjustment += 5;
    reasoning += getTranslation(language, 'noChangingLines') + ' (+5' + getTranslation(language, 'pointsText') + ')\n';
    specialCase = getTranslation(language, 'staticHexagram');
  } else if (changingCount === 1) {
    adjustment += 8;
    reasoning += getTranslation(language, 'oneChangingLine') + ' (+8' + getTranslation(language, 'pointsText') + ')\n';
    specialCase = getTranslation(language, 'singleLineChange');
  } else if (changingCount === 2) {
    adjustment += 3;
    reasoning += getTranslation(language, 'twoChangingLines') + ' (+3' + getTranslation(language, 'pointsText') + ')\n';
    specialCase = getTranslation(language, 'doubleLineChange');
  } else if (changingCount === 3) {
    adjustment -= 2;
    reasoning += getTranslation(language, 'threeChangingLines') + ' (-2' + getTranslation(language, 'pointsText') + ')\n';
    specialCase = getTranslation(language, 'tripleLineChange');
  } else if (changingCount >= 4) {
    adjustment -= 8;
    reasoning += getTranslation(language, 'manyChangingLines') + ' (-8' + getTranslation(language, 'pointsText') + ')\n';
    specialCase = getTranslation(language, 'multipleLineChange');
  }
  
  // 2. 特殊变爻位置调整
  const specialPositions = analyzeSpecialChangingPositions(changingLines, language);
  adjustment += specialPositions.adjustment;
  reasoning += specialPositions.reasoning;
  
  // 3. 特殊卦象变化分析
  if (changedHexagramId) {
    const specialChange = analyzeSpecialHexagramChange(hexagramId, changedHexagramId, language);
    adjustment += specialChange.adjustment;
    reasoning += specialChange.reasoning;
    if (specialChange.specialCase) {
      specialCase = specialChange.specialCase;
    }
  }
  
  // 4. 极端情况调整
  const extremeCase = analyzeExtremeChangingCase(changingLines, hexagramId, language);
  adjustment += extremeCase.adjustment;
  reasoning += extremeCase.reasoning;
  if (extremeCase.specialCase) {
    specialCase = extremeCase.specialCase;
  }
  
  // 确保调整值在合理范围内
  adjustment = Math.max(-20, Math.min(20, adjustment));
  
  reasoning += `\n${getTranslation(language, 'changingLinesAdjustment')}：${adjustment > 0 ? '+' : ''}${adjustment}${getTranslation(language, 'pointsText')}`;
  
  return {
    adjustment,
    reasoning,
    specialCase
  };
}

/**
 * 分析特殊变爻位置
 * @param changingLines 变爻位置数组
 * @param language 语言
 * @returns 特殊位置分析结果
 */
function analyzeSpecialChangingPositions(changingLines: number[], language: Language = 'zh-CN'): { adjustment: number; reasoning: string } {
  let adjustment = 0;
  const reasoning: string[] = [];
  
  changingLines.forEach(position => {
    switch (position) {
      case 2: // 二爻变
        adjustment += 3;
        reasoning.push(getTranslation(language, 'secondLineChange'));
        break;
      case 5: // 五爻变
        adjustment += 4;
        reasoning.push(getTranslation(language, 'fifthLineChange'));
        break;
      case 3: // 三爻变
      case 4: // 四爻变
        adjustment -= 2;
        reasoning.push(getTranslation(language, 'thirdOrFourthLineChange'));
        break;
      case 1: // 初爻变
        adjustment += 1;
        reasoning.push(getTranslation(language, 'firstLineChange'));
        break;
      case 6: // 上爻变
        adjustment += 2;
        reasoning.push(getTranslation(language, 'sixthLineChange'));
        break;
    }
  });
  
  return {
    adjustment,
    reasoning: reasoning.join('\n') + '\n'
  };
}

/**
 * 分析特殊卦象变化
 * @param fromId 原卦象ID
 * @param toId 变卦象ID
 * @param language 语言
 * @returns 特殊卦象变化分析
 */
function analyzeSpecialHexagramChange(fromId: number, toId: number, language: Language = 'zh-CN'): { adjustment: number; reasoning: string; specialCase?: string } {
  const specialChanges: Record<string, { adjustment: number; reasoning: string; specialCase?: string }> = {
    // 乾变坤
    '1-2': { adjustment: -10, reasoning: getTranslation(language, 'qianToKun'), specialCase: getTranslation(language, 'qianKunConversion') },
    // 坤变乾
    '2-1': { adjustment: 10, reasoning: getTranslation(language, 'kunToQian'), specialCase: getTranslation(language, 'qianKunConversion') },
    // 泰变否
    '11-12': { adjustment: -15, reasoning: getTranslation(language, 'taiToPi'), specialCase: getTranslation(language, 'taiPiConversion') },
    // 否变泰
    '12-11': { adjustment: 15, reasoning: getTranslation(language, 'piToTai'), specialCase: getTranslation(language, 'taiPiConversion') },
    // 既济变未济
    '63-64': { adjustment: -12, reasoning: getTranslation(language, 'jiJiToWeiJi'), specialCase: getTranslation(language, 'jiWeiConversion') },
    // 未济变既济
    '64-63': { adjustment: 12, reasoning: getTranslation(language, 'weiJiToJiJi'), specialCase: getTranslation(language, 'jiWeiConversion') }
  };
  
  const key = `${fromId}-${toId}`;
  return specialChanges[key] || { adjustment: 0, reasoning: getTranslation(language, 'hexagramChangeNoFeature') + '\n' };
}

/**
 * 分析极端变爻情况
 * @param changingLines 变爻位置数组
 * @param hexagramId 卦象ID
 * @param language 语言
 * @returns 极端情况分析
 */
function analyzeExtremeChangingCase(changingLines: number[], hexagramId: number, language: Language = 'zh-CN'): { adjustment: number; reasoning: string; specialCase?: string } {
  const changingCount = changingLines.length;
  
  // 乾卦六爻全变（用九）
  if (hexagramId === 1 && changingCount === 6) {
    return {
      adjustment: 18,
      reasoning: getTranslation(language, 'qianAllChange'),
      specialCase: getTranslation(language, 'yongJiu')
    };
  }
  
  // 坤卦六爻全变（用六）
  if (hexagramId === 2 && changingCount === 6) {
    return {
      adjustment: 15,
      reasoning: getTranslation(language, 'kunAllChange'),
      specialCase: getTranslation(language, 'yongLiu')
    };
  }
  
  // 中间四爻变
  if (changingCount === 4 && 
      changingLines.includes(2) && changingLines.includes(3) && 
      changingLines.includes(4) && changingLines.includes(5)) {
    return {
      adjustment: -8,
      reasoning: getTranslation(language, 'middleFourChange'),
      specialCase: getTranslation(language, 'fourLineChange')
    };
  }
  
  // 隔爻变化（跳跃式变化）
  if (changingCount >= 2) {
    const isJumping = changingLines.every((pos, index) => {
      if (index === 0) return true;
      return Math.abs(pos - changingLines[index - 1]) >= 2;
    });
    
    if (isJumping) {
      return {
        adjustment: -5,
        reasoning: getTranslation(language, 'jumpingChange'),
        specialCase: getTranslation(language, 'jumpingChange')
      };
    }
  }
  
  return { adjustment: 0, reasoning: '' };
}

// ==================== 综合吉凶判断函数 ====================

/**
 * 获取本卦和变卦的权重
 * @param changingLines 变爻位置数组
 * @returns 本卦权重和变卦权重
 */
function getHexagramWeight(changingLines: number[]): {
  originalWeight: number;  // 本卦权重
  changedWeight: number; // 变卦权重
} {
  const count = changingLines.length;
  
  // 基于变爻数量动态调整
  if (count === 0) return { originalWeight: 100, changedWeight: 0 };
  if (count === 1) return { originalWeight: 90, changedWeight: 10 };
  if (count === 2) return { originalWeight: 80, changedWeight: 20 };
  if (count === 3) return { originalWeight: 60, changedWeight: 40 };
  if (count === 4) return { originalWeight: 40, changedWeight: 60 };
  if (count === 5) return { originalWeight: 20, changedWeight: 80 };
  return { originalWeight: 10, changedWeight: 90 }; // 六爻全变
}

/**
 * 综合吉凶判断主函数
 * @param result 卦象结果
 * @param config 判断配置
 * @param language 语言代码
 * @returns 综合吉凶判断结果
 */
export function assessFortune(
  result: any, 
  config: FortuneAssessmentConfig = DEFAULT_FORTUNE_CONFIG,
  language: Language = 'zh-CN'
): FortuneAssessment {
  // 获取卦象数据
  const hexagramData = getHexagramById(result.hexagramId);
  const changedHexagramData = result.changedHexagramId ? getHexagramById(result.changedHexagramId) : null;
  
  if (!hexagramData) {
    throw new Error(`无法找到卦象数据：${result.hexagramId}`);
  }
  
  // 获取本卦和变卦权重
  const weights = getHexagramWeight(result.changingLines);
  
  // 1. 计算本卦各维度评分
  const benHexagramTextScore = analyzeHexagramText(hexagramData, language);
  const benTrigramRelationScore = analyzeTrigramRelation(hexagramData.binary, language);
  const benLinesPositionScore = calculateLinesPositionScore(result.lines, result.changingLines, language);
  
  // 2. 计算变卦各维度评分（如果有变卦）
  let bianHexagramTextScore: HexagramTextScore | null = null;
  let bianTrigramRelationScore: TrigramRelationScore | null = null;
  let bianLinesPositionScore: LinesPositionScore | null = null;
  
  if (changedHexagramData) {
    // 计算变卦的爻位（变爻反转后的爻位）
    const changedLines = result.lines.map((line: any) => ({
      ...line,
      value: line.value === 0 ? 1 : 0 // 反转变爻
    }));
    
    bianHexagramTextScore = analyzeHexagramText(changedHexagramData, language);
    bianTrigramRelationScore = analyzeTrigramRelation(changedHexagramData.binary, language);
    bianLinesPositionScore = calculateLinesPositionScore(changedLines, result.changingLines, language);
  }
  
  // 3. 按权重合并本卦和变卦评分
  const hexagramTextScore = combineScores(benHexagramTextScore, bianHexagramTextScore, weights.originalWeight, weights.changedWeight, language);
  const trigramRelationScore = combineScores(benTrigramRelationScore, bianTrigramRelationScore, weights.originalWeight, weights.changedWeight, language);
  const linesPositionScore = combineScores(benLinesPositionScore, bianLinesPositionScore, weights.originalWeight, weights.changedWeight, language);
  
  // 4. 计算变爻调整
  const changingLinesAdjustment = config.enableChangingLinesAdjustment 
    ? calculateChangingLinesAdjustment(result.changingLines, result.hexagramId, result.changedHexagramId, language)
    : { adjustment: 0, reasoning: '', specialCase: '' };
  
  // 5. 计算加权总分
  const weightedScore = 
    hexagramTextScore.score * config.weights.hexagramText +
    trigramRelationScore.score * config.weights.trigramRelation +
    linesPositionScore.score * config.weights.linesPosition;
  
  const totalScore = Math.max(0, Math.min(100, weightedScore + changingLinesAdjustment.adjustment));
  
  // 6. 确定吉凶等级
  const fortuneLevel = getFortuneLevel(totalScore);
  
  // 7. 生成总体建议
  const overallAdvice = generateOverallAdvice(fortuneLevel, hexagramTextScore, trigramRelationScore, linesPositionScore, language);
  
  // 8. 计算置信度
  const confidence = calculateConfidence(hexagramTextScore, trigramRelationScore, linesPositionScore);
  
  // 9. 生成详细分析
  const detailedAnalysis = generateDetailedAnalysis(fortuneLevel, hexagramTextScore, trigramRelationScore, linesPositionScore, language);
  
  return {
    hexagramId: result.hexagramId,
    changedHexagramId: result.changedHexagramId,
    changingLines: result.changingLines,
    weights,
    hexagramTextScore,
    trigramRelationScore,
    linesPositionScore,
    changingLinesAdjustment,
    totalScore,
    fortuneLevel,
    overallAdvice,
    confidence,
    detailedAnalysis
  };
}

/**
 * 合并本卦和变卦评分
 * @param benScore 本卦评分
 * @param bianScore 变卦评分
 * @param originalWeight 本卦权重
 * @param changedWeight 变卦权重
 * @returns 合并后的评分
 */
function combineScores<T extends { score: number; reasoning: string }>(
  benScore: T, 
  bianScore: T | null, 
  originalWeight: number, 
  changedWeight: number,
  language: Language = 'zh-CN'
): T {
  if (!bianScore) {
    return benScore;
  }
  
  const combinedScore = (benScore.score * originalWeight + bianScore.score * changedWeight) / 100;
  const combinedReasoning = `${getTranslation(language, 'originalHexagramScore')}：${benScore.score.toFixed(1)}${getTranslation(language, 'pointsText2')} (${getTranslation(language, 'weightPercentage')}${originalWeight}%)
${getTranslation(language, 'changedHexagramScore')}：${bianScore.score.toFixed(1)}${getTranslation(language, 'pointsText2')} (${getTranslation(language, 'weightPercentage')}${changedWeight}%)
${getTranslation(language, 'combinedScore')}：${combinedScore.toFixed(1)}${getTranslation(language, 'pointsText2')}

${getTranslation(language, 'originalHexagramAnalysis')}：
${benScore.reasoning}

${getTranslation(language, 'changedHexagramAnalysis')}：
${bianScore.reasoning}`;
  
  return {
    ...benScore,
    score: combinedScore,
    reasoning: combinedReasoning
  } as T;
}

/**
 * 根据评分获取吉凶等级
 * @param score 评分
 * @returns 吉凶等级
 */
function getFortuneLevel(score: number): FortuneLevel {
  if (score >= 90) return FortuneLevel.EXTREMELY_AUSPICIOUS;
  if (score >= 75) return FortuneLevel.VERY_AUSPICIOUS;
  if (score >= 60) return FortuneLevel.AUSPICIOUS;
  if (score >= 45) return FortuneLevel.NEUTRAL;
  if (score >= 30) return FortuneLevel.INAUSPICIOUS;
  if (score >= 15) return FortuneLevel.VERY_INAUSPICIOUS;
  return FortuneLevel.EXTREMELY_INAUSPICIOUS;
}

/**
 * 生成总体建议
 * @param fortuneLevel 吉凶等级
 * @param textScore 卦辞评分
 * @param trigramScore 上下卦评分
 * @param linesScore 爻位评分
 * @param language 语言
 * @returns 总体建议
 */
function generateOverallAdvice(
  fortuneLevel: FortuneLevel,
  textScore: HexagramTextScore,
  trigramScore: TrigramRelationScore,
  linesScore: LinesPositionScore,
  language: Language = 'zh-CN'
): string {
  const levelConfig = getFortuneLevels(language)[fortuneLevel];
  let advice = levelConfig.description;
  
  // 根据各维度评分添加具体建议
  if (textScore.score >= 70) {
    advice += getTranslation(language, 'hexagramTextGood');
  } else if (textScore.score <= 30) {
    advice += getTranslation(language, 'hexagramTextBad');
  }
  
  if (trigramScore.score >= 70) {
    advice += getTranslation(language, 'trigramGood');
  } else if (trigramScore.score <= 30) {
    advice += getTranslation(language, 'trigramBad');
  }
  
  if (linesScore.score >= 70) {
    advice += getTranslation(language, 'linesGood');
  } else if (linesScore.score <= 30) {
    advice += getTranslation(language, 'linesBad');
  }
  
  return advice;
}

/**
 * 计算判断置信度
 * @param textScore 卦辞评分
 * @param trigramScore 上下卦评分
 * @param linesScore 爻位评分
 * @returns 置信度
 */
function calculateConfidence(
  textScore: HexagramTextScore,
  trigramScore: TrigramRelationScore,
  linesScore: LinesPositionScore
): number {
  // 计算各评分的一致性
  const scores = [textScore.score, trigramScore.score, linesScore.score];
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length;
  
  // 方差越小，一致性越高，置信度越高
  const consistency = Math.max(0, 100 - variance);
  
  // 综合考虑平均分和一致性
  return Math.round((average * 0.6 + consistency * 0.4));
}

/**
 * 生成详细分析
 * @param fortuneLevel 吉凶等级
 * @param textScore 卦辞评分
 * @param trigramScore 上下卦评分
 * @param linesScore 爻位评分
 * @param language 语言代码
 * @returns 详细分析
 */
function generateDetailedAnalysis(
  _fortuneLevel: FortuneLevel,
  textScore: HexagramTextScore,
  trigramScore: TrigramRelationScore,
  linesScore: LinesPositionScore,
  language: Language = 'zh-CN'
): { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] } {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];
  
  // 基于卦辞分析
  if (textScore.score >= 60) {
    strengths.push(getTranslation(language, 'detailedStrengthsHexagram'));
    opportunities.push(getTranslation(language, 'detailedOpportunitiesHexagram'));
  } else {
    weaknesses.push(getTranslation(language, 'detailedWeaknessesHexagram'));
    threats.push(getTranslation(language, 'detailedThreatsHexagram'));
  }
  
  // 基于上下卦关系分析
  if (trigramScore.score >= 60) {
    strengths.push(getTranslation(language, 'detailedStrengthsTrigram'));
    opportunities.push(getTranslation(language, 'detailedOpportunitiesTrigram'));
  } else {
    weaknesses.push(getTranslation(language, 'detailedWeaknessesTrigram'));
    threats.push(getTranslation(language, 'detailedThreatsTrigram'));
  }
  
  // 基于爻位分析
  if (linesScore.score >= 60) {
    strengths.push(getTranslation(language, 'detailedStrengthsLines'));
    opportunities.push(getTranslation(language, 'detailedOpportunitiesLines'));
  } else {
    weaknesses.push(getTranslation(language, 'detailedWeaknessesLines'));
    threats.push(getTranslation(language, 'detailedThreatsLines'));
  }
  
  return { strengths, weaknesses, opportunities, threats };
}
