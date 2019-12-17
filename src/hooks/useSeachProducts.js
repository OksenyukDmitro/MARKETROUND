import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useInfiniteScroll from './useInfiniteScroll';


export const PRODUCTS_QUERY = gql`
  query($offset: Int!, $limit: Int!, $category: String, $seacrhQuery: String) {
    products(offset: $offset, limit: $limit, category: $category, seacrhQuery: $seacrhQuery) @connection(key: "products") {
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


const useProducts = (category, search) => {
  const [state, setState] = useState({
    isFetchingMore: false,
    category,
    searchQuery: search,
  });


  const { data, loading, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: {
      limit: 20,
      offset: 0,
      category: state.category,
      searchQuery: state.searchQuery,
    },
    fetchPolicy: 'cache-and-network',
  });

  const products = data ? data.products : [];

  const fetchMoreListItems = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isFetchingMore: true,
    }));
    setIsFetching(true);
    await fetchMore({
      variables: {
        offset: products.length,
        limit: 2,
        category: state.category,
        searchQuery: state.searchQuery,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { ...prev, products: [...prev.products, ...fetchMoreResult.products] };
      },
    });
    setState((prevState) => ({
      ...prevState,
      isFetchingMore: false,
    }));
  }, [setIsFetching, fetchMore, products.length, state.category, state.searchQuery]);

  const setIsFetching = useInfiniteScroll(fetchMoreListItems);
  return {
    products,
    setState,
    loading,
    isFetchingMore: state.isFetchingMore,

  };
};

export default useProducts;
