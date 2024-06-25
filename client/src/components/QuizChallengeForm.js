import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css'; // Adjust the import path to correctly locate App.css

function QuizChallengeForm() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailMismatch, setEmailMismatch] = useState(false);
    const [quizSent, setQuizSent] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailMismatch(false);
        setEmailError('');
    };

    const handleConfirmEmailChange = (event) => {
        setConfirmEmail(event.target.value);
        setEmailMismatch(false);
        setEmailError('');
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    const handleSendQuiz = () => {
        const isEmailValid = validateEmail(email);

        if (isEmailValid && email === confirmEmail) {
            // Send quiz logic
            setQuizSent(true);
            // Clear form fields
            setEmail('');
            setConfirmEmail('');
        } else {
            setEmailMismatch(true);
        }
    };

    return (
        <div className="container email-button-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="custom-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {emailError && <p className="text-danger">{emailError}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmEmail">Confirm Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="confirmEmail"
                                value={confirmEmail}
                                onChange={handleConfirmEmailChange}
                            />
                            {emailMismatch && <p className="text-danger">Emails do not match</p>}
                        </div>
                        <button type="button" onClick={handleSendQuiz} className="btn btn-primary custom-button">
                            Send Quiz
                        </button>
                        {quizSent && <p className="text-success mt-3">Quiz sent!</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default QuizChallengeForm;
