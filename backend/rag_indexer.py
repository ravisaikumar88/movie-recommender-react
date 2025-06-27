import pandas as pd
import faiss
import pickle
from sentence_transformers import SentenceTransformer

# Load movie metadata
df = pd.read_csv("data/movies_metadata.csv", low_memory=False)
df = df.dropna(subset=["overview", "title"])
texts = (df["title"] + ": " + df["overview"]).tolist()

# Generate embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(texts, show_progress_bar=True)

# Create FAISS index
dimension = embeddings[0].shape[0]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# Save index + texts
faiss.write_index(index, "movie_index.faiss")
with open("movie_texts.pkl", "wb") as f:
    pickle.dump(texts, f)

print("✅ FAISS index and movie texts saved!")
