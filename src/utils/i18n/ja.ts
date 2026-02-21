import type { Translation } from './types';

export const ja: Translation = {
  title: 'デジタル易経',
  subtitle: '心で占い、卦で心を悟る',
  iChing: '易経',
  questionLabel: '誠心誠意、あなたの質問を入力してください：',
  questionPlaceholder: '例：この仕事を受けるべきか？この協力は成功するか？...',
  castButton: '占う',
  resetButton: '再占',
  coinDivination: '銭占い',
  back: '戻る',
  reset: 'リセット',
  viewResult: '結果を見る',
  yourQuestion: 'あなたの質問',
  casting: '占い中...',
  castingDescription: '天地の気に感応し、銭を投じています...',
  originalHexagram: '本卦',
  changedHexagram: '変卦',
  changingLines: '変爻',
  changingLinesCount: 'つの変爻',
  hexagramNumber: '第{0}卦',
  keyInterpretationNote: '重要な解釈',
  interpretationRules: '0変爻:本卦の卦辞を読む | 1変爻:その爻の爻辞を読む | 2変爻:両爻を読み、上爻を主とする | 3変爻:本卦と変卦の卦辞を読む | 4変爻:変卦の下爻を読む | 5変爻:変卦の不変爻を読む | 6変爻:乾坤は用九・用六を読み、その他は変卦の卦辞を読む',
  interpretation0Lines: '六爻すべてが静爻で変爻がありません。本卦の卦辞を直接解読し、物事の全体的な傾向を表します。',
  interpretation1Line: '一つの爻のみが変化します。この変爻の爻辞を直接読み、最も基本的な指針を提供します。',
  interpretation2Lines: '二つの爻が変化します。上の爻を優先します（例：九二と九四が同時に変化する場合、九四を優先）、下の爻を補助参考とします。',
  interpretation3Lines: '三つの爻が変化します。変爻の意味が弱まり、本卦と変卦の卦辞を両方読み、両者の解釈を組み合わせます。',
  interpretation4Lines: '四つの爻が変化し、二つの爻のみが不変です。変卦の下の不変爻の爻辞に焦点を当てて解釈します。',
  interpretation5Lines: '五つの爻が変化し、一つの爻のみが不変です。変卦の唯一の不変爻の爻辞に焦点を当てて解釈します。',
  interpretation6LinesQian: '六爻すべてが変化：①本卦が乾卦の場合、「用九」を読む；②本卦が坤卦の場合、「用六」を読む；③その他の62卦の場合、変卦の卦辞を直接読む。',
  interpretation6LinesKun: '六爻すべてが変化：①本卦が乾卦の場合、「用九」を読む；②本卦が坤卦の場合、「用六」を読む；③その他の62卦の場合、変卦の卦辞を直接読む。',
  interpretation6LinesOthers: '六爻すべてが変化：①本卦が乾卦の場合、「用九」を読む；②本卦が坤卦の場合、「用六」を読む；③その他の62卦の場合、変卦の卦辞を直接読む。',
  manualInputTitle: '手動卦入力',
  manualInputDescription: '下から上の順で、各爻の銭投げ結果を選択してください',
  coinExplanation: '3裏(9)=老陽 ○, 2表1裏(7)=少陽 |||, 2裏1表(8)=少陰 ||, 3表(6)=老陰 ×',
  explanation: '説明：',
  divineButton: '解卦',
  oldYang: '老陽',
  youngYang: '少陽',
  youngYin: '少陰',
  oldYin: '老陰',
  lineNames: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'],
  changeSymbol: '変',
  guaText: '卦辞',
  tuan: '彖曰',
  daXiang: '大象',
  lineInterpretation: '変爻解釈',
  yaoText: '爻辞',
  xiang: '象曰',
  interpretation: '通俗解釈',
  plainTranslation: '平易な翻訳',
  lifeInspiration: '人生の啓示',
  decisionAdvice: '決断アドバイス',
  keyInterpretation: '重要な解釈',

  // Line Relations Interpretation
  lineRelationsInterpretation: '爻関係解釈',
  changingLine: '変爻',
  dangWei: '当位',
  notDangWei: '不当位',
  dangWeiAnalysis: '位置分析',
  yingRelation: '応関係',
  chengChengRelation: '承乗関係',
  modernInterpretation: '現代的解釈',
  lineCharacter: '爻',
  inContextOf: 'の文脈において',

  // Fortune Assessment
  fortuneAssessment: '運勢評価',
  confidence: '信頼度',
  benGuaWeight: '本卦の重み',
  bianGuaWeight: '変卦の重み',
  overallScore: '総合スコア',
  dimensionAnalysis: '次元分析',
  hexagramTextScore: '卦辞スコア',
  trigramRelationScore: '三爻関係スコア',
  linesPositionScore: '爻位置スコア',
  changingLinesAdjustment: '変爻調整',
  situationAnalysis: '状況分析',
  strengths: '強み',
  weaknesses: '弱み',
  opportunities: '機会',
  threats: '脅威',
  detailedAnalysis: '詳細分析',
  hexagramTextAnalysis: '卦辞分析',
  trigramRelationAnalysis: '三爻関係分析',
  linesPositionAnalysis: '爻位置分析',
  changingLinesAnalysis: '変爻分析',
  none: 'なし',

  // Fortune Assessment specific
  keywordSeparator: '、',
  trigramRelationPattern: '{0}が{1}の上',
  changingLinesPattern: '{0}つの変爻',

  // Fortune Levels
  extremelyAuspicious: '極めて吉',
  veryAuspicious: '大吉',
  auspicious: '吉',
  neutral: '中庸',
  inauspicious: '凶',
  veryInauspicious: '大凶',
  extremelyInauspicious: '極凶',

  // Fortune Level Descriptions
  extremelyAuspiciousDesc: '最高の運勢、万事順調',
  veryAuspiciousDesc: '非常に良い運勢、成功の見込み大',
  auspiciousDesc: '良い運勢、前進すべき',
  neutralDesc: '中程度の運勢、慎重に対応',
  inauspiciousDesc: '悪い運勢、待つべき',
  veryInauspiciousDesc: '非常に悪い運勢、慎重を要す',
  extremelyInauspiciousDesc: '最悪の運勢、行動を避けるべき',

  // Fortune Assessment Reasoning
  hexagramTextAnalysisLabel: '卦辞分析',
  hexagramNameLabel: '卦名',
  hexagramTextLabel: '卦辞',
  keywordAnalysisLabel: 'キーワード分析',
  finalScoreLabel: '最終スコア',
  trigramRelationAnalysisLabel: '三爻関係分析',
  upperTrigramLabel: '上卦',
  lowerTrigramLabel: '下卦',
  heavenEarthRelationLabel: '天地関係',
  fiveElementsRelationLabel: '五行関係',
  yinYangHarmonyLabel: '陰陽調和',
  specialCombinationLabel: '特殊組み合わせ',
  linesPositionAnalysisLabel: '爻位置分析',
  changingLinesAnalysisLabel: '変爻分析',
  yinYangBalanceLabel: '陰陽バランス',
  positionStructureLabel: '位置構造',
  specialCombinationsLabel: '特殊組み合わせ',
  invalidHexagramStructureLabel: '無効な卦構造',
  unknownLabel: '不明',
  cannotAnalyzeLabel: '分析不能',

  // Additional Reasoning Labels
  relationshipSummary: '関係要約',
  eachLineAnalysis: '各爻分析',
  properPositionCount: '当位数',
  improperPositionCount: '不当位数',
  yangLinesCount: '陽爻数',
  yinLinesCount: '陰爻数',
  pointsText: '点',
  upperGeneratesLower: '上卦が下卦を生む',
  lowerGeneratesUpper: '下卦が上卦を生む',
  sameElement: '同一元素',
  upperRestrictsLower: '上卦が下卦を制す',
  lowerRestrictsUpper: '下卦が上卦を制す',
  restrictedBy: 'に制される',

  // Special Hexagram Adjustments
  hexagram1Adjustment: '乾卦調整',
  hexagram2Adjustment: '坤卦調整',
  hexagram11Adjustment: '泰卦調整',
  hexagram12Adjustment: '否卦調整',
  hexagram63Adjustment: '既済調整',
  hexagram64Adjustment: '未済調整',

  // Heaven-Earth Relations
  heavenEarthRelation: '天地関係',
  heavenHeavenRelation: '天天関係',
  earthEarthRelation: '地地関係',
  heavenMountainRelation: '天山関係',
  heavenLakeRelation: '天沢関係',
  heavenFireRelation: '天火関係',
  heavenWindRelation: '天風関係',
  heavenWaterRelation: '天水関係',
  heavenThunderRelation: '天雷関係',
  earthMountainRelation: '地山関係',
  earthLakeRelation: '地沢関係',
  earthFireRelation: '地火関係',
  earthWindRelation: '地風関係',
  earthWaterRelation: '地水関係',
  earthThunderRelation: '地雷関係',

  // Yin-Yang Balance Relations
  yinYangIdeal: '陰陽理想',
  yinYangBalanced: '陰陽均衡',
  yinYangInverted: '陰陽逆転',
  yinYangNoFeature: '陰陽特徴なし',
  fiveElementsNoFeature: '五行特徴なし',

  // Changing Lines Analysis
  noChangingLines: '変爻なし',
  oneChangingLine: '1変爻',
  twoChangingLines: '2変爻',
  threeChangingLines: '3変爻',
  manyChangingLines: '多数変爻',
  changingLinesUnknown: '変爻不明',

  // Lines Yin-Yang Balance
  yinYangBalancedHarmony: '陰陽均衡調和',
  yangMoreThanYin: '陽爻が陰爻より多い',
  yinMoreThanYang: '陰爻が陽爻より多い',
  yangExtreme: '陽爻極端',
  yinExtreme: '陰爻極端',

  // Special Line Combinations
  allYangHexagram: '全陽卦',
  allYinHexagram: '全陰卦',
  middlePosition: '中位',

  // Position Structure Analysis
  lines34Harmony: '三四爻調和',
  lines34Gentle: '三四爻柔和',
  lines16Correspondence: '一六爻対応',
  lines25Correspondence: '二五爻対応',
  positionStructureNoFeature: '位置構造特徴なし',

  // Special Changing Positions Analysis
  firstLineChange: '初爻変化',
  sixthLineChange: '上爻変化',
  secondLineChange: '二爻変化',
  fifthLineChange: '五爻変化',
  thirdOrFourthLineChange: '三爻または四爻変化',
  hexagramChangeNoFeature: '卦変化特徴なし',

  // Changing Lines Cases
  generalCase: '一般ケース',
  staticHexagram: '静卦',
  singleLineChange: '単爻変化',
  doubleLineChange: '双爻変化',
  tripleLineChange: '三爻変化',
  multipleLineChange: '多爻変化',

  // Line Type Weights
  oldYangDesc: '老陽説明',
  youngYangDesc: '少陽説明',
  youngYinDesc: '少陰説明',
  oldYinDesc: '老陰説明',

  // Special Combinations
  pureYangHexagram: '純陽卦',
  pureYinHexagram: '純陰卦',
  taiHexagram: '泰卦',
  piHexagram: '否卦',
  jiJiHexagram: '既済卦',
  weiJiHexagram: '未済卦',
  fengHexagram: '豊卦',
  kunHexagram: '坤卦',
  noSpecialCombination: '特殊組み合わせなし',

  // Special Combination Adjustment
  specialCombinationAdjustmentLabel: '特殊組み合わせ調整',

  // Extreme Changing Cases
  qianAllChange: '乾全変',
  kunAllChange: '坤全変',
  middleFourChange: '中四爻変',
  jumpingChange: '跳躍変化',
  yongJiu: '用九',
  yongLiu: '用六',
  fourLineChange: '四爻変化',
  jumpingLineChange: '跳躍爻変化',

  // Overall Advice
  hexagramTextGood: '卦辞吉',
  hexagramTextBad: '卦辞凶',
  trigramGood: '三爻吉',
  trigramBad: '三爻凶',
  linesGood: '爻吉',
  linesBad: '爻凶',

  // Special Line Combinations
  middlePositionDesc: '中位説明',
  allYangDesc: '全陽説明',
  allYinDesc: '全陰説明',
  properPositionDesc: '当位説明',
  improperPositionDesc: '不当位説明',

  // Special Hexagram Changes
  qianToKun: '乾から坤へ',
  kunToQian: '坤から乾へ',
  taiToPi: '泰から否へ',
  piToTai: '否から泰へ',
  jiJiToWeiJi: '既済から未済へ',
  weiJiToJiJi: '未済から既済へ',
  qianKunConversion: '乾坤転換',
  taiPiConversion: '泰否転換',
  jiWeiConversion: '既未転換',

  // Detailed Analysis Content
  detailedStrengthsHexagram: '詳細強み卦',
  detailedStrengthsTrigram: '詳細強み三爻',
  detailedStrengthsLines: '詳細強み爻',
  detailedWeaknessesHexagram: '詳細弱み卦',
  detailedWeaknessesTrigram: '詳細弱み三爻',
  detailedWeaknessesLines: '詳細弱み爻',
  detailedOpportunitiesHexagram: '詳細機会卦',
  detailedOpportunitiesTrigram: '詳細機会三爻',
  detailedOpportunitiesLines: '詳細機会爻',
  detailedThreatsHexagram: '詳細脅威卦',
  detailedThreatsTrigram: '詳細脅威三爻',
  detailedThreatsLines: '詳細脅威爻',

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
  natureLake: '沢',

  // Trigram Qualities
  qualityFirm: '剛健',
  qualityGentle: '柔順',
  qualityMoving: '動',
  qualityDangerous: '険',
  qualityStill: '止',
  qualityObedient: '従',
  qualityClinging: '附',
  qualityJoyful: '悦',

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
  positionLowest: '最下位',
  positionLowerMiddle: '下中位',
  positionLowerUpper: '下上位',
  positionUpperLower: '上下位',
  positionUpperMiddle: '上中位',
  positionHighest: '最上位',

  // Line Natures
  natureBeginning: '初',
  natureMiddle: '中',
  natureDangerous2: '険',
  natureAuspicious: '吉',
  natureEnd: '終',

  // Weight Calculation Text
  originalHexagramScore: '本卦スコア',
  changedHexagramScore: '変卦スコア',
  combinedScore: '結合スコア',
  originalHexagramAnalysis: '本卦分析',
  changedHexagramAnalysis: '変卦分析',
  weightPercentage: '重み割合',

  // Position Analysis Text
  properPosition: '当位',
  improperPosition: '不当位',
  pointsText2: '点',

  // Hexagram Display Text
  clickToStart: '開始するにはクリック',
  hexagramNumberWithSuffix: '第{0}卦',

  // Hexagram Result Text
  daxiangImageAlt: '大象画像',
  yongJiuLabel: '用九',
  yongLiuLabel: '用六',

  // Auth Button Fallback Text
  logoutFallback: 'ログアウト',
  signInFallback: 'サインイン',

  // Hexagram Name Format
  hexagramNameFormat: '{0} - {1}',

  // Question Label
  yourQuestionLabel: 'あなたの質問',

  // Footer
  footer: '© 2024 デジタル易経',

  // Language selector
  selectLanguage: '言語を選択',
  languages: {
    en: 'English',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    es: 'Español',
    ja: '日本語',
    ko: '한국어'
  },

  // Authentication
  signIn: 'サインイン',
  logout: 'ログアウト',
  loginRequired: 'ログインが必要です',
  loginToSave: '保存するにはログインしてください',

  // History
  history: '履歴',
  noHistory: '履歴がありません',
  viewHistory: '履歴を見る',
  clearHistory: '履歴をクリア',
  historyRecord: '履歴記録',
  deleteHistory: '履歴を削除',
  deleteConfirm: '削除してもよろしいですか？',
  deleteSuccess: '削除が完了しました',
  deleteError: '削除に失敗しました',
  historyOriginalHexagram: '本卦',
  historyChangedHexagram: '変卦',
  justNow: 'たった今',
  minutesAgo: '分前',
  hoursAgo: '時間前',
  yesterday: '昨日',
  daysAgo: '日前'
};
