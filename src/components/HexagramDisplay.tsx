import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 阴爻符号（断开的横线）
const YinYao = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center gap-1 w-16", className)}>
    <div className="h-1.5 w-[30px] bg-stone-700 rounded-full" />
    <div className="h-1.5 w-[30px] bg-stone-700 rounded-full" />
  </div>
);

// 阳爻符号（完整的横线）
const YangYao = ({ className }: { className?: string }) => (
  <div className={cn("h-1.5 w-16 bg-stone-700 rounded-full", className)} />
);

interface HexagramDisplayProps {
  hexagram: string | null; // 6位二进制字符串，从下到上，0为阴爻，1为阳爻
  className?: string;
  showNumber?: boolean;
  showName?: boolean;
}

// 64卦名称映射（简化版，基于二进制序号）
const hexagramNames: Record<number, string> = {
  0: '坤为地', 1: '山地剥', 2: '水地比', 3: '风地观',
  4: '雷地豫', 5: '火地晋', 6: '泽地萃', 7: '天地否',
  8: '地山谦', 9: '艮为山', 10: '水山蹇', 11: '风山渐',
  12: '雷山小过', 13: '火山旅', 14: '泽山咸', 15: '天山遁',
  16: '地水师', 17: '山水蒙', 18: '坎为水', 19: '风水涣',
  20: '雷水解', 21: '火水未济', 22: '泽水困', 23: '天水讼',
  24: '地风升', 25: '山风蛊', 26: '水风井', 27: '巽为风',
  28: '雷风恒', 29: '火风鼎', 30: '泽风大过', 31: '天风姤',
  32: '地雷复', 33: '山雷颐', 34: '水雷屯', 35: '风雷益',
  36: '震为雷', 37: '火雷噬嗑', 38: '泽雷随', 39: '天雷无妄',
  40: '地火明夷', 41: '山火贲', 42: '水火既济', 43: '风火家人',
  44: '雷火丰', 45: '离为火', 46: '泽火革', 47: '天火同人',
  48: '地泽临', 49: '山泽损', 50: '水泽节', 51: '风泽中孚',
  52: '雷泽归妹', 53: '火泽睽', 54: '兑为泽', 55: '天泽履',
  56: '地天泰', 57: '山天大畜', 58: '水天需', 59: '风天小畜',
  60: '雷天大壮', 61: '火天大有', 62: '泽天夬', 63: '乾为天',
};

export function HexagramDisplay({ 
  hexagram, 
  className,
  showNumber = true,
  showName = true,
}: HexagramDisplayProps) {
  if (!hexagram || hexagram.length !== 6) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8", className)}>
        <div className="w-32 h-32 rounded-full bg-stone-200/50 flex items-center justify-center">
          <span className="text-5xl text-stone-300">?</span>
        </div>
        <p className="mt-6 text-stone-400 text-sm tracking-wide">
          点击下方按钮，开始起卦
        </p>
      </div>
    );
  }

  const hexagramNumber = parseInt(hexagram, 2);
  const hexagramName = hexagramNames[hexagramNumber] || '未知卦象';

  // 将二进制转为爻数组（从下到上显示，所以反转）
  const lines = hexagram.split('').reverse();

  return (
    <div className={cn("flex flex-col items-center p-8", className)}>
      {/* 卦象符号 - 从下到上排列 */}
      <div className="flex flex-col-reverse gap-3 mb-6">
        {lines.map((line, index) => (
          line === '1' ? (
            <YangYao key={index} />
          ) : (
            <YinYao key={index} />
          )
        ))}
      </div>

      {/* 分隔线 */}
      <div className="h-px w-20 bg-stone-200 mb-4" />

      {/* 卦名和编号 */}
      <div className="text-center space-y-2">
        {showName && (
          <p className="text-xl font-medium text-stone-700 tracking-wider">
            {hexagramName}
          </p>
        )}
        {showNumber && (
          <p className="text-sm text-stone-400 tracking-widest">
            第 {hexagramNumber + 1} 卦
          </p>
        )}
      </div>
    </div>
  );
}
