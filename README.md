# Dear for Halo

极简单色纸感的 Halo 2.x 博客主题。单栏纯文本排版、黑白灰配色、亮暗双主题，复刻 [Bear Blog](https://bearblog.dev) 与 [typecho-dear](https://github.com/imjeff/typecho-dear) 的阅读体验。

最初是 [dear-blog](https://github.com/liyinwaihe/dear-blog)（零依赖 Node.js 独立博客程序）的视觉方案，这里完整移植为 Halo 主题。

## 特性

- **纯文本排版**：760px 单栏，霞鹜文楷优先的字体栈，正文 0.85rem / 行高 1.6
- **单色克制**：仅黑白灰令牌 + 金色标记当前导航 + 红色标记错误，无渐变、无重阴影、无大圆角
- **亮暗双主题**：可设为跟随系统 / 固定深色 / 固定浅色，读者手动切换后由浏览器记住
- **文章列表**：`日期 | 分类 · 标题` 三段式，与 Dear 原主题一致
- **标签与分类**：描边 chip + 圆形计数胶囊，分类支持多层树
- **归档**：按年份分组、月份小标题
- **评论**：装了官方评论组件插件即自动出现，无需配置
- **零构建**：纯 Thymeleaf 模板，改完刷新即生效，没有 npm、没有打包步骤
- **无 emoji 图标**：亮暗切换按钮是内联线性 SVG

## 环境要求

- Halo **2.20.0** 及以上（主题声明 `requires: ">=2.20.0"`）

## 安装

### 方式一：后台上传（推荐）

1. 把主题目录打包成 zip（压缩包内直接是 `theme.yaml` 与 `templates/`，不要再套一层文件夹）
2. Halo Console → 主题 → 右上角「安装主题」→ 上传 zip
3. 安装完成后点「启用」

### 方式二：放入主题目录

把整个 `theme-dear` 文件夹放进 Halo 工作目录的 `themes/` 下，然后在 Console → 主题 → 未安装列表里安装并启用。

> 文件夹名必须与 `theme.yaml` 里的 `metadata.name`（`theme-dear`）一致，否则静态资源加载不出来。

### 方式三：git 克隆

仓库名是 `halo-theme-dear`，但主题标识必须是 `theme-dear`，所以克隆时要显式指定目标目录名：

```bash
cd /path/to/halo/themes
git clone https://github.com/liyinwaihe/halo-theme-dear.git theme-dear
```

之后 `git pull` 即可更新。更新模板后记得在 Console 主题详情页点「重载主题配置」。

## 目录结构

```
theme-dear/
├── theme.yaml                 主题元信息
├── settings.yaml              后台可配置项
├── i18n/
│   ├── default.properties     默认文案（英文，兜底）
│   └── zh_CN.properties       中文文案
└── templates/
    ├── layout.html            页面外壳，插件页面也复用此布局
    ├── index.html             首页
    ├── post.html              文章详情
    ├── page.html              独立页面
    ├── archives.html          归档
    ├── tags.html              标签墙
    ├── tag.html               单标签文章列表
    ├── categories.html        分类列表
    ├── category.html          单分类文章列表
    ├── author.html            作者文章列表
    ├── error/                 404 与通用错误页
    ├── modules/               页头、页脚、文章列表、分页、分类树等片段
    └── assets/                样式与脚本（唯一允许的静态资源目录）
```

## 主题设置

Console → 主题 → Dear → 设置：

| 分组 | 项 | 说明 |
|------|-----|------|
| 样式 | 默认配色 | 跟随系统 / 深色 / 浅色 |
| 样式 | 显示主题切换按钮 | 关闭后页脚不再显示圆形按钮 |
| 样式 | 显示搜索框 | 需先安装官方「搜索」插件，否则搜索链接会 404 |
| 布局 | 首页引导文字 | 留空则显示站点副标题 |
| 页脚 | 页脚文字 | 留空则显示站点标题 |

站点 Logo、站点标题、每页篇数、SEO 描述等都走 Halo 系统设置，主题不重复提供入口。

> 布尔项使用 FormKit 原生 `checkbox`，从 Halo 2.20 起都可正常显示。如果你的 Halo 在 2.22.1 以上、想要 Console 里那种滑动开关样式，把 `settings.yaml` 里两处 `$formkit: checkbox` 改成 `$formkit: switch` 即可（注意别用 `toggle`——它是图片/颜色/文字选择器，不是布尔开关）。

## 依赖插件（可选）

| 插件 | 作用 | 未安装时的表现 |
|------|------|----------------|
| 搜索 | 提供 `/search` 页面 | 别开启「显示搜索框」，否则点搜索会 404 |
| 评论组件 | 文章/页面下方评论区 | 评论区整块不渲染，页面其余部分正常 |

## 本地调试

主题改动想即时生效，需要关闭模板缓存：

- Docker 运行：加环境变量 `SPRING_THYMELEAF_CACHE=false`
- 源码运行：配置

```yaml
spring:
  thymeleaf:
    cache: false
```

改完 `theme.yaml` 或 `settings.yaml` 后，要在 Console 主题详情页点「重载主题配置」才会生效（这两份配置持久化在数据库里）。

## 与 dear-blog 独立程序的差异

| 能力 | dear-blog（Node.js 程序） | Dear for Halo（本主题） |
|------|--------------------------|------------------------|
| 写作后台 | 自建 `/admin` | Halo Console（功能更完整） |
| 内容存储 | 磁盘 Markdown 文件 | Halo 数据库 |
| 搜索 | 内置全文搜索 | 依赖官方搜索插件 |
| 评论 | 无 | 依赖官方评论组件插件 |
| 部署 | `node server.js` | 装进任意 Halo 实例 |

## 许可

MIT
