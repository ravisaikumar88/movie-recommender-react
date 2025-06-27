import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Popularity from "./pages/Popularity";
import Tfidf from "./pages/Tfidf";
import Hybrid from "./pages/Hybrid";
import Rag from "./pages/Rag";
import Trending from "./pages/Trending";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Popularity />} />
            <Route path="/tfidf" element={<Tfidf />} />
            <Route path="/hybrid" element={<Hybrid />} />
            <Route path="/rag" element={<Rag />} />
            <Route path="/trending" element={<Trending />} />
            
            {/* We'll add more routes next */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
