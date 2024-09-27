import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await API.get('/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes', error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Available Quizzes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105">
            <Link to={`/quiz/${quiz._id}`} className="block p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{quiz.title}</h4>
              <p className="text-gray-600">{quiz.description}</p>
              <span className="mt-4 inline-block bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-semibold transition duration-200 hover:bg-blue-600">
                Start Quiz
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
