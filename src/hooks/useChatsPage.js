import { useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  generatePath,
} from 'react-router-dom';
import routes from '../router/routes';

export const CHATS_QUERY = gql`
 query {
  chats(limit:5,offset:0 ) @connection(key: "chats"){
    _id
    createdAt
    productId    
    product{
     title,
     price,
     description
  }
    messages{
      body
    } 
    createdBy
    unreadMessagesCount
    lastMessage{
      body
      createdAt
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


const useChatsPage = () => {
  const { loading, data } = useQuery(CHATS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });


  const openChat = useCallback(async ({ chatId, match, history }) => {
    if (match.params.id !== chatId) {
      history.push({
        pathname: generatePath(routes.chat, {
          id: chatId,
        }),
      });
    }
  }, []);
  return [data ? data.chats : [], openChat, loading];
};

export default useChatsPage;
