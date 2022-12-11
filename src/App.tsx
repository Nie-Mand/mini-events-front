import { useState } from 'react'
import { useCountdown } from './use-countdown'
import { useSocket } from './use-socket'

function getTimeLeft(endTime: Date) {
  return Math.round((+new Date(endTime) - +new Date()) / 1000)
}

function App() {
  const { event, audioRef } = useSocket()
  const count = useCountdown(getTimeLeft(new Date(2022, 11, 11, 19)))
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
          <>
            <div className="text-change text-center">
              <div className="text-4xl">Securinets</div> <br />
              Mini CTF Competition
              <br />
              <br />
              <h1 className="text-gray-300">{count}</h1>
            </div>
            <img
              src="/logo.png"
              width="120px"
              height="90px"
              className="mx-auto"
            />
          </>
        )}
      </div>
    </>
  )
}

export default App
