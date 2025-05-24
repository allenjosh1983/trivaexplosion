import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css'; // Adjust the import path to correctly locate App.css

function HomePage() {
    const [quiz, setQuiz] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [result, setResult] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectResponses, setIncorrectResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    const decodeEntities = (text) => {
        const parser = new DOMParser();
        return parser.parseFromString(text, "text/html").body.textContent;
    };

    const getQuiz = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('https://opentdb.com/api.php?amount=2&category=12&type=multiple');
            const data = await response.json();
            const questionData = data.results[0];

            setQuiz(decodeEntities(questionData.question));
            setCorrectAnswer(questionData.correct_answer);

            const allOptions = [...new Set(shuffleArray(questionData.incorrect_answers.concat(questionData.correct_answer)))];
            setOptions(allOptions);

            const questionResponses = allOptions.map((option) =>
                option === questionData.correct_answer ? 'Correct!' : `${option} is incorrect.`
            );
            setIncorrectResponses(questionResponses);

            setLoading(false);
        } catch (error) {
            console.log('Error fetching quiz:', error);
            setLoading(false);
        }
    }, []);

    const handleQuizSubmit = useCallback(() => {
        if (selectedAnswer === '') {
            return;
        }

        const isCorrect = selectedAnswer === correctAnswer;
        if (isCorrect) {
            setResult('Correct!');
            setTimeout(() => {
                getQuiz();
                setResult('');
            }, 5000);
        } else {
            const currentIndex = options.indexOf(selectedAnswer);
            setResult(incorrectResponses[currentIndex]);
        }
    }, [selectedAnswer, correctAnswer, options, incorrectResponses, getQuiz]);

    useEffect(() => {
        const timer = setTimeout(() => {
            getQuiz();
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [getQuiz]);

    useEffect(() => {
        handleQuizSubmit();
    }, [selectedAnswer, correctAnswer, options, incorrectResponses, handleQuizSubmit]);

    const handleGenerateQuiz = (event) => {
        event.preventDefault();
        getQuiz();
        setSelectedAnswer('');
        setResult('');
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <div className="container quiz-container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="text-center">
                        <div className="jumbotron">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {/* 🔄 Scrolling message ABOVE the question */}
                                    <div className="scrolling-message-container top-message">
                                        <p className="scrolling-message">Choose Wisely</p>
                                    </div>

                                    {/* 🔥 Question remains unchanged */}
                                    {quiz && (
                                        <div className="Question display-6">{quiz}</div>
                                    )}

                                    {/* 🔄 Scrolling message BELOW the question */}
                                    <div className="scrolling-message-container bottom-message">
                                        <p className="scrolling-message">Your Fate Awaits...</p>
                                    </div>

                                    {/* 🔄 FIXED: One button per answer */}
                                    <div className="answers-container">
                                        {options.map((option, index) => (
                                            <button key={index} className="answer-button" onClick={() => setSelectedAnswer(option)}>
                                                {decodeEntities(option)}
                                            </button>
                                        ))}
                                    </div>

                                    {/* 🔄 Scrolling message BELOW the question */}
                                    <div className="scrolling-message-container bottom-message">
                                        <p className="scrolling-message">Your Fate Awaits...</p>
                                    </div>

                                    {result && (
                                        <div style={{ marginTop: '20px' }} className="Result alert alert-primary" role="alert">
                                            <p>{result}</p>
                                        </div>
                                    )}

                                    <div style={{ marginTop: '20px' }}>
                                        <button className="btn btn-primary" onClick={handleGenerateQuiz}>
                                            Trivia Explosion!
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;