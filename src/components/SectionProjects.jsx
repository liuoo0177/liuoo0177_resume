import { useState, useEffect, useCallback } from 'react'

// ---- 辅助函数：解析文本中的【关键词】并渲染为高亮衬底标签 ----
function renderText(text) {
  const parts = text.split(/【(.*?)】/)
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <span
          key={i}
          className="bg-white/5 text-emerald-300/80 px-1.5 py-0.5 rounded font-medium text-xs whitespace-nowrap"
        >
          {part}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

// ---- 三大项目全量数据 ----
const PROJECTS = [
  {
    title: 'CareerShot\n智能招聘管理中台',
    subtitle: '全栈独立负责人',
    img: './面试场景.jpg',
    teaser: '针对海量简历初筛成本高、多方协同慢的痛点，主导研发的 AI 招聘管理中台。通过两阶段岗位路由与 Prompt 缓存策略优化算力开销，并构建了基于原生拖拽的协同看板。',
    bg: '传统招聘软件多依赖死板的字面关键词匹配，难以识别注水简历，用人部门面试反馈无法逆向优化初筛标准，导致严重部门内耗。同时 HR、业务主管与候选人之间多方拉锯式沟通导致沟通排期严重停滞。',
    duties: [
      '针对大模型批量对比时算力消耗高、对比逻辑易陷入死循环痛点：设计了【后台绝对分值维护 + 前端同岗击败率动态映射】数据大盘方案。由模型在后台给出 0-100 技术契合度分值并由本地数据库执行数字排序，前端无缝映射转换为"同岗击败率"，在保留天梯榜极致排序体验的同时，实际控制了开销。',
      '针对渠道简历缺乏明确岗位标签导致人工分流极其耗时的痛点：主导设计并通渠了【智能岗位盲选自动路由】核心机制，在前置脚本中追加强力分类协议，强制模型深度阅读并精准分流到公司现有的 17 个建制岗位中自动打分。',
      '针对多方拉锯式沟通排期、传统课表页面臃肿呆板的痛点：独立规划并设计了基于 HTML5 原生拖拽的【24小时甘特图多泳道排期看板】，纵向排布核心总监泳道，支持鼠标左右拖拽卡片直接修改面试时间，并引入【三色状态语义学】，实现点击直接穿透候选人真实信息。',
      '针对单向漏斗断裂的痛点：自研设计了【逆向自纠偏反馈闭环】模块，通过捕获面试官拒绝行为的一键标签与口语化理由，由后台辅助 Agent 执行因果推断，在原有岗位初筛提示词末尾动态追加【技术拦截补丁】，打通了全链路的 Feedback-Loop。',
    ],
    results: [
      '全站从单一聊天卡片向独立管理中台全量升级，所有功能模块完全跑通并实现本地状态机真实数据动态流转。',
      '在 40 个经典测试集验证下，系统初筛【高召回率（Recall）稳定 ≥ 95%】（成功对抗漏筛灾难），【准确率（Precision）≥ 85%】，响应时间控制在 2 秒内。',
      '2026 年 6 月底完成全链路冒烟测试，预计将 HR 日常初筛及面试排期耗时缩短 90% 以上。',
    ],
    tags: ['AI 招聘 / SaaS', '全栈独立负责人', 'LLM 成本优化', '数据看板设计'],
  },
  {
    title: 'VitaSleep AI\n智能健康与日程管理系统',
    subtitle: '软硬件一体化 PM',
    img: './手环5.jpg',
    detailImg: './手环73.jpg',
    teaser: '面向高净值极客人群的无屏智能睡眠与压力管理系统。独立完成了从硬件工程定义到多模态 Agent 架构设计的全流程 PRD，并通过用户行为上下文感知降低误报率。',
    bg: '目前市面上主流的智能穿戴设备（如 Whoop、Apple Watch 等）普遍存在"生理数据与用户真实生活上下文高度割裂、AI 教练功能薄弱"的体验断层。高净值自律人群需要一款能够主动介入的软硬件一体生活管家。',
    duties: [
      '用户调研与定义：深度调研 20+ 位自律硬件极客用户，输出多类竞品技术壁垒与体验断层分析；独立完成全套软硬件【产品定义文档（PRD）】，主导设计了打通第三方日历、HRV 及情绪反馈的【多模态 Agent 数据融合架构】，实现 14 项核心跨设备指标的中心化表征。',
      '策略冷启动推演：规划"先识别状态、再给出建议"的循序渐进开发路径。一阶段构建【高精度用户状态识别算法】，将复杂生理数据转化为模糊感知标签，有效控制无效/误报提醒频率，从根本上杜绝用户的数字焦虑。',
      '动态事务编排：创新设计了基于 LLM 的【动态日程编排与 Dynamic UI 引擎】，让 AI 作为"第二脑"基于用户当前的身体负荷与高压日程实现动态事务重排，构建了 40+ 种典型上下文策略树模型。',
    ],
    results: [
      '3 个月内高效完成从 0 到 1 的用户访谈、竞品分析、硬件选型、Agent 架构设计及核心策略仿真验证。',
      '动态日程编排引擎测试集综合满意度达 85%，仿真测试中【算法采纳率达 82%】，预期提升用户 20% 精力利用率，降低 40% 计划断更率。',
      '软件端 MVP 核心策略及 Dynamic UI 原型已正式交付研发；硬件工程样机排期于 2026 年 Q3 进行首轮白模打样与传感器联合调优。',
    ],
    tags: ['智能穿戴 / IoT', '软硬件一体化 PM', '多模态 Agent 架构', '场景冷启动推演'],
  },
  {
    title: '高端功能沙发\n智能多端交互系统',
    subtitle: 'AI 产品经理 / 提示词调试负责人',
    img: './智能沙发.jpg',
    teaser: '面向国际外贸市场的功能沙发智能交互系统。针对海外空巢老人家居场景下物理按键繁琐的痛点，升级多端语音交互并完成场景意图识别的强约束 Prompt 设计调试。',
    bg: '在北美及欧洲高端家居市场调研中发现，高端功能沙发的机械调节按键和 GUI 菜单越来越臃肿，高净值用户（特别是空巢中老年人）面临极高的学习成本，难以快速调到舒服的姿势。',
    duties: [
      '针对口语化大白话输入无法自动匹配机械动作的痛点：主导设计并调试了【场景意图识别提示词（Prompt）】。通过在 System Prompt 中精准注入沙发行业专业术语并加入【Few-Shot（少样本）示例】，规训 AI 精确理解用户的口语化意图，实现大白话一键场景配置。',
      '针对 AI 文本无法直接驱动硬件电机、且易受大模型幻觉干扰的硬件灾难痛点：作为核心接口调试者，制定了严格的【结构化 JSON 强约束协议】。强制要求大模型在识别意图后禁止返回任何多余自然语言，必须严格输出固定 JSON 字段，由前端触控屏直接解析驱动电机。',
      '针对多端数据不通、用户高频习惯丢失的痛点：独立设计了统一的【用户常用姿态状态机（基于本地缓存同步机制）】，规范数据存储结构，使触控屏、小程序上调优过的专属姿态和高频场景实现多端无缝同步，该架构后续成功复制扩展至 3 款大单品中。',
      '针对跨团队协作开发节奏脱节的内耗痛点：输出并定义了全套【《智能座舱多端软件交互交付文档》】，将大模型的 JSON 输出规范与硬件开发接口、前端 UI 视觉呼吸感和圆角要求直接绑定，消除了供应链与研产之间的壁垒。',
    ],
    results: [
      '完成功能沙发触控屏、微信/iOS 小程序及 iPad 专卖店体验端三端同步上线，并在多款高端功能沙发系列中得到矩阵式量产泛化应用。',
      '通过"智能交互 + 家居"的可行性验证，【AI 意图识别准确率达 92% 以上】，【硬件控制响应率达 100%】，成功为对应高端单品实现了【1000 美金/件 的零售端高额溢价】，显著提升海外高奢产品线利润。',
    ],
    tags: ['智能家居 / 实体产业', 'Prompt 工程与业务对齐', '国际市场洞察', '强约束状态机'],
  },
]

export default function SectionProjects() {
  const [selected, setSelected] = useState(null)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    const onNavClose = () => close()
    if (selected !== null) {
      document.addEventListener('keydown', onKey)
      window.addEventListener('close-project-detail', onNavClose)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('close-project-detail', onNavClose)
      document.body.style.overflow = ''
    }
  }, [selected, close])

  const project = PROJECTS[selected]

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full px-8 py-16 flex flex-col gap-14">

        {/* ======== 模块标题 ======== */}
        <div className="text-center space-y-2">
          <h2
            className="text-3xl font-serif italic tracking-wide text-primary"
            style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
          >
            Projects
          </h2>
          <div className="h-px w-16 mx-auto bg-white/8" />
        </div>

        {/* ============================================================
            3 列摘要卡片网格
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {PROJECTS.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className="glass-card flex flex-col h-full overflow-hidden cursor-pointer group"
            >
              <div className="h-48 flex-shrink-0 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title.replace('\n', ' ')}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-primary/90 tracking-tight leading-snug group-hover:text-primary transition-colors duration-300 whitespace-pre-line">
                    {p.title}
                  </h3>
                  <p
                    className="text-xs text-secondary mt-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {p.subtitle}
                  </p>
                </div>

                <p className="text-xs text-white/55 leading-relaxed line-clamp-3">
                  {p.teaser}
                </p>

                <div className="flex items-end justify-between gap-2 mt-auto pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((tag, k) => (
                      <span
                        key={k}
                        className="text-[10px] text-secondary/70 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                    {p.tags.length > 2 && (
                      <span className="text-[10px] text-white/30 px-1">+{p.tags.length - 2}</span>
                    )}
                  </div>
                  <span className="text-white/20 text-sm flex-shrink-0 transition-all duration-300 group-hover:text-white/50 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ============================================================
          详情面板 — 全屏 Overlay 社论级排版
          ============================================================ */}
      {selected !== null && project && (
        <div
          className="fixed inset-0 z-40 overflow-y-auto"
          style={{ background: 'rgba(8,15,5,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={close}
        >
          <div
            className="w-full max-w-5xl mx-auto px-6 pt-20 pb-10 flex flex-col gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ---- 关闭按钮 ---- */}
            <div className="flex justify-end">
              <button
                onClick={close}
                className="glass-btn glass-btn-sm text-xs"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Close
              </button>
            </div>

            {/* ---- 顶部非对称 Header：2/3 标题 + 1/3 背景 ---- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 标题 */}
              <div className="md:col-span-2">
                <p
                  className="text-[10px] tracking-widest uppercase text-emerald-300/80 font-medium mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  / Project Detail /
                </p>
                <h2
                  className="text-3xl md:text-4xl font-serif tracking-tight text-primary leading-tight whitespace-pre-line"
                  style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
                >
                  {project.title}
                </h2>
                <p
                  className="text-xs text-secondary mt-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {project.subtitle}
                </p>
              </div>

              {/* 背景 */}
              <div className="md:col-span-1 flex flex-col gap-2">
                <p
                  className="text-[9px] tracking-widest uppercase text-emerald-300/80 font-medium"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  / Project Background /
                </p>
                <p className="text-xs text-white/55 leading-relaxed">
                  {project.bg}
                </p>
              </div>
            </div>

            {/* ---- 中间跨栏大图 ---- */}
            <div
              className="w-full aspect-[16/5] rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                src={project.detailImg || project.img}
                alt={project.title.replace('\n', ' ')}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* ---- 底部核心解析区 ---- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* 左：工作职责深度拆解 */}
              <div className="flex flex-col gap-5">
                <p
                  className="text-[10px] tracking-widest uppercase text-emerald-300/80 font-medium"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  / Responsibilities /
                </p>
                <div className="flex flex-col gap-4">
                  {project.duties.map((d, j) => (
                    <div key={j} className="flex gap-3">
                      <span className="text-[10px] text-white/12 flex-shrink-0 mt-0.5 w-5 text-right"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {String(j + 1).padStart(2, '0')}
                      </span>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {renderText(d)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右：项目全量成果 + 标签 */}
              <div className="flex flex-col gap-5">
                <p
                  className="text-[10px] tracking-widest uppercase text-emerald-300/80 font-medium"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  / Results /
                </p>
                <div className="flex flex-col gap-3">
                  {project.results.map((r, j) => (
                    <div
                      key={j}
                      className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <p className="text-xs text-white/60 leading-relaxed">
                        {renderText(r)}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  )
}
