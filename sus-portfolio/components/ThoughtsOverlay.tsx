'use client'

import { useEffect, useState } from 'react'
import { useBodyScrollLock } from '@/lib/useBodyScrollLock'

import type { ThoughtTag } from '@/content/thoughts'
import { THOUGHTS, TAG_COLORS } from '@/content/thoughts'
export type { ThoughtTag, Thought } from '@/content/thoughts'
export { THOUGHTS }

const ALL_TAGS = Object.keys(TAG_COLORS) as ThoughtTag[]

interface Props {
  open: boolean
  onClose: () => void
}

export default function ThoughtsOverlay({ open, onClose }: Props) {
  const [activeTag, setActiveTag] = useState<ThoughtTag | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = activeTag ? THOUGHTS.filter(t => t.tags.includes(activeTag)) : THOUGHTS

  useBodyScrollLock(open)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (expanded !== null) setExpanded(null)
        else onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, expanded])

  if (!open) return null

  return (
    <>
      <style>{`
        .thoughts-overlay > *:not(:first-child) {
          position: relative;
          z-index: 1;
        }

        .thoughts-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          animation: overlayIn 0.3s ease;
        }

        @keyframes overlayIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .thoughts-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 40px;
          border-bottom: 0.5px solid rgba(26,26,26,0.08);
          flex-shrink: 0;
        }

        .thoughts-back {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.5;
          background: none;
          border: none;
          cursor: none;
          padding: 0;
          transition: opacity 0.2s;
        }
        .thoughts-back:hover { opacity: 1; }

        .thoughts-header-title {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0;
        }

        .thoughts-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 40px;
          border-bottom: 0.5px solid rgba(26,26,26,0.06);
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .filter-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.3;
          margin-right: 4px;
        }

        .t-filter-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 4px;
          border: 0.5px solid rgba(26,26,26,0.15);
          background: transparent;
          color: rgba(26,26,26,0.5);
          cursor: none;
          transition: all 0.15s;
          text-transform: uppercase;
        }
        .t-filter-chip:hover { border-color: rgba(26,26,26,0.35); color: rgba(26,26,26,0.8); }
        .t-filter-chip.active { border-color: rgba(26,26,26,0.6); background: rgba(26,26,26,0.06); color: rgba(26,26,26,0.85); }

        .thoughts-feed {
          flex: 1;
          overflow-y: auto;
          padding: 8px 40px 48px;
          max-width: 680px;
          width: 100%;
          margin: 0 auto;
        }

        .thought-card {
          padding: 24px 0;
          border-bottom: 0.5px solid rgba(26,26,26,0.06);
          cursor: none;
          transition: opacity 0.15s;
        }
        .thought-card:last-child { border-bottom: none; }
        .thought-card:hover .thought-hook { opacity: 0.85; }

        .thought-hook {
          font-family: var(--font-serif);
          font-size: clamp(17px, 1.8vw, 22px);
          font-weight: 400;
          font-style: italic;
          color: #1a1a1a;
          opacity: 0.75;
          line-height: 1.35;
          margin: 0 0 12px 0;
          transition: opacity 0.15s;
        }

        .thought-rant {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #1a1a1a;
          opacity: 0.5;
          line-height: 1.75;
          margin: 0 0 14px 0;
          max-width: 540px;
        }

        .thought-image {
          width: 100%;
          max-height: 260px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 14px;
          opacity: 0.85;
        }

        .thought-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .thought-date {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #1a1a1a;
          opacity: 0.2;
          letter-spacing: 0.08em;
        }

        .thought-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          padding: 2px 7px;
          border-radius: 3px;
          border: 0.5px solid;
          text-transform: uppercase;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .thoughts-header, .thoughts-filters, .thoughts-feed { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>

      <div className="thoughts-overlay">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(/texture.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35, zIndex: 0, pointerEvents: 'none' }} />

        <div className="thoughts-header">
          <button className="thoughts-back" onClick={onClose}>← Back</button>
          <p className="thoughts-header-title">Thoughts</p>
          <div style={{ width: 60 }} />
        </div>

        <div className="thoughts-filters">
          <span className="filter-label">Filter</span>
          <button className={`t-filter-chip ${activeTag === null ? 'active' : ''}`} onClick={() => setActiveTag(null)}>All</button>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`t-filter-chip ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="thoughts-feed">
          {filtered.map(thought => (
            <div key={thought.id} className="thought-card">
              <p className="thought-hook">"{thought.hook}"</p>
              {thought.rant && <p className="thought-rant">{thought.rant}</p>}
              {thought.image && <img src={thought.image} alt="" className="thought-image" />}
              <div className="thought-meta">
                <span className="thought-date">{thought.date}</span>
                {thought.tags.map(tag => (
                  <span
                    key={tag}
                    className="thought-tag"
                    style={{ borderColor: TAG_COLORS[tag], color: TAG_COLORS[tag] }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
