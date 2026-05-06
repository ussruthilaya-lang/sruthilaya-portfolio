'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PROFILE } from '@/content/profile'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <style>{`
        .nav-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 32px;
        }

        .nav-logo {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          color: #1a1a1a;
          opacity: 1;
          text-decoration: none;
          text-transform: uppercase;
        }

        .nav-status {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: #1a1a1a;
          opacity: 0.9;
          text-transform: uppercase;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: none;
          padding: 0;
          z-index: 200;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 1px;
          background: #1a1a1a;
          transition: opacity 0.2s;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-status { display: none; }
          .hamburger { display: flex; }

          .mobile-menu {
            display: ${open ? 'flex' : 'none'};
            position: fixed;
            inset: 0;
            background: rgba(244,244,240,0.97);
            z-index: 150;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 40px;
          }
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .nav-logo { font-size: 8px; }
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
      }}>

        <Link href="/" className="nav-logo">
          {PROFILE.fullName}
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links">
          {[
            { label: 'Projects',   action: () => {
                const main = document.querySelector('main')
                const bento = document.getElementById('bento-section')
                if (main && bento) main.scrollTo({ top: bento.offsetTop, behavior: 'smooth' })
                setTimeout(() => window.dispatchEvent(new CustomEvent('highlight-projects')), 600)
            }},
            { label: 'Experience', action: () => {
                const main = document.querySelector('main')
                const bento = document.getElementById('bento-section')
                if (main && bento) main.scrollTo({ top: bento.offsetTop, behavior: 'smooth' })
                setTimeout(() => window.dispatchEvent(new CustomEvent('highlight-experience')), 600)
            }},
            { label: 'Contact',    action: () => {
                const main = document.querySelector('main')
                const bento = document.getElementById('bento-section')
                if (main && bento) main.scrollTo({ top: bento.offsetTop, behavior: 'smooth' })
                setTimeout(() => window.dispatchEvent(new CustomEvent('highlight-contact')), 600)
            }},
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.14em',
                color: '#1a1a1a',
                opacity: 1,
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s',
                background: 'none',
                border: 'none',
                cursor: 'none',
                padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop status */}
        <div className="nav-status">
          <span style={{
            width: '5px', height: '5px',
            borderRadius: '50%',
            background: '#4ade80',
            display: 'inline-block',
            animation: 'pulse 2.5s ease-in-out infinite',
          }} />
          Available
        </div>

        {/* Mobile hamburger */}
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span style={{ opacity: open ? 0.4 : 1 }} />
          <span />
          <span style={{ opacity: open ? 0.4 : 1 }} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className="mobile-menu">
        {[
          { label: 'Work',       href: '#work' },
          { label: 'Experience', href: '#experience-card' },
          { label: 'Contact',    href: '#contact' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '20px',
              letterSpacing: '0.2em',
              color: '#1a1a1a',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </Link>
        ))}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: '#1a1a1a',
          opacity: 0.4,
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          Available
        </span>
      </div>
    </>
  )
}
