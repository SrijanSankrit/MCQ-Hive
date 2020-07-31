import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Home = ({user, isAuthenticated}) => {

  const [myCourses, setMyCourses] = useState([]);

useEffect(() => {

  const fetchMyCourses = async () => {
    const config = {
        headers : {
            "Content-type" : "application/json",
        }
    };

    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/accounts/student/subjects/subscribed/${user.id}/`, config);
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
            <Link to={`/student/quizzes/${course.id}`} className="card-link">View Quizzes</Link>
          </div>
        </div>
      </div>
  ));

  return (
    
    <div className="container-fluid">
    {(isAuthenticated && user!=null) ? (<h1>Hello {user.firstName}</h1>) : (<h2>Hello Guest User!</h2>) }

    <br /> <br/>
    
    { 
    isAuthenticated && user!== null && (
      <div>
        <h2>Subjects Enrolled by You:</h2>
        <div className="row">
          {ListMyCourses}
        </div>
      </div>
    )}

  </div>
  );
}

const mapStatetoProps = state => ({
  user : state.auth.user,
  isAuthenticated : state.auth.isAuthenticated,
})

export default connect(mapStatetoProps)(Home);