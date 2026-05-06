'use client'

import { useEffect, useState } from 'react'
import { useBodyScrollLock } from '@/lib/useBodyScrollLock'

import type { ActivityTag } from '@/content/activity'
import { ACTIVITIES, PLATFORM_ICONS, PLATFORM_COLORS } from '@/content/activity'
export type { Platform, ActivityTag, Activity } from '@/content/activity'
export { ACTIVITIES, PLATFORM_ICONS, PLATFORM_COLORS }

const ALL_TAGS: ActivityTag[] = ['LLM', 'RAG', 'Agents', 'NLP', 'Career', 'Research', 'Building']

interface Props {
  open: boolean
  onClose: () => void
}

export default function ActivityOverlay({ open, onClose }: Props) {
  const [activeTag, setActiveTag] = useState<ActivityTag | null>(null)

  const filtered = activeTag ? ACTIVITIES.filter(a => a.tags.includes(activeTag)) : ACTIVITIES

  useBodyScrollLock(open)

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  return (
    <>
      <style>{`
        .activity-overlay > *:not(:first-child) {
          position: relative;
          z-index: 1;
        }

        .activity-overlay {
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

        .activity-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 40px;
          border-bottom: 0.5px solid rgba(26,26,26,0.08);
          flex-shrink: 0;
        }

        .activity-back {
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
        .activity-back:hover { opacity: 1; }

        .activity-header-title {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.35;
          margin: 0;
        }

        .activity-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 40px;
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

        .filter-chip {
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

        .filter-chip:hover {
          border-color: rgba(26,26,26,0.35);
          color: rgba(26,26,26,0.8);
        }

        .filter-chip.active {
          border-color: rgba(26,26,26,0.6);
          background: rgba(26,26,26,0.06);
          color: rgba(26,26,26,0.85);
        }

        .activity-feed {
          flex: 1;
          overflow-y: auto;
          padding: 12px 40px 40px;
          max-width: 720px;
          width: 100%;
          margin: 0 auto;
        }

        .activity-item {
          display: flex;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 0.5px solid rgba(26,26,26,0.06);
          text-decoration: none;
          transition: background 0.15s;
        }

        .activity-item:last-child { border-bottom: none; }

        .activity-platform-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 0.5px solid rgba(26,26,26,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-family: var(--font-mono);
          flex-shrink: 0;
          margin-top: 2px;
          background: rgba(255,255,255,0.6);
        }

        .activity-content { flex: 1; }

        .activity-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .activity-platform-name {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1a1a1a;
          opacity: 0.3;
        }

        .activity-date {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #1a1a1a;
          opacity: 0.2;
        }

        .activity-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 400;
          color: #1a1a1a;
          margin: 0 0 6px 0;
          line-height: 1.3;
        }

        .activity-gist {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #1a1a1a;
          opacity: 0.5;
          line-height: 1.65;
          margin: 0 0 10px 0;
        }

        .activity-tags {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .activity-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          padding: 2px 7px;
          border-radius: 3px;
          border: 0.5px solid rgba(26,26,26,0.1);
          color: rgba(26,26,26,0.4);
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .activity-header, .activity-filters, .activity-feed { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>

      <div className="activity-overlay">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(/texture.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35, zIndex: 0, pointerEvents: 'none' }} />

        <div className="activity-header">
          <button className="activity-back" onClick={onClose}>← Back</button>
          <p className="activity-header-title">Recent Activity</p>
          <div style={{ width: 60 }} />
        </div>

        {/* Tag filters */}
        <div className="activity-filters">
          <span className="filter-label">Filter</span>
          <button
            className={`filter-chip ${activeTag === null ? 'active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`filter-chip ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="activity-feed">
          {filtered.map(item => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="activity-item">
              <div
                className="activity-platform-icon"
                style={{ color: PLATFORM_COLORS[item.platform] }}
              >
                {PLATFORM_ICONS[item.platform]}
              </div>
              <div className="activity-content">
                <div className="activity-meta">
                  <span className="activity-platform-name">{item.platform}</span>
                  <span className="activity-date">· {item.date}</span>
                </div>
                <p className="activity-title">{item.title}</p>
                <p className="activity-gist">{item.gist}</p>
                <div className="activity-tags">
                  {item.tags.map(t => (
                    <span key={t} className="activity-tag">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </>
  )
}
