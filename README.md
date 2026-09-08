# summDy 工作室站点

[Hugo](https://gohugo.io/) + [Stack](https://github.com/CaiJimmy/hugo-theme-stack) 主题构建的工作室门面与技术博客，部署在 GitHub Pages。
访问地址：<https://summdy.github.io>

---

## ⚠️ 部署前必读：Pages 源必须选 gh-pages 分支

站点由 `.github/workflows/hugo.yml` 构建并发布到 **`gh-pages` 分支**
（Hugo → Pagefind 索引 → `.nojekyll` → force push 到 `gh-pages`）。

仓库 **Settings → Pages → Build and deployment → Source** 选
**`Deploy from a branch`**，分支选 **`gh-pages`**，目录 **`/ (root)`**。

> 为什么不用「GitHub Actions」源？之前踩过坑：选了分支源时，GitHub 会用
> Jekyll 把 `README.md` 渲染成首页，Hugo 产物一个都不上线，`/search/` 全 404；
> 而改到 gh-pages 分支 + `.nojekyll` 后，分支里只有纯静态文件，Jekyll 不再插手。

提交到 `master` 即触发 Actions，自动构建并推到 `gh-pages`；再到 Pages 设置里选好
分支，首次稍等一两分钟即可访问 `https://summdy.github.io`。

---

## 目录结构

```
summDy.github.io/
├── hugo.toml               # 站点主配置（菜单、侧栏、工作室门面、评论、搜索）
├── content/
│   ├── post/               # 技术笔记，按二级目录分栏目
│   ├── portfolio/          # 作品集（案例卡片）
│   ├── about/index.md      # 服务与合作
│   ├── archives/index.md   # 归档页
│   └── search/index.md     # 搜索页（front matter 里 outputs 必须含 json）
├── layouts/                # 对 Stack 主题的覆盖：首页 Hero、能力区、案例卡片等
├── static/                 # 直接拷贝的静态资源（favicon、mermaid）
├── themes/hugo-theme-stack/
└── .github/workflows/hugo.yml
```

## 本地预览

需要 **Hugo Extended ≥ 0.157.0**（主题用了 `js.Build` 与 SCSS）：

```bash
hugo server -D          # http://localhost:1313
```

本地 `hugo server` 下 Pagefind 索引不存在，搜索页会自动回退到主题自带的 Fuse 搜索，属正常现象。

## 写作

```bash
hugo new post/embedded/xxx.md
```

推荐 front matter：

```yaml
---
title: "标题"
date: 2026-09-03
categories: ["嵌入式"]
tags: ["RT-Thread", "HardFault"]
description: "用于列表页与 SEO 的一句话摘要"
image: "cover.jpg"    # 可选，放在同目录
---
```

Mermaid 图直接用 ```mermaid 代码块即可，脚本按需加载。

## 搜索

两套方案并存，页面自动探测：

1. **Pagefind**（默认）：构建时生成索引，中文分词更好。由 CI 里的
   `npx pagefind@1.5.2 --site public --output-subdir pagefind` 生成，需
   `hugo.toml` 中 `params.pagefind.enabled = true`。
   只有带 `data-pagefind-body` 的块会被索引（见 `layouts/_partials/article/article.html`）。
2. **Fuse**（回退）：主题自带，读 `/search/index.json`，本地预览与索引缺失时生效。

## 部署

推到 `master` 分支即触发 Actions：Hugo 构建 → Pagefind 建索引 → force push 到 `gh-pages`
分支。Pages 源指向 `gh-pages` 后即对外服务。分支根目录的文件不会被直接发布，
改 `README.md` 不会更新线上首页。

> GitHub Pages 国内访问不稳定。需要加速可把 `public/` 再部署一份到 Cloudflare Pages 或 Vercel。
