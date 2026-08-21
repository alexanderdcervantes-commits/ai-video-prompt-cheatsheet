import { useMemo, useState } from 'react';
import prompts from './data/prompts.json';
import extras from './data/extras.json';
import Hero from './components/Hero.jsx';
import GalleryStrip from './components/GalleryStrip.jsx';
import PromptCard from './components/PromptCard.jsx';
import CategoryTabs from './components/CategoryTabs.jsx';
import SearchBox from './components/SearchBox.jsx';
import NegativeBar from './components/NegativeBar.jsx';
import PromptAssembler from './components/PromptAssembler.jsx';
import ExtrasSection from './components/ExtrasSection.jsx';
import Footer from './components/Footer.jsx';
import { CATEGORY_DOT, getMovements, searchPrompts } from './lib/data';

/** 卡片区头部的分类计数（基础=绿、进阶=蓝、大师=金） */
const COUNT_CHIPS = [
  { label: '基础运镜', dot: CATEGORY_DOT['基础运镜'], text: 'text-emerald-300' },
  { label: '电影级进阶', dot: CATEGORY_DOT['电影级进阶'], text: 'text-sky-300' },
  { label: '大师导演风格', dot: CATEGORY_DOT['大师导演风格'], text: 'text-gold-bright' },
];

export default function App() {
  const [category, setCategory] = useState('全部');
  const [query, setQuery] = useState('');

  const movements = useMemo(() => getMovements(prompts), []);

  const counts = useMemo(() => {
    const c = { 全部: prompts.length };
    for (const p of prompts) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    const byCategory = category === '全部' ? prompts : prompts.filter((p) => p.category === category);
    return searchPrompts(byCategory, query);
  }, [category, query]);

  /** 画廊缩略卡 → 重置筛选（保证目标卡已渲染）后平滑滚动到对应详情卡 */
  const jumpToPrompt = (id) => {
    setCategory('全部');
    setQuery('');
    window.setTimeout(() => {
      document.getElementById(`prompt-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-night text-paper">
      {/* 胶片颗粒噪点（全屏、极淡、不挡交互） */}
      <div className="film-grain" aria-hidden="true" />

      {/* ===== 1. Hero：视频先征服 ===== */}
      <Hero />

      {/* ===== 2. 先看效果：横向滚动视频展示带 ===== */}
      <GalleryStrip items={prompts} onJump={jumpToPrompt} />

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* ===== 3. 运镜详情卡片区（教学主体，视频优先） ===== */}
        <section id="cards" className="scroll-mt-20 pt-12 sm:pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold/80">Learn</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">25 个运镜，逐个拆解</h2>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-mist sm:text-sm">
                先看视频记住感觉，再复制提示词去套用——【】里的内容换成你自己的主体和场景就行。
              </p>
            </div>
            <div className="flex items-center gap-x-4 gap-y-1.5 text-xs text-mist">
              {COUNT_CHIPS.map((chip) => (
                <span key={chip.label} className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${chip.dot}`} aria-hidden="true" />
                  <span className="font-mono text-sm font-semibold">{counts[chip.label]}</span>
                  <span>{chip.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 粘性工具栏：分类筛选 + 搜索 */}
          <div className="sticky top-0 z-40 -mx-4 mt-6 border-b border-white/[0.08] bg-night/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <CategoryTabs active={category} onChange={setCategory} counts={counts} />
              <SearchBox value={query} onChange={setQuery} />
            </div>
          </div>

          <p className="mb-4 mt-5 text-xs text-mist">
            共 <span className="font-mono text-gold">{filtered.length}</span> 条案例
            {query && (
              <>
                （搜索「{query}」
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="ml-1 text-gold/90 transition-colors duration-200 hover:text-gold-bright hover:underline"
                >
                  清空
                </button>
                ）
              </>
            )}
            {category !== '全部' && <> · 分类「{category}」</>}
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-16 text-center">
              <p className="text-sm text-mist">没有找到匹配的运镜，换个关键词试试（中英文都行）</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('全部');
                }}
                className="mt-4 rounded-full border border-gold/50 px-4 py-1.5 text-xs text-gold transition-colors duration-200 hover:bg-gold/10"
              >
                重置筛选
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filtered.map((item) => (
                <PromptCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>

        {/* ===== 4. 工具箱：负面提示词 + 拼装器 ===== */}
        <section id="toolbox" className="scroll-mt-24 pt-16">
          <div className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold/80">Toolbox</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">工具箱</h2>
            <p className="mt-2 text-xs text-mist sm:text-sm">
              看会了效果，来这里取配件：通用负面约束 + 四选一的提示词拼装器
            </p>
          </div>
          <div className="space-y-6">
            <NegativeBar data={extras} />
            <PromptAssembler movements={movements} />
          </div>
        </section>

        {/* ===== 5. 进阶资料：心法 / 术语 / 套话 / 模板 ===== */}
        <div className="pt-16">
          <ExtrasSection extras={extras} />
        </div>
      </main>

      {/* ===== 6. 页脚：15 秒建议 + 数据来源致谢 ===== */}
      <Footer usageAdvice={extras.usageAdvice} />
    </div>
  );
}
