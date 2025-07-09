import React, { useState, useEffect } from 'react';
import { fetchTriviaQuestions } from '../utils/api';
import '../App.css'; // Uses your global styling

function TriviaBombGame({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [questionList, setQuestionList] = useState(questions);

  useEffect(() => {
    if (!gameActive || timer <= 0) {
      setIsExploded(true);
      setGameActive(false);
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, gameActive]);

  const handleAnswer = (isCorrect) => {
    if (!gameActive) return;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setTimer((prev) => Math.min(prev + 5, 30));
    } else {
      setTimer((prev) => Math.max(prev - 3, 1));
    }

    if (currentIndex + 1 < questionList.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameActive(false);
    }
  };

  const resetGame = async () => {
    const newQuestions = await fetchTriviaQuestions(3, 12);
    setQuestionList(newQuestions);
    setCurrentIndex(0);
    setTimer(15);
    setScore(0);
    setIsExploded(false);
    setGameActive(true);
  };

  const currentQuestion = questionList[currentIndex];

  if (isExploded) {
    return (
      <div className="explosion-screen">
        <h2 className="explosion-text">💥 Boom! Trivia Bomb Exploded</h2>
        <p className="score-display">Final Score: {score}</p>
        <button className="answer-button" onClick={resetGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="cyberpunk-ui">
      <div className={`bomb-timer ${timer <= 5 ? 'exploding' : ''}`}>{timer}s</div>
      <h2>{currentQuestion.text}</h2>
      <div className="answers-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className="answer-button"
            onClick={() => handleAnswer(option.isCorrect)}
          >
            {option.text}
          </button>
        ))}
      </div>
      <div className="score-display">Score: {score}</div>
    </div>
  );
}

export default TriviaBombGame;