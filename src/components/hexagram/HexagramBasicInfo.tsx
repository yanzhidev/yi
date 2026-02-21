import { cn } from '../../utils/styles';
import { HexagramLines } from '../HexagramLines';
import type { HexagramCastResult, LineResult } from '../../utils/iching';

// 辅助函数：将卦象的二进制字符串转换为 LineResult 数组
// hexagram.binary 是从下到上的顺序，但数据文件中存储的是从上到下
// 所以需要反转来匹配 lines 数组的格式
function hexagramToLines(binary: string): LineResult[] {
  return binary.split('').reverse().map((bit) => ({
    value: bit === '1' ? 1 : 0,
    isChanging: false, // 在基本信息中，我们显示的是静态卦象，不标记变爻
    lineType: bit === '1' ? 'youngYang' : 'youngYin'
  }));
}

interface HexagramBasicInfoProps {
  result: HexagramCastResult;
  hexagram: any;
  title: string;
  changingLinesCount?: number;
  changingLinesCountLabel?: string;
  isKeyHexagram?: boolean;
  variant?: 'original' | 'changed';
}

export function HexagramBasicInfo({ 
  result, 
  hexagram, 
  title, 
  changingLinesCount,
  changingLinesCountLabel,
  isKeyHexagram = false,
  variant = 'original'
}: HexagramBasicInfoProps) {
  if (!hexagram) return null;

  const isChangedVariant = variant === 'changed';
  const titleColor = isChangedVariant ? 'text-amber-900' : 'text-stone-800';

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-lg">{variant === 'changed' ? '🔄' : '📖'}</span>
        <h2 className={cn("text-lg font-semibold tracking-wider", titleColor)}>{title}</h2>
        
        <div className="ml-auto flex items-center gap-2">
          {changingLinesCount && changingLinesCountLabel && (
            <span className="text-xs text-amber-700 bg-amber-100 px-3 py-1 rounded-full font-medium">
              {changingLinesCount} {changingLinesCountLabel}
            </span>
          )}
          
          {isKeyHexagram && (
            <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              重点解读
            </span>
          )}
        </div>
      </div>

      <div className="flex items-start gap-8">
        {/* 根据variant决定使用哪个卦象的爻 */}
        {variant === 'changed' ? (
          <HexagramLines lines={hexagramToLines(hexagram.binary)} />
        ) : (
          <HexagramLines lines={result.lines} />
        )}
        
        <div className="flex-1 space-y-3">
          <div>
            <h3 className={cn("text-2xl font-semibold", isChangedVariant ? "text-amber-950" : "text-stone-900")}>
              {hexagram.name}
            </h3>
            <p className={cn("text-sm mt-1 font-medium", isChangedVariant ? "text-amber-800" : "text-stone-600")}>
              第{hexagram.id}卦 · {hexagram.pinyin}
            </p>
          </div>
          <p className={cn("text-base leading-relaxed", isChangedVariant ? "text-amber-900" : "text-stone-700")}>
            {hexagram.symbol}
          </p>
        </div>
      </div>
    </>
  );
}
