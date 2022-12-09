import { useState } from 'react'
import { useCountdown } from './use-countdown'
import { useSocket } from './use-socket'

function App() {
  const { event, audioRef } = useSocket()
  const count = useCountdown(4000)
  const [show, setShow] = useState(true)

  return (
    <>
      <audio
        className={`fixed ${show ? 'z-20' : '-z-20'}`}
        ref={audioRef}
        src="/sound.mp3"
        controls
        onPause={() => {
          setShow(!show)
        }}
      />
      <div className="bg-[#111] grid place-content-center text-5xl h-screen">
        {event ? (
          <div>
            <div className="first-blood"></div>
            <div className="text-[red]/90 text-4xl">
              <h2 className="font-hacked">
                <span className="text-5xl">{event.team}</span> Just Captured{' '}
                <span className="text-5xl">{event.chall}</span>
              </h2>
            </div>
          </div>
        ) : (
          <h1 className="text-gray-300">{count}</h1>
        )}
      </div>
    </>
  )
}

export default App
