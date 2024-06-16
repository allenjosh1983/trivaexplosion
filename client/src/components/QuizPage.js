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
    }, [fetchQuizzes]); // Add fetchQuizzes to the dependency array

    const handleCreateQuizButtonClick = () => {
        setShowCreateForm(true);
    };

    const handleCloseCreateForm = () => {
        setShowCreateForm(false);
        fetchQuizzes(); // Fetch quizzes again after closing the form
    };

    const handleEditQuiz = async (selectedQuiz) => {
        setEditedQuiz(selectedQuiz);
        setShowEditForm(true);

        // Fetch questions for the current quiz
        try {
            const response = await axios.get(`http://localhost:8080/quiz/questions/${selectedQuiz.id}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleRemoveQuestion = async (selectedQuiz, questionId) => {
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
        setEditedQuiz({});
        fetchQuizzes(); // Fetch quizzes again after closing the form
    };

    const handleAddQuestions = (quizId) => {
        navigate(`/question-form/${quizId}`);
        console.log(`Add questions for quiz with ID ${quizId}`);
    };

    const handleDeleteQuiz = (quizId) => {
        setQuizToDelete(quizId);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/quiz/${quizToDelete}`);
            fetchQuizzes();
            setQuizToDelete(null); // Clear the state after successful deletion
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    const handleCancelDelete = () => {
        setQuizToDelete(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedQuiz({
            ...editedQuiz,
            [name]: value,
        });
    };

    const handleUpdateQuiz = async (updatedQuiz) => {
        try {
            await axios.put(`http://localhost:8080/quiz/${quizId}`, updatedQuiz);
            setShowEditForm(false);
            setEditedQuiz(updatedQuiz);
            fetchQuizzes(); // Fetch quizzes again after updating
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateQuiz(editedQuiz);
    };

    return (
        <div className="container">
            <Table className="mt-3">
                <thead className="table-header">
                    <tr>
                        <th className="row-cols-md-auto">Title</th>
                        <th className="row-cols-md-auto">Category</th>
                        <th className="row-cols-md-auto">Questions</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map((quiz) => (
                        <tr key={quiz.id}>
                            <td width="28%">{quiz.title}</td>
                            <td width="28%">{quiz.category}</td>
                            <td>
                                <span>{quiz.questions.length}</span>
                                <Link to={`/question-form/${quiz.id}`}>
                                    <Button onClick={() => handleAddQuestions(quiz.id)}>
                                        Add Questions
                                    </Button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/quizzes/${quiz.id}`}>
                                    <Button variant="warning" onClick={() => handleEditQuiz(quiz)}>
                                        Update
                                    </Button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/takeQuiz/${quiz.id}`}>
                                    <Button variant="success">
                                        Take Quiz
                                    </Button>
                                </Link>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteQuiz(quiz.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Create Quiz Form Modal */}
            <Modal show={showCreateForm} onHide={handleCloseCreateForm}>
                <Modal.Header bg="light" closeButton>
                    <Modal.Title>CREATE NEW QUIZ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateQuizForm
                        onCancel={handleCloseCreateForm}
                        newQuiz={newQuiz}
                        setNewQuiz={setNewQuiz}
                        fetchQuizzes={fetchQuizzes}
                        onClose={handleCloseCreateForm}
                    />
                </Modal.Body>
            </Modal>

            {/* Edit Quiz Form Modal */}
            <Modal show={showEditForm} onHide={handleCloseEditForm}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Quiz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3 shadow">
                            <InputGroup.Text>Title</InputGroup.Text>
                            <FormControl
                                type="text"
                                name="title"
                                value={editedQuiz.title || ''}
                                onChange={handleInputChange}
                                aria-label="Title"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 shadow">
                            <InputGroup.Text>Category</InputGroup.Text>
                            <FormControl
                                type="text"
                                name="category"
                                value={editedQuiz.category || ''}
                                onChange={handleInputChange}
                                aria-label="Category"
                            />
                        </InputGroup>
                        <Card className="mt-3">
                            <Card.Body>
                                <h5>List of Questions:</h5>
                                <ul>
                                    {questions.map((question) => (
                                        <li key={question.id}>
                                            {question.content}
                                            <Button
                                                className="ml-2"
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleRemoveQuestion(editedQuiz, question.id)}
                                            >
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditForm}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* Delete Quiz Confirmation Modal */}
            <Modal show={!!quizToDelete} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Create Quiz Button */}
            <div className="text-center mt-4">
                <Button variant="primary" onClick={handleCreateQuizButtonClick}>
                    Create Quiz
                </Button>
            </div>
        </div>
    );
};

export default QuizPage;
