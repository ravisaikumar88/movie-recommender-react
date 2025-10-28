import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Trending() {
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("en-US");

  const fetchTrending = async () => {
    try {
      const res = await API.get("/trending", { params: { language } });
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [language]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔥 Trending Movies This Week</h2>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="language">Choose Language: </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="te-IN">Telugu</option>
          <option value="ta-IN">Tamil</option>
          <option value="ml-IN">Malayalam</option>
        </select>
      </div>

      {movies.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {movies.map((movie, idx) => (
            <div
              key={idx}
              style={{
                background: "#f8f8f8",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {movie.poster_path ? (
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "300px",
                    background: "#ddd",
                    borderRadius: "8px",
                  }}
                ></div>
              )}
              <h4 style={{ marginTop: "10px" }}>{movie.title}</h4>
              <p style={{ fontSize: "0.9em" }}>
                ⭐ {movie.vote_average || "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found for this language.</p>
      )}
    </div>
  );
}

export default Trending;
