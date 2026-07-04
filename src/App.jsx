import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import SectionHero from './components/SectionHero'
import SectionAbout from './components/SectionAbout'
import SectionProjects from './components/SectionProjects'
import SectionStrength from './components/SectionStrength'
import SectionOthers from './components/SectionOthers'

const SECTIONS = ['home', 'about', 'projects', 'strength', 'others']

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ============================================================
           SVG 滤镜定义（噪点纹理）
           ============================================================ */}
      <svg
        style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none', zIndex: -1 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="noise-filter" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.4"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* ============================================================
           固定背景层：图片 + 深色遮罩 → CSS 多重背景合并（无 absolute）
           ============================================================ */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(180deg,
              rgba(10,25,8,0.35) 0%,
              rgba(15,30,10,0.45) 40%,
              rgba(20,35,15,0.55) 70%,
              rgba(8,18,5,0.65) 100%
            ),
            radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,15,3,0.50) 100%),
            url('./微信图片_20260701150324_178_59.jpg')
          `,
          backgroundSize: 'auto, auto, cover',
          backgroundPosition: '0 0, 0 0, center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* 噪点纹理层 — 独立 fixed 层，不使用 absolute */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ filter: 'url(#noise-filter)', opacity: 0.012 }}
      />

      {/* ============================================================
           玻璃拟态导航栏（Sticky）
           ============================================================ */}
      <Navbar activeSection={activeSection} />

      {/* ============================================================
           5 个全屏 Section（Flex Column 自然堆叠）
           ============================================================ */}
      <div className="relative z-0 pt-16">
        <SectionHero />
        <SectionAbout />
        <SectionProjects />
        <SectionStrength />
        <SectionOthers />
      </div>
    </>
  )
}
