import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

const upload = (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    return axios.post(API_URL + 'upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  upload,
};
