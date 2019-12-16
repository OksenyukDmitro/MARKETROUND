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

const CreateAccountForm = (props) => {
  const { history } = props;
  const isLogin = false;

  const onSuccess = React.useCallback(({ user }) => {
    toast.success(`Welcome ${user.username}!`);
    history.push(routes.home);
  }, [history]);
  const [state, handleSubmit] = useLoginForm({ isLogin, onSuccess });
  const formik = useFormik({
    initialValues: state,
    validationSchema: Yup.object({
      username: validationSchema.username,
      firstName: validationSchema.firstName,
      lastName: validationSchema.lastName,
      email: validationSchema.email,
      password: validationSchema.password,
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const {
    username, password, firstName, lastName, email,
  } = formik.values;
  const disabled = Boolean(formik.errors.password || formik.errors.username
    || formik.errors.firstName || formik.errors.lastName || formik.errors.email);
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
            <Input
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              type="text"
              name="firstName"
              placeholder="firstName"
              value={firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Alert
              className="login-input font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.touched.firstName && formik.errors.firstName)}
            >
              {formik.errors.firstName}
            </Alert>
            <Input
              className="login-input"
              type="text"
              name="lastName"
              placeholder="lastName"
              value={lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Alert
              className="login-input font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.touched.lastName && formik.errors.lastName)}
            >
              {formik.errors.lastName}
            </Alert>
            <Input
              className="login-input"
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Alert
              className="login-input font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.touched.email && formik.errors.email)}
            >
              {formik.errors.email}
            </Alert>
            <Input
              className="login-input"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Alert
              className="login-input font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.touched.password && formik.errors.password)}
            >
              {formik.errors.password}
            </Alert>
            <Button
              className="button"
              type="submit"
              disabled={disabled}
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
