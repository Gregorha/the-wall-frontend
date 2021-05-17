import React from 'react';
import SignInForm from '../features/signIn/views/signInForm';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MenuIcon from '../shared/menuIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexWrap: 'wrap',
  },
  form: {
    display: 'flex',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        xs={12}
        sm={4}
        md={7}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link to="/wall" style={{ maxWidth: '60%', margin: 'auto' }}>
          <MenuIcon fill={'#3f51b5'} />
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        alignItems="center"
        className={classes.form}
      >
        <SignInForm />
      </Grid>
    </Grid>
  );
};

export default Home;
