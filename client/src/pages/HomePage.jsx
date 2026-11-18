// // frontend/src/pages/HomePage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchCareerMatches, fetchCareerRoadmap } from "../services/careerApi";
// import IntakeForm from "../components/IntakeForm";
// import GoalCard from "../components/GoalCard";

// export default function HomePage() {
//   const navigate = useNavigate();

//   const [age, setAge] = useState("18");
//   const [stream, setStream] = useState("12th Commerce");
//   const [hasInterest, setHasInterest] = useState(true);
//   const [interestText, setInterestText] = useState("");
//   const [quizAnswers, setQuizAnswers] = useState({});

//   const [loadingGoals, setLoadingGoals] = useState(false);
//   const [buildingGoalTitle, setBuildingGoalTitle] = useState(null);
//   const [discoveryResult, setDiscoveryResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleFindGoals = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoadingGoals(true);
//     setDiscoveryResult(null);

//     try {
//       const data = await fetchCareerMatches({
//         age: Number(age),
//         stream,
//         hasInterest,
//         interestText,
//         quizAnswers
//       });
//       setDiscoveryResult(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoadingGoals(false);
//     }
//   };

//   const handleAcceptGoal = async (goal) => {
//     setBuildingGoalTitle(goal.title);
//     setError("");

//     try {
//       const roadmapData = await fetchCareerRoadmap({
//         age: Number(age),
//         stream,
//         acceptedGoal: goal
//       });
//       sessionStorage.setItem("activeRoadmap", JSON.stringify(roadmapData));
//       navigate("/roadmap");
//     } catch (err) {
//       setError(err.message);
//       setBuildingGoalTitle(null);
//     }
//   };

//   return (
//     <div className="intake-wrapper">
//       <section className="hero-card">
//         <h1>Discover Your Realistic Career Path</h1>
//         <p className="subtitle">
//           Tell us your age, current stream, and interests. We check stream eligibility and build an interactive roadmap.
//         </p>

//         <IntakeForm
//           age={age}
//           setAge={setAge}
//           stream={stream}
//           setStream={setStream}
//           hasInterest={hasInterest}
//           setHasInterest={setHasInterest}
//           interestText={interestText}
//           setInterestText={setInterestText}
//           quizAnswers={quizAnswers}
//           setQuizAnswers={setQuizAnswers}
//           onSubmit={handleFindGoals}
//           isLoading={loadingGoals}
//         />

//         {error && <div className="error-banner">{error}</div>}
//       </section>

//       {discoveryResult && (
//         <section className="results-section">
//           <div className="analysis-banner">
//             <strong>Advisor Note:</strong> {discoveryResult.analysisSummary}
//           </div>

//           <div className="cards-grid">
//             {discoveryResult.recommendations.map((goal, idx) => (
//               <GoalCard
//                 key={idx}
//                 goal={goal}
//                 onAccept={handleAcceptGoal}
//                 isBuilding={buildingGoalTitle === goal.title}
//                 disabled={buildingGoalTitle !== null}
//               />
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCareerMatches, fetchCareerRoadmap } from "../services/careerApi";
import IntakeForm from "../components/IntakeForm";
import GoalCard from "../components/GoalCard";

export default function HomePage() {
  const navigate = useNavigate();

  const [age, setAge] = useState("18");
  const [stream, setStream] = useState("12th Commerce");
  const [interestText, setInterestText] = useState("");

  const [loadingGoals, setLoadingGoals] = useState(false);
  const [buildingGoalTitle, setBuildingGoalTitle] = useState(null);
  const [discoveryResult, setDiscoveryResult] = useState(null);
  const [error, setError] = useState("");

  const handleNavigateToQuiz = () => {
    navigate("/find-interest", {
      state: { age: Number(age), stream }
    });
  };

  const handleFindGoals = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingGoals(true);
    setDiscoveryResult(null);

    try {
      const data = await fetchCareerMatches({
        age: Number(age),
        stream,
        hasInterest: true,
        interestText,
        quizAnswers: {}
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
        age: Number(age),
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
      <section className="hero-card">
        <h1>Discover Your Realistic Career Path</h1>
        <p className="subtitle">
          Enter your age, stream, and goal—or jump to our interest discovery quiz if you are undecided.
        </p>

        <IntakeForm
          age={age}
          setAge={setAge}
          stream={stream}
          setStream={setStream}
          interestText={interestText}
          setInterestText={setInterestText}
          onSubmit={handleFindGoals}
          onNavigateToQuiz={handleNavigateToQuiz}
          isLoading={loadingGoals}
        />

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