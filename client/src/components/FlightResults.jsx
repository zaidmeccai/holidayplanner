function formatDuration(iso) {
  if (!iso) return '';
  // PT2H30M -> 2h 30m
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const hours = match[1] || '0';
  const mins = match[2] || '0';
  return `${hours}h ${mins}m`;
}

function formatTime(dateTimeStr) {
  if (!dateTimeStr) return '';
  const d = new Date(dateTimeStr);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDate(dateTimeStr) {
  if (!dateTimeStr) return '';
  const d = new Date(dateTimeStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function FlightResults({ flights, onSelect, onSkip, tripData }) {
  if (!flights || flights.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Flights Found</h2>
          <p className="text-gray-500 mb-6">
            We couldn't find flights for this route. You can still generate an itinerary without flight selection.
          </p>
          <button
            onClick={onSkip}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Continue Without Flight
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Flights to {tripData.destination}
        </h2>
        <p className="text-gray-500 mt-1">Select a flight to include in your itinerary</p>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 cursor-pointer border-2 border-transparent hover:border-indigo-300"
            onClick={() => onSelect(flight)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Outbound */}
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    Outbound
                  </span>
                  <span className="font-semibold text-sm text-gray-700">
                    {flight.outbound.airline}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div>
                    <div className="font-bold text-lg">{formatTime(flight.outbound.departure.at)}</div>
                    <div className="text-gray-400 text-xs">{formatDate(flight.outbound.departure.at)}</div>
                    <div className="text-gray-500 text-xs">{flight.outbound.departure.iataCode}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-400">{formatDuration(flight.outbound.duration)}</div>
                    <div className="w-full h-px bg-gray-300 my-1 relative">
                      <div className="absolute inset-y-0 right-0 w-0 h-0 border-l-4 border-l-gray-400 border-y-4 border-y-transparent -top-1" />
                    </div>
                    <div className="text-xs text-gray-400">
                      {flight.outbound.stops === 0 ? 'Direct' : `${flight.outbound.stops} stop${flight.outbound.stops > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{formatTime(flight.outbound.arrival.at)}</div>
                    <div className="text-gray-400 text-xs">{formatDate(flight.outbound.arrival.at)}</div>
                    <div className="text-gray-500 text-xs">{flight.outbound.arrival.iataCode}</div>
                  </div>
                </div>

                {/* Inbound */}
                {flight.inbound && (
                  <>
                    <div className="flex items-center gap-4 mt-4 mb-3">
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        Return
                      </span>
                      <span className="font-semibold text-sm text-gray-700">
                        {flight.inbound.airline}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div>
                        <div className="font-bold text-lg">{formatTime(flight.inbound.departure.at)}</div>
                        <div className="text-gray-400 text-xs">{formatDate(flight.inbound.departure.at)}</div>
                        <div className="text-gray-500 text-xs">{flight.inbound.departure.iataCode}</div>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <div className="text-xs text-gray-400">{formatDuration(flight.inbound.duration)}</div>
                        <div className="w-full h-px bg-gray-300 my-1" />
                        <div className="text-xs text-gray-400">
                          {flight.inbound.stops === 0 ? 'Direct' : `${flight.inbound.stops} stop${flight.inbound.stops > 1 ? 's' : ''}`}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{formatTime(flight.inbound.arrival.at)}</div>
                        <div className="text-gray-400 text-xs">{formatDate(flight.inbound.arrival.at)}</div>
                        <div className="text-gray-500 text-xs">{flight.inbound.arrival.iataCode}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Price */}
              <div className="ml-6 text-right flex-shrink-0">
                <div className="text-2xl font-bold text-indigo-600">
                  ${flight.price.total}
                </div>
                <div className="text-xs text-gray-400">{flight.price.currency}</div>
                <div className="text-xs text-gray-400 mt-1">per person</div>
                <button className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={onSkip}
          className="text-sm text-gray-500 hover:text-indigo-600 underline transition"
        >
          Skip flight selection and generate itinerary
        </button>
      </div>
    </div>
  );
}
