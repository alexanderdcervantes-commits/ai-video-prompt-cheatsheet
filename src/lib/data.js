/** 分类与公共样式映射（基础=绿、进阶=蓝、大师=金） */
export const CATEGORIES = ['全部', '基础运镜', '电影级进阶', '大师导演风格'];

export const CATEGORY_CHIP = {
  基础运镜: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  电影级进阶: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  大师导演风格: 'border-gold/40 bg-gold/10 text-gold-bright',
};

export const CATEGORY_DOT = {
  基础运镜: 'bg-emerald-400',
  电影级进阶: 'bg-sky-400',
  大师导演风格: 'bg-gold',
};

/** 从 25 条案例中去重出「运镜」清单（同一运镜的 A/B 示例只保留一个选项），供拼装器使用 */
export function getMovements(prompts) {
  const seen = new Set();
  const list = [];
  for (const p of prompts) {
    if (seen.has(p.name_zh)) continue;
    seen.add(p.name_zh);
    list.push({
      id: p.id,
      name_zh: p.name_zh,
      name_en: p.name_en,
      category: p.category,
      template_zh: p.template_zh,
    });
  }
  return list;
}

/** 搜索：中英文关键词均可命中（「推」「dolly」都行），匹配名称/讲解/模板/示例/小课堂全文 */
export function searchPrompts(prompts, query) {
  const q = query.trim().toLowerCase();
  if (!q) return prompts;
  const qCompact = q.replace(/\s+/g, '');
  return prompts.filter((p) => {
    const hay = [
      p.name_zh,
      p.name_en,
      p.category,
      p.variant_zh || '',
      p.plain_zh,
      p.when_zh,
      p.template_zh,
      p.example_zh,
      p.template_en,
      p.example_en,
      p.lesson_zh,
      p.director_note || '',
    ]
      .join(' ')
      .toLowerCase();
    return hay.includes(q) || hay.replace(/\s+/g, '').includes(qCompact);
  });
}

/* ============ 提示词拼装器选项（除运镜外的三组，各 10 个常用项） ============ */

export const ASSEMBLER_SCENES = [
  '城市街头华灯初上',
  '温暖的咖啡馆靠窗位置',
  '海边日落时分的沙滩',
  '老城区的清晨早点摊',
  '铺满落叶的公园小径',
  '雨后霓虹灯反射的夜街',
  '夏日乡间的稻田小路',
  '洒满阳光的自家阳台',
  '深夜亮着灯的便利店',
  '开满鲜花的庭院',
];

export const ASSEMBLER_ACTIONS = [
  '一位年轻女生拎着包缓缓走来',
  '一位老人坐在藤椅上翻着相册',
  '一只橘猫伸着懒腰站起身',
  '一位男生闻声回头露出微笑',
  '一个孩子追着泡泡欢快奔跑',
  '一位穿旗袍的女人执扇缓行',
  '一位歌手闭上眼沉醉地歌唱',
  '一位画家在画布前挥笔泼色',
  '一位旅人驻足眺望远方',
  '一杯手冲咖啡升起袅袅热气',
];

export const ASSEMBLER_MOODS = [
  '温暖治愈，柔和自然光，生活纪实感',
  '悬疑紧张，冷色调，阴影浓重',
  '浪漫唯美，暖金逆光，浅景深',
  '史诗壮阔，宏大场面，震撼人心',
  '清新自然，明亮日光，通透色调',
  '复古怀旧，胶片颗粒质感',
  '都市孤独，霓虹夜色，湿润反光',
  '活力欢快，明快节奏，鲜艳色彩',
  '宁静空灵，极简构图，薄雾弥漫',
  '神秘梦幻，体积光，微尘飘浮',
];
