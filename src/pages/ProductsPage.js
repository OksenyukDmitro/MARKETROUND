import React, { useState, useCallback } from 'react';
import {
  Spinner, Input, Form, Button,
} from 'reactstrap';
import Product from '../components/Product';
import useProducts from '../hooks/useProducts';
import category from '../helpers/category';
import routes from '../router/routes';

const ProductsPage = ({ history }) => {
  const [state, setState] = useState({
    category: '',
    searchQuery: '',
  });
  const {
    products, loading, isFetchingMore,
  } = useProducts();
  const onSearch = useCallback((e) => {
    e.preventDefault();
    history.push({
      pathname: routes.search,
      search: `?${new URLSearchParams({ category: state.category === 'All' ? 'All' : state.category, search: state.searchQuery }).toString()}`,
    });
  });
  if (loading && products.length === 0) return <Spinner />;
  return (
    <div style={{ marginLeft: '13%', marginRight: 'auto' }}>

      <Form
        className="d-flex flex-row"
        style={{ marginLeft: '10px', marginRight: '15%' }}
        onSubmit={onSearch}
      >
        <Input
          className="login-input"
          style={{ minWidth: '100px' }}
          id="search"
          type="text"
          name="search"
          placeholder="Search"
          onChange={({ target }) => setState((prevState) => ({
            ...prevState,
            searchQuery: target.value,
          }))}
          value={state.searchQuery}
        />
        <Input
          className="login-input "
          type="select"
          name="categoryName"
          id="category"
          style={{
            marginLeft: '10px', maxWidth: '200px', minWidth: '100px', marginTop: '5px',
          }}
          onChange={({ target }) => setState((prevState) => ({
            ...prevState,
            category: target.value,
          }))}
        >
          {category.map((ctg) => (
            <option>{ctg}</option>
          ))}
          <option>All</option>
        </Input>
        <Button
          className="button"
          type="submit"
          style={{
            marginLeft: '15px', marginTop: '7px', height: '34px', lineHeight: '1',
          }}
        >
          Search
        </Button>
      </Form>


      {products.map((product) => (
        <Product
          key={product._id}

          {...product}
        />
      ))}
      {isFetchingMore && <Spinner
        className="fixed-bottom"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      />}
    </div>
  );
};

export default ProductsPage;
