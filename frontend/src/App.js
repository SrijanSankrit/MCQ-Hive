import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from './hocs/Layout';

import Home from './containers/Home';
import StudentSignup from './containers/StudentSignup';
import TeacherSignup from './containers/TeacherSignup';
import Login from './containers/Login';

import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
        <Layout>
          <Switch>
            <Route exact to='/' component={Home} />
            <Route exact to='/signup/student' component={StudentSignup} />
            <Route exact to='/signup/teacher' component={TeacherSignup} />
            <Route exact to='/login' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
    </Router>
  );
}

export default App;
