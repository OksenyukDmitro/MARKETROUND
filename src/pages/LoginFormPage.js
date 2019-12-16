import React from 'react';
import {
  Form, Input, Button, Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useLoginForm from '../hooks/useLoginForm';
import routes from '../router/routes';
import logo from '../images/3.png';
import validationSchema from '../validationSchema';


const LoginForm = (props) => {
  const { history } = props;
  const isLogin = true;
  const onSuccess = React.useCallback(({ user }) => {
    toast.success(`Welcome ${user.username}!`);
    history.push(routes.home);
  }, [history]);
  const [state, handleSubmit] = useLoginForm({ isLogin, onSuccess });
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
          <div className="">

            <Input
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={username}
            />
            <Alert
              className="login-input font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.touched.username && formik.errors.username)}
            >
              {formik.errors.username}
            </Alert>

            <Input
              className="login-input"
              type="password"
              name="password"
              placeholder="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={password}
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
            >
              Log In
            </Button>
            <div>
              <div>
                Don&apos;t have an account? <Link to={routes.signUp}>Sign up</Link>
                <br />
                Forgot password? <Link to={routes.forgotPassword}>Reset password</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
