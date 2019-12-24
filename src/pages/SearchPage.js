import React, { useState, useCallback } from 'react';
import {
  Spinner, Input, Form, Button,
} from 'reactstrap';
import Product from '../components/Product';
import useSeachProducts from '../hooks/useSeachProducts';
import category from '../helpers/category';
import routes from '../router/routes';

const ProductsPage = (props) => {
  const { location, history } = props;
  const query = new URLSearchParams(location.search);
  const urlCategory = query.get('category');
  const urlSearch = query.get('search');
  const {
    products, loading, isFetchMore: isFetchingMore,
  } = useSeachProducts(urlCategory, urlSearch);
  const [localState, setLocalState] = useState({
    category: urlCategory,
    searchQuery: urlSearch,
  });
  const onSearch = useCallback((e) => {
    e.preventDefault();
    history.push({
      pathname: routes.search,
      search: `?${new URLSearchParams({ category: localState.category, search: localState.searchQuery }).toString()}`,
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
          onChange={({ target }) => setLocalState(
            (prevState) => ({ ...prevState, searchQuery: target.value }),
          )}
          value={localState.searchQuery}
        />
        <Input
          className="login-input "
          type="select"
          name="categoryName"
          id="category"
          style={{
            marginLeft: '10px', maxWidth: '200px', minWidth: '100px', marginTop: '5px',
          }}
          onChange={({ target }) => setLocalState(
            (prevState) => ({ ...prevState, category: target.value }),
          )}
        >
          <option>{urlCategory !== '' ? urlCategory : 'All'}</option>
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
      {isFetchingMore && <Spinner />}
    </div>
  );
};

export default ProductsPage;
