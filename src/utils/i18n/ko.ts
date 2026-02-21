import type { Translation } from './types';

export const ko: Translation = {
  title: '디지털 역경',
  subtitle: '마음으로 점치고, 괘로 마음을 깨닫다',
  iChing: '역경',
  questionLabel: '진심으로 당신의 질문을 입력해주세요:',
  questionPlaceholder: '예: 이 직업을 받아들여야 할까요? 이 협력은 성공할 수 있을까요?...',
  castButton: '점치기',
  resetButton: '다시 점치기',
  coinDivination: '전점',
  back: '뒤로',
  reset: '재설정',
  viewResult: '결과 보기',
  yourQuestion: '당신의 질문',
  casting: '점치는 중...',
  castingDescription: '천지의 기운에 감응하며, 동전을 던지고 있습니다...',
  originalHexagram: '본괘',
  changedHexagram: '변괘',
  changingLines: '변효',
  changingLinesCount: '개의 변효',
  hexagramNumber: '제{0}괘',
  keyInterpretationNote: '핵심 해석',
  interpretationRules: '0변효: 본괘 괘사 읽기 | 1변효: 해당 효 효사 읽기 | 2변효: 두 효 읽기, 상위 효 우선 | 3변효: 본괘와 변괘 괘사 모두 읽기 | 4변효: 변괘의 하위 불변효 읽기 | 5변효: 변괘의 유일 불변효 읽기 | 6변효: 건괘는 용구, 곤괘는 용육 읽기, 기타는 변괘 괘사 읽기',
  interpretation0Lines: '여섯 효 모두 정효로 변효가 없습니다. 본괘의 괘사를 직접 해석하며, 사물의 전반적인 경향을 나타냅니다.',
  interpretation1Line: '한 효만 변화합니다. 이 변효의 효사를 직접 읽으며, 가장 기본적인 지침을 제공합니다.',
  interpretation2Lines: '두 효가 변화합니다. 상위 효를 우선합니다 (예: 구이와 구사가 동시에 변화하면 구사 우선), 하위 효는 보조 참고로 합니다.',
  interpretation3Lines: '세 효가 변화합니다. 변효의 의미가 약해지고, 본괘와 변괘의 괘사를 모두 읽으며, 양자의 해석을 결합합니다.',
  interpretation4Lines: '네 효가 변화하고, 두 효만 불변입니다. 변괘의 하위 불변효 효사에 초점을 맞춰 해석합니다.',
  interpretation5Lines: '다섯 효가 변화하고, 한 효만 불변입니다. 변괘의 유일 불변효 효사에 초점을 맞춰 해석합니다.',
  interpretation6LinesQian: '여섯 효 모두 변화: ① 본괘가 건괘면 "용구" 읽기; ② 본괘가 곤괘면 "용육" 읽기; ③ 기타 62괘는 변괘 괘사 직접 읽기.',
  interpretation6LinesKun: '여섯 효 모두 변화: ① 본괘가 건괘면 "용구" 읽기; ② 본괘가 곤괘면 "용육" 읽기; ③ 기타 62괘는 변괘 괘사 직접 읽기.',
  interpretation6LinesOthers: '여섯 효 모두 변화: ① 본괘가 건괘면 "용구" 읽기; ② 본괘가 곤괘면 "용육" 읽기; ③ 기타 62괘는 변괘 괘사 직접 읽기.',
  manualInputTitle: '수동 괘 입력',
  manualInputDescription: '아래에서 위 순서로 각 효의 동전 던지기 결과를 선택해주세요',
  coinExplanation: '3뒤(9)=노양 ○, 2앞1뒤(7)=소양 |||, 2뒤1앞(8)=소음 ||, 3앞(6)=노음 ×',
  explanation: '설명：',
  divineButton: '해괘',
  oldYang: '노양',
  youngYang: '소양',
  youngYin: '소음',
  oldYin: '노음',
  lineNames: ['초효', '이효', '삼효', '사효', '오효', '상효'],
  changeSymbol: '변',
  guaText: '괘사',
  tuan: '단왈',
  daXiang: '대상',
  lineInterpretation: '변효 해석',
  yaoText: '효사',
  xiang: '상왈',
  interpretation: '통속 해석',
  plainTranslation: '평이한 번역',
  lifeInspiration: '인생 영감',
  decisionAdvice: '결정 조언',
  keyInterpretation: '핵심 해석',

  // Line Relations Interpretation
  lineRelationsInterpretation: '효 관계 해석',
  changingLine: '변효',
  dangWei: '당위',
  notDangWei: '부당위',
  dangWeiAnalysis: '위치 분석',
  yingRelation: '응 관계',
  chengChengRelation: '승승 관계',
  modernInterpretation: '현대적 해석',
  lineCharacter: '효',
  inContextOf: '의 맥락에서',

  // Fortune Assessment
  fortuneAssessment: '운세 평가',
  confidence: '신뢰도',
  benGuaWeight: '본괘 가중치',
  bianGuaWeight: '변괘 가중치',
  overallScore: '종합 점수',
  dimensionAnalysis: '차원 분석',
  hexagramTextScore: '괘사 점수',
  trigramRelationScore: '삼효 관계 점수',
  linesPositionScore: '효 위치 점수',
  changingLinesAdjustment: '변효 조정',
  situationAnalysis: '상황 분석',
  strengths: '강점',
  weaknesses: '약점',
  opportunities: '기회',
  threats: '위협',
  detailedAnalysis: '상세 분석',
  hexagramTextAnalysis: '괘사 분석',
  trigramRelationAnalysis: '삼효 관계 분석',
  linesPositionAnalysis: '효 위치 분석',
  changingLinesAnalysis: '변효 분석',
  none: '없음',

  // Fortune Assessment specific
  keywordSeparator: '、',
  trigramRelationPattern: '{0}이 {1} 위에',
  changingLinesPattern: '{0}개 변효',

  // Fortune Levels
  extremelyAuspicious: '극길',
  veryAuspicious: '대길',
  auspicious: '길',
  neutral: '중용',
  inauspicious: '흉',
  veryInauspicious: '대흉',
  extremelyInauspicious: '극흉',

  // Fortune Level Descriptions
  extremelyAuspiciousDesc: '최고의 운세, 만사 순조',
  veryAuspiciousDesc: '매우 좋은 운세, 성공 가능성 큼',
  auspiciousDesc: '좋은 운세, 전진해야 함',
  neutralDesc: '중간 운세, 신중하게 대응',
  inauspiciousDesc: '나쁜 운세, 기다려야 함',
  veryInauspiciousDesc: '매우 나쁜 운세, 신중을 요함',
  extremelyInauspiciousDesc: '최악의 운세, 행동 피해야 함',

  // Fortune Assessment Reasoning
  hexagramTextAnalysisLabel: '괘사 분석',
  hexagramNameLabel: '괘명',
  hexagramTextLabel: '괘사',
  keywordAnalysisLabel: '키워드 분석',
  finalScoreLabel: '최종 점수',
  trigramRelationAnalysisLabel: '삼효 관계 분석',
  upperTrigramLabel: '상괘',
  lowerTrigramLabel: '하괘',
  heavenEarthRelationLabel: '천지 관계',
  fiveElementsRelationLabel: '오행 관계',
  yinYangHarmonyLabel: '음양 조화',
  specialCombinationLabel: '특수 조합',
  linesPositionAnalysisLabel: '효 위치 분석',
  changingLinesAnalysisLabel: '변효 분석',
  yinYangBalanceLabel: '음양 균형',
  positionStructureLabel: '위치 구조',
  specialCombinationsLabel: '특수 조합',
  invalidHexagramStructureLabel: '무효한 괘 구조',
  unknownLabel: '불명',
  cannotAnalyzeLabel: '분석 불가',

  // Additional Reasoning Labels
  relationshipSummary: '관계 요약',
  eachLineAnalysis: '각 효 분석',
  properPositionCount: '당위 수',
  improperPositionCount: '부당위 수',
  yangLinesCount: '양효 수',
  yinLinesCount: '음효 수',
  pointsText: '점',
  upperGeneratesLower: '상괘가 하괘를 생함',
  lowerGeneratesUpper: '하괘가 상괘를 생함',
  sameElement: '동일 원소',
  upperRestrictsLower: '상괘가 하괘를 제함',
  lowerRestrictsUpper: '하괘가 상괘를 제함',
  restrictedBy: '에 의해 제약됨',

  // Special Hexagram Adjustments
  hexagram1Adjustment: '건괘 조정',
  hexagram2Adjustment: '곤괘 조정',
  hexagram11Adjustment: '태괘 조정',
  hexagram12Adjustment: '비괘 조정',
  hexagram63Adjustment: '기제 조정',
  hexagram64Adjustment: '미제 조정',

  // Heaven-Earth Relations
  heavenEarthRelation: '천지 관계',
  heavenHeavenRelation: '천천 관계',
  earthEarthRelation: '지지 관계',
  heavenMountainRelation: '천산 관계',
  heavenLakeRelation: '천택 관계',
  heavenFireRelation: '천화 관계',
  heavenWindRelation: '천풍 관계',
  heavenWaterRelation: '천수 관계',
  heavenThunderRelation: '천뢰 관계',
  earthMountainRelation: '지산 관계',
  earthLakeRelation: '지택 관계',
  earthFireRelation: '지화 관계',
  earthWindRelation: '지풍 관계',
  earthWaterRelation: '지수 관계',
  earthThunderRelation: '지뢰 관계',

  // Yin-Yang Balance Relations
  yinYangIdeal: '음양 이상',
  yinYangBalanced: '음양 균형',
  yinYangInverted: '음양 역전',
  yinYangNoFeature: '음양 특징 없음',
  fiveElementsNoFeature: '오행 특징 없음',

  // Changing Lines Analysis
  noChangingLines: '변효 없음',
  oneChangingLine: '1변효',
  twoChangingLines: '2변효',
  threeChangingLines: '3변효',
  manyChangingLines: '다수 변효',
  changingLinesUnknown: '변효 불명',

  // Lines Yin-Yang Balance
  yinYangBalancedHarmony: '음양 균형 조화',
  yangMoreThanYin: '양효가 음효보다 많음',
  yinMoreThanYang: '음효가 양효보다 많음',
  yangExtreme: '양효 극단',
  yinExtreme: '음효 극단',

  // Special Line Combinations
  allYangHexagram: '전양괘',
  allYinHexagram: '전음괘',
  middlePosition: '중위',

  // Position Structure Analysis
  lines34Harmony: '삼사효 조화',
  lines34Gentle: '삼사효 온화',
  lines16Correspondence: '일육효 대응',
  lines25Correspondence: '이오효 대응',
  positionStructureNoFeature: '위치 구조 특징 없음',

  // Special Changing Positions Analysis
  firstLineChange: '초효 변화',
  sixthLineChange: '상효 변화',
  secondLineChange: '이효 변화',
  fifthLineChange: '오효 변화',
  thirdOrFourthLineChange: '삼효 또는 사효 변화',
  hexagramChangeNoFeature: '괘 변화 특징 없음',

  // Changing Lines Cases
  generalCase: '일반 케이스',
  staticHexagram: '정괘',
  singleLineChange: '단효 변화',
  doubleLineChange: '쌍효 변화',
  tripleLineChange: '삼효 변화',
  multipleLineChange: '다효 변화',

  // Line Type Weights
  oldYangDesc: '노양 설명',
  youngYangDesc: '소양 설명',
  youngYinDesc: '소음 설명',
  oldYinDesc: '노음 설명',

  // Special Combinations
  pureYangHexagram: '순양괘',
  pureYinHexagram: '순음괘',
  taiHexagram: '태괘',
  piHexagram: '비괘',
  jiJiHexagram: '기제괘',
  weiJiHexagram: '미제괘',
  fengHexagram: '풍괘',
  kunHexagram: '곤괘',
  noSpecialCombination: '특수 조합 없음',

  // Special Combination Adjustment
  specialCombinationAdjustmentLabel: '특수 조합 조정',

  // Extreme Changing Cases
  qianAllChange: '건전변',
  kunAllChange: '곤전변',
  middleFourChange: '중사효 변',
  jumpingChange: '도약 변화',
  yongJiu: '용구',
  yongLiu: '용육',
  fourLineChange: '사효 변화',
  jumpingLineChange: '도약 효 변화',

  // Overall Advice
  hexagramTextGood: '괘사 길',
  hexagramTextBad: '괘사 흉',
  trigramGood: '삼효 길',
  trigramBad: '삼효 흉',
  linesGood: '효 길',
  linesBad: '효 흉',

  // Special Line Combinations
  middlePositionDesc: '중위 설명',
  allYangDesc: '전양 설명',
  allYinDesc: '전음 설명',
  properPositionDesc: '당위 설명',
  improperPositionDesc: '부당위 설명',

  // Special Hexagram Changes
  qianToKun: '건에서 곤으로',
  kunToQian: '곤에서 건으로',
  taiToPi: '태에서 비로',
  piToTai: '비에서 태로',
  jiJiToWeiJi: '기제에서 미제로',
  weiJiToJiJi: '미제에서 기제로',
  qianKunConversion: '건곤 전환',
  taiPiConversion: '태비 전환',
  jiWeiConversion: '기미 전환',

  // Detailed Analysis Content
  detailedStrengthsHexagram: '상세 강점 괘',
  detailedStrengthsTrigram: '상세 강점 삼효',
  detailedStrengthsLines: '상세 강점 효',
  detailedWeaknessesHexagram: '상세 약점 괘',
  detailedWeaknessesTrigram: '상세 약점 삼효',
  detailedWeaknessesLines: '상세 약점 효',
  detailedOpportunitiesHexagram: '상세 기회 괘',
  detailedOpportunitiesTrigram: '상세 기회 삼효',
  detailedOpportunitiesLines: '상세 기회 효',
  detailedThreatsHexagram: '상세 위협 괘',
  detailedThreatsTrigram: '상세 위협 삼효',
  detailedThreatsLines: '상세 위협 효',

  // Trigram Names
  trigramQian: '건',
  trigramKun: '곤',
  trigramZhen: '진',
  trigramKan: '감',
  trigramGen: '간',
  trigramXun: '손',
  trigramLi: '이',
  trigramDui: '태',

  // Trigram Natures
  natureHeaven: '천',
  natureEarth: '지',
  natureThunder: '뢰',
  natureWater: '수',
  natureMountain: '산',
  natureWind: '풍',
  natureFire: '화',
  natureLake: '택',

  // Trigram Qualities
  qualityFirm: '강건',
  qualityGentle: '유순',
  qualityMoving: '동',
  qualityDangerous: '험',
  qualityStill: '지',
  qualityObedient: '종',
  qualityClinging: '부',
  qualityJoyful: '열',

  // Five Elements
  elementMetal: '금',
  elementWood: '목',
  elementWater: '수',
  elementFire: '화',
  elementEarth: '토',

  // Line Positions
  lineFirst: '초효',
  lineSecond: '이효',
  lineThird: '삼효',
  lineFourth: '사효',
  lineFifth: '오효',
  lineSixth: '상효',

  // Line Position Types
  positionLowest: '최하위',
  positionLowerMiddle: '하중위',
  positionLowerUpper: '하상위',
  positionUpperLower: '상하위',
  positionUpperMiddle: '상중위',
  positionHighest: '최상위',

  // Line Natures
  natureBeginning: '초',
  natureMiddle: '중',
  natureDangerous2: '험',
  natureAuspicious: '길',
  natureEnd: '종',

  // Weight Calculation Text
  originalHexagramScore: '본괘 점수',
  changedHexagramScore: '변괘 점수',
  combinedScore: '결합 점수',
  originalHexagramAnalysis: '본괘 분석',
  changedHexagramAnalysis: '변괘 분석',
  weightPercentage: '가중치 비율',

  // Position Analysis Text
  properPosition: '당위',
  improperPosition: '부당위',
  pointsText2: '점',

  // Hexagram Display Text
  clickToStart: '시작하려면 클릭',
  hexagramNumberWithSuffix: '제{0}괘',

  // Hexagram Result Text
  daxiangImageAlt: '대상 이미지',
  yongJiuLabel: '용구',
  yongLiuLabel: '용육',

  // Auth Button Fallback Text
  logoutFallback: '로그아웃',
  signInFallback: '로그인',

  // Hexagram Name Format
  hexagramNameFormat: '{0} - {1}',

  // Question Label
  yourQuestionLabel: '당신의 질문',

  // Footer
  footer: '© 2024 디지털 역경',

  // Language selector
  selectLanguage: '언어 선택',
  languages: {
    en: 'English',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    es: 'Español',
    ja: '日本語',
    ko: '한국어'
  },

  // Authentication
  signIn: '로그인',
  logout: '로그아웃',
  loginRequired: '로그인이 필요합니다',
  loginToSave: '저장하려면 로그인하세요',

  // History
  history: '기록',
  noHistory: '기록이 없습니다',
  viewHistory: '기록 보기',
  clearHistory: '기록 지우기',
  historyRecord: '기록',
  deleteHistory: '삭제',
  deleteConfirm: '이 기록을 삭제하시겠습니까?',
  deleteSuccess: '기록이 성공적으로 삭제되었습니다',
  deleteError: '삭제 실패, 다시 시도해주세요',
  historyOriginalHexagram: '본괘',
  historyChangedHexagram: '변괘',
  justNow: '방금',
  minutesAgo: '분 전',
  hoursAgo: '시간 전',
  yesterday: '어제',
  daysAgo: '일 전'
};
