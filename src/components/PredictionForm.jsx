import { useState, useEffect } from 'react'

function formatLabel(name) {
  return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    .replace(/Rsi/i,'RSI').replace(/Sma/i,'SMA').replace(/Ema/i,'EMA')
    .replace(/Bb/i,'BB').replace(/Atr/i,'ATR').replace(/Macd/i,'MACD').replace(/Obv/i,'OBV')
}

export default function PredictionForm({ featureColumns, onSubmit, loading }) {
  const [values, setValues] = useState({})
  useEffect(() => {
    if (featureColumns?.length) {
      const init = {}; featureColumns.forEach(f => init[f] = ''); setValues(init)
    }
  }, [featureColumns])

  const handleSubmit = (e) => {
    e.preventDefault()
    const features = {}
    for (const [k, v] of Object.entries(values)) {
      const num = parseFloat(v)
      if (isNaN(num)) { alert(`Enter a valid number for "${formatLabel(k)}"`); return }
      features[k] = num
    }
    onSubmit(features)
  }

  if (!featureColumns?.length) return null
  return (
    <form className="prediction-form card-glow" onSubmit={handleSubmit}>
      <div className="card-header">
        <h2 className="section-title"><span className="title-icon">⌨</span> Feature Inputs</h2>
        <span className="card-badge mono">{featureColumns.length} FEATURES</span>
      </div>
      <p className="section-desc">Enter real-time market indicators for volatility classification.</p>
      <div className="form-grid">
        {featureColumns.map(col => (
          <label key={col} className="input-group">
            <span className="input-label">{formatLabel(col)}</span>
            <input type="number" step="any" required value={values[col]??''}
              onChange={e => setValues(p => ({...p,[col]:e.target.value}))}
              placeholder="0.00" className="input-field mono" />
          </label>
        ))}
      </div>
      <button type="submit" className="predict-btn" disabled={loading}>
        {loading ? <><span className="spinner" /> Analyzing…</> : <><span className="btn-icon">⚡</span> Predict Volatility</>}
      </button>
    </form>
  )
}
