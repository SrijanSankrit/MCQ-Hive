import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import { TextField, Container, IconButton } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import axios from 'axios';

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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


const CreateQuiz = ({match, user}) => {

    const classes = useStyles();

    const [questions, setQuestions] = useState([
        {
            "Description" : '',
            "Score" : '',
            "Choice_1" : '',
            "Choice_2" : '',
            "Choice_3" : '', 
            "Choice_4" : '',
            "Answer" : [],
        }
    ]);

    const [quizTitle, setQuizTitle] = useState('');

    const subject_id = match.params.subject_id;

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

    const handleTitleChange = (e) => {
        e.preventDefault();

        setQuizTitle(e.target.value);
    }

    const handleChange = (e, index) => {
        e.preventDefault();

        const values = [...questions]

        values[index][e.target.name] = e.target.value
        setQuestions(values);
    }

    const handleSubmit = async (e, is_published) => {
        e.preventDefault();
        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        };

        try{
            const owner = user.id;
            const title = quizTitle;
            const quizBody = JSON.stringify({owner, subject_id, title, is_published, questions });

            await axios.post(`${process.env.REACT_APP_API_URL}/api/quiz/create/`, quizBody, config);
            
        } catch(err){}
    }


    const handleCheck = (e, index, numOption) => {

        const values = [...questions];
        
        if(e.target.checked){
            values[index].Answer.push(numOption)
        } else{
            values[index].Answer = values[index].Answer.filter( id => (id !== numOption));
        }
    }

    const handleRemoveQuestion = (index) => {
        const values = [...questions];

        values.splice(index,1);
        setQuestions(values);
    }

    return (
        <Container>
            <form className={classes.root}>
                <h1>Create Quiz Form</h1>

                <TextField
                    onChange={handleTitleChange}
                    variant="outlined" 
                    label="Quiz Title" 
                    fullWidth 
                    size="small" 
                    value={quizTitle}
                />
                 <br /> <br />
                { questions.map((question, index) => (
                    <div key={index}>
                        <hr/>
                        <div className="row">
                            <h3>Question No. {index+1})</h3>
                            {questions.length > 1 && (
                            <IconButton
                                onClick={() => handleRemoveQuestion(index)}    
                            >
                                <HighlightOffIcon size="medium" />
                            </IconButton>
                            )}
                        </div>
                        
                        <TextField
                            name="Description"
                            label="QuestionName"
                            variant="outlined"
                            fullWidth
                            value={question.Description}
                            size="small"
                            onChange={(e) => handleChange(e, index,1)}
                        />
                        <TextField
                            name="Choice_1"
                            label="Option 1"
                            helperText="Mark if this is an answer"
                            variant="outlined"
                            value={question.Choice_1}
                            size="small"
                            onChange={(e) => handleChange(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            onChange={(e) => handleCheck(e,index,1)}
                            name="1"
                            
                        /><br/>

                        <TextField
                            name="Choice_2"
                            label="Option 2"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            value={question.Choice_2}
                            size="small"
                            onChange={(e) => handleChange(e, index)}
                        />
                        
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="2"
                            onChange={(e) => handleCheck(e,index,2)}
                        /><br />

                        <TextField
                            name="Choice_3"
                            label="Option 3"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            value={question.Choice_3}
                            size="small"
                            onChange={(e) => handleChange(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="3"
                            onChange={(e) => handleCheck(e,index,3)}
                        />
                        <br/>
                        <TextField
                            name="Choice_4"
                            label="Option 4"
                            variant="outlined"
                            helperText="Mark if this is an answer"
                            value={question.Choice_4}
                            size="small"
                            onChange={(e) => handleChange(e, index)}
                        />
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon color="primary" fontSize="large" />}
                            checkedIcon={<CheckBoxIcon color="primary" fontSize="large" />}
                            name="4"
                            onChange={(e) => handleCheck(e,index,4)}
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
                            onChange={(e) => handleChange(e, index)}
                        /> <br />
                        
                    </div>
                    
                ))}
                <Button className={classes.button} onClick={handleAddQuestion} variant="outlined" color="primary">Add new Question</Button>
                <Button className={classes.button} onClick={(e) => handleSubmit(e,true)} variant="outlined" color="primary" href={`/teacher/quizzes/${subject_id}`}>Publish Now</Button>
                <Button className={classes.button} onClick={(e) => handleSubmit(e,false)} variant="outlined" color="primary" href={`/teacher/quizzes/${subject_id}`} >Save for later!</Button>
                <Button className={classes.button} variant="outlined" color="secondary" href={`/teacher/quizzes/${subject_id}`}>Abort!</Button>
            </form>
        </Container>
    )
}


const mapStateToProps = state => ({
    user : state.auth.user,
})

export default connect(mapStateToProps)(CreateQuiz);
