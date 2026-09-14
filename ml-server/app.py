from fastapi import FastAPI
from pydantic import BaseModel
from models.fake_news.predict import predict_fake_news
from models.toxicity.predict import predict_toxicity
from models.sentiment.predict import predict_sentiment

app = FastAPI()

class FakeNewsRequest(BaseModel):
    content: str  

class ToxicityRequest(BaseModel):
    text: str

class SentimentRequest(BaseModel):
    text: str

@app.get("/")
def root():
    return {"status": "SENTINEL.AI ML SERVER RUNNING"}

@app.post("/predict/fake-news")
def fake_news_api(request: FakeNewsRequest):
    return predict_fake_news(request.content)  

@app.post("/predict/toxicity")
def toxicity_api(request: ToxicityRequest):
    return predict_toxicity(request.text)

@app.post("/predict/sentiment")
def sentiment_api(request: SentimentRequest):
    return predict_sentiment(request.text)
