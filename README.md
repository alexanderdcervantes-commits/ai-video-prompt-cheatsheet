# AI 视频运镜提示词速查表

面向零基础创作者的 AI 视频提示词速查站，**视觉征服优先**：先用全屏视频 Hero 和「先看效果」横向画廊抓住眼球，再进入 25 个运镜案例的教学卡片区（视频优先 + 可复制中英模板/示例 + 原创摄影小课堂），下接工具箱（负面提示词 + 提示词拼装器）、导演级术语速查与套话急救室。

## 页面结构（自上而下）

1. **Hero**：video-13（环绕镜头）全屏自动播放（静音循环 playsinline），移动端 / 减少动态偏好降级为海报图
2. **先看效果**：8 张精选运镜缩略卡横向 snap 滚动带，悬停静音预览、点击跳到对应详情卡
3. **运镜详情卡片区**：桌面 2 列 / 移动单列；卡片信息层级为「视频/海报（16:9）→ 编号+名称+分类标签 → 大白话讲解 → 提示词（中文|EN 切换）→ 摄影小课堂折叠」；深色玻璃拟态
4. **工具箱**：通用负面提示词 + 四选一拼装器（深色面板 + 琥珀色高亮）
5. **进阶资料**：五条心法 / 术语速查 / 套话急救室 / 结构模板
6. **页脚**：「15 秒以内视频建议只用 1-2 种运镜」+ 数据来源致谢

视觉规范：近黑底 `#0a0a0f` + CSS 胶片颗粒噪点；琥珀金 `#f5a623` / 电影橙 `#e8734a` 点缀；卡片 `rgba(255,255,255,0.03)` 底 + `rgba(255,255,255,0.08)` 边；分类色 基础=绿 / 进阶=蓝 / 大师=金；动效仅 hover 微亮 + 200ms 过渡。

## 运行

```bash
npm install
npm run dev      # 本地开发
npm run build    # 产出 dist/
npm run preview  # 预览构建产物
```

依赖保持最小：`react` / `react-dom` / `vite` / `@vitejs/plugin-react` / `tailwindcss` / `postcss` / `autoprefixer`。纯前端静态站点，无后端，数据编译进 JSON。

## 本地媒体资产

- `public/videos/video-01.mp4 ~ video-25.mp4`：25 个运镜示范视频（4-6MB/个，已从源仓库下载到本地）
- `public/posters/video-01.jpg ~ video-25.jpg`：对应海报帧，卡片默认只加载海报 + 播放按钮，点击才挂载 `<video>` 真正加载（懒加载，`preload="none"`）

## 数据来源与真实性

所有提示词内容均来自公开仓库原文，未做改写（仅翻译与排版）：

| 数据 | 来源 | 说明 |
|---|---|---|
| 25 条运镜案例（讲解 / 模板 / 示例 / 小贴士 / 使用建议 / 五条心法） | [yinxiaowai/awesome-ai-video-camera-movement-prompts](https://github.com/yinxiaowai/awesome-ai-video-camera-movement-prompts)（作者：AI尹小歪） | 中文全部原文引用；源文件为 25 个视频案例、17 种运镜（7 种运镜各含 A/B 两版示例），本站按源文件的 01–25 编号建 25 条数据 |
| 视频 mp4 与海报帧 | 同上仓库的 [GitHub Pages 在线画廊](https://yinxiaowai.github.io/awesome-ai-video-camera-movement-prompts/) | `video-01~25` 与案例一一对应，已本地化到 `public/`，卡片懒加载 |
| 负面/约束提示词、术语速查、套话急救、结构模板 | [Emily2040/seedance-2.0](https://github.com/Emily2040/seedance-2.0)（Seedance 2.0 Skill OS，本地源文件 `sd2prompt-readme.md`） | 引自其 `references/vocab/zh.md`、`vocab/en.md`、`anti-slop-lexicon.md` 与 README，原文引用 |
| 英文提示词翻译、「摄影小课堂」、拼装器备选项 | 本站原创 | `prompts.json` 中 `*_en` 字段为专业电影术语翻译；大师级条目的英文名标注「（译）」 |
| DareDev256/Ultimate-Image-Video-Prompt-Generator | 工具类参考 | 其 README 为项目说明，不含可直接引用的视频提示词，本站未提取其数据 |

## 结构

```
src/
├── main.jsx / App.jsx / index.css
├── data/
│   ├── prompts.json     # 25 条运镜案例（id 1–25，对应源文件编号）
│   └── extras.json      # 负面提示词 / 术语速查 / 套话表 / 模板 / 心法
├── lib/
│   ├── clipboard.js     # navigator.clipboard + execCommand 降级
│   └── data.js          # 分类样式 / 搜索 / 运镜去重 / 拼装器选项
└── components/
    ├── Hero.jsx            # 全屏视频 Hero（移动端海报降级）
    ├── GalleryStrip.jsx    # 「先看效果」横向滚动带（悬停预览）
    ├── PromptCard.jsx      # 视频优先卡片：中英切换、模板/示例分块复制
    ├── VideoPanel.jsx      # 卡片视频：海报+播放按钮，点击才加载
    ├── LessonPanel.jsx     # 📷 摄影小课堂折叠
    ├── CategoryTabs.jsx    # 分类筛选（粘性工具栏内）
    ├── SearchBox.jsx       # 中英文全文搜索
    ├── CopyButton.jsx      # 一键复制（变绿 1.5s）
    ├── NegativeBar.jsx     # 负面提示词面板（工具箱）
    ├── PromptAssembler.jsx # 四选一拼装器（工具箱）
    ├── ExtrasSection.jsx   # 心法 / 术语 / 套话 / 模板
    └── Footer.jsx          # 15 秒建议 + 来源致谢
```
