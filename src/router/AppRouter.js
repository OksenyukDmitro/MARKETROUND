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
import ChatsPage from '../pages/ChatsPage';
import UserProfilePage from '../pages/UserProfilePage';
import UserPage from '../pages/UserPage';
import routes from './routes';
import SellingPage from '../pages/SellingPage';

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
      <Route
        exact
        path={routes.chats}
        render={(props) => <ChatsPage {...props} />}
      />
      <Route
        exact
        path={routes.chat}
        render={(props) => <ChatsPage {...props} />}
      />
      <Route
        path={routes.profile}
        exact
        render={(props) => <UserProfilePage {...props} />}
      />
      <Route
        path={routes.profileId}
        exact
        render={(props) => <UserPage {...props} />}
      />
      <Route
        path={routes.selling}
        exact
        render={(props) => <SellingPage {...props} />}
      />

      <Redirect from={routes.login} to={routes.home} exact />
      <Redirect from={routes.signUp} to={routes.home} exact />
    </Switch>
  </MainLayout>
);

export default AppRouter;
