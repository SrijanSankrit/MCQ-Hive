import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import TeacherDashboard from './TeacherDashboard';

import NotFound from '../../components/NotFound';
import TeacherLayout from '../../hocs/TeacherLayout';
import CreateQuiz from './CreateQuiz';
import TeacherQuizList from '../teacher/TeacherQuizList';
import TeacherQuizResult from "../teacher/TeacherQuizResult";
import PublicProfile from '../teacher/PublicProfile';
import UpdateQuiz from '../teacher/UpdateQuiz';

function TeacherRoute() {

    let {path} = useRouteMatch();

    return (
        <div>
            <TeacherLayout>
                <Switch>
                    <Route exact path={`${path}/dashboard`} component={TeacherDashboard} />
                    <Route exact path={`${path}/profile`} component={PublicProfile} />

                    <Route exact path={`${path}/create-quiz/:subject_id`} component={CreateQuiz} />
                    <Route exact path={`${path}/update-quiz/:quiz_id`} component={UpdateQuiz} />

                    <Route exact path={`${path}/quizzes/:subject_id`} component={TeacherQuizList} />
                    <Route exact path={`${path}/courses/:id`} component={TeacherCourses} />
                    <Route exact path={`${path}/quiz/result/:quiz_id`} component={TeacherQuizResult} />
                    <Route component={NotFound} />
                </Switch>
            </TeacherLayout>
        </div>
    )
}

export default TeacherRoute;
