# CryptoVolPro — Crypto Volatility Dashboard

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?logo=netlify)

**Live Demo:** [https://crypto-volatility-dashboard.netlify.app](https://crypto-volatility-dashboard.netlify.app)

## Overview
Dark-mode trading dashboard that communicates with a FastAPI ML backend to predict **crypto volatility** in real time.

### UI Features
- Live backend status indicator
- Dynamic 12-feature input form (auto-loaded from `/model-info`)
- Animated probability gauge with threshold marker
- Risk level meter (Minimal → High)
- Prediction history log
- Fully responsive

## Tech Stack
- **React 18 + Vite**
- **Vanilla CSS** (trading-terminal dark theme)
- **Netlify** (CI/CD from GitHub)
- **Backend:** FastAPI + scikit-learn (separate repo)

## Quick Start
```bash
git clone https://github.com/himadritsahu-20/crypto-volatility-dashboard.git
cd crypto-volatility-dashboard
npm install
npm run dev
```
## Environment
VITE_API_URL=https://crypto-volatility-api-645g.onrender.com

## Project Structure
src/
├── api.js                 # Backend calls
├── App.jsx / App.css      # Main layout + theme
└── components/
    ├── Header.jsx
    ├── StatsRibbon.jsx
    ├── PredictionForm.jsx
    ├── ProbabilityGauge.jsx
    ├── RiskMeter.jsx
    ├── ResultDisplay.jsx
    └── PredictionHistory.jsx

## Related
- **Backend API:** [crypto-volatility-api](https://github.com/himadritsahu-20/crypto-volatility-api)
