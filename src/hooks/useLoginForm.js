import { useCallback, useState } from 'react';
import useAuthHandlers from './useAuthHandlers';

const useLoginForm = ({ isLogin, onSuccess }) => {
  const state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };
  const [errLogin, setErrLogin] = useState({ active: false, msg: '' });
  const { createAccount, login } = useAuthHandlers();

  const handleSubmit = useCallback(async (values) => {
    const {
      username, password, firstName, lastName, email,
    } = values;
    try {
      setErrLogin({
        active: false, msg: '',
      });
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
      setErrLogin({
        active: true, msg: err.graphQLErrors.map((error) => error.message).join('\n'),
      });
    }
  }, [createAccount, isLogin, login, onSuccess]);


  return [state, handleSubmit, errLogin];
};

export default useLoginForm;
