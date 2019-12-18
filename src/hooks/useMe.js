import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import WishModel from '../modules/wish';

export const ME_QUERY = gql`
  query me {
    me {
      _id
      username
      wish
      profile {
        avatar
        firstName
        lastName
      }
    }
  }
`;


const useMe = () => {
  const { loading, data } = useQuery(ME_QUERY, {
    onCompleted: ({ me: { wish } }) => {
      WishModel.setList(wish);
    },
  });

  return [data ? data.me : undefined, loading];
};

export default useMe;
