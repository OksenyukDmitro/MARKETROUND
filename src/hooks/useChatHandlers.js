import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  generatePath,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../router/routes';

export const CREATE_CHAT = gql`
 
  mutation ($productId: String!){
    createChat(productId: $productId ) {
      _id     
    }
  }
`;


const useChatHandlers = (history) => {
  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: (data) => {
      history.push({
        pathname: generatePath(routes.chat, {
          id: data.createChat._id,
        }),
      });
    },
  });

  const handleCreateChat = useCallback(async (productId, user_id, ownerId) => {
    if (user_id === ownerId) {
      history.push(routes.chats);
      return;
    }

    try {
      await createChat({
        variables: { productId },
      });
      toast.success('Created a new chat');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, [createChat, history]);


  return [
    handleCreateChat,
  ];
};

export default useChatHandlers;
