import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🎬 Movie Recs</h2>
      <nav>
        <ul>
          <li><Link to="/">Popularity</Link></li>
          <li><Link to="/tfidf">TF-IDF</Link></li>
          <li><Link to="/hybrid">Hybrid</Link></li>
          <li><Link to="/rag">RAG Q&A</Link></li>
          <li><Link to="/trending">Trending</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
