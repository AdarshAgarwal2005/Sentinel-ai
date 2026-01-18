import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

# Load dataset
df = pd.read_csv('../../datasets/fake_news/WELFake_Dataset.csv')

df = df[['title', 'label']].dropna()  

X = df['title']  
y = df['label']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# TF-IDF Vectorizer
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Save processed data and vectorizer
with open('../../saved_models/fake_news_vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)

with open('../../saved_models/fake_news_train_test.pkl', 'wb') as f:
    pickle.dump((X_train_tfidf, X_test_tfidf, y_train, y_test), f)

print("Preprocessing complete. Vectorizer and split data saved.")
