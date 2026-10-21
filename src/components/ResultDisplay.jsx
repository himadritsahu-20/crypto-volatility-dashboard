import ProbabilityGauge from './ProbabilityGauge'
import RiskMeter from './RiskMeter'

export default function ResultDisplay({ result }) {
  if (!result) return null
  const isHigh = result.prediction === 1
  return (
    <div className="result-card card-glow">
      <div className="card-header">
        <h2 className="section-title"><span className="title-icon">📊</span> Prediction Result</h2>
        <span className={`card-badge mono ${isHigh ? 'badge-high-bg' : 'badge-low-bg'}`}>
          {isHigh ? '⚠ ALERT' : '✓ NORMAL'}
        </span>
      </div>
      <ProbabilityGauge probability={result.high_volatility_probability} threshold={result.threshold} />
      <RiskMeter probability={result.high_volatility_probability} />
      <div className={`result-badge ${isHigh ? 'badge-high' : 'badge-low'}`}>
        <span className="badge-icon">{isHigh ? '🔴' : '🟢'}</span>
        <span className="badge-text">{result.label}</span>
      </div>
      <div className="result-details">
        <div className="detail-row"><span className="detail-key">Probability</span><span className="detail-val mono accent-text">{(result.high_volatility_probability*100).toFixed(2)}%</span></div>
        <div className="detail-row"><span className="detail-key">Threshold</span><span className="detail-val mono">{(result.threshold*100).toFixed(2)}%</span></div>
        <div className="detail-row"><span className="detail-key">Classification</span><span className="detail-val mono">{result.prediction}</span></div>
      </div>
      <p className="disclaimer">⚠️ {result.disclaimer}</p>
    </div>
  )
}
