import { Box, makeStyles, Typography } from '@material-ui/core';
import firebase from 'firebase';
import { current } from 'immer';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

SignIn.propTypes = {};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fffff',
    textAlign: 'center',
  },
  content: {
    width: '700px',
    margin: '20px auto',
    padding: '10px 15px',
    backgroundColor: 'white',

    textAlign: 'center',
    boxShadow: '0 0 5px 0.5px black',
    color: 'green',
    textTransform: 'uppercase',
  },
}));

function SignIn(props) {
  const classes = useStyles();
  // test user

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    // Default: 'redirect'
    signInFlow: 'redirect',
    signInSuccessUrl: '/products', // when we signin success -> automatic go to link /products
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div className={classes.container}>
      <Box className={classes.content}>
        <Typography variant="h3">Login Form</Typography>

        <Typography variant="h5">or login with social account</Typography>

        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Box>
    </div>
  );
}

export default SignIn;
