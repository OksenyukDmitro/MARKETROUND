import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Router from './router';
import LoginPage from './pages/LoginFormPage'
const App = () => (
  <>
    <Router />
    <LoginPage />
    <ToastContainer />
  </>
);

export default App;
