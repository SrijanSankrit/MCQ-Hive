import React from 'react';

import {connect} from 'react-redux';
import Navbar from '../components/Navbar';
 
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Django REST Framework',
    description: ['Customised User Model', 'Supports two types of users', 'Uses JWT Authentication'],
  },
  {
    title: 'React',
    description: [
      'Single Page functionality',
      'Pre-built signup and Login Page',
      'Multi User Support',
    ],
  },
];

const Home = ({user, isAuthenticated}) => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Navbar />
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        {
          (isAuthenticated && user != null) ?  (
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Hello {user.firstName}!
            </Typography>
          ) : (
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Hello User!
        </Typography>
          )
        }
        <Typography variant="h5" align="center" color="textSecondary" component="p">
            This is an example webpage ( a boilerplate ) for React as frontend and Django Rest Framework as backend. 
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (

            <Grid item key={tier.title} xs={12} md={6}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md">
          
        <Grid container className={classes.footer} justify="space-evenly">
            <h3>Footer Lies Here</h3>
              <ul>
                <p>Fork this project on Github
                  <Button
                    variant= "text"
                    href="https://github.com/SrijanSankrit/django-react-boilerplate/"
                    startIcon={< GitHubIcon/>} 
                  />
                </p>
              </ul>
        </Grid>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

const mapStatetoProps = state => ({
  user : state.auth.user,
  isAuthenticated : state.auth.isAuthenticated,
})

export default connect(mapStatetoProps)(Home);