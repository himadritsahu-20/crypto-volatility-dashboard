import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import StatsRibbon from './components/StatsRibbon'
import PredictionForm from './components/PredictionForm'
import ResultDisplay from './components/ResultDisplay'
import PredictionHistory from './components/PredictionHistory'
import { fetchModelInfo, fetchHealth, sendPrediction } from './api'

export default function App() {
  const [backendStatus, setBackendStatus] = useState('loading')
  const [featureColumns, setFeatureColumns] = useState([])
  const [threshold, setThreshold] = useState(0.275)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function init() {
      try {
        await fetchHealth()
        setBackendStatus('ok')
        const info = await fetchModelInfo()
        setFeatureColumns(info.feature_columns || [])
        setThreshold(info.threshold ?? 0.275)
      } catch { setBackendStatus('error') }
    }
    init()
  }, [])

  const handlePredict = useCallback(async (features) => {
    setLoading(true); setError(null)
    try {
      const data = await sendPrediction(features)
      setResult(data)
      setHistory(prev => [...prev, { ...data, time: new Date().toLocaleTimeString() }])
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }, [])

  return (
    <div className="app">
      <div className="bg-grid" />
      <Header backendStatus={backendStatus} />
      <StatsRibbon featureCount={featureColumns.length} threshold={threshold} backendStatus={backendStatus} />
      {backendStatus === 'error' && (
        <div className="error-banner">
          ⛔ Cannot reach backend. Ensure your FastAPI server is running and{' '}
          <code>VITE_API_URL</code> is set correctly.
        </div>
      )}
      <main className="main-grid">
        <div className="left-col">
          <PredictionForm featureColumns={featureColumns} onSubmit={handlePredict} loading={loading} />
          {error && <div className="error-banner">❌ {error}</div>}
        </div>
        <div className="right-col">
          <ResultDisplay result={result} />
          {!result && !loading && (
            <div className="empty-state card-glow">
              <div className="empty-graphic">
                <div className="empty-candle c1" />
                <div className="empty-candle c2" />
                <div className="empty-candle c3" />
                <div className="empty-candle c4" />
                <div className="empty-candle c5" />
              </div>
              <p className="empty-text">
                Enter market features and hit <strong>Predict</strong> to analyze volatility.
              </p>
            </div>
          )}
          <PredictionHistory history={history} />
        </div>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span>CryptoVolPro v1.0</span>
          <span className="footer-sep">·</span>
          <span>Logistic Regression</span>
          <span className="footer-sep">·</span>
          <span>{featureColumns.length} Features</span>
          <span className="footer-sep">·</span>
          <span>Threshold {(threshold * 100).toFixed(1)}%</span>
          <span className="footer-sep">·</span>
          <span>Not Financial Advice</span>
        </div>
      </footer>
    </div>
  )
}
