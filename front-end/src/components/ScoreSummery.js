import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ScoreSummary = () => {
  const location = useLocation();
  const { score, correctAnswers } = location.state;

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Score: {score}</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Correct Answers:</h3>
        <ul className="list-disc list-inside space-y-2">
          {correctAnswers.map((answer, index) => (
            <li key={index} className="text-gray-600">
              {answer}
            </li>
          ))}
        </ul>
        <Link to={"/"}>
        <button
          className="mt-6 bg-blue-600 text-white rounded-md px-4 py-2 transition duration-200 hover:bg-blue-700"
        >
          Retry Quiz
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ScoreSummary;
