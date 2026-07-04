const NAV_ITEMS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'strength', label: 'Strength' },
  { id: 'others',   label: 'Others' },
]

export default function Navbar({ activeSection }) {
  const handleClick = (id) => {
    // 通知所有详情面板关闭
    window.dispatchEvent(new CustomEvent('close-project-detail'))
    window.dispatchEvent(new CustomEvent('close-others-modal'))
    // 等一帧让面板关闭后再滚动
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  return (
    <nav
      className="fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-8 py-4"
      style={{
        background: 'rgba(20, 30, 15, 0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => handleClick('home')}
        className="text-lg font-serif italic tracking-wide text-primary hover:text-white transition-colors duration-300"
      >
        Fangxiao Liu
      </button>

      {/* Nav links */}
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id
          return (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`
                  px-4 py-2 text-xs font-medium rounded-full transition-all duration-300
                  ${isActive
                    ? 'bg-white/10 text-white backdrop-blur-md border border-white/15'
                    : 'text-secondary hover:text-white hover:bg-white/5'
                  }
                `}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
