import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import Layout from '../../hocs/Layout';

import Home from '../Home';
import StudentSignup from './StudentSignup';
import Login from '../Login';
import ResetPassword from '../ResetPassword';
import ResetPasswordConfirm from '../ResetPasswordConfirm';
import StudentCourses from './StudentCourses';
import QuizList from './QuizList';

import AttemptedQuizList from './AttemptedQuizList';
import StudentQuizResult from '../student/StudentQuizResult';
import QuizAttemptView from '../student/QuizAttemptView';

function StudentRoutes() {

    let {path} = useRouteMatch();

    return (
        <div>
            <Layout>
                <Switch>
                    <Route exact path={path} component={Home} />
                    <Route exact path="/signup/student" component={StudentSignup} />
                    <Route exact path="/student/courses/:id" component={StudentCourses} />

                    <Route exact path="/student/quizzes/:subject_id" component={QuizList} />
                    <Route exact path="/student/attempted-quizzes/" component={AttemptedQuizList} />
                    <Route exact path="/student/quiz-result/:quiz_id" component={StudentQuizResult} />
                    <Route exact path="/student/quiz-attempt/:quiz_id" component={QuizAttemptView} />

                    <Route path={`${path}login`} component={Login} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/reset-password' component={ResetPassword} />
                </Switch>
            </Layout>
            
        </div>
    )
}

export default StudentRoutes;
