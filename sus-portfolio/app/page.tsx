import Nav from '@/components/Nav'
import HeroPhoto from '@/components/HeroPhoto'
import BentoSection from '@/components/BentoSection'
import { PROFILE } from '@/content/profile'

export default function Home() {
  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background: #ffffff;
          contain: layout paint;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        .texture-overlay {
          position: absolute;
          inset: 0;
          background-image: url(/texture.jpg);
          background-size: cover;
          background-position: center;
          opacity: 0.35;
          z-index: 0;
          pointer-events: none;
        }

        /* Desktop: absolute positioned column */
        .content-column {
          position: absolute;
          top: 22vh;
          left: 18vw;
          z-index: 3;
          max-width: 34vw;
        }

        .photo-wrapper {
          display: contents;
        }

        .scroll-signal {
          position: absolute;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          overflow: hidden;
          padding-bottom: 8px;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .content-column {
            left: 8vw;
            max-width: 50vw;
            top: 18vh;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-section {
            min-height: 100svh;
            overflow: visible;
            display: flex;
            flex-direction: column;
          }

          .content-column {
            position: relative;
            top: auto;
            left: auto;
            max-width: 100%;
            padding: 100px 6vw 32px;
            z-index: 3;
          }

          .scroll-signal {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            margin: 0 auto 32px;
          }
        }
      `}</style>

      <Nav />
      <main style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>
        <div className="hero-section" style={{ isolation: 'isolate' }}>

          <div className="texture-overlay" />

          {/* LEFT CONTENT COLUMN */}
          <div className="content-column">

            {/* 1. Greeting label + name */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              letterSpacing: '0.18em',
              fontWeight: 400,
              color: '#1a1a1a',
              opacity: 0.7,
              textTransform: 'uppercase',
              margin: '0 0 8px 0',
            }}>
              Hey hi, I'm
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontStyle: 'normal',
              fontWeight: 400,
              color: '#1a1a1a',
              lineHeight: 1.05,
              margin: '0 0 16px 0',
            }}>{PROFILE.name}</h1>

            {/* Role */}
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(18px, 2.2vw, 30px)',
              fontStyle: 'normal',
              fontWeight: 400,
              color: '#1a1a1a',
              lineHeight: 1.05,
              margin: '0 0 20px 0',
            }}>{PROFILE.role}</p>

            {/* Divider */}
            <hr style={{
              border: 'none',
              borderTop: '0.5px solid rgba(26,26,26,0.1)',
              margin: '0 0 22px 0',
            }} />

            {/* Tagline */}
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(13px, 1.1vw, 14px)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#1a1a1a',
              opacity: 0.55,
              lineHeight: 1.9,
              letterSpacing: '0.02em',
              margin: '0 0 32px 0',
            }}>
              {PROFILE.tagline}
            </p>

            {/* Current focus */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 500,
              color: '#1a1a1a',
              opacity: 0.85,
              letterSpacing: '0.06em',
              margin: '0 0 6px 0',
            }}>
              Current focus
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#1a1a1a',
              opacity: 0.85,
              lineHeight: 1.6,
              letterSpacing: '0.02em',
              margin: '0 0 28px 0',
            }}>
              {PROFILE.focus}
            </p>

            {/* Tech stack chips */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#1a1a1a',
              opacity: 0.65,
              textTransform: 'uppercase',
              margin: '0 0 10px 0',
            }}>
              Tech Stack
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '16px',
              maxWidth: '340px',
            }}>
              {[
                { label: 'Python',    primary: true  },
                { label: 'PyTorch',   primary: true  },
                { label: 'LangChain', primary: true  },
                { label: 'RAG',       primary: true  },
                { label: 'Next.js',   primary: false },
                { label: 'FastAPI',   primary: false },
                { label: 'NLP',       primary: false },
                { label: 'Agents',    primary: false },
              ].map(({ label, primary }) => (
                <span key={label} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: primary ? '0.5px solid rgba(59,130,246,0.5)' : '0.5px solid rgba(26,26,26,0.18)',
                  background: primary ? 'rgba(59,130,246,0.06)' : 'rgba(26,26,26,0.03)',
                  color: primary ? 'rgba(37,99,235,0.85)' : 'rgba(26,26,26,0.55)',
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              ))}
            </div>

            {/* Bottom meta row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: '#1a1a1a',
                opacity: 0.75,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  display: 'inline-block',
                }} />
                Open to work
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: '#1a1a1a',
                opacity: 0.5,
                textTransform: 'uppercase',
              }}>
                Boston, MA
              </span>
            </div>

          </div>

          {/* Scroll signal */}
          <div className="scroll-signal">
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.16em',
              color: '#1a1a1a',
              opacity: 0.6,
              textTransform: 'uppercase',
            }}>
              scroll
            </span>
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" style={{ opacity: 0.6, animation: 'arrowDrop 1.6s ease-in-out infinite' }}>
              <line x1="6" y1="0" x2="6" y2="12" stroke="#1a1a1a" strokeWidth="1"/>
              <polyline points="2,8 6,13 10,8" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
            </svg>
          </div>

          <HeroPhoto />
        </div>

        <BentoSection />
      </main>
    </>
  )
}
