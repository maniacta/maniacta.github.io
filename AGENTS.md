# Repository Guidelines

## Project Overview

Astro 6.x 静态博客站点，基于官方 `blog` starter 模板。纯静态生成（SSG），支持 Markdown/MDX 内容集合、RSS 订阅、Sitemap、Open Graph 元数据。无前端框架依赖 — 所有组件均为 `.astro` 文件。

## Architecture & Data Flow

```
构建时:
  src/content/blog/*.{md,mdx}         ← 内容作者编写 Markdown/MDX
       │
       ▼
  content.config.ts (Zod schema)     ← 校验 frontmatter，生成类型
       │
       ▼
  [...slug].astro / index.astro      ← getCollection('blog') 获取帖子
       │
       ▼
  layouts/BlogPost.astro             ← 渲染布局（标题、日期、hero image、正文）
       │
       ▼
  静态 HTML 输出到 dist/
```

- **内容驱动路由**: `src/pages/blog/[...slug].astro` 使用 `getStaticPaths()` 为每篇帖子生成页面
- **组件树**: 页面 → `BaseHead`（meta/SEO）→ `Header` → 内容 → `Footer`
- **全局状态**: 无运行时状态；`consts.ts` 导出构建时常量 `SITE_TITLE`、`SITE_DESCRIPTION`

## Key Directories

| 目录 | 用途 |
|---|---|
| `src/pages/` | 文件路由：`index.astro`(/)、`about.astro`(/about)、`blog/index.astro`(/blog)、`blog/[...slug].astro`(/blog/:slug)、`rss.xml.js`(/rss.xml) |
| `src/layouts/` | 页面布局组件；`BlogPost.astro` 为博客帖子与关于页面提供统一外壳 |
| `src/components/` | 可复用 UI 组件：`BaseHead`、`Header`、`Footer`、`HeaderLink`、`FormattedDate` |
| `src/content/blog/` | 内容集合 — Markdown/MDX 博客帖子，含 Zod 校验的 YAML frontmatter |
| `src/assets/` | 静态资源：图片（blog-placeholder-*.jpg）和本地字体（Atkinson woff） |
| `src/styles/` | 全局 CSS（global.css），基于 Bear Blog 主题 |
| `public/` | 直接复制到构建输出的静态文件（favicon） |

## Development Commands

| 命令 | 说明 |
|---|---|
| `npm install` | 安装依赖 |
| `npm run dev` | 启动开发服务器（`localhost:4321`） |
| `npm run build` | 生产构建，输出到 `dist/` |
| `npm run preview` | 本地预览生产构建 |
| `npm run astro -- --help` | Astro CLI 帮助 |
| `npx astro check` | 类型检查（无专用脚本，直接调用 astro CLI） |

**要求**: Node.js >= 22.12.0，使用 npm 作为包管理器（无 pnpm/yarn/bun 配置）。

## Code Conventions & Common Patterns

### Astro 组件结构

每个 `.astro` 文件分为两部分：
1. **Frontmatter script**（`---` 分隔）：TypeScript/JavaScript，运行于构建时/服务端
2. **Template**：HTML + Astro 表达式 `{expr}` + 组件实例 `<Component />`

```astro
---
// 构建时逻辑
import Header from '../components/Header.astro';
const posts = (await getCollection('blog')).sort(…);
---
<html>
  <Header />
  {posts.map(p => <Card {...p.data} />)}
</html>
```

### Props 类型

通过 `interface Props` 或从 Astro 类型导入定义：

```ts
// 简单 props
interface Props { title: string; description: string; }

// 从 content collections 推导
type Props = CollectionEntry<'blog'>['data'];

// 从 Astro HTML 属性扩展
type Props = HTMLAttributes<'a'>;
```

使用 `Astro.props` 解构。

### 内容集合模式

1. `content.config.ts` 用 `defineCollection` + Zod schema 定义集合
2. 页面中用 `getCollection('blog')` 获取帖子（返回 `CollectionEntry[]`）
3. `[...slug].astro` 用 `getStaticPaths()` + `render()` 生成单帖页面
4. Frontmatter 字段：`title`、`description`、`pubDate`、`updatedDate?`、`heroImage?`

### 样式

- 全局样式在 `src/styles/global.css`，通过 `BaseHead.astro` 中的 `import '../styles/global.css'` 引入
- 组件样式用 `<style>` 标签写在 `.astro` 文件底部，自动 scoped
- CSS 自定义属性定义在 `global.css` 的 `:root` 中：`--accent`、`--black`、`--gray`、`--gray-dark`、`--box-shadow`、`--gray-gradient`
- 颜色通道用 `rgb(var(--gray))` 模式以支持透明度变体

### 图片

- `public/` 中的图片：直接用路径字符串
- `src/assets/` 中的图片：通过 `import` 导入，然后用 Astro 的 `<Image />` 组件（`astro:assets`）优化
- Content collections 中的 hero image：schema 中用 `image()` 校验，BlogPost layout 中用 `<Image>` 渲染

### 命名约定

- 组件文件：PascalCase（`Header.astro`、`FormattedDate.astro`）
- 页面文件：kebab-case（`[...slug].astro`）
- 常量文件：camelCase（`consts.ts`）
- 导入路径：相对路径 `../components/Header.astro`

## Important Files

| 文件 | 说明 |
|---|---|
| `astro.config.mjs` | 站点配置：`site` URL、集成（MDX、Sitemap）、本地字体设置 |
| `src/content.config.ts` | 内容集合定义 + Zod schema |
| `src/consts.ts` | 全局常量：`SITE_TITLE`、`SITE_DESCRIPTION` |
| `src/pages/blog/[...slug].astro` | 博客帖子动态路由入口 |
| `src/layouts/BlogPost.astro` | 博客帖子与静态页面共享布局 |
| `src/components/BaseHead.astro` | SEO meta 标签、favicon、RSS 链接、字体预加载 |
| `src/styles/global.css` | 全局样式主题（Bear Blog 风格） |
| `tsconfig.json` | 继承 `astro/tsconfigs/strict`，额外开启 `strictNullChecks` |

## Runtime/Tooling Preferences

- **运行时**: Node.js >= 22.12.0
- **包管理器**: npm（`package-lock.json` 已存在）
- **框架**: Astro 6.x（无 React/Vue/Svelte 集成）
- **语言**: TypeScript（strict 模式）、Astro、MDX
- **推荐 VS Code 扩展**: `astro-build.astro-vscode`、`unifiedjs.vscode-mdx`

## Testing & QA

- 项目无测试框架配置（无 vitest/jest/playwright 依赖）
- 类型检查：`npx astro check`（基于 `astro/tsconfigs/strict`）
- 构建验证：`npm run build` 成功即表示所有页面可正确生成

## Deployment

站点通过 GitHub Actions 自动部署到 GitHub Pages。

- **Workflow**: `.github/workflows/deploy.yml`
  - `push` 到 `main` 分支时触发
  - 构建：`npm ci` → `npm run build`，产出 `dist/` artifact
  - 部署：`actions/deploy-pages` 发布到 `https://maniacta.github.io`
- **Pages Source**: 仓库 Settings → Pages → Source 必须设为 **GitHub Actions**

## SiYuan Publishing Workflow

通过 **siyuan-plugin-publisher** 实现「思源笔记写 → 一键发布」：

1. 思源中点击文档 → 发布 → 选择 GitHub Hexo 平台
2. 插件将文档导出为 Markdown（YAML frontmatter），通过 GitHub API 提交到 `src/content/blog/`
3. Push 触发 GitHub Actions → Astro 构建 → 部署

Schema 兼容性：
- 思源 publisher 生成 `date` 字段，Astro schema 同时接受 `date` 和 `pubDate`，通过 `.transform()` 归一化为 `pubDate`
- `description` 设 `default('')`，publisher 未提供时不会报错
- Publisher 路径配置：`src/content/blog`（已配置在 `D:\siyuan\data\storage\syp\sy-p-plus-cfg.json`）
