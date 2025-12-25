# Sentiment Analysis — Frontend ✅

A minimal React + Vite frontend that visualizes YouTube sentiment analysis results from the companion backend.

---

## 🔧 Features

- Analyze YouTube or Twitter comments and visualize sentiment distribution, trends, and keywords
- Example comments (positive/negative/neutral/mixed) and word cloud
- Integrates with the backend API which uses AWS Comprehend for sentiment detection

---

## ⚙️ Prerequisites

- Node.js (v14+ recommended)
- npm or pnpm
- A running instance of the backend (see **Backend** below)

---

## 🚀 Install & Run

```bash
git clone <your-repo-url>
cd sentiment-analysis-fe
npm install
# create a .env in project root (see Environment variables section)
npm run dev
```

Open http://localhost:5173 in your browser (Vite default).

---

## 🔐 Environment variables

Create a `.env` file in the project root (do NOT commit secrets) with at least:

- `VITE_BACKEND_URL` — the base URL of the backend API used by the frontend.

Example `.env`:

```env
VITE_BACKEND_URL=http://localhost:3000
```

**Important:** The backend exposes a `PORT` (default `3000`). Make sure the port in `VITE_BACKEND_URL` matches the backend `PORT`. If you change the backend `PORT`, update `VITE_BACKEND_URL` accordingly.

Tip: Add an `.env.sample` with the example above for contributors (do not add real secrets).

---

## 🔗 Backend

This frontend expects the backend implemented here:

https://github.com/NishantAsnani/sentiment-analysis-be

See the backend README for required backend ENV vars such as `GOOGLE_AUTH_KEY`, AWS credentials, and `PORT`.

---

## 📦 API (overview)

The frontend calls `POST /api/batch-analyze-sentiment` with a body like:

```json
{ "url": "https://www.youtube.com/watch?v=VIDEO_ID" }
```

The response contains `results` with `sentimentDistribution`, `overallSentiment`, `overallScore`, `comments`, `keywords`, and `totalCount`.

---

## 🤝 Contributing

- Open issues and PRs for bugs and enhancements
- Do not commit secrets or credentials

