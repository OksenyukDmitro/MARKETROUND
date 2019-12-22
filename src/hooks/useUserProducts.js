import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const USER_PRODUCTS_QUERY = gql`
  query($userId: String!, $offset: Int!, $limit: Int!) {
    userProducts(userId: $userId, offset: $offset, limit: $limit) @connection(key: "products") {
      title
      _id
      location
      price
      createdAt
      categoryId
      creatorId
      description
      images{
        url
      }
      category {
        name
      }
      creator{
        _id
        username
          profile{
            avatar
            firstName
            lastName
          }
        }
        }
  }
`;

const useUserProducts = (userId) => {
  const { data, loading: userProductsLoading } = useQuery(USER_PRODUCTS_QUERY, {
    variables: { userId, limit: 5, offset: 0 },
    fetchPolicy: 'cache-and-network',
  });

  const userProducts = data ? data.userProducts : [];
  return {
    userProducts,
    userProductsLoading,
  };
};

export default useUserProducts;
