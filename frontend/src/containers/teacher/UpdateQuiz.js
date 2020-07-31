import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import { TextField, Container, IconButton } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Redirect } from 'react-router-dom';

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

function UpdateQuiz({match}) {

    const classes = useStyles();

    const [quiz , setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);

    const [answers, setAnswers] = useState(null)

    const quiz_id = match.params.quiz_id;


    /* ---------------------------------------------------Quiz Fetch----------------------------------------------- */
    const fetchQuiz = async() => {
        const config={
            headers: {
                "Content-type" : "application/json"
            }
        };

        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/quiz/detail/${quiz_id}`, config);
            setQuiz(response.data);
        } catch(err) {}
    };


    /* ---------------------------------------------Answer Fetch --------------------------------------------------- */
    const fetchAnswers = async () => {
        const config={
            headers: {
                "Content-type" : "application/json"
            }
        };

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/teacher/quiz-answers/${quiz_id}/`, config);
        setAnswers(response.data);

    }

    useEffect(() => {
        fetchQuiz();
        fetchAnswers();
    }, [quiz_id])

    /*  ----------------------------------------Update Old Question Methods---------------------------------------- */



    const handleTitleChange = (e) => {
        e.preventDefault();

        const value = quiz;
        value.title = e.target.value;
        setQuiz(quiz);
    }

    /* Handles Update in old fields */
    const handleUpdate = (e, index) => {
        e.preventDefault();

        const values = quiz;

        values.questions[index][e.target.name] = e.target.value
        setQuiz(values);

    }

    /* Handles Removing old questions in a quiz */
    const handleRemoveOldQues = async (e,question_id) => {
        e.preventDefault();
        const config = {
            headers : {
                "content-type" : "application/json",
            }
        };

        try{
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/question/delete/${question_id}/`, config);
            await fetchQuiz();
        } catch(err) {}

    }


    const handleOldQuesCheck = (e, index) => {
        const values = answers;

        if(e.target.checked){
            if(values[index]["answer"].length === undefined){
                /* Make an array */
                const num = values[index]["answer"]
                var ans = [];
                ans.push(String(num));
                ans.push(e.target.name);
                values[index]["answer"] = ans;
            } else {
                /*Push in array and look for duplicate values */
                if(!values[index]["answer"].includes(e.target.name)) values[index]["answer"].push(e.target.name);
            }
        } else {
        /* Delete existence */
            if(values[index]["answer"].length === undefined) values[index]["answer"] = []
            else values[index]["answer"] = values[index]["answer"].filter(ans => ans !== e.target.name)
        }

        setAnswers(values);

    }




    /*--------------------------------------------- New Question Methods-------------------------------------------- */



    /* Handles change in new questions */
    const handleNewQuesChange = (e, index) => {
        e.preventDefault();

        const values = [...questions]

        values[index][e.target.name] = e.target.value
        setQuestions(values);
    }

    /* Adds new question to quiz */
    const handleAddQuestion = e => {
        e.preventDefault();

        setQuestions([...questions, {
            "Description" : '',
            "Score" : '',
            "Choice_1" : '',
            "Choice_2" : '',
            "Choice_3" : '', 
            "Choice_4" : '',
            "Answer" : [],
        }]);
    }

    /*  Handles Answers for New Questions  */
    const handleNewQuesCheck = (e, index, numOption) => {

        const values = [...questions];
        
        if(e.target.checked){
            values[index].Answer.push(numOption)
        } else{
            values[index].Answer = values[index].Answer.filter( id => (id !== numOption));
        }
    }

    /* Handles removal of new questions */
    const handleRemoveNewQuestion = (index) => {
        const values = [...questions];

        values.splice(index,1);
        setQuestions(values);
    }











    /* ----------------------------------------------Submit Method--------------------------------------------------- */

    const handleSubmit = async (e, is_published) => {
        e.preventDefault()
        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        };

        
        const body = JSON.stringify({questions});

        const values = quiz;
        values.is_published = is_published;
        setQuiz(values);


        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/api/question/create/${quiz_id}/`, body, config);
            
            await axios.post(`${process.env.REACT_APP_API_URL}/api/quiz/update/${quiz_id}/`, quiz, config);

            await axios.post(`${process.env.REACT_APP_API_URL}/api/teacher/answers/update/${quiz_id}/`, answers, config);
        } catch(err) {}
    }


    if(quiz !== null && quiz.is_published) return (<Redirect to="/teacher/dashboard" />)

    return (
        <Container>
            {quiz !== null && answers != null  && (
                <form className={classes.root}>
                <h1>Update Quiz Form</h1>

                <TextField
                    onChange={handleTitleChange}
                    variant="outlined" 
                    label="Quiz Title" 
                    fullWidth 
                    size="small" 
                    defaultValue={quiz.title}
                />
                 <br /> <br />
                { quiz.questions.map((question, index) => (
                    <div key={index}>
                        <hr/>
                        <div className="row">
                            <h3>Question No. {index+1})</h3>
                            {quiz.questions.length > 1 && (
                            <IconButton
                                onClick={(e) => handleRemoveOldQues(e,question.id)}    
                            >
                                <HighlightOffIcon size="medium" />
                            </IconButton>
                            )}
                        </div>
                        
                        <TextField
                            name="description"
                            label="QuestionName"
                            variant="outlined"
                            fullWidth
                            defaultValue={question.description}
                            size="small"
                            onChange={(e) => handleUpdate(e, index,1)}
                        />
                        <TextField
                            name="option_1"
                            label="Option 1"
                            helperText="Mark if this is an answer"
                            variant="outlined"
                            defaultValue={question.option_1}
                            size="small"
                            onChange={(e) => handleUpdate(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            onChange={(e) => handleOldQuesCheck(e,index)}
                            name="1"
                            defaultChecked = {answers[index]["answer"].length === undefined ? answers[index]["answer"] === 1 : answers[index]["answer"].includes("1")}
                        /><br/>

                        <TextField
                            name="option_2"
                            label="Option 2"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            defaultValue={question.option_2}
                            size="small"
                            onChange={(e) => handleUpdate(e, index)}
                        />
                        
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="2"
                            onChange={(e) => handleOldQuesCheck(e,index)}
                            defaultChecked = {answers[index]["answer"].length === undefined ? answers[index]["answer"] === 2 : answers[index]["answer"].includes("2")}
                           
                        /><br />

                        <TextField
                            name="option_3"
                            label="Option 3"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            defaultValue={question.option_3}
                            size="small"
                            onChange={(e) => handleUpdate(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="3"
                            onChange={(e) => handleOldQuesCheck(e,index)}
                            defaultChecked = {answers[index]["answer"].length === undefined ? answers[index]["answer"] === 3 : answers[index]["answer"].includes("3")}
                            
                        />
                        <br/>
                        <TextField
                            name="option_4"
                            label="Option 4"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            value={question.option_4}
                            size="small"
                            onChange={(e) => handleUpdate(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="4"
                            onChange={(e) => handleOldQuesCheck(e,index)}
                            defaultChecked = {answers[index]["answer"].length === undefined ? answers[index]["answer"] === 4 : answers[index]["answer"].includes("4")}
                            
                        /><br/>
                        <TextField
                            size="small"
                            id="outlined-number"
                            helperText="Marks alloted to this question"
                            label="Marks"
                            type="number"
                            name="score"
                            defaultValue={question.score}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange={(e) => handleUpdate(e, index)}
                        /> <br />
                        
                    </div>))}




                { questions.map((question, index) => (
                    <div key={index}>
                        <hr/>
                        <div className="row">
                            <h3>Question No. {index+ quiz.questions.length +1})</h3>
                            <IconButton
                                onClick={() => handleRemoveNewQuestion(index)}    
                            >
                                <HighlightOffIcon size="medium" />
                            </IconButton>
                        </div>
                        
                        <TextField
                            name="Description"
                            label="QuestionName"
                            variant="outlined"
                            fullWidth
                            value={question.Description}
                            size="small"
                            onChange={(e) => handleNewQuesChange(e, index,1)}
                        />
                        <TextField
                            name="Choice_1"
                            label="Option 1"
                            helperText="Mark if this is an answer"
                            variant="outlined"
                            value={question.Choice_1}
                            size="small"
                            onChange={(e) => handleNewQuesChange(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            onChange={(e) => handleNewQuesCheck(e,index,1)}
                            name="1"
                            
                        /><br/>

                        <TextField
                            name="Choice_2"
                            label="Option 2"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            value={question.Choice_2}
                            size="small"
                            onChange={(e) => handleNewQuesChange(e, index)}
                        />
                        
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="2"
                            onChange={(e) => handleNewQuesCheck(e,index,2)}
                        /><br />

                        <TextField
                            name="Choice_3"
                            label="Option 3"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            value={question.Choice_3}
                            size="small"
                            onChange={(e) => handleNewQuesChange(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="3"
                            onChange={(e) => handleNewQuesCheck(e,index,3)}
                        />
                        <br/>
                        <TextField
                            name="Choice_4"
                            label="Option 4"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            value={question.Choice_4}
                            size="small"
                            onChange={(e) => handleNewQuesChange(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="4"
                            onChange={(e) => handleNewQuesCheck(e,index,4)}
                        /><br/>
                        <TextField
                            size="small"
                            id="outlined-number"
                            helperText="Marks alloted to this question"
                            label="Marks"
                            type="number"
                            name="Score"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value = {question.Score}
                            variant="outlined"
                            onChange={(e) => handleNewQuesChange(e, index)}
                        /> <br />
                        
                    </div>
                    
                ))}
                

                <Button className={classes.button} onClick={handleAddQuestion} variant="outlined" color="primary">Add new Question</Button>
                <Button className={classes.button} onClick={(e) => handleSubmit(e,true)} variant="outlined" color="primary" href={`/teacher/quizzes/${quiz.subject}`} >Publish Now</Button>
                <Button className={classes.button} onClick={(e) => handleSubmit(e,false)} variant="outlined" color="primary" href={`/teacher/quizzes/${quiz.subject}`} >Publish Later!</Button>
                <Button className={classes.button} variant="outlined" color="secondary" href={`/teacher/quizzes/${quiz.subject}`}>Back</Button>
            </form>
            )}
        </Container>
    );
}

export default UpdateQuiz;
