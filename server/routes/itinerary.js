import { Router } from 'express';
import { generateItinerary } from '../services/claudeService.js';

const router = Router();

router.post('/generate', async (req, res) => {
  const {
    destination,
    departureDate,
    returnDate,
    budget,
    accommodationPreference,
    travelStyle,
    interests,
    travellers,
    selectedFlight,
  } = req.body;

  if (!destination || !departureDate || !returnDate) {
    return res.status(400).json({
      error: 'Missing required fields: destination, departureDate, returnDate',
    });
  }

  try {
    const itinerary = await generateItinerary({
      destination,
      departureDate,
      returnDate,
      budget: budget || 'medium',
      accommodationPreference: accommodationPreference || 'mid-range',
      travelStyle: travelStyle || 'mixed',
      interests: interests || '',
      travellers: travellers || 1,
      selectedFlight: selectedFlight || null,
    });
    res.json({ itinerary });
  } catch (error) {
    console.error('Itinerary generation error:', error);
    res.status(502).json({ error: error.message });
  }
});

export default router;
