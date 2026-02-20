import { clsx, type ClassValue } from 'clsx';
import { useLanguage } from '../contexts/LanguageContext';
import { getHexagramName } from '../data/hexagramNames';

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
};

export function HexagramDisplay({ 
  hexagram, 
  className,
  showNumber = true,
  showName = true,
}: HexagramDisplayProps) {
  const { language } = useLanguage();
  
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

  const hexagramNumber = parseInt(hexagram, 2) + 1; // 转换为1-64的卦序
  const hexagramName = getHexagramName(hexagramNumber, language);

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
