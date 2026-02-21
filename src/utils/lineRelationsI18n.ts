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
  
  // 承乘关系文本
  yinSupportsYang: string;         // 阴爻承阳爻
  yinRidesYang: string;            // 阴爻乘阳爻
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
    
    yinYangCorrespondence: 'correspond with each other in yin-yang harmony, with internal and external coordination, indicating mutual benefit',
    sameGenderRepulsion: 'repel each other due to same gender, lacking resonance, requiring active seeking of support',
    
    yinSupportsYang: 'supports the yang line above, with gentle support bringing benefit',
    yinRidesYang: 'rides the yang line below, with gentility over firmness suggesting overstepping',
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
    
    yinSupportsYang: '柔顺承刚，得助之象',
    yinRidesYang: '柔乘刚上，有僭越之嫌',
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
    
    yinSupportsYang: '柔順承剛，得助之象',
    yinRidesYang: '柔乘剛上，有僭越之嫌',
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
    
    yinSupportsYang: 'apoya la línea yang arriba, con apoyo suave trayendo beneficio',
    yinRidesYang: 'monta la línea yang abajo, con suavidad sobre firmeza sugiriendo sobrepasación',
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
  }
};

// 获取当前语言的爻位关系翻译
export function getLineRelationsTranslations(language: Language): LineRelationsTranslations {
  return lineRelationsTranslations[language] || lineRelationsTranslations['zh-CN'];
}
