import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './containers/Home';
import TeacherSignup from './containers/TeacherSignup'; 
import StudentSignup from './containers/StudentSignup';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import StudentCourses from './containers/StudentCourses';
import TeacherCourses from './containers/TeacherCourses';
import Teacher from './containers/Teacher';

import NotFound from './components/NotFound';

const App = () => {
  return(
      <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/signup/teacher" component={TeacherSignup} />
            <Route exact path="/signup/student" component={StudentSignup} />
            <Route exact path="/student/courses/:id" component={StudentCourses} />
            <Route exact path="/teacher/courses/:id" component={TeacherCourses} />
            <Route exact path="/teacher/:id" component={Teacher} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
            <Route exact path='/reset-password' component={ResetPassword} />
            <Route component = {NotFound} />
          </Switch>
      </Router>
  )
};

export default App;