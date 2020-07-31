import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button} from '@material-ui/core';

function QuizList({match, user, isAuthenticated}) {

    const subject_id = match.params.subject_id

    const [takenQuiz, setTakenQuiz] = useState([]);

    useEffect(() => {

        const fetchTakenQuizList = async () => {
            const config = {
                headers : {
                    "Content-type" : "application/json"
                }
            };
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/student/${user.id}/not-taken-quiz/${subject_id}/`, config);
                setTakenQuiz(res.data);
            } catch(err) {}
        };

        fetchTakenQuizList();
    },[subject_id, user]);

    if( !isAuthenticated) return (<Redirect to="/login" />)

    const takenQuizList = takenQuiz.map(quiz => (
        <div key={quiz.id} className="col-sm-3">
            <div className="card mt-4 mb-4">
                <div className="card-body">
                    <div class="row">
                        <div className="col-sm-8">
                            <h5 className="card-title">{quiz.title}</h5>
                        </div>
                        <div className="col-sm-4">
                            <h3>{quiz.maxScore}</h3>
                        </div>
                    </div>

                    <p className="card-text">Description</p>
                    <div className="row">
                        <div className="col-sm-6 col-12">
                            <p className="card-text"><small class="text-muted">Published today! </small></p>
                        </div>
                        <div className="col-sm-6 col-12">
                        <Button variant="outlined" color="secondary" href={`/student/quiz-attempt/${quiz.id}`}>Attempt Quiz!</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));


    const noQuiz = takenQuiz.length === 0 && (
                        <div><h1>Oops..you don't have any new Quiz.</h1></div>
                    )

    return (
        <div className="container-fluid">
            <h2>QuizList</h2>

            <div class="card-deck">
                {takenQuizList}
                {noQuiz}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user : state.auth.user,
    isAuthenticated : state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(QuizList);
