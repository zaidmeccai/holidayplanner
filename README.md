# Holiday Planner

A web application that generates fully optimised holiday itineraries by pulling real-time flight prices, web-sourced travel recommendations, local events, accommodation options, and food guides — then intelligently balancing cost and time.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express REST API
- **AI Layer:** Anthropic Claude API (claude-sonnet-4-6) with web search tool
- **Flight Data:** Amadeus API

## Setup

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` in the project root and fill in your API keys:

```bash
cp .env.example .env
```

Required keys:
- `ANTHROPIC_API_KEY` — from [console.anthropic.com](https://console.anthropic.com)
- `AMADEUS_CLIENT_ID` / `AMADEUS_CLIENT_SECRET` — from [developers.amadeus.com](https://developers.amadeus.com)

### 3. Run the application

Start the backend server:

```bash
cd server && npm run dev
```

Start the frontend dev server (in a separate terminal):

```bash
cd client && npm run dev
```

The app will be available at `http://localhost:5173`. The Vite dev server proxies `/api` requests to the Express backend on port 3001.

## Features

- **Trip Input Form** — origin, destination, dates, budget, travel style, interests
- **Real-Time Flight Search** — top 5 flight options via Amadeus API
- **Web-Sourced Travel Intelligence** — Claude searches the web for spots, events, food, accommodation
- **Smart Day-by-Day Itinerary** — optimised for cost and time with morning/afternoon/evening breakdown
- **Budget Breakdown** — estimated costs across flights, accommodation, food, activities, transport
- **Export** — copy as plain text or download as PDF

## API Keys

| Service | Purpose | Free Tier |
|---|---|---|
| Anthropic API | AI + web search | Yes (limited) |
| Amadeus API | Flight pricing | Yes (test environment) |
