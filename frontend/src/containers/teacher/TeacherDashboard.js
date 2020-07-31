import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container} from '@material-ui/core';

function TeacherDashboard({user, isAuthenticated}) {

    const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {

        const fetchMyCourses = async () => {
          const config = {
              headers : {
                  "Content-type" : "application/json",
              }
          };
      
          try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/accounts/teacher/subjects/subscribed/${user.id}/`, config);
            setMyCourses(res.data);
        } catch(err) {}
      };
      
        fetchMyCourses();
        }, [user]);

    const ListMyCourses = myCourses.map(course => (
        <div className="col-4" key={course.id}>
          <div className="card mb-4 mt-4">
            <div className="card-body">
            <h5 className="card-title">{course.name}</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <Link to={`/teacher/quizzes/${course.id}`} className="card-link">View my Quizzes</Link>
            </div>
          </div>
        </div>
    ));

    return (
        <Container>
            <h2>Hello Teacher!</h2> <br/>
            { 
            isAuthenticated && user!== null && user.is_teacher && (
            <div>
                <h2>Subjects taught by You:</h2>
                <div className="row">
                {ListMyCourses}
                </div>
            </div>
            )}

        </Container>
    )
}

const mapStateToProps = state => ({
    user : state.auth.user,
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps)(TeacherDashboard);
