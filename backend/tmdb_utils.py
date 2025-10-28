import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from tmdb_config import TMDB_API_KEY

def get_trending_movies(language="en-US"):
    lang_map = {
        "en-US": "en",
        "hi-IN": "hi",
        "te-IN": "te",
        "ta-IN": "ta",
        "ml-IN": "ml",
    }

    base_lang = lang_map.get(language, "en")

    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "sort_by": "popularity.desc",
        "with_original_language": base_lang,
        "region": "IN" if base_lang in ["hi", "te", "ta", "ml"] else "US",
    }

    session = requests.Session()
    retries = Retry(total=5, backoff_factor=1, status_forcelist=[429, 500, 502, 503, 504])
    adapter = HTTPAdapter(max_retries=retries)
    session.mount("https://", adapter)

    try:
        response = session.get(url, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()

        results = data.get("results", [])
        if not results:
            print(f"No movies found for language: {language}")
        return [
            {
                "title": movie.get("title"),
                "overview": movie.get("overview"),
                "release_date": movie.get("release_date"),
                "vote_average": movie.get("vote_average"),
                "poster_path": (
                    f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}"
                    if movie.get("poster_path") else None
                ),
            }
            for movie in results
        ]

    except requests.exceptions.RequestException as e:
        print(f"TMDB API request failed ({language}):", e)
        return []
