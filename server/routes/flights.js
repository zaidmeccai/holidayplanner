import { Router } from 'express';
import { searchFlights } from '../services/flightService.js';

const router = Router();

router.post('/search', async (req, res) => {
  const { origin, destination, departureDate, returnDate, adults } = req.body;

  if (!origin || !destination || !departureDate || !returnDate) {
    return res.status(400).json({
      error: 'Missing required fields: origin, destination, departureDate, returnDate',
    });
  }

  try {
    const flights = await searchFlights({
      origin,
      destination,
      departureDate,
      returnDate,
      adults: adults || 1,
    });
    res.json({ flights });
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
});

export default router;
