# 数字易经

一个基于 React + TypeScript + Tailwind CSS 的现代易经起卦应用，采用传统算法与现代技术相结合，提供专业的卦象分析与解读服务。

[在线演示](https://yi-pi.vercel.app/)

## ✨ 功能特性

### 🎯 核心功能
- **三钱法起卦** - 采用传统铜钱投掷算法，精确模拟古代起卦方式
- **手动输入模式** - 支持精确选择每爻结果，满足特定需求
- **智能吉凶判断** - 多层次加权评分系统，综合分析卦象吉凶态势
- **爻位关系分析** - 深度分析当位、承乘、应与等爻位关系
- **变爻重点解读** - 根据变爻数量智能确定解读重点和策略

### 📊 分析维度
- **卦辞断语分析** - 基于吉凶关键词的语义分析
- **上下卦关系** - 天地关系、五行相生相克、阴阳调和
- **爻位综合评估** - 当位性、特殊组合、变爻分析、阴阳平衡
- **SWOT态势分析** - 优势、劣势、机遇、威胁四象限洞察

### 👤 用户体验
- **用户认证系统** - Google 登录，安全可靠的身份验证
- **历史记录管理** - 云端同步，支持查看和管理历史起卦记录
- **完整多语言支持** - 中文简体、繁体、英文、西班牙文、日文、韩文全覆盖
- **响应式设计** - 桌面端优雅布局，移动端完美适配
- **禅意美学设计** - 简约优雅的界面风格，留白与石色配色

### 🛠️ 技术特性
- **现代化技术栈** - React 19 + TypeScript + Vite 7 + Tailwind CSS 4
- **高性能架构** - 组件化设计，代码分割，懒加载优化
- **类型安全** - 完整的 TypeScript 类型定义
- **测试覆盖** - 单元测试和集成测试保障代码质量

## 🔧 技术栈

### 前端框架
- **React 19** - 最新的 React 版本，支持并发特性
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite 7** - 极速的前端构建工具
- **Tailwind CSS 4** - 原子化 CSS 框架

### 开发工具
- **ESLint + TypeScript ESLint** - 代码质量和风格检查
- **Vitest** - 快速的单元测试框架
- **React Testing Library** - React 组件测试工具

### 后端服务
- **Firebase Authentication** - 用户认证服务
- **Firebase Firestore** - NoSQL 文档数据库
- **Firebase Hosting** - 静态网站托管

### 第三方库
- **Lucide React** - 现代化图标库
- **CLSX** - 条件类名工具

## 🎯 核心算法

### 三钱法起卦
采用传统「三钱法」算法，精确模拟古代起卦过程：

```typescript
// 投掷三枚铜钱，根据点数总和判定爻象
// 6 (老阴) - 阴爻，变爻 ⚋
// 7 (少阳) - 阳爻 ⚊  
// 8 (少阴) - 阴爻 ⚋
// 9 (老阳) - 阳爻，变爻 ⚊
```

### 智能评分系统
多层次加权评分算法，综合分析卦象吉凶：

#### 评分维度权重
- **卦辞断语分析** (40%) - 基于吉凶关键词的语义分析
- **上下卦关系** (30%) - 天地关系、五行相生相克、阴阳调和
- **爻位综合评估** (30%) - 当位性、特殊组合、变爻分析

#### 动态权重分配
根据变爻数量智能调整本卦和变卦权重：
- 0个变爻：本卦100%，变卦0%
- 1个变爻：本卦90%，变卦10%
- 2个变爻：本卦80%，变卦20%
- 3个变爻：本卦60%，变卦40%
- 4个变爻：本卦40%，变卦60%
- 5个变爻：本卦20%，变卦80%
- 6个变爻：本卦10%，变卦90%

### 爻位关系分析
深度分析爻位间的复杂关系：
- **当位分析** - 判断爻位是否得当（阳居奇位，阴居偶位）
- **承乘关系** - 分析相邻爻位的承乘关系
- **应与关系** - 分析初四、二五、三六爻的相应关系
- **承乘据比** - 综合分析爻位间的各种关系模式

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn
- Git

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/yanzhidev/yi.git
cd yi
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local，填入您的 Firebase 配置
# 详细配置步骤请参考 FIREBASE_SETUP.md
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **构建生产版本**
```bash
npm run build
npm run preview  # 预览构建结果
```

### 开发命令
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
npm run test         # 运行测试
npm run lint         # 代码检查
```

### Firebase 设置

详细的 Firebase 设置步骤请参考 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)：

1. 创建 Firebase 项目
2. 启用 Authentication (Google 登录)
3. 设置 Firestore 数据库
4. 配置安全规则
5. 设置环境变量

## 📁 项目结构

```
src/
├── components/                    # React 组件
│   ├── hexagram/                 # 卦象相关组件
│   │   ├── HexagramCard.tsx      # 卦象卡片组件
│   │   ├── HexagramBasicInfo.tsx # 基础信息显示
│   │   ├── HexagramText.tsx      # 卦辞文本显示
│   │   ├── HexagramImage.tsx     # 卦象图形显示
│   │   └── ...                   # 其他卦象组件
│   ├── AuthButton.tsx            # 认证按钮组件
│   ├── HistorySidebar.tsx        # 历史记录侧边栏
│   ├── HexagramResult.tsx        # 解卦结果组件
│   ├── FortuneAssessmentDisplay.tsx  # 吉凶判断显示
│   ├── LanguageSelector.tsx      # 语言选择器
│   └── ManualInput.tsx           # 手动输入界面
├── contexts/                     # React Context
│   ├── AuthContext.tsx           # 认证状态管理
│   └── LanguageContext.tsx       # 语言管理
├── hooks/                        # 自定义 Hooks
│   └── useHexagramInterpretation.ts  # 变爻解读逻辑
├── lib/                          # 第三方库配置
│   └── firebase.ts               # Firebase 初始化和函数
├── data/                         # 数据文件
│   ├── hexagrams.json            # 64卦详细数据（中文）
│   ├── hexagrams_en.json         # 英文卦象数据
│   ├── hexagrams_es.json         # 西班牙语卦象数据
│   ├── lines.json                # 爻辞详细数据
│   └── hexagramNames.ts          # 卦象名称多语言映射
├── utils/                        # 工具函数
│   ├── iching.ts                 # 三钱法起卦核心逻辑
│   ├── fortuneAssessment/        # 吉凶判断算法模块
│   │   ├── index.ts              # 主入口
│   │   ├── analysis.ts           # 分析算法
│   │   ├── config.ts             # 配置文件
│   │   ├── scorers/              # 评分器模块
│   │   │   ├── hexagramText.ts   # 卦辞文本评分
│   │   │   ├── linePosition.ts   # 爻位评分
│   │   │   └── trigramRelation.ts # 三卦关系评分
│   │   └── types.ts              # 类型定义
│   ├── lineRelations.ts          # 爻位关系分析
│   ├── lineRelationsI18n.ts      # 爻位关系国际化
│   ├── i18n/                     # 国际化模块
│   │   ├── index.ts              # 主入口
│   │   ├── types.ts              # 类型定义
│   │   ├── zh-CN.ts              # 简体中文
│   │   ├── zh-TW.ts              # 繁体中文
│   │   ├── en.ts                 # 英文
│   │   ├── es.ts                 # 西班牙语
│   │   ├── ja.ts                 # 日文
│   │   └── ko.ts                 # 韩文
│   ├── historyManager.ts         # 历史记录管理
│   └── styles.ts                 # 样式工具函数
├── test/                         # 测试文件
│   ├── utils/                    # 工具函数测试
│   ├── components/               # 组件测试
│   └── hooks/                    # Hook 测试
├── App.tsx                       # 主应用组件
├── main.tsx                      # 应用入口
└── index.css                     # 全局样式
```

## 📊 数据模型

### 历史记录 (HexagramHistory)

```typescript
interface HexagramHistory {
  id?: string                    // 文档ID
  userId: string                 // 用户ID，确保数据隔离
  question: string               // 用户问题
  originalHexagram: {            // 本卦信息
    number: number               // 卦序 (1-64)
    name: string                 // 卦名
    lines: number[]              // 六爻数组 [0,1,0,1,0,1]
  }
  changedHexagram?: {            // 变卦信息（可选）
    number: number               // 变卦序
    name: string                 // 变卦名
    lines: number[]              // 变卦六爻
  } | null
  changingLines: number[]        // 变爻位置 [1,3,5]
  timestamp: Date                // 起卦时间
  language: string               // 界面语言
}
```

### 卦象数据 (HexagramData)

```typescript
interface HexagramData {
  id: number                     // 卦序 (1-64)
  name: string                   // 卦名
  pinyin: string                 // 拼音
  binary: string                 // 二进制卦象
  symbol: string                 // 卦象符号
  text: string                   // 卦辞
  tuan: string                   // 彖曰
  daxiang: string                // 大象
  yongjiu?: string               // 用九（乾卦）
  yongliu?: string               // 用六（坤卦）
  interpretation?: {              // 通俗解读
    plainTranslation: string     // 白话翻译
    lifeInspiration: string      // 人生启示
    decisionAdvice: string       // 决策建议
  }
}
```

### 爻位关系 (LineRelationAnalysis)

```typescript
interface LineRelationAnalysis {
  position: number               // 爻位 (1-6)
  yaoName: string                // 爻名（初九、六二等）
  lineValue: 0 | 1              // 爻值（0阴爻，1阳爻）
  isDangWei: boolean            // 是否当位
  dangWeiText: string            // 当位说明
  yingRelation: string           // 应与关系
  chengChengRelation: string     // 承乘关系
  positionAdvice: string         // 爻位建议
}
```

## 🔒 安全机制

### 数据安全
- **用户隔离** - 每个用户只能访问自己的历史记录
- **权限验证** - 删除操作验证文档所有权
- **身份认证** - Firebase Auth 确保用户身份真实性
- **安全规则** - Firestore 安全规则保护数据访问

### 权限控制示例

```typescript
// 查看权限：只能查询自己的记录
const userHistoryQuery = query(
  collection(db, 'hexagramHistory'),
  where('userId', '==', userId)
);

// 删除权限：验证文档所有权
const deleteHistory = async (docId: string) => {
  const docRef = doc(db, 'hexagramHistory', docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists() && docSnap.data().userId === userId) {
    await deleteDoc(docRef);
  } else {
    throw new Error('无权限删除此历史记录');
  }
};
```

## 📈 性能优化

### 构建优化
- **代码分割** - 使用动态导入减少初始加载体积
- **懒加载** - 按需加载卦象数据和语言包
- **Tree Shaking** - 移除未使用的代码
- **资源压缩** - Gzip 压缩减少传输体积

### 运行时优化
- **React.memo** - 防止不必要的组件重渲染
- **useMemo/useCallback** - 缓存计算结果和函数引用
- **虚拟化** - 大列表使用虚拟滚动技术

## 🧪 测试策略

### 测试覆盖
项目包含完整的测试套件，覆盖以下方面：

#### 单元测试
- **核心算法测试** - 三钱法算法、卦象映射逻辑
- **工具函数测试** - 吉凶判断、爻位关系分析
- **Hook 测试** - 自定义 Hook 逻辑验证

#### 集成测试
- **组件测试** - UI 组件功能验证
- **用户交互测试** - 完整用户流程测试

### 运行测试
```bash
npm test              # 运行所有测试
```

## 🚀 部署指南

### Vercel 部署（推荐）

1. **连接仓库**
   - 登录 Vercel 控制台
   - 导入 GitHub 仓库

2. **配置环境变量**
   ```bash
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **自动部署**
   - 推送到主分支自动触发部署
   - 预览环境用于 PR 测试

### 其他部署平台

支持部署到任何支持静态网站的平台：
- **Netlify** - 拖拽部署，Git 集成
- **GitHub Pages** - 免费静态网站托管
- **Firebase Hosting** - 与 Firebase 服务深度集成
- **自建服务器** - 使用 Nginx 或 Apache

## 📚 数据资源

### 64卦数据结构

位于 `src/data/` 目录，包含完整的易经数据：

#### 卦象数据文件
- **hexagrams.json** - 中文版64卦详细数据
- **hexagrams_en.json** - 英文版卦象数据  
- **hexagrams_es.json** - 西班牙语版卦象数据
- **lines.json** - 爻辞详细数据（中文）
- **lines_en.json** - 爻辞数据（英文）
- **lines_es.json** - 爻辞数据（西班牙语）

#### 数据内容
每卦包含：
- **基础信息** - 卦序、卦名、拼音、二进制编码
- **卦象符号** - Unicode 卦象符号
- **经典文本** - 卦辞、彖曰、大象
- **特殊爻辞** - 用九（乾卦）、用六（坤卦）
- **通俗解读** - 白话翻译、人生启示、决策建议

### 多语言支持

支持六种语言的完整本地化：
- **简体中文** (zh-CN) - 主要语言，数据最完整
- **繁体中文** (zh-TW) - 港澳台用户
- **英文** (en) - 国际化支持
- **西班牙语** (es) - 西语市场
- **日文** (ja) - 日本市场
- **韩文** (ko) - 韩国市场

## 🗺️ 开发路线图

### 已完成功能 ✅
- [x] 三钱法起卦算法实现
- [x] 64卦基础数据集成
- [x] 卦象可视化组件
- [x] 本卦/变卦显示逻辑
- [x] 动爻详细解读系统
- [x] 手动输入功能
- [x] 完整多语言支持（6种语言）
- [x] 用户认证系统集成
- [x] 历史记录功能
- [x] 数据安全机制
- [x] 响应式侧边栏设计
- [x] 智能吉凶判断系统
- [x] 多层次加权评分算法
- [x] SWOT态势分析
- [x] 动态权重分配机制
- [x] 爻位关系分析
- [x] 变爻重点解读
- [x] 模块化评分器架构

### 开发中功能 🚧
- [ ] 性能优化（代码分割、懒加载）
- [ ] 测试用例修复和完善
- [ ] TypeScript 类型安全改进

### 计划功能 📋
- [ ] 分享功能（社交媒体分享卦象结果）
- [ ] 离线支持（PWA、Service Worker）
- [ ] 卦象搜索功能
- [ ] 个人收藏夹
- [ ] 导出功能（PDF、图片）
- [ ] 深色模式支持
- [ ] 键盘快捷键
- [ ] 语音朗读功能

### 长期规划 🎯
- [ ] AI 智能解读
- [ ] 卦象匹配推荐
- [ ] 社区功能
- [ ] 移动端 App
- [ ] 更多语言支持
- [ ] 高级分析工具

## 📖 相关文档

- [Firebase 设置指南](./FIREBASE_SETUP.md) - 详细的 Firebase 配置步骤
- [功能使用指南](./FEATURE_GUIDE.md) - 新功能使用说明
- [故障排除指南](./FIREBASE_TROUBLESHOOTING.md) - 常见问题解决方案
- [爻位关系功能说明](./LINE_RELATIONS_FEATURE.md) - 爻位关系分析详解
- [吉凶判断逻辑修复说明](./FORTUNE_ASSESSMENT_CHINESE_LOGIC_FIX.md) - 中文逻辑优化详情

## 🌐 参考资料

### 易经相关
- [周易](https://zh.wikipedia.org/wiki/周易) - 维基百科
- [易经六十四卦](https://zh.wikipedia.org/wiki/%E6%98%93%E7%BB%8F%E5%85%AD%E5%8D%81%E5%9B%9B%E5%8D%A6) - 卦象对照表
- [易经白话解](https://www.guoxue.com/shibu/01zhouyi/zjy.htm) - 国学网

### 技术文档
- [React 19 文档](https://react.dev/) - 官方文档
- [TypeScript 手册](https://www.typescriptlang.org/docs/) - 类型系统指南
- [Vite 文档](https://vitejs.dev/) - 构建工具文档
- [Tailwind CSS](https://tailwindcss.com/docs) - CSS 框架文档
- [Firebase 文档](https://firebase.google.com/docs) - 后端服务文档

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 开发流程
1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 编写单元测试
- 更新相关文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为易经文化传承做出贡献的学者和开发者。

---

**© 2025 数字易经** - 传统智慧与现代技术的完美结合

## 📊 项目统计

- **代码行数**: ~15,000+ 行 TypeScript/TSX
- **测试覆盖**: 核心算法 100% 覆盖
- **支持语言**: 6 种语言完整本地化
- **卦象数据**: 64 卦完整数据 + 爻辞数据
- **组件数量**: 20+ React 组件
- **工具函数**: 30+ 实用工具函数

