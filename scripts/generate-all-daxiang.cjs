const fs = require('fs');
const path = require('path');

// 导入卦象数据
const hexagramsData = require('../src/data/hexagrams.json');

/**
 * 生成单个卦象的SVG字符串
 */
const generateTrigramSVG = (trigram, x, y, width, height) => {
  const svgTemplates = {
    '☰': `
    <circle cx="${x + width * 0.5}" cy="${y + height * 0.5}" r="${Math.min(width, height) * 0.3}" fill="none" stroke="#8b5a2b" stroke-width="2.5"/>
    <!-- 太阳光芒 -->
    <line x1="${x + width * 0.5}" y1="${y + height * 0.1}" x2="${x + width * 0.5}" y2="${y + height * 0.2}" stroke="#8b5a2b" stroke-width="2"/>
    <line x1="${x + width * 0.5}" y1="${y + height * 0.8}" x2="${x + width * 0.5}" y2="${y + height * 0.9}" stroke="#8b5a2b" stroke-width="2"/>
    <line x1="${x + width * 0.1}" y1="${y + height * 0.5}" x2="${x + width * 0.2}" y2="${y + height * 0.5}" stroke="#8b5a2b" stroke-width="2"/>
    <line x1="${x + width * 0.8}" y1="${y + height * 0.5}" x2="${x + width * 0.9}" y2="${y + height * 0.5}" stroke="#8b5a2b" stroke-width="2"/>
    <line x1="${x + width * 0.2}" y1="${y + height * 0.2}" x2="${x + width * 0.25}" y2="${y + height * 0.25}" stroke="#8b5a2b" stroke-width="2"/>
    <line x1="${x + width * 0.75}" y1="${y + height * 0.25}" x2="${x + width * 0.8}" y2="${y + height * 0.2}" stroke="#8b5a2b" stroke-width="2"/>
    <line x1="${x + width * 0.2}" y1="${y + height * 0.8}" x2="${x + width * 0.25}" y2="${y + height * 0.75}" stroke="#8b5a2b" stroke-width="2"/>
    <line x1="${x + width * 0.75}" y1="${y + height * 0.75}" x2="${x + width * 0.8}" y2="${y + height * 0.8}" stroke="#8b5a2b" stroke-width="2"/>`,
    
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
    <!-- 左边小火焰 -->
    <path d="M${x + width * 0.2},${y + height * 0.8} Q${x + width * 0.15},${y + height * 0.6} ${x + width * 0.25},${y + height * 0.4} Q${x + width * 0.2},${y + height * 0.2} ${x + width * 0.3},${y + height * 0.15}" stroke="#8b5a2b" stroke-width="1.5" fill="none"/>
    <!-- 中间大火焰 -->
    <path d="M${x + width * 0.5},${y + height * 0.85} Q${x + width * 0.4},${y + height * 0.6} ${x + width * 0.5},${y + height * 0.3} Q${x + width * 0.45},${y + height * 0.1} ${x + width * 0.5},${y + height * 0.05}" stroke="#8b5a2b" stroke-width="2.5" fill="none"/>
    <!-- 右边小火焰 -->
    <path d="M${x + width * 0.8},${y + height * 0.8} Q${x + width * 0.85},${y + height * 0.6} ${x + width * 0.75},${y + height * 0.4} Q${x + width * 0.8},${y + height * 0.2} ${x + width * 0.7},${y + height * 0.15}" stroke="#8b5a2b" stroke-width="1.5" fill="none"/>
    <!-- 火焰顶端光点 -->
    <circle cx="${x + width * 0.5}" cy="${y + height * 0.05}" r="2" fill="#8b5a2b"/>`,
    
    '☶': `
    <path d="M${x},${y + height * 0.8} L${x + width * 0.3},${y + height * 0.2} L${x + width * 0.5},${y + height * 0.4} L${x + width * 0.7},${y + height * 0.1} L${x + width},${y + height * 0.7}" stroke="#8b5a2b" stroke-width="2.5" fill="none"/>`,
    
    '☱': `
    <ellipse cx="${x + width * 0.5}" cy="${y + height * 0.6}" rx="${width * 0.4}" ry="${height * 0.15}" stroke="#8b5a2b" stroke-width="2" fill="none"/>
    <path d="M${x + width * 0.1},${y + height * 0.6} Q${x + width * 0.3},${y + height * 0.5} ${x + width * 0.5},${y + height * 0.6} T${x + width * 0.9},${y + height * 0.6}" stroke="#8b5a2b" stroke-width="1.5" fill="none"/>`
  };

  return svgTemplates[trigram] || '';
};

/**
 * 生成完整的大象图SVG
 */
const generateDaxiangSVG = (symbol, name, width = 300, height = 180) => {
  const upperTrigram = symbol[0];
  const lowerTrigram = symbol[1];

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
 * 主函数：生成全部64个SVG文件
 */
function main() {
  const outputDir = path.join(__dirname, '../public/images/daxiang');
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  hexagramsData.forEach(hexagram => {
    try {
      const svgContent = generateDaxiangSVG(hexagram.symbol, hexagram.name);
      const filename = `${hexagram.id}.svg`;
      const filepath = path.join(outputDir, filename);
      
      fs.writeFileSync(filepath, svgContent, 'utf8');
      console.log(`✅ Generated: ${filename} (${hexagram.symbol} ${hexagram.name})`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error generating ${hexagram.id}.svg:`, error.message);
      errorCount++;
      errors.push({ id: hexagram.id, error: error.message });
    }
  });

  console.log(`\n🎉 Generation complete!`);
  console.log(`✅ Success: ${successCount} files`);
  console.log(`❌ Errors: ${errorCount} files`);
  console.log(`📁 Output directory: ${outputDir}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Errors details:');
    errors.forEach(err => {
      console.log(`  - ${err.pinyin}.svg: ${err.error}`);
    });
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { generateDaxiangSVG, generateTrigramSVG };
