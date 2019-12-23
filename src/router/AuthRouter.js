import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginFormPage from '../pages/LoginFormPage';
import CreateAccountFormPage from '../pages/CreateAccountFormPage';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import UserPage from '../pages/UserPage';
import SearchPage from '../pages/SearchPage';
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
      <Route
        exact
        path={routes.home}
        render={(props) => <ProductsPage {...props} />}
      />
      <Route
        path={routes.search}
        exact
        render={(props) => <SearchPage {...props} />}
      />
      <Route
        path={routes.productId}
        render={(props) => <ProductPage {...props} />}
      />
      <Route
        path={routes.profileId}
        exact
        render={(props) => <UserPage {...props} />}
      />
      <Route render={() => <Redirect to={routes.login} exact />} />
    </Switch>
  </AuthLayout>
);

export default AuthRouter;
