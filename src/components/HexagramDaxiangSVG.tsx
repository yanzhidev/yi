import React from 'react';

interface HexagramDaxiangSVGProps {
  symbol: string;
  name: string;
  width?: number;
  height?: number;
}

/**
 * 八卦符号到SVG绘制函数的映射
 */
const trigramSVGRenderers: Record<string, (x: number, y: number, width: number, height: number) => React.ReactElement> = {
  '☰': (x, y, w, h) => (
    // 乾（天）：太阳
    <g>
      <circle cx={x + w * 0.5} cy={y + h * 0.5} r={Math.min(w, h) * 0.3} fill="none" stroke="#8b5a2b" strokeWidth="2.5"/>
      {/* 太阳光芒 */}
      <line x1={x + w * 0.5} y1={y + h * 0.1} x2={x + w * 0.5} y2={y + h * 0.2} stroke="#8b5a2b" strokeWidth="2"/>
      <line x1={x + w * 0.5} y1={y + h * 0.8} x2={x + w * 0.5} y2={y + h * 0.9} stroke="#8b5a2b" strokeWidth="2"/>
      <line x1={x + w * 0.1} y1={y + h * 0.5} x2={x + w * 0.2} y2={y + h * 0.5} stroke="#8b5a2b" strokeWidth="2"/>
      <line x1={x + w * 0.8} y1={y + h * 0.5} x2={x + w * 0.9} y2={y + h * 0.5} stroke="#8b5a2b" strokeWidth="2"/>
      <line x1={x + w * 0.2} y1={y + h * 0.2} x2={x + w * 0.25} y2={y + h * 0.25} stroke="#8b5a2b" strokeWidth="2"/>
      <line x1={x + w * 0.75} y1={y + h * 0.25} x2={x + w * 0.8} y2={y + h * 0.2} stroke="#8b5a2b" strokeWidth="2"/>
      <line x1={x + w * 0.2} y1={y + h * 0.8} x2={x + w * 0.25} y2={y + h * 0.75} stroke="#8b5a2b" strokeWidth="2"/>
      <line x1={x + w * 0.75} y1={y + h * 0.75} x2={x + w * 0.8} y2={y + h * 0.8} stroke="#8b5a2b" strokeWidth="2"/>
    </g>
  ),
  '☷': (x, y, w, h) => (
    // 坤（地）：三条断线
    <g>
      <line x1={x} y1={y + h * 0.2} x2={x + w * 0.4} y2={y + h * 0.2} stroke="#8b5a2b" strokeWidth="3"/>
      <line x1={x + w * 0.6} y1={y + h * 0.2} x2={x + w} y2={y + h * 0.2} stroke="#8b5a2b" strokeWidth="3"/>
      <line x1={x} y1={y + h * 0.5} x2={x + w * 0.4} y2={y + h * 0.5} stroke="#8b5a2b" strokeWidth="3"/>
      <line x1={x + w * 0.6} y1={y + h * 0.5} x2={x + w} y2={y + h * 0.5} stroke="#8b5a2b" strokeWidth="3"/>
      <line x1={x} y1={y + h * 0.8} x2={x + w * 0.4} y2={y + h * 0.8} stroke="#8b5a2b" strokeWidth="3"/>
      <line x1={x + w * 0.6} y1={y + h * 0.8} x2={x + w} y2={y + h * 0.8} stroke="#8b5a2b" strokeWidth="3"/>
    </g>
  ),
  '☳': (x, y, w, h) => (
    // 震（雷）：闪电纹
    <g>
      <path d={`M${x + w * 0.3},${y + h * 0.1} L${x + w * 0.5},${y + h * 0.4} L${x + w * 0.4},${y + h * 0.4} L${x + w * 0.6},${y + h * 0.9}`} 
            stroke="#8b5a2b" strokeWidth="2.5" fill="none"/>
      <circle cx={x + w * 0.5} cy={y + h * 0.4} r="2" fill="#8b5a2b"/>
    </g>
  ),
  '☴': (x, y, w, h) => (
    // 巽（风）：流动曲线
    <g>
      <path d={`M${x},${y + h * 0.3} Q${x + w * 0.3},${y + h * 0.1} ${x + w * 0.6},${y + h * 0.3} T${x + w},${y + h * 0.3}`} 
            stroke="#8b5a2b" strokeWidth="2" fill="none"/>
      <path d={`M${x},${y + h * 0.5} Q${x + w * 0.3},${y + h * 0.3} ${x + w * 0.6},${y + h * 0.5} T${x + w},${y + h * 0.5}`} 
            stroke="#8b5a2b" strokeWidth="2" fill="none"/>
      <path d={`M${x},${y + h * 0.7} Q${x + w * 0.3},${y + h * 0.5} ${x + w * 0.6},${y + h * 0.7} T${x + w},${y + h * 0.7}`} 
            stroke="#8b5a2b" strokeWidth="2" fill="none"/>
    </g>
  ),
  '☵': (x, y, w, h) => (
    // 坎（水）：水波纹
    <g>
      <path d={`M${x},${y + h * 0.3} Q${x + w * 0.25},${y + h * 0.2} ${x + w * 0.5},${y + h * 0.3} T${x + w},${y + h * 0.3}`} 
            stroke="#8b5a2b" strokeWidth="2" fill="none"/>
      <path d={`M${x},${y + h * 0.5} Q${x + w * 0.25},${y + h * 0.4} ${x + w * 0.5},${y + h * 0.5} T${x + w},${y + h * 0.5}`} 
            stroke="#8b5a2b" strokeWidth="2" fill="none"/>
      <path d={`M${x},${y + h * 0.7} Q${x + w * 0.25},${y + h * 0.6} ${x + w * 0.5},${y + h * 0.7} T${x + w},${y + h * 0.7}`} 
            stroke="#8b5a2b" strokeWidth="2" fill="none"/>
    </g>
  ),
  '☲': (x, y, w, h) => (
    // 离（火）：3个火焰，中间大两边小
    <g>
      {/* 左边小火焰 */}
      <path d={`M${x + w * 0.2},${y + h * 0.8} Q${x + w * 0.15},${y + h * 0.6} ${x + w * 0.25},${y + h * 0.4} Q${x + w * 0.2},${y + h * 0.2} ${x + w * 0.3},${y + h * 0.15}`} 
            stroke="#8b5a2b" strokeWidth="1.5" fill="none"/>
      {/* 中间大火焰 */}
      <path d={`M${x + w * 0.5},${y + h * 0.85} Q${x + w * 0.4},${y + h * 0.6} ${x + w * 0.5},${y + h * 0.3} Q${x + w * 0.45},${y + h * 0.1} ${x + w * 0.5},${y + h * 0.05}`} 
            stroke="#8b5a2b" strokeWidth="2.5" fill="none"/>
      {/* 右边小火焰 */}
      <path d={`M${x + w * 0.8},${y + h * 0.8} Q${x + w * 0.85},${y + h * 0.6} ${x + w * 0.75},${y + h * 0.4} Q${x + w * 0.8},${y + h * 0.2} ${x + w * 0.7},${y + h * 0.15}`} 
            stroke="#8b5a2b" strokeWidth="1.5" fill="none"/>
      {/* 火焰顶端光点 */}
      <circle cx={x + w * 0.5} cy={y + h * 0.05} r="2" fill="#8b5a2b"/>
    </g>
  ),
  '☶': (x, y, w, h) => (
    // 艮（山）：山峰轮廓
    <g>
      <path d={`M${x},${y + h * 0.8} L${x + w * 0.3},${y + h * 0.2} L${x + w * 0.5},${y + h * 0.4} L${x + w * 0.7},${y + h * 0.1} L${x + w},${y + h * 0.7}`} 
            stroke="#8b5a2b" strokeWidth="2.5" fill="none"/>
    </g>
  ),
  '☱': (x, y, w, h) => (
    // 兑（泽）：水面
    <g>
      <ellipse cx={x + w * 0.5} cy={y + h * 0.6} rx={w * 0.4} ry={h * 0.15} 
               stroke="#8b5a2b" strokeWidth="2" fill="none"/>
      <path d={`M${x + w * 0.1},${y + h * 0.6} Q${x + w * 0.3},${y + h * 0.5} ${x + w * 0.5},${y + h * 0.6} T${x + w * 0.9},${y + h * 0.6}`} 
            stroke="#8b5a2b" strokeWidth="1.5" fill="none"/>
    </g>
  )
};

/**
 * 大象图SVG组件
 */
export const HexagramDaxiangSVG: React.FC<HexagramDaxiangSVGProps> = ({ 
  symbol, 
  name, 
  width = 300, 
  height = 180 
}) => {
  // 解析symbol：第一个字符是上卦，第二个字符是下卦
  const upperTrigram = symbol[0];
  const lowerTrigram = symbol[1];

  const upperRenderer = trigramSVGRenderers[upperTrigram];
  const lowerRenderer = trigramSVGRenderers[lowerTrigram];

  if (!upperRenderer || !lowerRenderer) {
    return (
      <div className="flex items-center justify-center text-stone-500">
        无法识别的卦象符号
      </div>
    );
  }

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: '#f9f5eb' }}
    >
      {/* 上卦区域 */}
      {upperRenderer(0, 0, width, height / 2)}
      
      {/* 分隔线 */}
      <line x1="0" y1={height / 2} x2={width} y2={height / 2} 
            stroke="#8b5a2b" strokeWidth="1" strokeDasharray="5,3" opacity="0.5"/>
      
      {/* 下卦区域 */}
      {lowerRenderer(0, height / 2, width, height / 2)}
      
      {/* 卦名 */}
      <text 
        x={width - 10} 
        y={height - 10} 
        fontSize="14" 
        fill="#8b5a2b" 
        fontFamily="serif"
        textAnchor="end"
        style={{ fontStyle: 'italic' }}
      >
        {name}
      </text>
    </svg>
  );
};

/**
 * 生成SVG字符串的函数（用于生成文件）
 */
export const generateDaxiangSVG = (symbol: string, name: string, width = 300, height = 180): string => {
  const upperTrigram = symbol[0];
  const lowerTrigram = symbol[1];

  const upperRenderer = trigramSVGRenderers[upperTrigram];
  const lowerRenderer = trigramSVGRenderers[lowerTrigram];

  if (!upperRenderer || !lowerRenderer) {
    return '';
  }

  // 这里需要将JSX转换为SVG字符串，为了简化，我们直接返回SVG模板
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background-color: #f9f5eb">
  <!-- 上卦: ${upperTrigram} -->
  ${generateTrigramSVG(upperTrigram, 0, 0, width, height / 2)}
  
  <!-- 分隔线 -->
  <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="#8b5a2b" stroke-width="1" stroke-dasharray="5,3" opacity="0.5"/>
  
  <!-- 下卦: ${lowerTrigram} -->
  ${generateTrigramSVG(lowerTrigram, 0, height / 2, width, height / 2)}
  
  <!-- 卦名 -->
  <text x="${width - 10}" y="${height - 10}" font-size="14" fill="#8b5a2b" font-family="serif" text-anchor="end" style="font-style: italic">${name}</text>
</svg>`;
};

/**
 * 生成单个卦象的SVG字符串
 */
const generateTrigramSVG = (trigram: string, x: number, y: number, width: number, height: number): string => {
  const svgTemplates: Record<string, string> = {
    '☰': `
    <line x1="${x}" y1="${y + height * 0.2}" x2="${x + width}" y2="${y + height * 0.2}" stroke="#8b5a2b" stroke-width="3"/>
    <line x1="${x}" y1="${y + height * 0.5}" x2="${x + width}" y2="${y + height * 0.5}" stroke="#8b5a2b" stroke-width="3"/>
    <line x1="${x}" y1="${y + height * 0.8}" x2="${x + width}" y2="${y + height * 0.8}" stroke="#8b5a2b" stroke-width="3"/>`,
    
    '☷': `
    <line x1="${x}" y1="${y + height * 0.2}" x2="${x + width * 0.4}" y2="${y + height * 0.2}" stroke="#8b5a2b" stroke-width="3"/>
    <line x1="${x + width * 0.6}" y1="${y + height * 0.2}" x2="${x + width}" y2="${y + height * 0.2}" stroke="#8b5a2b" stroke-width="3"/>
    <line x1="${x}" y1="${y + height * 0.5}" x2="${x + width * 0.4}" y2="${y + height * 0.5}" stroke="#8b5a2b" stroke-width="3"/>
    <line x1="${x + width * 0.6}" y1="${y + height * 0.5}" x2="${x + width}" y2="${y + height * 0.5}" stroke="#8b5a2b" stroke-width="3"/>
    <line x1="${x}" y1="${y + height * 0.8}" x2="${x + width * 0.4}" y2="${y + height * 0.8}" stroke="#8b5a2b" stroke-width="3"/>
    <line x1="${x + width * 0.6}" y1="${y + height * 0.8}" x2="${x + width}" y2="${y + height * 0.8}" stroke="#8b5a2b" stroke-width="3"/>`,
    
    '☳': `
    <path d="M${x + width * 0.3},${y + height * 0.1} L${x + width * 0.5},${y + height * 0.4} L${x + width * 0.4},${y + height * 0.4} L${x + width * 0.6},${y + height * 0.9}" stroke="#8b5a2b" stroke-width="2.5" fill="none"/>
    <circle cx="${x + width * 0.5}" cy="${y + height * 0.4}" r="2" fill="#8b5a2b"/>`,
    
    '☴': `
    <path d="M${x},${y + height * 0.3} Q${x + width * 0.3},${y + height * 0.1} ${x + width * 0.6},${y + height * 0.3} T${x + width},${y + height * 0.3}" stroke="#8b5a2b" stroke-width="2" fill="none"/>
    <path d="M${x},${y + height * 0.5} Q${x + width * 0.3},${y + height * 0.3} ${x + width * 0.6},${y + height * 0.5} T${x + width},${y + height * 0.5}" stroke="#8b5a2b" stroke-width="2" fill="none"/>
    <path d="M${x},${y + height * 0.7} Q${x + width * 0.3},${y + height * 0.5} ${x + width * 0.6},${y + height * 0.7} T${x + width},${y + height * 0.7}" stroke="#8b5a2b" stroke-width="2" fill="none"/>`,
    
    '☵': `
    <path d="M${x},${y + height * 0.3} Q${x + width * 0.25},${y + height * 0.2} ${x + width * 0.5},${y + height * 0.3} T${x + width},${y + height * 0.3}" stroke="#8b5a2b" stroke-width="2" fill="none"/>
    <path d="M${x},${y + height * 0.5} Q${x + width * 0.25},${y + height * 0.4} ${x + width * 0.5},${y + height * 0.5} T${x + width},${y + height * 0.5}" stroke="#8b5a2b" stroke-width="2" fill="none"/>
    <path d="M${x},${y + height * 0.7} Q${x + width * 0.25},${y + height * 0.6} ${x + width * 0.5},${y + height * 0.7} T${x + width},${y + height * 0.7}" stroke="#8b5a2b" stroke-width="2" fill="none"/>`,
    
    '☲': `
    <path d="M${x + width * 0.3},${y + height * 0.8} Q${x + width * 0.2},${y + height * 0.6} ${x + width * 0.4},${y + height * 0.4} Q${x + width * 0.3},${y + height * 0.2} ${x + width * 0.5},${y + height * 0.1}" stroke="#8b5a2b" stroke-width="2" fill="none"/>
    <path d="M${x + width * 0.7},${y + height * 0.8} Q${x + width * 0.8},${y + height * 0.6} ${x + width * 0.6},${y + height * 0.4} Q${x + width * 0.7},${y + height * 0.2} ${x + width * 0.5},${y + height * 0.1}" stroke="#8b5a2b" stroke-width="2" fill="none"/>
    <circle cx="${x + width * 0.5}" cy="${y + height * 0.1}" r="3" fill="#8b5a2b"/>`,
    
    '☶': `
    <path d="M${x},${y + height * 0.8} L${x + width * 0.3},${y + height * 0.2} L${x + width * 0.5},${y + height * 0.4} L${x + width * 0.7},${y + height * 0.1} L${x + width},${y + height * 0.7}" stroke="#8b5a2b" stroke-width="2.5" fill="none"/>`,
    
    '☱': `
    <ellipse cx="${x + width * 0.5}" cy="${y + height * 0.6}" rx="${width * 0.4}" ry="${height * 0.15}" stroke="#8b5a2b" stroke-width="2" fill="none"/>
    <path d="M${x + width * 0.1},${y + height * 0.6} Q${x + width * 0.3},${y + height * 0.5} ${x + width * 0.5},${y + height * 0.6} T${x + width * 0.9},${y + height * 0.6}" stroke="#8b5a2b" stroke-width="1.5" fill="none"/>`
  };

  return svgTemplates[trigram] || '';
};
