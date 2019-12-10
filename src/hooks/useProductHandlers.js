import { useCallback } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

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


const useProductHandlers = () => {
  const [addProductMutate] = useMutation(ADD_PRODUCT);

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


  return { addProduct };
};

export default useProductHandlers;
