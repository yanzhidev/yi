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
    yourQuestion: 'Your Question',
    casting: 'Casting...',
    castingDescription: 'Connecting with the energy of heaven and earth, casting the coins...',
    originalHexagram: 'Original Hexagram',
    changedHexagram: 'Changed Hexagram',
    changingLines: 'Changing Lines',
    changingLinesCount: 'changing lines',
    keyInterpretationNote: 'Key interpretation based on changing lines',
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
    yourQuestion: '你所问',
    casting: '起卦中...',
    castingDescription: '正在感应天地之气，投掷铜钱...',
    originalHexagram: '本卦',
    changedHexagram: '变卦',
    changingLines: '变爻',
    changingLinesCount: '个变爻',
    keyInterpretationNote: '根据变爻数量的重点解读',
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
    yourQuestion: '你所問',
    casting: '起卦中...',
    castingDescription: '正在感應天地之氣，投擲銅錢...',
    originalHexagram: '本卦',
    changedHexagram: '變卦',
    changingLines: '變爻',
    changingLinesCount: '個變爻',
    keyInterpretationNote: '根據變爻數量的重點解讀',
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
    yourQuestion: 'Tu Pregunta',
    casting: 'Divinando...',
    castingDescription: 'Conectando con la energía del cielo y la tierra, lanzando las monedas...',
    originalHexagram: 'Hexagrama Original',
    changedHexagram: 'Hexagrama Cambiado',
    changingLines: 'Líneas Cambiantes',
    changingLinesCount: 'líneas cambiantes',
    keyInterpretationNote: 'Interpretación clave basada en líneas cambiantes',
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
