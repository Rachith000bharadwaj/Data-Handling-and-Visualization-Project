'use client'

interface SummaryProps {
  prediction: string
  confidence: number
  yes_probability: number
  no_probability: number
}

export default function PredictionSummary({
  prediction,
  confidence,
  yes_probability,
  no_probability
}: SummaryProps) {
  const bgColor = prediction === 'Yes' 
    ? 'from-green-500 to-green-600'
    : 'from-red-500 to-red-600'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className={`bg-linear-to-br ${bgColor} text-white p-6 rounded-lg shadow-lg`}>
        <h4 className="text-sm opacity-90">Prediction</h4>
        <p className="text-4xl font-bold mt-2">
          {prediction === 'Yes' ? '✅ YES' : '❌ NO'}
        </p>
      </div>

      <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h4 className="text-sm opacity-90">Confidence</h4>
        <p className="text-4xl font-bold mt-2">{confidence.toFixed(1)}%</p>
      </div>

      <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
        <h4 className="text-sm opacity-90">Probability</h4>
        <div className="mt-2 space-y-1">
          <p className="text-sm">Yes: <span className="font-bold">{yes_probability.toFixed(1)}%</span></p>
          <p className="text-sm">No: <span className="font-bold">{no_probability.toFixed(1)}%</span></p>
        </div>
      </div>
    </div>
  )
}
