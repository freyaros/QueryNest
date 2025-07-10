import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Answer() {
  const { id } = useParams(); // question ID from URL
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the question details using the ID
    fetch(`http://localhost:8000/api/questions/${id}/`)
      .then((res) => res.json())
      .then((data) => setQuestion(data))
      .catch((err) => console.error("Error fetching question:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("studentToken");
    const name = localStorage.getItem("studentName");
    const register_number = localStorage.getItem("studentRegNo");
    if (!token || !name || !register_number) {
      alert("You must be logged in to answer.");
      navigate("/login");
      return;
    }

    const res = await fetch(`http://localhost:8000/api/answer/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        register_number,
        answer_text: answerText, // <-- change 'answer' to 'answer_text'
      }),
    });

    if (res.ok) {
      setMessage("Answer submitted successfully!");
      setAnswerText("");
    } else {
      setMessage("Error submitting answer.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      {question ? (
        <div className="question-card">
          <div className="question-title">Q: {question.question_text}</div>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Type your answer here..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: "10px", marginTop: "20px" }}
              required
            />
            <button type="submit" style={{ marginTop: "10px" }}>
              Submit Answer
            </button>
          </form>
          {message && <p>{message}</p>}
          <div className="answer-list" style={{ marginTop: "24px" }}>
            <span className="answer-label">Previous Answers:</span>
            {question.answers && question.answers.length > 0 ? (
              question.answers.map((a, idx) => (
                <div className="answer-item" key={idx}>
                  {a}
                </div>
              ))
            ) : (
              <div className="answer-empty">No answers yet.</div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default Answer;
