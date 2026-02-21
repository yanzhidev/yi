import type { Language } from './i18n';
import { translations } from './i18n';

// 爻位关系解读的多语言内容
export interface LineRelationsTranslations {
  // 当位解读文本
  yangInYangPosition: string;      // 阳爻居阳位
  yinInYinPosition: string;        // 阴爻居阴位
  yangInYinPosition: string;       // 阳爻居阴位
  yinInYangPosition: string;       // 阴爻居阳位
  
  // 相应关系文本
  yinYangCorrespondence: string;   // 阴阳相应
  sameGenderRepulsion: string;     // 同性相斥
  noExternalResponseButDangWei: string; // 虽无外应，但自身得位得正，可稳中求进
  
  // 承乘关系文本
  yinSupportsYang: string;         // 阴承阳：柔承刚，柔顺承托刚健
  yangSupportsYin: string;         // 阳承阴：刚承柔，刚强承托柔弱
  yangSupportsYang: string;        // 阳承阳：刚承刚，以刚承刚
  yinSupportsYin: string;          // 阴承阴：柔承柔，以柔承柔
  
  yinRidesYang: string;            // 阴乘阳：柔乘刚，阴柔乘凌阳刚
  yangRidesYin: string;            // 阳乘阴：刚乘柔，阳刚驾御阴柔
  yangRidesYang: string;           // 阳乘阳：刚乘刚，以刚驾刚
  yinRidesYin: string;             // 阴乘阴：柔乘柔，以柔驾柔
  
  // 承乘关系详细解释
  yinSupportsYangDesc: string;     // 阴承阳详细解释
  yinRidesYangDesc: string;       // 阴乘阳详细解释
  
  noSpecialRelation: string;       // 无特殊承乘关系
  
  // 爻位现代解读
  position1Yang: string;           // 初爻阳爻
  position1Yin: string;            // 初爻阴爻
  position2Yang: string;           // 二爻阳爻
  position2Yin: string;            // 二爻阴爻
  position3Yang: string;           // 三爻阳爻
  position3Yin: string;            // 三爻阴爻
  position4Yang: string;           // 四爻阳爻
  position4Yin: string;            // 四爻阴爻
  position5Yang: string;           // 五爻阳爻
  position5Yin: string;            // 五爻阴爻
  position6Yang: string;           // 六爻阳爻
  position6Yin: string;            // 六爻阴爻
  
  // 爻位名称
  positionNames: string[];         // 初、二、三、四、五、上
  
  // 从i18n.ts获取的翻译
  lineCharacter: string;           // 爻字
  inContextOf: string;             // 的背景下
  yangLineSuffix: string;          // 九 (阳爻后缀)
  yinLineSuffix: string;           // 六 (阴爻后缀)
}

export const lineRelationsTranslations: Record<Language, LineRelationsTranslations> = {
  'en': {
    yangInYangPosition: 'Yang line in yang position, proper and upright, with abundant energy and righteous conduct',
    yinInYinPosition: 'Yin line in yin position, proper and upright, gentle and moderate, handling matters appropriately',
    yangInYinPosition: 'Yang line in yin position, improper, with excessive rigidity, requiring gentleness and moderation',
    yinInYangPosition: 'Yin line in yang position, improper, with insufficient gentleness, requiring firmness and support',
    
    yinYangCorrespondence: 'Yin and Yang correspond, internal and external coordination, beneficial signs',
    sameGenderRepulsion: 'Same gender repels each other, lacks response, need to actively seek support',
    noExternalResponseButDangWei: 'Although no external response, but properly positioned, can advance steadily',
    
    // 承
    yinSupportsYang: '⚖️ Yin supports Yang: gentleness supports strength - harmonious support, auspicious',
    yangSupportsYin: '⚠️ Yang supports Yin: strength supports gentleness - subordinate position, improper',
    yangSupportsYang: '⚔️ Yang supports Yang: strength supports strength - two forces confront, competitive',
    yinSupportsYin: '🌱 Yin supports Yin: gentleness supports gentleness - mutual weakness, insufficient',
    
    // 乘
    yinRidesYang: '❗ Yin rides Yang: gentleness rides strength - overstepping, most inauspicious',
    yangRidesYin: '✓ Yang rides Yin: strength rides gentleness - proper control, auspicious',
    yangRidesYang: '⚡ Yang rides Yang: strength rides strength - two forces clash, conflicts',
    yinRidesYin: '💧 Yin rides Yin: gentleness rides gentleness - weak authority, insufficient',
    
    // 承乘关系详细解释
    yinSupportsYangDesc: 'Yin line below supports Yang line above, like minister assisting ruler, wife helping husband, harmonious submission',
    yinRidesYangDesc: 'Yin line above rides Yang line below, like wife controlling husband, minister deceiving ruler, overstepping inauspicious',
    
    noSpecialRelation: 'No special support-riding relationship',
    
    position1Yang: 'represents the initial stage of matters, like the rising sun. At this time, one should seize opportunities, act actively, and lay the foundation for future development',
    position1Yin: 'represents the budding stage of matters, like a seed sprouting. At this time, one should maintain humility, accumulate strength, and avoid premature display of prowess',
    position2Yang: 'represents the emerging development stage, like the sun at its zenith. At this time, one should display talents, act proactively, but maintain the middle path',
    position2Yin: 'represents the gentle development stage, like a full moon night. At this time, one should overcome hardness with softness, follow the trend, and seek support from noble people',
    position3Yang: 'represents the striving stage, like climbing mountains. At this time, one should persevere, overcome difficulties, but pay attention to methods and strategies',
    position3Yin: 'represents the cautious advancement stage, like crossing water. At this time, one should proceed step by step, assess the situation, and avoid reckless risks',
    position4Yang: 'represents the assistant-to-ruler stage, like left and right arms. At this time, one should fulfill duties loyally, assist superiors, but avoid overstepping authority',
    position4Yin: 'represents the gentle assistance stage, like a virtuous inner helper. At this time, one should support silently, assist with gentility, and play a role behind the scenes',
    position5Yang: 'represents the peak prosperity stage, like a ruler governing. At this time, one should grasp the overall situation, make fair decisions, and exercise leadership',
    position5Yin: 'represents the gentle centrality stage, like an enlightened ruler with benevolent governance. At this time, one should win people over with virtue, treat others generously, and gain popular support',
    position6Yang: 'represents the final stage of matters, like retiring after success. At this time, one should know when to stop, summarize experiences, and prepare for new beginnings',
    position6Yin: 'represents the perfect completion stage, like the moon waning after fullness. At this time, one should be content with what one has, retreat from the tide of success, and avoid decline after prosperity',
    
    positionNames: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'],
    lineCharacter: translations.en.lineCharacter,
    inContextOf: translations.en.inContextOf,
    yangLineSuffix: 'Nine',
    yinLineSuffix: 'Six'
  },

  'zh-CN': {
    yangInYangPosition: '阳爻居阳位，得位得正，力量充沛，行事光明正大',
    yinInYinPosition: '阴爻居阴位，得位得正，柔顺中正，处事安稳得当',
    yangInYinPosition: '阳爻居阴位，失位，有刚强过甚之嫌，需要柔顺调和',
    yinInYangPosition: '阴爻居阳位，失位，有柔弱不足之虑，需要刚健辅助',
    
    yinYangCorrespondence: '阴阳相应，内外协调，有助益之象',
    sameGenderRepulsion: '同性相斥，缺乏呼应，需主动寻求支援',
    noExternalResponseButDangWei: '虽无外应，但自身得位得正，可稳中求进',
    
    // 承
    yinSupportsYang: '⚖️ 阴承阳：柔承刚 - 顺承得助，吉',
    yangSupportsYin: '⚠️ 阳承阴：刚承柔 - 屈居其下，位不当',
    yangSupportsYang: '⚔️ 阳承阳：刚承刚 - 两刚相峙，多竞争',
    yinSupportsYin: '🌱 阴承阴：柔承柔 - 两柔相扶，力不足',
    
    // 乘
    yinRidesYang: '❗ 阴乘阳：柔乘刚 - 僭越不顺，最凶',
    yangRidesYin: '✓ 阳乘阴：刚乘柔 - 统御得宜，吉',
    yangRidesYang: '⚡ 阳乘阳：刚乘刚 - 两刚相敌，多冲突',
    yinRidesYin: '💧 阴乘阴：柔乘柔 - 柔弱相凌，威权不足',
    
    // 承乘关系详细解释
    yinSupportsYangDesc: '阴爻在下承托阳爻，如臣辅君、妻助夫，柔顺得宜之象',
    yinRidesYangDesc: '阴爻在上乘凌阳爻，如妇制夫、臣欺君，僭越不顺之象',
    noSpecialRelation: '无特殊承乘关系',
    
    position1Yang: '初爻为事物初始阶段，如朝阳初升。此时应把握机遇，积极行动，为后续发展奠定基础',
    position1Yin: '初爻为事物萌芽阶段，如种子初发。此时应保持谦逊，积蓄力量，不宜过早显露锋芒',
    position2Yang: '二爻为显现发展阶段，如日中天。此时应展现才能，积极进取，但要保持中正之道',
    position2Yin: '二爻为柔顺发展阶段，如月圆之夜。此时应以柔克刚，顺应时势，寻求贵人相助',
    position3Yang: '三爻为努力奋斗阶段，如登山越岭。此时应坚持不懈，克服困难，但要注意方法策略',
    position3Yin: '三爻为谨慎前行阶段，如涉水过河。此时应步步为营，审时度势，避免冒进风险',
    position4Yang: '四爻为近君辅佐阶段，如左膀右臂。此时应忠诚履职，协助上级，但不可越权行事',
    position4Yin: '四爻为柔顺辅佐阶段，如贤内助。此时应默默支持，以柔辅刚，在幕后发挥作用',
    position5Yang: '五爻为中正鼎盛阶段，如君王临朝。此时应把握全局，公正决策，发挥领导才能',
    position5Yin: '五爻为柔中居正阶段，如明君仁政。此时应以德服人，宽厚待人，赢得众人拥护',
    position6Yang: '六爻为事物终局阶段，如功成身退。此时应见好就收，总结经验，为新的开始做准备',
    position6Yin: '六爻为圆满收官阶段，如月满则亏。此时应知足常乐，急流勇退，避免盛极而衰',
    
    positionNames: ['初', '二', '三', '四', '五', '上'],
    lineCharacter: translations['zh-CN'].lineCharacter,
    inContextOf: translations['zh-CN'].inContextOf,
    yangLineSuffix: '九',
    yinLineSuffix: '六'
  },

  'zh-TW': {
    yangInYangPosition: '陽爻居陽位，得位得正，力量充沛，行事光明正大',
    yinInYinPosition: '陰爻居陰位，得位得正，柔順中正，處事安穩得當',
    yangInYinPosition: '陽爻居陰位，失位，有剛強過甚之嫌，需要柔順調和',
    yinInYangPosition: '陰爻居陽位，失位，有柔弱不足之慮，需要剛健輔助',
    
    yinYangCorrespondence: '陰陽相應，內外協調，有助益之象',
    sameGenderRepulsion: '同性相斥，缺乏呼應，需主動尋求支援',
    noExternalResponseButDangWei: '雖無外應，但自身得位得正，可穩中求進',
    
    // 承
    yinSupportsYang: '⚖️ 陰承陽：柔承剛 - 順承得助，吉',
    yangSupportsYin: '⚠️ 陽承陰：剛承柔 - 屈居其下，位不當',
    yangSupportsYang: '⚔️ 陽承陽：剛承剛 - 兩剛相峙，多競爭',
    yinSupportsYin: '🌱 陰承陰：柔承柔 - 兩柔相扶，力不足',
    
    // 乘
    yinRidesYang: '❗ 陰乘陽：柔乘剛 - 僭越不順，最凶',
    yangRidesYin: '✓ 陽乘陰：剛乘柔 - 統御得宜，吉',
    yangRidesYang: '⚡ 陽乘陽：剛乘剛 - 兩剛相敵，多衝突',
    yinRidesYin: '💧 陰乘陰：柔乘柔 - 柔弱相凌，威權不足',
    
    // 承乘关系详细解释
    yinSupportsYangDesc: '陰爻在下承托陽爻，如臣輔君、妻助夫，柔順得宜之象',
    yinRidesYangDesc: '陰爻在上乘凌陽爻，如婦制夫、臣欺君，僭越不順之象',
    noSpecialRelation: '無特殊承乘關係',
    
    position1Yang: '初爻為事物初始階段，如朝陽初升。此時應把握機遇，積極行動，為後續發展奠定基礎',
    position1Yin: '初爻為事物萌芽階段，如種子初發。此時應保持謙遜，積蓄力量，不宜過早顯露鋒芒',
    position2Yang: '二爻為顯現發展階段，如日中天。此時應展現才能，積極進取，但要保持中正之道',
    position2Yin: '二爻為柔順發展階段，如月圓之夜。此時應以柔克剛，順應時勢，尋求貴人相助',
    position3Yang: '三爻為努力奮鬥階段，如登山越嶺。此時應堅持不懈，克服困難，但要注意方法策略',
    position3Yin: '三爻為謹慎前行階段，如涉水過河。此時應步步為營，審時度勢，避免冒進風險',
    position4Yang: '四爻為近君輔佐階段，如左膀右臂。此時應忠誠履職，協助上級，但不可越權行事',
    position4Yin: '四爻為柔順輔佐階段，如賢內助。此時應默默支持，以柔輔剛，在幕後發揮作用',
    position5Yang: '五爻為中正鼎盛階段，如君王臨朝。此時應把握全局，公正決策，發揮領導才能',
    position5Yin: '五爻為柔中居正階段，如明君仁政。此時應以德服人，寬厚待人，贏得眾人擁護',
    position6Yang: '六爻為事物終局階段，如功成身退。此時應見好就收，總結經驗，為新的開始做準備',
    position6Yin: '六爻為圓滿收官階段，如月滿則虧。此時應知足常樂，急流勇退，避免盛極而衰',
    
    positionNames: ['初', '二', '三', '四', '五', '上'],
    lineCharacter: translations['zh-TW'].lineCharacter,
    inContextOf: translations['zh-TW'].inContextOf,
    yangLineSuffix: '九',
    yinLineSuffix: '六'
  },

  'es': {
    yangInYangPosition: 'Línea yang en posición yang, apropiada y recta, con energía abundante y conducta recta',
    yinInYinPosition: 'Línea yin en posición yin, apropiada y recta, suave y moderada, manejando asuntos apropiadamente',
    yangInYinPosition: 'Línea yang en posición yin, inapropiada, con rigidez excesiva, requiriendo suavidad y moderación',
    yinInYangPosition: 'Línea yin en posición yang, inapropiada, con suavidad insuficiente, requiriendo firmeza y apoyo',
    
    yinYangCorrespondence: 'se corresponden entre sí en armonía yin-yang, con coordinación interna y externa, indicando beneficio mutuo',
    sameGenderRepulsion: 'se repelen debido al mismo género, careciendo de resonancia, requiriendo búsqueda activa de apoyo',
    noExternalResponseButDangWei: 'Aunque sin respuesta externa, pero correctamente posicionado, puede avanzar steady',
    
    // 承
    yinSupportsYang: '⚖️ Yin apoya Yang: suavidad apoya fuerza - apoyo armonioso, auspicioso',
    yangSupportsYin: '⚠️ Yang apoya Yin: fuerza apoya suavidad - posición subordinada, inapropiado',
    yangSupportsYang: '⚔️ Yang apoya Yang: fuerza apoya fuerza - dos fuerzas confrontan, competitivo',
    yinSupportsYin: '🌱 Yin apoya Yin: suavidad apoya suavidad - debilidad mutua, insuficiente',
    
    // 乘
    yinRidesYang: '❗ Yin monta Yang: suavidad monta fuerza - sobrepasamiento, muy inauspicioso',
    yangRidesYin: '✓ Yang monta Yin: fuerza monta suavidad - control apropiado, auspicioso',
    yangRidesYang: '⚡ Yang monta Yang: fuerza monta fuerza - dos fuerzas chocan, conflictos',
    yinRidesYin: '💧 Yin monta Yin: suavidad monta suavidad - autoridad débil, insuficiente',
    
    // 承乘关系详细解释
    yinSupportsYangDesc: 'Línea Yin abajo apoya línea Yang arriba, como ministro asistiendo gobernante, esposa ayudando esposo, sumisión armoniosa',
    yinRidesYangDesc: 'Línea Yin arriba monta línea Yang abajo, como esposa controlando esposo, ministro engañando gobernante, sobrepasamiento inauspicioso',
    noSpecialRelation: 'Sin relación especial de soporte-montura',
    
    position1Yang: 'representa la etapa inicial de los asuntos, como el sol naciente. En este momento, uno debe aprovechar oportunidades, actuar activamente, y sentar las bases para el desarrollo futuro',
    position1Yin: 'representa la etapa de brote de los asuntos, como una semilla germinando. En este momento, uno debe mantener la humildad, acumular fuerza, y evitar mostrar prematuramente el poderío',
    position2Yang: 'representa la etapa de desarrollo emergente, como el sol en su cenit. En este momento, uno debe mostrar talentos, actuar proactivamente, pero mantener el camino medio',
    position2Yin: 'representa la etapa de desarrollo suave, como una noche de luna llena. En este momento, uno debe superar la dureza con suavidad, seguir la tendencia, y buscar apoyo de personas nobles',
    position3Yang: 'representa la etapa de esfuerzo, como escalar montañas. En este momento, uno debe perseverar, superar dificultades, pero prestar atención a métodos y estrategias',
    position3Yin: 'representa la etapa de avance cauteloso, como cruzar aguas. En este momento, uno debe proceder paso a paso, evaluar la situación, y evitar riesgos imprudentes',
    position4Yang: 'representa la etapa de asistente al gobernante, como brazos izquierdo y derecho. En este momento, uno debe cumplir deberes lealmente, asistir a superiores, pero evitar sobrepasar la autoridad',
    position4Yin: 'representa la etapa de asistencia suave, como una ayudante interna virtuosa. En este momento, uno debe apoyar silenciosamente, asistir con suavidad, y jugar un rol detrás de escena',
    position5Yang: 'representa la etapa de prosperidad máxima, como un gobernante dirigiendo. En este momento, uno debe captar la situación general, tomar decisiones justas, y ejercer liderazgo',
    position5Yin: 'representa la etapa de centralidad suave, como un gobernante ilustrado con gobierno benevolente. En este momento, uno debe ganar a la gente con virtud, tratar a otros generosamente, y ganar apoyo popular',
    position6Yang: 'representa la etapa final de los asuntos, como retirarse tras el éxito. En este momento, uno debe saber cuándo detenerse, resumir experiencias, y prepararse para nuevos comienzos',
    position6Yin: 'representa la etapa de finalización perfecta, como la luna menguando después de la plenitud. En este momento, uno debe estar contento con lo que tiene, retirarse de la marea del éxito, y evitar el declive tras la prosperidad',
    
    positionNames: ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta', 'Sexta'],
    lineCharacter: translations.es.lineCharacter,
    inContextOf: translations.es.inContextOf,
    yangLineSuffix: 'Nueve',
    yinLineSuffix: 'Seis'
  },

  'ja': {
    yangInYangPosition: '陽爻が陽位にあり、適切で正しく、エネルギーが充実し、行いが光明正大',
    yinInYinPosition: '陰爻が陰位にあり、適切で正しく、柔和で中正、物事を安定的に処理',
    yangInYinPosition: '陽爻が陰位にあり、不適切で、剛強すぎる傾向があり、柔和な調和が必要',
    yinInYangPosition: '陰爻が陽位にあり、不適切で、柔弱不足の懸念があり、剛健な補助が必要',
    
    yinYangCorrespondence: '陰陽が応じ、内外が調和し、助け合う象',
    sameGenderRepulsion: '同性が互いに反発し、共鳴に欠け、積極的な支援を求める必要あり',
    noExternalResponseButDangWei: '外部からの応答はないが、自身は適切な位置にあり、安定の中で前進可能',
    
    // 承
    yinSupportsYang: '⚖️ 陰が陽を承く：柔が剛を支える - 調和の取れた支持、吉',
    yangSupportsYin: '⚠️ 陽が陰を承く：剛が柔を支える - 下位に立ち、不適切',
    yangSupportsYang: '⚔️ 陽が陽を承く：剛が剛を支える - 二つの剛が対峙、競争的',
    yinSupportsYin: '🌱 陰が陰を承く：柔が柔を支える - 相互の弱さ、不足',
    
    // 乗
    yinRidesYang: '❗ 陰が陽に乗る：柔が剛に乗る - 僭越不順、最凶',
    yangRidesYin: '✓ 陽が陰に乗る：剛が柔に乗る - 適切な統御、吉',
    yangRidesYang: '⚡ 陽が陽に乗る：剛が剛に乗る - 二つの剛が衝突、対立',
    yinRidesYin: '💧 陰が陰に乗る：柔が柔に乗る - 柔弱な威権、不足',
    
    // 承乗関係詳細説明
    yinSupportsYangDesc: '陰爻が下で陽爻を支え、臣が君を補い、妻が夫を助ける如く、柔和順調の象',
    yinRidesYangDesc: '陰爻が上で陽爻に乗り、妻が夫を制し、臣が君を欺く如く、僭越不順の象',
    noSpecialRelation: '特殊な承乗関係なし',
    
    position1Yang: '物事の初期段階を表し、朝日が昇る如し。この時、機会を掴み、積極的に行動し、今後の発展の基礎を築くべき',
    position1Yin: '物事の萌芽段階を表し、種子が発芽する如し。この時、謙虚を保ち、力を蓄え、早まって鋭さを現すべきでない',
    position2Yang: '顕在的な発展段階を表し、太陽が天中にある如し。この時、才能を発揮し、積極的に進むべきだが、中正の道を保つべき',
    position2Yin: '柔和な発展段階を表し、月夜の如し。この時、柔で剛を制し、時勢に従い、貴人の助けを求めるべき',
    position3Yang: '努力奮闘段階を表し、山を登る如し。この時、忍耐強く、困難を克服すべきだが、方法と戦略に注意すべき',
    position3Yin: '慎重前進段階を表し、水を渡る如し。この時、一歩一歩進み、時勢を判断し、無謀な冒険を避けるべき',
    position4Yang: '君に近く補佐する段階を表し、左腕右腕の如し。この時、忠実に職務を果たし、上級者を補助すべきだが、権限を越えて行動すべきでない',
    position4Yin: '柔和に補佐する段階を表し、賢内助の如し。この時、静かに支持し、柔で剛を補い、幕后で役割を果たすべき',
    position5Yang: '中正鼎盛段階を表し、君王が朝廷に臨む如し。この時、全局を把握し、公正に決断し、リーダーシップを発揮すべき',
    position5Yin: '柔中居正段階を表し、明君が仁政を行う如し。この時、徳で人を服させ、人に寛厚に接し、大衆の支持を得るべき',
    position6Yang: '物事の終局段階を表し、成功後に身を引く如し。この時、見好就収し、経験を総括し、新しい始まりの準備をすべき',
    position6Yin: '円満收官段階を表し、月満則亏の如し。この時、足るを知り、流れから退き、盛極而衰を避けるべき',
    
    positionNames: ['初', '二', '三', '四', '五', '上'],
    lineCharacter: translations.ja.lineCharacter,
    inContextOf: translations.ja.inContextOf,
    yangLineSuffix: '九',
    yinLineSuffix: '六'
  },

  'ko': {
    yangInYangPosition: '양효가 양위에 있고, 적절하고 바르며, 기운이 충만하고 행동이 정대',
    yinInYinPosition: '음효가 음위에 있고, 적절하고 바르며, 유순하고 중정하며, 일을 안정적으로 처리',
    yangInYinPosition: '양효가 음위에 있고, 부적절하며, 강강함이 지나치고, 유순한 조화가 필요',
    yinInYangPosition: '음효가 양위에 있고, 부적절하며, 유약함이 부족하고, 강건한 보조가 필요',
    
    yinYangCorrespondence: '음양이 응하고, 내외가 조화하며, 서로 돕는 상',
    sameGenderRepulsion: '동성이 서로 반발하고, 공명이 부족하며, 적극적인 지원을 구해야 함',
    noExternalResponseButDangWei: '외부의 응답은 없지만, 자신은 적절한 위치에 있고, 안정 속에서 전진 가능',
    
    // 승
    yinSupportsYang: '⚖️ 음이 양을 승함：유가 강을 지킴 - 조화로운 지지, 길',
    yangSupportsYin: '⚠️ 양이 음을 승함：강이 유를 지킴 - 하위에 서고, 부적절',
    yangSupportsYang: '⚔️ 양이 양을 승함：강이 강을 지킴 - 두 강이 대치, 경쟁적',
    yinSupportsYin: '🌱 음이 음을 승함：유가 유를 지킴 - 상호 약점, 부족',
    
    // 승
    yinRidesYang: '❗ 음이 양에 승함：유가 강에 승함 - 참월 불순, 최흉',
    yangRidesYin: '✓ 양이 음에 승함：강이 유에 승함 - 적절한 통어, 길',
    yangRidesYang: '⚡ 양이 양에 승함：강이 강에 승함 - 두 강이 충돌, 대립',
    yinRidesYin: '💧 음이 음에 승함：유가 유에 승함 - 유약한 위권, 부족',
    
    // 승승 관계 상세 설명
    yinSupportsYangDesc: '음효가 아래에서 양효를 지지하고, 신이 군주를 보좌하며, 아내가 남편을 돕는 것과 같이, 유순 순조의 상',
    yinRidesYangDesc: '음효가 위에서 양효에 승하고, 아내가 남편을 제어하며, 신하가 군주를 속이는 것과 같이, 참월 불순의 상',
    noSpecialRelation: '특수한 승승 관계 없음',
    
    position1Yang: '사물의 초기 단계를 나타내며, 아침 해가 뜨는 것과 같음. 이때, 기회를 잡고, 적극적으로 행동하며, 앞으로 발전의 기초를 다져야 함',
    position1Yin: '사물의 맹아 단계를 나타내며, 씨앗이 발아하는 것과 같음. 이때, 겸손을 유지하고, 힘을 축적하며, 이르게 예리함을 나타내지 말아야 함',
    position2Yang: '현저한 발전 단계를 나타내며, 태양이 하늘 중앙에 있는 것과 같음. 이때, 재능을 발휘하고, 적극적으로 나아가야 하지만, 중정의 도를 유지해야 함',
    position2Yin: '유순한 발전 단계를 나타내며, 달밤의 것과 같음. 이때, 유로 강을 제어하고, 시세를 따르며, 귀인의 도움을 구해야 함',
    position3Yang: '노력 분투 단계를 나타내며, 산을 오르는 것과 같음. 이때, 인내심 있게, 어려움을 극복해야 하지만, 방법과 전략에 주의해야 함',
    position3Yin: '신중 전진 단계를 나타내며, 물을 건너는 것과 같음. 이때, 한 걸음 한 걸음 나아가고, 시세를 판단하며, 무모한 모험을 피해야 함',
    position4Yang: '군주에게 가까이 보좌하는 단계를 나타내며, 왼팔 오른팔의 것과 같음. 이때, 충실하게 직무를 수행하고, 상급자를 보좌해야 하지만, 권한을 넘어 행동해서는 안 됨',
    position4Yin: '유순하게 보좌하는 단계를 나타내며, 현명한 내조의 것과 같음. 이때, 조용히 지지하고, 유로 강을 보좌하며, 막후에서 역할을 해야 함',
    position5Yang: '중정 정성 단계를 나타내며, 군왕이 조정에 임하는 것과 같음. 이때, 전체 상황을 파악하고, 공정하게 결단하며, 리더십을 발휘해야 함',
    position5Yin: '유중 거정 단계를 나타내며, 현명한 군주가 인정을 행하는 것과 같음. 이때, 덕으로 사람을 복종시키고, 사람에게 관후하게 대하며, 대중의 지지를 얻어야 함',
    position6Yang: '사물의 종국 단계를 나타내며, 성공 후에 물러서는 것과 같음. 이때, 만족할 줄 알고, 경험을 총괄하며, 새로운 시작의 준비를 해야 함',
    position6Yin: '원만 수관 단계를 나타내며, 달이 차면 이지러지는 것과 같음. 이때, 만족할 줄 알고, 흐름에서 물러서며, 성극이쇠를 피해야 함',
    
    positionNames: ['초', '이', '삼', '사', '오', '상'],
    lineCharacter: translations.ko.lineCharacter,
    inContextOf: translations.ko.inContextOf,
    yangLineSuffix: '구',
    yinLineSuffix: '육'
  }
};

// 获取当前语言的爻位关系翻译
export function getLineRelationsTranslations(language: Language): LineRelationsTranslations {
  return lineRelationsTranslations[language] || lineRelationsTranslations['zh-CN'];
}
