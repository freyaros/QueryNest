// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/questions/')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleAnswerClick = (id) => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      localStorage.setItem("redirectAfterLogin", `/answer/${id}`);
      navigate("/login");
    } else {
      navigate(`/answer/${id}`);
    }
  };

  return (
    <div className="home-container">
      {/* Banner Section */}
      <div className="animated-banner">
        <h1>Welcome to QueryNest</h1>
        <p>Feel free to ask your college-related questions. Get genuine answers from real college students.</p>
        
        <h5>No login needed to ask. Login required to answer.</h5>
      </div>

      {/* Questions Section */}
      <div className="questions-section">
        <h2>Explore Questions</h2>
        {questions.length === 0 ? (
          <p>No questions found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {questions.map((q) => (
              <li key={q.id}>
                <div className="question-card">
                  <div className="question-title">Q: {q.text}</div>
                  <button style={{marginBottom: 10}} onClick={() => handleAnswerClick(q.id)}>
                    Answer
                  </button>
                  {q.answers.length > 0 ? (
                    <div className="answer-list">
                      <span className="answer-label">Answers:</span>
                      {q.answers.map((a, idx) => (
                        <div className="answer-item" key={idx}>{a}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="answer-empty">No answers yet.</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
