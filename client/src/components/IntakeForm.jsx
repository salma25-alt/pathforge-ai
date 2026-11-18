// import { STREAM_OPTIONS, QUIZ_QUESTIONS } from "../constants/quizData";

// export default function IntakeForm({
//   age,
//   setAge,
//   stream,
//   setStream,
//   hasInterest,
//   setHasInterest,
//   interestText,
//   setInterestText,
//   quizAnswers,
//   setQuizAnswers,
//   onSubmit,
//   isLoading
// }) {
//   const handleSelectOption = (questionId, option) => {
//     setQuizAnswers((prev) => ({ ...prev, [questionId]: option }));
//   };

//   return (
//     <form onSubmit={onSubmit} className="intake-form">
//       <div className="form-row">
//         <div className="form-group">
//           <label>Your Age</label>
//           <input
//             type="number"
//             min="13"
//             max="45"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Current Stream / Background</label>
//           <select value={stream} onChange={(e) => setStream(e.target.value)}>
//             {STREAM_OPTIONS.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="toggle-container">
//         <button
//           type="button"
//           className={hasInterest ? "toggle-btn active" : "toggle-btn"}
//           onClick={() => setHasInterest(true)}
//         >
//           I Know My Interest / Goal
//         </button>
//         <button
//           type="button"
//           className={!hasInterest ? "toggle-btn active" : "toggle-btn"}
//           onClick={() => setHasInterest(false)}
//         >
//           Help Me Find My Interest
//         </button>
//       </div>

//       {hasInterest ? (
//         <div className="form-group">
//           <label>What do you enjoy or want to become?</label>
//           <input
//             type="text"
//             placeholder="e.g., Building websites, becoming a doctor, finance, design..."
//             value={interestText}
//             onChange={(e) => setInterestText(e.target.value)}
//             required
//           />
//         </div>
//       ) : (
//         <div className="quiz-box">
//           <h3>Quick Interest Discovery</h3>
//           {QUIZ_QUESTIONS.map((q) => (
//             <div key={q.id} className="quiz-item">
//               <p className="quiz-q">{q.question}</p>
//               <div className="quiz-options">
//                 {q.options.map((opt) => (
//                   <button
//                     type="button"
//                     key={opt}
//                     className={quizAnswers[q.id] === opt ? "opt-btn selected" : "opt-btn"}
//                     onClick={() => handleSelectOption(q.id, opt)}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <button type="submit" className="primary-btn" disabled={isLoading}>
//         {isLoading ? "Analyzing Stream & Interests..." : "Find My Career Matches"}
//       </button>
//     </form>
//   );
// }





import { STREAM_OPTIONS } from "../constants/quizData";

export default function IntakeForm({
  age,
  setAge,
  stream,
  setStream,
  interestText,
  setInterestText,
  onSubmit,
  onNavigateToQuiz,
  isLoading
}) {
  return (
    <form onSubmit={onSubmit} className="intake-form">
      <div className="form-row">
        <div className="form-group">
          <label>Your Age</label>
          <input
            type="number"
            min="13"
            max="45"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Current Stream / Background</label>
          <select value={stream} onChange={(e) => setStream(e.target.value)}>
            {STREAM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>What do you enjoy or want to become?</label>
        <input
          type="text"
          placeholder="e.g., Building websites, becoming a doctor, finance, design..."
          value={interestText}
          onChange={(e) => setInterestText(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="primary-btn" disabled={isLoading}>
        {isLoading ? "Analyzing Stream & Interests..." : "Find My Career Matches"}
      </button>

      <div className="quiz-redirect-box">
        <span>Not sure what career suits you yet?</span>
        <button
          type="button"
          className="secondary-nav-btn"
          onClick={onNavigateToQuiz}
          disabled={isLoading}
        >
          Help Me Find My Interest →
        </button>
      </div>
    </form>
  );
}