import React from 'react';
import {
  Form, Input, Button, Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLoginForm from '../hooks/useLoginForm';
import routes from '../router/routes';
import logo from '../images/3.png';


const CreateAccountForm = (props) => {
  const { history } = props;
  const isLogin = false;

  const onSuccess = React.useCallback(({ user }) => {
    toast.success(`Welcome ${user.username}!`);
    history.push(routes.home);
  }, [history]);
  const [state, handleSubmit, handleChange] = useLoginForm({ isLogin, onSuccess });

  const {
    username, password, firstName, lastName, email, errLogin,
  } = state;

  return (
    <div>

      <img src={logo} alt="alt" style={{ width: '50%', height: 'fit-content' }} />
      <div
        className="flex-center"
        style={{
          float: 'right',
          minWidth: '30%',
          width: '35%',
          marginLleft: '7%',
          marginRight: '7%',
          height: '86vh',
        }}
      >
        <Form onSubmit={handleSubmit}>
          <div className="login-form">
            <Alert color="danger" isOpen={errLogin.active}>
              {errLogin.msg}
            </Alert>
            <Input
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleChange}
            />

            <Input
              className="login-input"
              type="text"
              name="firstName"
              placeholder="firstName"
              value={firstName}
              onChange={handleChange}
            />
            <Input
              className="login-input"
              type="text"
              name="lastName"
              placeholder="lastName"
              value={lastName}
              onChange={handleChange}
            />
            <Input
              className="login-input"
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleChange}
            />
            <Input
              className="login-input"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
            />
            <Button
              className="button"
              type="submit"
              disabled={!(username && password)}
            >
                            Sign Up
            </Button>
            <div>
              <div>
                                    Already have an account? <Link to={routes.login}>Login</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccountForm;
