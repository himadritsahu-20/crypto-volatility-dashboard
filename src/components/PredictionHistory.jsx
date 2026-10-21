export default function PredictionHistory({ history }) {
  if (!history.length) return null
  return (
    <div className="history-card card-glow">
      <div className="card-header">
        <h2 className="section-title"><span className="title-icon">🕐</span> Prediction Log</h2>
        <span className="card-badge mono">{history.length} ENTRIES</span>
      </div>
      <div className="history-table-wrap">
        <table className="history-table">
          <thead><tr><th>ID</th><th>Timestamp</th><th>Probability</th><th>Signal</th></tr></thead>
          <tbody>
            {[...history].reverse().map((h, i) => (
              <tr key={i}>
                <td className="mono dim">#{String(history.length-i).padStart(3,'0')}</td>
                <td className="mono">{h.time}</td>
                <td className="mono">
                  <span style={{ color: h.high_volatility_probability>=0.7?'#f85149':h.high_volatility_probability>=0.4?'#d29922':'#3fb950' }}>
                    {(h.high_volatility_probability*100).toFixed(2)}%
                  </span>
                </td>
                <td><span className={`mini-badge ${h.prediction===1?'badge-high':'badge-low'}`}>{h.prediction===1?'⚠ HIGH':'✓ LOW'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
