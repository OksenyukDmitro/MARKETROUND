import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductsPage from '../pages/ProductsPage';
import routes from './routes';

const AppRouter = () => (
  <MainLayout>
    <Switch>
      <Route
        path={routes.home}
        render={(props) => <ProductsPage {...props} />}
      />
    </Switch>
  </MainLayout>
);

export default AppRouter;
