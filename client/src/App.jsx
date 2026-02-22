import { useState } from 'react';
import TripForm from './components/TripForm.jsx';
import FlightResults from './components/FlightResults.jsx';
import Itinerary from './components/Itinerary.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

const API_BASE = '/api';

const STEPS = {
  FORM: 'form',
  FLIGHTS: 'flights',
  LOADING_ITINERARY: 'loading_itinerary',
  ITINERARY: 'itinerary',
};

export default function App() {
  const [step, setStep] = useState(STEPS.FORM);
  const [tripData, setTripData] = useState(null);
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [loadingFlights, setLoadingFlights] = useState(false);

  async function handleTripSubmit(formData) {
    setError(null);
    setTripData(formData);
    setLoadingFlights(true);

    try {
      const res = await fetch(`${API_BASE}/flights/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: formData.origin,
          destination: formData.destination,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate,
          adults: formData.travellers,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to search flights');
      }

      const data = await res.json();
      setFlights(data.flights);
      setStep(STEPS.FLIGHTS);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingFlights(false);
    }
  }

  async function handleFlightSelect(flight) {
    setSelectedFlight(flight);
    setStep(STEPS.LOADING_ITINERARY);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/itinerary/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tripData,
          selectedFlight: flight,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate itinerary');
      }

      const data = await res.json();
      setItinerary(data.itinerary);
      setStep(STEPS.ITINERARY);
    } catch (err) {
      setError(err.message);
      setStep(STEPS.FLIGHTS);
    }
  }

  async function handleSkipFlights() {
    setSelectedFlight(null);
    setStep(STEPS.LOADING_ITINERARY);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/itinerary/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tripData,
          selectedFlight: null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate itinerary');
      }

      const data = await res.json();
      setItinerary(data.itinerary);
      setStep(STEPS.ITINERARY);
    } catch (err) {
      setError(err.message);
      setStep(STEPS.FLIGHTS);
    }
  }

  function handleRegenerate() {
    setStep(STEPS.LOADING_ITINERARY);
    setError(null);
    handleFlightSelect(selectedFlight);
  }

  function handleStartOver() {
    setStep(STEPS.FORM);
    setTripData(null);
    setFlights([]);
    setSelectedFlight(null);
    setItinerary(null);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
            onClick={handleStartOver}
          >
            Holiday Planner
          </h1>
          {step !== STEPS.FORM && (
            <button
              onClick={handleStartOver}
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {step === STEPS.FORM && (
          <TripForm onSubmit={handleTripSubmit} loading={loadingFlights} />
        )}

        {step === STEPS.FLIGHTS && (
          <FlightResults
            flights={flights}
            onSelect={handleFlightSelect}
            onSkip={handleSkipFlights}
            tripData={tripData}
          />
        )}

        {step === STEPS.LOADING_ITINERARY && (
          <LoadingScreen destination={tripData?.destination} />
        )}

        {step === STEPS.ITINERARY && itinerary && (
          <Itinerary
            itinerary={itinerary}
            selectedFlight={selectedFlight}
            onRegenerate={handleRegenerate}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
}
