// use counter

import { useState, useEffect, useMemo } from 'react'

const getValue = (value: number) => {
  return value < 10 ? `0${value}` : value
}

export const useCountdown = (seconds: number) => {
  const [count, setCount] = useState(seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [count])

  return useMemo(() => {
    const hours = Math.floor(count / 3600)
    const minutes = Math.floor((count % 3600) / 60)
    const seconds = count % 60
    return `${getValue(hours)}:${getValue(minutes)}:${getValue(seconds)}`
  }, [count])
}
