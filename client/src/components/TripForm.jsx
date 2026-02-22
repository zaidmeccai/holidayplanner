import { useState } from 'react';

const BUDGET_OPTIONS = [
  { value: 'low', label: 'Budget', desc: 'Hostels, street food, free attractions' },
  { value: 'medium', label: 'Mid-Range', desc: 'Hotels, restaurants, paid attractions' },
  { value: 'high', label: 'Luxury', desc: 'Premium hotels, fine dining, VIP experiences' },
];

const ACCOMMODATION_OPTIONS = [
  { value: 'hostel', label: 'Hostel' },
  { value: 'budget hotel', label: 'Budget Hotel' },
  { value: 'mid-range', label: 'Mid-Range Hotel' },
  { value: 'luxury', label: 'Luxury Hotel' },
];

const STYLE_OPTIONS = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'foodie', label: 'Foodie' },
  { value: 'mixed', label: 'Mixed' },
];

export default function TripForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    travellers: 1,
    budget: 'medium',
    accommodationPreference: 'mid-range',
    travelStyle: 'mixed',
    interests: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Plan Your Perfect Holiday</h2>
        <p className="mt-2 text-gray-500">
          Tell us about your trip and we'll create a personalised itinerary
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Origin & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origin City
            </label>
            <input
              type="text"
              name="origin"
              value={form.origin}
              onChange={handleChange}
              placeholder="e.g. London"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination City / Country
            </label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="e.g. Tokyo"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure Date
            </label>
            <input
              type="date"
              name="departureDate"
              value={form.departureDate}
              onChange={handleChange}
              min={today}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={form.returnDate}
              onChange={handleChange}
              min={form.departureDate || today}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>
        </div>

        {/* Travellers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Travellers
          </label>
          <input
            type="number"
            name="travellers"
            value={form.travellers}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Budget Level</label>
          <div className="grid grid-cols-3 gap-3">
            {BUDGET_OPTIONS.map(opt => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setForm(prev => ({ ...prev, budget: opt.value }))}
                className={`p-3 rounded-lg border-2 text-left transition ${
                  form.budget === opt.value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{opt.label}</div>
                <div className="text-xs text-gray-500 mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Accommodation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Accommodation Preference
          </label>
          <select
            name="accommodationPreference"
            value={form.accommodationPreference}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          >
            {ACCOMMODATION_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Travel Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map(opt => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setForm(prev => ({ ...prev, travelStyle: opt.value }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  form.travelStyle === opt.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specific Interests <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            name="interests"
            value={form.interests}
            onChange={handleChange}
            placeholder="e.g. beaches, museums, nightlife, hiking"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Searching Flights...
            </>
          ) : (
            'Search Flights'
          )}
        </button>
      </form>
    </div>
  );
}
