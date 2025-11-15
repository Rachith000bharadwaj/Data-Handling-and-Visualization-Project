export interface PredictionInput {
  cuisine: string
  timeOfDay: string
  weather: string
  hungerLevel: string
}

export interface PredictionResult {
  prediction: string
  confidence: number
  yes_probability: number
  no_probability: number
  input: PredictionInput
  feature_importance: {
    [key: string]: number
  }
}
