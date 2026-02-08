# 部署到 GitHub Pages 指南

## 🚀 部署步骤

### 1. 创建 GitHub 仓库

```bash
# 初始化 git 仓库
cd ~/workspace/github-page
git init

# 添加文件
git add .

# 首次提交
git commit -m "Initial commit"

# 关联远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/icehugh.github.io.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 进入仓库设置页面
2. 点击 **Pages** 设置
3. **Source** 选择 `GitHub Actions` 或从 `gh-pages` 分支部署

### 3. 自动部署（推荐）

使用 `deploy.sh` 脚本自动部署：

```bash
cd ~/workspace/github-page
./deploy.sh
```

### 4. 手动部署

```bash
# 构建项目
npm run build

# 部署到 gh-pages 分支
npx gh-pages -d dist
```

### 5. 访问网站

部署成功后，访问：
```
https://YOUR_USERNAME.github.io
```

## ⚙️ 配置说明

### vite.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/icehugh.github.io/',  // 修改为你的仓库名
})
```

## 📝 自定义内容

### 修改个人信息

编辑 `src/App.tsx`：

```typescript
// 修改技能
const skills = [
  { name: 'Vue.js', level: 95, icon: <Globe size={24} /> },
  // 添加更多技能...
]

// 修改项目
const projects = [
  {
    name: 'btc-connect',
    stars: 18,
    tech: 'TypeScript',
    desc: 'Bitcoin wallet connector'
  },
  // 添加更多项目...
]
```

### 修改主题颜色

在 `src/App.tsx` 中修改 Tailwind 类名：

```typescript
// 修改渐变色
className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"

// 修改主色调
className="from-purple-400 via-pink-400 to-purple-400"
```

## 🔧 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📦 技术栈

- ⚛️ React 19
- ⚡ Vite 6
- 🎨 Tailwind CSS 3
- 🎭 Framer Motion 12
- 🌈 Lucide React Icons
- 📦 TypeScript 5

## 🎨 设计特点

- 🌌 紫色渐变 Web3 主题
- ✨ 鼠标跟随光效
- 🎭 流畅动画效果
- 📱 完全响应式
- 🚀 极速加载

## 🐛 常见问题

### 构建失败

```bash
# 清理缓存
rm -rf node_modules dist .tmp
npm install
npm run build
```

### 部署失败

确保已安装 `gh-pages`：

```bash
npm install --save-dev gh-pages
```

### 样式不生效

确保 `index.css` 正确导入：

```typescript
import './index.css'
```

## 📚 相关资源

- [Vite 文档](https://vitejs.dev/)
- [React 19 文档](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GitHub Pages](https://pages.github.com/)
