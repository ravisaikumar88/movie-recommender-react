import React, { useState } from "react";
import API from "../api/axiosConfig";

function Rag() {
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState([]);

  const askQuestion = async () => {
    try {
      const res = await API.get(`/rag`, {
        params: { query: question },
      });
      console.log("RAG Response:", res.data);
      setResults(res.data); // <- update here
    } catch (err) {
      console.error("RAG error:", err);
      setResults([{ title: "Oops!", overview: "Something went wrong." }]);
    }
  };

  return (
    <div>
      <h2>💬 Movie Q&A (RAG Style)</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about a movie..."
        style={{ width: "80%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={askQuestion}>Ask</button>

      <div style={{ marginTop: "20px" }}>
        {results.map((movie, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <strong>{movie.title}</strong>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rag;
