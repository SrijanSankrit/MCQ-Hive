import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/auth';
import propTypes from 'prop-types';

import {AppBar, Toolbar, Typography, makeStyles, Link} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LaunchIcon from '@material-ui/icons/Launch';


const useStyles = makeStyles((theme) =>({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbar: {
        flexWrap: 'wrap',
      },
      toolbarTitle: {
        flexGrow: 1,
      },
    link: {
        margin: theme.spacing(1, 1.5),
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
    })
) 

const Navbar = ({auth : {isAuthenticated, loading, user}, logout }) => {
    const classes = useStyles();

    /* for the Avatar Menu */
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    let avatar = '';
    if(user){
      avatar = user.firstName[0] + user.lastName[0];
    }
    /*  Avatar menu state END */

    const guestLinks = (<Fragment>
                        <Link variant="button" color="textPrimary" href="/signup/teacher" className={classes.link}>
                          Sign up as Teacher
                        </Link>
                        <Button href="/signup/student" color="primary" variant="outlined" className={classes.link}>SignUp</Button>
                        <Button href="/login" color="primary" variant="outlined" className={classes.link}>Login</Button>
                        </Fragment>)
                        

    const authLinks = (<Fragment>
                        { (user!== null && user.is_teacher) ?  (<Link variant="button" color="textPrimary" href={`/teacher/${user.id}`}>Teacher</Link>) : 
                             <Link variant="button" color="textPrimary" href="/signup/teacher" >Become a Teacher</Link>
                        }

                          {(user!== null) && (<Fragment>
                              <Link variant="button" color="textPrimary" className={classes.link} href={`/student/courses/${user.id}`} >My Courses</Link>
 
                              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                              <Avatar className={classes.purple}>{avatar}</Avatar>
                              </Button>
                              <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                              <MenuItem href="#" >My Profile</MenuItem>
                              <MenuItem href={`/student/courses/${user.id}`} >My Courses</MenuItem>
    
                              <hr/>
    
                              {user.is_teacher && (<Fragment><MenuItem href={`/teacher/${user.id}`}>Teacher Dashboard</MenuItem><hr /></Fragment>)  }
    
                              <MenuItem >Help</MenuItem>
                              <MenuItem onClick={logout}><Link href="/">Log Out</Link></MenuItem>
                              <hr />
                              <MenuItem href="#" >
                                <div>
                                <strong>MCQ Hive for Business</strong> <LaunchIcon />
                                <br />
                                <p>Bring value to your company</p>
                                </div>
                              </MenuItem>
                            </Menu>
                            </Fragment>
                          )}
                    
                        </Fragment>)

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link href="/">MCQ Hive</Link>
          </Typography>
          <nav>  
            <Fragment><Link variant="button" color="textPrimary" href="#" className={classes.link}>
              MCQ Hive For Business
            </Link>
            </Fragment>
          </nav>
            {!loading && (<Fragment>{(isAuthenticated && user !== null) ? authLinks : guestLinks}</Fragment>)}
        </Toolbar>
      </AppBar>
    )
}

Navbar.propTypes = {
    logout : propTypes.func.isRequired,
    auth : propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
});

export default connect(mapStateToProps, {logout})(Navbar);
