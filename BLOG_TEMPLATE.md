---
# ============================================================
# Frontmatter 字段说明
# ============================================================
# title:        [必需] 文章标题，同时作为页面 title 和 og:title
# description:  [必需] 文章摘要，用于列表卡片和 SEO meta description
# pubDate:      [必需] 发布日期，格式 YYYY-MM-DD
# updatedDate:  [可选] 更新日期，若晚于 pubDate 则页面显示 "Updated: xxx"
# heroImage:    [可选] 封面图 URL，支持外链或本地相对路径
# tags:         [可选] 标签列表，用于筛选、标签云、侧边栏
# categories:   [可选] 分类列表，用于 /categories 分类页面聚合
# subject:      [可选] 主题/学科
# draft:        [可选] 草稿状态，true 时仅 dev 环境可见，生产构建排除
# featured:     [可选] 精选标记，true 时优先展示在首页精选区
# author:       [可选] 作者名，默认使用 site.json 中的 author
# location:     [可选] 地点，展示于文章头部 meta 信息
# keywords:     [额外] SEO 关键词，写入页面 meta keywords（非标准字段但可用）
# ============================================================
title: "博客 Markdown 功能模板"
description: "本文档展示本博客支持的全部 Markdown/MDX 语法与功能特性"
pubDate: 2026-01-01
updatedDate: 2026-06-03
heroImage: /images/default-social.png
tags:
  - Markdown
  - 模板
  - 博客功能
categories:
  - 文档
subject: 技术文档
draft: true
featured: false
author: maniacta
location: Beijing, China
keywords: Markdown,模板,博客功能,MDX,语法高亮
---

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 p-4 rounded-lg my-4">
  <p class="font-bold text-blue-700 dark:text-blue-300">💡 关于文章标题</p>
  <p class="text-blue-600 dark:text-blue-400 mt-1">页面显示的标题来自 frontmatter 的 <code>title</code> 字段。如果你使用<strong>思源笔记</strong>等工具写作，Markdown 内容中的 <code># 一级标题</code> 会被自动隐藏，<strong>不会出现双标题</strong>。你可以保留它，不影响最终渲染效果。</p>
</div>


## 一、文本格式化

### 粗体与斜体

这是 **粗体文本**，这是 *斜体文本*，这是 ***粗斜体***，这是 ~~删除线~~。

---

### 引用块

> 这是一段引用文字。
> 引用可以跨多行。
>
> > 引用支持嵌套。
> >
> > - 嵌套引用中可以包含列表
> > - 支持 **格式化**

---

## 二、列表

### 无序列表

- 项目一
- 项目二
  - 子项目 2.1
  - 子项目 2.2
- 项目三

### 有序列表

1. 第一步
2. 第二步
   1. 子步骤 2.1
   2. 子步骤 2.2
3. 第三步

### 任务列表

- [x] 已完成的任务
- [ ] 待完成的任务
- [ ] 另一项待办

---

## 三、链接与图片

### 链接

[内联链接](https://example.com)

[带标题的链接](https://example.com "鼠标悬停提示")

<https://example.com>（自动链接）

### 图片

![替代文本](https://example.com/image.png)

<!-- 本地图片 -->
<!-- ![本地图片](/path/to/image.png) -->

### 带链接的图片

[![点击图片跳转](https://example.com/image.png)](https://example.com)

---

## 四、代码

### 内联代码

在文本中使用 `const x = 42` 这样的内联代码。

### 围栏代码块（带语法高亮）

支持语言：`html` `css` `js` `ts` `jsx` `tsx` `json` `bash` `md`

```ts
// TypeScript 示例
interface User {
  id: number
  name: string
  email: string
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  return res.json()
}
```

```python
# Python 示例
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
    email: str

def greet(user: User) -> str:
    return f"Hello, {user.name}!"
```

```bash
# Bash 示例
#!/bin/bash
set -euo pipefail

echo "Deploying..."
npm run build
npm run deploy
```

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "build": "astro build",
    "dev": "astro dev"
  }
}
```

### 行内高亮（部分高亮）

```js {2,4-5}
function hello() {
  // 这行被高亮
  const name = "world"
  // 这行被高亮
  return `Hello, ${name}!`
}
```

---

## 五、表格

| 功能 | 状态 | 说明 |
| ---- | ---- | ---- |
| 暗色模式 | ✅ 已支持 | 自动跟随系统偏好，支持手动切换 |
| 目录导航 | ✅ 已支持 | 自动提取 h2/h3 生成目录 |
| 代码高亮 | ✅ 已支持 | Shiki + github-dark 主题 |
| 全文搜索 | ✅ 已支持 | 基于 Fuse.js 的客户端搜索 |
| 评论系统 | ⚙️ 可配置 | 基于 Giscus，需配置 GitHub repo |
| RSS | ✅ 已支持 | 自动生成 RSS feed |
| Sitemap | ✅ 已支持 | 自动生成 sitemap.xml |

### 列对齐

| 左对齐 | 居中对齐 | 右对齐 |
| :----- | :------: | -----: |
| 内容 A | 内容 B   | 内容 C |
| 长文本 | 中       | 12345  |

---

## 六、数学公式

本博客支持 LaTeX 数学公式（通过 KaTeX 或 MathJax 渲染）：

行内公式：$E = mc^2$

块级公式：

$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0
\end{aligned}
$$

---

## 七、脚注

这是一段带脚注的文本[^1]。

这是另一个脚注引用[^note]。

[^1]: 这是脚注的详细说明。
[^note]: 脚注标签支持命名。

---

## 八、自定义 HTML

<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg my-4">
  <p class="font-semibold text-yellow-800 dark:text-yellow-200">⚠️ 提示</p>
  <p class="text-yellow-700 dark:text-yellow-300 mt-1">你可以直接在 Markdown 中嵌入 HTML，用于自定义样式和布局。</p>
</div>

<details>
<summary>点击展开更多内容</summary>

这里是折叠的内容，适用于需要隐藏的补充信息。

```ts
const hidden = "这段代码默认是折叠的"
```

</details>

---

## 九、分隔线

上面内容

---

下面内容

上面内容

* * *

下面内容（三种写法等效）

---

## 十、Emoji 表情

:rocket: :sparkles: :memo: :bulb: :warning: :white_check_mark: :x:

---

## 十一、定义列表

<dl>
  <dt><strong>MDX</strong></dt>
  <dd>Markdown for the component era — 在 Markdown 中使用 JSX 组件。</dd>

  <dt><strong>Astro</strong></dt>
  <dd>现代化的静态站点生成器，默认零 JS 输出。</dd>
</dl>

---

## 十二、缩略语

<abbr title="HyperText Markup Language">HTML</abbr> 和 <abbr title="Cascading Style Sheets">CSS</abbr> 是 Web 的基础技术。

---

## 十三、自动目录

在 Markdown 中插入 `## Table of Contents` 标题后跟 `{/* toc */}` 注释，`remark-toc` 插件会自动生成目录：

## Table of Contents

---

## 十四、Frontmatter 重要提示

### 日期格式

`pubDate` 和 `updatedDate` 支持多种格式：

```yaml
# YAML 日期格式（推荐）
pubDate: 2026-01-01

# 完整 ISO 格式
pubDate: 2026-01-01T12:00:00Z

# 字符串形式（会被 coerce 为 Date）
pubDate: '2026-01-01'
```

### 草稿与精选

```yaml
---
# draft: true 时，生产构建(`astro build`)会排除该文章
draft: true

# featured: true 时，文章会优先展示在首页精选区域
featured: false
---
```

### 标签自动生成

标签会自动生成对应的标签页 `/tags/标签名`，标签名中的空格会转为连字符。

```yaml
tags:
  - JavaScript      # → /tags/javascript
  - 前端开发         # → /tags/前端开发
  - Web Performance  # → /tags/web-performance
```

---

## 十五、项目 Frontmatter 模板

用于 `src/content/projects/` 目录下的 `.md` 文件：

```yaml
---
title: "项目名称"
description: "项目简介"
pubDate: 2026-01-01
updatedDate: 2026-06-01
heroImage: /images/project-cover.png
repoUrl: https://github.com/user/repo
demoUrl: https://demo.example.com
tags:
  - React
  - TypeScript
featured: true
---
```
