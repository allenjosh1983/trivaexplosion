import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css'; // Adjust the import path to correctly locate App.css

function HomePage() {
    const [quiz, setQuiz] = useState('');
    const [options, setOptions] = useState([]);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(true);

    const decodeEntities = (text) => {
        const parser = new DOMParser();
        return parser.parseFromString(text, "text/html").body.textContent;
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getQuiz = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('https://opentdb.com/api.php?amount=2&category=12&type=multiple');
            const data = await response.json();
            const questionData = data.results[0];

            setQuiz(decodeEntities(questionData.question));

            const allOptions = [...new Set(shuffleArray(questionData.incorrect_answers.concat(questionData.correct_answer)))];
            setOptions(allOptions);

            setLoading(false);
        } catch (error) {
            console.log('Error fetching quiz:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getQuiz();
    }, [getQuiz]);

    const handleGenerateQuiz = (event) => {
        event.preventDefault();
        getQuiz();
        setResult('');
    };

    return (
        <div className="page-wrapper">
            {/* ✅ Trivia Quiz Container */}
            <div className="container quiz-container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text-center">
                            <div className="jumbotron">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <>
                                        {/* 🔥 Question */}
                                        {quiz && (
                                            <div className="Question display-6">{quiz}</div>
                                        )}

                                        {/* 🔄 Answer buttons */}
                                        <div className="answers-container">
                                            {options.map((option, index) => (
                                                <button key={index} className="answer-button">
                                                    {decodeEntities(option)}
                                                </button>
                                            ))}
                                        </div>

                                        {result && (
                                            <div style={{ marginTop: '20px' }} className="Result alert alert-primary" role="alert">
                                                <p>{result}</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Trivia Explosion Button BELOW the container */}
            <div className="trivia-button-container">
                <button className="btn btn-primary" onClick={handleGenerateQuiz}>
                    Trivia Explosion!
                </button>
            </div>
        </div>
    );
}

export default HomePage;