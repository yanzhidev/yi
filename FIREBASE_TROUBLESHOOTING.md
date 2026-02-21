# Google 登录问题排查指南

## 问题现象
点击"使用 Google 登录"按钮没有反应。

## 可能原因及解决方案

### 1. Firebase 配置缺失

**检查方法：**
- 打开浏览器开发者工具（F12）
- 查看控制台（Console）是否有 Firebase 配置错误信息

**解决方案：**
1. 在项目根目录创建 `.env.local` 文件
2. 添加以下配置（替换为你的 Firebase 项目信息）：

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Firebase 项目设置问题

**检查 Firebase 控制台设置：**

1. **启用 Google 登录**
   - 进入 Firebase Console
   - 选择你的项目
   - 点击 "Authentication" → "Sign-in method"
   - 确保 "Google" 已启用

2. **授权域名**
   - 在 Authentication → "Sign-in method" → "Google" 设置中
   - 添加开发域名：`localhost` 和 `127.0.0.1`
   - 如果使用其他端口，也要添加对应端口（如 `localhost:5173`）

3. **OAuth 同意屏幕**
   - 确保 OAuth 同意屏幕已配置
   - 应用状态应为"已发布"

### 3. 网络或浏览器问题

**解决方案：**
- 清除浏览器缓存和 Cookie
- 尝试使用无痕模式
- 检查是否有广告拦截器阻止 Google 登录
- 确保网络连接正常

### 4. Firebase SDK 版本问题

**检查 package.json：**
```json
"firebase": "^12.9.0"
```

如果版本不匹配，运行：
```bash
npm install firebase@latest
```

## 快速诊断步骤

### 步骤 1：检查配置
在浏览器控制台运行：
```javascript
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
```

### 步骤 2：测试 Firebase 连接
在浏览器控制台运行：
```javascript
import('firebase/app').then(({ initializeApp }) => {
  import('firebase/auth').then(({ getAuth }) => {
    try {
      const app = initializeApp({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
      });
      const auth = getAuth(app);
      console.log('✅ Firebase 初始化成功');
    } catch (error) {
      console.error('❌ Firebase 初始化失败:', error);
    }
  });
});
```

### 步骤 3：检查错误详情
点击登录按钮后，查看控制台是否有具体错误信息。

## 常见错误信息及解决方案

### "auth/popup-closed-by-user"
- 用户关闭了登录弹窗
- 重新点击登录按钮

### "auth/popup-blocked"
- 浏览器阻止了弹窗
- 允许网站的弹窗或尝试重定向方式

### "auth/unauthorized-domain"
- 域名未在 Firebase 中授权
- 在 Firebase Console 添加当前域名

### "auth/api-key-not-valid"
- API Key 无效
- 检查 `.env.local` 文件中的 API Key

### "network-request-failed"
- 网络连接问题
- 检查网络连接和防火墙设置

## 获取 Firebase 配置信息

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择你的项目
3. 点击项目设置（齿轮图标）
4. 在"您的应用"部分选择 Web 应用
5. 复制 Firebase 配置对象

## 联系支持

如果以上步骤都无法解决问题，请：
1. 提供浏览器控制台的完整错误信息
2. 说明你的 Firebase 项目配置情况
3. 提供你使用的浏览器和操作系统信息
