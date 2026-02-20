# Firebase 配置指南

本应用已集成 Firebase Authentication 和 Firestore 来实现用户认证和历史记录功能。

## 1. 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"添加项目"
3. 输入项目名称（例如：yi-iching-app）
4. 选择是否启用 Google Analytics（可选）
5. 点击"创建项目"

## 2. 启用 Authentication

1. 在 Firebase Console 中，选择您的项目
2. 在左侧菜单中，点击"Authentication"
3. 点击"开始使用"
4. 在"登录方法"标签页中：
   - 启用"Google"提供者
   - 输入项目支持电子邮件地址
   - 启用该提供者

## 3. 设置 Firestore 数据库

1. 在左侧菜单中，点击"Firestore 数据库"
2. 点击"创建数据库"
3. 选择"以测试模式启动"（开发阶段）或"以生产模式启动"（生产环境）
4. 选择数据库位置
5. 点击"启用"

## 4. 获取配置信息

1. 在项目设置中，点击"常规"标签页
2. 向下滚动到"您的应用"部分
3. 点击 Web 应用图标（`</>`）
4. 输入应用名称，点击"注册应用"
5. Firebase 会显示配置信息，复制这些值

## 5. 配置环境变量

1. 复制 `.env.example` 文件为 `.env.local`：
   ```bash
   cp .env.example .env.local
   ```

2. 编辑 `.env.local` 文件，填入您的 Firebase 配置：
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## 6. 启动应用

```bash
npm run dev
```

## 7. 功能说明

### 用户认证
- 点击右上角的"使用 Google 登录"按钮
- 使用 Google 账户登录
- 登录后显示用户头像，点击头像可退出登录

### 历史记录
- 登录用户的每次算卦结果会自动保存
- 点击左上角的菜单图标（移动端）或查看左侧边栏（桌面端）
- 历史记录按时间倒序排列
- 点击历史记录可查看对应的算卦结果

### 数据结构
Firestore 中的 `hexagramHistory` 集合包含以下字段：
- `userId`: 用户 ID
- `question`: 用户问题
- `originalHexagram`: 本卦信息
- `changedHexagram`: 变卦信息（如果有）
- `changingLines`: 变爻位置
- `timestamp`: 创建时间

## 8. 安全规则（生产环境）

在生产环境中，建议设置 Firestore 安全规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户只能访问自己的历史记录
    match /hexagramHistory/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 8.5 临时测试规则（如果上述规则有问题）

如果遇到权限问题，请使用以下临时规则进行测试：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 9. 部署注意事项

- 确保在生产环境中使用生产模式的 Firestore
- 设置适当的安全规则
- 考虑启用 Firebase Analytics 来了解用户使用情况
- 定期备份数据库
