import React, { useState, useEffect } from 'react';
import ProductDataService from '../services/product.service.js';
import Moment from 'moment';

const SERVER_URL = 'http://localhost:8080/';

const MyProductsList = () => {
  const [products, setProducts] = useState([]);

  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
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
    <div className="col-9">
      <div className="row mb-3">
        <div className="h1 col-6">My Products</div>
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
                  src={SERVER_URL + product.imageUrl}
                  className="card-img"
                  alt=".."
                  style={{ width: 200 }}
                />
              </div>
              <div className="col-9">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h4 className="card-title">{product.price}</h4>
                  <p className="card-text">{product.description}</p>
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
  );
};

export default MyProductsList;
