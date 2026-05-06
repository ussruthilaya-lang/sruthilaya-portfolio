'use client'

import { useState, useRef } from 'react'

const FRAMES = ['/sruthilaya.png', '/sruthilaya2.png', '/sruthilaya3.png']
const FRAME_DURATION = 120 // ms between frames

export default function HeroPhoto() {
  const [frame, setFrame] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHovering = useRef(false)

  function advanceFrames(current: number) {
    if (!isHovering.current) return
    const next = current + 1
    if (next >= FRAMES.length) return // stop at last frame
    timerRef.current = setTimeout(() => {
      setFrame(next)
      advanceFrames(next)
    }, FRAME_DURATION)
  }

  function onMouseEnter() {
    isHovering.current = true
    setFrame(1)
    advanceFrames(1)
  }

  function onMouseLeave() {
    isHovering.current = false
    if (timerRef.current) clearTimeout(timerRef.current)
    setFrame(0)
  }

  return (
    <>
      <style>{`
        .hero-photo-wrap {
          position: absolute;
          top: 80px;
          right: 24vw;
          bottom: 30px;
          z-index: 2;
          width: clamp(110px, 12vw, 180px);
          display: flex;
          align-items: flex-start;
          cursor: none;
          overflow: hidden;
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .hero-photo-wrap {
            right: 5vw;
            width: clamp(130px, 18vw, 220px);
          }
        }

        @media (max-width: 768px) {
          .hero-photo-wrap {
            position: relative;
            top: auto;
            right: auto;
            bottom: auto;
            width: 140px;
            margin: 24px auto 8px;
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    <div
      className="hero-photo-wrap"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={FRAMES[frame]}
        alt="Sruthilaya"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          filter: 'contrast(1.04) saturate(1.02)',
          imageRendering: 'auto',
        }}
      />
    </div>
    </>
  )
}
