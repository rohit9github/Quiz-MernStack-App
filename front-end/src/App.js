import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import ScoreSummary from './components/ScoreSummery';
import AddQuiz from './components/AddQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path='/add-quiz' element={<AddQuiz/>}/>
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/score" element={<ScoreSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
