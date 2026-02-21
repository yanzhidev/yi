export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'es';

export interface Translation {
  // Header
  title: string;
  subtitle: string;
  iChing: string;

  // Input
  questionLabel: string;
  questionPlaceholder: string;

  // Buttons
  castButton: string;
  resetButton: string;
  coinDivination: string; // 钱卜按钮
  back: string; // 返回按钮
  reset: string; // 重置按钮
  viewResult: string; // 查看结果按钮

  // Results
  yourQuestion: string;
  casting: string;
  castingDescription: string;

  // Hexagram sections
  originalHexagram: string;
  changedHexagram: string;
  changingLines: string;
  changingLinesCount: string;
  hexagramNumber: string; // 第x卦
  keyInterpretationNote: string; // 解读提示说明
  interpretationRules: string; // 重点解读规则说明
  interpretation0Lines: string; // 0变爻解读
  interpretation1Line: string; // 1变爻解读
  interpretation2Lines: string; // 2变爻解读
  interpretation3Lines: string; // 3变爻解读
  interpretation4Lines: string; // 4变爻解读
  interpretation5Lines: string; // 5变爻解读
  interpretation6LinesQian: string; // 6变爻乾卦解读
  interpretation6LinesKun: string; // 6变爻坤卦解读
  interpretation6LinesOthers: string; // 6变爻其他卦解读

  // Manual Input
  manualInputTitle: string; // 手动摇卦输入
  manualInputDescription: string; // 手动输入说明
  coinExplanation: string; // 铜钱说明
  explanation: string; // 说明标签
  divineButton: string; // 解卦按钮
  oldYang: string; // 老阳
  youngYang: string; // 少阳
  youngYin: string; // 少阴
  oldYin: string; // 老阴
  lineNames: string[]; // 爻位名称：初爻, 二爻, 三爻, 四爻, 五爻, 上爻
  changeSymbol: string; // 变字符号

  // Interpretation labels
  guaText: string;
  tuan: string;
  daXiang: string;
  lineInterpretation: string;
  yaoText: string;
  xiang: string;
  interpretation: string;
  plainTranslation: string;
  lifeInspiration: string;
  decisionAdvice: string;
  keyInterpretation: string; // 重点解读

  // Line Relations Interpretation
  lineRelationsInterpretation: string;
  changingLine: string;
  dangWei: string;
  notDangWei: string;
  dangWeiAnalysis: string;
  yingRelation: string;
  chengChengRelation: string;
  modernInterpretation: string;
  lineCharacter: string; // 爻字
  inContextOf: string; // 的背景下

  // Fortune Assessment
  fortuneAssessment: string;
  confidence: string;
  benGuaWeight: string;
  bianGuaWeight: string;
  overallScore: string;
  dimensionAnalysis: string;
  hexagramTextScore: string;
  trigramRelationScore: string;
  linesPositionScore: string;
  changingLinesAdjustment: string;
  situationAnalysis: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  detailedAnalysis: string;
  hexagramTextAnalysis: string;
  trigramRelationAnalysis: string;
  linesPositionAnalysis: string;
  changingLinesAnalysis: string;
  none: string;

  // Fortune Assessment specific
  keywordSeparator: string; // 关键词分隔符（中文：、英文：, ）
  trigramRelationPattern: string; // 上卦在下卦上模式（{0}在{1}上 / {0} on {1}）
  changingLinesPattern: string; // 变爻数量模式（{0}个变爻 / {0} changing lines）

  // Fortune Levels
  extremelyAuspicious: string;
  veryAuspicious: string;
  auspicious: string;
  neutral: string;
  inauspicious: string;
  veryInauspicious: string;
  extremelyInauspicious: string;

  // Fortune Level Descriptions
  extremelyAuspiciousDesc: string;
  veryAuspiciousDesc: string;
  auspiciousDesc: string;
  neutralDesc: string;
  inauspiciousDesc: string;
  veryInauspiciousDesc: string;
  extremelyInauspiciousDesc: string;

  // Fortune Assessment Reasoning
  hexagramTextAnalysisLabel: string;
  hexagramNameLabel: string;
  hexagramTextLabel: string;
  keywordAnalysisLabel: string;
  finalScoreLabel: string;
  trigramRelationAnalysisLabel: string;
  upperTrigramLabel: string;
  lowerTrigramLabel: string;
  heavenEarthRelationLabel: string;
  fiveElementsRelationLabel: string;
  yinYangHarmonyLabel: string;
  specialCombinationLabel: string;
  linesPositionAnalysisLabel: string;
  changingLinesAnalysisLabel: string;
  yinYangBalanceLabel: string;
  positionStructureLabel: string;
  specialCombinationsLabel: string;
  invalidHexagramStructureLabel: string;
  unknownLabel: string;
  cannotAnalyzeLabel: string;

  // Additional Reasoning Labels
  relationshipSummary: string;
  eachLineAnalysis: string;
  properPositionCount: string;
  improperPositionCount: string;
  yangLinesCount: string;
  yinLinesCount: string;
  pointsText: string;
  upperGeneratesLower: string;
  lowerGeneratesUpper: string;
  sameElement: string;
  upperRestrictsLower: string;
  lowerRestrictsUpper: string;
  restrictedBy: string;

  // Special Hexagram Adjustments
  hexagram1Adjustment: string;
  hexagram2Adjustment: string;
  hexagram11Adjustment: string;
  hexagram12Adjustment: string;
  hexagram63Adjustment: string;
  hexagram64Adjustment: string;

  // Heaven-Earth Relations
  heavenEarthRelation: string;
  heavenHeavenRelation: string;
  earthEarthRelation: string;
  heavenMountainRelation: string;
  heavenLakeRelation: string;
  heavenFireRelation: string;
  heavenWindRelation: string;
  heavenWaterRelation: string;
  heavenThunderRelation: string;
  earthMountainRelation: string;
  earthLakeRelation: string;
  earthFireRelation: string;
  earthWindRelation: string;
  earthWaterRelation: string;
  earthThunderRelation: string;

  // Yin-Yang Balance Relations
  yinYangIdeal: string;
  yinYangBalanced: string;
  yinYangInverted: string;
  yinYangNoFeature: string;
  fiveElementsNoFeature: string;

  // Changing Lines Analysis
  noChangingLines: string;
  oneChangingLine: string;
  twoChangingLines: string;
  threeChangingLines: string;
  manyChangingLines: string;
  changingLinesUnknown: string;

  // Lines Yin-Yang Balance
  yinYangBalancedHarmony: string;
  yangMoreThanYin: string;
  yinMoreThanYang: string;
  yangExtreme: string;
  yinExtreme: string;

  // Special Line Combinations
  allYangHexagram: string;
  allYinHexagram: string;
  middlePosition: string;

  // Position Structure Analysis
  lines34Harmony: string;
  lines34Gentle: string;
  lines16Correspondence: string;
  lines25Correspondence: string;
  positionStructureNoFeature: string;

  // Special Changing Positions Analysis
  firstLineChange: string;
  sixthLineChange: string;
  secondLineChange: string;
  fifthLineChange: string;
  thirdOrFourthLineChange: string;
  hexagramChangeNoFeature: string;

  // Changing Lines Cases
  generalCase: string;
  staticHexagram: string;
  singleLineChange: string;
  doubleLineChange: string;
  tripleLineChange: string;
  multipleLineChange: string;

  // Line Type Weights
  oldYangDesc: string;
  youngYangDesc: string;
  youngYinDesc: string;
  oldYinDesc: string;

  // Special Combinations
  pureYangHexagram: string;
  pureYinHexagram: string;
  taiHexagram: string;
  piHexagram: string;
  jiJiHexagram: string;
  weiJiHexagram: string;
  fengHexagram: string;
  kunHexagram: string;
  noSpecialCombination: string;

  // Special Combination Adjustment
  specialCombinationAdjustmentLabel: string;

  // Extreme Changing Cases
  qianAllChange: string;
  kunAllChange: string;
  middleFourChange: string;
  jumpingChange: string;
  yongJiu: string;
  yongLiu: string;
  fourLineChange: string;
  jumpingLineChange: string;

  // Overall Advice
  hexagramTextGood: string;
  hexagramTextBad: string;
  trigramGood: string;
  trigramBad: string;
  linesGood: string;
  linesBad: string;

  // Special Line Combinations
  middlePositionDesc: string;
  allYangDesc: string;
  allYinDesc: string;
  properPositionDesc: string;
  improperPositionDesc: string;

  // Special Hexagram Changes
  qianToKun: string;
  kunToQian: string;
  taiToPi: string;
  piToTai: string;
  jiJiToWeiJi: string;
  weiJiToJiJi: string;
  qianKunConversion: string;
  taiPiConversion: string;
  jiWeiConversion: string;

  // Detailed Analysis Content
  detailedStrengthsHexagram: string;
  detailedStrengthsTrigram: string;
  detailedStrengthsLines: string;
  detailedWeaknessesHexagram: string;
  detailedWeaknessesTrigram: string;
  detailedWeaknessesLines: string;
  detailedOpportunitiesHexagram: string;
  detailedOpportunitiesTrigram: string;
  detailedOpportunitiesLines: string;
  detailedThreatsHexagram: string;
  detailedThreatsTrigram: string;
  detailedThreatsLines: string;

  // Trigram Names
  trigramQian: string;
  trigramKun: string;
  trigramZhen: string;
  trigramKan: string;
  trigramGen: string;
  trigramXun: string;
  trigramLi: string;
  trigramDui: string;

  // Trigram Natures
  natureHeaven: string;
  natureEarth: string;
  natureThunder: string;
  natureWater: string;
  natureMountain: string;
  natureWind: string;
  natureFire: string;
  natureLake: string;

  // Trigram Qualities
  qualityFirm: string;
  qualityGentle: string;
  qualityMoving: string;
  qualityDangerous: string;
  qualityStill: string;
  qualityObedient: string;
  qualityClinging: string;
  qualityJoyful: string;

  // Five Elements
  elementMetal: string;
  elementWood: string;
  elementWater: string;
  elementFire: string;
  elementEarth: string;

  // Line Positions
  lineFirst: string;
  lineSecond: string;
  lineThird: string;
  lineFourth: string;
  lineFifth: string;
  lineSixth: string;

  // Line Position Types
  positionLowest: string;
  positionLowerMiddle: string;
  positionLowerUpper: string;
  positionUpperLower: string;
  positionUpperMiddle: string;
  positionHighest: string;

  // Line Natures
  natureBeginning: string;
  natureMiddle: string;
  natureDangerous2: string;
  natureAuspicious: string;
  natureEnd: string;

  // Weight Calculation Text
  originalHexagramScore: string;
  changedHexagramScore: string;
  combinedScore: string;
  originalHexagramAnalysis: string;
  changedHexagramAnalysis: string;
  weightPercentage: string;

  // Position Analysis Text
  properPosition: string;
  improperPosition: string;
  pointsText2: string;

  // Hexagram Display Text
  clickToStart: string;
  hexagramNumberWithSuffix: string;

  // Hexagram Result Text
  daxiangImageAlt: string;
  yongJiuLabel: string;
  yongLiuLabel: string;

  // Auth Button Fallback Text
  logoutFallback: string;
  signInFallback: string;

  // Hexagram Name Format
  hexagramNameFormat: string;

  // Question Label
  yourQuestionLabel: string;

  // Footer
  footer: string;

  // Language selector
  selectLanguage: string;
  languages: {
    en: string;
    'zh-CN': string;
    'zh-TW': string;
    es: string;
  };

  // Authentication
  signIn: string;
  logout: string;
  loginRequired: string;
  loginToSave: string;

  // History
  history: string;
  noHistory: string;
  viewHistory: string;
  clearHistory: string;
  historyRecord: string;
  deleteHistory: string;
  deleteConfirm: string;
  deleteSuccess: string;
  deleteError: string;
  historyOriginalHexagram: string;
  historyChangedHexagram: string;
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
  yesterday: string;
  daysAgo: string;
}
