const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Quiz = require('./models/Quiz');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quizApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quizzes = [
    {
      title: 'General Knowledge',
      description: 'Test your general knowledge with this quiz!',
      questions: [
        {
          text: 'What is the capital of France?',
          choices: ['Paris', 'London', 'Berlin', 'Rome'],
          correctAnswer: 'Paris',
        },
        {
          text: 'Who wrote "To Kill a Mockingbird"?',
          choices: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
          correctAnswer: 'Harper Lee',
        },
      ],
    },
    {
      title: 'Math Quiz',
      description: 'Basic math questions to challenge you.',
      questions: [
        {
          text: 'What is 2 + 2?',
          choices: ['3', '4', '5', '6'],
          correctAnswer: '4',
        },
        {
          text: 'What is the square root of 16?',
          choices: ['2', '4', '6', '8'],
          correctAnswer: '4',
        },
      ],
    },
  ];

  Quiz.insertMany(quizzes)
  .then(() => {
    console.log('Quizzes added');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error adding quizzes:', err);
  });

app.use('/api', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
