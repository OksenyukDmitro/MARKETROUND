import { useCallback } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import WishModel from '../modules/wish';

const ADD_TO_WISH = gql`
  mutation addToWish ($productId: String! ) {
    addToWish (productId: $productId)
    }
`;
const REMOVE_FROM_WISH = gql`
  mutation removeFromWish ($productId: String! ) {
    removeFromWish (productId: $productId)
    }
`;

const useWishHandlers = (productId, setWish) => {
  const [addToWishMutate] = useMutation(ADD_TO_WISH);

  const addToWish = useCallback(async () => {
    WishModel.setItem(productId);
    setWish(true);
    const { data: { addToWish: response } } = await addToWishMutate({
      variables: { productId },
    });
    if (!response) {
      setWish(false);
      WishModel.removeItem(productId);
    }
    return response;
  }, [addToWishMutate, productId, setWish]);

  const [removeFromWishMutate] = useMutation(REMOVE_FROM_WISH);

  const removeFromWish = useCallback(async () => {
    WishModel.removeItem(productId);
    setWish(false);
    const { data: { removeFromWish: response } } = await removeFromWishMutate({
      variables: { productId },
    });
    if (!response) {
      setWish(true);
      WishModel.setItem(productId);
    }
    return response;
  }, [productId, removeFromWishMutate, setWish]);


  return [addToWish, removeFromWish];
};

export default useWishHandlers;
