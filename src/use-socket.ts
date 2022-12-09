import { useState, useEffect, useRef } from 'react'

interface Event {
  id: number
  team: string
  chall: string
}

export const useSocket = () => {
  const id = useRef(0)
  const [events, setEvents] = useState<Event[]>([])
  const [event, setEvent] = useState<Event | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const socket = new WebSocket('ws://listener-server-mini.deno.dev/listen')
    socket.onopen = () => {
      console.log('connected')
    }
    socket.onmessage = e => {
      const data: Event = JSON.parse(e.data)

      const id = Math.floor(Math.random() * 1000)

      setEvents(events => [
        ...events,
        { id: id, team: data.team, chall: data.chall },
      ])
      setEvent({ id: id, team: data.team, chall: data.chall })
      audioRef.current?.load()
      audioRef.current?.play()

      setTimeout(() => {
        setEvents(events => events.filter(e => e.id !== event?.id))
        setEvent(null)
        audioRef.current?.pause()
        audioRef.current?.load()
      }, 7000)
    }

    return () => {
      socket.close()
    }
  }, [])

  return { event, audioRef }
}
