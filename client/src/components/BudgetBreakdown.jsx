const CATEGORY_COLORS = {
  flights: 'bg-blue-500',
  accommodation: 'bg-indigo-500',
  food: 'bg-orange-500',
  activities: 'bg-green-500',
  transport: 'bg-yellow-500',
  miscellaneous: 'bg-gray-400',
};

const CATEGORY_LABELS = {
  flights: 'Flights',
  accommodation: 'Accommodation',
  food: 'Food & Dining',
  activities: 'Activities',
  transport: 'Local Transport',
  miscellaneous: 'Miscellaneous',
};

function parseCost(str) {
  if (!str) return 0;
  const match = String(str).match(/[\d,]+\.?\d*/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
}

export default function BudgetBreakdown({ breakdown }) {
  if (!breakdown) return null;

  const categories = ['flights', 'accommodation', 'food', 'activities', 'transport', 'miscellaneous'];
  const total = parseCost(breakdown.total);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Budget Breakdown</h3>

      {total > 0 && (
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">${total.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Estimated Total</div>
        </div>
      )}

      <div className="space-y-3">
        {categories.map(cat => {
          const amount = parseCost(breakdown[cat]);
          const pct = total > 0 ? (amount / total) * 100 : 0;

          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{CATEGORY_LABELS[cat]}</span>
                <span className="font-medium text-gray-800">{breakdown[cat] || '$0'}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${CATEGORY_COLORS[cat]} transition-all duration-500`}
                  style={{ width: `${Math.max(pct, 1)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
