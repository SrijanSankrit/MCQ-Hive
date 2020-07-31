import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import {connect} from 'react-redux';

function TeacherQuizList({match, user}) {

    const subject_id = match.params.subject_id;

    const [myQuizzes, setmyQuizzes] = useState([]);

    const fetchMyQuizzes =  async () => {
        const config = {
            headers: {
                "Content-type" : "application/json",
            }
        };
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/teacher/${user.id}/quiz-list/${subject_id}`, config);
            setmyQuizzes(res.data);    
        } catch(err) {}
    };

    useEffect(() => {
        /*  Extract all quizzes as a card for a subject
            If not published give update link
            Else give results link
        */
        fetchMyQuizzes();

    },[user,subject_id]);

    const handleQuizDelete = async (e, id) => {
        e.preventDefault();
        try{
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/quiz/delete/${id}`);
            fetchMyQuizzes();
        } catch(err) {}

    }

    return (
        <div>
            <Button href={`/teacher/create-quiz/${subject_id}`} variant="outlined" color="primary">Create a New Quiz</Button>
            <div className="card-deck">
            {
                myQuizzes.map((quiz) => (
                    <div key={quiz.id} className="col-sm-3">
                    <div className="card mt-4 mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h5 className="card-title">{quiz.title}</h5>
                                </div>
                                <div className="col-sm-4">
                                    <h3>{quiz.maxScore}</h3>
                                </div>
                            </div>
        
                            <p className="card-text">Description</p>
                            <div className="row">
                                <div className="col-12">
                                    <p className="card-text"><small className="text-muted">Published today! </small></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    {quiz.is_published ? (
                                        <button href="#" className="btn btn-success">Result</button>
                                    ) : (
                                        <Button variant="outlined" color="primary" href={`/teacher/update-quiz/${quiz.id}`}>Update</Button>
                                    )}
                                </div>
                                <div className="col-6">
                                    <button onClick={(e) => handleQuizDelete(e, quiz.id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))
            }
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    user : state.auth.user,
})

export default connect(mapStateToProps)(TeacherQuizList);
