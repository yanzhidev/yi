import hexagramsData from '../data/hexagrams.json';
import linesData from '../data/lines.json';
import hexagramsDataEn from '../data/hexagrams_en.json';
import linesDataEn from '../data/lines_en.json';
import hexagramsDataEs from '../data/hexagrams_es.json';
import linesDataEs from '../data/lines_es.json';
import type { Language } from './i18n';

// ==================== 类型定义 ====================

/**
 * 单爻解读数据
 */
export interface LineInterpretation {
  position: number;  // 1-6，从下到上
  yao: string;       // 爻名，如"初九"、"六二"等
  text: string;      // 爻辞
  xiang: string;     // 象曰
  interpretation?: string; // 通俗解释
}

/**
 * 卦象数据结构
 */
export interface HexagramData {
  id: number;
  name: string;
  originalName?: string;
  pinyin: string;
  binary: string;
  symbol: string;
  text: string;
  tuan: string;
  daxiang: string;
  yongjiu?: string; // 用九（乾卦六爻全变时使用）
  yongliu?: string; // 用六（坤卦六爻全变时使用）
}

/**
 * 单爻结果
 * - value: 0 为阴爻(⚋)，1 为阳爻(⚊)
 * - isChanging: 是否为变爻（老阴或老阳）
 * - lineType: 详细爻类型
 */
export interface LineResult {
  value: 0 | 1;
  isChanging: boolean;
  lineType: 'oldYin' | 'youngYang' | 'youngYin' | 'oldYang';
}

/**
 * 卦象结果
 * - lines: 六爻数组，从初爻（下）到上爻（上）
 * - changingLines: 变爻位置数组（1-6），从下到上
 * - hexagramId: 当前卦象的ID（1-64）
 * - changedHexagramId: 变卦的ID（如果有变爻）
 * - binary: 6位二进制字符串，0为阴，1为阳，从下到上
 */
export interface HexagramCastResult {
  lines: LineResult[];
  changingLines: number[];
  hexagramId: number;
  changedHexagramId: number | null;
  binary: string;
}

/**
 * 三钱法硬币结果
 * - 0: 反面（字面）
 * - 1: 正面（背/花面）
 */
export type Coin = 0 | 1;

/**
 * 三枚硬币投掷结果
 */
export type ThreeCoins = [Coin, Coin, Coin];

// ==================== 多语言数据支持 ====================

const hexagramsDataMap: Record<Language, HexagramData[]> = {
  'zh-CN': hexagramsData as HexagramData[],
  'zh-TW': hexagramsData as HexagramData[],
  'en': hexagramsDataEn as HexagramData[],
  'es': hexagramsDataEs as HexagramData[],
};

const linesDataMap: Record<Language, Record<string, { name: string; lines: LineInterpretation[] }>> = {
  'zh-CN': linesData as Record<string, { name: string; lines: LineInterpretation[] }>,
  'zh-TW': linesData as Record<string, { name: string; lines: LineInterpretation[] }>,
  'en': linesDataEn as Record<string, { name: string; lines: LineInterpretation[] }>,
  'es': linesDataEs as Record<string, { name: string; lines: LineInterpretation[] }>,
};

let currentLanguage: Language = 'zh-CN';

/**
 * 设置当前语言
 * @param lang 语言代码
 */
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
}

/**
 * 获取当前语言
 * @returns 当前语言代码
 */
export function getLanguage(): Language {
  return currentLanguage;
}

/**
 * 获取当前语言的卦象数据
 * @returns 卦象数据数组
 */
export function getHexagrams(): HexagramData[] {
  return hexagramsDataMap[currentLanguage] || hexagramsData;
}

/**
 * 获取当前语言的爻辞数据
 * @returns 爻辞数据对象
 */
export function getLinesData(): Record<string, { name: string; lines: LineInterpretation[] }> {
  return linesDataMap[currentLanguage] || linesData as Record<string, { name: string; lines: LineInterpretation[] }>;
}

// ==================== 大象图相关功能 ====================

/**
 * 八卦意象映射
 */
const trigramSymbols: Record<string, { name: string; symbol: string; emoji: string }> = {
  '111': { name: '乾', symbol: '天', emoji: '☀️' },
  '000': { name: '坤', symbol: '地', emoji: '🌍' },
  '001': { name: '震', symbol: '雷', emoji: '⚡' },
  '010': { name: '坎', symbol: '水', emoji: '💧' },
  '011': { name: '艮', symbol: '山', emoji: '⛰️' },
  '100': { name: '巽', symbol: '风', emoji: '🌪️' },
  '101': { name: '离', symbol: '火', emoji: '🔥' },
  '110': { name: '兑', symbol: '泽', emoji: '🌊' }
};

/**
 * 根据卦象二进制字符串获取大象图意象描述
 * @param binary 6位二进制字符串，从下到上
 * @returns 大象图意象描述
 */
export function getDaXiangImage(binary: string): { upper: string; lower: string; description: string } {
  // 分离上下卦（各3位）
  const upperTrigram = binary.slice(0, 3); // 上卦（上三爻）
  const lowerTrigram = binary.slice(3);    // 下卦（下三爻）
  
  const upperInfo = trigramSymbols[upperTrigram] || { name: '未知', symbol: '象', emoji: '❓' };
  const lowerInfo = trigramSymbols[lowerTrigram] || { name: '未知', symbol: '象', emoji: '❓' };
  
  // 生成意象描述：上卦在下卦之上
  const description = `${upperInfo.emoji} ${upperInfo.symbol}在${lowerInfo.symbol}上`;
  
  return {
    upper: upperInfo.symbol,
    lower: lowerInfo.symbol,
    description
  };
}

// ==================== 三钱法核心逻辑 ====================

/**
 * 根据三枚硬币投掷结果计算单爻
 * 
 * 三钱法规则（传统铜钱）：
 * - 反面（背/花面）：为阳（3点）
 * - 正面（字面/有字）：为阴（2点）
 * 
 * 三枚硬币点数总和：
 * - 6 (2+2+2) = 老阴 ⚋ (阴爻，变爻) - 3正
 * - 7 (2+2+3) = 少阳 ⚊ (阳爻) - 2正1反
 * - 8 (2+3+3) = 少阴 ⚋ (阴爻) - 1正2反
 * - 9 (3+3+3) = 老阳 ⚊ (阳爻，变爻) - 3反
 * 
 * 注意：这里的 coin 值是 0=反/阳面，1=正/阴面
 * 所以实际点数：coin 0 = 3点，coin 1 = 2点
 */
export function calculateLineFromCoins(coins: ThreeCoins): LineResult {
  // 计算点数：反面(0)=3点（阳），正面(1)=2点（阴）
  const points = coins.map(c => c === 0 ? 3 : 2);
  const sum = points[0] + points[1] + points[2];

  switch (sum) {
    case 6: // 老阴 (三阴/三正面)
      return { value: 0, isChanging: true, lineType: 'oldYin' };
    case 7: // 少阳 (两阴一阳/两正一反)
      return { value: 1, isChanging: false, lineType: 'youngYang' };
    case 8: // 少阴 (两阳一阴/两反一正)
      return { value: 0, isChanging: false, lineType: 'youngYin' };
    case 9: // 老阳 (三阳/三反面)
      return { value: 1, isChanging: true, lineType: 'oldYang' };
    default:
      throw new Error(`Invalid coin sum: ${sum}`);
  }
}

/**
 * 投掷单枚硬币（随机）
 */
export function tossCoin(): Coin {
  return Math.random() > 0.5 ? 1 : 0;
}

/**
 * 投掷三枚硬币
 */
export function tossThreeCoins(): ThreeCoins {
  return [tossCoin(), tossCoin(), tossCoin()];
}

/**
 * 生成单爻（随机投掷）
 */
export function castLine(): LineResult {
  return calculateLineFromCoins(tossThreeCoins());
}

/**
 * 使用三钱法生成完整六爻卦象
 * 从初爻（最下，第1位）到上爻（最上，第6位）依次生成
 */
export function castHexagram(): HexagramCastResult {
  const lines: LineResult[] = [];
  const changingLines: number[] = [];

  // 生成6爻
  for (let i = 0; i < 6; i++) {
    const line = castLine();
    lines.push(line);
    
    if (line.isChanging) {
      changingLines.push(i + 1); // 位置从1开始（初爻=1，上爻=6）
    }
  }

  // 生成二进制字符串（从下到上：初爻到上爻）
  // value: 0=阴爻, 1=阳爻
  const binary = lines.map(l => l.value).join('');
  
  // 为了匹配数据格式，需要反转来查找（数据中是从上到下）
  const reversedBinary = lines.map(l => l.value).reverse().join('');
  const hexagramData = getHexagramByBinary(reversedBinary);
  const hexagramId = hexagramData ? hexagramData.id : 1;

  // 计算变卦（如果有变爻）
  let changedHexagramId: number | null = null;
  if (changingLines.length > 0) {
    // 变卦：所有变爻反转（阴变阳，阳变阴），然后反转来匹配数据格式
    const reversedChangedBinary = lines
      .map(l => l.isChanging ? (l.value === 0 ? 1 : 0) : l.value)
      .reverse()
      .join('');
    const changedHexagramData = getHexagramByBinary(reversedChangedBinary);
    changedHexagramId = changedHexagramData ? changedHexagramData.id : null;
  }

  return {
    lines,
    changingLines,
    hexagramId,
    changedHexagramId,
    binary,
  };
}

// ==================== 卦名映射函数 ====================

/**
 * 卦象数据结构
 */
export interface HexagramData {
  id: number;
  name: string;
  pinyin: string;
  binary: string;
  symbol: string;
  text: string;
  tuan: string;
  daxiang: string;
  yongjiu?: string; // 用九（乾卦六爻全变时使用）
  yongliu?: string; // 用六（坤卦六爻全变时使用）
  interpretation?: {
    plainTranslation: string;
    lifeInspiration: string;
    decisionAdvice: string;
  };
}

/**
 * 64卦数据数组（当前语言）
 */
export const hexagrams: HexagramData[] = getHexagrams();

/**
 * 将 [0,1] 数组映射到卦名
 * @param linesArray 6个元素的数组，0为阴爻，1为阳爻，从下到上（初爻到上爻）
 * @returns 对应的卦象数据，如果无效则返回 null
 */
export function mapLinesToHexagram(linesArray: number[]): HexagramData | null {
  if (linesArray.length !== 6) {
    console.warn(`Expected 6 lines, got ${linesArray.length}`);
    return null;
  }

  // 验证所有元素都是 0 或 1
  if (!linesArray.every(line => line === 0 || line === 1)) {
    console.warn('All lines must be 0 or 1');
    return null;
  }

  const binary = linesArray.join('');
  const hexagramId = parseInt(binary, 2) + 1; // 转为1-64

  return getHexagramById(hexagramId);
}

/**
 * 通过卦序（1-64）获取卦象数据
 */
export function getHexagramById(id: number): HexagramData | null {
  if (id < 1 || id > 64) {
    console.warn(`Invalid hexagram id: ${id}`);
    return null;
  }
  return getHexagrams().find(h => h.id === id) || null;
}

/**
 * 通过二进制字符串获取卦象数据
 * @param binary 6位二进制字符串（0=阴，1=阳，从下到上）
 */
export function getHexagramByBinary(binary: string): HexagramData | null {
  if (binary.length !== 6 || !/^[01]+$/.test(binary)) {
    console.warn(`Invalid binary string: ${binary}`);
    return null;
  }

  // 直接通过二进制字符串查找对应的卦象
  return getHexagrams().find(h => h.binary === binary) || null;
}

/**
 * 通过卦名获取卦象数据
 */
export function getHexagramByName(name: string): HexagramData | null {
  return getHexagrams().find(h => h.name === name) || null;
}

// ==================== 辅助函数 ====================

/**
 * 获取爻的显示符号
 */
export function getLineSymbol(line: LineResult): string {
  if (line.isChanging) {
    return line.value === 0 ? '⚋' : '⚊'; // 变爻使用特殊标记或颜色
  }
  return line.value === 0 ? '⚋' : '⚊';
}

/**
 * 获取爻的详细描述
 */
export function getLineDescription(line: LineResult): string {
  const descriptions: Record<LineResult['lineType'], string> = {
    oldYin: '老阴（变爻）',
    youngYang: '少阳',
    youngYin: '少阴',
    oldYang: '老阳（变爻）',
  };
  return descriptions[line.lineType];
}

/**
 * 生成变卦的爻数组
 * @param lines 原始六爻
 * @returns 变卦的 [0,1] 数组
 */
export function getChangedLines(lines: LineResult[]): number[] {
  return lines.map(l => l.isChanging ? (l.value === 0 ? 1 : 0) : l.value);
}

/**
 * 将二进制字符串转为爻数组
 * @param binary 6位二进制字符串
 * @returns [0,1] 数组
 */
export function binaryToLines(binary: string): number[] {
  return binary.split('').map(b => parseInt(b, 10) as 0 | 1);
}

/**
 * 将爻数组转为二进制字符串
 * @param lines [0,1] 数组
 * @returns 6位二进制字符串
 */
export function linesToBinary(lines: number[]): string {
  return lines.join('');
}

// ==================== 爻辞解读函数 ====================

/**
 * 获取指定卦的六爻解读
 * @param hexagramId 卦序 (1-64)
 * @returns 六爻解读数组，从初爻到上爻
 */
export function getLineInterpretations(hexagramId: number): LineInterpretation[] | null {
  if (hexagramId < 1 || hexagramId > 64) {
    console.warn(`Invalid hexagram id: ${hexagramId}`);
    return null;
  }
  
  const linesDataCurrent = getLinesData();
  const key = hexagramId.toString() as keyof typeof linesDataCurrent;
  const hexagramLines = linesDataCurrent[key];
  
  if (!hexagramLines) {
    console.warn(`No line data found for hexagram ${hexagramId}`);
    return null;
  }
  
  return hexagramLines.lines;
}

/**
 * 获取指定卦中特定位置的爻解读
 * @param hexagramId 卦序 (1-64)
 * @param position 爻位置 (1-6)，从下到上
 * @returns 该位置的爻解读
 */
export function getLineInterpretation(hexagramId: number, position: number): LineInterpretation | null {
  if (position < 1 || position > 6) {
    console.warn(`Invalid line position: ${position}`);
    return null;
  }
  
  const lines = getLineInterpretations(hexagramId);
  if (!lines) return null;
  
  return lines.find(l => l.position === position) || null;
}

/**
 * 获取变爻的详细解读
 * @param hexagramId 卦序 (1-64)
 * @param changingLines 变爻位置数组 (1-6)
 * @returns 变爻解读数组
 */
export function getChangingLineInterpretations(
  hexagramId: number, 
  changingLines: number[]
): LineInterpretation[] {
  if (changingLines.length === 0) return [];
  
  const allLines = getLineInterpretations(hexagramId);
  if (!allLines) return [];
  
  return changingLines
    .map(position => allLines.find(l => l.position === position))
    .filter((l): l is LineInterpretation => l !== undefined);
}

// ==================== 导出默认 ====================

export default {
  castHexagram,
  castLine,
  tossCoin,
  tossThreeCoins,
  calculateLineFromCoins,
  mapLinesToHexagram,
  getHexagramById,
  getHexagramByBinary,
  getHexagramByName,
  getLineSymbol,
  getLineDescription,
  getChangedLines,
  binaryToLines,
  linesToBinary,
  getLineInterpretations,
  getLineInterpretation,
  getChangingLineInterpretations,
  getHexagrams,
  getLinesData,
  setLanguage,
  getLanguage,
  hexagrams,
};
