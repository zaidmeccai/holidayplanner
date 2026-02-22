import { useState, useEffect } from 'react';

const MESSAGES = [
  'Searching the web for travel recommendations...',
  'Finding the best spots to visit...',
  'Looking up local events and festivals...',
  'Researching restaurants and food guides...',
  'Checking accommodation options...',
  'Optimising your day-by-day itinerary...',
  'Balancing your budget across activities...',
  'Putting the finishing touches on your plan...',
];

export default function LoadingScreen({ destination }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-lg mx-auto text-center py-16">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-6">
          <svg className="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Planning your trip to {destination}
        </h2>

        <p className="text-gray-500 transition-all duration-500 min-h-[1.5rem]">
          {MESSAGES[messageIndex]}
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mb-8">
        {MESSAGES.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= messageIndex ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-gray-400">
        This may take up to 30 seconds as we search the web for the latest information
      </p>
    </div>
  );
}
