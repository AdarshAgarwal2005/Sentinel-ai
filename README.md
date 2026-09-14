# SENTINEL.AI 🚀

SENTINEL.AI is a full-stack AI-powered web application capable of detecting:

- 📰 Fake News
- ☣️ Toxic Content
- 😊 Sentiment Analysis

---

## 🛠 Tech Stack

**Frontend**
- EJS
- Bootstrap

**Backend**
- Node.js
- Express

**ML Server**
- FastAPI
- Python
- Scikit-learn
- NLP (TF-IDF)

---

## 📂 Project Structure

sentinal-ai/
├── ml-server/
│ ├── app.py
│ ├── models/
│ ├── datasets/ (local only)
│ ├── saved_models/ (local only)
│ └── requirements.txt
│
├── node-server/
│ ├── controllers/
│ ├── routes/
│ ├── views/
│ └── public/


---

## ▶️ How to Run Locally

2️⃣ Python (ML Server)
cd ml-server
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r ../requirements.txt


Run ML server:

uvicorn app:app --reload


ML server runs on:

http://127.0.0.1:8000

3️⃣ Node Server
cd node-server
npm install
npm start


Web app runs on:
http://localhost:3000


⚠️ Important Notes
datasets/ and saved_models/ are NOT included in GitHub

Models must be trained locally

Virtual environments are ignored

Confidence score represents model prediction certainty

📌 API Endpoints
Endpoint	Description
/predict/fake-news	Fake news detection
/predict/toxicity	Toxicity detection
/predict/sentiment	Sentiment analysis


👨‍💻 Author
Adarsh Agrawal
BTech Student | AI & Full Stack Developer
