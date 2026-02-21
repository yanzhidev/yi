// 类型定义
export type {
  FortuneLevel as FortuneLevelType,
  FortuneLevelConfig,
  HexagramTextScore,
  TrigramRelationScore,
  LinesPositionScore,
  ChangingLinesAdjustment,
  FortuneAssessment as IFortuneAssessmentType,
  FortuneAssessmentConfig,
  TrigramAttributes,
  LinePosition,
  KeywordGroup,
  FiveElementsRelations,
  HeavenEarthRelation,
  LineTypeWeight,
  SpecialCombination,
  BaseScore,
  HexagramWeights
} from './types';

// 常量
export { FortuneLevel } from './types';

// 配置
export {
  DEFAULT_FORTUNE_CONFIG,
  getFortuneLevels,
  FORTUNE_LEVELS,
  validateConfig,
  createConfig
} from './config';

// 评分器
export { analyzeHexagramText } from './scorers/hexagramText';
export { analyzeTrigramRelation } from './scorers/trigramRelation';
export { calculateLinesPositionScore } from './scorers/linePosition';

// 分析逻辑
export {
  calculateChangingLinesAdjustment,
  getHexagramWeight,
  combineScores,
  getFortuneLevel,
  generateOverallAdvice,
  calculateConfidence,
  generateDetailedAnalysis
} from './analysis';

// 主函数
import { getHexagramById } from '../iching';
import { analyzeHexagramText } from './scorers/hexagramText';
import { analyzeTrigramRelation } from './scorers/trigramRelation';
import { calculateLinesPositionScore } from './scorers/linePosition';
import { 
  calculateChangingLinesAdjustment,
  getHexagramWeight,
  combineScores,
  getFortuneLevel,
  generateOverallAdvice,
  calculateConfidence,
  generateDetailedAnalysis
} from './analysis';
import { DEFAULT_FORTUNE_CONFIG } from './config';
import type { 
  FortuneAssessment as IFortuneAssessment,
  FortuneAssessmentConfig,
  HexagramTextScore,
  TrigramRelationScore,
  LinesPositionScore
} from './types';
import type { Language } from '../i18n/index';

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
): IFortuneAssessment {
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
  const overallAdvice = generateOverallAdvice(hexagramTextScore, trigramRelationScore, linesPositionScore, language);
  
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

