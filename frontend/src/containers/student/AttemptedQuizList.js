import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import CircularProgressWithLabel from "../../components/CircularProgressBar";


/* Add Quiz rating functionality */
function AttemptedQuizList({match, user, isAuthenticated}) {

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
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/student/${user.id}/taken-quiz/`, config);
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
                            <h5 className="card-title">{quiz.quiz.title}</h5>
                        </div>
                        <div className="col-sm-4">
                        <CircularProgressWithLabel value={(quiz.score/ quiz.quiz.maxScore)*100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));


    return (
        <div className="container-fluid">
            <h2>QuizList</h2>

            <div class="card-deck">
                {takenQuizList}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user : state.auth.user,
    isAuthenticated : state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AttemptedQuizList);
