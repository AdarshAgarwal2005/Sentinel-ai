import os
import joblib
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "../../saved_models/sentiment_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "../../saved_models/sentiment_vectorizer.pkl")

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

def clean_text(text):
    text = str(text)
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def predict_sentiment(text):
    content = clean_text(text)
    vector = vectorizer.transform([content])
    prediction = model.predict(vector)[0]
    probability = model.predict_proba(vector)[0][prediction]
    return {
        "sentiment": "POSITIVE" if prediction == 1 else "NEGATIVE",
        "confidence": float(probability)
    }
