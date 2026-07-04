const CARDS = [
  {
    num: '01',
    en: 'AI Engine & Engineering',
    zh: 'AI 智能体开发与工程架构',
    position: '具备 2 年以上 AI 跨领域复合经验，以及独立完成 AI 智能体与多模态应用从 0-1 开发的产品化能力。',
    detail: '重度 AI 产品用户，精准掌握大模型能力边界。擅长将 AI 技术与传统业务场景深度结合，设计可复用的 AI 应用架构；能够独立负责 Agent 系统搭建，利用提示词工程与强约束协议实现商业价值跃升。',
  },
  {
    num: '02',
    en: 'Global UX & Insights',
    zh: '全球化用户洞察与体验设计',
    position: '具备 10 年设计背景与极致的视觉审美，拥有成熟的国际化视野与高标准用户体验设计经验。',
    detail: '熟练运用用户访谈与行为数据分析深挖真实痛点，输出高质量、结构化的用户需求文档。能够通过用户反馈的高效逆向推演持续优化产品交互，确保体验方案完美匹配品牌调性与市场需求。',
  },
  {
    num: '03',
    en: 'End-to-End Orchestration',
    zh: '产品与设计全链路闭环操盘',
    position: '具备全流程的产品全生命周期操盘能力，覆盖从前期需求调研、功能规划、软硬件研发直至最终交付上线的全量节点。',
    detail: '兼具敏锐的技术落地直觉与商业产品思维，擅长从用户底层需求出发，设计并实现高可用的 AI 应用解决方案；具备带领传统品类向智能交互产品升级、并实现单品高额商业溢价的跑通经验。',
  },
  {
    num: '04',
    en: 'Cross-Functional Synergy',
    zh: '跨部门与跨区域矩阵式协同',
    position: '拥有丰富的跨团队沟通、项目组织与大规模跨国业务对接经验。',
    detail: '擅长深度联动设计、研发、供应链、市场及大客户等多方团队，打破技术与业务之间的理解壁垒；能够输出标准化的交付与软件交互文档，高效控排并推动多项目同时从方案阶段到冒烟上线的完美落地。',
  },
]

const AI_STACK = ['Cursor', 'Claude Code', 'VS Code', 'Coze', 'IMA 知识库系统']
const PM_STACK = ['Axure', 'Figma', 'Xmind', 'PRD 需求文档', '竞品分析']

export default function SectionStrength() {
  return (
    <section
      id="strength"
      className="h-screen overflow-hidden flex flex-col justify-center pt-14 px-12"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">

        {/* ======== Strength 主标题 ======== */}
        <div className="text-center space-y-1 flex-shrink-0">
          <h2
            className="text-3xl font-serif italic tracking-wide text-primary"
            style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
          >
            Strength
          </h2>
          <div className="h-px w-16 mx-auto bg-white/8" />
        </div>

        {/* ======== 工具链标签 — 扁平无框 ======== */}
        <div className="flex justify-center gap-16 flex-shrink-0">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-[10px] tracking-widest uppercase text-emerald-400/50"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              / AI &amp; Infrastructure /
            </span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {AI_STACK.map((tool) => (
                <span
                  key={tool}
                  className="bg-white/[0.04] text-white/65 px-2.5 py-0.5 rounded text-[11px] tracking-wide"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-[10px] tracking-widest uppercase text-emerald-400/50"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              / PM &amp; Design Prototype /
            </span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {PM_STACK.map((tool) => (
                <span
                  key={tool}
                  className="bg-white/[0.04] text-white/65 px-2.5 py-0.5 rounded text-[11px] tracking-wide"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ======== 2x2 Bento Grid — 自然高度，不拉伸 ======== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">

          {CARDS.map((card) => (
            <div
              key={card.num}
              className="glass-card flex flex-col gap-3 p-7"
            >
              {/* 编号 + 英文 */}
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-mono tracking-tight text-emerald-400/90"
                  style={{ fontFamily: "'Plus Jakarta Sans', monospace" }}
                >
                  {card.num}
                </span>
                <span
                  className="text-[11px] font-medium tracking-widest uppercase text-emerald-400/70"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {card.en}
                </span>
              </div>

              {/* 1. 主标题 — mb-5 大断层 */}
              <h3 className="text-base font-semibold text-primary/90 tracking-tight mb-5">
                {card.zh}
              </h3>

              {/* 2. 核心总结 — mb-2 紧凑衔接 */}
              <p className="text-sm font-medium text-white/70 leading-relaxed mb-2">
                {card.position}
              </p>

              {/* 3. 详情文本 — 紧贴 2，形成内容整体 */}
              <p className="text-xs text-white/60 leading-relaxed tracking-tight">
                {card.detail}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
