import React, { useState } from 'react';
import API from '../api';

const AddQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questions: [
      {
        text: '',
        choices: ['', '', '', ''],
        correctAnswer: '',
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/quizzes', quiz);
      alert('Quiz added successfully');
    } catch (error) {
      console.error('Failed to add quiz', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Quiz Title"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <textarea
        placeholder="Quiz Description"
        value={quiz.description}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
      />

      {/* Render questions dynamically */}
      {quiz.questions.map((question, idx) => (
        <div key={idx}>
          <input
            type="text"
            placeholder="Question text"
            value={question.text}
            onChange={(e) => {
              const newQuestions = [...quiz.questions];
              newQuestions[idx].text = e.target.value;
              setQuiz({ ...quiz, questions: newQuestions });
            }}
          />
          {question.choices.map((choice, cIdx) => (
            <input
              key={cIdx}
              type="text"
              placeholder={`Choice ${cIdx + 1}`}
              value={choice}
              onChange={(e) => {
                const newQuestions = [...quiz.questions];
                newQuestions[idx].choices[cIdx] = e.target.value;
                setQuiz({ ...quiz, questions: newQuestions });
              }}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) => {
              const newQuestions = [...quiz.questions];
              newQuestions[idx].correctAnswer = e.target.value;
              setQuiz({ ...quiz, questions: newQuestions });
            }}
          />
        </div>
      ))}

      <button type="submit">Add Quiz</button>
    </form>
  );
};

export default AddQuiz;
