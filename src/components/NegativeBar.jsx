import { useState } from 'react';
import CopyButton from './CopyButton.jsx';

/**
 * 工具箱 · 负面提示词面板：
 * 收录的均为 Seedance 2.0 Skill OS 词汇表中的约束语原文（中英对照），
 * 并附「否定规则」说明：否定词会种下缺陷，只在约束位使用。
 */
export default function NegativeBar({ data }) {
  const [lang, setLang] = useState('zh');
  const [ruleOpen, setRuleOpen] = useState(false);
  const isZh = lang === 'zh';
  const items = data.negativePrompts || [];
  const allText = items.map((i) => (isZh ? i.zh : i.en)).join(isZh ? '；' : ', ') + (isZh ? '。' : '.');
  const rule = data.negationRule;

  return (
    <section
      id="negative"
      className="scroll-mt-24 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white sm:text-base">🚫 通用负面提示词</h3>
          <p className="mt-1 text-xs text-mist">复制约束语贴到提示词的约束位，避免画面文字、水印和外形漂移</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang((v) => (v === 'zh' ? 'en' : 'zh'))}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-mist transition-colors duration-200 hover:border-gold/40 hover:text-gold-bright"
            title="切换中/英"
          >
            🌐 {isZh ? '中文' : 'EN'}
          </button>
          <CopyButton
            text={allText}
            label="全部复制"
            copiedLabel="全部已复制 ✓"
            className="!px-3 !py-1.5"
          />
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-night/50 px-3 py-2 transition-colors duration-200 hover:border-white/[0.14]"
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] leading-snug text-paper/90">{isZh ? item.zh : item.en}</p>
              <p className="mt-0.5 truncate text-[11px] text-mist/80">
                {item.tag} · {isZh ? item.en : item.zh}
              </p>
            </div>
            <CopyButton text={isZh ? item.zh : item.en} />
          </li>
        ))}
      </ul>

      {/* 否定规则（为什么别乱写 no xxx） */}
      <div className="mt-3 rounded-lg border border-white/[0.06] bg-night/40">
        <button
          type="button"
          onClick={() => setRuleOpen((v) => !v)}
          aria-expanded={ruleOpen}
          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-medium text-mist transition-colors duration-200 hover:text-paper"
        >
          <span>💡 为什么不建议乱写「no blur / no extra fingers」？点开看否定规则</span>
          <span
            className={`text-mist/70 transition-transform duration-200 ${ruleOpen ? 'rotate-90' : ''}`}
            aria-hidden="true"
          >
            ›
          </span>
        </button>
        {ruleOpen && (
          <div className="border-t border-white/[0.06] px-3 py-3 text-xs leading-relaxed text-mist">
            <p>
              <span className="text-gold/90">“{rule.quote_en}”（点名缺陷反而会种下缺陷）</span>
              {rule.quote_zh}
            </p>
            <p className="mt-2">
              更稳的做法是正向锁定画面，例如：
              {rule.positive_examples.map((ex, i) => (
                <span key={ex.en} className="text-paper/85">
                  「{isZh ? ex.zh : ex.en}」{i < rule.positive_examples.length - 1 ? '、' : '。'}
                </span>
              ))}
            </p>
            <p className="mt-2">
              {rule.usage_zh}（{rule.usage_en}）
            </p>
            <p className="mt-2 text-mist/70">—— {rule.source}</p>
          </div>
        )}
      </div>
    </section>
  );
}
