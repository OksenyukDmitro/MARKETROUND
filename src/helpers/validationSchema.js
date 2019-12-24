
import * as Yup from 'yup';

const validationSchema = {
  username: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  firstName: Yup.string()
    .max(25, 'Must be 25 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(25, 'Must be 25 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .min(3, 'Must be 3 characters or more')
    .required('Required'),
  title: Yup.string()
    .max(25, 'Must be 25 characters or less')
    .min(3, 'Must be 3 characters or more')
    .required('Required'),
  location: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .min(3, 'Must be 3 characters or more'),
  description: Yup.string()
    .max(5000, 'Must be 5000 characters or less')
    .required('Required'),
  categoryName: Yup.string()
    .required('Required'),
  price: Yup.number()
    .max(100000000000, 'Must be 100000000000 price or less')
    .min(0, 'Must be 1 characters or more')
    .required('Required'),
};
export default validationSchema;
