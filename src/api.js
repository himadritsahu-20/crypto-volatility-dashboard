const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function fetchModelInfo() {
  const res = await fetch(`${API_URL}/model-info`)
  if (!res.ok) throw new Error(`Failed to fetch model info (${res.status})`)
  return res.json()
}

export async function fetchHealth() {
  const res = await fetch(`${API_URL}/health`)
  if (!res.ok) throw new Error(`Backend unreachable (${res.status})`)
  return res.json()
}

export async function sendPrediction(features) {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ features }),
  })
  const data = await res.json()
  if (!res.ok) {
    const msg = data?.detail
      ? typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)
      : `Prediction failed (${res.status})`
    throw new Error(msg)
  }
  return data
}
