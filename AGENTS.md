# AGENTS.md - IceHub GitHub Page

## 项目概述

**技术栈**：React 19 + TypeScript + Vite 6 + Tailwind CSS 3 + Framer Motion 12

**项目类型**：个人主页/作品集展示网站，Web3 风格设计

**部署目标**：GitHub Pages (https://icehugh.github.io)

---

## 构建/测试/部署命令

### 本地开发
```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器 (http://localhost:5173)
npm run build        # 构建生产版本 (输出到 dist/)
npm run preview      # 预览构建结果
```

### 部署
```bash
npm run deploy       # 部署到 GitHub Pages (gh-pages 分支)
./deploy.sh          # 或使用部署脚本
```

### Linting
```bash
npx eslint .         # 运行 ESLint (无自动修复)
npx eslint . --fix   # 自动修复问题
```

**测试框架**：无 (项目无自动化测试)

---

## 代码规范

### TypeScript 配置 (`tsconfig.app.json`)
- **严格模式**：`strict: true`
- **未使用变量检查**：`noUnusedLocals: true`
- **未使用参数检查**：`noUnusedParameters: true`
- **switch 语句检查**：`noFallthroughCasesInSwitch: true`
- **目标**：ES2020
- **JSX**：react-jsx

### 导入规范
```typescript
// 1. React hooks
import { useState, useEffect } from 'react'

// 2. 第三方库
import { motion } from 'framer-motion'
import { Code2, Database } from 'lucide-react'

// 3. 本地文件 (相对路径，.tsx 扩展名)
import App from './App.tsx'
import './index.css'
```

### 命名约定
- **组件**：PascalCase (e.g., `App`, `SkillCard`)
- **变量/函数**：camelCase (e.g., `mousePosition`, `handleClick`)
- **常量**：camelCase (e.g., `skills`, `projects`)
- **类型/接口**：PascalCase (e.g., `Skill`, `Project`)
- **文件**：PascalCase for components (e.g., `App.tsx`)

### 代码风格
```typescript
// 使用函数组件 + hooks
function App() {
  const [state, setState] = useState(initialValue)
  
  useEffect(() => {
    // 副作用处理
    return () => {
      // 清理函数
    }
  }, [dependencies])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="..."
    >
      {/* 内容 */}
    </motion.div>
  )
}
```

### 错误处理
```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('User-friendly message')
}
```

### Tailwind CSS 规范
```typescript
// 样式顺序：布局 → 尺寸 → 间距 → 外观 → 交互
className="container mx-auto px-4 py-12 flex items-center gap-4 bg-purple-500 hover:bg-purple-600 rounded-xl"
```

### Framer Motion 动画
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  whileHover={{ scale: 1.05 }}
>
  {/* 内容 */}
</motion.div>
```

---

## 项目结构
```
.
├── src/
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 入口文件
│   ├── index.css        # 全局样式 (Tailwind)
│   └── index.css.d.ts   # CSS 类型声明
├── public/              # 静态资源
├── dist/                # 构建输出
├── assets/              # 构建产物 (CSS/JS)
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── eslint.config.js
├── deploy.sh
├── README.md
├── DEPLOY.md
└── PROJECT_SUMMARY.md
```

---

## Cursor/Copilot 规则

**无特定规则文件** (`.cursorrules`, `.github/copilot-instructions.md` 不存在)

### ESLint 配置 (`eslint.config.js`)
- `@eslint/js` - JavaScript 推荐规则
- `typescript-eslint` - TypeScript 推荐规则
- `eslint-plugin-react-hooks` - React Hooks 规则
- `eslint-plugin-react-refresh` - Vite 插件规则
- 忽略目录：`dist/`

---

## 重要提示

⚠️ **部署注意事项**：
1. `vite.config.ts` 中的 `base` 路径需与仓库名匹配
2. 使用 `npm run deploy` 前确保已构建 (`npm run build`)
3. GitHub Pages 部署到 `gh-pages` 分支，非 `main`

⚠️ **代码风格**：
- 禁止使用 `any` 类型，使用明确类型声明
- 组件必须使用 TypeScript (`.tsx`)
- 遵循 ESLint 配置 (`.eslint.config.js`)

---

## 自定义指南

### 修改个人信息
编辑 `src/App.tsx`：
- `skills` 数组 - 技能列表
- `projects` 数组 - 项目展示
- `organizations` 数组 - 组织贡献
- Hero section - 个人简介和社交链接

### 修改主题颜色
在 `src/App.tsx` 中修改 Tailwind 类名：
- 背景：`from-slate-950 via-purple-950 to-slate-900`
- 主色：`from-purple-400 via-pink-400 to-purple-400`

### 添加新页面/组件
1. 在 `src/` 创建新 `.tsx` 文件
2. 使用相同的动画和样式模式
3. 确保类型安全 (TypeScript)

---

## Git 工作流

```bash
# 开发流程
git checkout -b feature/new-component
git add src/
git commit -m "feat: add new component"
git push

# 合并到 main 并部署
git checkout main
git merge feature/new-component
git push
npm run deploy
```

### 提交信息格式
```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式 (不影响代码运行)
refactor: 重构 (非新功能，非 bug 修复)
chore: 构建过程或辅助工具变动
```

---

## 快速参考

| 操作 | 命令 |
|------|------|
| 安装依赖 | `npm install` |
| 本地开发 | `npm run dev` |
| 构建生产 | `npm run build` |
| 预览构建 | `npm run preview` |
| 部署到 GitHub Pages | `npm run deploy` |
| 运行 ESLint | `npx eslint . --fix` |
| 清理缓存 | `rm -rf node_modules dist .tmp && npm install` |

---

*最后更新：2026-02-28 | 基于 gh-pages 分支代码*
