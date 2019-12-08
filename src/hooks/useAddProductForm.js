import { useReducer, useCallback } from 'react';
import useProductHandlers from './useProductHandlers';
import Uploader from '../modules/uploader';

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
    photos: [],
    err: { active: false, msg: '' },
    loading: false,
    uploadingImage: false,
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

  const handleChangeImages = useCallback(async (e) => {
    e.preventDefault();
    const newImage = e.target.files[0];
    dispatch({ type: 'change', name: 'uploadingImage', value: true });
    const url = await Uploader.upload(newImage);
    dispatch({ type: 'change', name: 'uploadingImage', value: false });
    const images = state.photos;
    images.push(url);
    images.push(url);

    dispatch({ type: 'change', name: 'name', value: images });
  }, [state.photos]);

  return [state, handleSubmit, handleChange, handleChangeImages];
};

export default useAddProductForm;
