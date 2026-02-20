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
  keyInterpretationNote: string; // 解读提示说明
  interpretationRules: string; // 重点解读规则说明

  // Manual Input
  manualInputTitle: string; // 手动摇卦输入
  manualInputDescription: string; // 手动输入说明
  oldYang: string; // 老阳
  youngYang: string; // 少阳
  youngYin: string; // 少阴
  oldYin: string; // 老阴

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
    keyInterpretationNote: 'Key interpretation based on changing lines',
    interpretationRules: '0变爻:看本卦卦辞 | 1变爻:看该爻爻辞 | 2变爻:看两爻，以上爻为主 | 3变爻:看本卦+变卦卦辞 | 4变爻:看变卦下爻 | 5变爻:看变卦不变爻 | 6变爻:乾坤看用九/用六，其余看变卦卦辞',
    manualInputTitle: 'Manual Hexagram Input',
    manualInputDescription: 'Please select coin toss results for each line from bottom to top',
    oldYang: 'Old Yang',
    youngYang: 'Young Yang',
    youngYin: 'Young Yin',
    oldYin: 'Old Yin',
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
    footer: 'Sincerity brings clarity · Follow the natural way',
    selectLanguage: 'Language',
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
    keyInterpretationNote: '根据变爻数量的重点解读',
    interpretationRules: '0变爻:看本卦卦辞 | 1变爻:看该爻爻辞 | 2变爻:看两爻，以上爻为主 | 3变爻:看本卦+变卦卦辞 | 4变爻:看变卦下爻 | 5变爻:看变卦不变爻 | 6变爻:乾坤看用九/用六，其余看变卦卦辞',
    manualInputTitle: '手动摇卦输入',
    manualInputDescription: '请按照从下到上的顺序，为每一爻选择铜钱投掷结果',
    oldYang: '老阳',
    youngYang: '少阳',
    youngYin: '少阴',
    oldYin: '老阴',
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
    footer: '心诚则灵 · 道法自然',
    selectLanguage: '语言',
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
    keyInterpretationNote: '根據變爻數量的重點解讀',
    interpretationRules: '0變爻:看本卦卦辭 | 1變爻:看該爻爻辭 | 2變爻:看兩爻，以上爻為主 | 3變爻:看本卦+變卦卦辭 | 4變爻:看變卦下爻 | 5變爻:看變卦不變爻 | 6變爻:乾坤看用九/用六，其餘看變卦卦辭',
    manualInputTitle: '手動搖卦輸入',
    manualInputDescription: '請按照從下到上的順序，為每一爻選擇銅錢投擲結果',
    oldYang: '老陽',
    youngYang: '少陽',
    youngYin: '少陰',
    oldYin: '老陰',
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
    footer: '心誠則靈 · 道法自然',
    selectLanguage: '語言',
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
    keyInterpretationNote: 'Interpretación clave basada en líneas cambiantes',
    interpretationRules: '0变爻:看本卦卦辞 | 1变爻:看该爻爻辞 | 2变爻:看两爻，以上爻为主 | 3变爻:看本卦+变卦卦辞 | 4变爻:看变卦下爻 | 5变爻:看变卦不变爻 | 6变爻:乾坤看用九/用六，其余看变卦卦辞',
    manualInputTitle: 'Entrada Manual de Hexagrama',
    manualInputDescription: 'Por favor selecciona los resultados del lanzamiento de monedas para cada línea de abajo hacia arriba',
    oldYang: 'Viejo Yang',
    youngYang: 'Joven Yang',
    youngYin: 'Joven Yin',
    oldYin: 'Viejo Yin',
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
    footer: 'La sinceridad trae claridad · Sigue el camino natural',
    selectLanguage: 'Idioma',
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
