// src/components/ask.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Ask() {
  const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/questions/', {
        question: question,
      });

      if (response.status === 200) {
        setMessage('✅ Question submitted successfully!');
        setQuestion('');
      } else {
        setMessage('❌ Failed to submit question.');
      }
    } catch (error) {
      setMessage('❌ Error submitting question.');
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h2 style={{ color: "#66fcf1", marginBottom: "20px" }}>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          required
        />
        <button type="submit">Submit Question</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
