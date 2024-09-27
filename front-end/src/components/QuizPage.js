import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await API.get(`/quizzes/${id}`);
      setQuiz(response.data);
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    const response = await API.post(`/quizzes/${id}/submit`, { answers });
    setScore(response.data.score);
    navigate('/score', { state: { score: response.data.score, correctAnswers: response.data.correctAnswers } });
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[currentQuestion];

  return (
    <div className="container">
      <h2>{quiz.title}</h2>
      <h3>{question.text}</h3>
      <ul>
        {question.choices.map((choice, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                onClick={() => handleAnswerSelect(currentQuestion, choice)}
              />
              {choice}
            </label>
          </li>
        ))}
      </ul>

      {currentQuestion < quiz.questions.length - 1 ? (
        <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
      ) : (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default QuizPage;
