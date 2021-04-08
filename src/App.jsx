// MATERIAL-UI
import { amber, deepOrange, lime, pink } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// FIREBASE
import { unwrapResult } from '@reduxjs/toolkit';
import { getMe } from 'app/userSlice';
// CUSTOM COMPONENT
import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import firebase from 'firebase';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ThemeContext, { themes } from 'themeContext';
import './App.css';

// color
const newHeightPink = pink['500'];

// LAZY LOAD
const SignIn = lazy(() => import('./features/Auth/pages/SignIn'));
const CartFeature = lazy(() => import('./features/Cart'));
const HomePage = lazy(() => import('./features/HomePage'));
const ProductFeatures = lazy(() => import('./features/Product'));
const ContactFeatures = lazy(() => import('./features/Contact'));

function App() {
  const customTheme = createMuiTheme({
    // theme settings text color
    palette: {
      primary: {
        light: '#81c784',
        main: '#4caf50',
        dark: '#388e3c',

        contrastText: 'white',
      },
      secondary: {
        main: newHeightPink,
      },
      error: deepOrange,
      warning: amber,
      info: lime,
    },
  });

  // setting for theme - default value = theme.mountain
  const [currentTheme, setCurrentTheme] = useState(themes.mountain);
  const value = { currentTheme, setCurrentTheme };

  // FIREBASE - USER
  const dispatch = useDispatch();
  // Your web app's Firebase configuration
  var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something here
        console.log('User is not logged in');
        return;
      }

      try {
        // Get me when signed in
        const action = getMe();
        const actionResult = await dispatch(action);
        const currentUser = unwrapResult(actionResult); // unwrapResult se tra ra action.payload - dong thoi` se catch duoc loi~ neu co
        console.log('Logged in user(from App.jsx): ', currentUser);
        // test send name user to Auth Feature
      } catch (error) {
        // show toast error
        console.log('Failed to login ', error.message);
      }

      // console.log('Logged in user: ', user.displayName);
      // const token = await user.getIdToken();
      // console.log('Logged in user token: ', token);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmount.
  }, []);

  return (
    <div>
      <ThemeContext.Provider value={value}>
        <ThemeProvider theme={customTheme}>
          <Header />

          <Suspense fallback={<div>LOADING...</div>}>
            <Switch>
              <Route exact path="/" component={HomePage} />

              <Route path="/products" component={ProductFeatures} />

              <Route path="/sign-in" component={SignIn} />

              <Route path="/cart" component={CartFeature} />

              <Route path="/contact" component={ContactFeatures} />

              <Route component={NotFound} />
            </Switch>
          </Suspense>

          <Footer />
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
