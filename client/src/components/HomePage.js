import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css';
import TriviaBombGame from './TriviaBombGame'; // ✅ Bomb game component
import { fetchTriviaQuestions } from '../utils/api'; // ✅ Modular data fetch

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quiz questions using modular utility
  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      try {
        const result = await fetchTriviaQuestions(3, 12); // 🎯 Get 3 questions from category 12 (Entertainment)
        setQuestions(result);
      } catch (err) {
        console.error("Error fetching trivia:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container quiz-container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            {loading ? (
              <p>Loading your explosive challenge...</p>
            ) : (
              <TriviaBombGame questions={questions} /> // 💣 Launch the bomb game!
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;