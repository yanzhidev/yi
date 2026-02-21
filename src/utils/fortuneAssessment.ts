import { getHexagramById } from './iching';
import { getTranslation } from './i18n';
import type { Language } from './i18n';

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
    benWeight: number;  // 本卦权重
    bianWeight: number; // 变卦权重
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
  const specialAdjustment = getSpecialHexagramAdjustment(hexagramData.id);
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
 * @returns 调整值和理由
 */
function getSpecialHexagramAdjustment(hexagramId: number): { adjustment: number; reasoning: string } {
  const specialCases: Record<number, { adjustment: number; reasoning: string }> = {
    // 乾卦 - 至阳至刚，大吉
    1: { adjustment: 20, reasoning: '\n乾为天，纯阳之卦，刚健中正，为大吉之象。' },
    // 坤卦 - 厚德载物，吉
    2: { adjustment: 15, reasoning: '\n坤为地，纯阴之卦，厚德载物，为吉顺之象。' },
    // 泰卦 - 天地交泰，大吉
    11: { adjustment: 25, reasoning: '\n天地交泰，阴阳调和，诸事亨通，为大吉之象。' },
    // 否卦 - 天地不交，凶
    12: { adjustment: -20, reasoning: '\n天地不交，阴阳闭塞，诸事不宜，为凶险之象。' },
    // 既济 - 水火既济，事成，吉
    63: { adjustment: 18, reasoning: '\n水火既济，事已成功，但需防骄奢，为吉中有警之象。' },
    // 未济 - 水火未济，事未成，中平
    64: { adjustment: -5, reasoning: '\n水火未济，事尚未成，需努力进取，为中平之象。' }
  };
  
  return specialCases[hexagramId] || { adjustment: 0, reasoning: '' };
}

// ==================== 上下卦关系评分算法 (30%权重) ====================

/**
 * 八卦属性定义
 */
const TRIGRAM_ATTRIBUTES = {
  '111': { name: '乾', element: '金', nature: '天', quality: '刚健', position: '上' },
  '000': { name: '坤', element: '土', nature: '地', quality: '柔顺', position: '下' },
  '001': { name: '震', element: '木', nature: '雷', quality: '震动', position: '下' },
  '010': { name: '坎', element: '水', nature: '水', quality: '险陷', position: '下' },
  '011': { name: '艮', element: '土', nature: '山', quality: '静止', position: '上' },
  '100': { name: '巽', element: '木', nature: '风', quality: '顺从', position: '下' },
  '101': { name: '离', element: '火', nature: '火', quality: '附着', position: '上' },
  '110': { name: '兑', element: '金', nature: '泽', quality: '喜悦', position: '上' }
};

/**
 * 五行相生相克关系
 */
const FIVE_ELEMENTS_RELATIONS = {
  相生: {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
  },
  相克: {
    '木': '土', '土': '水', '水': '火', '火': '金', '金': '木'
  }
};

/**
 * 天地关系评分
 */
const HEAVEN_EARTH_RELATIONS = {
  '天-地': { score: 25, description: '天地交泰，阴阳调和' },
  '天-天': { score: 15, description: '刚健有余，需防过刚' },
  '地-地': { score: 10, description: '柔顺有余，需防过柔' },
  '天-山': { score: 12, description: '天在山上，高远之象' },
  '天-泽': { score: 18, description: '天在泽上，润泽之象' },
  '天-火': { score: 20, description: '天火同人，光明之象' },
  '天-风': { score: 16, description: '天风姤，相遇之象' },
  '天-水': { score: 8, description: '天水讼，争讼之象' },
  '天-雷': { score: 14, description: '天雷无妄，无妄之象' },
  '地-山': { score: 12, description: '地山谦，谦逊之象' },
  '地-泽': { score: 16, description: '地泽临，临莅之象' },
  '地-火': { score: 8, description: '地火明夷，光明受损' },
  '地-风': { score: 14, description: '地风升，上升之象' },
  '地-水': { score: 10, description: '地水师，师旅之象' },
  '地-雷': { score: 18, description: '地雷复，复归之象' }
};

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
  reasoning += getTranslation(language, 'upperTrigramLabel') + `${upperTrigram.name}（${upperTrigram.nature}，${upperTrigram.element}）\n`;
  reasoning += getTranslation(language, 'lowerTrigramLabel') + `${lowerTrigram.name}（${lowerTrigram.nature}，${lowerTrigram.element}）\n`;
  
  // 1. 天地关系评分
  const heavenEarthKey = `${upperTrigram.nature}-${lowerTrigram.nature}`;
  const heavenEarthRelation = HEAVEN_EARTH_RELATIONS[heavenEarthKey as keyof typeof HEAVEN_EARTH_RELATIONS];
  if (heavenEarthRelation) {
    score += heavenEarthRelation.score;
    reasoning += getTranslation(language, 'heavenEarthRelationLabel') + `${heavenEarthRelation.description} (+${heavenEarthRelation.score}分)\n`;
  }
  
  // 2. 五行关系评分
  const elementRelation = getElementRelationScore(upperTrigram.element, lowerTrigram.element, language);
  score += elementRelation.score;
  reasoning += getTranslation(language, 'fiveElementsRelationLabel') + `${elementRelation.description} (${elementRelation.score > 0 ? '+' : ''}${elementRelation.score}分)\n`;
  
  // 3. 阴阳调和评分
  const yinYangBalance = getYinYangBalanceScore(upperTrigramBinary, lowerTrigramBinary);
  score += yinYangBalance.score;
  reasoning += getTranslation(language, 'yinYangHarmonyLabel') + `${yinYangBalance.description} (${yinYangBalance.score > 0 ? '+' : ''}${yinYangBalance.score}分)\n`;
  
  // 4. 特殊组合调整
  const specialCombination = getSpecialCombinationAdjustment(upperTrigramBinary, lowerTrigramBinary);
  score += specialCombination.score;
  reasoning += getTranslation(language, 'specialCombinationLabel') + `${specialCombination.description} (${specialCombination.score > 0 ? '+' : ''}${specialCombination.score}分)\n`;
  
  // 确保分数在合理范围内
  score = Math.max(0, Math.min(100, score));
  
  const relationship = `${upperTrigram.name}${lowerTrigram.name}（${upperTrigram.nature}在${lowerTrigram.nature}上）`;
  reasoning += `\n${getTranslation(language, 'relationshipSummary')}${relationship}`;
  reasoning += `\n${getTranslation(language, 'finalScoreLabel')}${score.toFixed(1)}`;
  
  return {
    score,
    reasoning,
    upperTrigram: upperTrigram.name,
    lowerTrigram: lowerTrigram.name,
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
  if (relations.相生[upperElement as keyof typeof relations.相生] === lowerElement) {
    return { score: 15, description: getTranslation(language, 'upperGeneratesLower') };
  }
  
  // 下生上（下卦生上卦）- 吉
  if (relations.相生[lowerElement as keyof typeof relations.相生] === upperElement) {
    return { score: 12, description: getTranslation(language, 'lowerGeneratesUpper') };
  }
  
  // 上克下（上卦克下卦）- 凶
  if (relations.相克[upperElement as keyof typeof relations.相克] === lowerElement) {
    return { score: -10, description: getTranslation(language, 'upperRestrictsLower') };
  }
  
  // 下克上（下卦克上卦）- 凶
  if (relations.相克[lowerElement as keyof typeof relations.相克] === upperElement) {
    return { score: -8, description: getTranslation(language, 'lowerRestrictsUpper') };
  }
  
  // 同五行 - 中平
  if (upperElement === lowerElement) {
    return { score: 5, description: getTranslation(language, 'sameElement') };
  }
  
  return { score: 0, description: '五行关系无明显特征' };
}

/**
 * 阴阳调和评分
 * @param upperBinary 上卦二进制
 * @param lowerBinary 下卦二进制
 * @returns 阴阳调和评分
 */
function getYinYangBalanceScore(upperBinary: string, lowerBinary: string): { score: number; description: string } {
  const upperYangCount = (upperBinary.match(/1/g) || []).length;
  const lowerYangCount = (lowerBinary.match(/1/g) || []).length;
  const upperYinCount = 3 - upperYangCount;
  const lowerYinCount = 3 - lowerYangCount;
  
  // 理想状态：上卦多阳，下卦多阴（天在上，地在下）
  if (upperYangCount > upperYinCount && lowerYinCount > lowerYangCount) {
    return { score: 10, description: '上阳下阴，天地正位，阴阳调和' };
  }
  
  // 次佳状态：上下卦阴阳平衡
  if (upperYangCount === upperYinCount && lowerYangCount === lowerYinCount) {
    return { score: 8, description: '阴阳平衡，中和之象' };
  }
  
  // 不佳状态：上卦多阴，下卦多阳（天地倒置）
  if (upperYinCount > upperYangCount && lowerYangCount > lowerYinCount) {
    return { score: -12, description: '上阴下阳，天地倒置，阴阳失调' };
  }
  
  return { score: 0, description: '阴阳分布无明显特征' };
}

/**
 * 特殊组合调整
 * @param upperBinary 上卦二进制
 * @param lowerBinary 下卦二进制
 * @returns 特殊组合调整
 */
function getSpecialCombinationAdjustment(upperBinary: string, lowerBinary: string): { score: number; description: string } {
  const combination = upperBinary + lowerBinary;
  
  const specialCases: Record<string, { score: number; description: string }> = {
    // 乾卦 - 纯阳
    '111111': { score: 20, description: '纯阳之卦，刚健中正' },
    // 坤卦 - 纯阴
    '000000': { score: 15, description: '纯阴之卦，厚德载物' },
    // 泰卦 - 天地交泰
    '111000': { score: 25, description: '天地交泰，阴阳调和' },
    // 否卦 - 天地不交
    '000111': { score: -20, description: '天地不交，阴阳闭塞' },
    // 既济 - 水火既济
    '010101': { score: 18, description: '水火既济，事已成功' },
    // 未济 - 水火未济
    '101010': { score: -5, description: '水火未济，事尚未成' },
    // 丰卦 - 雷火丰
    '101001': { score: 12, description: '雷火丰，丰盛之象' },
    // 困卦 - 泽水困
    '110010': { score: -10, description: '泽水困，困顿之象' }
  };
  
  return specialCases[combination] || { score: 0, description: '无特殊组合特征' };
}

// ==================== 爻位综合评分算法 (30%权重) ====================

/**
 * 爻位属性定义
 */
const LINE_POSITIONS = {
  1: { name: '初爻', position: '最下', nature: '始', weight: 1.0 },
  2: { name: '二爻', position: '下中', nature: '中', weight: 1.1 },
  3: { name: '三爻', position: '下上', nature: '凶', weight: 0.9 },
  4: { name: '四爻', position: '上下', nature: '凶', weight: 0.9 },
  5: { name: '五爻', position: '上中', nature: '吉', weight: 1.2 },
  6: { name: '上爻', position: '最上', nature: '终', weight: 1.0 }
};

/**
 * 爻型吉凶权重
 */
const LINE_TYPE_WEIGHTS = {
  'oldYang': { score: 8, description: '老阳，变爻，阳气极盛' },
  'youngYang': { score: 6, description: '少阳，阳爻，阳气上升' },
  'youngYin': { score: 4, description: '少阴，阴爻，阴气下沉' },
  'oldYin': { score: 2, description: '老阴，变爻，阴气极盛' }
};

/**
 * 特殊爻位组合
 */
const SPECIAL_LINE_COMBINATIONS = {
  // 中正之位（二五爻）
  '2-5': { score: 15, description: '二五中正，君臣得位' },
  // 乾坤纯卦
  'all-yang': { score: 20, description: '纯阳之卦，刚健中正' },
  'all-yin': { score: 15, description: '纯阴之卦，厚德载物' },
  // 当位爻（阳爻居阳位，阴爻居阴位）
  'proper-position': { score: 10, description: '爻位得当，各司其职' },
  // 失位爻（阳爻居阴位，阴爻居阳位）
  'improper-position': { score: -8, description: '爻位失当，阴阳失调' }
};

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
  
  // 1. 分析各爻位置和类型
  let properPositionCount = 0;
  let improperPositionCount = 0;
  let yangCount = 0;
  let yinCount = 0;
  
  reasoning += '\n' + getTranslation(language, 'eachLineAnalysis') + '\n';
  
  lines.forEach((line, index) => {
    const position = index + 1;
    const positionInfo = LINE_POSITIONS[position as keyof typeof LINE_POSITIONS];
    const lineTypeWeight = LINE_TYPE_WEIGHTS[line.lineType as keyof typeof LINE_TYPE_WEIGHTS];
    
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
    
    const analysis = `${positionInfo.name}(${lineTypeWeight.description})：${isProperPosition ? '当位' : '失位'} (+${positionScore.toFixed(1)}分)`;
    linesAnalysis.push(analysis);
    reasoning += `${analysis}\n`;
  });
  
  // 2. 特殊组合评分
  const specialCombinations = getSpecialLineCombinations(lines, changingLines);
  score += specialCombinations.score;
  reasoning += `\n${getTranslation(language, 'specialCombinationsLabel')}${specialCombinations.description} (${specialCombinations.score > 0 ? '+' : ''}${specialCombinations.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 3. 变爻分析
  const changingLinesAnalysis = analyzeChangingLines(lines, changingLines);
  score += changingLinesAnalysis.score;
  reasoning += `\n${getTranslation(language, 'changingLinesAnalysisLabel')}${changingLinesAnalysis.description} (${changingLinesAnalysis.score > 0 ? '+' : ''}${changingLinesAnalysis.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 4. 阴阳平衡分析
  const yinYangBalance = analyzeLinesYinYangBalance(yangCount, yinCount);
  score += yinYangBalance.score;
  reasoning += `\n${getTranslation(language, 'yinYangBalanceLabel')}${yinYangBalance.description} (${yinYangBalance.score > 0 ? '+' : ''}${yinYangBalance.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 5. 爻位结构分析
  const positionStructure = analyzePositionStructure(lines);
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
 * 获取特殊爻位组合
 * @param lines 六爻数组
 * @param changingLines 变爻位置数组
 * @returns 特殊组合评分
 */
function getSpecialLineCombinations(lines: any[], changingLines: number[]): { score: number; description: string } {
  let totalScore = 0;
  const descriptions: string[] = [];
  
  // 检查纯阳纯阴
  const allYang = lines.every((line: any) => line.value === 1);
  const allYin = lines.every((line: any) => line.value === 0);
  
  if (allYang) {
    totalScore += SPECIAL_LINE_COMBINATIONS['all-yang'].score;
    descriptions.push(SPECIAL_LINE_COMBINATIONS['all-yang'].description);
  }
  
  if (allYin) {
    totalScore += SPECIAL_LINE_COMBINATIONS['all-yin'].score;
    descriptions.push(SPECIAL_LINE_COMBINATIONS['all-yin'].description);
  }
  
  // 检查特殊爻位组合
  for (const position of changingLines) {
    const line = lines[position - 1];
    if (line?.isChanging) {
      if (position === 2 || position === 5) {
        totalScore += SPECIAL_LINE_COMBINATIONS['2-5'].score;
        descriptions.push(SPECIAL_LINE_COMBINATIONS['2-5'].description);
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
    totalScore += SPECIAL_LINE_COMBINATIONS['proper-position'].score;
    descriptions.push(SPECIAL_LINE_COMBINATIONS['proper-position'].description);
  } else if (improperCount > properCount) {
    totalScore += SPECIAL_LINE_COMBINATIONS['improper-position'].score;
    descriptions.push(SPECIAL_LINE_COMBINATIONS['improper-position'].description);
  }
  
  return {
    score: totalScore,
    description: descriptions.join('；') || '无特殊组合'
  };
}

// ...

/**
 * 分析变爻
 * @param lines 六爻数组
 * @param changingLines 变爻位置数组
 * @returns 变爻分析结果
 */
function analyzeChangingLines(_lines: any[], changingLines: number[]): { score: number; description: string } {
  const changingCount = changingLines.length;
  
  if (changingCount === 0) {
    return { score: 5, description: '无变爻，局势稳定' };
  }
  
  if (changingCount === 1) {
    return { score: 8, description: '一爻变，变化适中，宜顺势而为' };
  }
  
  if (changingCount === 2) {
    return { score: 6, description: '二爻变，变化较多，需谨慎应对' };
  }
  
  if (changingCount === 3) {
    return { score: 4, description: '三爻变，变化剧烈，局势动荡' };
  }
  
  if (changingCount >= 4) {
    return { score: -5, description: '多爻变，变化极大，宜静观其变' };
  }
  
  return { score: 0, description: '变爻情况不明' };
}

/**
 * 分析阴阳平衡
 * @param yangCount 阳爻数量
 * @param yinCount 阴爻数量
 * @returns 阴阳平衡分析结果
 */
function analyzeLinesYinYangBalance(yangCount: number, yinCount: number): { score: number; description: string } {
  if (yangCount === yinCount) {
    return { score: 10, description: '阴阳平衡，和谐之象' };
  }
  
  if (yangCount === 4 && yinCount === 2) {
    return { score: 8, description: '阳多阴少，阳气旺盛' };
  }
  
  if (yangCount === 2 && yinCount === 4) {
    return { score: 6, description: '阴多阳少，阴气充足' };
  }
  
  if (yangCount === 5 && yinCount === 1) {
    return { score: 4, description: '阳极盛，防过刚' };
  }
  
  if (yangCount === 1 && yinCount === 5) {
    return { score: 3, description: '阴极盛，防过柔' };
  }
  
  return { score: 0, description: '阴阳分布无明显特征' };
}

/**
 * 分析爻位结构
 * @param lines 六爻数组
 * @returns 爻位结构分析结果
 */
function analyzePositionStructure(lines: any[]): { score: number; description: string } {
  let score = 0;
  const descriptions: string[] = [];
  
  // 分析三爻四爻（人位）
  const line3 = lines[2]; // 三爻
  const line4 = lines[3]; // 四爻
  
  if (line3 && line4) {
    // 三四爻为阴阳相济为佳
    if (line3.value !== line4.value) {
      score += 5;
      descriptions.push('三四爻阴阳相济');
    }
    
    // 三四爻凶位，宜静不宜动
    if (line3.value === 0 && line4.value === 0) {
      score += 3;
      descriptions.push('三四爻阴柔，以静制动');
    }
  }
  
  // 分析初上爻（天地位）
  const line1 = lines[0]; // 初爻
  const line6 = lines[5]; // 上爻
  
  if (line1 && line6) {
    // 初上爻相应为佳
    if (line1.value === line6.value) {
      score += 4;
      descriptions.push('初上爻相应');
    }
  }
  
  // 分析二五爻（中位）
  const line2 = lines[1]; // 二爻
  const line5 = lines[4]; // 五爻
  
  if (line2 && line5) {
    // 二五爻相应为佳
    if (line2.value !== line5.value) {
      score += 6;
      descriptions.push('二五爻相应，阴阳调和');
    }
  }
  
  return {
    score,
    description: descriptions.join('；') || '爻位结构无明显特征'
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
  changedHexagramId: number | null
): ChangingLinesAdjustment {
  let adjustment = 0;
  let reasoning = '变爻规则分析：\n';
  let specialCase = '一般情况';
  
  const changingCount = changingLines.length;
  
  // 1. 根据变爻数量调整
  if (changingCount === 0) {
    adjustment += 5;
    reasoning += '无变爻：局势稳定，宜守成 (+5分)\n';
    specialCase = '静卦';
  } else if (changingCount === 1) {
    adjustment += 8;
    reasoning += '一爻变：变化适中，宜顺势而为 (+8分)\n';
    specialCase = '单爻变';
  } else if (changingCount === 2) {
    adjustment += 3;
    reasoning += '二爻变：变化较多，需谨慎应对 (+3分)\n';
    specialCase = '双爻变';
  } else if (changingCount === 3) {
    adjustment -= 2;
    reasoning += '三爻变：变化剧烈，局势动荡 (-2分)\n';
    specialCase = '三爻变';
  } else if (changingCount >= 4) {
    adjustment -= 8;
    reasoning += '多爻变：变化极大，宜静观其变 (-8分)\n';
    specialCase = '多爻变';
  }
  
  // 2. 特殊变爻位置调整
  const specialPositions = analyzeSpecialChangingPositions(changingLines);
  adjustment += specialPositions.adjustment;
  reasoning += specialPositions.reasoning;
  
  // 3. 特殊卦象变爻调整
  if (changedHexagramId) {
    const specialHexagramChange = analyzeSpecialHexagramChange(hexagramId, changedHexagramId);
    adjustment += specialHexagramChange.adjustment;
    reasoning += specialHexagramChange.reasoning;
    if (specialHexagramChange.specialCase) {
      specialCase = specialHexagramChange.specialCase;
    }
  }
  
  // 4. 极端情况调整
  const extremeCase = analyzeExtremeChangingCase(changingLines, hexagramId);
  adjustment += extremeCase.adjustment;
  reasoning += extremeCase.reasoning;
  if (extremeCase.specialCase) {
    specialCase = extremeCase.specialCase;
  }
  
  // 确保调整值在合理范围内
  adjustment = Math.max(-20, Math.min(20, adjustment));
  
  reasoning += `\n最终调整：${adjustment > 0 ? '+' : ''}${adjustment}分`;
  
  return {
    adjustment,
    reasoning,
    specialCase
  };
}

/**
 * 分析特殊变爻位置
 * @param changingLines 变爻位置数组
 * @returns 特殊位置分析结果
 */
function analyzeSpecialChangingPositions(changingLines: number[]): { adjustment: number; reasoning: string } {
  let adjustment = 0;
  const reasoning: string[] = [];
  
  changingLines.forEach(position => {
    switch (position) {
      case 2: // 二爻变
        adjustment += 3;
        reasoning.push('二爻变：中位变化，影响核心 (+3分)');
        break;
      case 5: // 五爻变
        adjustment += 4;
        reasoning.push('五爻变：君位变化，影响重大 (+4分)');
        break;
      case 3: // 三爻变
      case 4: // 四爻变
        adjustment -= 2;
        reasoning.push(`${position}爻变：人位变化，多有风险 (-2分)`);
        break;
      case 1: // 初爻变
        adjustment += 1;
        reasoning.push('初爻变：始位变化，影响基础 (+1分)');
        break;
      case 6: // 上爻变
        adjustment += 2;
        reasoning.push('上爻变：终位变化，影响结果 (+2分)');
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
 * @returns 特殊卦象变化分析
 */
function analyzeSpecialHexagramChange(fromId: number, toId: number): { adjustment: number; reasoning: string; specialCase?: string } {
  const specialChanges: Record<string, { adjustment: number; reasoning: string; specialCase?: string }> = {
    // 乾变坤
    '1-2': { adjustment: -10, reasoning: '乾变坤：刚变柔，由主动转被动 (-10分)', specialCase: '乾坤转换' },
    // 坤变乾
    '2-1': { adjustment: 10, reasoning: '坤变乾：柔变刚，由被动转主动 (+10分)', specialCase: '乾坤转换' },
    // 泰变否
    '11-12': { adjustment: -15, reasoning: '泰变否：由通转塞，运势急转直下 (-15分)', specialCase: '泰否转换' },
    // 否变泰
    '12-11': { adjustment: 15, reasoning: '否变泰：由塞转通，运势豁然开朗 (+15分)', specialCase: '泰否转换' },
    // 既济变未济
    '63-64': { adjustment: -12, reasoning: '既济变未济：由成转败，功败垂成 (-12分)', specialCase: '既未转换' },
    // 未济变既济
    '64-63': { adjustment: 12, reasoning: '未济变既济：由败转成，大器晚成 (+12分)', specialCase: '既未转换' }
  };
  
  const key = `${fromId}-${toId}`;
  return specialChanges[key] || { adjustment: 0, reasoning: '卦象变化无特殊特征\n' };
}

/**
 * 分析极端变爻情况
 * @param changingLines 变爻位置数组
 * @param hexagramId 卦象ID
 * @returns 极端情况分析
 */
function analyzeExtremeChangingCase(changingLines: number[], hexagramId: number): { adjustment: number; reasoning: string; specialCase?: string } {
  const changingCount = changingLines.length;
  
  // 乾卦六爻全变（用九）
  if (hexagramId === 1 && changingCount === 6) {
    return {
      adjustment: 18,
      reasoning: '乾卦六爻全变：见群龙无首，吉 (+18分)',
      specialCase: '用九'
    };
  }
  
  // 坤卦六爻全变（用六）
  if (hexagramId === 2 && changingCount === 6) {
    return {
      adjustment: 15,
      reasoning: '坤卦六爻全变：利永贞，吉 (+15分)',
      specialCase: '用六'
    };
  }
  
  // 中间四爻变
  if (changingCount === 4 && 
      changingLines.includes(2) && changingLines.includes(3) && 
      changingLines.includes(4) && changingLines.includes(5)) {
    return {
      adjustment: -8,
      reasoning: '中间四爻变：核心动荡，局势不稳 (-8分)',
      specialCase: '四爻变'
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
        reasoning: '隔爻变化：变化不连贯，难以把握 (-5分)',
        specialCase: '隔爻变'
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
  benWeight: number;  // 本卦权重
  bianWeight: number; // 变卦权重
} {
  const count = changingLines.length;
  
  // 基于变爻数量动态调整
  if (count === 0) return { benWeight: 100, bianWeight: 0 };
  if (count === 1) return { benWeight: 90, bianWeight: 10 };
  if (count === 2) return { benWeight: 80, bianWeight: 20 };
  if (count === 3) return { benWeight: 60, bianWeight: 40 };
  if (count === 4) return { benWeight: 40, bianWeight: 60 };
  if (count === 5) return { benWeight: 20, bianWeight: 80 };
  return { benWeight: 10, bianWeight: 90 }; // 六爻全变
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
  const hexagramTextScore = combineScores(benHexagramTextScore, bianHexagramTextScore, weights.benWeight, weights.bianWeight);
  const trigramRelationScore = combineScores(benTrigramRelationScore, bianTrigramRelationScore, weights.benWeight, weights.bianWeight);
  const linesPositionScore = combineScores(benLinesPositionScore, bianLinesPositionScore, weights.benWeight, weights.bianWeight);
  
  // 4. 计算变爻调整
  const changingLinesAdjustment = config.enableChangingLinesAdjustment 
    ? calculateChangingLinesAdjustment(result.changingLines, result.hexagramId, result.changedHexagramId)
    : { adjustment: 0, reasoning: '变爻调整已禁用', specialCase: '无调整' };
  
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
 * @param benWeight 本卦权重
 * @param bianWeight 变卦权重
 * @returns 合并后的评分
 */
function combineScores<T extends { score: number; reasoning: string }>(
  benScore: T, 
  bianScore: T | null, 
  benWeight: number, 
  bianWeight: number
): T {
  if (!bianScore) {
    return benScore;
  }
  
  const combinedScore = (benScore.score * benWeight + bianScore.score * bianWeight) / 100;
  const combinedReasoning = `本卦评分：${benScore.score.toFixed(1)}分 (权重${benWeight}%)\n变卦评分：${bianScore.score.toFixed(1)}分 (权重${bianWeight}%)\n综合评分：${combinedScore.toFixed(1)}分\n\n本卦分析：\n${benScore.reasoning}\n\n变卦分析：\n${bianScore.reasoning}`;
  
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
    advice += ' 卦辞显示大吉，可放心前行。';
  } else if (textScore.score <= 30) {
    advice += ' 卦辞显示凶险，务必谨慎。';
  }
  
  if (trigramScore.score >= 70) {
    advice += ' 上下卦调和，得天时地利。';
  } else if (trigramScore.score <= 30) {
    advice += ' 上下卦冲突，需调整策略。';
  }
  
  if (linesScore.score >= 70) {
    advice += ' 爻位得当，人事和谐。';
  } else if (linesScore.score <= 30) {
    advice += ' 爻位失当，需防小人。';
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
  language: string = 'zh-CN'
): { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] } {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];
  
  // 多语言内容映射
  const content = {
    'en': {
      strengths: {
        hexagram: 'Hexagram text is auspicious, with heavenly assistance',
        trigram: 'Upper and lower trigrams harmonized, with timing and location advantages',
        lines: 'Line positions are proper, with harmonious human relations'
      },
      weaknesses: {
        hexagram: 'Hexagram text is inauspicious, need cautious action',
        trigram: 'Upper and lower trigrams conflict, with unfavorable environment',
        lines: 'Line positions are improper, with disharmonious human relations'
      },
      opportunities: {
        hexagram: 'Seize the timing, actively advance',
        trigram: 'Leverage environmental advantages, follow the trend',
        lines: 'Unite and cooperate, seek common development'
      },
      threats: {
        hexagram: 'Prevent trouble before it happens, avoid impulsiveness',
        trigram: 'Guard against external risks, advance steadily',
        lines: 'Prevent internal conflicts, distinguish right from wrong'
      }
    },
    'zh-CN': {
      strengths: {
        hexagram: '卦辞吉祥，有天道相助',
        trigram: '上下卦调和，得天时地利',
        lines: '爻位得当，人事和谐'
      },
      weaknesses: {
        hexagram: '卦辞不吉，需谨慎行事',
        trigram: '上下卦冲突，环境不利',
        lines: '爻位失当，人事不和'
      },
      opportunities: {
        hexagram: '把握时机，积极进取',
        trigram: '借助环境优势，顺势而为',
        lines: '团结协作，共谋发展'
      },
      threats: {
        hexagram: '防患于未然，避免冲动',
        trigram: '防范外部风险，稳扎稳打',
        lines: '防范内部矛盾，明辨是非'
      }
    },
    'zh-TW': {
      strengths: {
        hexagram: '卦辭吉祥，有天道相助',
        trigram: '上下卦調和，得天時地利',
        lines: '爻位得當，人事和諧'
      },
      weaknesses: {
        hexagram: '卦辭不吉，需謹慎行事',
        trigram: '上下卦衝突，環境不利',
        lines: '爻位失當，人事不和'
      },
      opportunities: {
        hexagram: '把握時機，積極進取',
        trigram: '借助環境優勢，順勢而為',
        lines: '團結協作，共謀發展'
      },
      threats: {
        hexagram: '防患於未然，避免衝動',
        trigram: '防範外部風險，穩紮穩打',
        lines: '防範內部矛盾，明辨是非'
      }
    },
    'es': {
      strengths: {
        hexagram: 'El texto del hexagrama es auspicioso, con asistencia celestial',
        trigram: 'Trigramas superior e inferior armonizados, con ventajas de tiempo y lugar',
        lines: 'Las posiciones de las líneas son apropiadas, con relaciones humanas armoniosas'
      },
      weaknesses: {
        hexagram: 'El texto del hexagrama es inauspicioso, requiere acción cautelosa',
        trigram: 'Trigramas superior e inferior en conflicto, con entorno desfavorable',
        lines: 'Las posiciones de las líneas son inapropiadas, con relaciones humanas discordantes'
      },
      opportunities: {
        hexagram: 'Aprovechar el momento, avanzar activamente',
        trigram: 'Leverage ventajas ambientales, seguir la tendencia',
        lines: 'Unirse y cooperar, buscar desarrollo común'
      },
      threats: {
        hexagram: 'Prevenir problemas antes de que ocurran, evitar impulsividad',
        trigram: 'Proteger contra riesgos externos, avanzar steady',
        lines: 'Prevenir conflictos internos, distinguir lo correcto de lo incorrecto'
      }
    }
  };
  
  const langContent = content[language as keyof typeof content] || content['zh-CN'];
  
  // 基于卦辞分析
  if (textScore.score >= 60) {
    strengths.push(langContent.strengths.hexagram);
    opportunities.push(langContent.opportunities.hexagram);
  } else {
    weaknesses.push(langContent.weaknesses.hexagram);
    threats.push(langContent.threats.hexagram);
  }
  
  // 基于上下卦关系分析
  if (trigramScore.score >= 60) {
    strengths.push(langContent.strengths.trigram);
    opportunities.push(langContent.opportunities.trigram);
  } else {
    weaknesses.push(langContent.weaknesses.trigram);
    threats.push(langContent.threats.trigram);
  }
  
  // 基于爻位分析
  if (linesScore.score >= 60) {
    strengths.push(langContent.strengths.lines);
    opportunities.push(langContent.opportunities.lines);
  } else {
    weaknesses.push(langContent.weaknesses.lines);
    threats.push(langContent.threats.lines);
  }
  
  return { strengths, weaknesses, opportunities, threats };
}
