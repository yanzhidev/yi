# 数字易经

一个基于 React + TypeScript + Tailwind CSS 的现代易经起卦应用。

[在线演示](https://github.com/yanzhidev/yi)

## 功能特性

- ✨ **三钱法起卦** - 使用传统铜钱投掷算法，支持变爻计算
- 📚 **完整64卦数据** - 包含卦辞、彖曰、大象等详细信息
- 🎨 **禅意设计** - 简约优雅的界面风格，留白与石色配色
- 📱 **响应式布局** - 适配桌面与移动设备
- ⚡ **快速体验** - Vite 构建，瞬时加载

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 7
- **样式**: Tailwind CSS 4
- **图标**: Lucide React
- **工具**: ESLint + TypeScript ESLint

## 核心功能

### 起卦算法

采用传统「三钱法」：
- 投掷三枚铜钱，记录正反面
- 根据点数总和判定爻象：
  - 6 (老阴) - 阴爻，变爻 ⚋
  - 7 (少阳) - 阳爻 ⚊
  - 8 (少阴) - 阴爻 ⚋
  - 9 (老阳) - 阳爻，变爻 ⚊

### 卦象显示

- **本卦** - 当前问卦的卦象
- **变卦** - 变爻后的卦象（如有变爻）
- 支持显示卦辞、彖曰、大象等详细解读

## 快速开始

```bash
# 克隆项目
git clone https://github.com/yanzhidev/yi.git
cd yi

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── components/     # React 组件
├── data/          # 64卦 JSON 数据
├── hooks/         # 自定义 Hooks
├── utils/         # 工具函数
│   └── iching.ts  # 三钱法起卦核心逻辑
├── App.tsx        # 主应用
└── index.css      # 全局样式
```

## 64卦数据

位于 `src/data/hexagrams.json`，包含：
- 卦序 (1-64)
- 卦名与拼音
- 二进制卦象编码
- 卦象符号
- 卦辞
- 彖曰
- 大象

## 开发计划

- [x] 三钱法起卦算法
- [x] 64卦基础数据
- [x] 卦象可视化
- [x] 本卦/变卦显示
- [ ] 动爻详细解读
- [ ] 历史记录
- [ ] 分享功能

## 参考

- [周易](https://zh.wikipedia.org/wiki/周易) - 维基百科
- [易经六十四卦](https://zh.wikipedia.org/wiki/%E6%98%93%E7%BB%8F%E5%85%AD%E5%8D%81%E5%9B%9B%E5%8D%A6) - 卦象对照

## License

MIT License © 2025

