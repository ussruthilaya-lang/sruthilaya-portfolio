'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    function onMove(e: MouseEvent) {
      if (!cursor) return
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '28px',
        height: '28px',
        backgroundImage: 'url(/mousepointer.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(0, 0)',
        filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))',
      }}
    />
  )
}
