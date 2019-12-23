import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Uploader from '../modules/uploader';
import useMe from './useMe';


const UPDATE_ACCOUNT_MUTATION = gql`
mutation updateAccount ($username: String! $profile: UserProfileInput!) {
  updateAccount (
    input:{
      username: $username      
      profile: $profile
    }
  ) {
    _id
        username   
     profile {
      firstName
      lastName
      avatar
    }   
  }
}
`;
const useUserForm = () => {
  const [updateAccount] = useMutation(UPDATE_ACCOUNT_MUTATION);

  const [me] = useMe();
  const [state, setState] = useState({
    avatar: me.profile.avatar,
    newAvatar: null,
    isUploading: false,
    errUpdate: { active: false, msg: '' },
  });
  const formikState = {
    username: me.username,
    firstName: me.profile.firstName,
    lastName: me.profile.lastName,
  };

  const uploadAvatar = async (newAvatar) => {
    const url = await Uploader.upload(newAvatar);
    return url;
  };

  const handleSubmit = useCallback(async (e, values) => {
    e.preventDefault();
    let newAvatar = e.target.newAvatar.files[0];
    e.target.newAvatar.value = null;

    const {
      username, firstName, lastName,
    } = values;
    const { avatar } = state;

    const profile = { firstName, lastName, avatar };
    try {
      setState((s) => ({ ...s, isUploading: false, errUpdate: { active: false, msg: '' } }));
      if (newAvatar) {
        setState((s) => ({ ...s, isUploading: true }));
        newAvatar = await uploadAvatar(newAvatar) || avatar;
        setState((s) => ({ ...s, avatar: newAvatar, isUploading: false }));
        profile.avatar = newAvatar;
      }

      await updateAccount({
        variables: { username, profile },
      });
      toast.success('Success');
    } catch (err) {
      setState((s) => ({
        ...s,
        isUploading: false,
        errUpdate: {
          active: true,
          msg: err.graphQLErrors.map((error) => error.message).join('\n'),
        },
      }));
    }
  }, [state, updateAccount]);

  return [state, formikState, handleSubmit];
};


export default useUserForm;
