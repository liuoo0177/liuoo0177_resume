import { useState } from 'react'

/* ============================================================
   数据层 —— 5 段履历，全量固化，一个都不能少
   ============================================================ */
const MILESTONES = [
  { date: '2018.09 - 2022.06', label: '北京林业大学', sub: '艺术设计学士', logo: './bjfu logo.png' },
  { date: '2023.09 - 2024.09', label: '米兰理工大学', sub: '双学位硕士',     logo: './polimi logo.jpg' },
  { date: '2022.09 - 2025.06', label: '清华大学',     sub: '设计学硕士',     logo: './thu logo.jpg' },
  { date: '2025.07 - 2025.12', label: '顾家家居',     sub: '产品设计',       logo: './kuka logo.png' },
  { date: '2025.12 - 至今',    label: '顾家家居',     sub: '产品经理',       logo: './kuka logo.png' },
]

const CARDS = [
  {
    title: '北京林业大学', subtitle: '艺术设计本科', badge: '211 高校 · 创新实验班',
    lines: [
      '环境设计创新实验班本科，全面筑牢人居环境与硬件设计底层地基',
      '专业课绩点 90/100，在校期间获得人居环境设计学年奖金奖（前 2%）、亚洲设计学年奖银奖',
    ],
    img: './北林1.jpg',
  },
  {
    title: '米兰理工大学', subtitle: '双学位硕士', badge: 'QS 全球艺术与设计 Top 7',
    lines: [
      '获国家留学基金委（CSC）公派全额奖学金资格，远赴欧洲顶级设计殿堂攻读双学位硕士',
      '深入欧洲前沿交互与多模态设计探索，核心课程绩点 29/30 通关',
    ],
    img: './米理.jpg',
  },
  {
    title: '清华大学', subtitle: '设计学硕士', badge: '全国 No.1 | U.S. News 全球 No.6 / QS 全球 No.14',
    lines: [
      '依托清华大学顶尖的跨界综合资源，交叉培养艺术设计与前沿技术的双向底层能力',
      '学术绩点 GPA 3.84 / 4.00',
    ],
    img: './清华.jpg',
  },
  {
    title: '顾家家居', subtitle: '产品设计', badge: '外贸核心研发',
    lines: [
      '任职外贸功能品类发展部，直接对接西欧、北美等高奢外贸核心市场需求',
      '主导 100+ 功能家居产品企划，全流程引入 AI 工具协作，设计选中率达 40%',
    ],
    img: './顾家.jpg',
  },
  {
    title: '顾家家居', subtitle: '产品经理', badge: '全栈体验驱动 PM',
    lines: [
      '快速跃升至创新洞察部产品经理，统筹核心技术路标明确与年度预研项目落地',
      '将 AI 意图理解、Prompt 调试与硬件电机强约束结合，成功为海外单品实现 $1000 零售高额溢价',
    ],
    img: './顾家.jpg',
  },
]

/* ============================================================
   主组件 —— 纯粹静态 5 列全景画卷
   ============================================================ */
export default function SectionAbout() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // 默认高亮清华大学 (Index 2)；hover 时接管
  const focusIndex = hoveredIndex !== null ? hoveredIndex : 2

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 py-16 flex flex-col gap-8">

        {/* ======== Section 标题 ======== */}
        <div className="text-center space-y-2">
          <h2
            className="text-3xl font-serif italic tracking-wide text-primary"
            style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
          >
            About Me
          </h2>
          <div className="h-px w-16 mx-auto bg-white/8" />
        </div>

        {/* ============================================================
            时间线 — 5 列 grid，与下方卡片严格一一对应
            ============================================================ */}
        <div className="grid grid-cols-5 gap-4 w-full">
          {MILESTONES.map((m, i) => {
            const isActive = i === focusIndex
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* logo 圆 + 时间线圆点 */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border transition-all duration-500
                      ${isActive
                        ? 'border-white/25 shadow-[0_0_14px_rgba(180,210,160,0.18)]'
                        : 'border-white/10'}`}
                  >
                    <img src={m.logo} alt={m.label} className="w-full h-full object-cover" />
                  </div>
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 flex-shrink-0
                      ${isActive
                        ? 'bg-emerald-300 glow-radial scale-125'
                        : 'bg-white/20'}`}
                  />
                </div>

                {/* 日期 */}
                <span
                  className={`text-[10px] transition-all duration-500 whitespace-nowrap
                    ${isActive ? 'text-emerald-200/90 font-medium' : 'text-white/65'}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {m.date}
                </span>

                {/* 机构名 */}
                <span
                  className={`text-[11px] font-medium transition-all duration-500 whitespace-nowrap
                    ${isActive ? 'text-primary/90' : 'text-white/70'}`}
                >
                  {m.label}
                </span>

                {/* 专业 / 岗位 */}
                <span
                  className={`text-[9px] transition-all duration-500 whitespace-nowrap
                    ${isActive ? 'text-white/90' : 'text-white/60'}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {m.sub}
                </span>
              </div>
            )
          })}
        </div>

        {/* ============================================================
            卡片区 — 5 列等高网格，紧凑瘦长，无底部死白
            ============================================================ */}
        <div className="grid grid-cols-5 gap-4 w-full">
          {CARDS.map((card, i) => {
            const isFocused = i === focusIndex
            const isOthers  = hoveredIndex !== null && i !== hoveredIndex

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  glass-card-light rounded-2xl overflow-hidden flex flex-col
                  cursor-pointer transition-all duration-500 ease-out
                  ${isFocused
                    ? 'ring-1 ring-emerald-300/25 shadow-[0_0_24px_rgba(180,210,160,0.12)]'
                    : ''}
                  ${isOthers
                    ? 'opacity-70'
                    : 'opacity-100'}
                  hover:scale-[1.03] hover:shadow-xl hover:z-10
                `}
              >
                {/* ── 照片容器（relative → 标签 absolute 浮于右上角）── */}
                <div
                  className="relative w-full flex-shrink-0 overflow-hidden rounded-t-2xl"
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* 含金量标签 — 绝对定位悬浮于照片右上角 */}
                  <span
                    className={`
                      absolute top-3 right-3 z-10
                      text-[8px] font-medium tracking-wide
                      px-2 py-0.5 rounded-full
                      bg-white/10 backdrop-blur-md
                      border border-white/20
                      text-emerald-200/90
                      whitespace-nowrap
                      transition-all duration-500
                      ${isFocused ? 'shadow-[0_0_12px_rgba(180,210,160,0.20)]' : ''}
                    `}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* ── 文字底座：学校/公司 + 岗位 ── */}
                <div className="flex-shrink-0 px-3 pt-3 pb-2">
                  <p className="text-sm font-semibold text-primary/90 tracking-tight leading-tight">
                    {card.title}
                  </p>
                  <p
                    className="text-[11px] text-white/70 mt-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {card.subtitle}
                  </p>
                </div>

                {/* ── 明细要点 ── */}
                <div className="flex-1 flex flex-col px-3 pb-3.5 gap-2">
                  {card.lines.map((line, j) => (
                    <div
                      key={j}
                      className="px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
                    >
                      <p className="text-[10px] text-secondary/85 leading-relaxed">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
