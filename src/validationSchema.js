
import * as Yup from 'yup';

const validationSchema = {
  username: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .min(3, 'Must be 3 characters or more')
    .required('Required'),
};
export default validationSchema;
