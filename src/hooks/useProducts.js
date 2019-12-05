import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useInfiniteScroll from './useInfiniteScroll';


export const PRODUCTS_QUERY = gql`
  query($offset: Int!, $limit: Int!) {
    products(offset: $offset, limit: $limit) @connection(key: "products") {
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


const useProducts = () => {
  const [state, setState] = useState({
    isFetchingMore: false,
  });


  const { data, loading, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: { limit: 20, offset: 0 },
    fetchPolicy: 'cache-and-network',
  });

  const products = data ? data.products : [];

  const fetchMoreListItems = useCallback(async () => {
    setState({
      isFetchingMore: true,
    });
    setIsFetching(true);
    await fetchMore({
      variables: {
        offset: products.length,
        limit: 2,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { ...prev, products: [...prev.products, ...fetchMoreResult.products] };
      },
    });
    setState({
      isFetchingMore: false,
    });
  }, [products.length, fetchMore, setIsFetching]);

  const setIsFetching = useInfiniteScroll(fetchMoreListItems);

  return {
    products,
    loading,
    isFetchingMore: state.isFetchingMore,
  };
};

export default useProducts;
