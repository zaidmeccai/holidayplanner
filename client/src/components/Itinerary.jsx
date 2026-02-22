import { useState } from 'react';
import BudgetBreakdown from './BudgetBreakdown.jsx';

function TripSummaryCard({ summary, selectedFlight }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">{summary.destination}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="text-indigo-200">Dates</div>
          <div className="font-semibold">{summary.dates}</div>
        </div>
        <div>
          <div className="text-indigo-200">Travellers</div>
          <div className="font-semibold">{summary.travellers}</div>
        </div>
        <div>
          <div className="text-indigo-200">Budget Level</div>
          <div className="font-semibold capitalize">{summary.budgetLevel}</div>
        </div>
        <div>
          <div className="text-indigo-200">Est. Total Cost</div>
          <div className="font-semibold">{summary.totalEstimatedCost}</div>
        </div>
      </div>
      {selectedFlight && (
        <div className="mt-4 pt-4 border-t border-indigo-400">
          <div className="text-indigo-200 text-xs mb-1">Selected Flight</div>
          <div className="text-sm">
            {selectedFlight.outbound.airline} &mdash; ${selectedFlight.price.total} {selectedFlight.price.currency}
          </div>
        </div>
      )}
    </div>
  );
}

function DayCard({ day }) {
  const [expanded, setExpanded] = useState(false);

  const slots = [
    { label: 'Morning', data: day.morning, color: 'bg-amber-50 border-amber-200', icon: '&#9728;' },
    { label: 'Afternoon', data: day.afternoon, color: 'bg-sky-50 border-sky-200', icon: '&#9788;' },
    { label: 'Evening', data: day.evening, color: 'bg-violet-50 border-violet-200', icon: '&#9790;' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
            D{day.day}
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-800">{day.theme}</div>
            <div className="text-xs text-gray-400">{day.date}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-indigo-600">{day.estimatedDailySpend}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {slots.map(({ label, data, color, icon }) => (
            data && (
              <div key={label} className={`rounded-lg border p-3 ${color}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span dangerouslySetInnerHTML={{ __html: icon }} />
                  <span className="text-xs font-semibold text-gray-600 uppercase">{label}</span>
                </div>
                <div className="font-medium text-gray-800 text-sm">{data.activity}</div>
                {data.location && (
                  <div className="text-xs text-gray-500 mt-1">{data.location}</div>
                )}
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  {data.cost && <span>Cost: {data.cost}</span>}
                  {data.tip && <span>&mdash; {data.tip}</span>}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

function AccommodationSection({ accommodation }) {
  if (!accommodation || accommodation.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Accommodation Recommendations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accommodation.map((place, i) => (
          <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="font-semibold text-gray-800">{place.name}</div>
            <div className="text-xs text-indigo-600 font-medium mt-1">{place.type}</div>
            <div className="text-sm text-gray-500 mt-2">{place.description}</div>
            <div className="flex justify-between items-center mt-3 text-sm">
              <span className="text-gray-400">{place.area}</span>
              <span className="font-bold text-gray-800">{place.pricePerNight}/night</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodSection({ foodHighlights }) {
  if (!foodHighlights || foodHighlights.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Food Highlights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {foodHighlights.map((item, i) => (
          <div key={i} className="flex gap-3 p-3 border rounded-lg">
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{item.dish}</div>
              <div className="text-sm text-indigo-600">{item.restaurant}</div>
              <div className="text-xs text-gray-500 mt-1">{item.description}</div>
              <div className="flex gap-3 mt-2 text-xs text-gray-400">
                <span>{item.area}</span>
                <span>{item.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsSection({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Events During Your Trip</h3>
      <div className="space-y-3">
        {events.map((event, i) => (
          <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-xs flex-shrink-0">
              {event.date ? event.date.split(' ').slice(-1) : 'TBD'}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{event.name}</div>
              <div className="text-sm text-gray-500">{event.description}</div>
              <div className="flex gap-3 mt-1 text-xs text-gray-400">
                <span>{event.location}</span>
                {event.cost && <span>Cost: {event.cost}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticalTips({ tips }) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Practical Tips</h3>
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-indigo-500 mt-0.5 flex-shrink-0">&#10003;</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function generatePlainText(itinerary, selectedFlight) {
  const lines = [];
  const s = itinerary.tripSummary;

  lines.push(`=== HOLIDAY ITINERARY: ${s.destination} ===`);
  lines.push(`Dates: ${s.dates}`);
  lines.push(`Travellers: ${s.travellers}`);
  lines.push(`Budget: ${s.budgetLevel}`);
  lines.push(`Estimated Total: ${s.totalEstimatedCost}`);
  if (selectedFlight) {
    lines.push(`Flight: ${selectedFlight.outbound.airline} - $${selectedFlight.price.total}`);
  }
  lines.push('');

  if (itinerary.dailyItinerary) {
    lines.push('--- DAY-BY-DAY SCHEDULE ---');
    for (const day of itinerary.dailyItinerary) {
      lines.push('');
      lines.push(`Day ${day.day}: ${day.theme} (${day.date})`);
      lines.push(`  Est. spend: ${day.estimatedDailySpend}`);
      if (day.morning) lines.push(`  Morning: ${day.morning.activity} @ ${day.morning.location} (${day.morning.cost})`);
      if (day.afternoon) lines.push(`  Afternoon: ${day.afternoon.activity} @ ${day.afternoon.location} (${day.afternoon.cost})`);
      if (day.evening) lines.push(`  Evening: ${day.evening.activity} @ ${day.evening.location} (${day.evening.cost})`);
    }
    lines.push('');
  }

  if (itinerary.accommodation) {
    lines.push('--- ACCOMMODATION ---');
    for (const a of itinerary.accommodation) {
      lines.push(`  ${a.name} (${a.type}) - ${a.pricePerNight}/night - ${a.area}`);
    }
    lines.push('');
  }

  if (itinerary.budgetBreakdown) {
    const b = itinerary.budgetBreakdown;
    lines.push('--- BUDGET BREAKDOWN ---');
    lines.push(`  Flights: ${b.flights}`);
    lines.push(`  Accommodation: ${b.accommodation}`);
    lines.push(`  Food: ${b.food}`);
    lines.push(`  Activities: ${b.activities}`);
    lines.push(`  Transport: ${b.transport}`);
    lines.push(`  Miscellaneous: ${b.miscellaneous}`);
    lines.push(`  TOTAL: ${b.total}`);
  }

  return lines.join('\n');
}

export default function Itinerary({ itinerary, selectedFlight, onRegenerate, onStartOver }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = generatePlainText(itinerary, selectedFlight);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownloadPDF() {
    const text = generatePlainText(itinerary, selectedFlight);
    // Create a simple printable HTML and trigger print dialog (browser PDF export)
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Holiday Itinerary - ${itinerary.tripSummary.destination}</title>
        <style>body{font-family:system-ui,sans-serif;padding:40px;line-height:1.6;white-space:pre-wrap;font-size:13px;}</style></head>
        <body>${text}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <TripSummaryCard summary={itinerary.tripSummary} selectedFlight={selectedFlight} />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          {copied ? 'Copied!' : 'Copy as Text'}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Download PDF
        </button>
        <button
          onClick={onRegenerate}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Regenerate Itinerary
        </button>
        <button
          onClick={onStartOver}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
        >
          New Trip
        </button>
      </div>

      {/* Day-by-Day */}
      {itinerary.dailyItinerary && itinerary.dailyItinerary.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Day-by-Day Schedule</h3>
          <div className="space-y-3">
            {itinerary.dailyItinerary.map((day, i) => (
              <DayCard key={i} day={day} />
            ))}
          </div>
        </div>
      )}

      {/* Two-column layout for Budget + Accommodation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetBreakdown breakdown={itinerary.budgetBreakdown} />
        <AccommodationSection accommodation={itinerary.accommodation} />
      </div>

      {/* Food Highlights */}
      <FoodSection foodHighlights={itinerary.foodHighlights} />

      {/* Events */}
      <EventsSection events={itinerary.events} />

      {/* Practical Tips */}
      <PracticalTips tips={itinerary.practicalTips} />
    </div>
  );
}
