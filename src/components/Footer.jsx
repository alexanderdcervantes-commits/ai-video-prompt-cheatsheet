/**
 * 页脚（全宽）：一条置顶的「15 秒建议」+ 数据来源致谢。
 * 核心：yinxiaowai 的 25 条运镜案例与视频；进阶：Seedance 2.0 Skill OS；参考：DareDev256。
 */
export default function Footer({ usageAdvice }) {
  const headline = usageAdvice.find((line) => line.includes('15 秒')) || '';
  const rest = usageAdvice.filter((line) => line !== headline);

  return (
    <footer id="footer" className="scroll-mt-24 border-t border-white/[0.08] bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* 一句话提醒 */}
        <div className="rounded-2xl border border-gold/25 bg-gold/[0.06] px-5 py-4 text-center">
          <p className="text-sm font-medium leading-relaxed text-gold-bright sm:text-base">⏱ {headline}</p>
          <p className="mt-1 text-[11px] text-mist">堆太多运镜 AI 反而顾不过来，想要复杂镜头语言就拆成多条分别生成</p>
        </div>

        {rest.length > 0 && (
          <ul className="mt-5 space-y-1.5 text-xs leading-relaxed text-mist">
            {rest.map((line) => (
              <li key={line} className="flex items-start gap-2">
                <span aria-hidden="true" className="text-gold/60">
                  ▸
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 数据来源致谢 */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-mist">🫡 数据来源与致谢</h2>
          <ul className="mt-5 grid grid-cols-1 gap-6 text-xs leading-relaxed text-mist lg:grid-cols-3">
            <li>
              <a
                href="https://github.com/yinxiaowai/awesome-ai-video-camera-movement-prompts"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gold transition-colors duration-200 hover:text-gold-bright hover:underline"
              >
                yinxiaowai / awesome-ai-video-camera-movement-prompts ↗
              </a>
              <span className="ml-1 text-mist/60">（作者：AI尹小歪）</span>
              <p className="mt-1.5">
                核心数据源：25 条运镜案例的大白话讲解、通用模板、示例 Prompt、实战小贴士、使用建议与五条心法均原文引自该仓库；视频案例与海报帧来自其{' '}
                <a
                  href="https://yinxiaowai.github.io/awesome-ai-video-camera-movement-prompts/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold/90 hover:underline"
                >
                  在线画廊
                </a>
                。英文提示词与「摄影小课堂」为本站补写。
              </p>
            </li>
            <li>
              <a
                href="https://github.com/Emily2040/seedance-2.0"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gold/90 transition-colors duration-200 hover:text-gold-bright hover:underline"
              >
                Seedance 2.0 Skill OS（Emily2040/seedance-2.0）↗
              </a>
              <span className="ml-1 text-mist/60">（本地源文件 sd2prompt-readme.md）</span>
              <p className="mt-1.5">
                进阶数据源：负面/约束提示词、导演级术语速查、套话急救室与结构模板，引自其 references/vocab/zh.md、vocab/en.md、
                anti-slop-lexicon.md 与 README（原文引用，中英对照）。
              </p>
            </li>
            <li>
              <a
                href="https://github.com/DareDev256/Ultimate-Image-Video-Prompt-Generator"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-gold/80 transition-colors duration-200 hover:text-gold-bright hover:underline"
              >
                DareDev256 / Ultimate-Image-Video-Prompt-Generator ↗
              </a>
              <p className="mt-1.5">
                工具类参考（提示词生成器 / 打分器）：其 README 为项目说明，不含可直接引用的视频提示词，本站未从该仓库提取提示词数据。
              </p>
            </li>
          </ul>
        </div>

        <p className="mt-10 border-t border-white/[0.06] pt-5 text-center text-[11px] text-mist/70">
          AI 视频运镜提示词速查表 · 纯前端静态站点（React + Vite + Tailwind CSS）· 提示词版权归原作者所有，本站仅作学习整理
        </p>
      </div>
    </footer>
  );
}
