import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.html';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Part1 from "./Views/Part1.tsx"
import Part2 from "./Views/Part2.tsx";
import ViewGraph1 from "./Views/ViewGraph1.tsx";
import ViewGraph2 from "./Views/ViewGraph2.tsx";
import ViewGraph3 from "./Views/ViewGraph3.tsx";
import ViewGraph4 from "./Views/ViewGraph4.tsx";
import FinalGenerateGraph from './FinalGenerateGraph.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Part1 />} />
        <Route path="/part2" element={<Part2 />} />
        <Route path="/ViewGraph1" element={<ViewGraph1 />} />
        <Route path="/ViewGraph2" element={<ViewGraph2 />} />
        <Route path="/ViewGraph3" element={<ViewGraph3 />} />
        <Route path="/ViewGraph4" element={<ViewGraph4 />} />
        <Route path="/FinalGenerateGraph/:selectedCountry" element={<FinalGenerateGraph />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
