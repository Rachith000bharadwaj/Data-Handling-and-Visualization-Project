import { useState } from 'react';
import axios from 'axios';

const Playground = () => {
  const [inputs, setInputs] = useState({
    cuisine: '',
    timeOfDay: '',
    weather: '',
    hungerLevel: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cuisines = ['Italian', 'Chinese', 'Indian', 'Mexican'];
  const times = ['Breakfast', 'Lunch', 'Dinner', 'LateNight'];
  const weathers = ['Sunny', 'Cloudy', 'Rainy'];
  const hungerLevels = ['Low', 'Medium', 'High'];

  const handleChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const getPrediction = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5000/api/predict', {
        cuisine: inputs.cuisine,
        timeOfDay: inputs.timeOfDay,
        weather: inputs.weather,
        hungerLevel: inputs.hungerLevel
      });
      setResult(res.data);
    } catch (e) {
      setError(e.response?.data?.error || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-br from-purple-500 to-indigo-600 shadow-xl rounded-2xl p-8 mb-10 text-white max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        Playground 🎯
      </h2>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-200 font-semibold mb-2">Cuisine</label>
          <select value={inputs.cuisine} onChange={e => handleChange('cuisine', e.target.value)}
            className="w-full px-4 py-2 rounded-xl text-gray-800">
            <option value="">Select</option>
            {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-gray-200 font-semibold mb-2">Time of Day</label>
          <select value={inputs.timeOfDay} onChange={e => handleChange('timeOfDay', e.target.value)}
            className="w-full px-4 py-2 rounded-xl text-gray-800">
            <option value="">Select</option>
            {times.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-gray-200 font-semibold mb-2">Weather</label>
          <select value={inputs.weather} onChange={e => handleChange('weather', e.target.value)}
            className="w-full px-4 py-2 rounded-xl text-gray-800">
            <option value="">Select</option>
            {weathers.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-gray-200 font-semibold mb-2">Hunger Level</label>
          <select value={inputs.hungerLevel} onChange={e => handleChange('hungerLevel', e.target.value)}
            className="w-full px-4 py-2 rounded-xl text-gray-800">
            <option value="">Select</option>
            {hungerLevels.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded mb-3">{error}</div>
      )}
      <button onClick={getPrediction} disabled={loading}
        className="w-full bg-linear-to-r from-purple-700 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-purple-800 hover:to-indigo-700 transition-all disabled:opacity-50">
        {loading ? "Predicting..." : "Predict"}
      </button>
      {result && (
        <div className="mt-6 bg-white rounded-xl p-6 text-gray-900 text-center">
          <div className="mb-3 text-6xl">
            {result.prediction === 'Yes' || result.prediction === 'yes' ? '✅' : '❌'}
          </div>
          <div className="text-2xl font-bold mb-2">
            {result.prediction ? String(result.prediction).toUpperCase() : ''}
          </div>
          <div className="text-lg">Confidence: {(result.confidence ?? 0).toFixed(1)}%</div>
          <div className="text-md text-gray-500 mt-2">
            Will order: {(result.yes_probability ?? result.probability_yes ?? 0).toFixed(1)}%<br/>
            Won't order: {(result.no_probability ?? result.probability_no ?? 0).toFixed(1)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default Playground;
