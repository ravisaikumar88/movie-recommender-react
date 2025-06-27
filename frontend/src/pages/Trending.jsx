import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Trending() {
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("en");

  const fetchTrending = async () => {
    try {
      const res = await API.get("/trending", {
        params: { language },
      });
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [language]);

  return (
    <div>
      <h2>🔥 Trending Movies This Week</h2>

      <label htmlFor="language">Choose Language: </label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginBottom: "15px" }}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
        <option value="ta">Tamil</option>
        <option value="ml">Malayalam</option>
      </select>

      {movies.length === 0 && <p>No movies found for this language.</p>}

      {movies.map((movie, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <h4>{movie.title}</h4>
          <p>{movie.overview}</p>
          <p><b>⭐ {movie.vote_average}</b> | {movie.release_date}</p>
        </div>
      ))}
    </div>
  );
}

export default Trending;
