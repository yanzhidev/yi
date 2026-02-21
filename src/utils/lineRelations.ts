import type { LineResult } from './iching';
import type { Language } from './i18n';
import { getLineRelationsTranslations, type LineRelationsTranslations } from './lineRelationsI18n';

// ==================== 类型定义 ====================

/**
 * 爻位关系解读结果
 */
export interface LineRelationAnalysis {
  position: number;           // 爻位 (1-6)
  yaoName: string;           // 爻名 (如"初九"、"六二"等)
  lineValue: 0 | 1;          // 爻值 (0=阴爻, 1=阳爻)
  isDangWei: boolean;        // 是否当位
  dangWeiText: string;       // 当位解读文本
  yingRelation: string;      // 相应关系
  chengChengRelation: string; // 承乘关系
  positionAdvice: string;    // 爻位现代解读
}

// ==================== 当位判断 ====================

/**
 * 判断爻是否当位
 * 阳爻居阳位（1、3、5位）或阴爻居阴位（2、4、6位）为当位
 * @param position 爻位 (1-6)
 * @param lineValue 爻值 (0=阴爻, 1=阳爻)
 * @returns 是否当位
 */
export function isDangWei(position: number, lineValue: 0 | 1): boolean {
  // 阳位：1、3、5；阴位：2、4、6
  const isYangPosition = [1, 3, 5].includes(position);
  const isYangLine = lineValue === 1;
  
  // 阳爻居阳位或阴爻居阴位为当位
  return isYangPosition === isYangLine;
}

/**
 * 获取当位解读文本
 * @param position 爻位
 * @param lineValue 爻值
 * @param language 语言
 * @returns 当位解读文本
 */
export function getDangWeiText(position: number, lineValue: 0 | 1, language: Language = 'zh-CN'): string {
  const isYangLine = lineValue === 1;
  const dangWei = isDangWei(position, lineValue);
  const translations = getLineRelationsTranslations(language);
  
  if (dangWei) {
    if (isYangLine) {
      return translations.yangInYangPosition;
    } else {
      return translations.yinInYinPosition;
    }
  } else {
    if (isYangLine) {
      return translations.yangInYinPosition;
    } else {
      return translations.yinInYangPosition;
    }
  }
}

// ==================== 相应关系 ====================

/**
 * 获取相应关系分析
 * 初爻与四爻相应，二爻与五爻相应，三爻与上爻相应
 * 阴阳相应为吉，同性相斥为不利
 * @param position 爻位
 * @param lines 六爻数组
 * @param language 语言
 * @returns 相应关系文本
 */
export function getYingRelation(position: number, lines: LineResult[], language: Language = 'zh-CN'): string {
  const positionMap: Record<number, number> = {
    1: 4, 2: 5, 3: 6,
    4: 1, 5: 2, 6: 3
  };
  
  const currentLine = lines[position - 1];
  const correspondingLine = lines[positionMap[position] - 1];
  const translations = getLineRelationsTranslations(language);
  
  if (currentLine.value !== correspondingLine.value) {
    // 阴阳相应
    return translations.yinYangCorrespondence;
  } else {
    // 同性相斥
    const dangWei = isDangWei(position, currentLine.value);
    if (dangWei) {
      // 虽无外应，但自身得位得正，可稳中求进
      return translations.noExternalResponseButDangWei;
    } else {
      // 同性相斥，缺乏呼应，需主动寻求支援
      return translations.sameGenderRepulsion;
    }
  }
}

// ==================== 承乘关系 ====================

/**
 * 获取承乘关系分析
 * 承：下爻承上爻（检查上爻关系）
 * 乘：上爻乘下爻（检查下爻关系）
 * @param position 爻位
 * @param lines 六爻数组
 * @param language 语言
 * @returns 承乘关系文本
 */
export function getChengChengRelation(position: number, lines: LineResult[], language: Language = 'zh-CN'): string {
  const currentLine = lines[position - 1];
  const translations = getLineRelationsTranslations(language);
  const positionNames = translations.positionNames;
  
  let relations: string[] = [];
  
  // 检查承的关系（当前爻承上爻）
  if (position < 6) {
    const upperLine = lines[position];
    const supportRelation = getSupportRelation(currentLine.value, upperLine.value, translations);
    if (supportRelation) {
      relations.push(`${positionNames[position - 1]}${translations.lineCharacter}承${positionNames[position]}${translations.lineCharacter}，${supportRelation}`);
    }
  }
  
  // 检查乘的关系（当前爻乘下爻）
  if (position > 1) {
    const lowerLine = lines[position - 2];
    const rideRelation = getRideRelation(currentLine.value, lowerLine.value, translations);
    if (rideRelation) {
      relations.push(`${positionNames[position - 1]}${translations.lineCharacter}乘${positionNames[position - 2]}${translations.lineCharacter}，${rideRelation}`);
    }
  }
  
  return relations.length > 0 ? relations.join("；") : translations.noSpecialRelation;
}

/**
 * 获取承关系文本
 * @param currentLineValue 当前爻值
 * @param upperLineValue 上爻值
 * @param translations 翻译文本
 * @returns 承关系文本
 */
function getSupportRelation(currentLineValue: 0 | 1, upperLineValue: 0 | 1, translations: LineRelationsTranslations): string {
  if (currentLineValue === 0 && upperLineValue === 1) {
    // 阴承阳：柔承刚，柔顺承托刚健（最吉）
    return `${translations.yinSupportsYang}。${translations.yinSupportsYangDesc}`;
  } else if (currentLineValue === 1 && upperLineValue === 0) {
    // 阳承阴：刚承柔，刚强承托柔弱（凶）
    return translations.yangSupportsYin;
  } else if (currentLineValue === 1 && upperLineValue === 1) {
    // 阳承阳：刚承刚，以刚承刚（中）
    return translations.yangSupportsYang;
  } else if (currentLineValue === 0 && upperLineValue === 0) {
    // 阴承阴：柔承柔，以柔承柔（中）
    return translations.yinSupportsYin;
  }
  return '';
}

/**
 * 获取乘关系文本
 * @param currentLineValue 当前爻值
 * @param lowerLineValue 下爻值
 * @param translations 翻译文本
 * @returns 乘关系文本
 */
function getRideRelation(currentLineValue: 0 | 1, lowerLineValue: 0 | 1, translations: LineRelationsTranslations): string {
  if (currentLineValue === 0 && lowerLineValue === 1) {
    // 阴乘阳：柔乘刚，阴柔乘凌阳刚（最凶）
    return `${translations.yinRidesYang}。${translations.yinRidesYangDesc}`;
  } else if (currentLineValue === 1 && lowerLineValue === 0) {
    // 阳乘阴：刚乘柔，阳刚驾御阴柔（吉）
    return translations.yangRidesYin;
  } else if (currentLineValue === 1 && lowerLineValue === 1) {
    // 阳乘阳：刚乘刚，以刚驾刚（凶）
    return translations.yangRidesYang;
  } else if (currentLineValue === 0 && lowerLineValue === 0) {
    // 阴乘阴：柔乘柔，以柔驾柔（中）
    return translations.yinRidesYin;
  }
  return '';
}

// ==================== 爻位现代解读 ====================

/**
 * 获取基于爻位的现代解读建议
 * @param position 爻位 (1-6)
 * @param lineValue 爻值 (0=阴爻, 1=阳爻)
 * @param hexagramName 卦名
 * @param language 语言
 * @returns 现代解读文本
 */
export function getLinePositionAdvice(position: number, lineValue: 0 | 1, hexagramName: string, language: Language = 'zh-CN'): string {
  const isYangLine = lineValue === 1;
  const translations = getLineRelationsTranslations(language);
  
  const baseAdvices: Record<number, { yang: string; yin: string }> = {
    1: {
      yang: translations.position1Yang,
      yin: translations.position1Yin
    },
    2: {
      yang: translations.position2Yang,
      yin: translations.position2Yin
    },
    3: {
      yang: translations.position3Yang,
      yin: translations.position3Yin
    },
    4: {
      yang: translations.position4Yang,
      yin: translations.position4Yin
    },
    5: {
      yang: translations.position5Yang,
      yin: translations.position5Yin
    },
    6: {
      yang: translations.position6Yang,
      yin: translations.position6Yin
    }
  };
  
  const advice = baseAdvices[position]?.[isYangLine ? 'yang' : 'yin'] || "";
  
  // 根据卦名特点调整建议
  const hexagramContext = `${translations.inContextOf} ${hexagramName}的背景下，`;
  
  return hexagramContext + advice;
}

// ==================== 综合分析函数 ====================

/**
 * 获取爻的yao名称
 * @param position 爻位 (1-6)
 * @param lineValue 爻值 (0=阴爻, 1=阳爻)
 * @param language 语言
 * @returns yao名称
 */
export function getYaoName(position: number, lineValue: 0 | 1, language: Language = 'zh-CN'): string {
  const translations = getLineRelationsTranslations(language);
  const positionNames = translations.positionNames;
  
  const lineType = lineValue === 1 ? translations.yangLineSuffix : translations.yinLineSuffix;
  
  return positionNames[position - 1] + lineType;
}

/**
 * 对变爻进行完整的爻位关系分析
 * @param position 变爻位置
 * @param lines 六爻数组
 * @param hexagramName 卦名
 * @param language 语言
 * @returns 爻位关系分析结果
 */
export function analyzeLineRelation(
  position: number, 
  lines: LineResult[], 
  hexagramName: string,
  language: Language = 'zh-CN'
): LineRelationAnalysis {
  const line = lines[position - 1];
  
  return {
    position,
    yaoName: getYaoName(position, line.value, language),
    lineValue: line.value,
    isDangWei: isDangWei(position, line.value),
    dangWeiText: getDangWeiText(position, line.value, language),
    yingRelation: getYingRelation(position, lines, language),
    chengChengRelation: getChengChengRelation(position, lines, language),
    positionAdvice: getLinePositionAdvice(position, line.value, hexagramName, language)
  };
}

/**
 * 获取所有变爻的爻位关系分析
 * @param changingLines 变爻位置数组
 * @param lines 六爻数组
 * @param hexagramName 卦名
 * @param language 语言
 * @returns 所有变爻的爻位关系分析
 */
export function analyzeChangingLineRelations(
  changingLines: number[],
  lines: LineResult[],
  hexagramName: string,
  language: Language = 'zh-CN'
): LineRelationAnalysis[] {
  return changingLines
    .map(position => analyzeLineRelation(position, lines, hexagramName, language))
    .sort((a, b) => a.position - b.position);
}
