import { useState } from 'react';
import CopyButton from './CopyButton.jsx';
import LessonPanel from './LessonPanel.jsx';
import VideoPanel from './VideoPanel.jsx';
import { CATEGORY_CHIP } from '../lib/data';

/** 卡片内的提示词代码块：模板与示例分开渲染，各自带复制按钮 */
function PromptBlock({ label, text, highlight = false }) {
  return (
    <div className="mt-2.5">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-mist">{label}</span>
        <CopyButton text={text} label="一键复制" />
      </div>
      <pre
        className={`whitespace-pre-wrap break-words rounded-lg border p-3 font-mono text-[12.5px] leading-relaxed selection:bg-gold/30 ${
          highlight
            ? 'border-gold/25 bg-gold/[0.06] text-amber-100/90'
            : 'border-white/[0.08] bg-night/60 text-paper/80'
        }`}
      >
        {text}
      </pre>
    </div>
  );
}

/**
 * 运镜详情卡（视频优先的信息层级）：
 * 视频/海报占卡片上半身 → 编号+名称+分类标签 → 大白话讲解 → 提示词（中英切换）→ 摄影小课堂折叠。
 * 深色玻璃拟态：半透明底 + 1px 半透明边 + backdrop-blur。
 */
export default function PromptCard({ item }) {
  const [lang, setLang] = useState('zh');
  const isEn = lang === 'en';

  return (
    <article
      id={`prompt-${item.id}`}
      className="flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors duration-200 hover:border-white/[0.16]"
    >
      {/* 上半身：视频（默认海报帧 + 播放按钮，点击才加载） */}
      <VideoPanel src={item.video_url} poster={item.poster_url} gallery={item.gallery_url} />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* 名称 + 分类标签 */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-gold/80">{String(item.id).padStart(2, '0')}</span>
              <h3 className="truncate text-lg font-semibold leading-snug text-white">{item.name_zh}</h3>
            </div>
            <p className="mt-0.5 truncate text-xs text-mist">
              {item.name_en}
              {item.name_en_translated && (
                <span className="ml-1 text-mist/60" title="英文名为本站翻译，源文件仅提供中文名">
                  （译）
                </span>
              )}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2 py-1 text-[11px] leading-none ${
              CATEGORY_CHIP[item.category] || 'border-white/10 text-mist'
            }`}
          >
            {item.category}
          </span>
        </div>

        {/* 变体 / 组合方式小标签 */}
        {(item.variant_zh || item.director_note) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] leading-none">
            {item.variant_zh && (
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-mist">
                {item.variant_zh}
              </span>
            )}
            {item.director_note && (
              <span
                title="源文件标注的镜头组合方式"
                className="rounded-full border border-gold/25 bg-gold/[0.07] px-2 py-1 text-gold/90"
              >
                组合：{item.director_note}
              </span>
            )}
          </div>
        )}

        {/* 大白话讲解 + 什么时候用 */}
        <p className="mt-3 text-sm leading-relaxed text-paper/85">{item.plain_zh}</p>
        <p className="mt-2 text-xs leading-relaxed text-mist">
          <span className="font-medium text-reel/90">什么时候用：</span>
          {item.when_zh}
        </p>

        {/* 实战小贴士（源文件原文） */}
        {item.tip_zh && (
          <div className="mt-3 rounded-lg border border-gold/25 bg-gold/[0.06] p-2.5 text-xs leading-relaxed text-amber-200/90">
            <span className="font-medium">⚠️ 实战小贴士：</span>
            {item.tip_zh}
          </div>
        )}

        {/* 提示词：中文 | English 切换 */}
        <div className="mt-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-mist">📋 提示词</span>
            <div
              role="group"
              aria-label="切换提示词语言"
              className="flex rounded-full border border-white/10 bg-night/50 p-0.5 text-[11px] leading-none"
            >
              {[
                { key: 'zh', label: '中文' },
                { key: 'en', label: 'EN' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setLang(opt.key)}
                  aria-pressed={lang === opt.key}
                  className={`rounded-full px-2.5 py-1 font-medium transition-colors duration-200 ${
                    lang === opt.key ? 'bg-gold/20 text-gold-bright' : 'text-mist hover:text-paper'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <PromptBlock label={isEn ? '通用模板 · EN' : '通用模板'} text={isEn ? item.template_en : item.template_zh} />
          <PromptBlock
            label={isEn ? '示例 Prompt · EN' : '示例 Prompt'}
            text={isEn ? item.example_en : item.example_zh}
            highlight
          />
        </div>

        <LessonPanel lesson={item.lesson_zh} />
      </div>
    </article>
  );
}
