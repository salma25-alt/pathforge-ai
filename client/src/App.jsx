// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import RoadmapPage from "./pages/RoadmapPage";
// import "./App.css";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="app-shell">
//         <header className="navbar">
//           <div className="brand">PathForge AI</div>
//           <span className="badge">Stream-Aware Career Architect</span>
//         </header>
//         <main className="main-container">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/roadmap" element={<RoadmapPage />} />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InterestQuizPage from "./pages/InterestQuizPage";
import RoadmapPage from "./pages/RoadmapPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="navbar">
          <div className="brand">PathForge AI</div>
          <span className="badge">Stream-Aware Career Architect</span>
        </header>
        <main className="main-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/find-interest" element={<InterestQuizPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}