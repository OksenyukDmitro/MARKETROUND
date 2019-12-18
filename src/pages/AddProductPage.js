import React from 'react';
import {
  Input, Form, Alert, Button, Label, Spinner,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAddProductForm from '../hooks/useAddProductForm';
import category from '../category';
import routes from '../router/routes';
import ImageUpload from '../components/ImageUpload';
import validationSchema from '../validationSchema';

const AddProductPage = (props) => {
  const { history } = props;
  const onSuccess = React.useCallback(({ _id }) => {
    toast.success('Product created!');

    history.push(`${routes.product}/${_id}`);
  }, [history]);
  const [state, handleSubmit, handleChangeImages] = useAddProductForm(onSuccess);

  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      description: '',
      categoryName: '',
      price: 0,
    },
    validationSchema: Yup.object({
      title: validationSchema.title,
      location: validationSchema.location,
      description: validationSchema.description,
      categoryName: validationSchema.category,
      price: validationSchema.price,
    }),
    onSubmit: (values) => handleSubmit(values),
  });
  const {
    title,
    location,
    description,
    price,
  } = formik.values;
  const {
    photos,
    loading,
    uploadingImage,
  } = state;
  if (loading) return <Spinner />;

  const disabled = Boolean(formik.errors.title || formik.errors.description
    || formik.errors.location || formik.errors.price);
  return (

    <div
      className="row mx-auto justify-content-center align-items-center flex-column "
      style={{
        paddingLeft: '65px',
      }}
    >
      <Form
        className="col-6"
        onSubmit={formik.handleSubmit}
        style={{
          float: 'left',
          width: '100%',
          height: '86vh',
          minWidth: '50%',
          maxWidth: '500px',
        }}
      >
        <div>
          <Label style={{ marginBottom: '0px', marginTop: '5px' }} for="title">Title</Label>
          <Input
            id="title"
            className=""
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Alert
            className=" font-weight-normal"
            color="danger"
            isOpen={Boolean(formik.touched.title && formik.errors.title)}
          >
            {formik.errors.title}
          </Alert>
          <Label style={{ marginBottom: '0px', marginTop: '5px' }} for="location">Location</Label>
          <Input
            id="location"
            className=""
            type="text"
            name="location"
            placeholder="location"
            value={location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Alert
            className=" font-weight-normal"
            color="danger"
            isOpen={Boolean(formik.touched.location && formik.errors.location)}
          >
            {formik.errors.location}
          </Alert>
          <Label style={{ marginBottom: '0px', marginTop: '5px' }} for="description">Description</Label>
          <Input
            id="description"
            className=""
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Alert
            className=" font-weight-normal"
            color="danger"
            isOpen={Boolean(formik.touched.description && formik.errors.description)}
          >
            {formik.errors.description}
          </Alert>
          <Label style={{ marginBottom: '0px', marginTop: '5px' }} for="category">Category</Label>
          <Input
            className=""
            type="select"
            name="categoryName"
            id="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {category.map((ctg) => (
              <option>{ctg}</option>
            ))}
          </Input>
          <Alert
            className=" font-weight-normal"
            color="danger"
            isOpen={Boolean(formik.touched.category && formik.errors.category)}
          >
            {formik.errors.category}
          </Alert>
          <Label style={{ marginBottom: '0px', marginTop: '5px' }} for="price">Price</Label>
          <Input
            id="price"
            className=""
            type="number"
            name="price"
            placeholder="price"
            value={price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Alert
            className=" font-weight-normal"
            color="danger"
            isOpen={Boolean(formik.touched.price && formik.errors.price)}
          >
            {formik.errors.price}
          </Alert>
          <ImageUpload photos={photos} onChange={handleChangeImages} />
          {uploadingImage ? <Spinner /> : null}
          <Button
            className="button"
            type="submit"
            disabled={disabled}
          >
            Create
          </Button>

        </div>
      </Form>
    </div>

  );
};

export default AddProductPage;
