import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function generateItinerary({ destination, departureDate, returnDate, budget, accommodationPreference, travelStyle, interests, travellers, selectedFlight }) {
  const flightInfo = selectedFlight
    ? `Selected flight: ${selectedFlight.outbound.airline} - $${selectedFlight.price.total} ${selectedFlight.price.currency}, ${selectedFlight.outbound.duration} outbound`
    : 'No flight selected yet';

  const prompt = `You are an expert travel planner. Plan a detailed holiday itinerary for the following trip:

**Destination:** ${destination}
**Dates:** ${departureDate} to ${returnDate}
**Number of travellers:** ${travellers}
**Budget level:** ${budget}
**Accommodation preference:** ${accommodationPreference}
**Travel style:** ${travelStyle}
**Specific interests:** ${interests || 'None specified'}
**Flight info:** ${flightInfo}

Please search the web for up-to-date information and create a comprehensive travel plan. Include:

1. **Top spots to visit** — curated from travel blogs, TripAdvisor, Lonely Planet
2. **Events during travel dates** — local festivals, concerts, markets happening between ${departureDate} and ${returnDate}
3. **Accommodation recommendations** — 2-3 options matching "${accommodationPreference}" preference with estimated price per night in USD
4. **Food & restaurants** — famous local dishes, must-visit restaurants, street food areas
5. **Practical tips** — transport, safety, visa requirements, local customs

Then generate a **day-by-day itinerary** that:
- Groups nearby attractions together to minimise travel time
- Balances paid vs. free activities based on the "${budget}" budget level
- Includes morning / afternoon / evening breakdown per day
- Estimates daily spend (food + transport + activities) in USD
- Flags budget warnings if total estimated cost seems high

Finally, provide a **budget breakdown** with estimated costs for:
- Accommodation (total for the trip)
- Food (total for the trip)
- Activities/entrance fees (total)
- Local transport (total)
- Miscellaneous/tips

Respond ONLY with valid JSON in this exact structure (no markdown, no code fences):
{
  "tripSummary": {
    "destination": "string",
    "dates": "string",
    "totalEstimatedCost": "string (USD amount)",
    "budgetLevel": "string",
    "travellers": number
  },
  "dailyItinerary": [
    {
      "day": number,
      "date": "string",
      "theme": "string (e.g., 'Cultural Exploration')",
      "morning": { "activity": "string", "location": "string", "cost": "string", "tip": "string" },
      "afternoon": { "activity": "string", "location": "string", "cost": "string", "tip": "string" },
      "evening": { "activity": "string", "location": "string", "cost": "string", "tip": "string" },
      "estimatedDailySpend": "string"
    }
  ],
  "accommodation": [
    { "name": "string", "type": "string", "pricePerNight": "string", "description": "string", "area": "string" }
  ],
  "foodHighlights": [
    { "dish": "string", "restaurant": "string", "area": "string", "priceRange": "string", "description": "string" }
  ],
  "events": [
    { "name": "string", "date": "string", "location": "string", "description": "string", "cost": "string" }
  ],
  "budgetBreakdown": {
    "flights": "string",
    "accommodation": "string",
    "food": "string",
    "activities": "string",
    "transport": "string",
    "miscellaneous": "string",
    "total": "string"
  },
  "practicalTips": ["string"]
}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 10,
      },
    ],
    messages: [{ role: 'user', content: prompt }],
  });

  // Extract text content from response (may contain multiple content blocks)
  const textBlocks = response.content.filter(block => block.type === 'text');
  const rawText = textBlocks.map(block => block.text).join('');

  // Parse the JSON from the response, stripping any markdown code fences if present
  const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (parseError) {
    console.error('Failed to parse Claude response as JSON:', parseError.message);
    console.error('Raw response:', rawText.slice(0, 500));
    throw new Error('Failed to parse itinerary response. Please try again.');
  }
}
