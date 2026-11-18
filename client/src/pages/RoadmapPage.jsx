// frontend/src/pages/RoadmapPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PillarItem from "../components/PillarItem";
import SubtopicDetail from "../components/SubtopicDetail";

export default function RoadmapPage() {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [selectedPillarId, setSelectedPillarId] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const saved = sessionStorage.getItem("activeRoadmap");
    if (!saved) {
      navigate("/");
      return;
    }
    const parsed = JSON.parse(saved);
    setRoadmap(parsed);
    if (parsed.pillars?.length > 0) {
      setSelectedPillarId(parsed.pillars[0].id);
    }
  }, [navigate]);

  if (!roadmap) return null;

  const filteredPillars = roadmap.pillars.filter((p) =>
    filter === "ALL" ? true : p.category === filter
  );

  const activePillar =
    filteredPillars.find((p) => p.id === selectedPillarId) || filteredPillars[0];

  return (
    <div className="roadmap-wrapper">
      <div className="roadmap-top-bar">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Change Goal
        </button>
        <div className="filter-tabs">
          {["ALL", "Core Skill", "Soft Skill"].map((tab) => (
            <button
              key={tab}
              className={filter === tab ? "tab active" : "tab"}
              onClick={() => setFilter(tab)}
            >
              {tab === "ALL" ? `All Pillars (${roadmap.pillars.length})` : `${tab}s`}
            </button>
          ))}
        </div>
      </div>

      <div className="roadmap-header-card">
        <span className="timeline-badge">Est. Timeline: {roadmap.estimatedTimeline}</span>
        <h1>{roadmap.careerTitle} Roadmap</h1>
        <p className="strategy-note">{roadmap.streamStrategy}</p>
      </div>

      <div className="roadmap-split-layout">
        <div className="macro-column">
          <h3>Big Pillars (Click to Expand)</h3>
          {filteredPillars.map((pillar, index) => (
            <PillarItem
              key={pillar.id}
              pillar={pillar}
              index={index}
              isSelected={activePillar?.id === pillar.id}
              onSelect={setSelectedPillarId}
            />
          ))}
        </div>

        <div className="micro-column">
          <SubtopicDetail pillar={activePillar} />
        </div>
      </div>
    </div>
  );
}