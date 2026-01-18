import pandas as pd
import re

def clean_text(text):
    text = str(text)
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def load_and_preprocess(csv_path):
    df = pd.read_csv(csv_path)
    
    label_cols = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
    
    df["label"] = df[label_cols].max(axis=1)
    
    df = df.dropna(subset=["comment_text"])
    
    df["content"] = df["comment_text"].apply(clean_text)
    
    X = df["content"]
    y = df["label"]
    
    return X, y
