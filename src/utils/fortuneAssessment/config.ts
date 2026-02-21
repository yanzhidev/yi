import { getTranslation } from '../../i18n';
import type { Language } from '../../i18n';
import type { FortuneAssessmentConfig, FortuneLevel, FortuneLevelConfig } from './types';

/**
 * 默认吉凶判断配置
 */
export const DEFAULT_FORTUNE_CONFIG: FortuneAssessmentConfig = {
  weights: {
    hexagramText: 0.4,
    trigramRelation: 0.3,
    linesPosition: 0.3
  },
  enableChangingLinesAdjustment: true,
  language: 'zh-CN'
};

/**
 * 获取吉凶等级配置
 * @param language 语言
 * @returns 吉凶等级配置
 */
export function getFortuneLevels(language: Language = 'zh-CN'): Record<FortuneLevel, FortuneLevelConfig> {
  return {
    extremely_auspicious: {
      level: 'extremely_auspicious',
      score: 90,
      label: getTranslation(language, 'extremelyAuspicious'),
      color: '#dc2626', // red-600
      description: getTranslation(language, 'extremelyAuspiciousDesc')
    },
    very_auspicious: {
      level: 'very_auspicious',
      score: 75,
      label: getTranslation(language, 'veryAuspicious'),
      color: '#ea580c', // orange-600
      description: getTranslation(language, 'veryAuspiciousDesc')
    },
    auspicious: {
      level: 'auspicious',
      score: 60,
      label: getTranslation(language, 'auspicious'),
      color: '#d97706', // amber-600
      description: getTranslation(language, 'auspiciousDesc')
    },
    neutral: {
      level: 'neutral',
      score: 45,
      label: getTranslation(language, 'neutral'),
      color: '#65a30d', // lime-600
      description: getTranslation(language, 'neutralDesc')
    },
    inauspicious: {
      level: 'inauspicious',
      score: 30,
      label: getTranslation(language, 'inauspicious'),
      color: '#0891b2', // cyan-600
      description: getTranslation(language, 'inauspiciousDesc')
    },
    very_inauspicious: {
      level: 'very_inauspicious',
      score: 15,
      label: getTranslation(language, 'veryInauspicious'),
      color: '#2563eb', // blue-600
      description: getTranslation(language, 'veryInauspiciousDesc')
    },
    extremely_inauspicious: {
      level: 'extremely_inauspicious',
      score: 0,
      label: getTranslation(language, 'extremelyInauspicious'),
      color: '#7c3aed', // violet-600
      description: getTranslation(language, 'extremelyInauspiciousDesc')
    }
  };
}

// 保持向后兼容的常量（默认中文）
export const FORTUNE_LEVELS = getFortuneLevels('zh-CN');

/**
 * 验证配置的有效性
 * @param config 配置对象
 * @returns 验证结果
 */
export function validateConfig(config: FortuneAssessmentConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // 验证权重总和
  const totalWeight = config.weights.hexagramText + config.weights.trigramRelation + config.weights.linesPosition;
  if (Math.abs(totalWeight - 1.0) > 0.01) {
    errors.push(`权重总和应为1.0，当前为${totalWeight}`);
  }
  
  // 验证权重范围
  if (config.weights.hexagramText < 0 || config.weights.hexagramText > 1) {
    errors.push('卦辞断语权重应在0-1之间');
  }
  if (config.weights.trigramRelation < 0 || config.weights.trigramRelation > 1) {
    errors.push('上下卦关系权重应在0-1之间');
  }
  if (config.weights.linesPosition < 0 || config.weights.linesPosition > 1) {
    errors.push('爻位综合权重应在0-1之间');
  }
  
  // 验证语言设置
  if (!['zh-CN', 'zh-TW', 'en', 'es'].includes(config.language)) {
    errors.push(`不支持的语言：${config.language}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 创建自定义配置
 * @param overrides 覆盖的配置项
 * @returns 新的配置对象
 */
export function createConfig(overrides: Partial<FortuneAssessmentConfig>): FortuneAssessmentConfig {
  const config = {
    ...DEFAULT_FORTUNE_CONFIG,
    ...overrides,
    weights: {
      ...DEFAULT_FORTUNE_CONFIG.weights,
      ...(overrides.weights || {})
    }
  };
  
  const validation = validateConfig(config);
  if (!validation.isValid) {
    throw new Error(`配置验证失败：\n${validation.errors.join('\n')}`);
  }
  
  return config;
}
