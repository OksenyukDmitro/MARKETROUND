import React from 'react';
import {
  Input, Form, Alert, Button, Label,
} from 'reactstrap';
import { toast } from 'react-toastify';
import useAddProductForm from '../hooks/useAddProductForm';
import category from '../category';
import routes from '../router/routes';

const AddProductPage = (props) => {
  const { history } = props;
  const onSuccess = React.useCallback(({ _id }) => {
    toast.success('Product created!');

    history.push(`${routes.product}/${_id}`);
  }, [history]);
  const [state, handleSubmit, handleChange] = useAddProductForm(onSuccess);

  const {
    title,
    location,
    description,
    price,
    err,
  } = state;
    // if (loading) return <Spinner />;
  return (

    <div
      className="row mx-auto justify-content-center align-items-center flex-column "
      style={{
        paddingLeft: '65px',
      }}
    >
      <Form
        className="col-6"
        onSubmit={handleSubmit}
        style={{
          float: 'left',
          width: '100%',
          height: '86vh',
          minWidth: '300px',
        }}
      >
        <div className="">
          <Alert color="danger" isOpen={err.active}>
            {err.msg}
          </Alert>
          <Label for="title">Title</Label>
          <Input
            id="title"
            className="login-input"
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={handleChange}
          />
          <Label for="location">Location</Label>
          <Input
            id="location"
            className="login-input"
            type="text"
            name="location"
            placeholder="location"
            value={location}
            onChange={handleChange}
          />
          <Label for="description">Description</Label>
          <Input
            id="description"
            className="login-input"
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={handleChange}
          />
          <Label for="category">Category</Label>
          <Input className="login-input" type="select" name="categoryName" id="category" onChange={handleChange}>
            {category.map((ctg) => (
              <option>{ctg}</option>
            ))}


          </Input>
          <Label for="price">Price</Label>
          <Input
            id="price"
            className="login-input"
            type="number"
            name="price"
            placeholder="price"
            value={price}
            onChange={handleChange}
          />
          <Button
            className="button"
            type="submit"
            disabled={!(title && description && price)}
          >
                        Create
          </Button>

        </div>
      </Form>
    </div>

  );
};

export default AddProductPage;
