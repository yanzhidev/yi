import { getTranslation } from '../../i18n/index';
import type { Language, Translation } from '../../i18n/index';
import type { LinesPositionScore, LinePosition, LineTypeWeight, SpecialCombination } from '../types';

/**
 * 爻位属性定义
 */
const LINE_POSITIONS: Record<number, LinePosition> = {
  1: { nameKey: 'lineFirst', positionKey: 'positionLowest', natureKey: 'natureBeginning', weight: 1.0 },
  2: { nameKey: 'lineSecond', positionKey: 'positionLowerMiddle', natureKey: 'natureMiddle', weight: 1.1 },
  3: { nameKey: 'lineThird', positionKey: 'positionLowerUpper', natureKey: 'natureDangerous2', weight: 0.9 },
  4: { nameKey: 'lineFourth', positionKey: 'positionUpperLower', natureKey: 'natureDangerous2', weight: 0.9 },
  5: { nameKey: 'lineFifth', positionKey: 'positionUpperMiddle', natureKey: 'natureAuspicious', weight: 1.2 },
  6: { nameKey: 'lineSixth', positionKey: 'positionHighest', natureKey: 'natureEnd', weight: 1.0 }
};

/**
 * 爻位综合评分函数 - 使用中文进行计算
 * @param lines 六爻数组
 * @param changingLines 变爻位置数组
 * @param language 语言（仅用于显示）
 * @returns 爻位综合评分结果
 */
export function calculateLinesPositionScore(lines: any[], changingLines: number[], language: Language = 'zh-CN'): LinesPositionScore {
  let score = 50; // 基础分数
  const linesAnalysis: string[] = [];
  let reasoning = getTranslation(language, 'linesPositionAnalysisLabel') + '\n';
  
  // 构建 binary 字符串
  const binary = lines.map(line => line.value.toString()).join('');
  
  // 1. 分析各爻位置和类型 - 始终使用中文计算
  let properPositionCount = 0;
  let improperPositionCount = 0;
  let yangCount = 0;
  let yinCount = 0;
  
  reasoning += '\n' + getTranslation(language, 'eachLineAnalysis') + '\n';
  
  lines.forEach((line, index) => {
    const position = index + 1;
    const positionInfo = LINE_POSITIONS[position];
    const lineTypeWeights = getLineTypeWeights('zh-CN'); // 始终使用中文
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
    const lineTypeDesc = getTranslation(language, line.lineType === 'oldYang' ? 'oldYangDesc' : line.lineType === 'youngYang' ? 'youngYangDesc' : line.lineType === 'youngYin' ? 'youngYinDesc' : 'oldYinDesc');
    const analysis = `${positionName}(${lineTypeDesc})：${isProperPosition ? getTranslation(language, 'properPosition') : getTranslation(language, 'improperPosition')} (+${positionScore.toFixed(1)}${getTranslation(language, 'pointsText2')})`;
    linesAnalysis.push(analysis);
    reasoning += `${analysis}\n`;
  });
  
  // 2. 特殊组合评分 - 始终使用中文计算
  const specialCombinations = getSpecialLineCombinations(lines, changingLines, 'zh-CN');
  score += specialCombinations.score;
  const specialComboDesc = specialCombinations.description[0];
  reasoning += `\n${getTranslation(language, 'specialCombinationsLabel')}${getTranslation(language, specialComboDesc as keyof Translation)} (${specialCombinations.score > 0 ? '+' : ''}${specialCombinations.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 3. 特殊组合调整 - 始终使用中文计算
  const upperBinary = binary.slice(0, 3);
  const lowerBinary = binary.slice(3);
  const specialCombination = getSpecialCombinationAdjustment(upperBinary, lowerBinary, 'zh-CN');
  score += specialCombination.score;
  reasoning += `\n${getTranslation(language, 'specialCombinationAdjustmentLabel')}${getTranslation(language, specialCombination.descriptionKey as keyof Translation)} (${specialCombination.score > 0 ? '+' : ''}${specialCombination.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 4. 变爻分析 - 始终使用中文计算
  const changingLinesAnalysis = analyzeChangingLines(lines, changingLines, 'zh-CN');
  score += changingLinesAnalysis.score;
  reasoning += `\n${getTranslation(language, 'changingLinesAnalysisLabel')}${getTranslation(language, changingLinesAnalysis.descriptionKey as keyof Translation)} (${changingLinesAnalysis.score > 0 ? '+' : ''}${changingLinesAnalysis.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 5. 阴阳平衡分析 - 始终使用中文计算
  const yinYangBalance = analyzeLinesYinYangBalance(yangCount, yinCount, 'zh-CN');
  score += yinYangBalance.score;
  reasoning += `\n${getTranslation(language, 'yinYangBalanceLabel')}${getTranslation(language, yinYangBalance.descriptionKey as keyof Translation)} (${yinYangBalance.score > 0 ? '+' : ''}${yinYangBalance.score}${getTranslation(language, 'pointsText')})\n`;
  
  // 6. 爻位结构分析 - 始终使用中文计算
  const positionStructure = analyzePositionStructure(lines, 'zh-CN');
  score += positionStructure.score;
  const positionDesc = positionStructure.descriptionKeys[0];
  reasoning += `\n${getTranslation(language, 'positionStructureLabel')}${getTranslation(language, positionDesc as keyof Translation)} (${positionStructure.score > 0 ? '+' : ''}${positionStructure.score}${getTranslation(language, 'pointsText')})\n`;
  
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
 * 获取爻型吉凶权重
 * @param language 语言
 * @returns 爻型吉凶权重配置
 */
function getLineTypeWeights(_language: Language = 'zh-CN'): Record<string, LineTypeWeight> {
  // 返回翻译键而非翻译后的文本
  return {
    'oldYang': { score: 8, description: 'oldYangDesc' },
    'youngYang': { score: 6, description: 'youngYangDesc' },
    'youngYin': { score: 4, description: 'youngYinDesc' },
    'oldYin': { score: 2, description: 'oldYinDesc' }
  };
}

/**
 * 获取特殊爻位组合
 * @param lines 六爻数组
 * @param changingLines 变爻位置数组
 * @param language 语言
 * @returns 特殊组合评分
 */
function getSpecialLineCombinations(lines: any[], changingLines: number[], _language: Language = 'zh-CN'): { score: number; description: string[] } {
  let totalScore = 0;
  const descriptions: string[] = [];
  // 返回翻译键而非翻译后的文本
  const specialCombinations: Record<string, SpecialCombination> = {
    'all-yang': { score: 20, description: 'allYangDesc' },
    'all-yin': { score: 15, description: 'allYinDesc' },
    '2-5': { score: 15, description: 'middlePositionDesc' },
    'proper-position': { score: 10, description: 'properPositionDesc' },
    'improper-position': { score: -8, description: 'improperPositionDesc' }
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
    description: descriptions.length > 0 ? descriptions : ['noSpecialCombination']
  };
}

/**
 * 分析变爻
 * @param lines 六爻数组
 * @param changingLines 变爻位置数组
 * @param language 语言
 * @returns 变爻分析结果
 */
function analyzeChangingLines(_lines: any[], changingLines: number[], _language: Language = 'zh-CN'): { score: number; descriptionKey: string } {
  const changingCount = changingLines.length;
  
  if (changingCount === 0) {
    return { score: 5, descriptionKey: 'noChangingLines' };
  }
  
  if (changingCount === 1) {
    return { score: 8, descriptionKey: 'oneChangingLine' };
  }
  
  if (changingCount === 2) {
    return { score: 6, descriptionKey: 'twoChangingLines' };
  }
  
  if (changingCount === 3) {
    return { score: 4, descriptionKey: 'threeChangingLines' };
  }
  
  if (changingCount >= 4) {
    return { score: -5, descriptionKey: 'manyChangingLines' };
  }
  
  return { score: 0, descriptionKey: 'changingLinesUnknown' };
}

/**
 * 分析阴阳平衡
 * @param yangCount 阳爻数量
 * @param yinCount 阴爻数量
 * @param language 语言
 * @returns 阴阳平衡分析结果
 */
function analyzeLinesYinYangBalance(yangCount: number, yinCount: number, _language: Language = 'zh-CN'): { score: number; descriptionKey: string } {
  if (yangCount === yinCount) {
    return { score: 10, descriptionKey: 'yinYangBalancedHarmony' };
  }
  
  if (yangCount === 4 && yinCount === 2) {
    return { score: 8, descriptionKey: 'yangMoreThanYin' };
  }
  
  if (yangCount === 2 && yinCount === 4) {
    return { score: 6, descriptionKey: 'yinMoreThanYang' };
  }
  
  if (yangCount === 5 && yinCount === 1) {
    return { score: 4, descriptionKey: 'yangExtreme' };
  }
  
  if (yangCount === 1 && yinCount === 5) {
    return { score: 3, descriptionKey: 'yinExtreme' };
  }
  
  return { score: 0, descriptionKey: 'yinYangNoFeature' };
}

/**
 * 分析爻位结构
 * @param lines 六爻数组
 * @param language 语言
 * @returns 爻位结构分析结果
 */
function analyzePositionStructure(lines: any[], _language: Language = 'zh-CN'): { score: number; descriptionKeys: string[] } {
  let score = 0;
  const descriptions: string[] = [];
  
  // 分析三爻四爻（人位）
  const line3 = lines[2]; // 三爻
  const line4 = lines[3]; // 四爻
  
  if (line3 && line4) {
    // 三四爻为阴阳相济为佳
    if (line3.value !== line4.value) {
      score += 5;
      descriptions.push('lines34Harmony');
    }
    
    // 三四爻凶位，宜静不宜动
    if (line3.value === 0 && line4.value === 0) {
      score += 3;
      descriptions.push('lines34Gentle');
    }
  }
  
  // 分析初上爻（天地位）
  const line1 = lines[0]; // 初爻
  const line6 = lines[5]; // 上爻
  
  if (line1 && line6) {
    // 初上爻相应为佳
    if (line1.value === line6.value) {
      score += 4;
      descriptions.push('lines16Correspondence');
    }
  }
  
  // 分析二五爻（中位）
  const line2 = lines[1]; // 二爻
  const line5 = lines[4]; // 五爻
  
  if (line2 && line5) {
    // 二五爻相应为佳
    if (line2.value !== line5.value) {
      score += 6;
      descriptions.push('lines25Correspondence');
    }
  }
  
  return {
    score,
    descriptionKeys: descriptions.length > 0 ? descriptions : ['positionStructureNoFeature']
  };
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
