# summDy 的个人站点

纯静态、零构建的个人主页 + 技术博客。没有 npm、没有打包器、没有框架，改完文件直接推送到 GitHub Pages 就生效。

页面内容全部由 `data/` 下的三个 JSON 驱动，**平时不需要碰 HTML 和 CSS**。

## 目录结构

```
summDy.github.io/
├── index.html              # 唯一页面（首页与文章页共用，靠 hash 路由切换）
├── data/
│   ├── site.json           # 个人信息：姓名、简介、社交、技能、终端装饰
│   ├── projects.json       # 项目卡片列表
│   └── articles.json       # 文章元数据（标题、摘要、标签、日期、文件名）
├── articles/               # Markdown 正文，一个文件一篇
├── assets/
│   ├── css/style.css       # 全部样式（设计变量集中在文件顶部）
│   ├── js/app.js           # 路由、搜索、代码高亮、目录、深浅色
│   └── vendor/             # marked + highlight.js 本地副本，不依赖 CDN
└── README.md
```

## 本地预览

必须通过 http 服务打开（Markdown 与 JSON 用 `fetch` 加载，`file://` 会被浏览器拦住）：

```bash
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 改内容

### 1. 个人信息 —— `data/site.json`

| 字段 | 说明 |
| --- | --- |
| `name` / `handle` | 站点名，同时用于标题与页脚 |
| `avatar` | 头像 URL，留空则自动用首字母方块 |
| `role` / `eyebrow` / `tagline` | 首屏的三行文案 |
| `intro` | 「关于」段落 |
| `socials` | 社交链接，`icon` 支持 `github` / `gitee` / `mail` |
| `skills` | 技能分组，每组 `{ group, items[] }` |
| `terminal` | 首屏右侧终端装饰的行，`type` 为 `cmd` / `out` / `ok` |

### 2. 项目 —— `data/projects.json`

数组，每项：

```json
{
  "title": "项目名",
  "summary": "一两句话说清做了什么、用什么做的",
  "tags": ["标签1", "标签2"],
  "year": "2026",
  "status": "在研",
  "link": "https://github.com/..."
}
```

### 3. 文章 —— 两步

**第一步**：在 `articles/` 下新建 Markdown 文件，例如 `dlt698-parser.md`。

**第二步**：在 `data/articles.json` 里登记一条：

```json
{
  "title": "DLT698 协议解析踩坑记录",
  "summary": "对象标识 OI 的编码规则，以及和 DL/T645 转换时的几个坑。",
  "file": "dlt698-parser.md",
  "date": "2026-09-03",
  "tags": ["DLT698", "协议"]
}
```

字段说明：

- `file` 必须和 `articles/` 里的文件名完全一致
- `date` 用 `YYYY-MM-DD`，列表按日期倒序自动排
- `tags` 是数组；标签栏和筛选器会自动从所有文章里收集
- 阅读时长按正文自动估算，不用手填

## Markdown 支持

- 代码高亮：\`\`\`c / \`\`\`cpp / \`\`\`asm 等语言标注，基于本地 highlight.js，右上角有一键复制
- 表格、引用、任务列表、删除线（GFM 语法）
- 文章自动生成右侧目录（标题数 ≥ 2 时出现）

## 设计调整

所有颜色写在 `assets/css/style.css` 顶部的 `:root[data-theme="light"]` 和
`:root[data-theme="dark"]` 里，改这些变量就能整体换色：

| 变量 | 作用 |
| --- | --- |
| `--accent` / `--accent-2` | 主色与渐变色（靛蓝 → 紫） |
| `--bg` / `--bg-soft` / `--surface` | 背景与卡片底色 |
| `--text` / `--text-2` / `--text-3` | 三级文字灰阶 |
| `--border` / `--border-strong` | 描边 |
| `--maxw` | 内容最大宽度 |

## 部署

推送到 `master` 分支，GitHub Pages 自动生效。

仓库名是 `summDy.github.io`，Pages 源选 `master` 分支的根目录，访问地址即
`https://summdy.github.io`。

> 注：GitHub Pages 国内访问速度不稳定。若在意，可把同一份静态文件再部署一份到
> Cloudflare Pages 或 Vercel（两者都支持直接导入 GitHub 仓库，无需改动代码）。
