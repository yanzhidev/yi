import { cn } from '../../utils/styles';
import { HexagramLines } from '../HexagramLines';
import type { HexagramCastResult } from '../../utils/iching';

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
  const bgColor = isChangedVariant ? 'bg-amber-50' : 'bg-white';
  const borderColor = isChangedVariant ? 'border-amber-200' : 'border-stone-200';
  const titleColor = isChangedVariant ? 'text-amber-900' : 'text-stone-800';
  const iconColor = isChangedVariant ? 'text-amber-900' : 'text-stone-700';

  return (
    <div className={cn("rounded-3xl p-8 shadow-md border", bgColor, borderColor)}>
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-5 h-5 ${iconColor}`} />
        <h2 className={cn("text-lg font-semibold tracking-wider", titleColor)}>{title}</h2>
        
        {changingLinesCount && changingLinesCountLabel && (
          <span className="ml-auto text-xs text-amber-700 bg-amber-100 px-3 py-1 rounded-full font-medium">
            {changingLinesCount} {changingLinesCountLabel}
          </span>
        )}
        
        {isKeyHexagram && (
          <span className="ml-2 text-xs font-medium text-amber-800 bg-amber-200 px-2 py-0.5 rounded">
            重点解读
          </span>
        )}
      </div>

      <div className="flex items-start gap-8">
        <HexagramLines lines={result.lines} />
        
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
    </div>
  );
}
