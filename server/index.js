import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import flightsRouter from './routes/flights.js';
import itineraryRouter from './routes/itinerary.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/flights', flightsRouter);
app.use('/api/itinerary', itineraryRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
