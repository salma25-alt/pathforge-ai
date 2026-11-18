// frontend/src/components/PillarItem.jsx
export default function PillarItem({ pillar, index, isSelected, onSelect }) {
  const isSoft = pillar.category === "Soft Skill";

  return (
    <div
      className={`pillar-card ${isSelected ? "selected" : ""} ${
        isSoft ? "soft-border" : "core-border"
      }`}
      onClick={() => onSelect(pillar.id)}
    >
      <div className="pillar-meta">
        <span className="step-num">Phase {index + 1}</span>
        <span className={`cat-tag ${isSoft ? "soft" : "core"}`}>{pillar.category}</span>
        <span className="duration-tag">{pillar.duration}</span>
      </div>
      <h4>{pillar.title}</h4>
      <p>{pillar.overview}</p>
      <div className="subtopic-count">{pillar.subtopics.length} sub-topics inside →</div>
    </div>
  );
}