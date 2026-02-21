import { Scroll, Wind, Cloud } from 'lucide-react';
import { cn } from '../../utils/styles';

interface HexagramTextProps {
  hexagram: any;
  isKeyHexagram?: boolean;
  variant?: 'original' | 'changed';
  translations: {
    guaText: string;
    tuan: string;
    daXiang: string;
    keyInterpretation: string;
  };
}

export function HexagramText({ 
  hexagram, 
  isKeyHexagram = false, 
  variant = 'original',
  translations 
}: HexagramTextProps) {
  if (!hexagram) return null;

  const isChangedVariant = variant === 'changed';
  const borderColor = isChangedVariant ? 'border-amber-300' : 'border-stone-200';

  return (
    <>
      {/* 卦辞 */}
      <div className={cn(
        "mt-6 pt-6 border-t",
        isKeyHexagram && variant === 'original' 
          ? "border-amber-400 bg-amber-50/30 rounded-xl p-4 -mx-4" 
          : borderColor
      )}>
        <div className="flex items-center gap-2 mb-3">
          <Scroll className={cn(
            "w-4 h-4", 
            isKeyHexagram && variant === 'original' ? "text-amber-600" : 
            isChangedVariant ? "text-amber-800" : "text-stone-600"
          )} />
          <span className={cn(
            "text-sm font-semibold", 
            isKeyHexagram && variant === 'original' ? "text-amber-800" : 
            isChangedVariant ? "text-amber-900" : "text-stone-700"
          )}>
            {translations.guaText}
          </span>
          {isKeyHexagram && variant === 'original' && (
            <span className="ml-auto text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              {translations.keyInterpretation}
            </span>
          )}
        </div>
        <p className={cn(
          "leading-relaxed text-base", 
          isKeyHexagram && variant === 'original' ? "text-amber-900 font-medium" : 
          isChangedVariant ? "text-amber-950" : "text-stone-800"
        )}>
          {hexagram.text}
        </p>
      </div>

      {/* 彖曰 */}
      <div className={cn("mt-4 pt-4 border-t", borderColor)}>
        <div className="flex items-center gap-2 mb-3">
          <Wind className={cn("w-4 h-4", isChangedVariant ? "text-amber-800" : "text-stone-600")} />
          <span className={cn("text-sm font-semibold", isChangedVariant ? "text-amber-900" : "text-stone-700")}>
            {translations.tuan}
          </span>
        </div>
        <p className={cn("text-sm leading-relaxed", isChangedVariant ? "text-amber-900" : "text-stone-700")}>
          {hexagram.tuan}
        </p>
      </div>

      {/* 大象 */}
      <div className={cn("mt-4 pt-4 border-t", borderColor)}>
        <div className="flex items-center gap-2 mb-3">
          <Cloud className={cn("w-4 h-4", isChangedVariant ? "text-amber-800" : "text-stone-600")} />
          <span className={cn("text-sm font-semibold", isChangedVariant ? "text-amber-900" : "text-stone-700")}>
            {translations.daXiang}
          </span>
        </div>
        <p className={cn("text-sm leading-relaxed", isChangedVariant ? "text-amber-900" : "text-stone-700")}>
          {hexagram.daxiang}
        </p>
      </div>
    </>
  );
}
