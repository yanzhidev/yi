import { describe, it, expect } from 'vitest';

// 变爻解读规则测试用例
describe('变爻数量与解读重点规则', () => {
  
  // 辅助函数：模拟重点解读规则判断
  function getKeyInterpretationInfo(changingLines: number[], hexagramId: number) {
    const count = changingLines.length;
    
    switch (count) {
      case 0:
        return { type: 'mainGuaText', description: '看本卦卦辞' };
      case 1:
        return { 
          type: 'singleLine', 
          line: changingLines[0], 
          description: `看本卦第${changingLines[0]}爻爻辞` 
        };
      case 2:
        const primaryLine = Math.max(...changingLines);
        return { 
          type: 'twoLines', 
          lines: changingLines, 
          primaryLine,
          description: `看本卦第${changingLines.join('、')}爻爻辞，以第${primaryLine}爻（上爻）为主` 
        };
      case 3:
        return { type: 'bothGuaText', description: '看本卦卦辞 + 变卦卦辞' };
      case 4:
        const unchangedPositions = [1, 2, 3, 4, 5, 6].filter(pos => !changingLines.includes(pos));
        const unchangedInLower = unchangedPositions.filter(pos => pos <= 3)[0];
        const targetLine = unchangedInLower || unchangedPositions[0];
        return { 
          type: 'changedLine', 
          line: targetLine,
          description: `看变卦下爻（第${targetLine}爻，两个不变爻中靠下的）` 
        };
      case 5:
        const unchanged = [1, 2, 3, 4, 5, 6].filter(pos => !changingLines.includes(pos))[0];
        return { 
          type: 'changedLine', 
          line: unchanged,
          description: `看变卦不变爻（第${unchanged}爻，唯一没变的）` 
        };
      case 6:
        if (hexagramId === 1) {
          return { type: 'specialUse', useLine: '用九', description: '乾卦看用九' };
        } else if (hexagramId === 2) {
          return { type: 'specialUse', useLine: '用六', description: '坤卦看用六' };
        }
        return { type: 'changedGuaText', description: '看变卦卦辞' };
      default:
        return null;
    }
  }

  describe('0个变爻', () => {
    it('应该看本卦卦辞', () => {
      const result = getKeyInterpretationInfo([], 1);
      expect(result?.type).toBe('mainGuaText');
      expect(result?.description).toBe('看本卦卦辞');
    });
  });

  describe('1个变爻', () => {
    it('变爻在第1位，应该看本卦第1爻', () => {
      const result = getKeyInterpretationInfo([1], 1);
      expect(result?.type).toBe('singleLine');
      expect(result?.line).toBe(1);
    });

    it('变爻在第5位，应该看本卦第5爻', () => {
      const result = getKeyInterpretationInfo([5], 1);
      expect(result?.type).toBe('singleLine');
      expect(result?.line).toBe(5);
    });
  });

  describe('2个变爻', () => {
    it('九二和九四变动，应该以九四（上爻）为主', () => {
      const result = getKeyInterpretationInfo([2, 4], 1);
      expect(result?.type).toBe('twoLines');
      expect(result?.lines).toEqual([2, 4]);
      expect(result?.primaryLine).toBe(4); // 上爻为主
    });

    it('九三和上九变动，应该以上九（上爻）为主', () => {
      const result = getKeyInterpretationInfo([3, 6], 1);
      expect(result?.type).toBe('twoLines');
      expect(result?.lines).toEqual([3, 6]);
      expect(result?.primaryLine).toBe(6); // 上爻为主
    });

    it('初九和九二变动，应该以九二（上爻）为主', () => {
      const result = getKeyInterpretationInfo([1, 2], 1);
      expect(result?.type).toBe('twoLines');
      expect(result?.lines).toEqual([1, 2]);
      expect(result?.primaryLine).toBe(2); // 上爻为主
    });
  });

  describe('3个变爻', () => {
    it('应该看本卦卦辞 + 变卦卦辞', () => {
      const result = getKeyInterpretationInfo([1, 3, 5], 1);
      expect(result?.type).toBe('bothGuaText');
      expect(result?.description).toBe('看本卦卦辞 + 变卦卦辞');
    });
  });

  describe('4个变爻', () => {
    it('变爻在1,2,3,4位（下爻1不变），应该看变卦第1爻', () => {
      // 不变的是5,6，下爻中没有不变的，取第一个不变爻
      const result = getKeyInterpretationInfo([1, 2, 3, 4], 1);
      expect(result?.type).toBe('changedLine');
      // 不变的是5,6，下爻(1,2,3)中没有，取第一个不变(5)
      expect(result?.line).toBe(5);
    });

    it('变爻在1,3,5,6位（下爻2,4不变），应该看变卦第2爻（下爻中靠下的）', () => {
      // 不变的是2,4，下爻中靠下的是2
      const result = getKeyInterpretationInfo([1, 3, 5, 6], 1);
      expect(result?.type).toBe('changedLine');
      expect(result?.line).toBe(2); // 2和4中，2是下爻且靠下
    });

    it('变爻在2,4,5,6位（下爻1,3不变），应该看变卦第1爻（下爻中靠下的）', () => {
      // 不变的是1,3，下爻中靠下的是1
      const result = getKeyInterpretationInfo([2, 4, 5, 6], 1);
      expect(result?.type).toBe('changedLine');
      expect(result?.line).toBe(1); // 1和3中，1更靠下
    });

    it('变爻在1,2,5,6位（下爻3,4不变），应该看变卦第3爻（下爻中靠下的）', () => {
      // 不变的是3,4，下爻中靠下的是3
      const result = getKeyInterpretationInfo([1, 2, 5, 6], 1);
      expect(result?.type).toBe('changedLine');
      expect(result?.line).toBe(3); // 3和4中，3是下爻
    });
  });

  describe('5个变爻', () => {
    it('只有第3爻不变，应该看变卦第3爻', () => {
      const result = getKeyInterpretationInfo([1, 2, 4, 5, 6], 1);
      expect(result?.type).toBe('changedLine');
      expect(result?.line).toBe(3);
    });

    it('只有第1爻不变，应该看变卦第1爻', () => {
      const result = getKeyInterpretationInfo([2, 3, 4, 5, 6], 1);
      expect(result?.type).toBe('changedLine');
      expect(result?.line).toBe(1);
    });

    it('只有第6爻不变，应该看变卦第6爻', () => {
      const result = getKeyInterpretationInfo([1, 2, 3, 4, 5], 1);
      expect(result?.type).toBe('changedLine');
      expect(result?.line).toBe(6);
    });
  });

  describe('6个变爻', () => {
    it('乾卦（第1卦）应该看用九', () => {
      const result = getKeyInterpretationInfo([1, 2, 3, 4, 5, 6], 1);
      expect(result?.type).toBe('specialUse');
      expect(result?.useLine).toBe('用九');
    });

    it('坤卦（第2卦）应该看用六', () => {
      const result = getKeyInterpretationInfo([1, 2, 3, 4, 5, 6], 2);
      expect(result?.type).toBe('specialUse');
      expect(result?.useLine).toBe('用六');
    });

    it('其他卦（如第3卦屯卦）应该看变卦卦辞', () => {
      const result = getKeyInterpretationInfo([1, 2, 3, 4, 5, 6], 3);
      expect(result?.type).toBe('changedGuaText');
      expect(result?.description).toBe('看变卦卦辞');
    });
  });

});
