const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [
    {
      text: String,
      choices: [String],
      correctAnswer: String,
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);
