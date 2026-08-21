import { useMemo, useState } from 'react';
import CopyButton from './CopyButton.jsx';
import { ASSEMBLER_SCENES, ASSEMBLER_ACTIONS, ASSEMBLER_MOODS, CATEGORIES } from '../lib/data';

function Select({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-mist">【{label}】</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer rounded-lg border border-white/10 bg-night/70 px-3 py-2 text-sm text-paper transition-colors duration-200 hover:border-white/20 focus:border-gold/60 focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

/**
 * 工具箱 · 提示词拼装器（深色面板 + 琥珀色高亮）：
 * 【场景】×【主体动作】×【运镜】×【氛围】→ 自动拼成完整中文提示词。
 * 运镜选项来自 prompts.json；其余三组为常用备选。结果可一键复制。
 */
export default function PromptAssembler({ movements }) {
  const [scene, setScene] = useState(ASSEMBLER_SCENES[0]);
  const [action, setAction] = useState(ASSEMBLER_ACTIONS[0]);
  const [mood, setMood] = useState(ASSEMBLER_MOODS[0]);
  const [moveId, setMoveId] = useState(String(movements[0]?.id ?? ''));
  const [withNegative, setWithNegative] = useState(false);

  const move = useMemo(() => movements.find((m) => String(m.id) === moveId) || movements[0], [movements, moveId]);

  const parts = [move ? `${move.name_zh}（${move.name_en}）` : '', scene, action, mood];
  const result = `${parts.filter(Boolean).join('，')}。${withNegative ? '不要新增字幕、水印或无关文字。' : ''}`;

  const randomize = () => {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    setScene(pick(ASSEMBLER_SCENES));
    setAction(pick(ASSEMBLER_ACTIONS));
    setMood(pick(ASSEMBLER_MOODS));
    setMoveId(String(pick(movements).id));
  };

  return (
    <section
      id="assembler"
      className="scroll-mt-24 rounded-2xl border border-gold/20 bg-white/[0.03] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white sm:text-base">🧩 提示词拼装器</h3>
          <p className="mt-1 text-xs text-mist sm:text-sm">
            四个下拉各选一项，自动拼成可用的中文提示词骨架；运镜选项全部来自上方 25 条案例
          </p>
        </div>
        <button
          type="button"
          onClick={randomize}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-paper/80 transition-colors duration-200 hover:border-gold/50 hover:text-gold-bright"
        >
          🎲 随机一组
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Select label="运镜" value={moveId} onChange={setMoveId}>
          {CATEGORIES.filter((c) => c !== '全部').map((cat) => (
            <optgroup key={cat} label={cat}>
              {movements
                .filter((m) => m.category === cat)
                .map((m) => (
                  <option key={m.id} value={String(m.id)}>
                    {m.name_zh} · {m.name_en}
                  </option>
                ))}
            </optgroup>
          ))}
        </Select>
        <Select label="场景" value={scene} onChange={setScene}>
          {ASSEMBLER_SCENES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
        <Select label="主体动作" value={action} onChange={setAction}>
          {ASSEMBLER_ACTIONS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </Select>
        <Select label="氛围" value={mood} onChange={setMood}>
          {ASSEMBLER_MOODS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-mist">拼装结果</span>
          <CopyButton text={result} label="一键复制" copiedLabel="已复制 ✓" className="!px-3 !py-1.5" />
        </div>
        <pre className="whitespace-pre-wrap break-words rounded-lg border border-gold/30 bg-gold/[0.07] p-3.5 font-mono text-[13px] leading-relaxed text-amber-100/90 selection:bg-gold/30">
          {result}
        </pre>
        <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-xs text-mist">
          <input
            type="checkbox"
            checked={withNegative}
            onChange={(e) => setWithNegative(e.target.checked)}
            className="h-3.5 w-3.5 cursor-pointer accent-[#f5a623]"
          />
          末尾追加通用负面约束「不要新增字幕、水印或无关文字。」
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-lg border border-white/[0.06] bg-night/50 p-3">
          <p className="text-xs font-medium text-mist">📐 该运镜的通用模板（把拼装结果填进去更好用）</p>
          <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[12px] leading-relaxed text-paper/80">
            {move?.template_zh}
          </pre>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-night/50 p-3 text-xs leading-relaxed text-mist">
          <p className="font-medium text-mist">📝 别忘了源文件的五条心法</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>运镜指令放在最前面，别埋在描述中间</li>
            <li>写清「起点」和「终点」两个画面</li>
            <li>给一个速度词：缓慢 / 匀速 / 快速</li>
            <li>运镜 + 情绪关键词是黄金搭档</li>
            <li>15 秒以内的视频最多用 1-2 种运镜</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
