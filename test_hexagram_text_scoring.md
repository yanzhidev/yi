# 卦辞断语评分测试

## 问题分析
之前英文环境下卦辞断语得分较低的原因：

1. **数据源问题**: `getHexagramById()` 函数依赖全局 `currentLanguage`，返回对应语言的卦象数据
2. **关键词匹配**: 英文卦辞不包含中文吉凶关键词（如"元亨利贞"、"吉"、"凶"等）
3. **评分差异**: 导致英文环境下得分偏低

## 修复方案
在 `analyzeHexagramText()` 函数中：
1. 保存当前语言设置
2. 临时切换到中文获取卦象数据
3. 使用中文数据进行关键词匹配和评分
4. 恢复原始语言设置
5. 使用用户选择的语言显示结果

## 测试用例

### 乾卦 (ID: 1)
- **中文卦辞**: "元亨利贞。"
- **英文卦辞**: "The Creative brings sublime success, furthering through perseverance."
- **中文关键词匹配**: "元亨利贞" (强吉词汇 +15分)
- **预期结果**: 中英文环境下得分相同

### 否卦 (ID: 12) 
- **中文卦辞**: "否之匪人，不利君子贞，大往小来。"
- **英文卦辞**: "Obstruction. The conditions are adverse. No movement in any direction is favorable. Perseverance brings good fortune. The great departs and the small approaches."
- **中文关键词匹配**: "不利" (中等凶词汇 -8分)
- **预期结果**: 中英文环境下得分相同

## 修复验证
修复后，无论用户选择何种语言，卦辞断语评分都基于中文易经原理进行计算，确保判断结果的一致性和准确性。
