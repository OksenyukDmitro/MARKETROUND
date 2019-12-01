import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginFormPage from '../pages/LoginFormPage';
import CreateAccountFormPage from '../pages/CreateAccountFormPage';
import AuthLayout from '../layouts/AuthLayout';
import routes from './routes';

const AuthRouter = (p) => (
  <AuthLayout {...p}>
    <Switch>
      <Route
        path={routes.login}
        render={(props) => <LoginFormPage {...props} />}
      />
      <Route
        path={routes.signUp}
        render={(props) => (
          <CreateAccountFormPage {...props} />
        )}
      />

      <Route render={() => <Redirect to={routes.login} exact />} />
    </Switch>
  </AuthLayout>
);

export default AuthRouter;
