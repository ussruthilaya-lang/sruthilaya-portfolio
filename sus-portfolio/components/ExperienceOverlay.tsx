'use client'

import { useEffect, useState } from 'react'
import { useBodyScrollLock } from '@/lib/useBodyScrollLock'

import type { Role } from '@/content/experience'
import { TIMELINE } from '@/content/experience'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ExperienceOverlay({ open, onClose }: Props) {
  const [selected, setSelected] = useState<Role>(TIMELINE[TIMELINE.length - 1])

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
        .exp-overlay > *:not(:first-child) {
          position: relative;
          z-index: 1;
        }

        .exp-overlay {
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

        .exp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 40px;
          border-bottom: 0.5px solid rgba(26,26,26,0.08);
          flex-shrink: 0;
        }

        .exp-back {
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
        .exp-back:hover { opacity: 1; }

        .exp-header-title {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0;
        }

        /* Timeline strip */
        .timeline-strip {
          flex-shrink: 0;
          padding: 40px 60px 32px;
          position: relative;
          border-bottom: 0.5px solid rgba(26,26,26,0.07);
        }

        .timeline-line {
          position: absolute;
          top: 62px;
          left: 60px;
          right: 60px;
          height: 1px;
          background: rgba(26,26,26,0.12);
        }

        .timeline-nodes {
          display: flex;
          justify-content: flex-start;
          gap: 0;
          position: relative;
        }

        .timeline-node {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          cursor: none;
          position: relative;
          padding-right: 120px;
        }

        .timeline-node:last-child {
          padding-right: 0;
        }

        .timeline-dot-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 14px;
        }

        .timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1.5px solid rgba(26,26,26,0.25);
          background: #f4f4f0;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          z-index: 1;
        }

        .timeline-node.active .timeline-dot {
          background: #1a1a1a;
          border-color: #1a1a1a;
        }

        .timeline-node:hover .timeline-dot {
          border-color: #1a1a1a;
        }

        .timeline-node-period {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #1a1a1a;
          opacity: 0.3;
          margin: 0 0 4px 0;
          text-transform: uppercase;
        }

        .timeline-node-title {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 400;
          color: #1a1a1a;
          margin: 0 0 2px 0;
        }

        .timeline-node-company {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #1a1a1a;
          opacity: 0.4;
          margin: 0 0 2px 0;
        }

        .timeline-node-duration {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #1a1a1a;
          opacity: 0.25;
          margin: 0;
          letter-spacing: 0.08em;
        }

        /* Detail panel */
        .exp-detail {
          flex: 1;
          overflow-y: auto;
          padding: 44px 60px;
          display: flex;
          gap: 60px;
        }

        .exp-detail-main {
          flex: 1;
          max-width: 560px;
        }

        .exp-detail-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0 0 14px 0;
        }

        .exp-detail-title {
          font-family: var(--font-serif);
          font-size: clamp(24px, 2.5vw, 36px);
          font-weight: 400;
          color: #1a1a1a;
          margin: 0 0 6px 0;
          line-height: 1.1;
        }

        .exp-detail-company {
          font-family: var(--font-serif);
          font-size: 16px;
          font-style: italic;
          color: #1a1a1a;
          opacity: 0.45;
          margin: 0 0 24px 0;
        }

        .exp-detail-divider {
          width: 32px;
          height: 0.5px;
          background: rgba(26,26,26,0.15);
          margin: 0 0 24px 0;
        }

        .exp-detail-body {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #1a1a1a;
          opacity: 0.65;
          line-height: 1.8;
          margin: 0 0 32px 0;
        }

        .exp-highlights-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0 0 14px 0;
        }

        .exp-highlight-item {
          display: flex;
          gap: 12px;
          margin-bottom: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: #1a1a1a;
          opacity: 0.6;
          line-height: 1.6;
        }

        .exp-highlight-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(26,26,26,0.3);
          flex-shrink: 0;
          margin-top: 7px;
        }

        /* Side meta */
        .exp-detail-meta {
          width: 200px;
          flex-shrink: 0;
          padding-top: 4px;
        }

        .exp-meta-block {
          margin-bottom: 28px;
        }

        .exp-meta-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.3;
          margin: 0 0 6px 0;
        }

        .exp-meta-value {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #1a1a1a;
          opacity: 0.7;
          margin: 0;
          line-height: 1.5;
        }

        .exp-skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .exp-skill-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          padding: 3px 8px;
          border-radius: 4px;
          border: 0.5px solid rgba(26,26,26,0.14);
          background: rgba(26,26,26,0.03);
          color: rgba(26,26,26,0.55);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .timeline-strip { padding: 28px 24px; }
          .timeline-line { left: 24px; right: 24px; top: 50px; }
          .timeline-node { padding-right: 60px; }
          .exp-detail { flex-direction: column; padding: 24px; gap: 32px; }
          .exp-detail-meta { width: 100%; }
          .exp-header { padding: 20px 24px; }
        }
      `}</style>

      <div className="exp-overlay">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(/texture.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35, zIndex: 0, pointerEvents: 'none' }} />

        {/* Header */}
        <div className="exp-header">
          <button className="exp-back" onClick={onClose}>← Back</button>
          <p className="exp-header-title">Experience</p>
          <div style={{ width: 60 }} />
        </div>

        {/* Horizontal timeline */}
        <div className="timeline-strip">
          <div className="timeline-line" />
          <div className="timeline-nodes">
            {TIMELINE.map(role => (
              <div
                key={role.id}
                className={`timeline-node ${selected.id === role.id ? 'active' : ''}`}
                onClick={() => setSelected(role)}
              >
                <div className="timeline-dot-wrap">
                  <div className="timeline-dot" />
                </div>
                <p className="timeline-node-period">{role.period}</p>
                <p className="timeline-node-title">{role.title}</p>
                <p className="timeline-node-company">{role.company}</p>
                <p className="timeline-node-duration">{role.duration} · {role.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="exp-detail">
          <div className="exp-detail-main">
            <p className="exp-detail-tag">{selected.domain} · {selected.period}</p>
            <h2 className="exp-detail-title">{selected.title}</h2>
            <p className="exp-detail-company">{selected.company}</p>
            <div className="exp-detail-divider" />
            <p className="exp-detail-body">{selected.description}</p>

            <p className="exp-highlights-label">Highlights</p>
            {selected.highlights.map((h, i) => (
              <div key={i} className="exp-highlight-item">
                <span className="exp-highlight-dot" />
                {h}
              </div>
            ))}
          </div>

          <div className="exp-detail-meta">
            <div className="exp-meta-block">
              <p className="exp-meta-label">Duration</p>
              <p className="exp-meta-value">{selected.duration}</p>
            </div>
            <div className="exp-meta-block">
              <p className="exp-meta-label">Location</p>
              <p className="exp-meta-value">{selected.location}</p>
            </div>
            <div className="exp-meta-block">
              <p className="exp-meta-label">Domain</p>
              <p className="exp-meta-value">{selected.domain}</p>
            </div>
            <div className="exp-meta-block">
              <p className="exp-meta-label">Skills</p>
              <div className="exp-skill-chips">
                {selected.skills.map(s => (
                  <span key={s} className="exp-skill-chip">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
