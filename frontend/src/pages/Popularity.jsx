import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import "./PageStyles.css";

function Popularity() {
  const [movies, setMovies] = useState([]);
  const [n, setN] = useState(10);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const res = await API.get("/genres");
      setGenres(res.data);
    } catch (err) {
      console.error("Failed to fetch genres:", err);
    }
  };

  const fetchPopular = async () => {
    try {
      const res = await API.get("/popularity", {
        params: {
          n,
          genres: selectedGenres.join(","),
        },
      });
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="page-container">
      <h2 className="title">🔝 Top-Rated Movies</h2>

      <div className="form-row">
        <label>How many movies?</label>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="input"
        />

        <label>Filter by Genres:</label>
        <select
          multiple
          className="multi-select"
          value={selectedGenres}
          onChange={(e) =>
            setSelectedGenres(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {genres.map((genre, idx) => (
            <option key={idx} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button className="btn" onClick={fetchPopular}>
          Recommend
        </button>
      </div>

      <div className="movie-list">
        {movies.map((m, idx) => (
          <div className="movie-card" key={idx}>
            <h3>{m.title}</h3>
            <p>⭐ {m.vote_average} ({m.vote_count} votes)</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popularity;
