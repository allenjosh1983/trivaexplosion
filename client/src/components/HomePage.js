import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css'; // Adjust the import path to correctly locate App.css

function HomePage() {
    const [quiz, setQuiz] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [fade, setFade] = useState(false);

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
            setFade(true);

            let retries = 3;
            let questionData;

            while (retries > 0) {
                const response = await fetch('https://opentdb.com/api.php?amount=2&category=12&type=multiple');
                const data = await response.json();
                questionData = data.results?.[0];

                if (questionData?.question?.trim() && questionData?.correct_answer?.trim()) {
                    break; // Exit loop when valid question is found
                }

                console.warn(`Retrying quiz fetch... attempts left: ${retries}`);
                retries--;
            }

            if (!questionData) {
                console.error("Failed to load valid quiz data after retries.");
                setQuiz("Oops! Something went wrong. Try again.");
                setOptions([]);
                setLoading(false);
                return;
            }

            setTimeout(() => {
                setQuiz(decodeEntities(questionData.question));
                setCorrectAnswer(decodeEntities(questionData.correct_answer));
                setOptions(shuffleArray([...questionData.incorrect_answers, questionData.correct_answer]));
                setLoading(false);
                setFade(false);
            }, 500);
        } catch (error) {
            console.log('Error fetching quiz:', error);
            setQuiz("Oops! Network error. Try again!");
            setOptions([]);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getQuiz();
    }, [getQuiz]);

   const handleAnswerClick = (event, selectedOption) => {
       const button = event.target;

       if (decodeEntities(selectedOption) === decodeEntities(correctAnswer)) {
           button.classList.add('correct-reveal'); // ONLY applies when clicked
       } else {
           button.classList.add('shake');
           setTimeout(() => button.classList.remove('shake'), 500);
       }
   };

    return (
        <div className="page-wrapper">
            <div className="container quiz-container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text-center">
                            <div className="jumbotron">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <>
                                        <div className={`Question display-6 ${fade ? "fade-out" : "fade-in"}`}>{quiz}</div>

                                        <div className="answers-container">
                                            {options.length > 0 ? (
                                                options.map((option, index) => (
                                                    <button key={index} className="answer-button" onClick={(event) => handleAnswerClick(event, option)}>
                                                        {decodeEntities(option)}
                                                    </button>
                                                ))
                                            ) : (
                                                <p style={{ color: "red" }}>No valid question loaded. Try again!</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="trivia-button-container">
                <button className="answer-button" onClick={getQuiz}>
                    Trivia Explosion!
                </button>
            </div>
        </div>
    );
}

export default HomePage;