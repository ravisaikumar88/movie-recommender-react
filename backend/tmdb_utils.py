import requests
from tmdb_config import TMDB_API_KEY

def get_trending_movies(original_lang="en"):
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "with_original_language": original_lang,
        "sort_by": "popularity.desc",
        "language": "en-US"  # Response will be in English
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json().get("results", [])[:10]
        return [
            {
                "title": movie.get("title"),
                "overview": movie.get("overview"),
                "release_date": movie.get("release_date"),
                "vote_average": movie.get("vote_average"),
            }
            for movie in data
        ]
    else:
        return []
