import { getTranslation } from '../../i18n';
import type { Language, Translation } from '../../i18n';
import type { HexagramTextScore, KeywordGroup } from '../types';
import { getHexagramById } from '../../iching';

/**
 * 吉凶关键词映射
 */
const FORTUNE_KEYWORDS: {
  positive: KeywordGroup;
  negative: KeywordGroup;
} = {
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
 * 分析卦辞文本 - 使用中文关键词进行计算
 * @param hexagramData 卦象数据
 * @param language 语言（仅用于显示）
 * @returns 卦辞评分
 */
export function analyzeHexagramText(hexagramData: any, language: Language = 'zh-CN'): HexagramTextScore {
  const { name, text } = hexagramData;
  // 始终使用中文文本进行计算
  const chineseHexagramData = getHexagramById(hexagramData.id);
  if (!chineseHexagramData) {
    throw new Error(`无法找到卦象数据：${hexagramData.id}`);
  }
  const fullText = `${chineseHexagramData.name} ${chineseHexagramData.text}`;
  
  let score = 50; // 基础分数
  const keywords: string[] = [];
  let reasoning = getTranslation(language, 'hexagramTextAnalysisLabel') + '\n';
  
  // 分析卦辞原文（使用显示语言）
  reasoning += getTranslation(language, 'hexagramNameLabel') + name + '\n';
  reasoning += getTranslation(language, 'hexagramTextLabel') + text + '\n';
  
  // 计算吉凶关键词得分（始终使用中文）
  const positiveScore = calculateKeywordScore(fullText, FORTUNE_KEYWORDS.positive, keywords);
  const negativeScore = calculateKeywordScore(fullText, FORTUNE_KEYWORDS.negative, keywords);
  
  // 调整分数
  score += positiveScore - negativeScore;
  
  // 特殊卦象调整（始终使用中文）
  const specialAdjustment = getSpecialHexagramAdjustment(hexagramData.id, 'zh-CN');
  score += specialAdjustment.adjustment;
  reasoning += getTranslation(language, specialAdjustment.adjustment > 0 ? 'hexagram1Adjustment' : specialAdjustment.adjustment < 0 ? 'hexagram12Adjustment' : 'hexagram64Adjustment');
  
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
  keywordGroups: KeywordGroup,
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
