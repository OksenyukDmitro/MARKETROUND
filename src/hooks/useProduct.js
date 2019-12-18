import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PRODUCTS_QUERY } from './useProducts';

export const PRODUCT_QUERY = gql`
  query($productId: ID!) {
    product(productId: $productId) @connection(key: "product") {
      title
      _id
      location
      price
      createdAt
      categoryId
      status
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
  const { data: userProducts, loading: userProductsLoading } = useQuery(PRODUCTS_QUERY, {
    variables: { limit: 3, offset: 0 },
    fetchPolicy: 'cache-and-network',
  });

  const product = data ? data.product : undefined;

  const lastUserProducts = userProducts ? userProducts.products : [];
  return {
    product,
    loading,
    lastUserProducts,
    userProductsLoading,
  };
};

export default useProduct;
