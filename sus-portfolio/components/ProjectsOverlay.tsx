'use client'

import { useState, useEffect } from 'react'

import type { Project } from '@/content/projects'
import { PROJECTS } from '@/content/projects'
export type { Project } from '@/content/projects'
export { PROJECTS }
export const FEATURED = PROJECTS.slice(0, 3)

interface Props {
  open: boolean
  onClose: () => void
}

export default function ProjectsOverlay({ open, onClose }: Props) {
  const [selected, setSelected] = useState<Project>(PROJECTS[0])

  useBodyScrollLock(open)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  return (
    <>
      <style>{`
        .overlay-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: #ffffff;
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          animation: overlayIn 0.3s ease;
        }

        @keyframes overlayIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .overlay-header, .overlay-body, .overlay-list, .overlay-detail {
          position: relative;
          z-index: 1;
        }

        .overlay-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 40px;
          border-bottom: 0.5px solid rgba(26,26,26,0.08);
        }

        .overlay-back {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.5;
          background: none;
          border: none;
          cursor: none;
          transition: opacity 0.2s;
          padding: 0;
        }
        .overlay-back:hover { opacity: 1; }

        .overlay-title {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0;
        }

        .overlay-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* Left — project list */
        .overlay-list {
          width: 280px;
          flex-shrink: 0;
          border-right: 0.5px solid rgba(26,26,26,0.08);
          overflow-y: auto;
          padding: 16px 0;
        }

        .overlay-list-item {
          padding: 16px 32px;
          cursor: none;
          border-left: 2px solid transparent;
          transition: background 0.15s, border-color 0.15s;
        }

        .overlay-list-item:hover {
          background: rgba(26,26,26,0.03);
        }

        .overlay-list-item.active {
          border-left-color: #1a1a1a;
          background: rgba(26,26,26,0.04);
        }

        .list-item-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0 0 4px 0;
        }

        .list-item-title {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 400;
          color: #1a1a1a;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        .list-item-year {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #1a1a1a;
          opacity: 0.25;
          margin: 0;
        }

        /* Right — project detail */
        .overlay-detail {
          flex: 1;
          overflow-y: auto;
          padding: 48px 56px;
        }

        .detail-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0 0 16px 0;
        }

        .detail-title {
          font-family: var(--font-serif);
          font-size: clamp(28px, 3vw, 44px);
          font-weight: 400;
          color: #1a1a1a;
          margin: 0 0 24px 0;
          line-height: 1.1;
        }

        .detail-divider {
          width: 32px;
          height: 0.5px;
          background: rgba(26,26,26,0.2);
          margin: 0 0 28px 0;
        }

        .detail-summary {
          font-family: var(--font-serif);
          font-size: 16px;
          font-style: italic;
          color: #1a1a1a;
          opacity: 0.6;
          line-height: 1.7;
          margin: 0 0 32px 0;
          max-width: 560px;
        }

        .detail-body {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #1a1a1a;
          opacity: 0.7;
          line-height: 1.8;
          max-width: 560px;
          margin: 0 0 40px 0;
        }

        .detail-stack-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0 0 10px 0;
        }

        .detail-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .detail-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          padding: 3px 10px;
          border-radius: 4px;
          border: 0.5px solid rgba(59,130,246,0.4);
          background: rgba(59,130,246,0.05);
          color: rgba(37,99,235,0.8);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .overlay-body { flex-direction: column; }
          .overlay-list { width: 100%; height: 200px; border-right: none; border-bottom: 0.5px solid rgba(26,26,26,0.08); }
          .overlay-detail { padding: 24px; }
        }
      `}</style>

      <div className="overlay-backdrop">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(/texture.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35, zIndex: 0, pointerEvents: 'none' }} />

        {/* Header */}
        <div className="overlay-header">
          <button className="overlay-back" onClick={onClose}>
            ← Back
          </button>
          <p className="overlay-title">Projects</p>
          <div style={{ width: 60 }} />
        </div>

        <div className="overlay-body">

          {/* Left list */}
          <div className="overlay-list">
            {PROJECTS.map(p => (
              <div
                key={p.id}
                className={`overlay-list-item ${selected.id === p.id ? 'active' : ''}`}
                onClick={() => setSelected(p)}
              >
                <p className="list-item-tag">{p.tag}</p>
                <p className="list-item-title">{p.title}</p>
                <p className="list-item-year">{p.year}</p>
              </div>
            ))}
          </div>

          {/* Right detail */}
          <div className="overlay-detail">
            <p className="detail-tag">{selected.tag} · {selected.year}</p>
            <h2 className="detail-title">{selected.title}</h2>
            <div className="detail-divider" />
            <p className="detail-summary">{selected.summary}</p>
            <p className="detail-body">{selected.description}</p>
            <p className="detail-stack-label">Stack</p>
            <div className="detail-chips">
              {selected.stack.map(s => (
                <span key={s} className="detail-chip">{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
