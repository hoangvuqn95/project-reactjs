import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginForm from './pages/Login/Login';
import ForgetForm from './pages/Forget/ForgetForm';
import Register from './pages/Register/Register';

AccountFeature.propTypes = {};

function AccountFeature(props) {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={LoginForm} />

        <Route path={`${match.path}/:forgetAccount`} component={ForgetForm} />

        <Route path={`${match.path}/:register`} component={Register} />
      </Switch>
    </div>
  );
}

export default AccountFeature;
