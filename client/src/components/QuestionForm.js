import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function QuestionForm() {
    const [username, setUsername] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState(new Array(4).fill({ text: '', isCorrect: false }));
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);
    const [userQuestions, setUserQuestions] = useState([]);
    const [searchUsername, setSearchUsername] = useState('');
    const [keyword, setKeyword] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [keywordSearchUsername, setKeywordSearchUsername] = useState('');

    const { quizId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (quizId) {
            fetchQuizDetails();
        }
    }, [quizId]);

    const fetchQuizDetails = async () => {
        try {
            const quizResponse = await fetch(`http://localhost:3306/quiz/${quizId}`);
            if (!quizResponse.ok) throw new Error(`HTTP error! Status: ${quizResponse.status}`);
            const quizData = await quizResponse.json();

            if (quizData && quizData.user && quizData.user.id) {
                fetchUserQuestionsForQuiz(quizData.user.id);
            } else {
                console.error('User data not found in quiz details');
            }
        } catch (error) {
            console.error('Error fetching quiz details:', error);
        }
    };

    const fetchUserQuestionsForQuiz = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3306/users/${userId}/created-questions`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const questions = await response.json();
            setUserQuestions(questions);
        } catch (error) {
            console.error('Error fetching user questions:', error);
        }
    };

    const handleAnswerChange = (index, event) => {
        const newAnswers = answers.map((answer, i) => {
            if (i === index) {
                return { ...answer, text: event.target.value };
            }
            return answer;
        });
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (index) => {
        const updatedAnswers = answers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index
        }));
        setAnswers(updatedAnswers);
        setCorrectAnswerIndex(index);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const questionData = {
            user: { username },
            text: questionText,
            answers: answers.map((answer, index) => ({ ...answer, isCorrect: index === correctAnswerIndex })),
        };

        const method = editMode ? 'PUT' : 'POST';
        const questionUrl = editMode ? `http://localhost:3306/question/${editQuestionId}` : 'http://localhost:3306/question';

        try {
            const response = await fetch(questionUrl, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionData),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const savedQuestion = await response.json();

            // Check if quizId is defined and not in edit mode
            if (!editMode && quizId && quizId !== 'undefined') {
                const addQuestionToQuizResponse = await fetch(`http://localhost:3306/quiz/addQuestion/${quizId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ questionId: savedQuestion.id }),
                });
                if (!addQuestionToQuizResponse.ok) throw new Error(`HTTP error! Status: ${addQuestionToQuizResponse.status}`);
            }

            alert('Question saved successfully!');

            // Reset form
            setQuestionText('');
            setAnswers(new Array(4).fill({ text: '', isCorrect: false }));
            setCorrectAnswerIndex(-1);
            setEditMode(false);
            setEditQuestionId(null);

            // Only navigate if quizId is valid
            if (quizId && quizId !== 'undefined') {
                navigate(`/question-form/${quizId}`);
            } else {
                navigate(`/question-form`);
            }

        } catch (error) {
            alert('Error saving question.');
            console.error('There was an error:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3306/users/${searchUsername}/questions`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const questions = await response.json();
            setUserQuestions(questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
            alert('Error fetching questions.');
        }
    };

    const handleKeywordSearch = async () => {
        console.log(`Searching for keyword '${keyword}' in user '${keywordSearchUsername}' questions.`);
        if (!keywordSearchUsername || !keyword) {
            alert('Please enter both a username and a keyword.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3306/users/${keywordSearchUsername}/search?keyword=${keyword}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const questions = await response.json();
            setUserQuestions(questions);
        } catch (error) {
            alert('Error fetching questions by keyword.');
            console.error('Error fetching questions:', error);
        }
    };

    const handleDelete = async (questionId) => {
        try {
            const response = await fetch(`http://localhost:3306/question/${questionId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            setUserQuestions(userQuestions.filter((question) => question.id !== questionId));
            alert('Question deleted successfully!');
        } catch (error) {
            alert('Error deleting question.');
            console.error('Error deleting question:', error);
        }
    };

    const handleEdit = (question) => {
        setUsername(question.user.username);
        setQuestionText(question.text);
        setAnswers(question.answers);
        setCorrectAnswerIndex(question.answers.findIndex((answer) => answer.isCorrect));
        setEditMode(true);
        setEditQuestionId(question.id);
    };

    const handleAddToQuiz = async (questionId) => {
        try {
            console.log(`quizId: ${quizId}`);
            console.log(`questionId: ${questionId}`);
            const requestBody = JSON.stringify({ questionId: questionId }); // Construct the request body as a JSON object
            console.log(`quizId: ${quizId}`);
            const response = await fetch(`http://localhost:3306/quiz/addQuestion/${quizId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: requestBody, // Provide the request body here
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            alert('Question added to quiz successfully!');
        } catch (error) {
            alert('Error adding question to quiz.');
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <h2>Create a New Question</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Question:</label>
                    <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
                </div>
                {answers.map((answer, index) => (
                    <div key={index}>
                        <label>
                            Answer {index + 1}:
                            <input type="text" value={answer.text} onChange={(e) => handleAnswerChange(index, e)} />
                        </label>
                        <label>
                            Correct
                            <input
                                type="checkbox"
                                checked={index === correctAnswerIndex}
                                onChange={() => handleCorrectAnswerChange(index)}
                            />
                        </label>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Save Question</button>
            </form>

            <div>
                <h2>Search Questions by Username</h2>
                <input
                    type="text"
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                    placeholder="Username"
                />
                <button type="button" onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>

            <div>
                <h2>Search by Keyword</h2>
                <input
                    type="text"
                    value={keywordSearchUsername}
                    onChange={(e) => setKeywordSearchUsername(e.target.value)}
                    placeholder="Username for Keyword Search"
                />
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Keyword"
                />
                <button type="button" onClick={handleKeywordSearch} className="btn btn-primary">Search Keyword</button>
            </div>

            <div>
                <h3>Search Results</h3>
                {userQuestions.map((question, index) => (
                    <div key={index} className="question-item">
                        <div className="question-content">
                            <h3>Question {index + 1}</h3>
                            <p>Question Text: {question.text}</p>
                            <p>Question User: {question.user.username}</p>
                            <h4>Answers:</h4>
                            <ul>
                                {question.answers.map((answer, ansIndex) => (
                                    <li key={ansIndex}>
                                        Answer {ansIndex + 1}: {answer.text}
                                        {answer.isCorrect ? ' (Correct)' : ''}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="question-actions">
                            <button onClick={() => handleEdit(question)} className="btn btn-primary edit-button">Edit</button>
                            <button onClick={() => handleDelete(question.id)} className="btn btn-primary delete-button">Delete</button>
                            {quizId && (
                                <button onClick={() => handleAddToQuiz(question.id)} className="btn btn-primary add-button">Add to Quiz</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionForm;
