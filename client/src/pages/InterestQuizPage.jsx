import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QUIZ_QUESTIONS } from "../constants/quizData";
import { fetchCareerMatches, fetchCareerRoadmap } from "../services/careerApi";
import GoalCard from "../components/GoalCard";

export default function InterestQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve age & stream passed from HomePage (with safe fallback)
  const age = location.state?.age || 18;
  const stream = location.state?.stream || "12th Commerce";

  const [quizAnswers, setQuizAnswers] = useState({});
  const [loadingGoals, setLoadingGoals] = useState(false);
  const [buildingGoalTitle, setBuildingGoalTitle] = useState(null);
  const [discoveryResult, setDiscoveryResult] = useState(null);
  const [error, setError] = useState("");

  const handleSelectOption = (questionId, option) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleDiscoverFromQuiz = async (e) => {
    e.preventDefault();
    if (Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length) {
      setError("Please answer all questions before discovering your matches.");
      return;
    }

    setError("");
    setLoadingGoals(true);
    setDiscoveryResult(null);

    try {
      const data = await fetchCareerMatches({
        age,
        stream,
        hasInterest: false,
        interestText: "",
        quizAnswers
      });
      setDiscoveryResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingGoals(false);
    }
  };

  const handleAcceptGoal = async (goal) => {
    setBuildingGoalTitle(goal.title);
    setError("");

    try {
      const roadmapData = await fetchCareerRoadmap({
        age,
        stream,
        acceptedGoal: goal
      });
      sessionStorage.setItem("activeRoadmap", JSON.stringify(roadmapData));
      navigate("/roadmap");
    } catch (err) {
      setError(err.message);
      setBuildingGoalTitle(null);
    }
  };

  return (
    <div className="intake-wrapper">
      <div className="quiz-page-topbar">
        <button type="button" className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <span className="profile-chip">
          Profile: Age {age} • {stream}
        </span>
      </div>

      <section className="hero-card">
        <h1>Interest Discovery Quiz</h1>
        <p className="subtitle">
          Pick the options that feel most natural to you. We will match them against your {stream} background.
        </p>

        <form onSubmit={handleDiscoverFromQuiz}>
          <div className="quiz-box">
            {QUIZ_QUESTIONS.map((q, index) => (
              <div key={q.id} className="quiz-item">
                <p className="quiz-q">
                  {index + 1}. {q.question}
                </p>
                <div className="quiz-options">
                  {q.options.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className={quizAnswers[q.id] === opt ? "opt-btn selected" : "opt-btn"}
                      onClick={() => handleSelectOption(q.id, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="primary-btn" disabled={loadingGoals}>
            {loadingGoals ? "Discovering Best Careers For You..." : "Discover My Career Matches"}
          </button>
        </form>

        {error && <div className="error-banner">{error}</div>}
      </section>

      {discoveryResult && (
        <section className="results-section">
          <div className="analysis-banner">
            <strong>Advisor Note:</strong> {discoveryResult.analysisSummary}
          </div>

          <div className="cards-grid">
            {discoveryResult.recommendations.map((goal, idx) => (
              <GoalCard
                key={idx}
                goal={goal}
                onAccept={handleAcceptGoal}
                isBuilding={buildingGoalTitle === goal.title}
                disabled={buildingGoalTitle !== null}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}