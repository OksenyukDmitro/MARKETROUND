import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


export const PRODUCT_QUERY = gql`
  query($productId: ID!) {
    product(productId: $productId) @connection(key: "product") {
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


const useProduct = (productId) => {
  const { data, loading } = useQuery(PRODUCT_QUERY, {
    variables: { productId },
    fetchPolicy: 'cache-and-network',
  });

  const product = data ? data.product : undefined;
  return {
    product,
    loading,
  };
};

export default useProduct;
