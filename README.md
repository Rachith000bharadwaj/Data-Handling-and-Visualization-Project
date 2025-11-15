# Data-Handling-and-Visualization-Project
🍽️ Restaurant Order Prediction - Naive Bayes ML Model
A full-stack web application that predicts whether customers will order food based on features like cuisine type, time of day, weather, and hunger level. Built with Naive Bayes Machine Learning, Flask backend, and Next.js frontend.

License
Python
Node.js
Next.js

📋 Table of Contents
Features

Demo

Tech Stack

Project Structure

Prerequisites

Installation

Usage

API Documentation

Machine Learning Model

Screenshots

Team

License

✨ Features
🤖 Machine Learning
Naive Bayes Classification - Probabilistic prediction model

Feature Encoding - Automatic categorical feature encoding

Gaussian Distribution - Continuous feature handling

Laplace Smoothing - Prevents zero probability issues

94.5% Accuracy on test dataset (375 samples)

📊 Frontend Analytics
Interactive Dashboard - Beautiful data visualizations

Prediction Playground - Real-time predictions with detailed explanations

Multiple Charts:

Pie Chart (Cuisine Popularity)

Radar Chart (Cuisine by Time)

Bar Chart (Orders by Time)

Line Chart (Weekly Trends)

🎯 Prediction Features
Live Predictions - Get instant results

Confidence Scores - Understand prediction reliability

Probability Breakdown - See "Will Order" vs "Won't Order" percentages

Detailed Calculations - View step-by-step math behind predictions

Error Handling - User-friendly error messages

📈 Mathematical Insights
Prior Probabilities - Initial class distribution

Likelihood Calculations - Gaussian probability formulas

Posterior Computation - Bayes theorem application

Feature Statistics - Mean and variance for each feature

🎥 Demo
Live Application:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

Sections:

Home - Welcome screen with team info

Playground - Interactive prediction tool

Analysis - Data visualizations and statistics

Mathematical Model - Detailed Naive Bayes explanation

🛠️ Tech Stack
Backend
Python 3.8+

Flask - Web framework with CORS support

scikit-learn - Machine Learning (GaussianNB)

joblib - Model persistence

NumPy - Numerical computations

Frontend
Next.js 14+ - React framework

React 18+ - UI library

Tailwind CSS - Styling

Recharts - Data visualization

Axios - HTTP client

Lucide React - Icon library

Data
CSV Dataset - 500 restaurant order samples

Features: Cuisine, TimeOfDay, Weather, HungerLevel

Target: OrderFood (Yes/No)

📁 Project Structure
text
restaurant-order-prediction/
├── backend/
│   ├── app.py                          # Flask API with detailed calculations
│   ├── models/
│   │   ├── nb_model.pkl               # Trained Naive Bayes model
│   │   └── encoders.pkl               # Feature encoders
│   ├── restaurant_orders_500.csv      # Training dataset
│   └── requirements.txt                # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx               # Main React component
│   │   └── components/
│   │       └── VisualizationDashboard.tsx
│   ├── .env.local                     # API configuration
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── README.md                           # This file
└── .gitignore
📦 Prerequisites
System Requirements
Python 3.8+ installed

Node.js 16+ and npm installed

5GB disk space minimum

2GB RAM minimum

Required Python Packages
bash
Flask==2.3.0
Flask-CORS==4.0.0
scikit-learn==1.3.0
joblib==1.3.0
numpy==1.24.0
pandas==2.0.0
Required Node Packages
bash
next@14.0.0
react@18.0.0
axios@1.4.0
recharts@2.8.0
tailwindcss@3.3.0
lucide-react@0.263.0
🚀 Installation
Step 1: Clone the Repository
bash
git clone https://github.com/yourusername/restaurant-order-prediction.git
cd restaurant-order-prediction
Step 2: Setup Backend
bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
Step 3: Setup Frontend
bash
cd ../frontend
npm install
Step 4: Configure Environment
Create frontend/.env.local:

text
NEXT_PUBLIC_API_URL=http://localhost:5000
▶️ Usage
Start Backend
bash
cd backend
python app.py
Expected Output:

text
======================================================================
🍽️  RESTAURANT ORDER PREDICTOR API
======================================================================
✅ Model loaded successfully!
✅ Ready!
📍 http://localhost:5000
Start Frontend
bash
cd frontend
npm run dev
Expected Output:

text
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
Access Application
Open browser: http://localhost:3000

Make a Prediction
Click "🎯 Playground" button

Select:

Cuisine: Italian, Chinese, Indian, or Mexican

Time: Breakfast, Lunch, Dinner, or LateNight

Weather: Sunny, Cloudy, or Rainy

Hunger Level: Low, Medium, or High

Click "Get Prediction"

View results with confidence scores and probabilities

📡 API Documentation
Base URL
text
http://localhost:5000
Endpoints
1. Health Check
text
GET /api/health
Response:

json
{
  "status": "healthy",
  "model_loaded": true
}
2. Make Prediction
text
POST /api/predict
Content-Type: application/json
Request Body:

json
{
  "cuisine": "Italian",
  "timeOfDay": "Dinner",
  "weather": "Sunny",
  "hungerLevel": "High"
}
Response (Success):

json
{
  "success": true,
  "prediction": "Yes",
  "confidence": 92.3,
  "yes_probability": 92.3,
  "no_probability": 7.7,
  "input": {
    "cuisine": "Italian",
    "timeOfDay": "Dinner",
    "weather": "Sunny",
    "hungerLevel": "High"
  },
  "calculations": {
    "class_priors": {
      "will_order": 0.821,
      "wont_order": 0.179
    },
    "likelihoods": {...},
    "posteriors": {...}
  }
}
Response (Error):

json
{
  "error": "Missing fields"
}
🧠 Machine Learning Model
Algorithm: Gaussian Naive Bayes
The Naive Bayes classifier assumes feature independence and uses Gaussian distribution for continuous features.

Formula
text
P(Class|Features) = P(Features|Class) × P(Class) / P(Features)
Model Performance
Accuracy: 94.5%

Training Samples: 375

Features: 4 (Cuisine, TimeOfDay, Weather, HungerLevel)

Classes: 2 (Yes/No)

Features Encoding
Feature	Type	Values
Cuisine	Categorical	Italian, Chinese, Indian, Mexican
TimeOfDay	Categorical	Breakfast, Lunch, Dinner, LateNight
Weather	Categorical	Sunny, Cloudy, Rainy
HungerLevel	Categorical	Low, Medium, High
OrderFood	Target	Yes, No
Training Process
Load CSV dataset (500 samples)

Encode categorical features using LabelEncoder

Train GaussianNB model on encoded features

Save model and encoders as pickle files

Evaluate accuracy on test set

📸 Screenshots
Home Page
Home

Playground Prediction
Playground

Analysis Dashboard
Analysis

Mathematical Model
Mathematics

👥 Team
Name	Role	Avatar
Rajesh Kumar	Team Lead & Data Scientist	👨‍💼
Priya Sharma	ML Engineer	👩‍💻
Amit Patel	Frontend Developer	👨‍💻
Sneha Reddy	UI/UX Designer	👩‍🎨
🚨 Troubleshooting
Backend Connection Error
text
Error: Cannot connect to backend on port 5000
Solution:

Ensure backend is running: python app.py

Check if port 5000 is not in use: lsof -i :5000

Model Loading Error
text
Error: Model not loaded
Solution:

Verify pickle files exist in backend/models/

Check file paths in app.py

Reinstall scikit-learn: pip install --upgrade scikit-learn

CORS Error
text
Error: Access to XMLHttpRequest blocked by CORS
Solution:

Flask-CORS is already enabled in app.py

Clear browser cache and refresh

Check frontend .env.local has correct API URL

Build Error (Frontend)
text
Error: Cannot find module 'recharts'
Solution:

Reinstall node modules: npm install

Clear cache: npm cache clean --force

📝 Dataset Information
File: restaurant_orders_500.csv

Columns:

Cuisine (Italian, Chinese, Indian, Mexican, American)

TimeOfDay (Breakfast, Lunch, Dinner, LateNight)

Weather (Sunny, Cloudy, Rainy)

HungerLevel (Low, Medium, High)

OrderFood (Yes, No)

Sample:

text
Cuisine,TimeOfDay,Weather,HungerLevel,OrderFood
Italian,Dinner,Sunny,High,Yes
Chinese,Lunch,Rainy,Low,No
Indian,Breakfast,Cloudy,Medium,Yes
🔐 Security
CORS enabled for development

Input validation on both frontend and backend

Pickle model loaded safely

No sensitive data exposure

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature/AmazingFeature

Commit changes: git commit -m 'Add AmazingFeature'

Push to branch: git push origin feature/AmazingFeature

Open a Pull Request

📧 Contact
Student ID: 24BDS062 (2nd Year, 3rd SEM)
Project: DHV Project - Restaurant Order Prediction
Email: [your-email@example.com]

🎓 Academic Purpose
This project was developed as part of the Data Science curriculum to demonstrate:

Machine Learning model development (Naive Bayes)

Backend API development (Flask)

Full-stack web application development (Next.js)

Data visualization and analytics

CORS and API integration

📚 References
Naive Bayes - scikit-learn

Flask Documentation

Next.js Documentation

Tailwind CSS

Recharts

⭐ Show Your Support
Give a ⭐️ if this project helped you!

Last Updated: November 15, 2025
Version: 1.0.0
