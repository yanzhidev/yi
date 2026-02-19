import { useState, useCallback } from 'react';

export interface HexagramResult {
  binary: string;      // 6位二进制字符串（从下到上）
  number: number;      // 0-63 的卦象编号
  changingLines: number[]; // 变爻位置（1-6）
}

export interface UseHexagramReturn {
  hexagram: HexagramResult | null;
  isCasting: boolean;
  castHexagram: () => void;
  reset: () => void;
}

/**
 * 生成单爻（使用三枚硬币法模拟）
 * 3枚硬币：
 * - 3正（老阴，变爻）：概率 1/8
 * - 2正1反（少阳，阳爻）：概率 3/8
 * - 1正2反（少阴，阴爻）：概率 3/8
 * - 3反（老阳，变爻）：概率 1/8
 */
function generateLine(): { value: number; isChanging: boolean } {
  // 模拟3枚硬币，每枚正反面概率各50%
  const coins = [
    Math.random() > 0.5 ? 1 : 0,
    Math.random() > 0.5 ? 1 : 0,
    Math.random() > 0.5 ? 1 : 0,
  ];
  
  const sum = coins.reduce((a, b) => a + b, 0);
  
  // 3正 = 6 (老阴，阴爻变爻)
  // 2正1反 = 7 (少阳，阳爻)
  // 1正2反 = 8 (少阴，阴爻)
  // 0正 = 9 (老阳，阳爻变爻)
  
  switch (sum) {
    case 3: // 老阴
      return { value: 0, isChanging: true };
    case 2: // 少阳
      return { value: 1, isChanging: false };
    case 1: // 少阴
      return { value: 0, isChanging: false };
    case 0: // 老阳
      return { value: 1, isChanging: true };
    default:
      return { value: 0, isChanging: false };
  }
}

/**
 * 使用三枚硬币法生成六爻卦象
 * 从初爻（最下）到上爻（最上）依次生成
 */
function generateHexagram(): HexagramResult {
  const lines: number[] = [];
  const changingLines: number[] = [];
  
  // 生成6爻，从下到上
  for (let i = 0; i < 6; i++) {
    const line = generateLine();
    lines.push(line.value);
    if (line.isChanging) {
      changingLines.push(i + 1); // 位置从1开始计数
    }
  }
  
  // 二进制字符串（从下到上）
  const binary = lines.join('');
  const number = parseInt(binary, 2);
  
  return {
    binary,
    number,
    changingLines,
  };
}

export function useHexagram(): UseHexagramReturn {
  const [hexagram, setHexagram] = useState<HexagramResult | null>(null);
  const [isCasting, setIsCasting] = useState(false);

  const castHexagram = useCallback(() => {
    setIsCasting(true);
    
    // 模拟起卦的仪式感，延迟显示结果
    setTimeout(() => {
      const result = generateHexagram();
      setHexagram(result);
      setIsCasting(false);
    }, 800);
  }, []);

  const reset = useCallback(() => {
    setHexagram(null);
    setIsCasting(false);
  }, []);

  return {
    hexagram,
    isCasting,
    castHexagram,
    reset,
  };
}
