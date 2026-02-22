import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root before any service imports
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Dynamic imports so env vars are loaded before Amadeus/Anthropic init
const express = (await import('express')).default;
const cors = (await import('cors')).default;
const { default: flightsRouter } = await import('./routes/flights.js');
const { default: itineraryRouter } = await import('./routes/itinerary.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/flights', flightsRouter);
app.use('/api/itinerary', itineraryRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Serve static frontend files in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
