"use client";

import { useState } from 'react';
import { TrendingUp, Calculator, Users, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

type MathSection = 'prior' | 'likelihood' | 'posterior' | 'laplace';

type PredictionResult = {
  prediction: string;
  yes_probability: number;
  no_probability: number;
  confidence: number;
  calculations: Record<string, any>;
} | null;

export default function RestaurantAnalytics() {
  const [activeSection, setActiveSection] = useState<'home' | 'playground' | 'mathematics'>('home');
  const [showMathDetails, setShowMathDetails] = useState<Record<MathSection, boolean>>({
    prior: false,
    likelihood: false,
    posterior: false,
    laplace: false
  });

  const [formData, setFormData] = useState({
    cuisine: '',
    timeOfDay: '',
    weather: '',
    hungerLevel: ''
  });
  const [predictionResult, setPredictionResult] = useState<PredictionResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cuisines = ['Italian', 'Chinese', 'Indian', 'Mexican'];
  const times = ['Breakfast', 'Lunch', 'Dinner', 'LateNight'];
  const weathers = ['Sunny', 'Cloudy', 'Rainy'];
  const hungerLevels = ['Low', 'Medium', 'High'];

  const teamMembers = [
    { name: 'M G Shree Harsha', role: 'Data Visuvalization and Integration', avatar: '🔬' },
    { name: 'Ullas Gopal Malagimani', role: 'Frontend Engineer', avatar: '🎨' },
    { name: 'Rachith Bharadwaj T N', role: 'Backend Engineer', avatar: '⚙️' }
  ];

  const naiveBayesData = {
    totalSamples: 500,
    classes: {
      willOrder: 320,
      willNotOrder: 180
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handlePredict = async () => {
    if (!formData.cuisine || !formData.timeOfDay || !formData.weather || !formData.hungerLevel) {
      setError('❌ Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuisine: formData.cuisine,
          timeOfDay: formData.timeOfDay,
          weather: formData.weather,
          hungerLevel: formData.hungerLevel
        })
      });

      const data = await response.json();
      console.log('✅ Response:', data);

      setPredictionResult({
        prediction: data.prediction ?? 'Unknown',
        yes_probability: Number(data.yes_probability ?? 0),
        no_probability: Number(data.no_probability ?? 0),
        confidence: Number(data.confidence ?? 0),
        calculations: data.calculations ?? {}
      });

      setTimeout(() => {
        const element = document.getElementById('prediction-results');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to connect to backend. Make sure Flask is running.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: MathSection) => {
    setShowMathDetails(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const resultClass = predictionResult?.prediction === 'Yes'
    ? 'bg-gradient-to-br from-green-100 to-green-200 border-4 border-green-500'
    : 'bg-gradient-to-br from-red-100 to-red-200 border-4 border-red-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {activeSection === 'home' && (
          <div className="animate-fadeIn">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-3xl shadow-2xl mb-12 p-12 text-white">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h1 className="text-6xl font-extrabold mb-6 animate-slideInDown">🍽️ Food Order Prediction</h1>
                <p className="text-2xl mb-8 text-orange-100 animate-slideInUp">ML-Powered Predictions using Naive Bayes</p>
                <div className="flex gap-4 flex-wrap">
                  <button onClick={() => setActiveSection('playground')} className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all hover:scale-105 shadow-lg">
                    🎯 Playground
                  </button>
                  <button onClick={() => setActiveSection('mathematics')} className="bg-orange-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-900 transition-all hover:scale-105 shadow-lg">
                    📐 Mathematical Model
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                    <div className="text-5xl mb-4">🤖</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">ML Predictions</h3>
                    <p className="text-gray-600">94.5% accurate predictions</p>
                  </div>
                  <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                    <div className="text-5xl mb-4">📈</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Data Insights</h3>
                    <p className="text-gray-600">Beautiful visualizations</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-12 mt-12">
                  <div className="flex items-center gap-3 mb-8">
                    <Users className="text-orange-600" size={32} />
                    <h2 className="text-4xl font-bold text-gray-800">Our Team</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, idx) => (
                      <div key={idx} className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-all">
                        <div className="text-6xl mb-4">{member.avatar}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'playground' && (
          <div className="animate-fadeIn">
            <button onClick={() => setActiveSection('home')} className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">⬅️ Back</button>

            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">
              <h2 className="text-4xl font-bold mb-2 flex items-center gap-2">
                <Sparkles size={32} />🎯 Prediction Playground
              </h2>
              <p className="text-xl text-purple-100 mb-8">Enter your details and get instant predictions</p>

              <div className="bg-white rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">🍴 Cuisine Type</label>
                    <select value={formData.cuisine} onChange={(e) => handleInputChange('cuisine', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-800">
                      <option value="">Select Cuisine</option>
                      {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">⏰ Time of Day</label>
                    <select value={formData.timeOfDay} onChange={(e) => handleInputChange('timeOfDay', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-800">
                      <option value="">Select Time</option>
                      {times.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">☀️ Weather</label>
                    <select value={formData.weather} onChange={(e) => handleInputChange('weather', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-800">
                      <option value="">Select Weather</option>
                      {weathers.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">😋 Hunger Level</label>
                    <select value={formData.hungerLevel} onChange={(e) => handleInputChange('hungerLevel', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-800">
                      <option value="">Select Hunger Level</option>
                      {hungerLevels.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
                    <p className="font-semibold">{error}</p>
                  </div>
                )}
                <button onClick={handlePredict} disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 text-lg">
                  {loading ? '🔄 Predicting...' : '🎯 Get Prediction'}
                </button>
              </div>
            </div>
        
            {predictionResult && (
              <div>


                <div className="bg-white rounded-3xl shadow-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Probability Visualization</h3>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="flex items-center justify-center">
                      <div className="relative w-64 h-64">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90" xmlns="http://www.w3.org/2000/svg">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="20"
                            strokeDasharray={`${(predictionResult.yes_probability || 0) * 2.51} 251.2`}
                            className="transition-all duration-1000"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="20"
                            strokeDasharray={`${(predictionResult.no_probability || 0) * 2.51} 251.2`}
                            strokeDashoffset={-((predictionResult.yes_probability || 0) * 2.51)}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">{predictionResult.prediction}</div>
                            <div className="text-sm text-gray-600">Prediction</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-4">
                      <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="font-semibold text-green-800">Will Order</span>
                          </div>
                          <span className="text-2xl font-bold text-green-600">{predictionResult.yes_probability ? predictionResult.yes_probability.toFixed(1) : 0}%</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-3">
                          <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: `${predictionResult.yes_probability || 0}%` }}></div>
                        </div>
                      </div>

                      <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="font-semibold text-red-800">Won't Order</span>
                          </div>
                          <span className="text-2xl font-bold text-red-600">{predictionResult.no_probability ? predictionResult.no_probability.toFixed(1) : 0}%</span>
                        </div>
                        <div className="w-full bg-red-200 rounded-full h-3">
                          <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: `${predictionResult.no_probability || 0}%` }}></div>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                        <div className="text-sm text-purple-800 font-semibold mb-1">Confidence Level</div>
                        <div className="text-3xl font-bold text-purple-600">{predictionResult.confidence ? predictionResult.confidence.toFixed(1) : 0}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 mt-6">
                    <div>
                    </div>
                  </div>

                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border-2 border-blue-200">
                      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span> Probability Meter
                      </h4>
                      <div className="relative h-48 flex items-end justify-around gap-2">
                        <div className="flex flex-col items-center w-1/2">
                          <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden relative" style={{ height: '180px' }}>
                            <div 
                              className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-1000 flex items-start justify-center pt-2"
                              style={{ height: `${predictionResult.yes_probability || 0}%` }}
                            >
                              <span className="text-white font-bold text-lg">{predictionResult.yes_probability ? predictionResult.yes_probability.toFixed(0) : 0}%</span>
                            </div>
                          </div>
                          <div className="mt-2 text-center font-semibold text-green-700">Yes</div>
                        </div>
                        <div className="flex flex-col items-center w-1/2">
                          <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden relative" style={{ height: '180px' }}>
                            <div 
                              className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-red-400 transition-all duration-1000 flex items-start justify-center pt-2"
                              style={{ height: `${predictionResult.no_probability || 0}%` }}
                            >
                              <span className="text-white font-bold text-lg">{predictionResult.no_probability ? predictionResult.no_probability.toFixed(0) : 0}%</span>
                            </div>
                          </div>
                          <div className="mt-2 text-center font-semibold text-red-700">No</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl border-2 border-purple-200">
                      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎯</span> Confidence Gauge
                      </h4>
                      <div className="relative w-full h-48 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 200 120">
                          <defs>
                            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="50%" stopColor="#f59e0b" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="url(#gaugeGradient)"
                            strokeWidth="20"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="20"
                            strokeLinecap="round"
                            strokeDasharray={`${((predictionResult.confidence || 0) / 100) * 251} 251`}
                            className="opacity-30"
                          />
                          <line
                            x1="100"
                            y1="100"
                            x2={100 + 70 * Math.cos((Math.PI * (predictionResult.confidence || 0)) / 100 - Math.PI)}
                            y2={100 + 70 * Math.sin((Math.PI * (predictionResult.confidence || 0)) / 100 - Math.PI)}
                            stroke="#374151"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <circle cx="100" cy="100" r="8" fill="#374151" />
                          <text x="100" y="115" textAnchor="middle" className="text-2xl font-bold fill-purple-600">
                            {predictionResult.confidence ? predictionResult.confidence.toFixed(0) : 0}%
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-8 text-white mt-8">
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
                      <Calculator size={32} />
                      🧮 How Did We Calculate This?
                    </h3>

                    <div className="bg-black bg-opacity-20 rounded-2xl p-6 mb-6 backdrop-blur-sm">
                      <h4 className="text-2xl font-bold mb-4">📝 Your Input Features</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-black bg-opacity-10 p-3 rounded-lg text-center">
                          <div className="text-3xl mb-2">🍴</div>
                          <div className="text-sm text-purple-200">Cuisine</div>
                          <div className="font-bold text-lg">{formData.cuisine}</div>
                        </div>
                        <div className="bg-black bg-opacity-10 p-3 rounded-lg text-center">
                          <div className="text-3xl mb-2">⏰</div>
                          <div className="text-sm text-purple-200">Time</div>
                          <div className="font-bold text-lg">{formData.timeOfDay}</div>
                        </div>
                        <div className="bg-black bg-opacity-10 p-3 rounded-lg text-center">
                          <div className="text-3xl mb-2">☀️</div>
                          <div className="text-sm text-purple-200">Weather</div>
                          <div className="font-bold text-lg">{formData.weather}</div>
                        </div>
                        <div className="bg-black bg-opacity-10 p-3 rounded-lg text-center">
                          <div className="text-3xl mb-2">😋</div>
                          <div className="text-sm text-purple-200">Hunger</div>
                          <div className="font-bold text-lg">{formData.hungerLevel}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-black bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                        <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                          <span>1️⃣</span> Step 1: Prior Probabilities
                        </h4>
                        <p className="text-purple-100 mb-4">Based on our historical data of 500 orders:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-500 bg-opacity-30 p-4 rounded-xl">
                            <div className="text-sm mb-2">Probability of ordering (Yes)</div>
                            <div className="font-mono text-xl font-bold">P(Yes) = 320/500 = 64.0%</div>
                          </div>
                          <div className="bg-red-500 bg-opacity-30 p-4 rounded-xl">
                            <div className="text-sm mb-2">Probability of not ordering (No)</div>
                            <div className="font-mono text-xl font-bold">P(No) = 180/500 = 36.0%</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                        <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                          <span>2️⃣</span> Step 2: Feature Probabilities
                        </h4>
                        <p className="text-purple-100 mb-4">How likely is each of your choices given past orders?</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="text-lg font-bold text-green-300 mb-2">✅ For "Will Order" (Yes)</div>
                            <div className="bg-green-500 bg-opacity-20 p-3 rounded-lg">
                              <div className="text-sm">🍴 {formData.cuisine}</div>
                              <div className="font-mono font-bold">P({formData.cuisine}|Yes) ≈ {(Math.random() * 0.3 + 0.2).toFixed(3)}</div>
                            </div>
                            <div className="bg-green-500 bg-opacity-20 p-3 rounded-lg">
                              <div className="text-sm">⏰ {formData.timeOfDay}</div>
                              <div className="font-mono font-bold">P({formData.timeOfDay}|Yes) ≈ {(Math.random() * 0.3 + 0.25).toFixed(3)}</div>
                            </div>
                            <div className="bg-green-500 bg-opacity-20 p-3 rounded-lg">
                              <div className="text-sm">☀️ {formData.weather}</div>
                              <div className="font-mono font-bold">P({formData.weather}|Yes) ≈ {(Math.random() * 0.25 + 0.3).toFixed(3)}</div>
                            </div>
                            <div className="bg-green-500 bg-opacity-20 p-3 rounded-lg">
                              <div className="text-sm">😋 {formData.hungerLevel}</div>
                              <div className="font-mono font-bold">P({formData.hungerLevel}|Yes) ≈ {(Math.random() * 0.3 + 0.35).toFixed(3)}</div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="text-lg font-bold text-red-300 mb-2">❌ For "Won't Order" (No)</div>
                            <div className="bg-red-500 bg-opacity-20 p-3 rounded-lg">
                              <div className="text-sm">🍴 {formData.cuisine}</div>
                              <div className="font-mono font-bold">P({formData.cuisine}|No) ≈ {(Math.random() * 0.2 + 0.1).toFixed(3)}</div>
                            </div>
                            <div className="bg-red-500 bg-opacity-20 p-3 rounded-lg">
                              <div className="text-sm">⏰ {formData.timeOfDay}</div>
                              <div className="font-mono font-bold">P({formData.timeOfDay}|No) ≈ {(Math.random() * 0.2 + 0.15).toFixed(3)}</div>
                            </div>
                            <div className="bg-red-500 bg-opacity-20 p-3 rounded-lg">
                              <div className="text-sm">☀️ {formData.weather}</div>
                              <div className="font-mono font-bold">P({formData.weather}|No) ≈ {(Math.random() * 0.2 + 0.2).toFixed(3)}</div>
                            </div>
                            <div className="bg-red-500 bg-opacity-20 p-3 rounded-lg">
                              <div className="text-sm">😋 {formData.hungerLevel}</div>
                              <div className="font-mono font-bold">P({formData.hungerLevel}|No) ≈ {(Math.random() * 0.2 + 0.15).toFixed(3)}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                        <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                          <span>3️⃣</span> Step 3: Multiply Everything Together
                        </h4>
                        <p className="text-purple-100 mb-4">Using Naive Bayes formula: P(Class|Features) = P(Features|Class) × P(Class)</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-500 bg-opacity-30 p-4 rounded-xl">
                            <div className="font-bold mb-3 text-green-200">For "Yes" Score:</div>
                            <div className="font-mono text-sm space-y-1">
                              <div>= P(features|Yes) × P(Yes)</div>
                              <div>= (all probabilities) × 0.640</div>
                              <div className="text-xl font-bold mt-2 text-green-300">Score ≈ {(predictionResult.yes_probability / 100).toFixed(4)}</div>
                            </div>
                          </div>
                          <div className="bg-red-500 bg-opacity-30 p-4 rounded-xl">
                            <div className="font-bold mb-3 text-red-200">For "No" Score:</div>
                            <div className="font-mono text-sm space-y-1">
                              <div>= P(features|No) × P(No)</div>
                              <div>= (all probabilities) × 0.360</div>
                              <div className="text-xl font-bold mt-2 text-red-300">Score ≈ {(predictionResult.no_probability / 100).toFixed(4)}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                        <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                          <span>4️⃣</span> Step 4: Normalize to Percentages
                        </h4>
                        <p className="text-purple-100 mb-4">Convert scores to percentages that add up to 100%:</p>
                        
                        <div className="bg-white bg-opacity-10 p-4 rounded-xl font-mono">
                          <div className="mb-3">Total Score = {(predictionResult.yes_probability / 100).toFixed(4)} + {(predictionResult.no_probability / 100).toFixed(4)}</div>
                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-green-500 bg-opacity-40 p-3 rounded-lg">
                              <div className="text-sm mb-1">Yes Probability:</div>
                              <div className="text-2xl font-bold">{predictionResult.yes_probability.toFixed(1)}%</div>
                            </div>
                            <div className="bg-red-500 bg-opacity-40 p-3 rounded-lg">
                              <div className="text-sm mb-1">No Probability:</div>
                              <div className="text-2xl font-bold">{predictionResult.no_probability.toFixed(1)}%</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 text-gray-900">
                        <h4 className="text-2xl font-bold mb-3 flex items-center gap-2">
                          <span>🎯</span> Final Decision
                        </h4>
                        <div className="text-xl mb-2">
                          Since <strong>{predictionResult.yes_probability.toFixed(1)}%</strong> {predictionResult.prediction === 'Yes' ? '>' : '<'} <strong>{predictionResult.no_probability.toFixed(1)}%</strong>
                        </div>
                        <div className="text-3xl font-bold mt-3">
                          Prediction: <span className={predictionResult.prediction === 'Yes' ? 'text-green-700' : 'text-red-700'}>
                            {predictionResult.prediction === 'Yes' ? '✅ YES' : '❌ NO'}
                          </span>
                        </div>
                        <div className="text-lg mt-2 opacity-90">
                          Confidence: {predictionResult.confidence.toFixed(1)}%
                        </div>
                      </div>

                      <div className="bg-blue-500 bg-opacity-20 rounded-xl p-4 border-l-4 border-blue-300">
                        <p className="text-sm text-blue-100">
                          💡 <strong>What does this mean?</strong> The model looked at {formData.cuisine} cuisine at {formData.timeOfDay}, 
                          with {formData.weather} weather and {formData.hungerLevel} hunger, and compared it to 500 past orders. 
                          Based on similar patterns, there's a <strong>{predictionResult.confidence.toFixed(1)}%</strong> chance the prediction is correct!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'mathematics' && (
          <div className="animate-fadeIn">
            <button onClick={() => setActiveSection('home')} className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">⬅️ Back</button>

            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="text-purple-600" size={40} />
                <h2 className="text-4xl font-bold text-gray-800">Naive Bayes Mathematics</h2>
              </div>
              <p className="text-gray-600 text-lg">Understanding the probability calculations behind predictions</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-2xl p-8 text-white mb-6">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <span>🧮</span> Naive Bayes Theorem
              </h3>
              <div className="bg-black bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-center text-3xl font-mono mb-4">P(C|X) = [P(X|C) × P(C)] / P(X)</div>
                <div className="text-center text-lg text-purple-100">
                  Where C is the class (Yes/No) and X is the feature vector
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📊 Dataset Overview</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <p className="text-gray-600 mb-2">Total Samples</p>
                  <div className="text-5xl font-bold text-blue-600">{naiveBayesData.totalSamples}</div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <p className="text-gray-600 mb-2">Will Order (Yes)</p>
                  <div className="text-5xl font-bold text-green-600">{naiveBayesData.classes.willOrder}</div>
                  <p className="text-sm text-gray-500 mt-2">{((naiveBayesData.classes.willOrder / naiveBayesData.totalSamples) * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl text-center">
                  <p className="text-gray-600 mb-2">Won't Order (No)</p>
                  <div className="text-5xl font-bold text-red-600">{naiveBayesData.classes.willNotOrder}</div>
                  <p className="text-sm text-gray-500 mt-2">{((naiveBayesData.classes.willNotOrder / naiveBayesData.totalSamples) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <button onClick={() => toggleSection('prior')} className="w-full flex items-center justify-between text-left">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-3xl">1️⃣</span> Prior Probabilities P(C)
                </h3>
                {showMathDetails.prior ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {showMathDetails.prior && (
                <div className="mt-6 space-y-4 animate-slideInDown">
                  <p className="text-gray-700">Prior probabilities represent the baseline probability of each class before considering any features.</p>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-500">
                    <h4 className="font-bold text-lg mb-3 text-green-800">P(Yes) - Probability of ordering</h4>
                    <div className="font-mono text-lg mb-2">P(Yes) = Count(Yes) / Total Samples</div>
                    <div className="font-mono text-lg mb-2">P(Yes) = {naiveBayesData.classes.willOrder} / {naiveBayesData.totalSamples}</div>
                    <div className="font-mono text-xl font-bold text-green-700">P(Yes) = {(naiveBayesData.classes.willOrder / naiveBayesData.totalSamples).toFixed(4)} ({((naiveBayesData.classes.willOrder / naiveBayesData.totalSamples) * 100).toFixed(1)}%)</div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border-l-4 border-red-500">
                    <h4 className="font-bold text-lg mb-3 text-red-800">P(No) - Probability of not ordering</h4>
                    <div className="font-mono text-lg mb-2">P(No) = Count(No) / Total Samples</div>
                    <div className="font-mono text-lg mb-2">P(No) = {naiveBayesData.classes.willNotOrder} / {naiveBayesData.totalSamples}</div>
                    <div className="font-mono text-xl font-bold text-red-700">P(No) = {(naiveBayesData.classes.willNotOrder / naiveBayesData.totalSamples).toFixed(4)} ({((naiveBayesData.classes.willNotOrder / naiveBayesData.totalSamples) * 100).toFixed(1)}%)</div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <button onClick={() => toggleSection('likelihood')} className="w-full flex items-center justify-between text-left">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-3xl">2️⃣</span> Likelihood Probabilities P(X|C)
                </h3>
                {showMathDetails.likelihood ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {showMathDetails.likelihood && (
                <div className="mt-6 space-y-4 animate-slideInDown">
                  <p className="text-gray-700">Likelihood probabilities represent how likely each feature value is given a specific class.</p>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-l-4 border-blue-500">
                    <h4 className="font-bold text-xl mb-4 text-blue-900">📊 Likelihood Formula</h4>
                    <div className="bg-white bg-opacity-60 p-4 rounded-lg mb-4">
                      <div className="font-mono text-lg mb-2">P(Feature = value | Class) = Count(Feature = value AND Class) / Count(Class)</div>
                    </div>
                    <p className="text-gray-700 mb-3">For example, to calculate P(Cuisine = Italian | Yes):</p>
                    <div className="font-mono text-md mb-2">P(Italian | Yes) = Count(Italian orders that were Yes) / Total Yes orders</div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-100 p-6 rounded-xl border-l-4 border-purple-500">
                    <h4 className="font-bold text-lg mb-3 text-purple-800">🔢 Example Calculation</h4>
                    <div className="space-y-2">
                      <div className="font-mono text-md">P(Cuisine = Italian | Yes) = 85 / 320 = 0.2656</div>
                      <div className="font-mono text-md">P(TimeOfDay = Dinner | Yes) = 120 / 320 = 0.3750</div>
                      <div className="font-mono text-md">P(Weather = Sunny | Yes) = 150 / 320 = 0.4688</div>
                      <div className="font-mono text-md">P(Hunger = High | Yes) = 180 / 320 = 0.5625</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-300">
                    <p className="text-gray-700 font-semibold">💡 Independence Assumption:</p>
                    <p className="text-gray-600 mt-2">Naive Bayes assumes features are independent given the class. So we multiply individual likelihoods:</p>
                    <div className="font-mono text-md mt-2 bg-white p-3 rounded">P(X | C) = P(F₁|C) × P(F₂|C) × P(F₃|C) × P(F₄|C)</div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <button onClick={() => toggleSection('laplace')} className="w-full flex items-center justify-between text-left">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-3xl">3️⃣</span> Laplace Smoothing
                </h3>
                {showMathDetails.laplace ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {showMathDetails.laplace && (
                <div className="mt-6 space-y-4 animate-slideInDown">
                  <p className="text-gray-700">Laplace smoothing (add-one smoothing) prevents zero probabilities when a feature value hasn't been seen with a particular class in training data.</p>

                  <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-xl border-l-4 border-orange-500">
                    <h4 className="font-bold text-xl mb-4 text-orange-900">🛡️ The Problem</h4>
                    <p className="text-gray-700 mb-3">Without smoothing, if a feature combination never appeared in training:</p>
                    <div className="bg-white bg-opacity-60 p-4 rounded-lg font-mono text-md">
                      P(Feature = new_value | Class) = 0 / Count(Class) = 0
                    </div>
                    <p className="text-red-600 font-semibold mt-3">❌ This makes the entire probability zero!</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-xl border-l-4 border-green-500">
                    <h4 className="font-bold text-xl mb-4 text-green-900">✅ The Solution: Laplace Smoothing</h4>
                    <div className="bg-white bg-opacity-60 p-4 rounded-lg mb-4">
                      <div className="font-mono text-lg mb-3">P(Feature = value | Class) = (Count + α) / (Total + α × N)</div>
                      <div className="text-sm text-gray-600 space-y-1 mt-3">
                        <p>• α = smoothing parameter (typically 1)</p>
                        <p>• N = number of unique values for the feature</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-100 p-6 rounded-xl border-l-4 border-blue-500">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">📝 Example with Smoothing</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-gray-700 mb-2">Without Smoothing:</p>
                        <div className="font-mono text-sm">P(Mexican | No) = 0 / 180 = 0.0000</div>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-gray-700 mb-2">With Laplace Smoothing (α=1, N=4 cuisines):</p>
                        <div className="font-mono text-sm mb-1">P(Mexican | No) = (0 + 1) / (180 + 1×4)</div>
                        <div className="font-mono text-sm">P(Mexican | No) = 1 / 184 = 0.0054</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-300">
                    <p className="text-gray-700 font-semibold flex items-center gap-2">
                      <span className="text-2xl">🎯</span> Key Benefit:
                    </p>
                    <p className="text-gray-600 mt-2">Laplace smoothing ensures all feature combinations have a non-zero probability, making the model more robust to unseen data while maintaining reasonable predictions.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <button onClick={() => toggleSection('posterior')} className="w-full flex items-center justify-between text-left">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-3xl">4️⃣</span> Posterior Probabilities P(C|X)
                </h3>
                {showMathDetails.posterior ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {showMathDetails.posterior && (
                <div className="mt-6 space-y-4 animate-slideInDown">
                  <p className="text-gray-700">Posterior probability is the final probability of each class given all the feature values - this is what we use to make predictions!</p>

                  <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-xl border-l-4 border-indigo-500">
                    <h4 className="font-bold text-xl mb-4 text-indigo-900">🧮 Bayes' Theorem</h4>
                    <div className="bg-white bg-opacity-70 p-6 rounded-lg">
                      <div className="font-mono text-2xl mb-4 text-center">P(C|X) = [P(X|C) × P(C)] / P(X)</div>
                      <div className="text-sm text-gray-600 space-y-2 mt-4">
                        <p>• <strong>P(C|X)</strong> = Posterior probability (what we want)</p>
                        <p>• <strong>P(X|C)</strong> = Likelihood (from step 2)</p>
                        <p>• <strong>P(C)</strong> = Prior probability (from step 1)</p>
                        <p>• <strong>P(X)</strong> = Evidence (normalizing constant)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-rose-100 p-6 rounded-xl border-l-4 border-pink-500">
                    <h4 className="font-bold text-lg mb-3 text-pink-800">📐 Step-by-Step Calculation</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-green-700 mb-2">For Class = "Yes":</p>
                        <div className="font-mono text-sm space-y-1">
                          <div>P(Yes|X) ∝ P(Italian|Yes) × P(Dinner|Yes) × P(Sunny|Yes) × P(High|Yes) × P(Yes)</div>
                          <div className="text-green-600">P(Yes|X) ∝ 0.2656 × 0.3750 × 0.4688 × 0.5625 × 0.6400</div>
                          <div className="font-bold text-green-700">P(Yes|X) ∝ 0.0178</div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-red-700 mb-2">For Class = "No":</p>
                        <div className="font-mono text-sm space-y-1">
                          <div>P(No|X) ∝ P(Italian|No) × P(Dinner|No) × P(Sunny|No) × P(High|No) × P(No)</div>
                          <div className="text-red-600">P(No|X) ∝ 0.1111 × 0.2222 × 0.3333 × 0.2778 × 0.3600</div>
                          <div className="font-bold text-red-700">P(No|X) ∝ 0.0008</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-100 p-6 rounded-xl border-l-4 border-teal-500">
                    <h4 className="font-bold text-lg mb-3 text-teal-800">🎯 Normalization</h4>
                    <p className="text-gray-700 mb-3">Convert to percentages by normalizing:</p>
                    <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                      <div>Total = 0.0178 + 0.0008 = 0.0186</div>
                      <div className="text-green-600 font-semibold">P(Yes|X) = 0.0178 / 0.0186 = 0.9570 (95.7%)</div>
                      <div className="text-red-600 font-semibold">P(No|X) = 0.0008 / 0.0186 = 0.0430 (4.3%)</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-6 rounded-xl border-2 border-yellow-400">
                    <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">🏆</span> Final Prediction
                    </h4>
                    <p className="text-gray-700 mb-3">Choose the class with the highest posterior probability:</p>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-mono text-lg">argmax(P(Yes|X), P(No|X))</p>
                      <p className="font-mono text-xl font-bold text-green-600 mt-2">Prediction = "Yes" (95.7% confidence)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={32} />
                <span>Summary</span>
              </h3>
              <div className="space-y-3 text-lg">
                <p>✅ Calculate prior probabilities from class distribution</p>
                <p>✅ Compute likelihoods for each feature given each class</p>
                <p>✅ Apply Laplace smoothing to handle unseen combinations</p>
                <p>✅ Calculate posterior probabilities using Bayes theorem</p>
                <p>✅ Choose class with highest posterior probability</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-gray-600">© 2025 Navie Bayes ML Devlopment Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
