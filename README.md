# 数字易经

一个基于 React + TypeScript + Tailwind CSS 的现代易经起卦应用，支持用户认证和历史记录功能。

[在线演示](https://yi-pi.vercel.app/)

## 功能特性

- ✨ **三钱法起卦** - 使用传统铜钱投掷算法，支持变爻计算
- 🎯 **手动输入** - 支持手动选择每爻结果，精确起卦
- � **智能吉凶判断** - 多层次加权评分系统，综合分析卦象吉凶
- 📊 **维度分析** - 卦辞断语、上下卦关系、爻位综合三维度评估
- 📈 **态势分析** - SWOT分析框架，提供优势、劣势、机遇、威胁洞察
- �👤 **用户认证** - Google 登录，安全可靠的身份验证
- 📚 **历史记录** - 自动保存起卦记录，支持查看和删除
- 📱 **响应式侧边栏** - 桌面端固定显示，移动端滑出式设计
- 📚 **完整64卦数据** - 包含卦辞、彖曰、大象等详细信息
- 🎨 **禅意设计** - 简约优雅的界面风格，留白与石色配色
- 📱 **响应式布局** - 适配桌面与移动设备
- ⚡ **快速体验** - Vite 构建，瞬时加载
- 🌍 **完整多语言支持** - 支持中文简体、繁体、英文、西班牙文，包括卦象名称、时间描述、历史记录等全部界面元素

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 7
- **样式**: Tailwind CSS 4
- **认证**: Firebase Authentication (Google Login)
- **数据库**: Firebase Firestore (历史记录存储)
- **图标**: Lucide React
- **工具**: ESLint + TypeScript ESLint
- **测试**: Vitest + React Testing Library

## 核心功能

### 🔐 用户认证系统

- **Google 登录** - 一键安全登录
- **持久化状态** - 自动保持登录状态
- **用户信息显示** - 头像和登出功能
- **权限控制** - 每个用户只能访问自己的数据

### 📝 历史记录管理

- **自动保存** - 登录用户起卦后自动保存到云端
- **完整记录** - 包含问题、本卦、变卦、时间等信息
- **多语言支持** - 卦象名称、时间描述等支持多语言显示
- **删除功能** - 支持删除单条历史记录，带权限验证
- **响应式界面** - 桌面端侧边栏，移动端滑出菜单

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
- **多语言卦象名称** - 64卦名称支持四种语言显示

### 🔮 智能吉凶判断系统

采用多层次加权评分系统，综合分析卦象吉凶：

#### 评分维度
- **卦辞断语（40%权重）** - 基于吉凶关键词分析，识别强吉、中吉、弱吉和强凶、中凶、弱凶词汇
- **上下卦关系（30%权重）** - 分析天地关系、五行相生相克、阴阳调和、特殊组合
- **爻位综合（30%权重）** - 评估爻位得当性、特殊组合、变爻分析、阴阳平衡、爻位结构

#### 动态权重分配
根据变爻数量动态调整本卦和变卦权重：
- 0个变爻：本卦100%，变卦0%
- 1个变爻：本卦90%，变卦10%
- 2个变爻：本卦80%，变卦20%
- 3个变爻：本卦60%，变卦40%
- 4个变爻：本卦40%，变卦60%
- 5个变爻：本卦20%，变卦80%
- 6个变爻：本卦10%，变卦90%

#### 吉凶等级
- **大吉** (90-100分) - 天时地利人和，万事亨通
- **吉** (75-89分) - 运势良好，机遇颇多
- **小吉** (60-74分) - 运势平稳向好，小有成就
- **中平** (45-59分) - 运势平平，吉凶参半
- **小凶** (30-44分) - 运势略有阻滞，宜守不宜攻
- **凶** (15-29分) - 运势不佳，困难重重
- **大凶** (0-14分) - 运势极差，危机四伏

#### 分析报告
- **综合评分** - 0-100分的量化评估
- **置信度** - 基于各维度评分一致性计算
- **总体建议** - 结合各维度特征的具体建议
- **SWOT分析** - 优势、劣势、机遇、威胁四象限分析
- **详细推理** - 完整的分析过程和逻辑说明

### 界面优化

- **统一按钮风格** - 所有主要按钮采用一致的琥珀色主题
- **优化按钮尺寸** - 起卦和钱卜按钮大小一致
- **改进交互文案** - 重置按钮改为"重新起卦"，更直观
- **历史记录侧边栏** - 优雅的侧边栏设计，支持桌面和移动端

## 快速开始

### 环境准备

1. **克隆项目**
```bash
git clone https://github.com/yanzhidev/yi.git
cd yi
```

2. **安装依赖**
```bash
npm install
```

3. **Firebase 配置**
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local，填入您的 Firebase 配置
# 详见 FIREBASE_SETUP.md
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **构建生产版本**
```bash
npm run build
```

### Firebase 设置

详细的 Firebase 设置步骤请参考 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)：

1. 创建 Firebase 项目
2. 启用 Authentication (Google 登录)
3. 设置 Firestore 数据库
4. 配置安全规则
5. 设置环境变量

## 项目结构

```
src/
├── components/           # React 组件
│   ├── AuthButton.tsx           # 认证按钮组件
│   ├── HistorySidebar.tsx       # 历史记录侧边栏
│   ├── HexagramDisplay.tsx      # 卦象显示组件
│   ├── HexagramLines.tsx        # 卦象线条显示
│   ├── HexagramResult.tsx       # 解卦结果组件
│   ├── FortuneAssessmentDisplay.tsx  # 吉凶判断显示组件
│   ├── LanguageSelector.tsx     # 语言选择器
│   └── ManualInput.tsx          # 手动输入界面
├── contexts/           # React Context
│   ├── AuthContext.tsx          # 认证状态管理
│   └── LanguageContext.tsx      # 语言管理
├── lib/                # Firebase 配置
│   └── firebase.ts              # Firebase 初始化和函数
├── data/               # 数据文件
│   ├── hexagrams.json           # 64卦详细数据
│   ├── hexagrams_en.json        # 英文卦象数据
│   ├── hexagrams_es.json        # 西班牙语卦象数据
│   └── hexagramNames.ts        # 卦象名称多语言映射
├── hooks/              # 自定义 Hooks
│   └── useHexagramInterpretation.ts  # 变爻解读逻辑
├── utils/              # 工具函数
│   ├── iching.ts               # 三钱法起卦核心逻辑
│   ├── fortuneAssessment.ts    # 吉凶判断算法
│   ├── lineRelations.ts        # 爻位关系分析
│   └── i18n.ts                 # 国际化配置
├── App.tsx             # 主应用
└── index.css           # 全局样式
```

## 数据模型

### 历史记录 (HexagramHistory)

```typescript
interface HexagramHistory {
  id?: string
  userId: string              // 用户ID，确保数据隔离
  question: string            // 用户问题
  originalHexagram: {        // 本卦信息
    number: number
    name: string
    lines: number[]
  }
  changedHexagram?: {        // 变卦信息（可选）
    number: number
    name: string
    lines: number[]
  } | null
  changingLines: number[]    // 变爻位置
  timestamp: Date            // 起卦时间
}
```

## 安全机制

### 🔒 数据安全

- **用户隔离** - 每个用户只能访问自己的历史记录
- **权限验证** - 删除操作验证文档所有权
- **身份认证** - Firebase Auth 确保用户身份真实性
- **安全规则** - Firestore 安全规则保护数据访问

### 权限控制

```typescript
// 查看权限：只能查询自己的记录
where('userId', '==', userId)

// 删除权限：验证文档所有权
if (data.userId !== userId) {
  throw new Error('无权限删除此历史记录')
}
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

多语言卦象名称位于 `src/data/hexagramNames.ts`，支持：
- 简体中文 (zh-CN)
- 繁体中文 (zh-TW)  
- 英文 (en)
- 西班牙语 (es)

## 开发计划

- [x] 三钱法起卦算法
- [x] 64卦基础数据
- [x] 卦象可视化
- [x] 本卦/变卦显示
- [x] 动爻详细解读
- [x] 手动输入功能
- [x] 完整多语言支持
- [x] 用户认证系统
- [x] 历史记录功能
- [x] 数据安全机制
- [x] 响应式侧边栏
- [x] 智能吉凶判断系统
- [x] 多层次加权评分算法
- [x] SWOT态势分析
- [x] 动态权重分配
- [ ] 分享功能
- [ ] 离线支持

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

## 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 设置环境变量（Firebase 配置）
3. 自动部署

### 其他平台

支持部署到任何支持静态网站的平台：
- Netlify
- GitHub Pages
- Firebase Hosting
- 自建服务器

## 文档

- [Firebase 设置指南](./FIREBASE_SETUP.md) - 详细的 Firebase 配置步骤
- [功能使用指南](./FEATURE_GUIDE.md) - 新功能使用说明

## 参考

- [周易](https://zh.wikipedia.org/wiki/周易) - 维基百科
- [易经六十四卦](https://zh.wikipedia.org/wiki/%E6%98%93%E7%BB%8F%E5%85%AD%E5%8D%81%E5%9B%9B%E5%8D%A6) - 卦象对照
- [Firebase 文档](https://firebase.google.com/docs) - Firebase 官方文档

## License

MIT License © 2025

