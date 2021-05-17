import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Wall from '../features/wall/views/wall';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
}));

const WallPage = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = () => {
    if (isUserAuthenticated) {
      setIsUserAuthenticated(false);
      localStorage.removeItem('user');
      return;
    }
    history.push('/');
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              The Wall
            </Link>
          </Typography>
          <Button color="primary" variant="outlined" onClick={handleLogin}>
            {isUserAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>

      <Wall
        isUserAuthenticated={isUserAuthenticated}
        setIsUserAuthenticated={setIsUserAuthenticated}
      />
    </React.Fragment>
  );
};

export default WallPage;
