import joblib
import numpy as np

model = joblib.load("models/weather_model.pkl")

def predict_weather(humidity, pressure_mb, wind_kph, cloud, visibility_km, uv_index):

    data = np.array([[humidity, pressure_mb, wind_kph, cloud, visibility_km, uv_index]])

    prediction = model.predict(data)

    return prediction[0]
