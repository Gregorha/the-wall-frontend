import {
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import SignUpForm from '../../signUp/views/signUpForm';
import { authUser } from '../signInService';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  form: {
    display: 'flex',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});

const SignInForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await authUser({
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.user = JSON.stringify(res.data);
        history.push('/account');
      }
    } catch (err) {
      localStorage.removeItem('user');
      setErrorMessage(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.form}>
      <div>
        <Typography component="h1" variant="h5" style={{ marginBottom: '5px' }}>
          Sign in
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Divider variant="middle" style={{ margin: '15px 15px' }} />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleModalOpen}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </Grid>
            <Modal
              open={isModalOpen}
              onClose={handleModalClose}
              className={classes.modal}
            >
              <SignUpForm />
            </Modal>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignInForm;
