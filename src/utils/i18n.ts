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
