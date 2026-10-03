import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

import { slides, SECTION_META } from './slides/registry'
import MagiculeField from './components/MagiculeField'
import ClickBurst from './components/ClickBurst'
import { arrival, consumeStep, retreatStep } from './hooks/useSteps'
import dragonNovaVideo from './assets/videos/drago-nova.mp4'
import './App.css'
import './anime.css'   // phải nằm SAU App.css để ghi đè
import './interactions.css'

const clamp = (n: number) => Math.min(Math.max(n, 0), slides.length - 1)

// Những phần tử này tự xử lý thao tác của chúng, không được coi là "chạm để chuyển slide"
const INTERACTIVE =
    'button, a, input, select, textarea, label, summary, [role="button"], [draggable="true"], [contenteditable="true"], [data-no-nav]'
const TAP_MAX = 10 // dịch chuyển tối đa (px) để tính là một cú chạm
const SWIPE_MIN = 60 // dịch chuyển tối thiểu (px) để tính là một cú vuốt
const NAV_COOLDOWN = 300 // ms, chống bấm đúp làm nhảy hai slide
const SLIME_SWALLOW_SLIDES = new Set([2, 9, 12, 16])
const mascotBySlide: Record<number, string> = {
  1: 'slime.png',
  9: 'ranga.png',
  10: 'ranga.png',
  11: 'ranga.png',
  12: 'slime.png',
  13: 'slime.png',
  14: 'slime.png',
  15: 'slime.png',
  16: 'ultima.png',
  17: 'ultima.png',
  18: 'milim.png',
  19: 'milim.png',
}

function readHash(): number {
  const n = parseInt(window.location.hash.replace('#/', ''), 10)
  return Number.isNaN(n) ? 0 : clamp(n - 1)
}

function App() {
  const [activeSlide, setActiveSlide] = useState<number>(readHash)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [swallowTarget, setSwallowTarget] = useState<number | null>(null)
  const [videoTarget, setVideoTarget] = useState<number | null>(null)
  const [transitionVideoUrl, setTransitionVideoUrl] = useState<string | null>(null)
  const [transitionVideoLoadFailed, setTransitionVideoLoadFailed] = useState(false)
  const transitionVideoRef = useRef<HTMLVideoElement | null>(null)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const lastNav = useRef<number>(0)
  const [dir, setDir] = useState<'next' | 'prev'>('next')

  useEffect(() => {
    const controller = new AbortController()
    let objectUrl: string | null = null

    fetch(dragonNovaVideo, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        return response.blob()
      })
      .then((videoBlob) => {
        if (controller.signal.aborted) return
        objectUrl = URL.createObjectURL(videoBlob)
        setTransitionVideoUrl(objectUrl)
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error(`Transition video failed to preload: ${dragonNovaVideo}`, error)
        setTransitionVideoLoadFailed(true)
      })

    return () => {
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  useEffect(() => {
    if (transitionVideoLoadFailed && videoTarget !== null) {
      setActiveSlide(videoTarget)
      setVideoTarget(null)
    }
  }, [transitionVideoLoadFailed, videoTarget])

  useEffect(() => {
    const video = transitionVideoRef.current
    if (!video) return
    let cancelled = false

    if (videoTarget === null) {
      video.pause()
      if (video.readyState > 0) video.currentTime = 0
      return
    }

    if (!transitionVideoUrl) return

    video.currentTime = 0
    video.play().catch((error: unknown) => {
      if (cancelled) return
      console.error(`Transition video failed to play: ${dragonNovaVideo}`, error)
      setActiveSlide(videoTarget)
      setVideoTarget(null)
    })
    return () => {
      cancelled = true
    }
  }, [transitionVideoUrl, videoTarget])

  const goTo = useCallback((index: number) => {
    if (swallowTarget !== null) return
    const target = clamp(index)
    arrival.fromPrev = target < activeSlide
    setDir(target < activeSlide ? 'prev' : 'next')
    if (videoTarget !== null) {
      setVideoTarget(null)
      setActiveSlide(target)
      return
    }
    if (isFullscreen && activeSlide === 17 && target === 18) {
      setVideoTarget(target)
      return
    }
    if (isFullscreen && target === activeSlide + 1 && SLIME_SWALLOW_SLIDES.has(activeSlide + 1)) {
      setSwallowTarget(target)
      return
    }
    setActiveSlide(target)
  }, [activeSlide, isFullscreen, swallowTarget, videoTarget])
  const next = useCallback(() => {
    if (consumeStep()) return
    goTo(activeSlide + 1)
  }, [activeSlide, goTo])
  const prev = useCallback(() => {
    if (retreatStep()) return
    goTo(activeSlide - 1)
  }, [activeSlide, goTo])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }, [])

  const CurrentSlide = slides[activeSlide].component

  // Chạm / click / vuốt trên vùng slide
  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const target = event.target
    if (event.button !== 0 || (target instanceof Element && target.closest(INTERACTIVE))) {
      pointerStart.current = null
      return
    }
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    const now = Date.now()
    if (now - lastNav.current < NAV_COOLDOWN) return

    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.5) {
      lastNav.current = now
      if (dx < 0) {
        next()
      } else {
        prev()
      }
    } else if (Math.abs(dx) < TAP_MAX && Math.abs(dy) < TAP_MAX) {
      if (window.getSelection()?.toString()) return
      lastNav.current = now
      next()
    }
  }

  // Giữ vị trí slide khi tải lại trang (URL dạng #/7)
  useEffect(() => {
    window.history.replaceState(null, '', `#/${activeSlide + 1}`)
  }, [activeSlide])

  // Theo dõi trạng thái toàn màn hình (kể cả khi thoát bằng Esc)
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target
      if (
          target instanceof HTMLElement &&
          (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
      ) {
        return
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'PageDown':
          event.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault()
          prev()
          break
        case ' ':
          // Space trên một nút là bấm nút đó, không chuyển slide
          if (!(target instanceof HTMLButtonElement)) {
            event.preventDefault()
            next()
          }
          break
        case 'Home':
          goTo(0)
          break
        case 'End':
          goTo(slides.length - 1)
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [next, prev, goTo, toggleFullscreen])

  const meta = SECTION_META[slides[activeSlide].section]

  return (
      <main
          className={`presentation${isFullscreen ? ' is-fullscreen' : ''}`}
          data-section={slides[activeSlide].section}
      >
        <MagiculeField />
        <ClickBurst />
        <div className="arc-banner" key={slides[activeSlide].section} aria-hidden="true">
          <small>{meta.arc}</small><b>{meta.jp}</b><span>{slides[activeSlide].section}</span>
        </div>

        <div className="deck-topbar">
          <div className="deck-brand">
            <span className="brand-mark">ワ</span>
            <span>LORD<span className="brand-light">WIBU</span></span>
            <span className="brand-divider" /> UNIT 14 &amp; 15
          </div>
          <div className="deck-section">
            <b>{meta.arc}</b>
            <span>{meta.jp}</span>
          </div>
          <div className="deck-top-actions">
            <span className="keyboard-hint">Click anywhere or <kbd>←</kbd><kbd>→</kbd></span>
            <button
                className="nav-button"
                onClick={toggleFullscreen}
                aria-label="Toggle fullscreen"
            >
              {isFullscreen ? '⤡' : '⤢'}
            </button>
            <span className="topbar-dot" />
          </div>
        </div>

        <div
            className="slide-viewport"
            key={activeSlide}
            data-slide={activeSlide + 1}
            data-dir={dir}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { pointerStart.current = null }}
        >
          <CurrentSlide onNavigate={goTo} />
          <video
            ref={transitionVideoRef}
            className={videoTarget !== null && transitionVideoUrl ? 'video-transition' : 'video-preload'}
            src={transitionVideoUrl ?? undefined}
            preload="auto"
            muted
            playsInline
            onEnded={() => {
              if (videoTarget === null) return
              setActiveSlide(videoTarget)
              setVideoTarget(null)
            }}
            onError={() => {
              if (videoTarget !== null) {
                console.error(`Transition video failed to play: ${dragonNovaVideo}`)
                setActiveSlide(videoTarget)
              }
              setVideoTarget(null)
            }}
          />
          {swallowTarget !== null && (
            <div
              className="slime-swallow"
              aria-hidden="true"
              onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget) return
                setActiveSlide(swallowTarget)
                setSwallowTarget(null)
              }}
            >
              <img src="/mascot/rimuru.png" alt="" />
            </div>
          )}
          {activeSlide > 0 && (
            <div
              className="cursor-slime"
              aria-hidden="true"
            >
              <img src={`/mascot/${mascotBySlide[activeSlide] ?? 'Luminous.png'}`} alt="" />
            </div>
          )}
        </div>

        <footer className="deck-controls">
          <div className="slide-index">
            <strong>{String(activeSlide + 1).padStart(2, '0')}</strong>
            <span>/</span>
            {String(slides.length).padStart(2, '0')}
            <span className="slide-current-title">{slides[activeSlide].title}</span>
          </div>
          <div className="progress-track" aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}>
            <span style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }} />
          </div>
          <div className="nav-controls">
            <button
                className="nav-button previous"
                onClick={prev}
                disabled={activeSlide === 0}
                aria-label="Previous slide"
            >
              ←
            </button>
            <button
                className="nav-button next"
                onClick={next}
                disabled={activeSlide === slides.length - 1}
                aria-label="Next slide"
            >
              →
            </button>
          </div>
        </footer>
      </main>
  )
}

export default App