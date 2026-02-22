import Amadeus from 'amadeus';

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Map common city names to IATA codes
const CITY_CODES = {
  'london': 'LON', 'paris': 'PAR', 'new york': 'NYC', 'tokyo': 'TYO',
  'los angeles': 'LAX', 'chicago': 'CHI', 'san francisco': 'SFO',
  'miami': 'MIA', 'sydney': 'SYD', 'rome': 'ROM', 'barcelona': 'BCN',
  'berlin': 'BER', 'amsterdam': 'AMS', 'dubai': 'DXB', 'singapore': 'SIN',
  'hong kong': 'HKG', 'bangkok': 'BKK', 'istanbul': 'IST', 'mumbai': 'BOM',
  'delhi': 'DEL', 'toronto': 'YYZ', 'vancouver': 'YVR', 'seoul': 'ICN',
  'madrid': 'MAD', 'lisbon': 'LIS', 'athens': 'ATH', 'cairo': 'CAI',
  'cape town': 'CPT', 'rio de janeiro': 'GIG', 'buenos aires': 'EZE',
  'mexico city': 'MEX', 'lima': 'LIM', 'bogota': 'BOG', 'nairobi': 'NBO',
  'kuala lumpur': 'KUL', 'bali': 'DPS', 'phuket': 'HKT', 'hanoi': 'HAN',
  'ho chi minh': 'SGN', 'taipei': 'TPE', 'osaka': 'KIX', 'beijing': 'PEK',
  'shanghai': 'PVG', 'moscow': 'MOW', 'dublin': 'DUB', 'edinburgh': 'EDI',
  'zurich': 'ZRH', 'vienna': 'VIE', 'prague': 'PRG', 'budapest': 'BUD',
  'warsaw': 'WAW', 'copenhagen': 'CPH', 'stockholm': 'STO', 'oslo': 'OSL',
  'helsinki': 'HEL', 'reykjavik': 'KEF',
};

function resolveAirportCode(city) {
  const lower = city.toLowerCase().trim();
  // If it's already an IATA code (3 uppercase letters), return it
  if (/^[A-Z]{3}$/.test(city.trim())) return city.trim();
  return CITY_CODES[lower] || city.trim().toUpperCase().slice(0, 3);
}

export async function searchFlights({ origin, destination, departureDate, returnDate, adults }) {
  const originCode = resolveAirportCode(origin);
  const destinationCode = resolveAirportCode(destination);

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate,
      returnDate,
      adults: adults || 1,
      max: 5,
      currencyCode: 'USD',
    });

    return response.data.map(offer => {
      const outbound = offer.itineraries[0];
      const inbound = offer.itineraries[1];

      return {
        id: offer.id,
        price: {
          total: offer.price.total,
          currency: offer.price.currency,
        },
        outbound: {
          departure: outbound.segments[0].departure,
          arrival: outbound.segments[outbound.segments.length - 1].arrival,
          duration: outbound.duration,
          stops: outbound.segments.length - 1,
          airline: outbound.segments[0].carrierCode,
          segments: outbound.segments,
        },
        inbound: inbound ? {
          departure: inbound.segments[0].departure,
          arrival: inbound.segments[inbound.segments.length - 1].arrival,
          duration: inbound.duration,
          stops: inbound.segments.length - 1,
          airline: inbound.segments[0].carrierCode,
          segments: inbound.segments,
        } : null,
      };
    });
  } catch (error) {
    console.error('Amadeus API error:', error.response?.result || error.message);
    throw new Error(
      error.response?.result?.errors?.[0]?.detail ||
      'Failed to search flights. Please check your inputs and try again.'
    );
  }
}
