'use client'

import { useEffect, useState } from 'react'
import { PROFILE } from '@/content/profile'

// Icons appear one per loading stage (8 stages = 8 icons)
const ICONS = [
  { src: '/icons/laptop.png',      label: 'Laptop'      },
  { src: '/icons/terminal.png',    label: 'Terminal'    },
  { src: '/icons/book.png',        label: 'Book'        },
  { src: '/icons/music.png',       label: 'Music'       },
  { src: '/icons/kombucha.png',    label: 'Kombucha'    },
  { src: '/icons/instantramen.png',label: 'Ramen'       },
  { src: '/icons/proteinbar.png',  label: 'Protein Bar' },
  { src: '/icons/cookies.png',     label: 'Cookies'     },
]

const POSITIONS = [
  { top: '7%',  left: '2%'  },
  { top: '11%', left: '62%' },
  { top: '80%', left: '3%'  },
  { top: '84%', left: '60%' },
  { top: '45%', left: '1%'  },
]

const STAGES = [
  {
    pct:      '1%',
    title:    'Big AI Idea 💡',
    subtitle: '"This will revolutionize everything."',
    floats: [
      'AI roadmap: Prompt → Pray → Deploy.',
      'Neural network trained on vibes.',
      'Built with AI (Ctrl+C, Ctrl+V engineering).',
      'confidence: maximum',
      'timeline: optimistic',
    ],
  },
  {
    pct:      '6%',
    title:    'Open Notebook',
    subtitle: 'Confidence maximum.',
    floats: [
      'pip install everything',
      'import torch  # just in case',
      'notebook cells: 247',
      'documentation: 0',
      'ML assistant = autocomplete with confidence.',
    ],
  },
  {
    pct:      '11%',
    title:    'No Data',
    subtitle: '"Minor issue."',
    floats: [
      'Dataset not found. Proceed anyway.',
      'Feature engineering = professional guessing.',
      'rows: 12. columns: 847.',
      'data.csv → data_final_REAL_v3.csv',
      'Suspicious CSV accepted.',
    ],
  },
  {
    pct:      '25%',
    title:    'Data Found 🎉',
    subtitle: 'Finally. Let\'s go.',
    floats: [
      'nulls: 40%. fine.',
      '99% accuracy → majority class wins.',
      'val loss: ↑↑↑',
      'Dataset cleaned → performance drops.',
      'Model drift detected (users changed mind).',
    ],
  },
  {
    pct:      '67%',
    title:    'Of Course… 🚨',
    subtitle: 'Data leakage. Reality collapses.',
    floats: [
      'target column: in features. oops.',
      'Training job failed at epoch 99/100.',
      'GPU OOM → batch size = emotional damage.',
      'ML pipeline = YAML + suffering.',
      'CI/CD = Continuous Investigation / Depression.',
    ],
  },
  {
    pct:      '0%',
    title:    'Existential Reset',
    subtitle: '"Do we even need ML?"',
    floats: [
      'maybe a spreadsheet was fine.',
      'AutoML wins → engineer existential crisis.',
      '"Simple change" → retrain entire pipeline.',
      'Senior MLE skill: reading logs emotionally.',
      'model accuracy depends on moon phase.',
    ],
  },
  {
    pct:      '89%',
    title:    'Sudden Clarity ⚡',
    subtitle: 'Baseline + clean features.',
    floats: [
      'logistic regression: 0.91 F1.',
      'neural net: 0.74 F1.',
      'Real ML job: debugging data, not models.',
      '"Realtime AI" → cron job every 6 hours.',
      'the baseline was right all along.',
    ],
  },
  {
    pct:      '200%',
    title:    'Ship It 🚀',
    subtitle: 'Baseline wins again.',
    floats: [
      'she is real. the portfolio compiled.',
      'sruthilaya has entered the chat.',
      'built with ☕ + spite + clean features.',
      'no models were harmed. some were.',
      'you made it. so did the gradients.',
    ],
  },
]

// Spread 8 stages evenly over 13s, exit at 14s, done at 15s
const STAGE_DELAYS = [500, 2100, 3700, 5300, 6900, 8500, 10100, 11700]
const EXIT_DELAY   = 13500
const DONE_DELAY   = 14500

// Pre-computed constant — 60 steps is smooth enough, far cheaper to paint
const WAVY_PATH = (() => {
  const cx = 100, cy = 100, r = 88, amp = 7, waves = 14, steps = 60
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2
    const radius = r + amp * Math.sin(waves * angle)
    pts.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`)
  }
  return `M ${pts.join(' L ')} Z`
})()

interface Props { onDone: () => void }

export default function LoadingScreen({ onDone }: Props) {
  const [stage, setStage]     = useState(-1)
  const [iconIdx, setIconIdx] = useState(-1)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    STAGE_DELAYS.forEach((delay, i) => {
      timers.push(setTimeout(() => {
        setStage(i)
        setIconIdx(i) // one icon per stage
      }, delay))
    })

    timers.push(setTimeout(() => setExiting(true), EXIT_DELAY))
    timers.push(setTimeout(() => onDone(), DONE_DELAY))

    return () => timers.forEach(clearTimeout)
  }, [onDone])

  const currentPct      = stage >= 0 ? STAGES[stage].pct      : '—'
  const currentTitle    = stage >= 0 ? STAGES[stage].title    : ''
  const currentSubtitle = stage >= 0 ? STAGES[stage].subtitle : ''
  const currentFloats   = stage >= 0 ? STAGES[stage].floats   : []

  return (
    <>
      <style>{`
        .loader-wrap {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.6s ease;
        }
        .loader-wrap.exiting { opacity: 0; pointer-events: none; }

        .loader-texture {
          position: absolute;
          inset: 0;
          background-image: url(/texture.jpg);
          background-size: cover;
          background-position: center;
          opacity: 0.35;
          pointer-events: none;
        }

        .loader-word {
          position: absolute;
          font-family: var(--font-mono);
          font-size: clamp(13px, 1.4vw, 17px);
          color: #111111;
          opacity: 0;
          letter-spacing: 0.06em;
          white-space: nowrap;
          pointer-events: none;
          will-change: opacity;
          transition: opacity 1s cubic-bezier(0.4,0,0.2,1);
        }
        .loader-word.visible  { opacity: 0.5; }
        .loader-word.fadeout  { opacity: 0; }

        .loader-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }

        .loader-name {
          font-family: var(--font-serif);
          font-size: clamp(16px, 1.8vw, 22px);
          font-style: italic;
          color: #111111;
          opacity: 0.85;
          letter-spacing: 0.04em;
          margin: 0;
        }

        .loader-circle-wrap {
          position: relative;
          width: clamp(140px, 20vw, 200px);
          height: clamp(140px, 20vw, 200px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .loader-circle-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
          animation: spinSlow 20s linear infinite;
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .loader-icon-big {
          position: relative;
          z-index: 1;
          width: clamp(60px, 9vw, 90px);
          height: clamp(60px, 9vw, 90px);
          object-fit: contain;
          opacity: 0;
          transform: scale(0.75);
          will-change: transform, opacity;
          transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .loader-icon-big.visible {
          opacity: 1;
          transform: scale(1);
        }

        .loader-icon-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #111111;
          opacity: 0.35;
          text-align: center;
          min-height: 14px;
          transition: opacity 0.4s ease;
        }

        .loader-pct {
          font-family: var(--font-mono);
          font-size: clamp(20px, 2.5vw, 32px);
          font-weight: 400;
          color: #111111;
          opacity: 0.7;
          letter-spacing: -0.01em;
          line-height: 1;
          min-width: 80px;
          text-align: center;
          transition: all 0.4s ease;
        }

        .loader-icon-inside-label {
          position: relative;
          z-index: 1;
          font-family: var(--font-mono);
          font-size: clamp(8px, 0.9vw, 10px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #111111;
          opacity: 0.35;
          text-align: center;
          transition: opacity 0.4s ease;
        }

        .loader-stage-title {
          font-family: var(--font-serif);
          font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 400;
          color: #111111;
          opacity: 0.75;
          text-align: center;
          margin: 0;
          line-height: 1.2;
          min-height: 24px;
          transition: opacity 0.4s ease;
        }

        .loader-stage-sub {
          font-family: var(--font-mono);
          font-size: clamp(12px, 1.3vw, 15px);
          color: #111111;
          opacity: 0.5;
          letter-spacing: 0.04em;
          text-align: center;
          font-style: italic;
          margin: 0;
          min-height: 20px;
          transition: opacity 0.4s ease;
        }

        .loader-label {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #111111;
          opacity: 0.2;
          margin: 0;
        }
      `}</style>

      <div className={`loader-wrap ${exiting ? 'exiting' : ''}`}>
        <div className="loader-texture" />

        {/* 5 floating text slots — replace on each stage */}
        {POSITIONS.map((pos, i) => (
          <span
            key={`word-${i}`}
            className={`loader-word ${currentFloats[i] ? 'visible' : ''}`}
            style={{ top: pos.top, left: pos.left }}
          >
            {currentFloats[i] ?? ''}
          </span>
        ))}

        {/* Center */}
        <div className="loader-center">
          <p className="loader-label">🧠 MLE Brain Loading...</p>
          <p className="loader-name">${PROFILE.name} · ${PROFILE.role}</p>

          {/* Wavy circle — one icon at a time */}
          <div className="loader-circle-wrap">
            <svg className="loader-circle-svg" viewBox="0 0 200 200" fill="none">
              <path
                d={WAVY_PATH}
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeOpacity="0.25"
              />
            </svg>
            {iconIdx >= 0 && (
              <img
                key={iconIdx}
                src={ICONS[iconIdx].src}
                alt={ICONS[iconIdx].label}
                className="loader-icon-big visible"
              />
            )}
          </div>
          <span className="loader-icon-label">
            {iconIdx >= 0 ? ICONS[iconIdx].label : ' '}
          </span>

          <div className="loader-pct">{currentPct}</div>
          <p className="loader-stage-title">{currentTitle || ' '}</p>
          <p className="loader-stage-sub">{currentSubtitle || ' '}</p>
        </div>
      </div>
    </>
  )
}
