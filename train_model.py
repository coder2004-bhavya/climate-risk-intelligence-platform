import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# load dataset
data = pd.read_csv("../dataset/weather_data.csv")

# select features
X = data[['humidity','pressure_mb','wind_kph','cloud','visibility_km','uv_index']]

# target variable
y = data['temperature_celsius']

# train model
model = LinearRegression()
model.fit(X, y)

# save model
joblib.dump(model, "weather_model.pkl")

print("Model trained successfully")
