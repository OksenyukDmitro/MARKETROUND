import React from 'react';
import {
  Form, Input, Button, Alert, Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useLoginForm from '../hooks/useLoginForm';
import routes from '../router/routes';
import logo from '../images/3.png';
import validationSchema from '../helpers/validationSchema';


const LoginForm = (props) => {
  const { history, location } = props;
  const isLogin = true;
  const onSuccess = React.useCallback(({ user }) => {
    toast.success(`Welcome ${user.username}!`);
    if (location.state && location.state.from) {
      history.push({
        pathname: location.state.from,
      });
    } else {
      history.push(routes.home);
    }
  }, [history, location.state]);
  const [state, handleSubmit, errLogin] = useLoginForm({ isLogin, onSuccess });
  const formik = useFormik({
    initialValues: state,
    validationSchema: Yup.object({
      username: validationSchema.username,
      password: validationSchema.password,
    }),
    onSubmit: (values) => handleSubmit(values),
  });
  const {
    username, password,
  } = formik.values;

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
        <Form className="flex-center " onSubmit={formik.handleSubmit}>
          <div>
            <Alert className="login-input font-weight-normal" color="danger" isOpen={errLogin.active}>
              {errLogin.msg}
            </Alert>
            <Label
              sm={3}
              style={{
                display: 'unset', marginLeft: '15%', padding: '0px',
              }}
            >
              Username
            </Label>
            <Input
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={username}
              style={{
                marginBottom: '12px',
              }}
            />
            <Alert
              className="login-input font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.touched.username && formik.errors.username)}
            >
              {formik.errors.username}
            </Alert>
            <Label
              sm={3}
              style={{
                display: 'unset', marginLeft: '15%', padding: '0px', marginTop: '5px',
              }}
            >
              Password
            </Label>
            <Label
              sm={3}
              style={{
                display: 'unset',
                marginLeft: '15px',
                padding: '0px',
                marginTop: '5px',
                fontSize: '1em',
                color: 'grey',
              }}
            >
              3 or more characters
            </Label>
            <Input
              className="login-input"
              type="password"
              name="password"
              placeholder="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={password}
              style={{
                marginBottom: '12px',
              }}
            />
            <Alert
              className="login-input"
              color="danger"
              isOpen={Boolean(formik.touched.password && formik.errors.password)}
            >
              {formik.errors.password}
            </Alert>

            <Button
              className="button"
              type="submit"
              disabled={Boolean(formik.errors.password || formik.errors.username)}
              style={{ marginLeft: '15%' }}
            >
              Log In
            </Button>
            <div style={{ marginLeft: '15%' }}>
              Don&apos;t have an account? <Link to={routes.signUp}>Sign up</Link>
              <br />
              Forgot password? <Link to={routes.forgotPassword}>Reset password</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
