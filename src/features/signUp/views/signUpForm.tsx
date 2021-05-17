import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { registerUser } from '../singUpService';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  modal: {
    backgroundColor: 'white',
    margin: 'auto',
  },
});

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setsuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const classes = useStyles();

  const handleSubmit = async (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await registerUser({
        email,
        password,
        name,
      });
      console.log(res);
      if (res.status === 200) {
        setsuccessMessage(
          'New user created, check your e-mail for a welcome message'
        );
      }
    } catch (err) {
      setsuccessMessage('');
      setErrorMessage(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container
      className={classes.modal}
      maxWidth="xs"
      style={{ padding: '20px', borderRadius: '5px' }}
    >
      <div>
        <Typography component="h1" variant="h5" style={{ marginBottom: '5px' }}>
          Sign up
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="warning">{errorMessage}</Alert>
              </Grid>
            )}
            {successMessage && (
              <Grid item xs={12}>
                <Alert severity="success">{successMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUpForm;
