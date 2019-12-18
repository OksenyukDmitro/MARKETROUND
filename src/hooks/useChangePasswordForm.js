import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useMe from './useMe';

export const CHANGE_PASSWORD_MUTATION = gql`
mutation changePassword ( $password: String! $newPassword: String!) {
    changePassword (
      input:{       
        password: $password
        newPassword: $newPassword
      }
    ) 
  }
`;


const useChangePasswordForm = () => {
  const [changePasswordMutation] = useMutation(CHANGE_PASSWORD_MUTATION);

  const [me] = useMe();

  const state = {
    avatar: me.profile.avatar,
    password: '',
    newPassword: '',
  };

  const handleSubmit = useCallback(async (values) => {
    const { password, newPassword } = values;
    try {
      const { data: { changePassword } } = await changePasswordMutation({
        variables: { password, newPassword },
      });
      if (changePassword) {
        toast.success('Success');
      } else {
        toast.error('Password not change');
      }
      return changePassword;
    } catch (error) {
      let { message } = error;
      if (error.graphQLErrors) {
        message = error.graphQLErrors.map((err) => err.message).join('\n');
      }

      toast.error(message);
    }
    return false;
  }, [changePasswordMutation]);

  return [state, handleSubmit];
};
export default useChangePasswordForm;
