# 数字易经

一个基于 React + TypeScript + Tailwind CSS 的现代易经起卦应用。

[在线演示](https://yi-pi.vercel.app/)

## 功能特性

- ✨ **三钱法起卦** - 使用传统铜钱投掷算法，支持变爻计算
- 🎯 **手动输入** - 支持手动选择每爻结果，精确起卦
- 📚 **完整64卦数据** - 包含卦辞、彖曰、大象等详细信息
- 🎨 **禅意设计** - 简约优雅的界面风格，留白与石色配色
- 📱 **响应式布局** - 适配桌面与移动设备
- ⚡ **快速体验** - Vite 构建，瞬时加载
- 🌍 **完整多语言支持** - 支持中文简体、繁体、英文、西班牙文，包括卦序、爻位、按钮等全部界面元素

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 7
- **样式**: Tailwind CSS 4
- **图标**: Lucide React
- **工具**: ESLint + TypeScript ESLint
- **测试**: Vitest + React Testing Library

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
- **变爻重点解读** - 根据变爻数量智能确定解读重点

### 界面优化

- **统一按钮风格** - 所有主要按钮采用一致的琥珀色主题
- **优化按钮尺寸** - 起卦和钱卜按钮大小一致
- **改进交互文案** - 重置按钮改为"重新起卦"，更直观

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

# 运行测试
npm test
```

## 项目结构

```
src/
├── components/     # React 组件
│   ├── HexagramLines.tsx      # 卦象线条显示
│   ├── HexagramResult.tsx     # 解卦结果组件
│   ├── LanguageSelector.tsx    # 语言选择器
│   └── ManualInput.tsx        # 手动输入界面
├── contexts/      # React Context
│   └── LanguageContext.tsx     # 语言管理
├── hooks/         # 自定义 Hooks
│   └── useHexagramInterpretation.ts  # 变爻解读逻辑
├── utils/         # 工具函数
│   ├── iching.ts              # 三钱法起卦核心逻辑
│   └── i18n.ts               # 国际化配置
├── data/          # 64卦 JSON 数据
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
- 通俗解读（白话翻译、人生启示、决策建议）

## 开发计划

- [x] 三钱法起卦算法
- [x] 64卦基础数据
- [x] 卦象可视化
- [x] 本卦/变卦显示
- [x] 动爻详细解读
- [x] 手动输入功能
- [x] 完整多语言支持 - 包括卦序、爻位、按钮、变爻符号等全部界面元素
- [x] 组件重构优化
- [ ] 历史记录
- [ ] 分享功能

## 测试覆盖

项目包含完整的测试套件：
- **核心逻辑测试** - 三钱法算法、卦象映射
- **组件测试** - UI 组件功能验证
- **Hook 测试** - 自定义 Hook 逻辑验证

运行测试：
```bash
npm test              # 运行所有测试
npm test --run       # 单次运行
npm test --ui        # 测试界面
```

## 参考

- [周易](https://zh.wikipedia.org/wiki/周易) - 维基百科
- [易经六十四卦](https://zh.wikipedia.org/wiki/%E6%98%93%E7%BB%8F%E5%85%AD%E5%8D%81%E5%9B%9B%E5%8D%A6) - 卦象对照

## License

MIT License © 2025

