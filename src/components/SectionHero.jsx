export default function SectionHero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center"
    >
      {/*
        Grid 2 列：items-center 确保左右纵向完美居中
        max-w-6xl 约束内收，不再贴屏幕两侧
      */}
      <div className="max-w-6xl mx-auto w-full px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ============================================================
            左列：姓名 + Slogan + 学历（垂直堆叠，大留白）
            ============================================================ */}
        <div className="flex flex-col gap-10 lg:pl-20">

          {/* ---- 姓名 ---- */}
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-primary leading-none">
              刘芳晓
            </h1>
            <p
              className="text-lg text-secondary tracking-wider"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Fangxiao Liu
            </p>
          </div>

          {/* ---- 核心定位 Slogan ---- */}
          <p
            className="text-sm text-secondary leading-relaxed max-w-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.025em' }}
          >
            兼具 10 年设计经验、用户体验设计经验与 AI 产品从 0–1
            全流程实战能力的复合型 AIPM
          </p>

          {/* ---- 教育背景 ---- */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[10px] tracking-widest uppercase text-white/35 mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Education
            </span>

            <div className="flex flex-col gap-3">
              {[
                { school: '清华大学美术学院', degree: '设计学硕士', en: 'Tsinghua University' },
                { school: '米兰理工大学',     degree: '设计学双学位硕士', en: 'Politecnico di Milano' },
                { school: '北京林业大学',     degree: '艺术设计学士', en: 'Beijing Forestry University' },
              ].map((item, i) => (
                <div key={i} className="flex items-baseline gap-3 group">
                  <span
                    className="text-[10px] text-white/15 flex-shrink-0 w-4 text-right"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-primary/85 tracking-tight">
                      {item.school}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/12 flex-shrink-0 self-center" />
                    <span
                      className="text-xs text-secondary tracking-wide"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.degree}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================
            右列：圆形照片 + 联系方式（中轴线完美居中，紧凑衔接）
            ============================================================ */}
        <div className="flex flex-col items-center justify-center gap-5">

          {/* ---- 正圆形照片卡片 ---- */}
          <div
            className="w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden flex-shrink-0"
            style={{
              border: '1px solid rgba(255,255,255,0.20)',
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.06) inset,
                0 20px 60px rgba(0,0,0,0.30)
              `,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(
                    135deg,
                    rgba(25, 40, 18, 0.12) 0%,
                    rgba(18, 28, 12, 0.04) 50%,
                    rgba(22, 35, 16, 0.10) 100%
                  ),
                  url('/微信图片_20260701150715_179_59.jpg')
                `,
                backgroundSize: 'auto, cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* ---- 联系方式标签（紧凑贴附于照片下方） ---- */}
          <div className="flex flex-col items-center gap-2.5">
            {[
              { label: 'Email', value: '1772379950@qq.com', href: 'mailto:1772379950@qq.com' },
              { label: 'Tel',   value: '15503282282',       href: 'tel:15503282282' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                  inline-flex items-center gap-2.5 px-5 py-2.5
                  text-xs font-medium
                  bg-white/5 backdrop-blur-md
                  border border-white/10
                  rounded-full
                  transition-all duration-300
                  hover:bg-white/10 hover:border-white/20
                  hover:shadow-[0_0_24px_rgba(180,210,160,0.10)]
                  group
                `}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-white/30 text-[10px] tracking-widest uppercase group-hover:text-white/50 transition-colors duration-300">
                  {item.label}
                </span>
                <span className="w-px h-3 bg-white/8 flex-shrink-0" />
                <span className="text-primary/75 group-hover:text-primary transition-colors duration-300">
                  {item.value}
                </span>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
