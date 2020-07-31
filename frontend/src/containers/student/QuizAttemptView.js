import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import {makeStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    button : {
        margin : theme.spacing(1),
    },
  }));

function QuizAttemptView({match, user}) {

    const classes = useStyles();

    const quiz_id = match.params.quiz_id;

    const [currQuiz,setCurrQuiz] = useState(null);

    const [answers, setAnswers] = useState(null); /*Stores array of arrays */

    useEffect(() => {

        const fetchQuiz = async () => {
            const config = {
                headers : {
                    "content-type" : "application/json",
                }
            };

            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quiz/detail/${quiz_id}/`, config);
                setCurrQuiz(res.data);
            } catch(err){}
        
        }

        fetchQuiz();

        

    },[quiz_id]);

    useEffect(() => {
        try{
            let arr = []; /* A 2D array */
            for(let i=0;i<currQuiz.questions.length;i++){
                arr.push([]);
            }
            setAnswers(arr);
    } catch(err){}

    },[currQuiz]);


    const handleCheck = (e, index, numOption) => {

        const values = [...answers];
        
        if(e.target.checked && !values[index].includes(numOption)) values[index].push(numOption)
        else values[index] = values[index].filter(el => el !== numOption)

        setAnswers(values);
    }

    const handleSubmit = async (e) => {
        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        };

        try{
            const body = JSON.stringify({answers})
            await axios.post(`${process.env.REACT_APP_API_URL}/api/student/${user.id}/check-quiz-result/${quiz_id}/`,body, config);
        } catch(err){}
    }

    return (
        <div className="container">
            {currQuiz !== null && (
                <div>
                    <h1>{currQuiz.title}</h1>
                    <h3>Max Score : {currQuiz.maxScore}</h3>
                </div>
            )}

            { currQuiz !== null && ( 
            currQuiz.questions.map((question, index) => (
                    <div key={index}>
                        <hr/>
                        <div className="row">
                            <h3>{index+1})</h3>
                            <h3>{question.description}</h3><br /> <br />
                        </div>
                        
                        <div className="row">
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            onChange={(e) => handleCheck(e,index,1)}
                        />
                        <h3>{question.option_1}</h3></div>

                        
                        
                        <div className="row">
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            onChange={(e) => handleCheck(e,index,2)}
                        />
                        <h3>{question.option_2}</h3></div>

                        
                        <div className="row">
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            onChange={(e) => handleCheck(e,index,3)}
                        />
                        <h3>{question.option_3}</h3></div>

                        <div className="row">
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            onChange={(e) => handleCheck(e,index,4)}
                        />
                        <h3>{question.option_4}</h3></div>
                        
                    </div>)
                    
                ))}

<button className={classes.button} onClick={handleSubmit} variant="outlined" color="primary"><Link to="/student/attempted-quizzes">Submit my Quiz</Link></button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user : state.auth.user,
});

export default connect(mapStateToProps)(QuizAttemptView);
