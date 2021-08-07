import React, { useState } from 'react';
import ProductDataService from '../services/product.service';
import UploadDataService from '../services/upload.service';

const SERVER_URL = 'http://localhost:8080/';

const AddProduct = () => {
  const initialProductState = {
    id: null,
    name: '',
    description: '',
    // published: false
    datePublished: '',
    imageUrl: null,
    price: '',
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (event) => {
    console.log('event.target.files', event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      UploadDataService.upload(imageFile).then((response) => {
        console.log('upload response', response, response.data);
        setProduct({ ...product, imageUrl: response.data });
      });
    }
  };

  const saveProduct = () => {
    const data = {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    };

    ProductDataService.create(data)
      .then((response) => {
        setProduct({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          datePublished: response.data.datePublished,
          price: response.data.price,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Upload an Image</label>
            <input
              type="file"
              className="form-control"
              id="imageUpload"
              // required
              // value={product.imageUrl}
              onChange={handleFileChange}
              name="imageUpload"
            />
            {product.imageUrl && (
              <img
                src={SERVER_URL + product.imageUrl}
                style={{ width: 200 }}
              ></img>
            )}
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
