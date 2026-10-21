export default function ProbabilityGauge({ probability, threshold }) {
  const pct = Math.min(Math.max(probability, 0), 1)
  const radius = 85, stroke = 14, cx = 110, cy = 105
  const arcLength = Math.PI * radius
  const dashOffset = arcLength * (1 - pct)
  const color = pct >= 0.7 ? '#f85149' : pct >= 0.4 ? '#d29922' : '#3fb950'
  const thresholdAngle = Math.PI * (1 - threshold)
  const tx = cx + radius * Math.cos(thresholdAngle)
  const ty = cy - radius * Math.sin(thresholdAngle)

  return (
    <div className="gauge-container">
      <svg viewBox="0 0 220 130" className="gauge-svg">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <linearGradient id="gbg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3fb950" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#d29922" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f85149" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d={`M ${cx-radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx+radius} ${cy}`} fill="none" stroke="url(#gbg)" strokeWidth={stroke+4} strokeLinecap="round" />
        <path d={`M ${cx-radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx+radius} ${cy}`} fill="none" stroke="#21262d" strokeWidth={stroke} strokeLinecap="round" />
        <path d={`M ${cx-radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx+radius} ${cy}`} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={arcLength} strokeDashoffset={dashOffset} filter="url(#glow)" style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }} />
        {[0,0.25,0.5,0.75,1].map(t => { const a=Math.PI*(1-t); return <line key={t} x1={cx+(radius-22)*Math.cos(a)} y1={cy-(radius-22)*Math.sin(a)} x2={cx+(radius-28)*Math.cos(a)} y2={cy-(radius-28)*Math.sin(a)} stroke="#484f58" strokeWidth={1.5} /> })}
        <line x1={cx+(radius-10)*Math.cos(thresholdAngle)} y1={cy-(radius-10)*Math.sin(thresholdAngle)} x2={cx+(radius+10)*Math.cos(thresholdAngle)} y2={cy-(radius+10)*Math.sin(thresholdAngle)} stroke="#8b949e" strokeWidth={2} strokeDasharray="3 2" />
        <text x={tx} y={ty-14} textAnchor="middle" className="gauge-threshold-label">T {(threshold*100).toFixed(1)}%</text>
        <text x={cx} y={cy-22} textAnchor="middle" className="gauge-pct" fill={color}>{(pct*100).toFixed(1)}%</text>
        <text x={cx} y={cy-4} textAnchor="middle" className="gauge-sublabel">HIGH VOL PROBABILITY</text>
        <text x={cx-radius-2} y={cy+16} textAnchor="middle" className="gauge-scale">0</text>
        <text x={cx} y={cy-radius+6} textAnchor="middle" className="gauge-scale">50</text>
        <text x={cx+radius+2} y={cy+16} textAnchor="middle" className="gauge-scale">100</text>
      </svg>
    </div>
  )
}
