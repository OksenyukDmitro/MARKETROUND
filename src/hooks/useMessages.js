import { useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import uuid from 'uuid';
import { toast } from 'react-toastify';
import useMe from './useMe';


export const MESSAGES_QUERY = gql`
  query($chatId: String!) {
    chat(chatId: $chatId)  @connection(key: "chat")  {
    _id    
    messages{
      _id
      body
      createdAt
      createdBy
    } 
    createdBy
    createdAt
    unreadMessagesCount
    lastMessage{
      body
    }
    interlocutor{
      username
      _id
      profile{
        firstName
        lastName
        avatar
      }
    }
    creator{
      username
      _id
      profile{
        firstName
        lastName
        avatar
      }
    }
  }
}
`;
export const ADD_MESSAGE = gql`
  mutation ($chatId: String!, $body: String!){
    addMessage(chatId: $chatId body: $body) {
      _id
      body
    chatId 
    createdAt
    }
  }
`;


const useMessages = (chatId) => {
  const [user] = useMe();

  const [body, setBody] = useState('');
  const { data, loading } = useQuery(MESSAGES_QUERY, {
    variables: { chatId },
    fetchPolicy: 'cache-and-network',
  });


  const [addMessage] = useMutation(ADD_MESSAGE, {
    refetchQueries: [{
      query: MESSAGES_QUERY,
      variables: { chatId },
      fetchPolicy: 'cache-and-network',
    }],

    update: (cache, { data: { addMessage: message } }) => {
      const { chat } = cache.readQuery({
        query: MESSAGES_QUERY,
        variables: { chatId },
      });

      chat.messages = [message, ...chat.messages];
      const newChat = { ...chat };
      cache.writeQuery({
        query: MESSAGES_QUERY,
        variables: { chatId },
        data: { chat: newChat },
        createdBy: user._id,
      });
    },
  });

  const handleAddMessage = useCallback(async () => {
    try {
      await addMessage({
        variables: { chatId, body },
        optimisticResponse: {
          addMessage: {
            _id: uuid(),
            body,
            createdAt: String(new Date().getTime()),
            creator: user,
            createdBy: user._id,
            __typename: 'Message',
          },
        },
      });
      toast.success('Published a new post');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, [addMessage, body, chatId, user]);

  const chat = data ? data.chat : undefined;

  return [
    chat,
    handleAddMessage,
    body,
    setBody,
    loading,
  ];
};

export default useMessages;
