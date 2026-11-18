export default function GoalCard({ goal, onAccept, isBuilding, disabled }) {
  const pillClass = goal.fitType.toLowerCase().replace(" ", "-");

  return (
    <div className="goal-card">
      <div>
        <div className="goal-header">
          <span className={`fit-pill ${pillClass}`}>{goal.fitType}</span>
          <span className="match-score">{goal.matchScore}% Match</span>
        </div>

        <h3>{goal.title}</h3>
        <p className="tagline">{goal.tagline}</p>

        <div className="reality-box">
          <strong>Stream & Eligibility Check:</strong>
          <p>{goal.streamRealityNote}</p>
        </div>
      </div>

      <button className="accept-btn" disabled={disabled} onClick={() => onAccept(goal)}>
        {isBuilding ? "Building Your Interactive Roadmap..." : "Accept Goal & View Roadmap →"}
      </button>
    </div>
  );
}