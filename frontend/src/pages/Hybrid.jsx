import React, { useState } from "react";
import API from "../api/axiosConfig";

function Hybrid() {
  const [movieName, setMovieName] = useState("");
  const [alpha, setAlpha] = useState(0.5);
  const [results, setResults] = useState([]);

  const handleFetch = async () => {
    try {
      const res = await API.get(`/hybrid`, {
        params: {
          movie: movieName,
          n: 10,
          alpha: alpha,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error("Hybrid fetch error:", err);
    }
  };

  return (
    <div>
      <h2>🎯 Hybrid Recommendations</h2>

      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Enter movie name (e.g. Toy Story)"
      />
      <br />
      <label>Popularity vs Similarity (α): {alpha}</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={alpha}
        onChange={(e) => setAlpha(parseFloat(e.target.value))}
      />
      <br />
      <button onClick={handleFetch}>Get Recommendations</button>

      <ul>
        {results.map((title, i) => (
          <li key={i}>🎬 {title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Hybrid;
