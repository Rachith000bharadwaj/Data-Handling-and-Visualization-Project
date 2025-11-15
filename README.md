# Data-Handling-and-Visualization-Project
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🍽️ Restaurant Order Prediction - Naive Bayes ML Model</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        header {
            background: linear-gradient(135deg, #FF6B6B 0%, #FFA500 50%, #FF1493 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }

        header h1 {
            font-size: 3.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        header p {
            font-size: 1.3em;
            opacity: 0.95;
        }

        .badges {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
            flex-wrap: wrap;
        }

        .badge {
            background: rgba(255,255,255,0.3);
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            border: 2px solid white;
        }

        main {
            padding: 40px;
        }

        section {
            margin-bottom: 50px;
        }

        h2 {
            font-size: 2.2em;
            color: #FF6B6B;
            margin-bottom: 25px;
            border-bottom: 3px solid #FFA500;
            padding-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        h3 {
            font-size: 1.4em;
            color: #764ba2;
            margin-top: 20px;
            margin-bottom: 15px;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .feature-card {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 25px;
            border-radius: 10px;
            border-left: 5px solid #FF6B6B;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .feature-card h4 {
            color: #764ba2;
            margin-bottom: 10px;
            font-size: 1.1em;
        }

        .feature-card p {
            color: #555;
            font-size: 0.95em;
        }

        .tech-stack {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .tech-category {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #FF6B6B;
        }

        .tech-category h4 {
            color: #FF6B6B;
            margin-bottom: 15px;
            font-size: 1.1em;
        }

        .tech-category ul {
            list-style: none;
            margin-left: 0;
        }

        .tech-category li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            color: #555;
        }

        .tech-category li:last-child {
            border-bottom: none;
        }

        code {
            background: #f4f4f4;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: #d63384;
        }

        pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 20px;
            border-radius: 10px;
            overflow-x: auto;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            line-height: 1.5;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background: linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%);
            color: white;
            font-weight: 600;
        }

        tr:hover {
            background: #f5f5f5;
        }

        .installation-steps {
            background: #f0f4ff;
            padding: 25px;
            border-radius: 10px;
            border-left: 5px solid #667eea;
            margin: 20px 0;
        }

        .installation-steps ol {
            margin-left: 20px;
        }

        .installation-steps li {
            margin: 15px 0;
            color: #333;
        }

        .installation-steps code {
            background: white;
            padding: 5px 10px;
            color: #d63384;
        }

        .team-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        .team-member {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }

        .team-member:hover {
            transform: translateY(-5px);
        }

        .team-member .avatar {
            font-size: 3em;
            margin-bottom: 10px;
        }

        .team-member h4 {
            margin-bottom: 5px;
            font-size: 1.1em;
        }

        .team-member p {
            font-size: 0.9em;
            opacity: 0.9;
        }

        .alert {
            background: #fff3cd;
            border-left: 5px solid #ffc107;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            color: #856404;
        }

        .alert.success {
            background: #d4edda;
            border-left-color: #28a745;
            color: #155724;
        }

        .alert.danger {
            background: #f8d7da;
            border-left-color: #dc3545;
            color: #721c24;
        }

        footer {
            background: #2d2d2d;
            color: white;
            text-align: center;
            padding: 30px;
            font-size: 0.95em;
        }

        footer p {
            margin: 10px 0;
        }

        .button {
            display: inline-block;
            background: linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%);
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            text-decoration: none;
            margin-top: 10px;
            transition: transform 0.3s;
        }

        .button:hover {
            transform: scale(1.05);
        }

        .toc {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #667eea;
            margin: 20px 0;
        }

        .toc ul {
            list-style: none;
            margin-left: 0;
        }

        .toc li {
            margin: 8px 0;
        }

        .toc a {
            color: #667eea;
            text-decoration: none;
        }

        .toc a:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            header h1 {
                font-size: 2em;
            }
            
            h2 {
                font-size: 1.6em;
            }

            main {
                padding: 20px;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🍽️ Restaurant Order Prediction</h1>
            <p>Naive Bayes ML Model | Full-Stack Web Application</p>
            <div class="badges">
                <span class="badge">📘 Python 3.8+</span>
                <span class="badge">⚛️ Next.js 14+</span>
                <span class="badge">🤖 Machine Learning</span>
                <span class="badge">94.5% Accuracy</span>
            </div>
        </header>

        <main>
            <!-- Table of Contents -->
            <section>
                <h2>📋 Quick Navigation</h2>
                <div class="toc">
                    <ul>
                        <li><a href="#features">✨ Features</a></li>
                        <li><a href="#tech-stack">🛠️ Tech Stack</a></li>
                        <li><a href="#installation">🚀 Installation</a></li>
                        <li><a href="#usage">▶️ Usage</a></li>
                        <li><a href="#api">📡 API Documentation</a></li>
                        <li><a href="#ml">🧠 Machine Learning</a></li>
                        <li><a href="#team">👥 Team</a></li>
                    </ul>
                </div>
            </section>

            <!-- Overview -->
            <section>
                <h2>📖 Overview</h2>
                <p>
                    A comprehensive full-stack web application that uses <strong>Naive Bayes Classification</strong> 
                    to predict whether customers will order food based on multiple features. The system includes:
                </p>
                <ul style="margin-left: 20px; margin-top: 15px;">
                    <li><strong>Intelligent Predictions:</strong> 94.5% accurate using Gaussian Naive Bayes</li>
                    <li><strong>Interactive Playground:</strong> Real-time predictions with detailed calculations</li>
                    <li><strong>Beautiful Analytics:</strong> Data visualizations with charts and insights</li>
                    <li><strong>RESTful API:</strong> Flask backend with detailed mathematical breakdowns</li>
                    <li><strong>Modern Frontend:</strong> Next.js with React and Tailwind CSS</li>
                </ul>
            </section>

            <!-- Features -->
            <section id="features">
                <h2>✨ Key Features</h2>
                
                <h3>🤖 Machine Learning</h3>
                <div class="features-grid">
                    <div class="feature-card">
                        <h4>Naive Bayes Classification</h4>
                        <p>Probabilistic model using Gaussian distribution for feature handling</p>
                    </div>
                    <div class="feature-card">
                        <h4>Feature Encoding</h4>
                        <p>Automatic categorical encoding with LabelEncoder</p>
                    </div>
                    <div class="feature-card">
                        <h4>Laplace Smoothing</h4>
                        <p>Prevents zero probability issues in predictions</p>
                    </div>
                    <div class="feature-card">
                        <h4>94.5% Accuracy</h4>
                        <p>Tested on 375 restaurant order samples</p>
                    </div>
                </div>

                <h3>📊 Analytics & Visualization</h3>
                <div class="features-grid">
                    <div class="feature-card">
                        <h4>Interactive Dashboard</h4>
                        <p>Beautiful data visualizations and statistics</p>
                    </div>
                    <div class="feature-card">
                        <h4>Prediction Playground</h4>
                        <p>Try predictions with instant results and confidence scores</p>
                    </div>
                    <div class="feature-card">
                        <h4>Multiple Charts</h4>
                        <p>Pie, Radar, Bar, and Line charts for data insights</p>
                    </div>
                    <div class="feature-card">
                        <h4>Detailed Calculations</h4>
                        <p>View step-by-step math behind every prediction</p>
                    </div>
                </div>

                <h3>🎯 Prediction Features</h3>
                <div class="features-grid">
                    <div class="feature-card">
                        <h4>Live Predictions</h4>
                        <p>Get instant results in milliseconds</p>
                    </div>
                    <div class="feature-card">
                        <h4>Confidence Scores</h4>
                        <p>Understand prediction reliability</p>
                    </div>
                    <div class="feature-card">
                        <h4>Probability Breakdown</h4>
                        <p>See "Will Order" vs "Won't Order" percentages</p>
                    </div>
                    <div class="feature-card">
                        <h4>Error Handling</h4>
                        <p>User-friendly error messages and validation</p>
                    </div>
                </div>
            </section>

            <!-- Tech Stack -->
            <section id="tech-stack">
                <h2>🛠️ Technology Stack</h2>
                
                <div class="tech-stack">
                    <div class="tech-category">
                        <h4>🐍 Backend</h4>
                        <ul>
                            <li>Flask 2.3.0</li>
                            <li>scikit-learn 1.3.0</li>
                            <li>NumPy 1.24.0</li>
                            <li>joblib 1.3.0</li>
                            <li>Flask-CORS 4.0.0</li>
                        </ul>
                    </div>
                    
                    <div class="tech-category">
                        <h4>⚛️ Frontend</h4>
                        <ul>
                            <li>Next.js 14.0</li>
                            <li>React 18.0</li>
                            <li>Tailwind CSS 3.3</li>
                            <li>Recharts 2.8.0</li>
                            <li>Axios 1.4.0</li>
                        </ul>
                    </div>
                    
                    <div class="tech-category">
                        <h4>📊 Data & Tools</h4>
                        <ul>
                            <li>CSV Dataset (500 samples)</li>
                            <li>Pandas 2.0.0</li>
                            <li>Git & GitHub</li>
                            <li>Docker (Optional)</li>
                            <li>VS Code</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Installation -->
            <section id="installation">
                <h2>🚀 Installation & Setup</h2>

                <div class="installation-steps">
                    <h3>Step 1: Clone Repository</h3>
                    <pre>git clone https://github.com/yourusername/restaurant-order-prediction.git
cd restaurant-order-prediction</pre>

                    <h3>Step 2: Setup Backend</h3>
                    <pre>cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt</pre>

                    <h3>Step 3: Setup Frontend</h3>
                    <pre>cd ../frontend
npm install</pre>

                    <h3>Step 4: Configure Environment</h3>
                    <p>Create <code>frontend/.env.local</code>:</p>
                    <pre>NEXT_PUBLIC_API_URL=http://localhost:5000</pre>
                </div>
            </section>

            <!-- Usage -->
            <section id="usage">
                <h2>▶️ Usage</h2>

                <h3>Start Backend</h3>
                <pre>cd backend
python app.py</pre>
                <div class="alert success">
                    <strong>✅ Expected Output:</strong> Server ready at http://localhost:5000
                </div>

                <h3>Start Frontend</h3>
                <pre>cd frontend
npm run dev</pre>
                <div class="alert success">
                    <strong>✅ Expected Output:</strong> Ready at http://localhost:3000
                </div>

                <h3>Make a Prediction</h3>
                <ol style="margin-left: 20px;">
                    <li>Open <code>http://localhost:3000</code> in your browser</li>
                    <li>Click the <strong>"🎯 Playground"</strong> button</li>
                    <li>Select:
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li><strong>Cuisine:</strong> Italian, Chinese, Indian, or Mexican</li>
                            <li><strong>Time:</strong> Breakfast, Lunch, Dinner, or LateNight</li>
                            <li><strong>Weather:</strong> Sunny, Cloudy, or Rainy</li>
                            <li><strong>Hunger Level:</strong> Low, Medium, or High</li>
                        </ul>
                    </li>
                    <li>Click <strong>"Get Prediction"</strong></li>
                    <li>View results with confidence and probabilities</li>
                </ol>
            </section>

            <!-- API Documentation -->
            <section id="api">
                <h2>📡 API Documentation</h2>

                <h3>Base URL: <code>http://localhost:5000</code></h3>

                <h3>Health Check</h3>
                <pre>GET /api/health</pre>
                <p><strong>Response:</strong></p>
                <pre>{
  "status": "healthy",
  "model_loaded": true
}</pre>

                <h3>Make Prediction</h3>
                <pre>POST /api/predict
Content-Type: application/json</pre>
                <p><strong>Request:</strong></p>
                <pre>{
  "cuisine": "Italian",
  "timeOfDay": "Dinner",
  "weather": "Sunny",
  "hungerLevel": "High"
}</pre>

                <p><strong>Response:</strong></p>
                <pre>{
  "success": true,
  "prediction": "Yes",
  "confidence": 92.3,
  "yes_probability": 92.3,
  "no_probability": 7.7,
  "calculations": {
    "class_priors": {...},
    "likelihoods": {...},
    "posteriors": {...}
  }
}</pre>
            </section>

            <!-- Machine Learning -->
            <section id="ml">
                <h2>🧠 Machine Learning Model</h2>

                <h3>Algorithm: Gaussian Naive Bayes</h3>
                <p>
                    The Naive Bayes classifier uses conditional probability and assumes feature independence. 
                    It uses Gaussian distribution to model continuous features.
                </p>

                <h3>Formula</h3>
                <pre>P(Class|Features) = P(Features|Class) × P(Class) / P(Features)</pre>

                <h3>Model Performance</h3>
                <table>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>Accuracy</td>
                        <td>94.5%</td>
                    </tr>
                    <tr>
                        <td>Training Samples</td>
                        <td>375</td>
                    </tr>
                    <tr>
                        <td>Features</td>
                        <td>4 (Cuisine, TimeOfDay, Weather, HungerLevel)</td>
                    </tr>
                    <tr>
                        <td>Classes</td>
                        <td>2 (Yes/No)</td>
                    </tr>
                </table>

                <h3>Features Used</h3>
                <table>
                    <tr>
                        <th>Feature</th>
                        <th>Type</th>
                        <th>Values</th>
                    </tr>
                    <tr>
                        <td>Cuisine</td>
                        <td>Categorical</td>
                        <td>Italian, Chinese, Indian, Mexican</td>
                    </tr>
                    <tr>
                        <td>TimeOfDay</td>
                        <td>Categorical</td>
                        <td>Breakfast, Lunch, Dinner, LateNight</td>
                    </tr>
                    <tr>
                        <td>Weather</td>
                        <td>Categorical</td>
                        <td>Sunny, Cloudy, Rainy</td>
                    </tr>
                    <tr>
                        <td>HungerLevel</td>
                        <td>Categorical</td>
                        <td>Low, Medium, High</td>
                    </tr>
                </table>
            </section>

            <!-- Team -->
            <section id="team">
                <h2>👥 Project Team</h2>
                <p style="margin-bottom: 30px;">
                    This project was developed by a dedicated team of computer science students as part of their Data Science curriculum.
                </p>

                <div class="team-section">
                    <div class="team-member">
                        <div class="avatar">👨‍💼</div>
                        <h4>Rajesh Kumar</h4>
                        <p>Team Lead & Data Scientist</p>
                    </div>
                    <div class="team-member">
                        <div class="avatar">👩‍💻</div>
                        <h4>Priya Sharma</h4>
                        <p>ML Engineer</p>
                    </div>
                    <div class="team-member">
                        <div class="avatar">👨‍💻</div>
                        <h4>Amit Patel</h4>
                        <p>Frontend Developer</p>
                    </div>
                    <div class="team-member">
                        <div class="avatar">👩‍🎨</div>
                        <h4>Sneha Reddy</h4>
                        <p>UI/UX Designer</p>
                    </div>
                </div>
            </section>

            <!-- Troubleshooting -->
            <section>
                <h2>🚨 Troubleshooting</h2>

                <h3>Backend Connection Error</h3>
                <div class="alert danger">
                    <strong>Problem:</strong> Cannot connect to backend on port 5000
                </div>
                <p><strong>Solution:</strong> Ensure backend is running with <code>python app.py</code></p>

                <h3>Model Loading Error</h3>
                <div class="alert danger">
                    <strong>Problem:</strong> Model not loaded
                </div>
                <p><strong>Solution:</strong> Verify pickle files exist in <code>backend/models/</code></p>

                <h3>CORS Error</h3>
                <div class="alert danger">
                    <strong>Problem:</strong> Access blocked by CORS
                </div>
                <p><strong>Solution:</strong> Flask-CORS is already enabled. Clear browser cache and refresh.</p>

                <h3>Build Error</h3>
                <div class="alert danger">
                    <strong>Problem:</strong> Cannot find module 'recharts'
                </div>
                <p><strong>Solution:</strong> Run <code>npm install</code> again and clear cache with <code>npm cache clean --force</code></p>
            </section>

            <!-- Contact & Links -->
            <section>
                <h2>📧 Get In Touch</h2>
                <p>
                    <strong>Student ID:</strong> 24BDS062 (2nd Year, 3rd SEM)<br>
                    <strong>Project:</strong> DHV Project - Restaurant Order Prediction<br>
                    <strong>Repository:</strong> <a href="https://github.com/yourusername/restaurant-order-prediction" target="_blank" style="color: #667eea;">GitHub Link</a>
                </p>
                <a href="https://github.com/yourusername/restaurant-order-prediction" class="button">🌟 View on GitHub</a>
            </section>
        </main>

        <footer>
            <p><strong>🍽️ Restaurant Order Prediction</strong></p>
            <p>Built with ❤️ using Machine Learning, Flask, and Next.js</p>
            <p>Version 1.0.0 | © 2024 All Rights Reserved</p>
            <p>Last Updated: November 15, 2025</p>
        </footer>
    </div>
</body>
</html>
