import pickle
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

with open('../../saved_models/fake_news_train_test.pkl', 'rb') as f:
    X_train_tfidf, X_test_tfidf, y_train, y_test = pickle.load(f)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)

y_pred = model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, y_pred)
print(f"Fake News Detection Model Accuracy: {accuracy*100:.2f}%")

with open('../../saved_models/fake_news_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model training complete and saved.")
