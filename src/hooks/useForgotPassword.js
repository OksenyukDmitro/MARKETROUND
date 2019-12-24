import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const FORGOT_PASSWORD_MUTATION = gql`
mutation forgotPassword ($username: String! $email:String! $newPassword: String!) {
    forgotPassword (username: $username email: $email newPassword: $newPassword) 
  }
`;


const useForgotPassword = () => {
  const [forgotPasswordMutation] = useMutation(FORGOT_PASSWORD_MUTATION);
  const [errChange, setErrChange] = useState({ active: false, msg: '' });

  const handleSubmit = useCallback(async (values) => {
    const { username, email, newPassword } = values;
    setErrChange({
      active: false, msg: '',
    });
    try {
      const { data: { forgotPassword } } = await forgotPasswordMutation({
        variables: { username, email, newPassword },
      });
      if (forgotPassword) {
        toast.success('Success');
      } else {
        toast.error('Password not change');
      }
      return forgotPassword;
    } catch (err) {
      setErrChange({
        active: true, msg: err.graphQLErrors.map((error) => error.message).join('\n'),
      });
    }
    return false;
  }, [forgotPasswordMutation]);

  return [handleSubmit, errChange];
};
export default useForgotPassword;
