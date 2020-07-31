import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



import NotFound from './components/NotFound';

import StudentRoutes from './containers/student/StudentRoutes';
import TeacherRoutes from './containers/teacher/TeacherRoutes';

const App = () => {
  return(
      <Router>
          <Switch>
          <Route path="/teacher" component={TeacherRoutes} />
          <Route path='/' component={StudentRoutes} />

          <Route component = {NotFound} />
          </Switch>
      </Router>
  )
};

export default App;