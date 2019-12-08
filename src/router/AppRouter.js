import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import AddProductPage from '../pages/AddProductPage';
import routes from './routes';

const AppRouter = () => (
  <MainLayout>
    <Switch>

      <Route
        path={routes.productId}
        render={(props) => <ProductPage {...props} />}
      />
      <Route
        path={routes.createProduct}
        render={(props) => <AddProductPage {...props} />}
      />
      <Route
        exact
        path={routes.home}
        render={(props) => <ProductsPage {...props} />}
      />
      <Redirect from={routes.login} to={routes.home} exact />
      <Redirect from={routes.signUp} to={routes.home} exact />
    </Switch>
  </MainLayout>
);

export default AppRouter;
