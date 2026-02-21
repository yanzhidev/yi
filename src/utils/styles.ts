import { clsx, type ClassValue } from 'clsx'

/**
 * 组合 CSS 类名的工具函数
 * 统一项目中所有 clsx 的使用
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * 常用的样式类名组合
 */
export const stylePresets = {
  // 按钮样式
  button: {
    primary: "px-12 py-4 rounded-full bg-amber-600 text-white hover:bg-amber-700 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl",
    secondary: "px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors",
    disabled: "px-12 py-4 rounded-full bg-stone-300 text-stone-500 cursor-not-allowed text-sm font-medium transition-all duration-300"
  },
  
  // 卡片样式
  card: {
    default: "bg-white rounded-3xl p-8 shadow-md border border-stone-200",
    amber: "bg-amber-50 rounded-3xl p-8 shadow-md border border-amber-200",
    stone: "bg-stone-50 rounded-lg p-4"
  },
  
  // 输入框样式
  input: {
    default: "w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent resize-none transition-all"
  },
  
  // 文本样式
  text: {
    title: "text-4xl font-medium tracking-wider text-stone-800",
    subtitle: "text-sm text-stone-600 tracking-wide",
    body: "text-stone-700 text-base leading-relaxed"
  }
} as const
