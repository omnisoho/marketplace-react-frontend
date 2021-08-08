import React, { useState, useEffect } from 'react';
import ProductDataService from '../services/product.service.js';
import Moment from 'moment';
import { useSnackbar } from 'notistack';
import Fade from '@material-ui/core/Fade';
import placeholderImage from '../assets/images/product-placeholder.png';

const SERVER_URL = 'http://localhost:8080/';

const MyProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onClickBuy = (id) => (e) => {
    console.log('buying product id', id);
    ProductDataService.updateStatus(id).then((response) => {
      enqueueSnackbar('Transaction succesfully processed.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        TransitionComponent: Fade,
      });
      retrieveProducts();
    });
  };

  const retrieveProducts = () => {
    ProductDataService.search()
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    ProductDataService.search(searchName)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="col-9">
        <div className="row mb-3">
          <div className="h1 col-6">Find and Buy Products</div>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search product name"
              value={searchName}
              onChange={onChangeSearchName}
            />
          </div>
          <div className="col-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        {products &&
          products.map((product, index) => (
            <div key={index} className="card mb-3 p-3">
              <div className="row no-gutters">
                <div className="col-3">
                  <img
                    src={
                      product.imageUrl
                        ? SERVER_URL + product.imageUrl
                        : placeholderImage
                    }
                    className="card-img"
                    alt=".."
                    style={{ width: 200 }}
                  />
                </div>
                <div className="col-9">
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.name && product.name !== ''
                        ? product.name
                        : `No product name was provided from seller`}
                    </h5>
                    <h4 className="card-title">
                      {product.price ? `$ ${product.price}` : `-`}
                    </h4>
                    <div className="row">
                      <h4 className="card-title col-3 text-info">
                        {product.status}
                      </h4>
                      {product.status === 'Available' && (
                        <button
                          className="btn btn-outline-primary col-3"
                          type="button"
                          onClick={onClickBuy(product.id)}
                        >
                          Buy
                        </button>
                      )}
                    </div>
                    <p className="card-text">
                      {product.description && product.description !== ''
                        ? product.description
                        : `No decription was provided from seller`}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        {Moment(new Date(product.datePublished)).format(
                          'DD MMM YY hh:mm A'
                        )}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyProductsList;
