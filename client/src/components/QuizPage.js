import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, FormControl, InputGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CreateQuizForm from './CreateQuizForm';

const QuizPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [newQuiz, setNewQuiz] = useState({ title: '' });
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editedQuiz, setEditedQuiz] = useState({});
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quizToDelete, setQuizToDelete] = useState(null);
    const [questions, setQuestions] = useState([]);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/quiz/getQuizzes', { timeout: 5000 });
            console.log('Quiz ID:', quizId);
            console.log('Fetched Quiz Data:', response.data);
            setQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const handleCreateQuizButtonClick = () => {
        setShowCreateForm(true);
    };

    const handleCloseCreateForm = () => {
        setShowCreateForm(false);
        fetchQuizzes();
    };

    const handleEditQuiz = async (selectedQuiz) => {
        setShowEditForm(true);
        // Fetch questions for the current quiz
        try {
            const response = await axios.get(`http://localhost:8080/quiz/questions/${selectedQuiz.id}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleRemoveQuestion = async (selectedQuiz, questionId) => { // Pass selectedQuiz as a parameter
        const userConfirmed = window.confirm('Are you sure you want to remove this question from the quiz?');
        if (!userConfirmed) {
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/quiz/removeQuestion/${selectedQuiz.id}/${questionId}`);
            const response = await axios.get(`http://localhost:8080/quiz/questions/${selectedQuiz.id}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error removing question:', error);
        }
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
        fetchQuizzes();
    };

    // Other functions...

    return (
        <div className="container">
            <Table className="mt-3">
                {/* Table content */}
            </Table>

            {/* Create Quiz Button */}
            <div className="text-center">
                <Button variant="primary" onClick={handleCreateQuizButtonClick}>
                    Create Quiz
                </Button>
            </div>

            {/* Modals */}
        </div>
    );
};

export default QuizPage;

