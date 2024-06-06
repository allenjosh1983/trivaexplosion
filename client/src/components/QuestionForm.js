import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function QuestionForm() {
    const [username, setUsername] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState(new Array(4).fill({ text: '', isCorrect: false }));
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);
    const { quizId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Implementation for handling form submission...
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Create a New Question</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="questionText">Question:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="questionText"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                            />
                        </div>
                        {answers.map((answer, index) => (
                            <div key={index} className="form-group">
                                <label htmlFor={`answer${index + 1}`}>{`Answer ${index + 1}:`}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`answer${index + 1}`}
                                    value={answer.text}
                                    onChange={(e) => {
                                        const newAnswers = [...answers];
                                        newAnswers[index] = { ...answer, text: e.target.value };
                                        setAnswers(newAnswers);
                                    }}
                                />
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`isCorrect${index + 1}`}
                                        checked={index === correctAnswerIndex}
                                        onChange={() => setCorrectAnswerIndex(index)}
                                    />
                                    <label className="form-check-label" htmlFor={`isCorrect${index + 1}`}>
                                        Correct
                                    </label>
                                </div>
                            </div>
                        ))}
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Save Question</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default QuestionForm;
