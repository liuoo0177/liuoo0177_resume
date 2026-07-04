import { useState, useEffect, Fragment } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

/* ============================================================
   数据层
   ============================================================ */

// ---- Panel 1: 28 个精准足迹坐标 (百分比定位) ----
const travelGeos = [
  { id: 'portugal',    label: 'Portugal',     coordinates: [-8.2245, 39.3999],  dx: 12,  dy: -4 },
  { id: 'spain',       label: 'Spain',        coordinates: [-3.7492, 40.4637],  dx: 12,  dy: 4 },
  { id: 'france',      label: 'France',       coordinates: [2.2137, 46.2276],   dx: 12,  dy: -2 },
  { id: 'switzerland', label: 'Switzerland',  coordinates: [8.2275, 46.8182],   dx: -12, dy: -8 },
  { id: 'italy',       label: 'Italy',        coordinates: [12.5674, 41.8719],  dx: 12,  dy: 4 },
  { id: 'austria',     label: 'Austria',      coordinates: [14.5501, 47.5162],  dx: -12, dy: -2 },
  { id: 'czech',       label: 'Czech',        coordinates: [15.4730, 49.8175],  dx: -12, dy: -8 },
  { id: 'hungary',     label: 'Hungary',      coordinates: [19.5033, 47.1625],  dx: 12,  dy: 2 },
  { id: 'albania',     label: 'Albania',      coordinates: [20.1683, 41.1533],  dx: 12,  dy: 2 },
  { id: 'greece',      label: 'Greece',       coordinates: [21.8243, 39.0742],  dx: 12,  dy: 6 },
  { id: 'denmark',     label: 'Denmark',      coordinates: [9.5018, 56.2639],   dx: -12, dy: 2 },
  { id: 'norway',      label: 'Norway',       coordinates: [8.4689, 60.4720],   dx: -12, dy: -6 },
  { id: 'xinjiang',    label: '新疆',          coordinates: [87.6168, 43.8256],  dx: -12, dy: -6 },
  { id: 'tibet',       label: '西藏',          coordinates: [91.1172, 29.6469],  dx: 12,  dy: 6 },
  { id: 'qinghai',     label: '青海',          coordinates: [101.7789, 36.6231], dx: 12,  dy: 0 },
  { id: 'yunnan',      label: '云南',          coordinates: [102.7122, 25.0406], dx: 12,  dy: 8 },
  { id: 'guangxi',     label: '广西',          coordinates: [108.3275, 22.8154], dx: 12,  dy: 6 },
  { id: 'guangdong',   label: '广东',          coordinates: [113.2644, 23.1292], dx: 12,  dy: 0 },
  { id: 'henan',       label: '河南',          coordinates: [113.6253, 34.7466], dx: -12, dy: -6 },
  { id: 'shandong',    label: '山东',          coordinates: [117.0009, 36.6758], dx: 12,  dy: -8 },
  { id: 'hebei',       label: '河北',          coordinates: [114.5149, 38.0423], dx: -12, dy: -2 },
  { id: 'beijing',     label: '北京',          coordinates: [116.4074, 39.9042], dx: 12,  dy: -10 },
  { id: 'anhui',       label: '安徽',          coordinates: [117.2272, 31.8206], dx: -12, dy: 4 },
  { id: 'jiangsu',     label: '江苏',          coordinates: [118.7969, 32.0603], dx: 12,  dy: 0 },
  { id: 'zhejiang',    label: '浙江',          coordinates: [120.1551, 30.2741], dx: -12, dy: -8 },
  { id: 'shanghai',    label: '上海',          coordinates: [121.4737, 31.2304], dx: 12,  dy: 8 },
  { id: 'harbin',      label: '哈尔滨',        coordinates: [126.6424, 45.7569], dx: 12,  dy: -6 },
  { id: 'thailand',    label: 'Thailand',     coordinates: [100.9925, 15.8700], dx: 12,  dy: 4 },
]

// ---- Panel 1: 瀑布流照片墙数据 (全量 45 张) ----
const PHOTOS = [
  { img: '/多洛米蒂.jpg',   location: 'italy',       label: 'DOLOMITES, ITALY' },
  { img: '/巴黎.jpg',       location: 'france',      label: 'PARIS, FRANCE' },
  { img: '/挪威.jpg',       location: 'norway',      label: 'OSLO, NORWAY' },
  { img: '/米兰.jpg',       location: 'italy',       label: 'MILANO, ITALY' },
  { img: '/布拉格.jpg',     location: 'czech',       label: 'PRAHA, CZECH' },
  { img: '/地坛.jpg',       location: 'beijing',     label: 'BEIJING, CHINA' },
  { img: '/瑞士.jpg',       location: 'switzerland', label: 'GRINDELWALD, SWITZERLAND' },
  { img: '/威尼斯.jpg',     location: 'italy',       label: 'VENEZIA, ITALY' },
  { img: '/布达佩斯.jpg',   location: 'hungary',     label: 'BUDAPEST, HUNGARY' },
  { img: '/泰国.jpg',       location: 'thailand',    label: 'BANGKOK, THAILAND' },
  { img: '/哈尔滨.jpg',     location: 'harbin',      label: 'HARBIN, CHINA' },
  { img: '/罗马.jpg',       location: 'italy',       label: 'ROMA, ITALY' },
  { img: '/巴黎2.jpg',      location: 'france',      label: 'PARIS, FRANCE' },
  { img: '/挪威2.jpg',      location: 'norway',      label: 'BERGEN, NORWAY' },
  { img: '/扬州.jpg',       location: 'jiangsu',     label: 'YANGZHOU, CHINA' },
  { img: '/西班牙.jpg',     location: 'spain',       label: 'BARCELONA, SPAIN' },
  { img: '/米兰2.jpg',      location: 'italy',       label: 'MILANO, ITALY' },
  { img: '/布拉格2.jpg',    location: 'czech',       label: 'PRAHA, CZECH' },
  { img: '/希腊.jpg',       location: 'greece',      label: 'ATHENS, GREECE' },
  { img: '/多洛米蒂2.jpg',  location: 'italy',       label: 'DOLOMITES, ITALY' },
  { img: '/瑞士2.jpg',      location: 'switzerland', label: 'ZURICH, SWITZERLAND' },
  { img: '/威尼斯2.jpg',    location: 'italy',       label: 'VENEZIA, ITALY' },
  { img: '/布达佩斯2.jpg',  location: 'hungary',     label: 'BUDAPEST, HUNGARY' },
  { img: '/重庆.jpg',       location: 'chongqing',   label: 'CHONGQING, CHINA' },
  { img: '/巴黎3.jpg',      location: 'france',      label: 'PARIS, FRANCE' },
  { img: '/罗马2.jpg',      location: 'italy',       label: 'ROMA, ITALY' },
  { img: '/挪威3.jpg',      location: 'norway',      label: 'TROMSO, NORWAY' },
  { img: '/葡萄牙.jpg',     location: 'portugal',    label: 'LISBOA, PORTUGAL' },
  { img: '/米兰3.jpg',      location: 'italy',       label: 'MILANO, ITALY' },
  { img: '/布拉格3.jpg',    location: 'czech',       label: 'PRAHA, CZECH' },
  { img: '/扬州2.jpg',      location: 'jiangsu',     label: 'YANGZHOU, CHINA' },
  { img: '/西西里.jpg',     location: 'italy',       label: 'SICILIA, ITALY' },
  { img: '/西班牙2.jpg',    location: 'spain',       label: 'BARCELONA, SPAIN' },
  { img: '/泰国2.jpg',      location: 'thailand',    label: 'CHIANG MAI, THAILAND' },
  { img: '/威尼斯3.jpg',    location: 'italy',       label: 'VENEZIA, ITALY' },
  { img: '/尼斯.jpg',       location: 'france',      label: 'NICE, FRANCE' },
  { img: '/罗马3.jpg',      location: 'italy',       label: 'ROMA, ITALY' },
  { img: '/布达佩斯3.jpg',  location: 'hungary',     label: 'BUDAPEST, HUNGARY' },
  { img: '/挪威4.jpg',      location: 'norway',      label: 'LOTOFEN, NORWAY' },
  { img: '/布拉格4.jpg',    location: 'czech',       label: 'PRAHA, CZECH' },
  { img: '/卡塔尼亚.jpg',   location: 'italy',       label: 'CATANIA, ITALY' },
  { img: '/葡萄牙2.jpg',    location: 'portugal',    label: 'LISBOA, PORTUGAL' },
  { img: '/维也纳.jpg',     location: 'austria',     label: 'WIEN, AUSTRIA' },
  { img: '/威尼斯4.jpg',    location: 'italy',       label: 'VENEZIA, ITALY' },
  { img: '/泰国3.jpg',      location: 'thailand',    label: 'PHUKET, THAILAND' },
  { img: '/尼斯2.jpg',      location: 'france',      label: 'NICE, FRANCE' },
  { img: '/希腊2.jpg',      location: 'greece',      label: 'SANTORINI, GREECE' },
  { img: '/希腊3.jpg',      location: 'greece',      label: 'MYKONOS, GREECE' },
  { img: '/西西里2.jpg',    location: 'italy',       label: 'SICILIA, ITALY' },
]

// ---- Panel 2: 户外韧性 ----
const OUTDOOR_COLS = [
  { label: 'ROAD CYCLING',  img: '/微信图片_20260701173437_193_59.jpg', stats: [{ k: 'TOTAL CYCLING DISTANCE', v: '14000 KM' }, { k: 'TOTAL ELEVATION', v: '120000 M' }, { k: 'STATUS', v: 'UNSTOPPABLE' }] },
  { label: 'ALPINISM',      img: '/微信图片_20260701112338_174_59.jpg', stats: [{ k: 'ALTITUDE', v: '5000 M+' },          { k: 'STATUS',   v: 'COMPLETED' }] },
  { label: 'TRAIL RUNNING', img: '/微信图片_20260701112339_175_59.jpg', stats: [{ k: 'TOTAL RUNNING DISTANCE', v: '3200 KM' }, { k: 'HALF MARATHON PB', v: '1:48:12' }] },
  { label: 'MARATHON',      img: '/微信图片_20260630123233_6372_117.jpg',stats: [{ k: 'HALF MARATHON PB', v: '1:48:12' }, { k: 'MINDSET', v: 'PERSISTENT' }] },
]

// ---- Panel 3: 思想年鉴 ----
const EDITORIALS = [
  { title: '《送别 2025 · 启程》', subtitle: '技术跃迁与跨界破局', cover: '/微信图片_20260701150324_178_59.jpg', excerpt: '从产品设计到产品经理的跨越，AI 工具链重塑工作流的实战记录。这一年，将意图理解与硬件约束深度耦合，在不确定中寻找确定性的方法论沉淀。', url: '#' },
  { title: '《送别 2024 · 履迹》', subtitle: '设计从业十年的本质思考与履迹沉淀', cover: '/d5321b96-68d3-433e-b0ba-538abd7ccff6.png', excerpt: 'CMF 不是颜色、材料、表面处理的简单叠加，而是产品感知质量的系统科学。当 AI Agent 开始理解物理世界，设计师的角色正被重新定义——这是一场关于感知与智能的深层对话。', url: '#' },
]

// ---- Panel 4: 荣誉 ----
const HONORS = [
  { award: '人居环境设计学年奖', level: '金奖（前 2%）', org: '中国建筑学会' },
  { award: '亚洲设计学年奖',     level: '银奖',         org: '亚洲设计联盟' },
  { award: 'CSC 国家公派留学奖学金', level: '全额资助',  org: '国家留学基金委' },
  { award: 'GPA 3.84 / 4.00',   level: '清华大学',      org: '设计学硕士' },
]

/* ============================================================
   辅助组件
   ============================================================ */
function SectionLabel({ text }) {
  return <span className="text-emerald-400 font-mono text-xs tracking-[0.3em] uppercase select-none">{text}</span>
}
function StatRow({ k, v }) {
  return (
    <div className="flex justify-between items-baseline border-b border-white/[0.04] pb-2">
      <span className="text-[8px] font-mono text-white/25 tracking-[0.12em]">{k}</span>
      <span className="text-[10px] font-mono text-white/70 tracking-wide">{v}</span>
    </div>
  )
}

/* ============================================================
   Panel 1 — 亚欧大陆线稿地图 + 诗歌 + 瀑布流
   ============================================================ */
function PhotographyPanel() {
  const [hoveredNode, setHoveredNode] = useState(null)
  const [activeId, setActiveId] = useState(null)

  return (
    <div className="w-full flex flex-col gap-8 overflow-y-auto flex-1 min-h-0">

      {/* ======== 地图 + 诗歌 横排 ======== */}
      <div className="flex gap-6 w-full pt-4 pb-2">
        {/* Left 55% — react-simple-maps 亚欧全景沙盘 */}
        <div className="w-[55%] relative overflow-hidden bg-transparent rounded-2xl"
          style={{ aspectRatio: '16/10' }}>

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [65, 38], scale: 320 }}
            className="w-full h-full"
            style={{ background: 'transparent' }}
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="transparent"
                    stroke="#6ee7b7"
                    strokeWidth="0.5"
                    strokeOpacity="0.45"
                    className="outline-none"
                    style={{
                      default: { outline: 'none' },
                      hover:  { fill: 'rgba(110,231,183,0.04)', outline: 'none' },
                      pressed:{ outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* 28 GPS 锚点 — 引线 + 高亮圆点 + 永久地名 */}
            {travelGeos.map(n => {
              const isActive = hoveredNode?.id === n.id || activeId === n.id
              const anchor = n.dx > 0 ? 'start' : 'end'
              const lx = n.dx > 0 ? n.dx - 3 : n.dx + 3
              return (
                <Marker key={n.id} coordinates={n.coordinates}>
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(n)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setActiveId(n.id === activeId ? null : n.id)}
                  >
                    <circle cx={0} cy={0} r={18} fill="transparent" />
                    {/* Leader line — thin emerald line from dot to label */}
                    <line x1={0} y1={0} x2={lx} y2={n.dy}
                      stroke="#6ee7b7" strokeWidth="0.5" opacity="0.4" />
                    {/* Outer glow ring */}
                    <circle cx={0} cy={0} r={5} fill="#6ee7b7" opacity="0.1" />
                    {/* Core dot — brighter than map outlines */}
                    <circle cx={0} cy={0} r={isActive ? 3 : 2.2}
                      fill="#6ee7b7" opacity="0.95"
                      className="transition-all duration-300"
                      style={{ filter: 'drop-shadow(0 0 5px rgba(110,231,183,0.7))' }} />
                    {isActive && (
                      <circle cx={0} cy={0} r={9} fill="#6ee7b7" opacity="0.25" className="animate-ping" />
                    )}
                    {/* Always-visible label */}
                    <text x={n.dx} y={n.dy}
                      textAnchor={anchor} fill="#6ee7b7" opacity="0.88"
                      fontSize={7} fontFamily="monospace" fontWeight={600}
                      className="tracking-wider uppercase pointer-events-none select-none"
                      style={{ textShadow: '0 0 5px rgba(110,231,183,0.4)' }}>
                      {n.label}
                    </text>
                  </g>
                </Marker>
              )
            })}
          </ComposableMap>
        </div>

        {/* Right 45% — 诗歌 */}
        <div className="w-[45%] flex items-center">
          <p className="text-white/60 font-sans text-xs leading-relaxed tracking-wide text-left"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            这些年我走了很多地方，但并没有太多轰轰烈烈的事迹。<br /><br />
            也许是我更多依靠人力和人力工具的原因，我对许多地方的寻访通常是缓慢且有节奏的。<br /><br />
            飞机把我运送到世界各地，自行车探访地区脉络，然后自己再像小蚂蚁一样用脚步深入道路、山林，直至末节。<br /><br />
            我所进行的摄影通常是挂着相机瞎走的过程中进行的，较少的提前计划，而重视偶然中的惊喜、留意生动的生活。
          </p>
        </div>
      </div>

      {/* ======== 过渡标题 ======== */}
      <div className="w-full text-left font-mono tracking-widest text-xs uppercase text-white/70 mt-8 mb-4">
        SELECTED PHOTOGRAPHY WORKS
      </div>

      {/* ======== 瀑布流照片墙 ======== */}
      <div className="columns-3 md:columns-4 lg:columns-5 gap-[18px] w-full">
        {PHOTOS.map((photo, i) => {
          const isActive = activeId === photo.location
          return (
            <div key={i}
              onClick={() => setActiveId(photo.location === activeId ? null : photo.location)}
              className={`break-inside-avoid rounded-xl overflow-hidden cursor-pointer mb-[20px] group/photo relative
                transition-all duration-500 ${isActive ? 'ring-2 ring-emerald-400/70' : 'ring-0'}`}
            >
              <img src={photo.img} alt={photo.label}
                className="w-full h-auto object-cover transition-all duration-500 group-hover/photo:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <span className="text-[9px] font-mono text-white/90 tracking-[0.12em] uppercase">{photo.label}</span>
              </div>
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(110,231,183,0.7)] animate-pulse" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ============================================================
   Panel 2 — 动能韧性 (无滚动单屏 + 纯橙轨迹)
   ============================================================ */
function ResiliencePanel() {
  return (
    <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row gap-8 items-stretch overflow-hidden">

      {/* Left 58% — 轨迹.jpg 纯橙线 (深灰背景→纯黑→透明) */}
      <div className="w-full lg:w-[58%] h-full flex items-center justify-center overflow-hidden bg-transparent">
        <img src="/轨迹.jpg" alt=""
          className="w-full h-full object-contain select-none pointer-events-none scale-x-[1.3]"
          style={{
            filter: 'contrast(3) brightness(0.6) sepia(1) saturate(30) hue-rotate(10deg) brightness(1.4)',
            mixBlendMode: 'screen',
          }} />
      </div>

      {/* Right 42% — Grid 3 行等分，锁死无滚动 */}
      <div className="w-full lg:w-[42%] h-full grid grid-rows-3 gap-4 overflow-hidden">

        {/* Cycling */}
        <div className="relative rounded-2xl overflow-hidden group/sport border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-center">
          <img src="/骑行.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-black/15" />
          <div className="relative z-10">
            <span className="font-mono uppercase text-[10px] tracking-widest text-orange-500">CYCLING</span>
            <div className="mt-3 space-y-2">
              <div><span className="font-mono text-[9px] uppercase tracking-widest text-white/35 block">TOTAL CYCLING DISTANCE</span><span className="font-sans text-base font-semibold text-white block">14000 KM</span></div>
              <div><span className="font-mono text-[9px] uppercase tracking-widest text-white/35 block">TOTAL ELEVATION</span><span className="font-sans text-base font-semibold text-white block">120000 M</span></div>
              <div><span className="font-mono text-[9px] uppercase tracking-widest text-white/35 block">STATUS</span><span className="font-sans text-base font-semibold text-orange-400 block">UNSTOPPABLE</span></div>
            </div>
          </div>
        </div>

        {/* Marathon */}
        <div className="relative rounded-2xl overflow-hidden group/sport border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-center">
          <img src="/马拉松.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-black/15" />
          <div className="relative z-10">
            <span className="font-mono uppercase text-[10px] tracking-widest text-orange-500">MARATHON</span>
            <div className="mt-3 space-y-2">
              <div><span className="font-mono text-[9px] uppercase tracking-widest text-white/35 block">TOTAL RUNNING DISTANCE</span><span className="font-sans text-base font-semibold text-white block">3200 KM</span></div>
              <div><span className="font-mono text-[9px] uppercase tracking-widest text-white/35 block">HALF MARATHON PB</span><span className="font-sans text-base font-semibold text-white block">1:48:12</span></div>
              <div><span className="font-mono text-[9px] uppercase tracking-widest text-white/35 block">MINDSET</span><span className="font-sans text-base font-semibold text-orange-400 block">PERSISTENT</span></div>
            </div>
          </div>
        </div>

        {/* Trail Running */}
        <div className="relative rounded-2xl overflow-hidden group/sport border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-center">
          <img src="/越野跑4.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-black/15" />
          <div className="relative z-10">
            <span className="font-mono uppercase text-[10px] tracking-widest text-orange-500">TRAIL RUNNING</span>
            <div className="mt-3 space-y-2">
              <div><span className="font-mono text-[9px] uppercase tracking-widest text-white/35 block">MAX TRAIL RUNNING DISTANCE</span><span className="font-sans text-base font-semibold text-white block">45 KM</span></div>
              <div><span className="font-mono text-[9px] uppercase tracking-widest text-white/35 block">STATUS</span><span className="font-sans text-base font-semibold text-orange-400 block">ENDURING</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Panel 3 — 思想年鉴
   ============================================================ */
function InsightsPanel() {
  return (
    <div className="w-full flex-1 min-h-0 flex flex-col gap-6 overflow-y-auto pr-1">
      <SectionLabel text="INSIGHTS / 03" />
      <div className="w-full max-w-4xl mx-auto my-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch scale-[0.8] origin-center">

          {/* 左卡 — 2025 */}
          <a href="https://mp.weixin.qq.com/s/VwwO-hO0_KiMCIXJo9qyDw" target="_blank" rel="noopener noreferrer"
            className="relative group cursor-pointer flex flex-col h-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all duration-300 rounded-2xl overflow-hidden">
            <span className="absolute top-3 left-3 z-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[11px] font-mono tracking-[0.12em] uppercase shadow-sm backdrop-blur-sm">
              2025记录
            </span>
            <img src="/那拉提.png" alt="" className="w-full aspect-[16/10] object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105" />
            <div className="p-4 flex flex-col gap-2">
              <h4 className="text-[14px] font-serif italic text-primary/80 leading-[1.5]" style={{fontFamily:"'Instrument Serif', Georgia, serif"}}>《送别 2025 · 启程》</h4>
              <p className="text-xs text-emerald-400/45 font-mono tracking-[0.03em]">启程</p>
              <p className="text-xs text-white/35 leading-[1.95] line-clamp-2" style={{fontFamily:"'Plus Jakarta Sans', sans-serif"}}>是我2025年的关键词，被年龄推着向前，进入社会、来到新城市、开始新生活、有了新身份的一年。</p>
              <span className="text-[11px] font-mono text-white/15 group-hover:text-emerald-400/45 transition-colors duration-300 tracking-[0.18em]">VIEW REFLECTION →</span>
            </div>
          </a>

          {/* 右卡 — 2024 */}
          <a href="https://mp.weixin.qq.com/s/636JWQvCGdd1idNjJS_bYA" target="_blank" rel="noopener noreferrer"
            className="relative group cursor-pointer flex flex-col h-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all duration-300 rounded-2xl overflow-hidden">
            <span className="absolute top-3 left-3 z-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[11px] font-mono tracking-[0.12em] uppercase shadow-sm backdrop-blur-sm">
              2024记录
            </span>
            <img src="/奥地利1.png" alt="" className="w-full aspect-[16/10] object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105" />
            <div className="p-4 flex flex-col gap-2">
              <h4 className="text-[14px] font-serif italic text-primary/80 leading-[1.5]" style={{fontFamily:"'Instrument Serif', Georgia, serif"}}>《送别 2024 · 履迹》</h4>
              <p className="text-xs text-emerald-400/45 font-mono tracking-[0.03em]">履迹</p>
              <p className="text-xs text-white/35 leading-[1.95]" style={{fontFamily:"'Plus Jakarta Sans', sans-serif"}}>概括了我的2024，也许这也是我一贯的风格。</p>
              <span className="text-[11px] font-mono text-white/15 group-hover:text-emerald-400/45 transition-colors duration-300 tracking-[0.18em]">VIEW REFLECTION →</span>
            </div>
          </a>

        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Panel 4 — 荣誉
   ============================================================ */
function HonorsPanel() {
  const honorsData = [
    { year: '2020', title: '双井可持续更新·13社区设计节', award: '优秀奖' },
    { year: '2020', title: '《设计》杂志 设计战"疫"公共卫生方案', award: '方案收录' },
    { year: '2022', title: '紫金奖中国大学生设计展', award: '优秀奖' },
    { year: '2022', title: '学院杯 中国室内与环境设计大赛', award: '优秀奖' },
    { year: '2022', title: '北京林业大学70周年校庆展览', award: '入选' },
    { year: '2022', title: '第二十届亚洲设计学年奖', award: '银奖' },
    { year: '2022', title: '第八届"中国人居环境设计学年奖"', award: '金奖' },
    { year: '2023', title: '中国国家留学基金委员会奖学金资助 (CSC)', award: '获资助选派' },
  ]

  const n = honorsData.length

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col gap-6 overflow-y-auto pr-1">
      <SectionLabel text="HONORS & AWARDS / 04" />

      <div className="relative w-full h-[65vh] flex items-center justify-center overflow-hidden bg-transparent">

        {/* ======== SVG 层：曲线 + 引线 ======== */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <path
            d="M 18% 90% C 36% 65%, 72% 35%, 90% 10%"
            fill="none"
            className="stroke-emerald-400/15 stroke-[1.5]"
            strokeDasharray="4 6"
          />
          <path
            d="M 18% 90% C 36% 65%, 72% 35%, 90% 10%"
            fill="none"
            className="stroke-emerald-300/35 stroke-[1.5]"
            style={{ filter: 'drop-shadow(0 0 6px rgba(110,231,183,0.3))' }}
          />

          {/* 引线 */}
          {honorsData.map((h, i) => {
            const dotLeft = 18 + (i / (n - 1)) * 72
            const dotBottom = 10 + (i / (n - 1)) * 80
            const dotY = 100 - dotBottom
            const toRight = i % 2 === 0
            const anchorLeft = toRight ? dotLeft + 14 : dotLeft - 14
            const anchorY = dotY - 2

            return (
              <g key={i}>
                <line x1={`${dotLeft}%`} y1={`${dotY}%`}
                  x2={`${anchorLeft}%`} y2={`${dotY}%`}
                  className="stroke-emerald-400/20 stroke-[0.5]" />
                <line x1={`${anchorLeft}%`} y1={`${dotY}%`}
                  x2={`${anchorLeft}%`} y2={`${anchorY}%`}
                  className="stroke-emerald-400/20 stroke-[0.5]" />
                <circle cx={`${anchorLeft}%`} cy={`${anchorY}%`} r="2"
                  className="fill-emerald-400/25" />
              </g>
            )
          })}
        </svg>

        {/* ======== 曲线圆点 + 文字标签 ======== */}
        {honorsData.map((h, i) => {
          const dotLeft = 18 + (i / (n - 1)) * 72
          const dotBottom = 10 + (i / (n - 1)) * 80
          const dotTop = 100 - dotBottom
          const toRight = i % 2 === 0
          const anchorLeft = toRight ? dotLeft + 14 : dotLeft - 14
          const anchorTop = dotTop - 2

          return (
            <div key={i}>
              <div
                className="absolute group/dot cursor-pointer"
                style={{ left: `${dotLeft}%`, bottom: `${dotBottom}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-300/80 shadow-[0_0_6px_rgba(110,231,183,0.5)] -translate-x-1/2 translate-y-1/2 transition-transform duration-300 hover:scale-150" />
              </div>

              <div
                className="absolute max-w-[110px]"
                style={{
                  left: `${anchorLeft}%`,
                  top: `${anchorTop}%`,
                  transform: toRight ? 'translateY(-50%)' : 'translate(-100%, -50%)',
                  textAlign: toRight ? 'left' : 'right',
                }}
              >
                <span className="font-mono text-[9px] text-emerald-400/50 block">
                  {h.year}
                </span>
                <span className="text-white/70 font-sans text-[11px] mt-0.5 tracking-wide block leading-relaxed">
                  {h.title}
                </span>
                <span className="text-emerald-300/50 font-mono text-[9px] mt-0.5 block tracking-wide">
                  {h.award}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ============================================================
   卡片数据 — 4 张卡片，新文案
   ============================================================ */
const GALLERY_CARDS = [
  {
    id: 'photography', num: '01', title: 'PHOTOGRAPHY & LENS',
    desc: '探索世界与全球化视野，在跨文化体验中解构多元生活方式；捕捉光影瞬间，审美共塑镜头艺术表达。',
    bgImg: '/多洛米蒂2.jpg',
  },
  {
    id: 'resilience', num: '02', title: 'KINETIC RESILIENCE',
    desc: '坚韧品格与户外世界，向内修炼与卓越追求。',
    bgImg: '/骑行.jpg',
  },
  {
    id: 'insights', num: '03', title: 'MONOLOGUE & INSIGHTS',
    desc: '对世界与生活的持续思考。',
    bgImg: '/瑞士.jpg',
  },
  {
    id: 'honors', num: '04', title: 'OTHER HONORS',
    desc: '专业领域的闪光，继续前行的底气。',
    bgImg: '/多洛米蒂.jpg',
  },
]

/* ============================================================
   主组件
   ============================================================ */
export default function SectionOthers() {
  const [modal, setModal] = useState(null)
  const open  = (id) => setModal(id)
  const close = () => setModal(null)

  // 监听导航栏点击 → 自动关闭弹窗
  useEffect(() => {
    const onNavClose = () => close()
    window.addEventListener('close-others-modal', onNavClose)
    return () => window.removeEventListener('close-others-modal', onNavClose)
  }, [])

  return (
    <>
      <section id="others" className="h-screen max-h-screen overflow-hidden flex flex-col justify-center relative">

        {/* ================================================================
            SVG 丝线 — 连续穿透 4 张错落卡片
            ================================================================ */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0" />
              <stop offset="12%" stopColor="#6ee7b7" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.3" />
              <stop offset="88%" stopColor="#6ee7b7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="dg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Main thread — 4-card bezier */}
          <path
            d="M 30 342
               C 100 332, 130 264, 168 272
               C 250 290, 380 404, 456 390
               C 530 376, 660 284, 744 296
               C 820 306, 950 390, 1032 380
               C 1100 372, 1140 352, 1170 347"
            fill="none" stroke="url(#lg)" strokeWidth="1.5" strokeLinecap="round"
          />

          {/* Ghost dashed */}
          <path
            d="M 45 354
               C 112 344, 142 280, 168 286
               C 260 302, 395 390, 456 377
               C 515 364, 645 298, 744 310
               C 835 320, 965 377, 1032 367
               C 1090 360, 1130 342, 1155 337"
            fill="none" stroke="#6ee7b7" strokeWidth="0.5" strokeOpacity="0.10" strokeLinecap="round" strokeDasharray="5 10"
          />

          {/* Anchor dots for 4 cards */}
          {[[168,272],[456,390],[744,296],[1032,380]].map(([cx,cy],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="5" fill="url(#dg)" opacity="0.5" />
              <circle cx={cx} cy={cy} r="1.5" fill="#6ee7b7" opacity="0.7" />
            </g>
          ))}
        </svg>

        {/* ================================================================
            Content
            ================================================================ */}
        <div className="w-full max-w-7xl mx-auto px-12 pt-40 pb-4 flex flex-col h-full relative z-10">

          {/* Title */}
          <div className="text-center space-y-2 flex-shrink-0">
            <h2 className="text-3xl font-serif italic tracking-wide text-primary"
              style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}>Beyond Work</h2>
            <div className="h-px w-16 mx-auto bg-white/8" />
          </div>

          {/* 4 张错落卡片 */}
          <div className="flex items-center justify-center gap-12 h-[50vh] mt-8">

            {GALLERY_CARDS.map((card, i) => {
              // 4-card stagger: up, down, slight-up, down
              const staggerClass = i === 0 ? '-translate-y-8'
                : i === 1 ? 'translate-y-8'
                : i === 2 ? '-translate-y-2'
                : 'translate-y-6'

              return (
                <div key={card.id} onClick={() => open(card.id)}
                  className={`${staggerClass} max-w-[240px] w-full h-[42vh]
                    bg-cover bg-center relative overflow-hidden rounded-2xl
                    bg-white/[0.02] backdrop-blur-md border border-white/10
                    p-5 flex flex-col items-center justify-center text-center
                    cursor-pointer transition-all duration-500 ease-out
                    hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(180,210,160,0.08)]
                    hover:border-white/15 group z-10`}
                >
                  {/* 全幅摄影原图背景 */}
                  <img src={card.bgImg} alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl z-0" />

                  {/* 渐变暗化遮罩 — 确保白字可读 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-[1] pointer-events-none rounded-2xl" />

                  <span className="relative z-10 text-sm font-mono tracking-tight text-white drop-shadow-md mb-4"
                    style={{ fontFamily: "'Plus Jakarta Sans', monospace" }}>{card.num}</span>

                  <h3 className="relative z-10 text-[11px] font-medium tracking-widest uppercase text-white drop-shadow-md mb-4 font-mono">{card.title}</h3>

                  <div className="relative z-10 w-10 h-px bg-white/20 mb-5" />

                  <p className="relative z-10 text-[10px] text-white/85 drop-shadow-md leading-relaxed max-w-[200px]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{card.desc}</p>
                </div>
              )
            })}

          </div>
        </div>
      </section>

      {/* ================================================================
          Cinematic Modal
          ================================================================ */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xl z-50 flex items-center justify-center p-8 animate-fade-in-up" onClick={close}>
          <div className="relative max-w-7xl w-full h-[85vh] overflow-hidden bg-[#111c16]/95 border border-white/10 rounded-3xl p-8 flex flex-col" onClick={e => e.stopPropagation()}>
            <button onClick={close} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-300 z-10 text-sm">✕</button>
            {modal === 'photography' && <PhotographyPanel />}
            {modal === 'resilience'  && <ResiliencePanel />}
            {modal === 'insights'    && <InsightsPanel  />}
            {modal === 'honors'      && <HonorsPanel    />}
          </div>
        </div>
      )}
    </>
  )
}
