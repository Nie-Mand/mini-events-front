import { useState, useEffect, useRef } from 'react'
import { useTaskQueue } from './use-task-queue'
import { v4 } from 'uuid'

interface Event {
  id: string
  team: string
  chall: string
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const useSocket = () => {
  const id = useRef(0)
  const [events, setEvents] = useState<Event[]>([])
  const [event, setEvent] = useState<Event | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { addTask } = useTaskQueue({
    shouldProcess: true,
  })

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3007/listen')
    socket.onopen = () => {
      console.log('connected')
    }
    socket.onmessage = e => {
      addTask(async () => {
        const data: Event = JSON.parse(e.data)

        const id = v4()

        setEvents(events => [
          ...events,
          { id: id, team: data.team, chall: data.chall },
        ])
        setEvent({ id: id, team: data.team, chall: data.chall })
        audioRef.current?.load()
        audioRef.current?.play()

        await delay(7000)

        setEvents(events => events.filter(e => e.id !== event?.id))
        setEvent(null)
        audioRef.current?.pause()
        audioRef.current?.load()
      })
    }

    return () => {
      socket.close()
    }
  }, [])

  return { event, audioRef }
}
