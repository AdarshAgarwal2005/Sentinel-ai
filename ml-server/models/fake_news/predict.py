import os
import pickle

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__))) 
MODEL_PATH = os.path.join(BASE_DIR, 'saved_models', 'fake_news_model.pkl')
VECTORIZER_PATH = os.path.join(BASE_DIR, 'saved_models', 'fake_news_vectorizer.pkl')

with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(VECTORIZER_PATH, 'rb') as f:
    vectorizer = pickle.load(f)

def predict_fake_news(text: str):
    try:
        text_tfidf = vectorizer.transform([text])
        pred = model.predict(text_tfidf)[0]
        confidence = max(model.predict_proba(text_tfidf)[0]) * 100
        return {"prediction": "Fake" if pred == 1 else "Real", "confidence": confidence}
    except Exception as e:
        print("Prediction Error:", e)
        return {"prediction": "Error", "confidence": 0}

# Test
if __name__ == "__main__":
    sample_text = "Breaking: Scientists discover cure for common cold"
    label, conf = predict_fake_news(sample_text)
    print(f"Prediction: {'Fake' if label==1 else 'Real'}, Confidence: {conf:.2f}%")
