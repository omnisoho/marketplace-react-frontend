import axios from 'axios';
import AuthHeaderHelper from './helper/auth-header';

const API_URL = 'http://localhost:8080/api';

// get all my product listings
const getAll = () => {
  return axios.get(API_URL + '/products', {
    headers: AuthHeaderHelper.authHeader(),
  });
};

// search others' product listings
const search = (name) => {
  const searchQuery = name ? `?name=${name}` : ``;
  return axios.get(API_URL + `/products/search${searchQuery}`, {
    headers: AuthHeaderHelper.authHeader(),
  });
};

// add new product
const create = (data) => {
  return axios.post(API_URL + '/products', data, {
    headers: AuthHeaderHelper.authHeader(),
  });
};

export default {
  getAll,
  search,
  create,
};
