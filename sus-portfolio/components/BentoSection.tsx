'use client'

import { useState, useRef, useEffect } from 'react'
import ProjectsOverlay, { FEATURED } from './ProjectsOverlay'
import ExperienceOverlay from './ExperienceOverlay'
import ActivityOverlay from './ActivityOverlay'
import { ACTIVITIES, PLATFORM_ICONS, PLATFORM_COLORS } from '@/content/activity'
import ThoughtsOverlay from './ThoughtsOverlay'
import { THOUGHTS } from '@/content/thoughts'
import { LATEST_ROLE, BENTO_HIGHLIGHTS } from '@/content/experience'
import { PROFILE } from '@/content/profile'

export default function BentoSection() {
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [expOpen, setExpOpen] = useState(false)
  const [activityOpen, setActivityOpen] = useState(false)
  const [thoughtsOpen, setThoughtsOpen] = useState(false)
  const expCardRef = useRef<HTMLDivElement>(null)
  const projectsCardRef = useRef<HTMLDivElement>(null)
  const contactCardRef = useRef<HTMLDivElement>(null)
  const activeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeElRef = useRef<HTMLDivElement | null>(null)

  function pulseCard(el: HTMLDivElement | null) {
    if (!el) return

    // Stop any existing pulse
    if (activeTimerRef.current) {
      clearInterval(activeTimerRef.current)
      if (activeElRef.current) activeElRef.current.style.border = ''
    }

    activeElRef.current = el
    let tick = 0
    el.style.border = '2px solid rgba(59,130,246,0.45)'
    const timer = setInterval(() => {
      tick++
      el.style.border = tick % 2 === 0
        ? '2px solid rgba(59,130,246,0.45)'
        : '2px solid rgba(59,130,246,0.1)'
      if (tick >= 5) {
        clearInterval(timer)
        el.style.border = ''
        activeTimerRef.current = null
        activeElRef.current = null
      }
    }, 600)
    activeTimerRef.current = timer
  }

  useEffect(() => {
    const onExp     = () => pulseCard(expCardRef.current)
    const onProjects = () => pulseCard(projectsCardRef.current)
    const onContact  = () => pulseCard(contactCardRef.current)

    window.addEventListener('highlight-experience', onExp)
    window.addEventListener('highlight-projects', onProjects)
    window.addEventListener('highlight-contact', onContact)
    return () => {
      window.removeEventListener('highlight-experience', onExp)
      window.removeEventListener('highlight-projects', onProjects)
      window.removeEventListener('highlight-contact', onContact)
    }
  }, [])
  const [activeCard, setActiveCard] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isPaused = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused.current) return
      setActiveCard(prev => {
        const next = (prev + 1) % FEATURED.length
        const track = carouselRef.current
        if (track) track.scrollTo({ left: next * track.offsetWidth, behavior: 'smooth' })
        return next
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  function goTo(i: number) {
    setActiveCard(i)
    const track = carouselRef.current
    if (track) track.scrollTo({ left: i * track.offsetWidth, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .bento {
          padding: 64px 4vw 48px;
          background: #ffffff;
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid rgba(26,26,26,0.08);
          height: 100vh;
          box-sizing: border-box;
          overflow: hidden;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        .bento-texture {
          position: absolute;
          inset: 0;
          background-image: url(/texture.jpg);
          background-size: cover;
          background-position: center;
          opacity: 0.35;
          z-index: 0;
          pointer-events: none;
        }

        .bento-row, .bento-right-col {
          position: relative;
          z-index: 1;
        }

        .bento-row {
          display: grid;
          gap: 12px;
        }

        .bento-row-1 {
          grid-template-columns: 1fr 1fr;
          flex: 1;
        }

        .bento-row-2 {
          grid-template-columns: 1fr 1.2fr 0.9fr;
          flex: 1;
        }

        .bento-cell {
          border-radius: 8px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow:
            0 1px 2px rgba(26,26,26,0.04),
            0 4px 16px rgba(26,26,26,0.05),
            inset 0 1px 0 rgba(255,255,255,0.9);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }

        .bento-cell:hover {
          box-shadow:
            0 2px 4px rgba(26,26,26,0.06),
            0 8px 28px rgba(26,26,26,0.09),
            inset 0 1px 0 rgba(255,255,255,0.9);
          transform: translateY(-1px);
        }

        .bento-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #111111;
          opacity: 0.6;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }

        .bento-title {
          font-family: var(--font-serif);
          font-size: clamp(18px, 1.8vw, 24px);
          font-weight: 400;
          color: #111111;
          opacity: 0.9;
          margin: 0;
          line-height: 1.2;
        }

        .bento-divider {
          width: 24px;
          height: 0.5px;
          background: rgba(17,17,17,0.25);
          margin: 16px 0;
        }

        .bento-body {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #111111;
          opacity: 0.6;
          line-height: 1.7;
          letter-spacing: 0.02em;
          margin: 0;
        }

        .bento-chip {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 3px;
          border: 0.5px solid rgba(26,26,26,0.12);
          background: rgba(26,26,26,0.03);
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.08em;
          color: #1a1a1a;
          opacity: 0.5;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .bento-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: auto;
          padding-top: 16px;
        }

        .bento-right-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bento-right-col .bento-cell { flex: 1; }

        .bento-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #111111;
          opacity: 0.65;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .bento-action:hover { opacity: 0.85; }

        /* Projects carousel cell */
        .projects-cell {
          padding: 0;
          cursor: none;
          display: flex;
          flex-direction: column;
        }

        .projects-cell-header {
          padding: 20px 24px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          border-bottom: 0.5px solid rgba(26,26,26,0.06);
        }

        .carousel-track {
          display: flex;
          overflow-x: hidden;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          flex: 1;
          -ms-overflow-style: none;
        }
        .carousel-track::-webkit-scrollbar { display: none; }

        .carousel-card {
          flex-shrink: 0;
          width: 100%;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 24px;
          position: relative;
          overflow: hidden;
          background: transparent;
        }

        .carousel-card-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 100%);
        }

        .carousel-card-number {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 400;
          color: rgba(26,26,26,0.18);
          position: absolute;
          top: 20px;
          right: 24px;
          line-height: 1;
          letter-spacing: 0.08em;
        }

        .carousel-card-top { position: relative; }
        .carousel-card-bottom { position: relative; }

        .carousel-card-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0 0 8px 0;
        }

        .carousel-card-title {
          font-family: var(--font-serif);
          font-size: clamp(18px, 1.8vw, 24px);
          font-weight: 400;
          color: #1a1a1a;
          margin: 0 0 10px 0;
          line-height: 1.15;
          max-width: 85%;
        }

        .carousel-card-summary {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #1a1a1a;
          opacity: 0.45;
          line-height: 1.6;
          margin: 0;
        }

        .carousel-dots {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .carousel-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(26,26,26,0.15);
          border: none;
          padding: 0;
          cursor: none;
          transition: background 0.3s, transform 0.3s;
        }

        .carousel-dot.active {
          background: rgba(26,26,26,0.55);
          transform: scale(1.3);
        }

        .expand-hint {
          padding: 10px 24px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 0.5px solid rgba(26,26,26,0.06);
          flex-shrink: 0;
        }

        .expand-btn {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          background: none;
          border: none;
          cursor: none;
          padding: 0;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .expand-btn:hover { opacity: 0.7; }

        @media (max-width: 768px) {
          .bento-row-1, .bento-row-2 {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .bento-cell { min-height: 180px; }
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .bento-row-2 { grid-template-columns: 1fr 1fr; }
          .bento-right-col {
            grid-column: 1 / -1;
            flex-direction: row;
          }
        }
      `}</style>

      <section className="bento" id="bento-section">
        <div className="bento-texture" />

        {/* Row 1: Projects + Experience */}
        <div className="bento-row bento-row-1">

          {/* Projects — Netflix auto-scroll carousel */}
          <div
            ref={projectsCardRef}
            className="bento-cell projects-cell"
            onClick={() => setOverlayOpen(true)}
            onMouseEnter={() => { isPaused.current = true }}
            onMouseLeave={() => { isPaused.current = false }}
          >
            <div className="projects-cell-header">
              <p className="bento-label" style={{ margin: 0 }}>Projects</p>
              <div className="carousel-dots" onClick={e => e.stopPropagation()}>
                {FEATURED.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${activeCard === i ? 'active' : ''}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </div>

            <div className="carousel-track" ref={carouselRef}>
              {FEATURED.map((p, i) => (
                <div key={p.id} className="carousel-card">
                  <div className="carousel-card-bg" />
                  <span className="carousel-card-number">0{i + 1}</span>
                  <div className="carousel-card-top">
                    <p className="carousel-card-tag">{p.tag}</p>
                    <p className="carousel-card-title">{p.title}</p>
                  </div>
                  <div className="carousel-card-bottom">
                    <p className="carousel-card-summary">{p.summary}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="expand-hint" onClick={e => e.stopPropagation()}>
              <button className="expand-btn" onClick={() => setOverlayOpen(true)}>
                View all projects →
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a', opacity: 0.4 }}>
                5 projects
              </span>
            </div>
          </div>

          {/* Experience */}
          <div id="experience-card" ref={expCardRef} className="bento-cell" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ padding: '20px 24px 12px', borderBottom: '0.5px solid rgba(26,26,26,0.06)', flexShrink: 0 }}>
              <p className="bento-label" style={{ margin: 0 }}>Experience</p>
            </div>

            {/* Two-column body */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'transparent' }}>

              {/* Left col — stacked: current + stats */}
              <div style={{ display: 'flex', flexDirection: 'column', borderRight: '0.5px solid rgba(26,26,26,0.08)' }}>

                {/* Current */}
                <div style={{ flex: 1, padding: '16px 18px', background: 'transparent' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.35, margin: '0 0 8px 0' }}>Current</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(13px, 1.2vw, 15px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.4, margin: 0 }}>
                    Pursuing MS in Data Science<br />@ Northeastern University,<br />Boston MA
                  </p>
                </div>

                {/* Stats */}
                <div style={{ flexShrink: 0, padding: '14px 18px', borderTop: '0.5px solid rgba(26,26,26,0.08)', background: 'transparent' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                    {[
                      { value: '3', unit: 'yrs', label: 'Work exp' },
                      { value: '2', unit: 'roles', label: 'Analyst → Senior' },
                      { value: 'CX', unit: '', label: 'Domain' },
                    ].map(stat => (
                      <div key={stat.label}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', lineHeight: 1 }}>
                          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1 }}>
                            {stat.value}
                          </span>
                          {stat.unit && (
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#1a1a1a', opacity: 0.35, letterSpacing: '0.08em' }}>
                              {stat.unit}
                            </span>
                          )}
                        </div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.3, margin: '4px 0 0 0', lineHeight: 1 }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right col — latest work ex */}
              <div style={{ padding: '16px 18px', background: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.35, margin: '0 0 10px 0' }}>Latest Work Ex</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(13px, 1.2vw, 15px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.4, margin: '0 0 4px 0' }}>
                    CX Business Analyst
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#1a1a1a', opacity: 0.45, margin: '0 0 14px 0' }}>
                    @ {LATEST_ROLE.company}
                  </p>
                </div>
                <div>
                  {['Led CX analytics across 3 product lines', 'Built NLP tagging pipeline reducing manual effort by 60%'].map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a', opacity: 0.25, marginTop: '2px', flexShrink: 0 }}>—</span>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a', opacity: 0.45, lineHeight: 1.5, margin: 0 }}>{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div style={{ padding: '10px 24px 14px', borderTop: '0.5px solid rgba(26,26,26,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <button
                onClick={() => setExpOpen(true)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.6, background: 'none', border: 'none', cursor: 'none', padding: 0, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
              >
                Check full exp timeline →
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a', opacity: 0.2 }}>2 roles</span>
            </div>

          </div>

        </div>

        {/* Row 2 */}
        <div className="bento-row bento-row-2">

          {/* Recent Activity */}
          <div className="bento-cell" style={{ padding: 0, display: 'flex', flexDirection: 'column', cursor: 'none' }}>

            {/* Header */}
            <div style={{ padding: '16px 18px 12px', borderBottom: '0.5px solid rgba(26,26,26,0.06)', flexShrink: 0 }}>
              <p className="bento-label" style={{ margin: 0 }}>Recent Activity</p>
            </div>

            {/* Feed preview — latest 2 items */}
            <div style={{ flex: 1, overflow: 'hidden', padding: '4px 0' }}>
              {ACTIVITIES.slice(0, 2).map((item, i) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '10px',
                  padding: '10px 18px',
                  borderBottom: i === 0 ? '0.5px solid rgba(26,26,26,0.05)' : 'none',
                }}>
                  {/* Platform icon */}
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '0.5px solid rgba(26,26,26,0.1)',
                    background: 'rgba(255,255,255,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    color: PLATFORM_COLORS[item.platform],
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    {PLATFORM_ICONS[item.platform]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#1a1a1a',
                      margin: '0 0 3px 0',
                      lineHeight: 1.3,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    } as React.CSSProperties}>
                      {item.title}
                    </p>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.25 }}>
                        {item.platform}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#1a1a1a', opacity: 0.18 }}>· {item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: '10px 18px 14px', borderTop: '0.5px solid rgba(26,26,26,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <button
                onClick={() => setActivityOpen(true)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.6, background: 'none', border: 'none', cursor: 'none', padding: 0, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
              >
                View all activity →
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a', opacity: 0.4 }}>
                {ACTIVITIES.length} posts
              </span>
            </div>

          </div>

          {/* Thoughts scroll */}
          <div className="bento-cell" style={{ padding: 0, display: 'flex', flexDirection: 'column', cursor: 'none' }}>

            <div style={{ padding: '16px 18px 12px', borderBottom: '0.5px solid rgba(26,26,26,0.06)', flexShrink: 0 }}>
              <p className="bento-label" style={{ margin: 0 }}>Thoughts</p>
            </div>

            <div style={{ flex: 1, overflow: 'hidden', padding: '6px 0' }}>
              {THOUGHTS.slice(0, 3).map((t, i) => (
                <div key={t.id} style={{
                  padding: '8px 18px',
                  borderBottom: i < 2 ? '0.5px solid rgba(26,26,26,0.04)' : 'none',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '12px',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: '#1a1a1a',
                    opacity: 0.65,
                    lineHeight: 1.4,
                    margin: '0 0 4px 0',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  } as React.CSSProperties}>
                    "{t.hook}"
                  </p>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {t.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.25 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '10px 18px 14px', borderTop: '0.5px solid rgba(26,26,26,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <button
                onClick={() => setThoughtsOpen(true)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.6, background: 'none', border: 'none', cursor: 'none', padding: 0, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
              >
                Read all thoughts →
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#1a1a1a', opacity: 0.4 }}>
                {THOUGHTS.length} thoughts
              </span>
            </div>

          </div>

          <div className="bento-right-col">
            <div ref={contactCardRef} className="bento-cell" style={{ justifyContent: 'space-between', padding: '16px 18px' }}>
              <div>
                <p className="bento-label">Contact</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 400, color: '#1a1a1a', margin: 0, lineHeight: 1.2 }}>Let's talk</p>
                <div className="bento-divider" style={{ margin: '8px 0' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                {/* Email */}
                <a href={`mailto:${PROFILE.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                >
                  <div style={{ width: '22px', height: '22px', borderRadius: '5px', border: '0.5px solid rgba(26,26,26,0.15)', background: 'rgba(26,26,26,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="11" height="8" viewBox="0 0 13 10" fill="none">
                      <rect x="0.5" y="0.5" width="12" height="9" rx="1.5" stroke="#1a1a1a" strokeOpacity="0.6"/>
                      <path d="M1 1.5L6.5 5.5L12 1.5" stroke="#1a1a1a" strokeOpacity="0.6" strokeWidth="0.8"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.03em', color: '#1a1a1a' }}>
                    {PROFILE.email}
                  </span>
                </a>

                {/* LinkedIn */}
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                >
                  <div style={{ width: '22px', height: '22px', borderRadius: '5px', border: '0.5px solid rgba(10,102,194,0.3)', background: 'rgba(10,102,194,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(10,102,194,0.8)">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.03em', color: 'rgba(10,102,194,0.8)' }}>
                    {PROFILE.linkedinHandle}
                  </span>
                </a>

              </div>
            </div>
            <div className="bento-cell" style={{ justifyContent: 'space-between', padding: '16px 18px' }}>
              <div>
                <p className="bento-label">Resume</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 400, color: '#1a1a1a', margin: 0, lineHeight: 1.2 }}>My Resume</p>
                <div className="bento-divider" style={{ margin: '8px 0' }} />
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#1a1a1a', opacity: 0.35, lineHeight: 1.6, margin: 0 }}>
                  {PROFILE.role} · CX Analytics · MS Data Science
                </p>
              </div>
              <a
                href={PROFILE.resume}
                download="Sruthilaya_Resume.pdf"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.4, textDecoration: 'none', transition: 'opacity 0.2s', marginTop: 'auto' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
              >
                Download PDF ↓
              </a>
            </div>
          </div>

        </div>
      </section>

      <ProjectsOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />
      <ExperienceOverlay open={expOpen} onClose={() => setExpOpen(false)} />
      <ActivityOverlay open={activityOpen} onClose={() => setActivityOpen(false)} />
      <ThoughtsOverlay open={thoughtsOpen} onClose={() => setThoughtsOpen(false)} />
    </>
  )
}
