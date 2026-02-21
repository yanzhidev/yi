import { getTranslation } from '../../i18n/index';
import type { Translation, Language } from '../../i18n/index';
import type { TrigramRelationScore, TrigramAttributes, HeavenEarthRelation } from '../types';

/**
 * 八卦属性定义
 */
const TRIGRAM_ATTRIBUTES: Record<string, TrigramAttributes> = {
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
 * 获取五行关系映射 - 只使用中文进行计算
 * @param language 语言（仅用于显示）
 * @returns 五行关系映射
 */
function getFiveElementsRelations() {
  // 始终返回中文映射，用于计算
  return {
    generate: { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' },
    overcome: { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' }
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
  
  const upperTrigram = TRIGRAM_ATTRIBUTES[upperTrigramBinary];
  const lowerTrigram = TRIGRAM_ATTRIBUTES[lowerTrigramBinary];
  
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
  
  // 1. 天地关系评分 - 使用中文键值进行计算
  const chineseUpperNature = getTranslation('zh-CN', upperTrigram.natureKey as keyof Translation);
  const chineseLowerNature = getTranslation('zh-CN', lowerTrigram.natureKey as keyof Translation);
  const heavenEarthKey = `${chineseUpperNature}-${chineseLowerNature}`;
  const trigramRelations = getHeavenEarthRelations(); // 始终使用中文映射
  const heavenEarthRelation = trigramRelations[heavenEarthKey];
  
  if (heavenEarthRelation) {
    score += heavenEarthRelation.score;
    // 根据中文描述选择对应的翻译键
    let descKey = 'heavenHeavenRelation';
    if (heavenEarthRelation.description.includes('天地交泰')) {
      descKey = 'heavenEarthRelation';
    } else if (heavenEarthRelation.description.includes('刚健有余')) {
      descKey = 'heavenHeavenRelation';
    } else if (heavenEarthRelation.description.includes('柔顺有余')) {
      descKey = 'earthEarthRelation';
    }
    reasoning += getTranslation(language, 'heavenEarthRelationLabel' as keyof Translation) + getTranslation(language, descKey as keyof Translation) + ` (+${heavenEarthRelation.score}${getTranslation(language, 'pointsText')})\n`;
  }
  
  // 2. 五行关系评分 - 使用中文键值进行计算
  const chineseUpperElement = getTranslation('zh-CN', upperTrigram.elementKey as keyof Translation);
  const chineseLowerElement = getTranslation('zh-CN', lowerTrigram.elementKey as keyof Translation);
  const elementRelation = getElementRelationScore(chineseUpperElement, chineseLowerElement, 'zh-CN'); // 始终使用中文计算
  score += elementRelation.score;
  reasoning += getTranslation(language, 'fiveElementsRelationLabel') + getTranslation(language, elementRelation.descriptionKey as keyof Translation) + ` (${elementRelation.score > 0 ? '+' : ''}${elementRelation.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 3. 阴阳调和评分 - 使用中文键值进行计算
  const yinYangBalance = getYinYangBalanceScore(upperTrigramBinary, lowerTrigramBinary, 'zh-CN'); // 始终使用中文计算
  score += yinYangBalance.score;
  reasoning += getTranslation(language, 'yinYangHarmonyLabel') + getTranslation(language, yinYangBalance.descriptionKey as keyof Translation) + ` (${yinYangBalance.score > 0 ? '+' : ''}${yinYangBalance.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 4. 特殊组合调整 - 使用中文键值进行计算
  const specialCombination = getSpecialCombinationAdjustment(upperTrigramBinary, lowerTrigramBinary, 'zh-CN'); // 始终使用中文计算
  score += specialCombination.score;
  reasoning += getTranslation(language, 'specialCombinationLabel') + getTranslation(language, specialCombination.descriptionKey as keyof Translation) + ` (${specialCombination.score > 0 ? '+' : ''}${specialCombination.score}${getTranslation(language, 'pointsText')})\n`;
  
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
 * 获取天地关系评分 - 只使用中文进行计算
 * @param language 语言（仅用于显示）
 * @returns 天地关系评分配置
 */
function getHeavenEarthRelations(): Record<string, HeavenEarthRelation> {
  // 始终返回中文映射，用于计算
  return {
    '天-地': { score: 25, description: '天地交泰，阴阳调和' },
    '天-天': { score: 15, description: '刚健有余，需防过刚' },
    '地-地': { score: 10, description: '柔顺有余，需防过柔' },
    '天-山': { score: 12, description: '天在山上，高远之象' },
    '天-泽': { score: 18, description: '天在泽上，润泽之象' },
    '天-火': { score: 20, description: '天在火上，光明之象' },
    '天-风': { score: 16, description: '天在风上，流动之象' },
    '天-水': { score: 8, description: '天在水上，润下之象' },
    '天-雷': { score: 14, description: '天在雷上，震动之象' },
    '地-山': { score: 12, description: '地在山上，稳重之象' },
    '地-泽': { score: 16, description: '地在泽上，汇聚之象' },
    '地-火': { score: 8, description: '地在火上，温暖之象' },
    '地-风': { score: 14, description: '地在风上，生发之象' },
    '地-水': { score: 10, description: '地在水上，滋养之象' },
    '地-雷': { score: 18, description: '地在雷上，奋发之象' }
  };
}

/**
 * 五行关系评分
 * @param upperElement 上卦五行
 * @param lowerElement 下卦五行
 * @param language 语言
 * @returns 五行关系评分
 */
function getElementRelationScore(upperElement: string, lowerElement: string, _language: Language = 'zh-CN'): { score: number; descriptionKey: string } {
  const relations = getFiveElementsRelations();
  
  // 上生下（上卦生下卦）- 吉
  if (relations.generate[upperElement as keyof typeof relations.generate] === lowerElement) {
    return { score: 15, descriptionKey: 'upperGeneratesLower' };
  }
  
  // 下生上（下卦生上卦）- 吉
  if (relations.generate[lowerElement as keyof typeof relations.generate] === upperElement) {
    return { score: 12, descriptionKey: 'lowerGeneratesUpper' };
  }
  
  // 上克下（上卦克下卦）- 凶
  if (relations.overcome[upperElement as keyof typeof relations.overcome] === lowerElement) {
    return { score: -10, descriptionKey: 'upperRestrictsLower' };
  }
  
  // 下克上（下卦克上卦）- 凶
  if (relations.overcome[lowerElement as keyof typeof relations.overcome] === upperElement) {
    return { score: -8, descriptionKey: 'lowerRestrictsUpper' };
  }
  
  // 同五行 - 中平
  if (upperElement === lowerElement) {
    return { score: 5, descriptionKey: 'sameElement' };
  }
  
  return { score: 0, descriptionKey: 'fiveElementsNoFeature' };
}

/**
 * 阴阳调和评分
 * @param upperBinary 上卦二进制
 * @param lowerBinary 下卦二进制
 * @param language 语言
 * @returns 阴阳调和评分
 */
function getYinYangBalanceScore(upperBinary: string, lowerBinary: string, _language: Language = 'zh-CN'): { score: number; descriptionKey: string } {
  const upperYangCount = (upperBinary.match(/1/g) || []).length;
  const lowerYangCount = (lowerBinary.match(/1/g) || []).length;
  const upperYinCount = 3 - upperYangCount;
  const lowerYinCount = 3 - lowerYangCount;
  
  // 理想状态：上卦多阳，下卦多阴（天在上，地在下）
  if (upperYangCount > upperYinCount && lowerYinCount > lowerYangCount) {
    return { score: 10, descriptionKey: 'yinYangIdeal' };
  }
  
  // 次佳状态：上下卦阴阳平衡
  if (upperYangCount === upperYinCount && lowerYangCount === lowerYinCount) {
    return { score: 8, descriptionKey: 'yinYangBalanced' };
  }
  
  // 不佳状态：上卦多阴，下卦多阳（天地倒置）
  if (upperYinCount > upperYangCount && lowerYangCount > lowerYinCount) {
    return { score: -12, descriptionKey: 'yinYangInverted' };
  }
  
  return { score: 0, descriptionKey: 'yinYangNoFeature' };
}

/**
 * 特殊组合调整
 * @param upperBinary 上卦二进制
 * @param lowerBinary 下卦二进制
 * @param language 语言
 * @returns 特殊组合调整
 */
function getSpecialCombinationAdjustment(upperBinary: string, lowerBinary: string, _language: Language = 'zh-CN'): { score: number; descriptionKey: string } {
  const combination = upperBinary + lowerBinary;
  
  // 返回翻译键而非翻译后的文本
  const specialCases: Record<string, { score: number; descriptionKey: string }> = {
    // 乾卦 - 纯阳
    '111111': { score: 20, descriptionKey: 'pureYangHexagram' },
    // 坤卦 - 纯阴
    '000000': { score: 15, descriptionKey: 'pureYinHexagram' },
    // 泰卦 - 天地交泰
    '111000': { score: 25, descriptionKey: 'taiHexagram' },
    // 否卦 - 天地不交
    '000111': { score: -20, descriptionKey: 'piHexagram' },
    // 既济 - 水火既济
    '010101': { score: 18, descriptionKey: 'jiJiHexagram' },
    // 未济 - 水火未济
    '101010': { score: -5, descriptionKey: 'weiJiHexagram' },
    // 丰卦 - 雷火丰
    '101001': { score: 12, descriptionKey: 'fengHexagram' },
    // 困卦 - 泽水困
    '110010': { score: -10, descriptionKey: 'kunHexagram' }
  };
  
  return specialCases[combination] || { score: 0, descriptionKey: 'noSpecialCombination' };
}
