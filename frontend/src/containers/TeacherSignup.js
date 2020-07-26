import React, {useState} from 'react';
import {connect} from 'react-redux';
import {signup} from '../actions/auth';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const TeacherSignup = ({signup, isAuthenticated, user}) =>  {

    const classes = useStyles();

    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        password2 : '',
    });

    const {firstName, lastName, email, password, password2} = formData;

    const makeTeacher = async () => {
        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        };

        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/api/accounts/teacher/add/${user.id}/`, config);

            return new Response({"Success" : "Became a Teacher"})
        } catch(err){
            return new Response({"Error" : "Cannot make Teacher!"});
        }
    };


    if(isAuthenticated && user !== null) {
        // Call a function to update a user to be a teacher

        makeTeacher();

        return (<Redirect to={`/teacher/${user.id}`} />);
    }


    const onChange = e => {
        return setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    };

    const onSubmit = e => {
        e.preventDefault();
        const is_student = "True";
        const is_teacher = "True";
        signup(email, firstName, lastName, password, password2, is_student, is_teacher);

    };

    return (
        <React.Fragment> <Navbar />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign up as Teacher
                    </Typography>
                    <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={firstName}
                            onChange={onChange}
                            autoFocus
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value={lastName}
                            onChange={onChange}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={onChange}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={onChange}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password2"
                            label="Confirm Password"
                            type="password"
                            id="password"
                            value={password2}
                            onChange={onChange}
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Log in
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )
}

TeacherSignup.propTypes = {
    isAuthenticated : PropTypes.bool,
    signup : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    user : state.auth.user,
})

export default connect(mapStateToProps, {signup})(TeacherSignup);
