import { useReducer, useCallback } from 'react';
import useProductHandlers from './useProductHandlers';

const reduce = (state, action) => {
  switch (action.type) {
  case 'change':
    return { ...state, [action.name]: action.value };
  case 'err':
    return { ...state, errLogin: { active: true, msg: action.msg } };
  default:
    return state;
  }
};


const useAddProductForm = (onSuccess) => {
  const [state, dispatch] = useReducer(reduce, {
    title: '',
    location: '',
    description: '',
    price: 0,
    categoryName: '',
    photos: '',
    err: { active: false, msg: '' },
  });

  const { addProduct } = useProductHandlers();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const {
      title,
      location,
      description,
      photos,
      categoryName,
    } = state;
    try {
      const price = parseFloat(state.price);
      const data = await addProduct({
        title,
        location,
        description,
        price,
        images: [{ url: photos }],
        category: {
          name: categoryName,
        },
      });
      onSuccess(data);
    } catch (err) {
      let { message } = err;
      if (err.graphQLErrors) {
        message = err.graphQLErrors.map((error) => error.message).join('\n');
      }
      dispatch({ type: 'err', msg: message });
    }
  }, [addProduct, onSuccess, state]);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'change', name, value });
  }, []);
  return [state, handleSubmit, handleChange];
};

export default useAddProductForm;
