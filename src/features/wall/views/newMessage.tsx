import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { Dispatch, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { newMessageService } from '../newMessageService';
import { Message } from '../wallService';
import { UserLocalStorage } from '../../signIn/interface';

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

interface Props {
  messages?: Message[];
  setMessages?: Dispatch<React.SetStateAction<Message[] | undefined>>;
  getMessages: () => Promise<void>;
}

const NewMessageForm = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async (event: React.MouseEvent<Element, MouseEvent>) => {
    setIsLoading(true);
    event.preventDefault();
    setErrorMessage('');

    const userStringified = localStorage.getItem('user');
    const user: UserLocalStorage =
      userStringified && JSON.parse(userStringified);
    if (!user?.token) {
      history.push('/');
      return;
    }
    try {
      const res = await newMessageService({
        body: message,
        title,
        token: user.token,
      });
      if (res.status === 204) {
        setSuccessMessage('New message posted with success');
        setTitle('');
        setMessage('');
        props.getMessages();
      }
    } catch (error) {
      setSuccessMessage('');
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem('user');
          history.push('/');
          console.error(error.message);
        }
      }
      setErrorMessage('Internal Error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container component="main" maxWidth="xl" className={classes.form}>
      <div>
        <Typography component="h1" variant="h5">
          Post New Message
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Title"
                label="Title"
                name="Title"
                autoComplete="Title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="message"
                label="message"
                type="message"
                id="message"
                autoComplete="current-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            {successMessage && (
              <Grid item xs={12}>
                <Alert severity="success">{successMessage}</Alert>
              </Grid>
            )}
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
                disabled={isLoading}
              >
                Post New Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default NewMessageForm;
