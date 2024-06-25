import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css'; // Adjust the import path to correctly locate App.css

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRegister = () => {
        // Add your registration logic here
        console.log('Registering with Username:', username, 'Email:', email, 'and Password:', password);
        // Add further registration process or API call as needed
    };

    return (
        <div className="container register-container">
            <div className="row justify-content-center align-items-center min-vh-100"> {/* Centering vertically */}
                <div className="col-md-6">
                    <form className="custom-form">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button type="button" onClick={handleRegister} className="btn btn-primary custom-button">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
