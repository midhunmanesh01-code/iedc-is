import { useEffect } from 'react'
import Lenis from 'lenis'

let sharedLenis: Lenis | null = null
let sharedRafId: number | null = null
let subscriberCount = 0

function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null
  if (sharedLenis) return sharedLenis

  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return null
  }

  // Detect coarse pointer (touch devices like mobile phones)
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

  sharedLenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !isTouchDevice,
    // On touch devices, do not simulate touch or fight native compositor scrolling
    syncTouch: false,
    infinite: false,
  })

  function raf(time: number) {
    if (sharedLenis) {
      sharedLenis.raf(time)
      sharedRafId = requestAnimationFrame(raf)
    }
  }

  sharedRafId = requestAnimationFrame(raf)
  return sharedLenis
}

function cleanupLenis() {
  if (subscriberCount <= 0 && sharedLenis) {
    if (sharedRafId) {
      cancelAnimationFrame(sharedRafId)
      sharedRafId = null
    }
    sharedLenis.destroy()
    sharedLenis = null
  }
}

export interface ScrollOptions {
  offset?: number
  duration?: number
  immediate?: boolean
  lock?: boolean
  onComplete?: () => void
}

export function useSmoothScroll() {
  useEffect(() => {
    subscriberCount++
    initLenis()

    return () => {
      subscriberCount--
      if (subscriberCount <= 0) {
        cleanupLenis()
      }
    }
  }, [])

  const scrollTo = (
    target: string | HTMLElement | number,
    optionsOrOffset: number | ScrollOptions = -70
  ) => {
    const options: ScrollOptions =
      typeof optionsOrOffset === 'number'
        ? { offset: optionsOrOffset }
        : optionsOrOffset

    const offset = options.offset ?? -70

    if (sharedLenis) {
      sharedLenis.scrollTo(target, {
        offset,
        duration: options.duration,
        immediate: options.immediate,
        lock: options.lock,
        onComplete: options.onComplete ? () => options.onComplete!() : undefined,
      })
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options.immediate ? 'instant' : 'smooth' })
        if (options.onComplete) {
          if (options.immediate) {
            options.onComplete()
          } else {
            setTimeout(options.onComplete, (options.duration ?? 0.4) * 1000)
          }
        }
      } else {
        const element = typeof target === 'string' ? document.querySelector(target) : target
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY + offset
          window.scrollTo({ top, behavior: options.immediate ? 'instant' : 'smooth' })
          if (options.onComplete) {
            if (options.immediate) {
              options.onComplete()
            } else {
              setTimeout(options.onComplete, (options.duration ?? 0.4) * 1000)
            }
          }
        } else if (options.onComplete) {
          options.onComplete()
        }
      }
    }
  }

  return { scrollTo }
}
