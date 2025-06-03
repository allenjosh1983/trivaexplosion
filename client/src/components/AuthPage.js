import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css';

function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleAuthMode = () => {
        setIsSignIn((prev) => !prev);
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = () => {
        console.log(isSignIn ? "Signing in..." : "Signing up...");
    };

    return (
        <div className="container auth-container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6">
                    <form className="custom-form">
                        <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>

                        {!isSignIn && (
                            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        )}

                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required={!isSignIn} />
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="button-container">
                           <button type="button" onClick={handleSubmit} className="btn btn-primary custom-button">
                               {isSignIn ? "Sign In" : "Sign Up"}
                           </button>
                           <span className="toggle-text" onClick={toggleAuthMode}>
                               {isSignIn ? "Need to Sign Up?" : "Already have an account?"}
                           </span>
                       </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;