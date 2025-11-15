'use client'

import { useState } from 'react'

interface FormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export default function PredictionForm({ onSubmit, isLoading }: FormProps) {
  const [formData, setFormData] = useState({
    cuisine: 'Italian',
    timeOfDay: 'Lunch',
    weather: 'Sunny',
    hungerLevel: 'Medium',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-linear-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🍽️ Will You Order Food?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cuisine Type
          </label>
          <select
            value={formData.cuisine}
            onChange={(e) => handleChange('cuisine', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          >
            <option value="Italian">🇮🇹 Italian</option>
            <option value="Mexican">🇲🇽 Mexican</option>
            <option value="Indian">🇮🇳 Indian</option>
            <option value="Chinese">🇨🇳 Chinese</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Time of Day
          </label>
          <select
            value={formData.timeOfDay}
            onChange={(e) => handleChange('timeOfDay', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          >
            <option value="Breakfast">🌅 Breakfast</option>
            <option value="Lunch">☀️ Lunch</option>
            <option value="Dinner">🌆 Dinner</option>
            <option value="LateNight">🌙 Late Night</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Weather
          </label>
          <select
            value={formData.weather}
            onChange={(e) => handleChange('weather', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          >
            <option value="Sunny">☀️ Sunny</option>
            <option value="Cloudy">☁️ Cloudy</option>
            <option value="Rainy">🌧️ Rainy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hunger Level
          </label>
          <select
            value={formData.hungerLevel}
            onChange={(e) => handleChange('hungerLevel', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          >
            <option value="Low">😐 Low</option>
            <option value="Medium">😋 Medium</option>
            <option value="High">😍 High</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-6 py-3 rounded-lg font-bold text-white text-lg transition-all ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
        }`}
      >
        {isLoading ? '🔄 Analyzing...' : '🎯 Predict Order'}
      </button>
    </form>
  )
}
