from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from recommender import get_top_movies, get_similar_movies, get_hybrid_recommendations
from rag_search import search_movies
from tmdb_utils import get_trending_movies

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/popularity")
def popularity(n: int = 10, genres: str = ""):
    genre_list = genres.split(",") if genres else []
    results = get_top_movies(n=n, genres=genre_list)
    return results.to_dict(orient="records")

@app.get("/api/tfidf")
def tfidf(movie: str, n: int = 10, genres: str = ""):
    genre_list = genres.split(",") if genres else []
    return get_similar_movies(movie, top_n=n, genres=genre_list)

@app.get("/api/hybrid")
def hybrid(movie: str, n: int = 10, alpha: float = 0.5, genres: str = ""):
    genre_list = genres.split(",") if genres else []
    return get_hybrid_recommendations(movie, top_n=n, genres=genre_list, alpha=alpha)

@app.get("/api/rag")
def rag(query: str):
    return search_movies(query)

@app.get("/api/trending")
def trending(language: str = "en"):
    return get_trending_movies(original_lang=language)

@app.get("/api/genres")
def get_genres():
    from recommender import get_all_genres
    return get_all_genres()

@app.get("/api/titles")
def get_movie_titles():
    import pandas as pd
    df = pd.read_csv("data/movies_metadata.csv", low_memory=False)
    titles = df["title"].dropna().unique().tolist()
    return sorted(titles)
