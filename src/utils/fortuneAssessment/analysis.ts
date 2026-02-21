import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import type { 
  ChangingLinesAdjustment, 
  FortuneAssessment, 
  HexagramTextScore,
  TrigramRelationScore,
  LinesPositionScore,
  HexagramWeights,
  BaseScore
} from './types';

/**
 * 变爻规则调整函数 - 使用中文进行计算
 * @param changingLines 变爻位置数组
 * @param hexagramId 原卦象ID
 * @param changedHexagramId 变卦象ID
 * @param language 语言（仅用于显示）
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
  
  // 1. 根据变爻数量调整（始终使用中文逻辑）
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
  
  // 2. 特殊变爻位置调整（始终使用中文逻辑）
  const specialPositions = analyzeSpecialChangingPositions(changingLines, language);
  adjustment += specialPositions.adjustment;
  reasoning += specialPositions.reasoning;
  
  // 3. 特殊卦象变化分析（始终使用中文逻辑）
  if (changedHexagramId) {
    const specialChange = analyzeSpecialHexagramChange(hexagramId, changedHexagramId, 'zh-CN');
    adjustment += specialChange.adjustment;
    reasoning += getTranslation(language, specialChange.adjustment > 0 ? 'qianToKun' : specialChange.adjustment < -10 ? 'taiToPi' : 'jiJiToWeiJi');
    if (specialChange.specialCase) {
      specialCase = getTranslation(language, specialChange.specialCase === 'qianKunConversion' ? 'qianKunConversion' : 'taiPiConversion');
    }
  }
  
  // 4. 极端情况调整（始终使用中文逻辑）
  const extremeCase = analyzeExtremeChangingCase(changingLines, hexagramId, 'zh-CN');
  adjustment += extremeCase.adjustment;
  reasoning += getTranslation(language, extremeCase.adjustment > 10 ? 'qianAllChange' : extremeCase.adjustment < 0 ? 'middleFourChange' : 'jumpingChange');
  if (extremeCase.specialCase) {
    specialCase = getTranslation(language, extremeCase.specialCase === 'yongJiu' ? 'yongJiu' : extremeCase.specialCase === 'fourLineChange' ? 'fourLineChange' : 'jumpingChange');
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

/**
 * 获取本卦和变卦的权重
 * @param changingLines 变爻位置数组
 * @returns 本卦权重和变卦权重
 */
export function getHexagramWeight(changingLines: number[]): HexagramWeights {
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
 * 合并本卦和变卦评分
 * @param benScore 本卦评分
 * @param bianScore 变卦评分
 * @param originalWeight 本卦权重
 * @param changedWeight 变卦权重
 * @returns 合并后的评分
 */
export function combineScores<T extends BaseScore>(
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
export function getFortuneLevel(score: number): FortuneAssessment['fortuneLevel'] {
  if (score >= 90) return 'extremely_auspicious';
  if (score >= 75) return 'very_auspicious';
  if (score >= 60) return 'auspicious';
  if (score >= 45) return 'neutral';
  if (score >= 30) return 'inauspicious';
  if (score >= 15) return 'very_inauspicious';
  return 'extremely_inauspicious';
}

/**
 * 生成总体建议
 * @param textScore 卦辞评分
 * @param trigramScore 上下卦评分
 * @param linesScore 爻位评分
 * @param language 语言
 * @returns 总体建议
 */
export function generateOverallAdvice(
  textScore: HexagramTextScore,
  trigramScore: TrigramRelationScore,
  linesScore: LinesPositionScore,
  language: Language = 'zh-CN'
): string {
  // 根据吉凶等级生成基础建议
  let advice = getTranslation(language, 'decisionAdvice');
  
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
export function calculateConfidence(
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
export function generateDetailedAnalysis(
  _fortuneLevel: FortuneAssessment['fortuneLevel'],
  textScore: HexagramTextScore,
  trigramScore: TrigramRelationScore,
  linesScore: LinesPositionScore,
  language: Language = 'zh-CN'
): FortuneAssessment['detailedAnalysis'] {
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


