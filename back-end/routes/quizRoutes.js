// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get quiz by ID
router.get('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Submit quiz answers
router.post('/quizzes/:id/submit', async (req, res) => {
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    const correctAnswers = [];

    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
      correctAnswers.push(question.correctAnswer);
    });

    res.json({ score, correctAnswers });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting answers' });
  }
});

module.exports = router;
