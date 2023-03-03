import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';


const uploadPdf = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { uploadPdf };
