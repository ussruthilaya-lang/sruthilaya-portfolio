'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading]   = useState(true)  // always true on first render — prevents FOUC
  const [briefing, setBriefing] = useState(false)
  const [ready, setReady]       = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('portfolio-loaded')
    if (!seen) {
      // keep loading = true, full loader will run
    } else {
      setLoading(false)
      // Refresh path — 2s texture pause before revealing site
      setBriefing(true)
      const t = setTimeout(() => {
        setBriefing(false)
        setReady(true)
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [])

  function handleDone() {
    sessionStorage.setItem('portfolio-loaded', '1')
    setLoading(false)
    setReady(true)
  }

  return (
    <>
      {loading && <LoadingScreen onDone={handleDone} />}

      {/* 2s brief overlay on refresh */}
      {briefing && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: '#ffffff',
          backgroundImage: 'url(/texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
          transition: 'opacity 0.8s ease',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{
        visibility: loading ? 'hidden' : 'visible',
        opacity: ready || (!loading && !briefing) ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}>
        {children}
      </div>
    </>
  )
}
