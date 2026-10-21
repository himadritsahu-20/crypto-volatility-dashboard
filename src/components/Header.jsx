import { useState, useEffect } from 'react'

export default function Header({ backendStatus }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-box"><span className="logo-icon">◈</span></div>
        <div>
          <h1 className="header-title">CryptoVol<span className="accent">Pro</span></h1>
          <p className="subtitle">ML Volatility Prediction Engine</p>
        </div>
      </div>
      <div className="header-center">
        <div className="live-clock mono">
          <span className="clock-dot" />
          {time.toLocaleTimeString('en-US', { hour12: false })}
          <span className="clock-date">
            {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
      <div className="header-right">
        <div className="status-pill">
          <span className={`status-dot ${backendStatus === 'ok' ? 'status-ok' : backendStatus === 'error' ? 'status-err' : 'status-loading'}`} />
          <span className="status-text">
            {backendStatus === 'ok' ? 'API Live' : backendStatus === 'error' ? 'Offline' : 'Connecting'}
          </span>
        </div>
      </div>
    </header>
  )
}
