import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";

function Search({ onSelectMovie }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await API.get("/titles");
        const allTitles = res.data || [];
        const filtered = allTitles.filter((title) =>
          title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5)); // show top 5
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="🔍 Search a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />
      {suggestions.length > 0 && (
        <ul style={{ background: "#fff", listStyle: "none", padding: 10 }}>
          {suggestions.map((title, idx) => (
            <li
              key={idx}
              onClick={() => {
                onSelectMovie(title);
                setQuery(title);
                setSuggestions([]);
              }}
              style={{ padding: "5px", cursor: "pointer" }}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
