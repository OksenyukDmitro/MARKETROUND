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
    photos: [],
    loading: false,
    uploadingImage: false,
  });

  const { addProduct } = useProductHandlers();

  const handleSubmit = useCallback(async (values) => {
    const {
      photos,
    } = state;
    const {
      title,
      location,
      description,
      categoryName,
    } = values;
    try {
      const price = parseFloat(values.price);
      const data = await addProduct({
        title,
        location,
        description,
        price,
        images: photos,
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


  const handleChangeImages = useCallback(async (e) => {
    e.preventDefault();
    const newImage = e.target.files[0];
    dispatch({ type: 'change', name: 'uploadingImage', value: true });
    const url = await Uploader.upload(newImage);
    dispatch({ type: 'change', name: 'uploadingImage', value: false });
    const images = state.photos;
    images.push({ url });
    console.log(images);

    dispatch({ type: 'change', name: 'name', value: images });
  }, [state.photos]);

  return [state, handleSubmit, handleChangeImages];
};

export default useAddProductForm;
