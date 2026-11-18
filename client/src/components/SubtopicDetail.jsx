// frontend/src/components/SubtopicDetail.jsx
export default function SubtopicDetail({ pillar }) {
  if (!pillar) return null;

  return (
    <div className="micro-panel">
      <div className="micro-header">
        <span className={`cat-tag ${pillar.category === "Soft Skill" ? "soft" : "core"}`}>
          {pillar.category}
        </span>
        <h2>{pillar.title}</h2>
        <p>{pillar.overview}</p>
      </div>

      <h3>Step-by-Step Breakdown</h3>
      <div className="subtopics-list">
        {pillar.subtopics.map((sub, i) => (
          <div key={i} className="subtopic-card">
            <div className="subtopic-title">
              <span className="bullet-index">{i + 1}</span>
              <h4>{sub.name}</h4>
            </div>
            <p className="learn-text">
              <strong>What to master:</strong> {sub.whatToLearn}
            </p>
            <div className="milestone-box">
              <strong>Practical Milestone:</strong> {sub.practicalMilestone}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}