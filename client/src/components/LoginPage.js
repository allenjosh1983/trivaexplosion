import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

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
        // Add further login process or API call as needed
    };

    return (
        <div>
            <form className="custom-button-container">
              <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange} />
              </label>
              <br />
              <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
              </label>
              <br />
              <button type="button" className="btn btn-primary custom-button" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
    );
}

export default LoginPage;
