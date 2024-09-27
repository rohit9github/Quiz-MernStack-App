import React from 'react';
import { useLocation } from 'react-router-dom';

const ScoreSummary = () => {
  const location = useLocation();
  const { score, correctAnswers } = location.state;

  return (
    <div className="container">
      <h2>Your Score: {score}</h2>
      <h3>Correct Answers:</h3>
      <ul>
        {correctAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreSummary;
