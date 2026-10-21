export default function StatsRibbon({ featureCount, threshold, backendStatus }) {
  const stats = [
    { label: 'Model', value: 'Logistic Reg.', icon: '🧠' },
    { label: 'Features', value: featureCount || '—', icon: '📐' },
    { label: 'Threshold', value: `${((threshold || 0.275) * 100).toFixed(1)}%`, icon: '🎯' },
    { label: 'Status', value: backendStatus === 'ok' ? 'Operational' : 'Degraded', icon: backendStatus === 'ok' ? '🟢' : '🔴' },
  ]
  return (
    <div className="stats-ribbon">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <span className="stat-icon">{s.icon}</span>
          <div>
            <div className="stat-value mono">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
