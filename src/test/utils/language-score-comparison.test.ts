import { describe, it, expect } from 'vitest';
import { assessFortune } from '../../utils/fortuneAssessment/index';

describe('Language Score Comparison Tests', () => {
  const mockHexagramResult = {
    hexagramId: 1, // 乾卦 - 包含"元亨利贞"等吉词
    changedHexagramId: null,
    changingLines: [],
    lines: [
      { value: 1, isChanging: false, lineType: 'youngYang' },
      { value: 1, isChanging: false, lineType: 'youngYang' },
      { value: 1, isChanging: false, lineType: 'youngYang' },
      { value: 1, isChanging: false, lineType: 'youngYang' },
      { value: 1, isChanging: false, lineType: 'youngYang' },
      { value: 1, isChanging: false, lineType: 'youngYang' }
    ]
  };

  it('中文版应该比英文版评分更高', () => {
    const chineseResult = assessFortune(mockHexagramResult, undefined, 'zh-CN');
    const englishResult = assessFortune(mockHexagramResult, undefined, 'en');
    
    console.log('中文评分:', chineseResult.totalScore);
    console.log('英文评分:', englishResult.totalScore);
    console.log('中文卦辞评分:', chineseResult.hexagramTextScore.score);
    console.log('英文卦辞评分:', englishResult.hexagramTextScore.score);
    console.log('中文关键词:', chineseResult.hexagramTextScore.keywords);
    console.log('英文关键词:', englishResult.hexagramTextScore.keywords);
    
    // 中文应该能识别"元亨利贞"等关键词，得分更高
    expect(chineseResult.hexagramTextScore.score).toBeGreaterThan(englishResult.hexagramTextScore.score);
  });

  it('中文版应该比西班牙文版评分更高', () => {
    const chineseResult = assessFortune(mockHexagramResult, undefined, 'zh-CN');
    const spanishResult = assessFortune(mockHexagramResult, undefined, 'es');
    
    console.log('中文评分:', chineseResult.totalScore);
    console.log('西班牙文评分:', spanishResult.totalScore);
    console.log('中文卦辞评分:', chineseResult.hexagramTextScore.score);
    console.log('西班牙文卦辞评分:', spanishResult.hexagramTextScore.score);
    
    // 中文应该能识别"元亨利贞"等关键词，得分更高
    expect(chineseResult.hexagramTextScore.score).toBeGreaterThan(spanishResult.hexagramTextScore.score);
  });
});
