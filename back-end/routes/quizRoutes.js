const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Add a new quiz
router.post('/quizzes', async (req, res) => {
    try {
      const quiz = new Quiz(req.body);
      await quiz.save();
      res.status(201).json(quiz);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create quiz' });
    }
  });  

// Get all quizzes
router.get('/quizzes', async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// Get quiz by ID
router.get('/quizzes/:id', async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});

// Submit quiz answers
router.post('/quizzes/:id/submit', async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  let score = 0;
  const correctAnswers = [];

  quiz.questions.forEach((question, index) => {
    if (question.correctAnswer === answers[index]) {
      score++;
    }
    correctAnswers.push(question.correctAnswer);
  });

  res.json({ score, correctAnswers });
});

module.exports = router;
