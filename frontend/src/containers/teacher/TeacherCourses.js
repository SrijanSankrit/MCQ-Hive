import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import { Button} from '@material-ui/core';

const TeacherCourses =  ({match, isAuthenticated}) => {

    const id = match.params.id;
    const [myCourses, setMyCourses] = useState([]);
    const [remCourses, setRemCourses] = useState([]);

    useEffect(() => {
        const fetchRemCourses = async () => {
            const config = {
                headers : {
                    "Content-type" : "application/json",
                }
            };
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/accounts/teacher/subjects/unsubscribed/${id}/`, config);
                setRemCourses(res.data);
            }catch(err){}
        };
    
        const fetchMyCourses = async () => {
            const config = {
                headers : {
                    "Content-type" : "application/json",
                }
            };
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/accounts/teacher/subjects/subscribed/${id}/`, config);
                setMyCourses(res.data);
            } catch(err) {}
        };


        fetchRemCourses(); /* Fetch All Courses  */
        fetchMyCourses(); /* Fetch User's Courses */
        
    },[id, myCourses]);

    if( !isAuthenticated) return (<Redirect to="/login" />)

    const ListMyCourses = myCourses.map(course => (<div key={course.id}><input type="checkbox" id={course.id} defaultChecked />  {course.name}</div>));
    const ListNotMyCourses = remCourses.map(course => (<div key={course.id}><input type="checkbox" id={course.id} />  {course.name}</div>));

    var len = myCourses.length + remCourses.length

    const addSubjects = async (chosenSubjects) => {
        const config = {
            headers : {
                "Content-type" : "application/json",
            }
        };

        const body = JSON.stringify({
            chosenSubjects,
        });

        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/api/accounts/teacher/subjects/update/${id}/`, body,config);

            return new Response({"Success" : "Student Subjects Updated"});

        } catch(err) {
            return new Response({"Error" : "Not able to update courses"});
        }
    }

    const saveCourses = (e) => {
        e.preventDefault();
        /*   
            Iterate through all subjects.
            If checked, add id in array
            post that to database.
        */
       var chosenSubjects = [];
        for(var id=1;id <= len;id++){
            if(document.getElementById(id).checked) chosenSubjects.push(id);
        }

        addSubjects(chosenSubjects);
    };

    return (
        <div>
            <h3>Courses Taken:</h3>
            <div>{ListMyCourses}</div> <br /><hr />
            <h3>Courses you can try:</h3>
            <div>{ListNotMyCourses}</div> <br /> <br />
            <Button 
            type="submit"
            variant="contained"
            color="primary"
            onClick={saveCourses}
            >
                Save
            </Button>
        </div>
    )
}

const matchStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
})

export default connect(matchStateToProps)(TeacherCourses);
