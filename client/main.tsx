import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.html';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Part1 from "./Views/Part1.tsx"
import Part2 from "./Views/Part2.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Part1 />} />
        <Route path="/part2" element={<Part2 />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
