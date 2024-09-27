import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from '../api';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await API.get('/quizzes');
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="container">
      <h1>Available Quizzes</h1>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
