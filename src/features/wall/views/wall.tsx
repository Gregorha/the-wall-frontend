import React, { Dispatch, useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getMessagesService, Message } from '../wallService';
import { CardHeader, CircularProgress, Divider, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { isAuthenticated } from '../../../routes';
import NewMessageForm from './newMessage';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

interface Props {
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: Dispatch<React.SetStateAction<boolean>>;
}

const Wall = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getMessages = async () => {
    setIsLoading(true);
    try {
      const messages = await getMessagesService();
      setMessages(messages);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    props.setIsUserAuthenticated(isAuthenticated());

    getMessages();
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="sm" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          The Wall
        </Typography>

        {props.isUserAuthenticated && (
          <>
            <NewMessageForm
              messages={messages}
              setMessages={setMessages}
              getMessages={getMessages}
            />
            <Divider style={{ margin: '20px' }} />
          </>
        )}

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3}>
            {messages && messages.length > 0 ? (
              messages.map((message) => (
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardHeader
                      title={message.authorName}
                      subheader={message.date}
                    />
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {message.title}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {message.body}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Alert severity={error ? 'error' : 'info'}>
                  {error || 'There are no messages'}
                </Alert>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Wall;
