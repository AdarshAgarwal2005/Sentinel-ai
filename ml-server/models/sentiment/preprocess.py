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
    df = pd.read_csv(csv_path, encoding="latin-1", header=None)
    df = df[[0, 5]]
    df.columns = ["label", "text"]
    df = df[df["label"] != 2]
    df["label"] = df["label"].map({0: 0, 4: 1})
    df["text"] = df["text"].apply(clean_text)
    X = df["text"]
    y = df["label"]
    return X, y
