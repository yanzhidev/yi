// 卦象名称多语言映射
export interface HexagramNames {
  [key: number]: {
    'zh-CN': string;
    'zh-TW': string;
    'en': string;
    'es': string;
  };
}

export const hexagramNames: HexagramNames = {
  1: { 'zh-CN': '乾为天', 'zh-TW': '乾為天', 'en': 'Creative Heaven', 'es': 'Cielo Creativo' },
  2: { 'zh-CN': '坤为地', 'zh-TW': '坤為地', 'en': 'Receptive Earth', 'es': 'Tierra Receptiva' },
  3: { 'zh-CN': '水雷屯', 'zh-TW': '水雷屯', 'en': 'Difficulty at the Beginning', 'es': 'Dificultad al Comienzo' },
  4: { 'zh-CN': '山水蒙', 'zh-TW': '山水蒙', 'en': 'Youthful Folly', 'es': 'Necedad Juvenil' },
  5: { 'zh-CN': '水天需', 'zh-TW': '水天需', 'en': 'Waiting', 'es': 'Esperar' },
  6: { 'zh-CN': '天水讼', 'zh-TW': '天水訟', 'en': 'Conflict', 'es': 'Conflicto' },
  7: { 'zh-CN': '地水师', 'zh-TW': '地水師', 'en': 'The Army', 'es': 'El Ejército' },
  8: { 'zh-CN': '水地比', 'zh-TW': '水地比', 'en': 'Holding Together', 'es': 'Unión' },
  9: { 'zh-CN': '风天小畜', 'zh-TW': '風天小畜', 'en': 'Small Taming', 'es': 'Pequeña Domesticación' },
  10: { 'zh-CN': '天泽履', 'zh-TW': '天澤履', 'en': 'Treading', 'es': 'Pisar' },
  11: { 'zh-CN': '地天泰', 'zh-TW': '地天泰', 'en': 'Peace', 'es': 'Paz' },
  12: { 'zh-CN': '天地否', 'zh-TW': '天地否', 'en': 'Standstill', 'es': 'Estancamiento' },
  13: { 'zh-CN': '天火同人', 'zh-TW': '天火同人', 'en': 'Fellowship', 'es': 'Compañerismo' },
  14: { 'zh-CN': '火天大有', 'zh-TW': '火天大有', 'en': 'Great Possession', 'es': 'Gran Posesión' },
  15: { 'zh-CN': '地山谦', 'zh-TW': '地山謙', 'en': 'Modesty', 'es': 'Modestia' },
  16: { 'zh-CN': '雷地豫', 'zh-TW': '雷地豫', 'en': 'Enthusiasm', 'es': 'Entusiasmo' },
  17: { 'zh-CN': '泽雷随', 'zh-TW': '澤雷隨', 'en': 'Following', 'es': 'Seguir' },
  18: { 'zh-CN': '山蛊', 'zh-TW': '山蠱', 'en': 'Work on the Decayed', 'es': 'Trabajar lo Decaído' },
  19: { 'zh-CN': '地泽临', 'zh-TW': '地澤臨', 'en': 'Approach', 'es': 'Acercarse' },
  20: { 'zh-CN': '风地观', 'zh-TW': '風地觀', 'en': 'Contemplation', 'es': 'Contemplación' },
  21: { 'zh-CN': '火雷噬嗑', 'zh-TW': '火雷噬嗑', 'en': 'Biting Through', 'es': 'Morder a Través' },
  22: { 'zh-CN': '山火贲', 'zh-TW': '山火賁', 'en': 'Grace', 'es': 'Gracia' },
  23: { 'zh-CN': '山地剥', 'zh-TW': '山地剝', 'en': 'Splitting Apart', 'es': 'División' },
  24: { 'zh-CN': '地雷复', 'zh-TW': '地雷復', 'en': 'Return', 'es': 'Retorno' },
  25: { 'zh-CN': '天雷无妄', 'zh-TW': '天雷無妄', 'en': 'Innocence', 'es': 'Inocencia' },
  26: { 'zh-CN': '山天大畜', 'zh-TW': '山天大畜', 'en': 'Great Taming', 'es': 'Gran Domesticación' },
  27: { 'zh-CN': '山雷颐', 'zh-TW': '山雷頤', 'en': 'Nourishment', 'es': 'Nutrición' },
  28: { 'zh-CN': '泽风大过', 'zh-TW': '澤風大過', 'en': 'Great Preponderance', 'es': 'Gran Preponderancia' },
  29: { 'zh-CN': '水坎', 'zh-TW': '水坎', 'en': 'The Abysmal', 'es': 'Abismo' },
  30: { 'zh-CN': '离火', 'zh-TW': '離火', 'en': 'Clinging', 'es': 'Adherirse' },
  31: { 'zh-CN': '泽山咸', 'zh-TW': '澤山鹹', 'en': 'Influence', 'es': 'Influencia' },
  32: { 'zh-CN': '雷风恒', 'zh-TW': '雷風恆', 'en': 'Duration', 'es': 'Duración' },
  33: { 'zh-CN': '天山遁', 'zh-TW': '天山遁', 'en': 'Retreat', 'es': 'Retirada' },
  34: { 'zh-CN': '雷天大壮', 'zh-TW': '雷天大壯', 'en': 'Great Power', 'es': 'Gran Poder' },
  35: { 'zh-CN': '火地晋', 'zh-TW': '火地晉', 'en': 'Progress', 'es': 'Progreso' },
  36: { 'zh-CN': '地火明夷', 'zh-TW': '地火明夷', 'en': 'Darkening of the Light', 'es': 'Oscurecimiento de la Luz' },
  37: { 'zh-CN': '风火家人', 'zh-TW': '風火家人', 'en': 'The Family', 'es': 'La Familia' },
  38: { 'zh-CN': '火泽睽', 'zh-TW': '火澤睽', 'en': 'Opposition', 'es': 'Oposición' },
  39: { 'zh-CN': '水山蹇', 'zh-TW': '水山蹇', 'en': 'Obstruction', 'es': 'Obstrucción' },
  40: { 'zh-CN': '雷水解', 'zh-TW': '雷水解', 'en': 'Deliverance', 'es': 'Liberación' },
  41: { 'zh-CN': '山泽损', 'zh-TW': '山澤損', 'en': 'Decrease', 'es': 'Disminución' },
  42: { 'zh-CN': '风雷益', 'zh-TW': '風雷益', 'en': 'Increase', 'es': 'Aumento' },
  43: { 'zh-CN': '泽天夬', 'zh-TW': '澤天夬', 'en': 'Breakthrough', 'es': 'Ruptura' },
  44: { 'zh-CN': '天风姤', 'zh-TW': '天風姤', 'en': 'Coming to Meet', 'es': 'Encontrarse' },
  45: { 'zh-CN': '地泽萃', 'zh-TW': '地澤萃', 'en': 'Gathering Together', 'es': 'Reunión' },
  46: { 'zh-CN': '地风升', 'zh-TW': '地風升', 'en': 'Pushing Upward', 'es': 'Ascender' },
  47: { 'zh-CN': '泽水困', 'zh-TW': '澤水困', 'en': 'Oppression', 'es': 'Opresión' },
  48: { 'zh-CN': '水风井', 'zh-TW': '水風井', 'en': 'The Well', 'es': 'El Pozo' },
  49: { 'zh-CN': '泽火革', 'zh-TW': '澤火革', 'en': 'Revolution', 'es': 'Revolución' },
  50: { 'zh-CN': '火风鼎', 'zh-TW': '火風鼎', 'en': 'The Cauldron', 'es': 'El Caldero' },
  51: { 'zh-CN': '震雷', 'zh-TW': '震雷', 'en': 'The Arousing', 'es': 'Despertar' },
  52: { 'zh-CN': '艮山', 'zh-TW': '艮山', 'en': 'Keeping Still', 'es': 'Mantenerse Quieto' },
  53: { 'zh-CN': '风山渐', 'zh-TW': '風山漸', 'en': 'Development', 'es': 'Desarrollo' },
  54: { 'zh-CN': '雷泽归妹', 'zh-TW': '雷澤歸妹', 'en': 'The Marrying Maiden', 'es': 'La Doncella Casadera' },
  55: { 'zh-CN': '雷火丰', 'zh-TW': '雷火豐', 'en': 'Abundance', 'es': 'Abundancia' },
  56: { 'zh-CN': '火山旅', 'zh-TW': '火山旅', 'en': 'The Wanderer', 'es': 'El Viajero' },
  57: { 'zh-CN': '巽风', 'zh-TW': '巽風', 'en': 'The Gentle', 'es': 'Lo Suave' },
  58: { 'zh-CN': '兑泽', 'zh-TW': '兌澤', 'en': 'The Joyous', 'es': 'Lo Gozoso' },
  59: { 'zh-CN': '风水涣', 'zh-TW': '風水渙', 'en': 'Dispersion', 'es': 'Dispersión' },
  60: { 'zh-CN': '水泽节', 'zh-TW': '水澤節', 'en': 'Limitation', 'es': 'Limitación' },
  61: { 'zh-CN': '风泽中孚', 'zh-TW': '風澤中孚', 'en': 'Inner Truth', 'es': 'Verdad Interior' },
  62: { 'zh-CN': '雷山小过', 'zh-TW': '雷山小過', 'en': 'Small Preponderance', 'es': 'Pequeña Preponderancia' },
  63: { 'zh-CN': '水火既济', 'zh-TW': '水火既濟', 'en': 'After Completion', 'es': 'Después de la Finalización' },
  64: { 'zh-CN': '火水未济', 'zh-TW': '火水未濟', 'en': 'Before Completion', 'es': 'Antes de la Finalización' }
};

// 获取卦象名称的函数
export const getHexagramName = (id: number, language: string): string => {
  const names = hexagramNames[id];
  if (!names) return `第${id}卦`;
  return names[language as keyof typeof names] || names['zh-CN'] || `第${id}卦`;
};
