import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


export const MESSAGES_QUERY = gql`
  query($chatId: String!) {
    chat(chatId: $chatId)  {
    _id    
    messages{
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
  }
}
`;


const useMessages = (chatId) => {
  const { data, loading } = useQuery(MESSAGES_QUERY, {
    variables: { chatId },
    fetchPolicy: 'cache-and-network',
  });

  const chat = data ? data.chat : undefined;
  return [
    chat,
    loading,
  ];
};

export default useMessages;
