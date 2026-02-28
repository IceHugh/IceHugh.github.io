# IceHub GitHub Page 重构计划

## 一、现有代码分析

### 1.1 当前文件结构
```
src/
├── App.tsx          # 259行 - 所有功能都在一个文件
├── main.tsx         # 入口文件
├── index.css        # Tailwind 样式
└── index.css.d.ts   # CSS 类型声明
```

### 1.2 App.tsx 结构分析

| 部分 | 行数 | 职责 | 可复用性 |
|------|------|------|----------|
| imports | 1-3 | 依赖导入 | - |
| mousePosition hook | 6-18 | 鼠标跟踪动画 | ✅ 可提取为 hook |
| skills 数据 | 20-29 | 技能数据 | ✅ 可提取到 data/ |
| projects 数据 | 31-56 | 项目数据 | ✅ 可提取到 data/ |
| organizations 数据 | 58-63 | 组织数据 | ✅ 可提取到 data/ |
| Animated Background | 68-73 | 动画背景 | ✅ 可提取为组件 |
| Hero Section | 77-122 | 个人介绍区 | ✅ 可提取为组件 |
| Skills Section | 124-162 | 技能展示 | ✅ 可提取为组件 |
| Projects Section | 164-206 | 项目展示 | ✅ 可提取为组件 |
| Organizations Section | 208-242 | 组织贡献 | ✅ 可提取为组件 |
| Footer | 244-253 | 页脚 | ✅ 可提取为组件 |

### 1.3 识别的问题

| 问题 | 严重性 | 说明 |
|------|--------|------|
| 单文件过大 | 🔴 高 | 259行代码全在一个文件，难以维护 |
| 数据与视图耦合 | 🟡 中 | 数据硬编码在组件中，不易修改 |
| 缺少类型定义 | 🟡 中 | 技能/项目/组织缺少类型接口 |
| 样式硬编码 | 🟡 中 | Tailwind 类名未抽象，重复代码多 |
| 无自定义 hooks | 🟡 中 | 鼠标跟踪逻辑可复用 |
| 缺少主题配置 | 🟢 低 | 颜色/动画参数分散 |

### 1.4 重复模式识别

**卡片组件模式** (出现3次):
- Skills Card: `bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20`
- Project Card: 相同样式 + hover 效果
- Organization Card: 相同样式

**Section 包装模式** (出现4次):
```tsx
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    {emoji} {title}
  </h2>
  {/* 内容 */}
</motion.section>
```

**进度条动画模式**:
```tsx
<motion.div
  initial={{ width: 0 }}
  whileInView={{ width: `${level}%` }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
/>
```

---

## 二、重构步骤

### Phase 1: 类型定义 ✅
**目标**: 建立类型系统基础

1. 创建 `src/types/index.ts`
2. 定义 `Skill`, `Project`, `Organization` 接口
3. 定义动画配置类型 `AnimationConfig`

### Phase 2: 数据分离 ✅
**目标**: 数据与组件解耦

1. 创建 `src/data/skills.ts`
2. 创建 `src/data/projects.ts`
3. 创建 `src/data/organizations.ts`
4. 创建 `src/data/index.ts` 统一导出

### Phase 3: 自定义 Hooks ✅
**目标**: 提取可复用逻辑

1. 创建 `src/hooks/useMousePosition.ts`
2. 可选: 创建 `src/hooks/useInView.ts`

### Phase 4: 基础组件 ✅
**目标**: 建立可复用组件库

1. 创建 `src/components/ui/Card.tsx` - 通用卡片
2. 创建 `src/components/ui/Section.tsx` - Section 包装
3. 创建 `src/components/ui/ProgressBar.tsx` - 进度条
4. 创建 `src/components/ui/SectionTitle.tsx` - 标题组件
5. 创建 `src/components/ui/Avatar.tsx` - 头像组件

### Phase 5: 业务组件 ✅
**目标**: 拆分业务模块

1. 创建 `src/components/AnimatedBackground.tsx`
2. 创建 `src/components/Hero.tsx`
3. 创建 `src/components/SkillsSection.tsx`
4. 创建 `src/components/ProjectsSection.tsx`
5. 创建 `src/components/OrganizationsSection.tsx`
6. 创建 `src/components/Footer.tsx`

### Phase 6: 配置与常量 ✅
**目标**: 提取配置项

1. 创建 `src/config/theme.ts` - 颜色/渐变配置
2. 创建 `src/config/animations.ts` - 动画配置

### Phase 7: 重构 App.tsx ✅
**目标**: 整合所有模块

1. 重写 App.tsx 使用新组件
2. 确保功能不变
3. 运行 ESLint 检查
4. 构建测试

---

## 三、新文件结构

```
src/
├── main.tsx                    # 入口文件
├── App.tsx                     # 主应用 (约 50 行)
├── index.css                   # 全局样式
│
├── types/
│   └── index.ts                # 类型定义
│
├── data/
│   ├── index.ts                # 数据统一导出
│   ├── skills.ts               # 技能数据
│   ├── projects.ts             # 项目数据
│   └── organizations.ts        # 组织数据
│
├── hooks/
│   └── useMousePosition.ts     # 鼠标位置 hook
│
├── config/
│   ├── theme.ts                # 主题配置
│   └── animations.ts           # 动画配置
│
└── components/
    ├── ui/                     # 通用 UI 组件
    │   ├── Card.tsx            # 卡片组件
    │   ├── Section.tsx         # Section 包装
    │   ├── SectionTitle.tsx    # 标题组件
    │   ├── ProgressBar.tsx     # 进度条
    │   └── Avatar.tsx          # 头像组件
    │
    ├── AnimatedBackground.tsx  # 动画背景
    ├── Hero.tsx                # 个人介绍
    ├── SkillsSection.tsx       # 技能展示
    ├── ProjectsSection.tsx     # 项目展示
    ├── OrganizationsSection.tsx# 组织贡献
    └── Footer.tsx              # 页脚
```

---

## 四、重构收益

| 指标 | 重构前 | 重构后 | 改善 |
|------|--------|--------|------|
| App.tsx 行数 | 259 | ~50 | ↓ 80% |
| 可复用组件 | 0 | 6+ | ↑ 新增 |
| 类型安全 | 部分 | 完整 | ✅ |
| 数据维护 | 硬编码 | 独立文件 | ✅ |
| 测试友好 | 困难 | 可单元测试 | ✅ |

---

## 五、技术债务清单

| 项目 | 优先级 | 说明 |
|------|--------|------|
| 添加单元测试 | 🟡 中 | 使用 Vitest |
| 添加 SEO 优化 | 🟡 中 | meta 标签、Open Graph |
| 添加暗色主题切换 | 🟢 低 | 当前仅暗色 |
| 添加国际化支持 | 🟢 低 | 多语言 |
| 性能优化 | 🟢 低 | 图片懒加载、代码分割 |

---

## 六、执行计划

```
[Phase 1] types/index.ts           → 类型定义
[Phase 2] data/*.ts                → 数据分离
[Phase 3] hooks/*.ts               → 自定义 hooks
[Phase 4] components/ui/*.tsx      → 基础组件
[Phase 5] components/*.tsx         → 业务组件
[Phase 6] config/*.ts              → 配置文件
[Phase 7] App.tsx 重构             → 整合测试
```

---

*创建时间: 2026-02-28*