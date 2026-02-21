// 导出类型
export type { Language, Translation } from './types';

// 导入各语言翻译
import { en } from './en';
import { zhCN } from './zh-CN';
import { zhTW } from './zh-TW';
import { es } from './es';
import type { Language, Translation } from './types';

export const translations = {
  'en': en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'es': es
} as const;

export const defaultLanguage: Language = 'zh-CN';

export const languages: Language[] = ['en', 'zh-CN', 'zh-TW', 'es'];

/**
 * 获取翻译文本
 * @param language 语言
 * @param key 翻译键
 * @returns 翻译文本
 */
export function getTranslation(language: Language, key: keyof Translation): string {
  const translation = translations[language][key] || translations[defaultLanguage][key];
  return typeof translation === 'string' ? translation : String(translation);
}

/**
 * 安全的翻译函数，允许字符串键
 * @param language 语言
 * @param key 翻译键
 * @returns 翻译文本
 */
export function getTranslationSafe(language: Language, key: string): string {
  const translation = (translations[language] as any)[key] || (translations[defaultLanguage] as any)[key];
  return typeof translation === 'string' ? translation : String(translation);
}
