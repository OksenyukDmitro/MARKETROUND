import { useReducer, useCallback } from 'react';
import useAuthHandlers from './useAuthHandlers';

const reduce = (state, action) => {
  switch (action.type) {
  case 'change':
    return { ...state, [action.name]: action.value };
  case 'err':
    return { ...state, errLogin: { active: true, msg: action.msg } };
  default:
    return state;
  }
};


const useLoginForm = ({ isLogin, onSuccess }) => {
  const [state, dispatch] = useReducer(reduce, {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    errLogin: { active: false, msg: '' },
  });

  const { createAccount, login } = useAuthHandlers();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const {
      username, password, firstName, lastName, email,
    } = state;
    try {
      let data;
      if (isLogin) {
        data = await login(username, password);
      } else {
        data = await createAccount({
          username, password, email, profile: { firstName, lastName },
        });
      }
      onSuccess(data);
    } catch (err) {
      let { message } = err;
      if (err.graphQLErrors) {
        message = err.graphQLErrors.map((error) => error.message).join('\n');
      }
      dispatch({ type: 'err', msg: message });
    }
  }, [createAccount, isLogin, login, onSuccess, state]);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'change', name, value });
  }, []);
  return [state, handleSubmit, handleChange];
};

export default useLoginForm;
