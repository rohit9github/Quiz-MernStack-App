import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await API.get(`/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz', error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    try {
      const response = await API.post(`/quizzes/${id}/submit`, { answers });
      setScore(response.data.score);
      navigate('/score', {
        state: { score: response.data.score, correctAnswers: response.data.correctAnswers },
      });
    } catch (error) {
      console.error('Error submitting quiz', error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[currentQuestion];

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-4">{quiz.title}</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h4 className="text-xl font-semibold mb-4">{question.text}</h4>
        <ul className="space-y-4">
          {question.choices.map((choice, index) => (
            <li key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-100 transition duration-200">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                onClick={() => handleAnswerSelect(currentQuestion, choice)}
                className="form-radio text-blue-500 focus:ring-blue-500"
              />
              <label className="text-gray-800">{choice}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-4">
        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            className="bg-blue-600 text-white rounded-md px-4 py-2 transition duration-200 hover:bg-blue-700"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-600 text-white rounded-md px-4 py-2 transition duration-200 hover:bg-green-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
