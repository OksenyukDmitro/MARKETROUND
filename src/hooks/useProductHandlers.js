import { useCallback } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { PRODUCT_QUERY } from './useProduct';

const ADD_PRODUCT = gql`
  mutation createAccount ($input: CreateProductInput!) {  
  addProduct(input: $input){
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
const UPDATE_PRODUCT = gql`
  mutation updateProduct ($input: UpdateProductInput!) {  
  updateProduct(input: $input){
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


const useProductHandlers = (_id) => {
  const [addProductMutate] = useMutation(ADD_PRODUCT);
  const [updateProductMutate] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{
      query: PRODUCT_QUERY,
      variables: { productId: _id },
      fetchPolicy: 'cache-and-network',
    }],

  });

  const addProduct = useCallback(async ({
    title,
    location,
    description,
    price,
    category,
    images,
  }) => {
    const { data: { addProduct: data } } = await addProductMutate({
      variables: {
        input: {
          title,
          location,
          description,
          category,
          price,
          images,
        },
      },
    });
    return data;
  }, [addProductMutate]);

  const updateProduct = useCallback(async (_id, status) => {
    const { data: { updateProduct: data } } = await updateProductMutate({
      variables: {
        input: {
          productId: _id,
          status,
        },
      },
    });
    return data;
  }, [updateProductMutate]);


  return { addProduct, updateProduct };
};

export default useProductHandlers;
