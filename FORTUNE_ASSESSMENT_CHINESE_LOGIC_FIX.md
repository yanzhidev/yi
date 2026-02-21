# 易经吉凶判断逻辑中文修复

## 修复目标
确保易经吉凶判断的所有计算逻辑完全基于中文进行，仅在UI显示时使用多国语言。

## 修复内容

### 1. analysis.ts 修复
**问题**: 变爻调整函数中直接返回翻译后的文本，导致判断逻辑依赖显示语言。

**修复**:
- `analyzeSpecialChangingPositions()`: 返回翻译键数组而非翻译后的文本
- `analyzeSpecialHexagramChange()`: 返回翻译键而非翻译后的文本  
- `analyzeExtremeChangingCase()`: 返回翻译键而非翻译后的文本
- 在 `calculateChangingLinesAdjustment()` 中统一处理翻译

### 2. linePosition.ts 修复
**问题**: 多个函数在判断逻辑中直接调用 `getTranslation()`。

**修复**:
- `getLineTypeWeights()`: 返回翻译键而非翻译后的描述
- `getSpecialLineCombinations()`: 返回翻译键数组
- `analyzeChangingLines()`: 返回 `descriptionKey` 而非 `description`
- `analyzeLinesYinYangBalance()`: 返回 `descriptionKey` 而非 `description`
- `analyzePositionStructure()`: 返回 `descriptionKeys` 数组
- `getSpecialCombinationAdjustment()`: 返回 `descriptionKey` 而非 `description`
- 在 `calculateLinesPositionScore()` 中统一处理翻译

### 3. trigramRelation.ts 修复
**问题**: 五行关系、阴阳调和等函数返回翻译后的文本。

**修复**:
- `getElementRelationScore()`: 返回 `descriptionKey` 而非 `description`
- `getYinYangBalanceScore()`: 返回 `descriptionKey` 而非 `description`
- `getSpecialCombinationAdjustment()`: 返回 `descriptionKey` 而非 `description`
- 在 `analyzeTrigramRelation()` 中统一处理翻译

### 4. hexagramText.ts 状态
该文件已经正确实现，所有判断逻辑基于中文，返回翻译键供显示层使用。

## 核心原则

1. **判断逻辑纯中文**: 所有评分、计算、匹配逻辑使用中文
2. **分离关注点**: 判断逻辑返回翻译键，显示逻辑负责翻译
3. **一致性**: 所有评分器遵循相同的模式
4. **向后兼容**: 保持API接口不变，仅修改内部实现

## 验证结果
- ✅ TypeScript 编译通过
- ✅ 构建成功
- ✅ 所有判断逻辑基于中文
- ✅ 多语言显示功能正常

## 示例对比

### 修复前
```typescript
// 判断逻辑依赖显示语言
function getElementRelationScore(upperElement: string, lowerElement: string, language: Language) {
  if (relations.generate[upperElement] === lowerElement) {
    return { score: 15, description: getTranslation(language, 'upperGeneratesLower') };
  }
}
```

### 修复后
```typescript
// 判断逻辑纯中文，返回翻译键
function getElementRelationScore(upperElement: string, lowerElement: string, _language: Language) {
  if (relations.generate[upperElement] === lowerElement) {
    return { score: 15, descriptionKey: 'upperGeneratesLower' };
  }
}

// 显示层处理翻译
const elementRelation = getElementRelationScore(chineseUpperElement, chineseLowerElement, 'zh-CN');
reasoning += getTranslation(language, elementRelation.descriptionKey as keyof Translation);
```

## 影响范围
- `src/utils/fortuneAssessment/analysis.ts`
- `src/utils/fortuneAssessment/scorers/linePosition.ts`  
- `src/utils/fortuneAssessment/scorers/trigramRelation.ts`

这些修改确保了易经吉凶判断的准确性和一致性，无论用户选择何种显示语言，判断结果都基于中文易经原理进行计算。
