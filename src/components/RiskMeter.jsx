export default function RiskMeter({ probability }) {
  const pct = Math.min(Math.max(probability, 0), 1)
  const level = pct >= 0.7 ? 'HIGH' : pct >= 0.4 ? 'MEDIUM' : pct >= 0.2 ? 'LOW' : 'MINIMAL'
  const color = pct >= 0.7 ? '#f85149' : pct >= 0.4 ? '#d29922' : pct >= 0.2 ? '#58a6ff' : '#3fb950'
  return (
    <div className="risk-meter">
      <div className="risk-header">
        <span className="risk-title">RISK LEVEL</span>
        <span className="risk-level mono" style={{ color }}>{level}</span>
      </div>
      <div className="risk-bar-track">
        <div className="risk-bar-fill" style={{ width: `${pct*100}%`, background: `linear-gradient(90deg, #3fb950, ${color})`, boxShadow: `0 0 12px ${color}44` }} />
        <div className="risk-zone" style={{ left: '20%' }} />
        <div className="risk-zone" style={{ left: '40%' }} />
        <div className="risk-zone" style={{ left: '70%' }} />
      </div>
      <div className="risk-labels"><span>Minimal</span><span>Low</span><span>Medium</span><span>High</span></div>
    </div>
  )
}
