import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css'; // Ensure this path is correct

function InvitePage() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  };

  const handleSendQuiz = () => {
    // Add your logic for sending quiz here
    console.log('Sending quiz to:', email, 'and confirm email:', confirmEmail);
  };

  return (
    <div className="container invite-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <form className="custom-form">
            <div className="form-group email-container">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control full-width-input"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group email-container">
              <label htmlFor="confirmEmail">Confirm Email:</label>
              <input
                type="email"
                className="form-control full-width-input"
                id="confirmEmail"
                value={confirmEmail}
                onChange={handleConfirmEmailChange}
              />
            </div>
            <button type="button" onClick={handleSendQuiz} className="btn btn-primary custom-button">
              Send Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InvitePage;
