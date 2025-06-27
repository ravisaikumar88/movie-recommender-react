import React, { useState } from "react";
import API from "../api/axiosConfig";
import Search from "../components/Search";
import "./Tfidf.css";

function Tfidf() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(10);

  const handleSearch = async () => {
    if (!selectedMovie) return;

    try {
      const res = await API.get("/tfidf", {
        params: {
          movie: selectedMovie,
          n: count,
        },
      });
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="tfidf-container">
      <h2>🔍 TF-IDF Based Similar Movies</h2>

      <Search onSelectMovie={(movie) => setSelectedMovie(movie)} />

      <div className="controls">
        <label>How many results?</label>
        <input
          type="number"
          min="1"
          max="20"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
        <button onClick={handleSearch}>Find Similar</button>
      </div>

      <div className="movie-grid">
        {results.map((movie, idx) => (
          <div key={idx} className="movie-card">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-image">🎬</div>
            )}

            <div>
              <h4>{movie.title || "Untitled"}</h4>
              <p>{movie.overview || "No overview available."}</p>
              {movie.vote_average && (
                <span className="badge rating">⭐ {movie.vote_average}</span>
              )}
              {movie.genres && movie.genres.length > 0 ? (
                movie.genres.map((genre, i) => (
                  <span key={i} className="badge genre">
                    🎭 {genre}
                  </span>
                ))
              ) : (
                <span className="badge genre">🎭 Genre not available</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tfidf;
