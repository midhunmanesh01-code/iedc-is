import { useEffect, useState } from 'react'

export interface CountdownState {
  readonly days: number
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly isPending: boolean
  readonly isCompleted: boolean
}

const PENDING_STATE: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isPending: true,
  isCompleted: false,
}

const COMPLETED_STATE: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isPending: false,
  isCompleted: true,
}

function calculateUnits(diffMs: number): CountdownState {
  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    days,
    hours,
    minutes,
    seconds,
    isPending: false,
    isCompleted: false,
  }
}

function getInitialCountdownState(targetDateString: string | null | undefined): CountdownState {
  if (!targetDateString) {
    return PENDING_STATE
  }

  const targetMs = new Date(targetDateString).getTime()
  if (Number.isNaN(targetMs)) {
    return PENDING_STATE
  }

  const diff = targetMs - Date.now()
  if (diff <= 0) {
    return COMPLETED_STATE
  }

  return calculateUnits(diff)
}

export function useCountdown(targetDateString: string | null | undefined): CountdownState {
  const [state, setState] = useState<CountdownState>(() => getInitialCountdownState(targetDateString))

  useEffect(() => {
    if (!targetDateString) {
      return
    }

    const targetMs = new Date(targetDateString).getTime()
    if (Number.isNaN(targetMs)) {
      return
    }

    const update = () => {
      const now = Date.now()
      const diff = targetMs - now

      if (diff <= 0) {
        setState(COMPLETED_STATE)
        return
      }

      setState(calculateUnits(diff))
    }

    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [targetDateString])

  return state
}
