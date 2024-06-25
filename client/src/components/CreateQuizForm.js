import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css'; // Adjust the import path to correctly locate App.css

const CreateQuiz = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8080/quiz/quizzes', values);
            console.log('Quiz data submitted:', response.data); // Use response.data or any necessary handling
            alert('Quiz saved successfully!');
        } catch (error) {
            console.error('Error creating quiz:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container quiz-container">
            <div className="row justify-content-center align-items-center min-vh-100"> {/* Centering vertically */}
                <div className="col-md-6">
                    <header className="App-header">
                        <h1>Create Quiz</h1>
                        {/* Formik handles form state and submission logic */}
                        <Formik
                            initialValues={{ title: '', category: '' }}
                            validate={(values) => {
                                const errors = {};
                                // TODO Add validation logic if needed
                                return errors;
                            }}
                            // Submission logic
                            onSubmit={(values, { setSubmitting }) => {
                                handleSubmit(values, { setSubmitting });
                            }}
                        >
                            {({ values, handleChange }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                        <Field type="text" name="title" className="form-control" />
                                        <ErrorMessage name="title" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category:</label>
                                        <Field type="text" name="category" className="form-control" />
                                        <ErrorMessage name="category" component="div" className="text-danger" />
                                    </div>
                                    {/* TODO: Add more fields dynamically if needed */}
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-primary custom-button">
                                            Create Quiz
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </header>
                </div>
            </div>
            {/* Move button further down */}
            <div className="row justify-content-center mt-4">
                <div className="col-md-6 text-center">
                    <button className="btn btn-secondary" onClick={() => {}}>
                        Other Actions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateQuiz;

