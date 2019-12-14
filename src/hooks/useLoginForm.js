import { useCallback } from 'react';
import useAuthHandlers from './useAuthHandlers';

const useLoginForm = ({ isLogin, onSuccess }) => {
  const state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    errLogin: { active: false, msg: '' },
  };

  const { createAccount, login } = useAuthHandlers();

  const handleSubmit = useCallback(async (values) => {
    const {
      username, password, firstName, lastName, email,
    } = values;
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
      console.log(err);
    }
  }, [createAccount, isLogin, login, onSuccess]);


  return [state, handleSubmit];
};

export default useLoginForm;
