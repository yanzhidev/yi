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

export const translations: Record<Language, Translation> = {
  'en': {
    title: 'Digital I Ching',
    subtitle: 'Ask with sincerity, understand through divination',
    iChing: 'I Ching',
    questionLabel: 'With a sincere heart, please enter your question:',
    questionPlaceholder: 'e.g., Should I accept this job offer? Will this partnership succeed?...',
    castButton: 'DIVINE',
    resetButton: 'Divine Again',
    coinDivination: 'COIN DIVINATION',
    back: 'Back',
    reset: 'Reset',
    viewResult: 'View Result',
    yourQuestion: 'Your Question',
    casting: 'Casting...',
    castingDescription: 'Connecting with the energy of heaven and earth, casting coins...',
    originalHexagram: 'Original Hexagram',
    changedHexagram: 'Changed Hexagram',
    changingLines: 'Changing Lines',
    changingLinesCount: 'changing lines',
    hexagramNumber: 'Hexagram {0}',
    keyInterpretationNote: 'Key interpretation based on changing lines',
    interpretationRules: '0 changing lines: Read original hexagram text | 1 changing line: Read that specific line text | 2 changing lines: Read both lines, prioritize the upper one | 3 changing lines: Read both original and changed hexagram texts | 4 changing lines: Read the lower unchanged line of the changed hexagram | 5 changing lines: Read the only unchanged line of the changed hexagram | 6 changing lines: For Qian use "Yong Jiu", for Kun use "Yong Liu", for others read changed hexagram text',
    interpretation0Lines: 'All six lines are static without changes. Read the original hexagram text directly, representing the general trend of the matter.',
    interpretation1Line: 'Only one line is changing. Read the text of this changing line directly, as it provides the most fundamental guidance.',
    interpretation2Lines: 'Two lines are changing. Prioritize the upper line (e.g., if lines 2 and 4 change simultaneously, prioritize line 4), with the lower line as auxiliary reference.',
    interpretation3Lines: 'Three lines are changing. The meaning of the changing lines weakens, shifting to read both the original hexagram text and the changed hexagram text, combining both interpretations.',
    interpretation4Lines: 'Four lines are changing, leaving only two lines unchanged. The interpretation focuses on the text of the lower unchanged line of the changed hexagram.',
    interpretation5Lines: 'Five lines are changing, leaving only one line unchanged. The interpretation focuses on the text of the only unchanged line of the changed hexagram.',
    interpretation6LinesQian: 'All six lines are changing: ① If the original hexagram is Qian, read the text "Yong Jiu"; ② If the original hexagram is Kun, read the text "Yong Liu"; ③ For the other 62 hexagrams, read the text of the changed hexagram directly.',
    interpretation6LinesKun: 'All six lines are changing: ① If the original hexagram is Qian, read the text "Yong Jiu"; ② If the original hexagram is Kun, read the text "Yong Liu"; ③ For the other 62 hexagrams, read the text of the changed hexagram directly.',
    interpretation6LinesOthers: 'All six lines are changing: ① If the original hexagram is Qian, read the text "Yong Jiu"; ② If the original hexagram is Kun, read the text "Yong Liu"; ③ For the other 62 hexagrams, read the text of the changed hexagram directly.',
    manualInputTitle: 'Manual Hexagram Input',
    manualInputDescription: 'Please select coin toss results for each line from bottom to top',
    coinExplanation: '3 tails(9)=Old Yang ○, 2 heads 1 tail(7)=Young Yang |||, 2 tails 1 head(8)=Young Yin ||, 3 heads(6)=Old Yin ×',
    explanation: 'Explanation:',
    divineButton: 'Divine',
    oldYang: 'Old Yang',
    youngYang: 'Young Yang',
    youngYin: 'Young Yin',
    oldYin: 'Old Yin',
    lineNames: ['First Line', 'Second Line', 'Third Line', 'Fourth Line', 'Fifth Line', 'Sixth Line'],
    changeSymbol: 'Change',
    guaText: 'Text',
    tuan: 'Tuan',
    daXiang: 'Great Image',
    lineInterpretation: 'Changing Line Interpretation',
    yaoText: 'Line Text',
    xiang: 'Image',
    interpretation: 'Popular Interpretation',
    plainTranslation: 'Plain Translation',
    lifeInspiration: 'Life Inspiration',
    decisionAdvice: 'Decision Advice',
    keyInterpretation: 'Key Interpretation',

    // Line Relations Interpretation
    lineRelationsInterpretation: 'Line Relations Interpretation',
    changingLine: 'Changing Line',
    dangWei: 'Proper Position',
    notDangWei: 'Improper Position',
    dangWeiAnalysis: 'Position Analysis',
    yingRelation: 'Correspondence Relation',
    chengChengRelation: 'Support-Riding Relation',
    modernInterpretation: 'Modern Interpretation',
    lineCharacter: 'Line',
    inContextOf: 'in the context of',

    // Fortune Assessment
    fortuneAssessment: 'Fortune Assessment',
    confidence: 'Confidence',
    benGuaWeight: 'Original Hexagram Weight',
    bianGuaWeight: 'Changed Hexagram Weight',
    overallScore: 'Overall Score',
    dimensionAnalysis: 'Dimension Analysis',
    hexagramTextScore: 'Hexagram Text Score',
    trigramRelationScore: 'Trigram Relation Score',
    linesPositionScore: 'Lines Position Score',
    changingLinesAdjustment: 'Changing Lines Adjustment',
    situationAnalysis: 'Situation Analysis',
    strengths: 'Strengths',
    weaknesses: 'Weaknesses',
    opportunities: 'Opportunities',
    threats: 'Threats',
    detailedAnalysis: 'Detailed Analysis',
    hexagramTextAnalysis: 'Hexagram Text Analysis',
    trigramRelationAnalysis: 'Trigram Relation Analysis',
    linesPositionAnalysis: 'Lines Position Analysis',
    changingLinesAnalysis: 'Changing Lines Analysis',
    none: 'None',

    // Fortune Levels
    extremelyAuspicious: 'Extremely Auspicious',
    veryAuspicious: 'Very Auspicious',
    auspicious: 'Auspicious',
    neutral: 'Neutral',
    inauspicious: 'Inauspicious',
    veryInauspicious: 'Very Inauspicious',
    extremelyInauspicious: 'Extremely Inauspicious',

    extremelyAuspiciousDesc: 'Heavenly timing, geographical advantage, and human harmony. All matters prosper smoothly, a once-in-a-lifetime opportunity.',
    veryAuspiciousDesc: 'Good fortune with many opportunities. It is advisable to actively advance.',
    auspiciousDesc: 'Fortune trends steadily upward with small achievements. It is advisable to seek progress while maintaining stability.',
    neutralDesc: 'Fortune is average with mixed blessings and misfortunes. It is advisable to act cautiously.',
    inauspiciousDesc: 'Fortune encounters slight obstacles. It is advisable to defend rather than attack, and wait for the right moment.',
    veryInauspiciousDesc: 'Fortune is poor with numerous difficulties. It is advisable to retreat and protect oneself.',
    extremelyInauspiciousDesc: 'Fortune is extremely poor with crises lurking. It is advisable to observe quietly and avoid reckless actions.',

    hexagramTextAnalysisLabel: 'Hexagram Text Analysis:',
    hexagramNameLabel: 'Hexagram Name:',
    hexagramTextLabel: 'Hexagram Text:',
    keywordAnalysisLabel: 'Keyword Analysis:',
    finalScoreLabel: 'Final Score:',
    trigramRelationAnalysisLabel: 'Upper and Lower Trigram Relation Analysis:',
    upperTrigramLabel: 'Upper Trigram:',
    lowerTrigramLabel: 'Lower Trigram:',
    heavenEarthRelationLabel: 'Heaven-Earth Relation:',
    fiveElementsRelationLabel: 'Five Elements Relation:',
    yinYangHarmonyLabel: 'Yin-Yang Harmony:',
    specialCombinationLabel: 'Special Combination:',
    linesPositionAnalysisLabel: 'Lines Position Analysis:',
    changingLinesAnalysisLabel: 'Changing Lines Analysis:',
    yinYangBalanceLabel: 'Yin-Yang Balance:',
    positionStructureLabel: 'Position Structure:',
    specialCombinationsLabel: 'Special Combinations:',
    invalidHexagramStructureLabel: 'Invalid hexagram structure',
    unknownLabel: 'Unknown',
    cannotAnalyzeLabel: 'Cannot analyze',

    relationshipSummary: 'Relationship Summary:',
    eachLineAnalysis: 'Each Line Analysis:',
    properPositionCount: 'Proper position count:',
    improperPositionCount: 'Improper position count:',
    yangLinesCount: 'Yang lines count:',
    yinLinesCount: 'Yin lines count:',
    pointsText: 'points',
    upperGeneratesLower: 'Upper generates lower, auspicious',
    lowerGeneratesUpper: 'Lower generates upper, inauspicious',
    sameElement: 'Same element, neutral',
    upperRestrictsLower: 'Upper restricts lower, inauspicious',
    lowerRestrictsUpper: 'Lower restricts upper, auspicious',
    restrictedBy: 'restricted by',

    hexagram1Adjustment: '\nQian represents heaven, a purely yang hexagram, strong and righteous, an extremely auspicious sign.',
    hexagram2Adjustment: '\nKun represents earth, a purely yin hexagram, virtuous and nurturing, an auspicious and harmonious sign.',
    hexagram11Adjustment: '\nHeaven and earth interact in harmony, yin and yang balance, all matters prosper smoothly, an extremely auspicious sign.',
    hexagram12Adjustment: '\nHeaven and earth do not interact, yin and yang are blocked, all matters are unfavorable, a dangerous sign.',
    hexagram63Adjustment: '\nWater and fire are already in harmony, matters have succeeded, but guard against arrogance and extravagance, an auspicious sign with warning.',
    hexagram64Adjustment: '\nWater and fire are not yet in harmony, matters have not yet succeeded, need to strive forward, a neutral sign.',

    heavenEarthRelation: 'Heaven and earth interact in harmony, yin and yang balance',
    heavenHeavenRelation: 'Heaven on heaven, strong and righteous, guard against excessive rigidity',
    earthEarthRelation: 'Earth on earth, gentle and nurturing, guard against excessive softness',
    heavenMountainRelation: 'Heaven on mountain, lofty and far-reaching sign',
    heavenLakeRelation: 'Heaven on lake, moistening and nourishing sign',
    heavenFireRelation: 'Heaven fire fellowship, bright and illuminating sign',
    heavenWindRelation: 'Heaven wind encounter, meeting sign',
    heavenWaterRelation: 'Heaven water lawsuit, dispute sign',
    heavenThunderRelation: 'Heaven thunder without recklessness, no recklessness sign',
    earthMountainRelation: 'Earth mountain humility, modest sign',
    earthLakeRelation: 'Earth lake approach, overseeing sign',
    earthFireRelation: 'Earth fire brightness, light damaged sign',
    earthWindRelation: 'Earth wind ascension, rising sign',
    earthWaterRelation: 'Earth water army, military expedition sign',
    earthThunderRelation: 'Earth thunder return, returning sign',

    yinYangIdeal: 'Upper yang and lower yin, heaven and earth in proper position, yin and yang harmonized',
    yinYangBalanced: 'Yin and yang balanced, neutral sign',
    yinYangInverted: 'Upper yin and lower yang, heaven and earth inverted, yin and yang imbalanced',
    yinYangNoFeature: 'Yin and yang distribution has no obvious characteristics',
    fiveElementsNoFeature: 'Five elements relationship has no obvious characteristics',

    noChangingLines: 'No changing lines, situation stable',
    oneChangingLine: 'One changing line, moderate change, advisable to follow the trend',
    twoChangingLines: 'Two changing lines, many changes, need to respond cautiously',
    threeChangingLines: 'Three changing lines, drastic changes, turbulent situation',
    manyChangingLines: 'Many changing lines, extreme changes, advisable to observe quietly',
    changingLinesUnknown: 'Changing lines situation unclear',

    yinYangBalancedHarmony: 'Yin and yang balanced, harmonious sign',
    yangMoreThanYin: 'More yang than yin, yang energy vigorous',
    yinMoreThanYang: 'More yin than yang, yin energy sufficient',
    yangExtreme: 'Yang extremely vigorous, guard against excessive rigidity',
    yinExtreme: 'Yin extremely vigorous, guard against excessive softness',

    allYangHexagram: 'Pure yang hexagram, strong and righteous',
    allYinHexagram: 'Pure yin hexagram, virtuous and nurturing',
    middlePosition: 'Middle position, ruler and minister in proper position',

    lines34Harmony: 'Third and fourth lines yin and yang complement each other',
    lines34Gentle: 'Third and fourth lines yin and gentle, using stillness to control movement',
    lines16Correspondence: 'First and sixth lines correspond',
    lines25Correspondence: 'Second and fifth lines correspond, yin and yang harmonized',
    positionStructureNoFeature: 'Position structure has no obvious characteristics',

    firstLineChange: 'First line change: beginning position changes, affecting foundation (+1 point)',
    sixthLineChange: 'Sixth line change: final position changes, affecting result (+2 points)',
    secondLineChange: 'Second line change: middle position changes, affecting human affairs (+3 points)',
    fifthLineChange: 'Fifth line change: middle position changes, affecting human affairs (+4 points)',
    thirdOrFourthLineChange: 'Third or fourth line change: middle position changes, affecting human affairs (-2 points)',
    hexagramChangeNoFeature: 'Hexagram change has no special characteristics',

    generalCase: 'General case',
    staticHexagram: 'Static hexagram',
    singleLineChange: 'Single line change',
    doubleLineChange: 'Double line change',
    tripleLineChange: 'Triple line change',
    multipleLineChange: 'Multiple line change',

    oldYangDesc: 'Old yang, changing line, yang energy at its peak',
    youngYangDesc: 'Young yang, yang line, yang energy rising',
    youngYinDesc: 'Young yin, yin line, yin energy sinking',
    oldYinDesc: 'Old yin, changing line, yin energy at its peak',

    pureYangHexagram: 'Pure yang hexagram, strong and righteous',
    pureYinHexagram: 'Pure yin hexagram, virtuous and nurturing',
    taiHexagram: 'Tai hexagram, heaven and earth in harmony, yin and yang balanced',
    piHexagram: 'Pi hexagram, heaven and earth not interacting, yin and yang blocked',
    jiJiHexagram: 'Jiji hexagram, water and fire in harmony, matters have succeeded',
    weiJiHexagram: 'Weiji hexagram, water and fire not in harmony, matters have not yet succeeded',
    fengHexagram: 'Feng hexagram, thunder and fire abundance, sign of abundance',
    kunHexagram: 'Kun hexagram, water and marsh trapped, sign of being trapped',
    noSpecialCombination: 'No special combination characteristics',

    specialCombinationAdjustmentLabel: 'Special combination adjustment:',

    qianAllChange: 'Qian hexagram all six lines change: seeing dragons without a head, auspicious (+18 points)',
    kunAllChange: 'Kun hexagram all six lines change: beneficial for eternal perseverance, auspicious (+15 points)',
    middleFourChange: 'Middle four lines change: core turbulence, unstable situation (-8 points)',
    jumpingChange: 'Jumping line changes: changes are incoherent, difficult to grasp (-5 points)',
    yongJiu: 'Using nine',
    yongLiu: 'Using six',
    fourLineChange: 'Four line change',
    jumpingLineChange: 'Jumping line change',

    middlePositionDesc: 'Middle position, ruler and minister in proper position',
    allYangDesc: 'Pure yang hexagram, strong and righteous',
    allYinDesc: 'Pure yin hexagram, virtuous and nurturing',
    properPositionDesc: 'Line position proper, each performs its duty',
    improperPositionDesc: 'Line position improper, yin and yang imbalanced',

    hexagramTextGood: ' The hexagram text shows great fortune, you can proceed with confidence.',
    hexagramTextBad: ' The hexagram text shows danger, you must be cautious.',
    trigramGood: ' The upper and lower trigrams are harmonious, you have heaven-sent timing and geographical advantage.',
    trigramBad: ' The upper and lower trigrams conflict, you need to adjust your strategy.',
    linesGood: ' The line positions are proper, human affairs are harmonious.',
    linesBad: ' The line positions are improper, you need to guard against villains.',

    qianToKun: 'Qian to Kun: hard to soft, from active to passive (-10 points)',
    kunToQian: 'Kun to Qian: soft to hard, from passive to active (+10 points)',
    taiToPi: 'Tai to Pi: from smooth to blocked, fortune turns sharply downward (-15 points)',
    piToTai: 'Pi to Tai: from blocked to smooth, fortune suddenly brightens (+15 points)',
    jiJiToWeiJi: 'Jiji to Weiji: from success to failure, success at the brink of failure (-12 points)',
    weiJiToJiJi: 'Weiji to Jiji: from failure to success, late bloomer (+12 points)',
    qianKunConversion: 'Qian-Kun conversion',
    taiPiConversion: 'Tai-Pi conversion',
    jiWeiConversion: 'Ji-Wei conversion',

    // Detailed Analysis Content
    detailedStrengthsHexagram: 'Hexagram text is auspicious, with heavenly assistance',
    detailedStrengthsTrigram: 'Upper and lower trigrams harmonized, with timing and location advantages',
    detailedStrengthsLines: 'Line positions are proper, with harmonious human relations',
    detailedWeaknessesHexagram: 'Hexagram text is inauspicious, need cautious action',
    detailedWeaknessesTrigram: 'Upper and lower trigrams conflict, with unfavorable environment',
    detailedWeaknessesLines: 'Line positions are improper, with disharmonious human relations',
    detailedOpportunitiesHexagram: 'Seize the timing, actively advance',
    detailedOpportunitiesTrigram: 'Leverage environmental advantages, follow the trend',
    detailedOpportunitiesLines: 'Unite and cooperate, seek common development',
    detailedThreatsHexagram: 'Prevent trouble before it happens, avoid impulsiveness',
    detailedThreatsTrigram: 'Guard against external risks, advance steadily',
    detailedThreatsLines: 'Prevent internal conflicts, distinguish right from wrong',

    // Trigram Names
    trigramQian: 'Qian',
    trigramKun: 'Kun',
    trigramZhen: 'Zhen',
    trigramKan: 'Kan',
    trigramGen: 'Gen',
    trigramXun: 'Xun',
    trigramLi: 'Li',
    trigramDui: 'Dui',

    // Trigram Natures
    natureHeaven: 'Heaven',
    natureEarth: 'Earth',
    natureThunder: 'Thunder',
    natureWater: 'Water',
    natureMountain: 'Mountain',
    natureWind: 'Wind',
    natureFire: 'Fire',
    natureLake: 'Lake',

    // Trigram Qualities
    qualityFirm: 'Firm',
    qualityGentle: 'Gentle',
    qualityMoving: 'Moving',
    qualityDangerous: 'Dangerous',
    qualityStill: 'Still',
    qualityObedient: 'Obedient',
    qualityClinging: 'Clinging',
    qualityJoyful: 'Joyful',

    // Five Elements
    elementMetal: 'Metal',
    elementWood: 'Wood',
    elementWater: 'Water',
    elementFire: 'Fire',
    elementEarth: 'Earth',

    // Line Positions
    lineFirst: 'First Line',
    lineSecond: 'Second Line',
    lineThird: 'Third Line',
    lineFourth: 'Fourth Line',
    lineFifth: 'Fifth Line',
    lineSixth: 'Sixth Line',

    // Line Position Types
    positionLowest: 'Lowest',
    positionLowerMiddle: 'Lower Middle',
    positionLowerUpper: 'Lower Upper',
    positionUpperLower: 'Upper Lower',
    positionUpperMiddle: 'Upper Middle',
    positionHighest: 'Highest',

    // Line Natures
    natureBeginning: 'Beginning',
    natureMiddle: 'Middle',
    natureDangerous2: 'Dangerous',
    natureAuspicious: 'Auspicious',
    natureEnd: 'End',

    // Weight Calculation Text
    originalHexagramScore: 'Original hexagram score',
    changedHexagramScore: 'Changed hexagram score',
    combinedScore: 'Combined score',
    originalHexagramAnalysis: 'Original hexagram analysis',
    changedHexagramAnalysis: 'Changed hexagram analysis',
    weightPercentage: 'weight',

    // Position Analysis Text
    properPosition: 'Proper Position',
    improperPosition: 'Improper Position',
    pointsText2: 'points',

    clickToStart: 'Click the button below to start divination',
    hexagramNumberWithSuffix: 'Hexagram {0}',

    daxiangImageAlt: '{0} Daxiang Image',
    yongJiuLabel: 'Yong Jiu:',
    yongLiuLabel: 'Yong Liu:',

    logoutFallback: 'Sign Out',
    signInFallback: 'Sign in with Google',

    footer: 'Sincerity brings clarity · Follow the natural way',
    selectLanguage: 'Language',
    signIn: 'Sign in with Google',
    logout: 'Sign out',
    loginRequired: 'Sign in required',
    loginToSave: 'Sign in to save your divination history',
    history: 'History',
    noHistory: 'No history yet',
    viewHistory: 'View History',
    clearHistory: 'Clear History',
    historyRecord: 'History Record',
    deleteHistory: 'Delete',
    deleteConfirm: 'Are you sure you want to delete this history record?',
    deleteSuccess: 'History deleted successfully',
    deleteError: 'Delete failed, please try again',
    historyOriginalHexagram: 'Original Hexagram',
    historyChangedHexagram: 'Changed Hexagram',
    justNow: 'Just now',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',
    languages: {
      en: 'English',
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文',
      es: 'Español'
    }
  },

  'zh-CN': {
    title: '数字易经',
    subtitle: '以心问卦，以卦明心',
    iChing: '易经',
    questionLabel: '心诚则灵，请输入你的问题：',
    questionPlaceholder: '例如：我应该接受这份工作吗？这次合作能否成功？...',
    castButton: '起卦',
    resetButton: '重新起卦',
    coinDivination: '钱卜',
    back: '返回',
    reset: '重置',
    viewResult: '查看结果',
    yourQuestion: '你所问',
    casting: '起卦中...',
    castingDescription: '正在感应天地之气，投掷铜钱...',
    originalHexagram: '本卦',
    changedHexagram: '变卦',
    changingLines: '变爻',
    changingLinesCount: '个变爻',
    hexagramNumber: '第{0}卦',
    keyInterpretationNote: '重点解读',
    interpretationRules: '0变爻:看本卦卦辞 | 1变爻:看该爻爻辞 | 2变爻:看两爻，以上爻为主 | 3变爻:看本卦+变卦卦辞 | 4变爻:看变卦下爻 | 5变爻:看变卦不变爻 | 6变爻:乾坤看用九/用六，其余看变卦卦辞',
    interpretation0Lines: '六爻皆为静爻，没有变爻。直接解读本卦的卦辞即可，代表事情的整体趋势。',
    interpretation1Line: '只有一个爻变动。直接看这个动爻的爻辞，这是最核心的指引。',
    interpretation2Lines: '两个爻变动时，以位置靠上的那个爻为主（如九二和九四同时变动，以九四为主），下方的爻作为辅助参考。',
    interpretation3Lines: '三个爻变动时，动爻本身的含义减弱，转而看本卦的整体卦辞和变卦的整体卦辞，两者结合解读。',
    interpretation4Lines: '四个爻变动，只剩下两个爻没变。此时解读重点在变卦中位置靠下的那个不变爻的爻辞。',
    interpretation5Lines: '五个爻变动，只剩下一个爻没变。此时解读重点就是变卦中唯一没变的那爻的爻辞。',
    interpretation6LinesQian: '六爻全变：① 如果本卦是乾卦，看"用九"爻辞；② 如果本卦是坤卦，看"用六"爻辞；③ 如果是其余62卦，直接看变卦的卦辞。',
    interpretation6LinesKun: '六爻全变：① 如果本卦是乾卦，看"用九"爻辞；② 如果本卦是坤卦，看"用六"爻辞；③ 如果是其余62卦，直接看变卦的卦辞。',
    interpretation6LinesOthers: '六爻全变：① 如果本卦是乾卦，看"用九"爻辞；② 如果本卦是坤卦，看"用六"爻辞；③ 如果是其余62卦，直接看变卦的卦辞。',
    manualInputTitle: '手动摇卦输入',
    manualInputDescription: '请按照从下到上的顺序，为每一爻选择铜钱投掷结果',
    coinExplanation: '3反(9)=老阳 ○, 2正1反(7)=少阳 |||, 2反1正(8)=少阴 ||, 3正(6)=老阴 ×',
    explanation: '说明：',
    divineButton: '解卦',
    oldYang: '老阳',
    youngYang: '少阳',
    youngYin: '少阴',
    oldYin: '老阴',
    lineNames: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'],
    changeSymbol: '变',
    guaText: '卦辞',
    tuan: '彖曰',
    daXiang: '大象',
    lineInterpretation: '动爻解读',
    yaoText: '爻辞',
    xiang: '象曰',
    interpretation: '通俗解读',
    plainTranslation: '白话翻译',
    lifeInspiration: '人生启示',
    decisionAdvice: '决策建议',
    keyInterpretation: '重点解读',

    // Line Relations Interpretation
    lineRelationsInterpretation: '爻位关系解读',
    changingLine: '变爻',
    dangWei: '当位',
    notDangWei: '不当位',
    dangWeiAnalysis: '当位分析',
    yingRelation: '相应关系',
    chengChengRelation: '承乘关系',
    modernInterpretation: '现代解读',
    lineCharacter: '爻',
    inContextOf: '在',

    // Fortune Assessment
    fortuneAssessment: '吉凶判断',
    confidence: '置信度',
    benGuaWeight: '本卦权重',
    bianGuaWeight: '变卦权重',
    overallScore: '综合评分',
    dimensionAnalysis: '维度分析',
    hexagramTextScore: '卦辞断语',
    trigramRelationScore: '上下卦关系',
    linesPositionScore: '爻位综合',
    changingLinesAdjustment: '变爻调整',
    situationAnalysis: '态势分析',
    strengths: '优势',
    weaknesses: '劣势',
    opportunities: '机遇',
    threats: '威胁',
    detailedAnalysis: '详细分析',
    hexagramTextAnalysis: '卦辞断语分析',
    trigramRelationAnalysis: '上下卦关系分析',
    linesPositionAnalysis: '爻位综合分析',
    changingLinesAnalysis: '变爻规则分析',
    none: '无',

    // Fortune Levels
    extremelyAuspicious: '大吉',
    veryAuspicious: '吉',
    auspicious: '小吉',
    neutral: '中平',
    inauspicious: '小凶',
    veryInauspicious: '凶',
    extremelyInauspicious: '大凶',

    extremelyAuspiciousDesc: '天时地利人和，万事亨通，千载难逢之良机',
    veryAuspiciousDesc: '运势良好，机遇颇多，宜积极进取',
    auspiciousDesc: '运势平稳向好，小有成就，宜稳中求进',
    neutralDesc: '运势平平，吉凶参半，宜谨慎行事',
    inauspiciousDesc: '运势略有阻滞，宜守不宜攻，待时而动',
    veryInauspiciousDesc: '运势不佳，困难重重，宜退守保身',
    extremelyInauspiciousDesc: '运势极差，危机四伏，宜静观其变，切勿轻举妄动',

    hexagramTextAnalysisLabel: '卦辞断语分析：',
    hexagramNameLabel: '卦名：',
    hexagramTextLabel: '卦辞：',
    keywordAnalysisLabel: '关键词分析：',
    finalScoreLabel: '最终评分：',
    trigramRelationAnalysisLabel: '上下卦关系分析：',
    upperTrigramLabel: '上卦：',
    lowerTrigramLabel: '下卦：',
    heavenEarthRelationLabel: '天地关系：',
    fiveElementsRelationLabel: '五行关系：',
    yinYangHarmonyLabel: '阴阳调和：',
    specialCombinationLabel: '特殊组合：',
    linesPositionAnalysisLabel: '爻位综合分析：',
    changingLinesAnalysisLabel: '变爻分析：',
    yinYangBalanceLabel: '阴阳平衡：',
    positionStructureLabel: '爻位结构：',
    specialCombinationsLabel: '特殊组合：',
    invalidHexagramStructureLabel: '无效的卦象结构',
    unknownLabel: '未知',
    cannotAnalyzeLabel: '无法分析',

    relationshipSummary: '关系总结：',
    eachLineAnalysis: '各爻分析：',
    properPositionCount: '当位爻数：',
    improperPositionCount: '失位爻数：',
    yangLinesCount: '阳爻数量：',
    yinLinesCount: '阴爻数量：',
    pointsText: '分',
    upperGeneratesLower: '上生下，相生之象，吉',
    lowerGeneratesUpper: '下生上，相生之象，吉',
    sameElement: '同五行，中平',
    upperRestrictsLower: '上克下，相克之象，凶',
    lowerRestrictsUpper: '下克上，相克之象，凶',
    restrictedBy: '受克于',

    hexagram1Adjustment: '\n乾为天，纯阳之卦，刚健中正，为大吉之象。',
    hexagram2Adjustment: '\n坤为地，纯阴之卦，厚德载物，为吉顺之象。',
    hexagram11Adjustment: '\n天地交泰，阴阳调和，诸事亨通，为大吉之象。',
    hexagram12Adjustment: '\n天地不交，阴阳闭塞，诸事不宜，为凶险之象。',
    hexagram63Adjustment: '\n水火既济，事已成功，但需防骄奢，为吉中有警之象。',
    hexagram64Adjustment: '\n水火未济，事尚未成，需努力进取，为中平之象。',

    heavenEarthRelation: '天地交泰，阴阳调和',
    heavenHeavenRelation: '刚健有余，需防过刚',
    earthEarthRelation: '柔顺有余，需防过柔',
    heavenMountainRelation: '天在山上，高远之象',
    heavenLakeRelation: '天在泽上，润泽之象',
    heavenFireRelation: '天火同人，光明之象',
    heavenWindRelation: '天风姤，相遇之象',
    heavenWaterRelation: '天水讼，争讼之象',
    heavenThunderRelation: '天雷无妄，无妄之象',
    earthMountainRelation: '地山谦，谦逊之象',
    earthLakeRelation: '地泽临，临莅之象',
    earthFireRelation: '地火明夷，光明受损',
    earthWindRelation: '地风升，上升之象',
    earthWaterRelation: '地水师，师旅之象',
    earthThunderRelation: '地雷复，复归之象',

    yinYangIdeal: '上阳下阴，天地正位，阴阳调和',
    yinYangBalanced: '阴阳平衡，中和之象',
    yinYangInverted: '上阴下阳，天地倒置，阴阳失调',
    yinYangNoFeature: '阴阳分布无明显特征',
    fiveElementsNoFeature: '五行关系无明显特征',

    noChangingLines: '无变爻，局势稳定',
    oneChangingLine: '一爻变，变化适中，宜顺势而为',
    twoChangingLines: '二爻变，变化较多，需谨慎应对',
    threeChangingLines: '三爻变，变化剧烈，局势动荡',
    manyChangingLines: '多爻变，变化极大，宜静观其变',
    changingLinesUnknown: '变爻情况不明',

    yinYangBalancedHarmony: '阴阳平衡，和谐之象',
    yangMoreThanYin: '阳多阴少，阳气旺盛',
    yinMoreThanYang: '阴多阳少，阴气充足',
    yangExtreme: '阳极盛，防过刚',
    yinExtreme: '阴极盛，防过柔',

    allYangHexagram: '纯阳之卦，刚健中正',
    allYinHexagram: '纯阴之卦，厚德载物',
    middlePosition: '二五中正，君臣得位',

    lines34Harmony: '三四爻阴阳相济',
    lines34Gentle: '三四爻阴柔，以静制动',
    lines16Correspondence: '初上爻相应',
    lines25Correspondence: '二五爻相应，阴阳调和',
    positionStructureNoFeature: '爻位结构无明显特征',

    firstLineChange: '初爻变：始位变化，影响基础 (+1分)',
    sixthLineChange: '上爻变：终位变化，影响结果 (+2分)',
    secondLineChange: '二爻变：中位变化，影响人事 (+3分)',
    fifthLineChange: '五爻变：中位变化，影响人事 (+4分)',
    thirdOrFourthLineChange: '三爻变或四爻变：中位变化，影响人事 (-2分)',
    hexagramChangeNoFeature: '卦象变化无特殊特征',

    generalCase: '一般情况',
    staticHexagram: '静卦',
    singleLineChange: '单爻变',
    doubleLineChange: '双爻变',
    tripleLineChange: '三爻变',
    multipleLineChange: '多爻变',

    oldYangDesc: '老阳，变爻，阳气极盛',
    youngYangDesc: '少阳，阳爻，阳气上升',
    youngYinDesc: '少阴，阴爻，阴气下沉',
    oldYinDesc: '老阴，变爻，阴气极盛',

    pureYangHexagram: '纯阳之卦，刚健中正',
    pureYinHexagram: '纯阴之卦，厚德载物',
    taiHexagram: '泰卦，天地交泰，阴阳调和',
    piHexagram: '否卦，天地不交，阴阳闭塞',
    jiJiHexagram: '既济卦，水火既济，事已成功',
    weiJiHexagram: '未济卦，水火未济，事尚未成',
    fengHexagram: '丰卦，雷火丰，丰盛之象',
    kunHexagram: '困卦，泽水困，困顿之象',
    noSpecialCombination: '无特殊组合特征',

    specialCombinationAdjustmentLabel: '特殊组合调整：',

    qianAllChange: '乾卦六爻全变：见群龙无首，吉 (+18分)',
    kunAllChange: '坤卦六爻全变：利永贞，吉 (+15分)',
    middleFourChange: '中间四爻变：核心动荡，局势不稳 (-8分)',
    jumpingChange: '隔爻变化：变化不连贯，难以把握 (-5分)',
    yongJiu: '用九',
    yongLiu: '用六',
    fourLineChange: '四爻变',
    jumpingLineChange: '隔爻变',

    middlePositionDesc: '二五中正，君臣得位',
    allYangDesc: '纯阳之卦，刚健中正',
    allYinDesc: '纯阴之卦，厚德载物',
    properPositionDesc: '爻位得当，各司其职',
    improperPositionDesc: '爻位失当，阴阳失调',

    hexagramTextGood: ' 卦辞显示大吉，可放心前行。',
    hexagramTextBad: ' 卦辞显示凶险，务必谨慎。',
    trigramGood: ' 上下卦调和，得天时地利。',
    trigramBad: ' 上下卦冲突，需调整策略。',
    linesGood: ' 爻位得当，人事和谐。',
    linesBad: ' 爻位失当，需防小人。',

    qianToKun: '乾变坤：刚变柔，由主动转被动 (-10分)',
    kunToQian: '坤变乾：柔变刚，由被动转主动 (+10分)',
    taiToPi: '泰变否：由通转塞，运势急转直下 (-15分)',
    piToTai: '否变泰：由塞转通，运势豁然开朗 (+15分)',
    jiJiToWeiJi: '既济变未济：由成转败，成功在即 (-12分)',
    weiJiToJiJi: '未济变既济：由败转成，大器晚成 (+12分)',
    qianKunConversion: '乾坤转化',
    taiPiConversion: '泰否转化',
    jiWeiConversion: '既未转化',

    detailedStrengthsHexagram: '卦辞吉祥，有天道相助',
    detailedStrengthsTrigram: '上下卦调和，得天时地利',
    detailedStrengthsLines: '爻位得当，人事和谐',
    detailedWeaknessesHexagram: '卦辞不吉，需谨慎行事',
    detailedWeaknessesTrigram: '上下卦冲突，环境不利',
    detailedWeaknessesLines: '爻位失当，人事不和',
    detailedOpportunitiesHexagram: '把握时机，积极进取',
    detailedOpportunitiesTrigram: '借助环境优势，顺势而为',
    detailedOpportunitiesLines: '团结协作，共谋发展',
    detailedThreatsHexagram: '防患于未然，避免冲动',
    detailedThreatsTrigram: '防范外部风险，稳扎稳打',
    detailedThreatsLines: '防范内部矛盾，明辨是非',

    // Trigram Names
    trigramQian: '乾',
    trigramKun: '坤',
    trigramZhen: '震',
    trigramKan: '坎',
    trigramGen: '艮',
    trigramXun: '巽',
    trigramLi: '离',
    trigramDui: '兑',

    // Trigram Natures
    natureHeaven: '天',
    natureEarth: '地',
    natureThunder: '雷',
    natureWater: '水',
    natureMountain: '山',
    natureWind: '风',
    natureFire: '火',
    natureLake: '泽',

    // Trigram Qualities
    qualityFirm: '刚健',
    qualityGentle: '柔顺',
    qualityMoving: '震动',
    qualityDangerous: '险陷',
    qualityStill: '静止',
    qualityObedient: '顺从',
    qualityClinging: '附着',
    qualityJoyful: '喜悦',

    // Five Elements
    elementMetal: '金',
    elementWood: '木',
    elementWater: '水',
    elementFire: '火',
    elementEarth: '土',

    // Line Positions
    lineFirst: '初爻',
    lineSecond: '二爻',
    lineThird: '三爻',
    lineFourth: '四爻',
    lineFifth: '五爻',
    lineSixth: '上爻',

    // Line Position Types
    positionLowest: '最下',
    positionLowerMiddle: '下中',
    positionLowerUpper: '下上',
    positionUpperLower: '上下',
    positionUpperMiddle: '上中',
    positionHighest: '最上',

    // Line Natures
    natureBeginning: '始',
    natureMiddle: '中',
    natureDangerous2: '凶',
    natureAuspicious: '吉',
    natureEnd: '终',

    // Weight Calculation Text
    originalHexagramScore: '本卦评分',
    changedHexagramScore: '变卦评分',
    combinedScore: '综合评分',
    originalHexagramAnalysis: '本卦分析',
    changedHexagramAnalysis: '变卦分析',
    weightPercentage: '权重',

    // Position Analysis Text
    properPosition: '当位',
    improperPosition: '失位',
    pointsText2: '分',

    clickToStart: '点击下方按钮，开始起卦',
    hexagramNumberWithSuffix: '第{0}卦',

    daxiangImageAlt: '{0}大象图',
    yongJiuLabel: '用九：',
    yongLiuLabel: '用六：',

    logoutFallback: '退出登录',
    signInFallback: '使用 Google 登录',

    footer: '心诚则灵 · 顺其自然',
    selectLanguage: '语言',
    signIn: '使用 Google 登录',
    logout: '退出登录',
    loginRequired: '需要登录',
    loginToSave: '登录以保存您的算卦历史',
    history: '历史记录',
    noHistory: '暂无历史记录',
    viewHistory: '查看历史',
    clearHistory: '清除历史',
    historyRecord: '历史记录',
    deleteHistory: '删除',
    deleteConfirm: '确定要删除这条历史记录吗？',
    deleteSuccess: '历史记录删除成功',
    deleteError: '删除失败，请重试',
    historyOriginalHexagram: '本卦',
    historyChangedHexagram: '变卦',
    justNow: '刚刚',
    minutesAgo: '分钟前',
    hoursAgo: '小时前',
    yesterday: '昨天',
    daysAgo: '天前',
    languages: {
      en: 'English',
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文',
      es: 'Español'
    }
  },

  'zh-TW': {
    title: '數字易經',
    subtitle: '以心問卦，以卦明心',
    iChing: '易經',
    questionLabel: '心誠則靈，請輸入你的問題：',
    questionPlaceholder: '例如：我應該接受這份工作嗎？這次合作能否成功？...',
    castButton: '起卦',
    resetButton: '重新起卦',
    coinDivination: '錢卜',
    back: '返回',
    reset: '重置',
    viewResult: '查看結果',
    yourQuestion: '你所問',
    casting: '起卦中...',
    castingDescription: '正在感應天地之氣，投擲銅錢...',
    originalHexagram: '本卦',
    changedHexagram: '變卦',
    changingLines: '變爻',
    changingLinesCount: '個變爻',
    hexagramNumber: '第{0}卦',
    keyInterpretationNote: '重點解讀',
    interpretationRules: '0變爻:看本卦卦辭 | 1變爻:看該爻爻辭 | 2變爻:看兩爻，以上爻為主 | 3變爻:看本卦+變卦卦辭 | 4變爻:看變卦下爻 | 5變爻:看變卦不變爻 | 6變爻:乾坤看用九/用六，其餘看變卦卦辭',
    interpretation0Lines: '六爻皆為靜爻，沒有變爻。直接解讀本卦的卦辭即可，代表事情的整体趨勢。',
    interpretation1Line: '只有一個爻變動。直接看這個動爻的爻辭，這是最核心的指引。',
    interpretation2Lines: '兩個爻變動時，以位置靠上的那個爻為主（如九二和九四同時變動，以九四為主），下方的爻作為輔助參考。',
    interpretation3Lines: '三個爻變動時，動爻本身的含義減弱，轉而看本卦的整體卦辭和變卦的整體卦辭，兩者結合解讀。',
    interpretation4Lines: '四個爻變動，只剩下兩個爻沒變。此時解讀重點在變卦中位置靠下的那個不變爻的爻辭。',
    interpretation5Lines: '五個爻變動，只剩下一個爻沒變。此時解讀重點就是變卦中唯一沒變的那個爻的爻辭。',
    interpretation6LinesQian: '六爻全變：① 如果本卦是乾卦，看"用九"爻辭；② 如果本卦是坤卦，看"用六"爻辭；③ 如果是其餘62卦，直接看變卦的卦辭。',
    interpretation6LinesKun: '六爻全變：① 如果本卦是乾卦，看"用九"爻辭；② 如果本卦是坤卦，看"用六"爻辭；③ 如果是其餘62卦，直接看變卦的卦辭。',
    interpretation6LinesOthers: '六爻全變：① 如果本卦是乾卦，看"用九"爻辭；② 如果本卦是坤卦，看"用六"爻辭；③ 如果是其餘62卦，直接看變卦的卦辭。',
    manualInputTitle: '手動搖卦輸入',
    manualInputDescription: '請按照從下到上的順序，為每一爻選擇銅錢投擲結果',
    coinExplanation: '3反(9)=老陽 ○, 2正1反(7)=少陽 |||, 2反1正(8)=少陰 ||, 3正(6)=老陰 ×',
    explanation: '說明：',
    divineButton: '解卦',
    oldYang: '老陽',
    youngYang: '少陽',
    youngYin: '少陰',
    oldYin: '老陰',
    lineNames: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'],
    changeSymbol: '變',
    guaText: '卦辭',
    tuan: '彖曰',
    daXiang: '大象',
    lineInterpretation: '動爻解讀',
    yaoText: '爻辭',
    xiang: '象曰',
    interpretation: '通俗解讀',
    plainTranslation: '白話翻譯',
    lifeInspiration: '人生啟示',
    decisionAdvice: '決策建議',
    keyInterpretation: '重點解讀',

    // Line Relations Interpretation
    lineRelationsInterpretation: '爻位關係解讀',
    changingLine: '變爻',
    dangWei: '當位',
    notDangWei: '不當位',
    dangWeiAnalysis: '當位分析',
    yingRelation: '相應關係',
    chengChengRelation: '承乘關係',
    modernInterpretation: '現代解讀',
    lineCharacter: '爻',
    inContextOf: '在',

    // Fortune Assessment
    fortuneAssessment: '吉凶判斷',
    confidence: '置信度',
    benGuaWeight: '本卦權重',
    bianGuaWeight: '變卦權重',
    overallScore: '綜合評分',
    dimensionAnalysis: '維度分析',
    hexagramTextScore: '卦辭斷語',
    trigramRelationScore: '上下卦關係',
    linesPositionScore: '爻位綜合',
    changingLinesAdjustment: '變爻調整',
    situationAnalysis: '態勢分析',
    strengths: '優勢',
    weaknesses: '劣勢',
    opportunities: '機遇',
    threats: '威脅',
    detailedAnalysis: '詳細分析',
    hexagramTextAnalysis: '卦辭斷語分析',
    trigramRelationAnalysis: '上下卦關係分析',
    linesPositionAnalysis: '爻位綜合分析',
    changingLinesAnalysis: '變爻規則分析',
    none: '無',

    // Fortune Levels
    extremelyAuspicious: '大吉',
    veryAuspicious: '吉',
    auspicious: '小吉',
    neutral: '中平',
    inauspicious: '小凶',
    veryInauspicious: '凶',
    extremelyInauspicious: '大凶',

    extremelyAuspiciousDesc: '天時地利人和，萬事亨通，千載難逢之良機',
    veryAuspiciousDesc: '運勢良好，機遇頗多，宜積極進取',
    auspiciousDesc: '運勢平穩向好，小有成就，宜穩中求進',
    neutralDesc: '運勢平平，吉凶參半，宜謹慎行事',
    inauspiciousDesc: '運勢略有阻滞，宜守不宜攻，待時而動',
    veryInauspiciousDesc: '運勢不佳，困難重重，宜退守保身',
    extremelyInauspiciousDesc: '運勢極差，危機四伏，宜靜觀其變，切勿輕舉妄動',

    hexagramTextAnalysisLabel: '卦辭斷語分析：',
    hexagramNameLabel: '卦名：',
    hexagramTextLabel: '卦辭：',
    keywordAnalysisLabel: '關鍵詞分析：',
    finalScoreLabel: '最終評分：',
    trigramRelationAnalysisLabel: '上下卦關係分析：',
    upperTrigramLabel: '上卦：',
    lowerTrigramLabel: '下卦：',
    heavenEarthRelationLabel: '天地關係：',
    fiveElementsRelationLabel: '五行關係：',
    yinYangHarmonyLabel: '陰陽調和：',
    specialCombinationLabel: '特殊組合：',
    linesPositionAnalysisLabel: '爻位綜合分析：',
    changingLinesAnalysisLabel: '變爻分析：',
    yinYangBalanceLabel: '陰陽平衡：',
    positionStructureLabel: '爻位結構：',
    specialCombinationsLabel: '特殊組合：',
    invalidHexagramStructureLabel: '無效的卦象結構',
    unknownLabel: '未知',
    cannotAnalyzeLabel: '無法分析',

    relationshipSummary: '關係總結：',
    eachLineAnalysis: '各爻分析：',
    properPositionCount: '當位爻數：',
    improperPositionCount: '失位爻數：',
    yangLinesCount: '陽爻數量：',
    yinLinesCount: '陰爻數量：',
    pointsText: '分',
    upperGeneratesLower: '上生下，相生之象，吉',
    lowerGeneratesUpper: '下生上，相生之象，吉',
    sameElement: '同五行，中平',
    upperRestrictsLower: '上克下，相克之象，凶',
    lowerRestrictsUpper: '下克上，相克之象，凶',
    restrictedBy: '受克於',

    hexagram1Adjustment: '\n乾為天，純陽之卦，剛健中正，為大吉之象。',
    hexagram2Adjustment: '\n坤為地，純陰之卦，厚德載物，為吉順之象。',
    hexagram11Adjustment: '\n天地交泰，陰陽調和，諸事亨通，為大吉之象。',
    hexagram12Adjustment: '\n天地不交，陰陽閉塞，諸事不宜，為凶險之象。',
    hexagram63Adjustment: '\n水火既濟，事已成功，但需防驕奢，為吉中有警之象。',
    hexagram64Adjustment: '\n水火未濟，事尚未成，需努力進取，為中平之象。',

    heavenEarthRelation: '天地交泰，陰陽調和',
    heavenHeavenRelation: '剛健有餘，需防過剛',
    earthEarthRelation: '柔順有餘，需防過柔',
    heavenMountainRelation: '天在山上，高遠之象',
    heavenLakeRelation: '天在澤上，潤澤之象',
    heavenFireRelation: '天火同人，光明之象',
    heavenWindRelation: '天風姤，相遇之象',
    heavenWaterRelation: '天水訟，爭訟之象',
    heavenThunderRelation: '天雷無妄，無妄之象',
    earthMountainRelation: '地山謙，謙遜之象',
    earthLakeRelation: '地澤臨，臨莅之象',
    earthFireRelation: '地火明夷，光明受損',
    earthWindRelation: '地風升，上升之象',
    earthWaterRelation: '地水師，師旅之象',
    earthThunderRelation: '地雷復，復歸之象',

    yinYangIdeal: '上陽下陰，天地正位，陰陽調和',
    yinYangBalanced: '陰陽平衡，中和之象',
    yinYangInverted: '上陰下陽，天地倒置，陰陽失調',
    yinYangNoFeature: '陰陽分布無明顯特徵',
    fiveElementsNoFeature: '五行關係無明顯特徵',

    noChangingLines: '無變爻，局勢穩定',
    oneChangingLine: '一爻變，變化適中，宜順勢而為',
    twoChangingLines: '二爻變，變化較多，需謹慎應對',
    threeChangingLines: '三爻變，變化劇烈，局勢動盪',
    manyChangingLines: '多爻變，變化極大，宜靜觀其變',
    changingLinesUnknown: '變爻情況不明',

    yinYangBalancedHarmony: '陰陽平衡，和諧之象',
    yangMoreThanYin: '陽多陰少，陽氣旺盛',
    yinMoreThanYang: '陰多陽少，陰氣充足',
    yangExtreme: '陽極盛，防過剛',
    yinExtreme: '陰極盛，防過柔',

    allYangHexagram: '純陽之卦，剛健中正',
    allYinHexagram: '純陰之卦，厚德載物',
    middlePosition: '二五中正，君臣得位',

    lines34Harmony: '三四爻陰陽相濟',
    lines34Gentle: '三四爻陰柔，以靜制動',
    lines16Correspondence: '初上爻相應',
    lines25Correspondence: '二五爻相應，陰陽調和',
    positionStructureNoFeature: '爻位結構無明顯特徵',

    firstLineChange: '初爻變：始位變化，影響基礎 (+1分)',
    sixthLineChange: '上爻變：終位變化，影響結果 (+2分)',
    secondLineChange: '二爻變：中位變化，影響人事 (+3分)',
    fifthLineChange: '五爻變：中位變化，影響人事 (+4分)',
    thirdOrFourthLineChange: '三爻變或四爻變：中位變化，影響人事 (-2分)',
    hexagramChangeNoFeature: '卦象變化無特殊特徵',

    generalCase: '一般情況',
    staticHexagram: '靜卦',
    singleLineChange: '單爻變',
    doubleLineChange: '雙爻變',
    tripleLineChange: '三爻變',
    multipleLineChange: '多爻變',

    oldYangDesc: '老陽，變爻，陽氣極盛',
    youngYangDesc: '少陽，陽爻，陽氣上升',
    youngYinDesc: '少陰，陰爻，陰氣下沉',
    oldYinDesc: '老陰，變爻，陰氣極盛',

    pureYangHexagram: '純陽之卦，剛健中正',
    pureYinHexagram: '純陰之卦，厚德載物',
    taiHexagram: '泰卦，天地交泰，陰陽調和',
    piHexagram: '否卦，天地不交，陰陽閉塞',
    jiJiHexagram: '既濟卦，水火既濟，事已成功',
    weiJiHexagram: '未濟卦，水火未濟，事尚未成',
    fengHexagram: '豐卦，雷火豐，豐盛之象',
    kunHexagram: '困卦，澤水困，困頓之象',
    noSpecialCombination: '無特殊組合特徵',

    specialCombinationAdjustmentLabel: '特殊組合調整：',

    qianAllChange: '乾卦六爻全變：見群龍無首，吉 (+18分)',
    kunAllChange: '坤卦六爻全變：利永貞，吉 (+15分)',
    middleFourChange: '中間四爻變：核心動盪，局勢不穩 (-8分)',
    jumpingChange: '隔爻變化：變化不連貫，難以把握 (-5分)',
    yongJiu: '用九',
    yongLiu: '用六',
    fourLineChange: '四爻變',
    jumpingLineChange: '隔爻變',

    middlePositionDesc: '二五中正，君臣得位',
    allYangDesc: '純陽之卦，剛健中正',
    allYinDesc: '純陰之卦，厚德載物',
    properPositionDesc: '爻位得當，各司其職',
    improperPositionDesc: '爻位失當，陰陽失調',

    hexagramTextGood: ' 卦辭顯示大吉，可放心前行。',
    hexagramTextBad: ' 卦辭顯示凶險，務必謹慎。',
    trigramGood: ' 上下卦調和，得天時地利。',
    trigramBad: ' 上下卦衝突，需調整策略。',
    linesGood: ' 爻位得當，人事和諧。',
    linesBad: ' 爻位失當，需防小人。',

    qianToKun: '乾變坤：剛變柔，由主動轉被動 (-10分)',
    kunToQian: '坤變乾：柔變剛，由被動轉主動 (+10分)',
    taiToPi: '泰變否：由通轉塞，運勢急轉直下 (-15分)',
    piToTai: '否變泰：由塞轉通，運勢豁然開朗 (+15分)',
    jiJiToWeiJi: '既濟變未濟：由成轉敗，功敗垂成 (-12分)',
    weiJiToJiJi: '未濟變既濟：由敗轉成，大器晚成 (+12分)',
    qianKunConversion: '乾坤轉換',
    taiPiConversion: '泰否轉換',
    jiWeiConversion: '既未轉換',

    // Detailed Analysis Content
    detailedStrengthsHexagram: '卦辭吉祥，有天道相助',
    detailedStrengthsTrigram: '上下卦調和，得天時地利',
    detailedStrengthsLines: '爻位得當，人事和諧',
    detailedWeaknessesHexagram: '卦辭不吉，需謹慎行事',
    detailedWeaknessesTrigram: '上下卦衝突，環境不利',
    detailedWeaknessesLines: '爻位失當，人事不和',
    detailedOpportunitiesHexagram: '把握時機，積極進取',
    detailedOpportunitiesTrigram: '借助環境優勢，順勢而為',
    detailedOpportunitiesLines: '團結協作，共謀發展',
    detailedThreatsHexagram: '防患於未然，避免衝動',
    detailedThreatsTrigram: '防範外部風險，穩紮穩打',
    detailedThreatsLines: '防範內部矛盾，明辨是非',

    // Trigram Names
    trigramQian: '乾',
    trigramKun: '坤',
    trigramZhen: '震',
    trigramKan: '坎',
    trigramGen: '艮',
    trigramXun: '巽',
    trigramLi: '離',
    trigramDui: '兌',

    // Trigram Natures
    natureHeaven: '天',
    natureEarth: '地',
    natureThunder: '雷',
    natureWater: '水',
    natureMountain: '山',
    natureWind: '風',
    natureFire: '火',
    natureLake: '澤',

    // Trigram Qualities
    qualityFirm: '剛健',
    qualityGentle: '柔順',
    qualityMoving: '震動',
    qualityDangerous: '險陷',
    qualityStill: '靜止',
    qualityObedient: '順從',
    qualityClinging: '附著',
    qualityJoyful: '喜悅',

    // Five Elements
    elementMetal: '金',
    elementWood: '木',
    elementWater: '水',
    elementFire: '火',
    elementEarth: '土',

    // Line Positions
    lineFirst: '初爻',
    lineSecond: '二爻',
    lineThird: '三爻',
    lineFourth: '四爻',
    lineFifth: '五爻',
    lineSixth: '上爻',

    // Line Position Types
    positionLowest: '最下',
    positionLowerMiddle: '下中',
    positionLowerUpper: '下上',
    positionUpperLower: '上下',
    positionUpperMiddle: '上中',
    positionHighest: '最上',

    // Line Natures
    natureBeginning: '始',
    natureMiddle: '中',
    natureDangerous2: '凶',
    natureAuspicious: '吉',
    natureEnd: '終',

    // Weight Calculation Text
    originalHexagramScore: '本卦評分',
    changedHexagramScore: '變卦評分',
    combinedScore: '綜合評分',
    originalHexagramAnalysis: '本卦分析',
    changedHexagramAnalysis: '變卦分析',
    weightPercentage: '權重',

    // Position Analysis Text
    properPosition: '當位',
    improperPosition: '失位',
    pointsText2: '分',

    clickToStart: '點擊下方按鈕，開始起卦',
    hexagramNumberWithSuffix: '第{0}卦',

    daxiangImageAlt: '{0}大象圖',
    yongJiuLabel: '用九：',
    yongLiuLabel: '用六：',

    logoutFallback: '登出',
    signInFallback: '使用 Google 登入',

    footer: '心誠則靈 · 道法自然',
    selectLanguage: '語言',
    signIn: '使用 Google 登入',
    logout: '登出',
    loginRequired: '需要登入',
    loginToSave: '登入以保存您的算卦歷史',
    history: '歷史記錄',
    noHistory: '暫無歷史記錄',
    viewHistory: '查看歷史',
    clearHistory: '清空歷史',
    historyRecord: '歷史記錄',
    deleteHistory: '刪除',
    deleteConfirm: '確定要刪除這條歷史記錄嗎？',
    deleteSuccess: '歷史記錄刪除成功',
    deleteError: '刪除失敗，請重試',
    historyOriginalHexagram: '本卦',
    historyChangedHexagram: '變卦',
    justNow: '剛剛',
    minutesAgo: '分鐘前',
    hoursAgo: '小時前',
    yesterday: '昨天',
    daysAgo: '天前',
    languages: {
      en: 'English',
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文',
      es: 'Español'
    }
  },
  'es': {
    title: 'I Ching Digital',
    subtitle: 'Pregunta con sinceridad, comprende mediante la adivinación',
    iChing: 'I Ching',
    questionLabel: 'Con corazón sincero, por favor ingresa tu pregunta:',
    questionPlaceholder: 'ej., ¿Debería aceptar esta oferta de trabajo? ¿Tendrá éxito esta colaboración?...',
    castButton: 'DIVINAR',
    resetButton: 'Volver a Divinar',
    coinDivination: 'ADIVINACIÓN CON MONEDAS',
    back: 'Volver',
    reset: 'Reiniciar',
    viewResult: 'Ver Resultado',
    yourQuestion: 'Tu Pregunta',
    casting: 'Divinando...',
    castingDescription: 'Conectando con la energía del cielo y la tierra, lanzando las monedas...',
    originalHexagram: 'Hexagrama Original',
    changedHexagram: 'Hexagrama Cambiado',
    changingLines: 'Líneas Cambiantes',
    changingLinesCount: 'líneas cambiantes',
    hexagramNumber: 'Hexagrama {0}',
    keyInterpretationNote: 'Interpretación clave',
    interpretationRules: '0 líneas cambiantes: Leer texto del hexagrama original | 1 línea cambiantes: Leer texto de esa línea específica | 2 líneas cambiantes: Leer ambas líneas, priorizar la superior | 3 líneas cambiantes: Leer textos de hexagramas original y cambiado | 4 líneas cambiantes: Leer línea inferior no cambiada del hexagrama cambiado | 5 líneas cambiantes: Leer única línea no cambiada del hexagrama cambiado | 6 líneas cambiantes: Para Qian usar "Yong Jiu", para Kun usar "Yong Liu", para otros leer texto del hexagrama cambiado',
    interpretation0Lines: 'Todas las seis líneas son estáticas sin cambios. Leer el texto del hexagrama original directamente, representando la tendencia general del asunto.',
    interpretation1Line: 'Solo una línea está cambiando. Leer el texto de esta línea cambiante directamente, ya que proporciona la guía más fundamental.',
    interpretation2Lines: 'Dos líneas están cambiando. Priorizar la línea superior (ej., si las líneas 2 y 4 cambian simultáneamente, priorizar la línea 4), con la línea inferior como referencia auxiliar.',
    interpretation3Lines: 'Tres líneas están cambiando. El significado de las líneas cambiantes se debilita, cambiando a leer tanto el texto del hexagrama original como el del hexagrama cambiado, combinando ambas interpretaciones.',
    interpretation4Lines: 'Cuatro líneas están cambiando, dejando solo dos líneas sin cambios. La interpretación se enfoca en el texto de la línea inferior no cambiada del hexagrama cambiado.',
    interpretation5Lines: 'Cinco líneas están cambiando, dejando solo una línea sin cambios. La interpretación se enfoca en el texto de la única línea no cambiada del hexagrama cambiado.',
    interpretation6LinesQian: 'Todas las seis líneas están cambiando: ① Si el hexagrama original es Qian, leer el texto "Yong Jiu"; ② Si el hexagrama original es Kun, leer el texto "Yong Liu"; ③ Para los otros 62 hexagramas, leer el texto del hexagrama cambiado directamente.',
    interpretation6LinesKun: 'Todas las seis líneas están cambiando: ① Si el hexagrama original es Qian, leer el texto "Yong Jiu"; ② Si el hexagrama original es Kun, leer el texto "Yong Liu"; ③ Para los otros 62 hexagramas, leer el texto del hexagrama cambiado directamente.',
    interpretation6LinesOthers: 'Todas las seis líneas están cambiando: ① Si el hexagrama original es Qian, leer el texto "Yong Jiu"; ② Si el hexagrama original es Kun, leer el texto "Yong Liu"; ③ Para los otros 62 hexagramas, leer el texto del hexagrama cambiado directamente.',
    manualInputTitle: 'Entrada Manual de Hexagrama',
    manualInputDescription: 'Por favor selecciona los resultados del lanzamiento de monedas para cada línea de abajo hacia arriba',
    coinExplanation: '3 cruces(9)=Viejo Yang ○, 2 caras 1 cruz(7)=Joven Yang |||, 2 cruces 1 cara(8)=Joven Yin ||, 3 caras(6)=Viejo Yin ×',
    explanation: 'Explicación:',
    divineButton: 'Divinar',
    oldYang: 'Viejo Yang',
    youngYang: 'Joven Yang',
    youngYin: 'Joven Yin',
    oldYin: 'Viejo Yin',
    lineNames: ['Primera Línea', 'Segunda Línea', 'Tercera Línea', 'Cuarta Línea', 'Quinta Línea', 'Sexta Línea'],
    changeSymbol: 'Cambio',
    guaText: 'Texto',
    tuan: 'Tuan',
    daXiang: 'Gran Imagen',
    lineInterpretation: 'Interpretación de Líneas Cambiantes',
    yaoText: 'Texto de Línea',
    xiang: 'Imagen',
    interpretation: 'Interpretación Popular',
    plainTranslation: 'Traducción Simple',
    lifeInspiration: 'Inspiración para la Vida',
    decisionAdvice: 'Consejo de Decisión',
    keyInterpretation: 'Interpretación Clave',

    // Line Relations Interpretation
    lineRelationsInterpretation: 'Interpretación de Relaciones de Líneas',
    changingLine: 'Línea Cambiante',
    dangWei: 'Posición Apropiada',
    notDangWei: 'Posición Inapropiada',
    dangWeiAnalysis: 'Análisis de Posición',
    yingRelation: 'Relación de Correspondencia',
    chengChengRelation: 'Relación de Soporte-Montura',
    modernInterpretation: 'Interpretación Moderna',
    lineCharacter: 'Línea',
    inContextOf: 'en el contexto de',

    // Fortune Assessment
    fortuneAssessment: 'Evaluación de Fortuna',
    confidence: 'Confianza',
    benGuaWeight: 'Peso Hexagrama Original',
    bianGuaWeight: 'Peso Hexagrama Cambiado',
    overallScore: 'Puntuación General',
    dimensionAnalysis: 'Análisis de Dimensiones',
    hexagramTextScore: 'Puntuación Texto Hexagrama',
    trigramRelationScore: 'Puntuación Relación Trigramas',
    linesPositionScore: 'Puntuación Posición Líneas',
    changingLinesAdjustment: 'Ajuste Líneas Cambiantes',
    situationAnalysis: 'Análisis de Situación',
    strengths: 'Fortalezas',
    weaknesses: 'Debilidades',
    opportunities: 'Oportunidades',
    threats: 'Amenazas',
    detailedAnalysis: 'Análisis Detallado',
    hexagramTextAnalysis: 'Análisis Texto Hexagrama',
    trigramRelationAnalysis: 'Análisis Relación Trigramas',
    linesPositionAnalysis: 'Análisis Posición Líneas',
    changingLinesAnalysis: 'Análisis Líneas Cambiantes',
    none: 'Ninguno',

    // Fortune Levels
    extremelyAuspicious: 'Extremadamente Auspicioso',
    veryAuspicious: 'Muy Auspicioso',
    auspicious: 'Auspicioso',
    neutral: 'Neutral',
    inauspicious: 'Inauspicioso',
    veryInauspicious: 'Muy Inauspicioso',
    extremelyInauspicious: 'Extremadamente Inauspicioso',

    extremelyAuspiciousDesc: 'Momento celestial, ventaja geográfica y armonía humana. Todos los asuntos prosperan suavemente, una oportunidad única en la vida.',
    veryAuspiciousDesc: 'Buena fortuna con muchas oportunidades. Es aconsejable avanzar activamente.',
    auspiciousDesc: 'La fortuna tiende steady hacia arriba con pequeños logros. Es aconsejable buscar progreso manteniendo la estabilidad.',
    neutralDesc: 'La fortuna es promedio con bendiciones y desgracias mixtas. Es aconsejable actuar con cautela.',
    inauspiciousDesc: 'La fortuna encuentra obstáculos ligeros. Es aconsejable defender en lugar de atacar y esperar el momento adecuado.',
    veryInauspiciousDesc: 'La fortuna es pobre con numerosas dificultades. Es aconsejable retirarse y protegerse.',
    extremelyInauspiciousDesc: 'La fortuna es extremadamente pobre con crisis al acecho. Es aconsejable observar quietly y evitar acciones temerarias.',

    hexagramTextAnalysisLabel: 'Análisis Texto Hexagrama:',
    hexagramNameLabel: 'Nombre Hexagrama:',
    hexagramTextLabel: 'Texto Hexagrama:',
    keywordAnalysisLabel: 'Análisis Palabras Clave:',
    finalScoreLabel: 'Puntuación Final:',
    trigramRelationAnalysisLabel: 'Análisis Relación Trigramas Superior e Inferior:',
    upperTrigramLabel: 'Trigrama Superior:',
    lowerTrigramLabel: 'Trigrama Inferior:',
    heavenEarthRelationLabel: 'Relación Cielo-Tierra:',
    fiveElementsRelationLabel: 'Relación Cinco Elementos:',
    yinYangHarmonyLabel: 'Armonía Yin-Yang:',
    specialCombinationLabel: 'Combinación Especial:',
    linesPositionAnalysisLabel: 'Análisis Posición Líneas:',
    changingLinesAnalysisLabel: 'Análisis Líneas Cambiantes:',
    yinYangBalanceLabel: 'Equilibrio Yin-Yang:',
    positionStructureLabel: 'Estructura Posición:',
    specialCombinationsLabel: 'Combinaciones Especiales:',
    invalidHexagramStructureLabel: 'Estructura de hexagrama inválida',
    unknownLabel: 'Desconocido',
    cannotAnalyzeLabel: 'No se puede analizar',

    relationshipSummary: 'Resumen de Relación:',
    eachLineAnalysis: 'Análisis de Cada Línea:',
    properPositionCount: 'Conteo de posiciones properas:',
    improperPositionCount: 'Conteo de posiciones impropias:',
    yangLinesCount: 'Conteo de líneas Yang:',
    yinLinesCount: 'Conteo de líneas Yin:',
    pointsText: 'puntos',
    upperGeneratesLower: 'Superior genera inferior, auspicioso',
    lowerGeneratesUpper: 'Inferior genera superior, inauspicioso',
    sameElement: 'Mismo elemento, neutral',
    upperRestrictsLower: 'Superior restringe inferior, inauspicioso',
    lowerRestrictsUpper: 'Inferior restringe superior, auspicioso',
    restrictedBy: 'restringido por',

    hexagram1Adjustment: '\nQian representa el cielo, un hexagrama puramente yang, fuerte y recto, una señal extremadamente auspiciosa.',
    hexagram2Adjustment: '\nKun representa la tierra, un hexagrama puramente yin, virtuoso y nutricio, una señal auspiciosa y armoniosa.',
    hexagram11Adjustment: '\nEl cielo y la tierra interactúan en armonía, el yin y yang equilibran, todos los asuntos prosperan suavemente, una señal extremadamente auspiciosa.',
    hexagram12Adjustment: '\nEl cielo y la tierra no interactúan, el yin y yang están bloqueados, todos los asuntos son desfavorables, una señal peligrosa.',
    hexagram63Adjustment: '\nEl agua y el fuego ya están en armonía, los asuntos han tenido éxito, pero guardarse contra la arrogancia y extravagancia, una señal auspiciosa con advertencia.',
    hexagram64Adjustment: '\nEl agua y el fuego aún no están en armonía, los asuntos aún no han tenido éxito, necesitan esforzarse hacia adelante, una señal neutral.',

    heavenEarthRelation: 'El cielo y la tierra interactúan en armonía, el yin y yang equilibran',
    heavenHeavenRelation: 'Cielo en cielo, fuerte y recto, guardarse contra rigidez excesiva',
    earthEarthRelation: 'Tierra en tierra, gentil y nutricio, guardarse contra suavidad excesiva',
    heavenMountainRelation: 'Cielo en montaña, elevado y lejano signo',
    heavenLakeRelation: 'Cielo en lago, humedeciendo y nutricio signo',
    heavenFireRelation: 'Fuego celestial compañerismo, brillante e iluminador signo',
    heavenWindRelation: 'Viento celestial encuentro, encuentro signo',
    heavenWaterRelation: 'Agua celestial lawsuit, disputa signo',
    heavenThunderRelation: 'Trueno celestial sin temeridad, sin temeridad signo',
    earthMountainRelation: 'Tierra montaña humildad, modesto signo',
    earthLakeRelation: 'Tierra lago aproximación, supervisando signo',
    earthFireRelation: 'Tierra fuego brillo, luz dañada signo',
    earthWindRelation: 'Tierra viento ascensión, ascendiendo signo',
    earthWaterRelation: 'Tierra agua ejército, expedición militar signo',
    earthThunderRelation: 'Tierra trueno retorno, regresando signo',

    yinYangIdeal: 'Superior yang e inferior yin, cielo y tierra en posición apropiada, yin y yang armonizados',
    yinYangBalanced: 'Yin y yang equilibrados, signo neutral',
    yinYangInverted: 'Superior yin e inferior yang, cielo y tierra invertidos, yin y yang desequilibrados',
    yinYangNoFeature: 'La distribución yin y yang no tiene características obvias',
    fiveElementsNoFeature: 'La relación de cinco elementos no tiene características obvias',

    noChangingLines: 'Sin líneas cambiantes, situación estable',
    oneChangingLine: 'Una línea cambiante, cambio moderado, aconsejable seguir la tendencia',
    twoChangingLines: 'Dos líneas cambiantes, muchos cambios, necesidad de responder con cautela',
    threeChangingLines: 'Tres líneas cambiantes, cambios drásticos, situación turbulenta',
    manyChangingLines: 'Muchas líneas cambiantes, cambios extremos, aconsejable observar quietly',
    changingLinesUnknown: 'Situación de líneas cambiantes unclear',

    yinYangBalancedHarmony: 'Yin y yang equilibrados, signo armonioso',
    yangMoreThanYin: 'Más yang que yin, energía yang vigorosa',
    yinMoreThanYang: 'Más yin que yang, energía yin suficiente',
    yangExtreme: 'Yang extremadamente vigoroso, guardarse contra rigidez excesiva',
    yinExtreme: 'Yin extremadamente vigoroso, guardarse contra suavidad excesiva',

    allYangHexagram: 'Hexagrama puramente yang, fuerte y recto',
    allYinHexagram: 'Hexagrama puramente yin, virtuoso y nutricio',
    middlePosition: 'Posición media, gobernante y ministro en posición apropiada',

    lines34Harmony: 'Tercera y cuarta líneas yin y yang se complementan',
    lines34Gentle: 'Tercera y cuarta líneas yin y gentil, usando quietud para controlar movimiento',
    lines16Correspondence: 'Primera y sexta líneas corresponden',
    lines25Correspondence: 'Segunda y quinta líneas corresponden, yin y yang armonizados',
    positionStructureNoFeature: 'Estructura de posición no tiene características obvias',

    firstLineChange: 'Primera línea cambiante: posición inicial cambia, afectando fundamento (+1 punto)',
    sixthLineChange: 'Sexta línea cambiante: posición final cambia, afectando resultado (+2 puntos)',
    secondLineChange: 'Segunda línea cambiante: posición media cambia, afectando asuntos humanos (+3 puntos)',
    fifthLineChange: 'Quinta línea cambiante: posición media cambia, afectando asuntos humanos (+4 puntos)',
    thirdOrFourthLineChange: 'Tercera o cuarta línea cambiante: posición media cambia, afectando asuntos humanos (-2 puntos)',
    hexagramChangeNoFeature: 'Cambio de hexagrama no tiene características especiales',

    generalCase: 'Caso general',
    staticHexagram: 'Hexagrama estático',
    singleLineChange: 'Cambio de línea única',
    doubleLineChange: 'Cambio de doble línea',
    tripleLineChange: 'Cambio de triple línea',
    multipleLineChange: 'Cambio de múltiples líneas',

    oldYangDesc: 'Yang viejo, línea cambiante, energía yang en su punto máximo',
    youngYangDesc: 'Yang joven, línea yang, energía yang ascendiendo',
    youngYinDesc: 'Yin joven, línea yin, energía yin descendiendo',
    oldYinDesc: 'Yin viejo, línea cambiante, energía yin en su punto máximo',

    pureYangHexagram: 'Hexagrama puramente yang, fuerte y recto',
    pureYinHexagram: 'Hexagrama puramente yin, virtuoso y nutricio',
    taiHexagram: 'Hexagrama Tai, cielo y tierra en armonía, yin y yang equilibrados',
    piHexagram: 'Hexagrama Pi, cielo y tierra no interactúan, yin y yang bloqueados',
    jiJiHexagram: 'Hexagrama Jiji, agua y fuego en armonía, los asuntos han tenido éxito',
    weiJiHexagram: 'Hexagrama Weiji, agua y fuego no en armonía, los asuntos aún no han tenido éxito',
    fengHexagram: 'Hexagrama Feng, trueno y fuego abundancia, signo de abundancia',
    kunHexagram: 'Hexagrama Kun, agua y pantano atrapado, signo de estar atrapado',
    noSpecialCombination: 'Sin características de combinación especiales',

    specialCombinationAdjustmentLabel: 'Ajuste de combinación especial:',

    qianAllChange: 'Hexagrama Qian todas las seis líneas cambian: ver dragones sin cabeza, auspicioso (+18 puntos)',
    kunAllChange: 'Hexagrama Kun todas las seis líneas cambian: beneficioso para perseverancia eterna, auspicioso (+15 puntos)',
    middleFourChange: 'Cuatro líneas medias cambian: turbulencia central, situación inestable (-8 puntos)',
    jumpingChange: 'Cambios de línea saltando: cambios incoherentes, difíciles de comprender (-5 puntos)',
    yongJiu: 'Usando nueve',
    yongLiu: 'Usando seis',
    fourLineChange: 'Cambio de cuatro líneas',
    jumpingLineChange: 'Cambio de línea saltando',

    middlePositionDesc: 'Posición media, gobernante y ministro en posición apropiada',
    allYangDesc: 'Hexagrama puramente yang, fuerte y recto',
    allYinDesc: 'Hexagrama puramente yin, virtuoso y nutricio',
    properPositionDesc: 'Posición de línea apropiada, cada uno cumple su deber',
    improperPositionDesc: 'Posición de línea inapropiada, yin y yang desequilibrados',

    hexagramTextGood: ' El texto del hexagrama muestra gran fortuna, puedes proceder con confianza.',
    hexagramTextBad: ' El texto del hexagrama muestra peligro, debes ser cauteloso.',
    trigramGood: ' Los trigramas superior e inferior son armoniosos, tienes tiempo divino y ventaja geográfica.',
    trigramBad: ' Los trigramas superior e inferior entran en conflicto, necesitas ajustar tu estrategia.',
    linesGood: ' Las posiciones de las líneas son apropiadas, los asuntos humanos son armoniosos.',
    linesBad: ' Las posiciones de las líneas son inapropiadas, necesitas protegerte de villanos.',

    qianToKun: 'Qian a Kun: duro a suave, de activo a pasivo (-10 puntos)',
    kunToQian: 'Kun a Qian: suave a duro, de pasivo a activo (+10 puntos)',
    taiToPi: 'Tai a Pi: de suave a bloqueado, fortuna gira bruscamente hacia abajo (-15 puntos)',
    piToTai: 'Pi a Tai: de bloqueado a suave, fortuna se ilumina repentinamente (+15 puntos)',
    jiJiToWeiJi: 'Jiji a Weiji: de éxito a fracaso, éxito al borde del fracaso (-12 puntos)',
    weiJiToJiJi: 'Weiji a Jiji: de fracaso a éxito, florecimiento tardío (+12 puntos)',
    qianKunConversion: 'Conversión Qian-Kun',
    taiPiConversion: 'Conversión Tai-Pi',
    jiWeiConversion: 'Conversión Ji-Wei',

    // Detailed Analysis Content
    detailedStrengthsHexagram: 'El texto del hexagrama es auspicioso, con asistencia celestial',
    detailedStrengthsTrigram: 'Trigramas superior e inferior armonizados, con ventajas de tiempo y lugar',
    detailedStrengthsLines: 'Las posiciones de las líneas son apropiadas, con relaciones humanas armoniosas',
    detailedWeaknessesHexagram: 'El texto del hexagrama es inauspicioso, requiere acción cautelosa',
    detailedWeaknessesTrigram: 'Trigramas superior e inferior en conflicto, con entorno desfavorable',
    detailedWeaknessesLines: 'Las posiciones de las líneas son inapropiadas, con relaciones humanas discordantes',
    detailedOpportunitiesHexagram: 'Aprovechar el momento, avanzar activamente',
    detailedOpportunitiesTrigram: 'Aprovechar ventajas ambientales, seguir la tendencia',
    detailedOpportunitiesLines: 'Unirse y cooperar, buscar desarrollo común',
    detailedThreatsHexagram: 'Prevenir problemas antes de que ocurran, evitar impulsividad',
    detailedThreatsTrigram: 'Proteger contra riesgos externos, avanzar steady',
    detailedThreatsLines: 'Prevenir conflictos internos, distinguir lo correcto de lo incorrecto',

    // Trigram Names
    trigramQian: 'Qian',
    trigramKun: 'Kun',
    trigramZhen: 'Zhen',
    trigramKan: 'Kan',
    trigramGen: 'Gen',
    trigramXun: 'Xun',
    trigramLi: 'Li',
    trigramDui: 'Dui',

    // Trigram Natures
    natureHeaven: 'Cielo',
    natureEarth: 'Tierra',
    natureThunder: 'Trueno',
    natureWater: 'Agua',
    natureMountain: 'Montaña',
    natureWind: 'Viento',
    natureFire: 'Fuego',
    natureLake: 'Lago',

    // Trigram Qualities
    qualityFirm: 'Firme',
    qualityGentle: 'Suave',
    qualityMoving: 'Móvil',
    qualityDangerous: 'Peligroso',
    qualityStill: 'Quieto',
    qualityObedient: 'Obediente',
    qualityClinging: 'Adherido',
    qualityJoyful: 'Alegre',

    // Five Elements
    elementMetal: 'Metal',
    elementWood: 'Madera',
    elementWater: 'Agua',
    elementFire: 'Fuego',
    elementEarth: 'Tierra',

    // Line Positions
    lineFirst: 'Primera Línea',
    lineSecond: 'Segunda Línea',
    lineThird: 'Tercera Línea',
    lineFourth: 'Cuarta Línea',
    lineFifth: 'Quinta Línea',
    lineSixth: 'Sexta Línea',

    // Line Position Types
    positionLowest: 'Más Bajo',
    positionLowerMiddle: 'Inferior Medio',
    positionLowerUpper: 'Inferior Superior',
    positionUpperLower: 'Superior Inferior',
    positionUpperMiddle: 'Superior Medio',
    positionHighest: 'Más Alto',

    // Line Natures
    natureBeginning: 'Comienzo',
    natureMiddle: 'Medio',
    natureDangerous2: 'Peligroso',
    natureAuspicious: 'Auspicioso',
    natureEnd: 'Fin',

    // Weight Calculation Text
    originalHexagramScore: 'Puntuación hexagrama original',
    changedHexagramScore: 'Puntuación hexagrama cambiado',
    combinedScore: 'Puntuación combinada',
    originalHexagramAnalysis: 'Análisis hexagrama original',
    changedHexagramAnalysis: 'Análisis hexagrama cambiado',
    weightPercentage: 'peso',

    // Position Analysis Text
    properPosition: 'Posición Apropiada',
    improperPosition: 'Posición Inapropiada',
    pointsText2: 'puntos',

    // Hexagram Display Text
    clickToStart: 'Haga clic en el botón de abajo para comenzar la adivinación',
    hexagramNumberWithSuffix: 'Hexagrama {0}',

    // Hexagram Result Text
    daxiangImageAlt: 'Imagen Daxiang de {0}',
    yongJiuLabel: 'Yong Jiu:',
    yongLiuLabel: 'Yong Liu:',

    // Auth Button Fallback Text
    logoutFallback: 'Cerrar sesión',
    signInFallback: 'Iniciar sesión con Google',

    footer: 'La sinceridad trae claridad · Sigue el camino natural',
    selectLanguage: 'Idioma',
    signIn: 'Iniciar sesión con Google',
    logout: 'Cerrar sesión',
    loginRequired: 'Se requiere iniciar sesión',
    loginToSave: 'Inicia sesión para guardar tu historial de adivinación',
    history: 'Historial',
    noHistory: 'Sin historial aún',
    viewHistory: 'Ver Historial',
    clearHistory: 'Limpiar Historial',
    historyRecord: 'Registro Histórico',
    deleteHistory: 'Eliminar',
    deleteConfirm: '¿Estás seguro de que quieres eliminar este registro histórico?',
    deleteSuccess: 'Historial eliminado exitosamente',
    deleteError: 'Error al eliminar, por favor intenta de nuevo',
    historyOriginalHexagram: 'Hexagrama Original',
    historyChangedHexagram: 'Hexagrama Cambiado',
    justNow: 'Ahora',
    minutesAgo: 'hace minutos',
    hoursAgo: 'hace horas',
    yesterday: 'Ayer',
    daysAgo: 'hace días',
    languages: {
      en: 'English',
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文',
      es: 'Español'
    }
  }
};

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
