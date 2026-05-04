import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Result = () => {
  const location = useLocation();
  const { score = 0, totalQuestions = 0, userAnswers = [], subjectName = 'Quiz' } = location.state || {};
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="container flex-center" style={{ flexDirection: 'column' }}>
      <div className="result-card glass-panel" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-primary">Quiz Completed!</h2>
        <p className="text-secondary">You finished the {subjectName} Quiz</p>
        
        <div className="score-display">
          {score}/{totalQuestions}
        </div>
        
        <h3 className="text-primary" style={{ marginBottom: '2rem' }}>
          {score === totalQuestions && totalQuestions > 0 ? 'Perfect Score! 🌟' : 'Great Job! 🌟'}
        </h3>

        <div className="result-actions" style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="secondary">Back to Subjects</Button>
          </Link>
          <Button onClick={() => setShowReview(!showReview)}>
            {showReview ? 'Hide Answers' : 'Review Answers'}
          </Button>
        </div>
        
        {showReview && (
          <div className="review-section" style={{ textAlign: 'left', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
            <h3 className="text-primary" style={{ marginBottom: '1rem' }}>Review Answers</h3>
            {userAnswers.map((ans, idx) => (
              <div key={idx} className="review-item">
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Q{idx + 1}: {ans.question.text}</p>
                <p>
                  Your Answer: {' '}
                  <span style={{ 
                    color: ans.isCorrect ? '#2ed573' : (ans.timedOut || ans.skipped ? '#ffa502' : '#ff4757'),
                    fontWeight: 'bold'
                  }}>
                    {ans.timedOut ? 'Not answered in time' : (ans.skipped ? 'Skipped' : ans.selectedAnswer)}
                  </span>
                </p>
                {!ans.isCorrect && (
                  <p>Correct Answer: <span style={{ color: '#2ed573', fontWeight: 'bold' }}>{ans.question.correctAnswer}</span></p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
