import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import TakeQuizPage from "./components/TakeQuizPage";
import LeaderBoardPage from './components/LeaderBoardPage';
import AuthPage from './components/AuthPage'; // 🔄 Updated to the merged Sign In/Sign Up page
import InviteForm from './components/InviteForm';

function App() {
    // 🌙 Flip Mode Function
    const toggleFlipMode = () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('flipMode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    };

    // 🌟 Load Flip Mode Preference on Startup
    React.useEffect(() => {
        if (localStorage.getItem('flipMode') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }, []);

    return (
        <div className="App">
            <header className="Header">
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                        <li className="nav-item"><Link to="/auth" className="nav-link">Sign In</Link></li>
                        <li className="nav-item"><Link to="/question-form" className="nav-link">Question Form</Link></li>
                        <li className="nav-item"><Link to="/invite" className="nav-link">Invite A Friend</Link></li>
                        <li className="nav-item"><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
                    </ul>
                </nav>

                {/* 🔄 Flip Mode Button */}
                <button id="flipModeToggle" className="custom-button" onClick={toggleFlipMode}>
                    Flip Mode
                </button>
            </header>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} /> {/* 🔄 Unified Sign In/Sign Up */}
                <Route path="/takeQuiz/:quizId" element={<TakeQuizPage />} />
                <Route path="/submitQuiz/:quizId" element={<TakeQuizPage />} />
                <Route path="/question-form" element={<QuestionForm />} />
                <Route path="/leaderboard" element={<LeaderBoardPage />} />
                <Route path="/invite" element={<InviteForm />} />
            </Routes>
        </div>
    );
}

export default App;