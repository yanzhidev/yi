import { clsx, type ClassValue } from 'clsx';
import type { LineResult } from '../utils/iching';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// 阴爻符号（断开的横线）
export const YinYao = ({ isChanging, className }: { isChanging?: boolean; className?: string }) => (
  <div className={cn("flex items-center justify-center gap-1 w-20", className)}>
    <div className={cn("h-2 w-[38px] rounded-full", isChanging ? "bg-amber-600" : "bg-stone-700")} />
    <div className={cn("h-2 w-[38px] rounded-full", isChanging ? "bg-amber-600" : "bg-stone-700")} />
  </div>
)

// 阳爻符号（完整的横线）
export const YangYao = ({ isChanging, className }: { isChanging?: boolean; className?: string }) => (
  <div className={cn("h-2 w-20 rounded-full", isChanging ? "bg-amber-600" : "bg-stone-700", className)} />
)

// 卦象显示组件
export function HexagramLines({ lines }: { lines: LineResult[] }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {lines.map((line, index) => (
        line.value === 1 ? (
          <YangYao key={index} isChanging={line.isChanging} />
        ) : (
          <YinYao key={index} isChanging={line.isChanging} />
        )
      ))}
    </div>
  )
}
