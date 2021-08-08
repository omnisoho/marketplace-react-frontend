import React, { useState, useEffect } from 'react';
import ProductDataService from '../services/product.service.js';
import AuthService from '../services/auth.service';
import Moment from 'moment';
import placeholderImage from '../assets/images/product-placeholder.png';

const SERVER_URL = 'http://localhost:8080/';

const MyProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="col-9">
      <div className="h1">
        {products.length > 0
          ? `Hi ${currentUser.username}, these are your products`
          : `Hi ${currentUser.username}, you currently have no products`}
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
                      : `No product name provided`}
                  </h5>
                  <h4 className="card-title">
                    {product.price ? `$ ${product.price}` : `-`}
                  </h4>
                  {product.status === 'Sold' &&
                  product.buyer &&
                  product.buyer.username === currentUser.username ? (
                    <h4 className="card-title text-success">{`Bought`}</h4>
                  ) : product.status === 'Sold' &&
                    product.buyer &&
                    product.buyer.username !== currentUser.username ? (
                    <h4 className="card-title text-success">{`Sold to ${product.buyer.username}`}</h4>
                  ) : (
                    <h4 className="card-title text-info">{product.status}</h4>
                  )}
                  <p className="card-text">
                    {product.description && product.description !== ''
                      ? product.description
                      : `No decription was provided`}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      posted on
                      {' ' +
                        Moment(new Date(product.datePublished)).format(
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
  );
};

export default MyProductsList;
