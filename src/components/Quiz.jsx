import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from './Button';
import { questionsData } from '../data/questions';

const Quiz = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  
  const questions = questionsData[subjectId] || questionsData.js;
  const subjectsMap = {
    js: 'JavaScript',
    python: 'Python',
    html: 'HTML',
    css: 'CSS',
    react: 'React',
    node: 'Node.js',
    dsa: 'DSA',
    express: 'Express',
    gk: 'General Knowledge'
  };
  const subjectName = subjectsMap[subjectId] || 'Quiz';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex]);

  const handleTimeout = () => {
    const newAnswer = {
      question: currentQuestion,
      selectedAnswer: null,
      isCorrect: false,
      timedOut: true,
      skipped: false
    };
    moveToNext(newAnswer);
  };

  const handleSkip = () => {
    const newAnswer = {
      question: currentQuestion,
      selectedAnswer: null,
      isCorrect: false,
      timedOut: false,
      skipped: true
    };
    moveToNext(newAnswer);
  };

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAnswer = {
      question: currentQuestion,
      selectedAnswer: selectedOption,
      isCorrect,
      timedOut: false,
      skipped: false
    };
    moveToNext(newAnswer);
  };

  const moveToNext = (newAnswer) => {
    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(15);
    } else {
      const score = updatedAnswers.filter(ans => ans.isCorrect).length;
      navigate('/result', {
        state: {
          score,
          totalQuestions: questions.length,
          userAnswers: updatedAnswers,
          subjectName
        }
      });
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container flex-center">
      <div className="quiz-card glass-panel" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="progress-container">
          <div className="progress-text">
            <span>{subjectName} Quiz</span>
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className={`timer-container ${timeLeft <= 5 ? 'timer-pulse' : ''}`} style={{ textAlign: 'right', marginBottom: '1rem', fontWeight: 'bold' }}>
          Time Left: {timeLeft}s
        </div>

        <h2 className="question-text text-primary">
          {currentQuestion.text}
        </h2>

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button 
              key={index}
              className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '2rem' }}>
          <Button variant="secondary" onClick={handleSkip} style={{ flex: 1 }}>Skip</Button>
          <Button onClick={handleNext} disabled={!selectedOption} style={{ flex: 2, opacity: !selectedOption ? 0.5 : 1, cursor: !selectedOption ? 'not-allowed' : 'pointer' }}>Next Question</Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
