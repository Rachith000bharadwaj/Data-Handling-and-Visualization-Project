'use client'

interface VisualizationProps {
  feature_importance: {
    [key: string]: number
  }
  yes_probability: number
  no_probability: number
}

export default function VisualizationDashboard({
  feature_importance,
  yes_probability,
  no_probability
}: VisualizationProps) {
  const maxImportance = Math.max(...Object.values(feature_importance), 0)

  return (
    <section className="mt-12 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">
        📊 Visual Analysis
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4">Which Factors Matter Most?</h3>
          <div className="space-y-4">
            {Object.entries(feature_importance).map(([feature, importance]) => (
              <div key={feature}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-gray-700">{feature}</span>
                  <span className="font-bold text-gray-800">
                    {(importance * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                    style={{ width: `${(importance / maxImportance) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
</div>

<div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4">Probability Distribution</h3>
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-full max-w-xs">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Will Order</span>
                <span className="font-bold text-green-600">{yes_probability.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-linear-to-r from-green-400 to-green-600 h-full rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ width: `${yes_probability}%` }}
                >
                  {yes_probability > 20 && `${yes_probability.toFixed(0)}%`}
                </div>
              </div>
            </div>

            <div className="w-full max-w-xs">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Won't Order</span>
                <span className="font-bold text-red-600">{no_probability.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-linear-to-r from-red-400 to-red-600 h-full rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ width: `${no_probability}%` }}
                >
                  {no_probability > 20 && `${no_probability.toFixed(0)}%`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
