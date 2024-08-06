import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Add your login logic here
    console.log('Logging in with Username:', username, 'and Password:', password);
  };

  return (
    <div className="container login-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <form className="custom-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
             <input
               type="text"
               className="form-control full-width-input"
               id="username"
               value={username}
               onChange={handleUsernameChange}
             />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control full-width-input"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="button" onClick={handleLogin} className="btn btn-primary custom-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
