import axios from 'axios';
import Cookie from 'universal-cookie';

const API_URL = 'http://localhost';

export const sessionLogin = async () => {
  var cookie = new Cookie();
  if (cookie.get("access_token") === undefined) {
    try {
      const response = await axios.post(`${API_URL}/session`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      var result = await response.data;
      cookie.set('access_token', result.access_token, { path: '/' });
      getUser();
      return await response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    getUser();
    return;
  }
};

export const postSelectedPages = async (pdfFile, selectedPages, subject, domain) => {
  var cookie = new Cookie();
  try {   
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('pages', selectedPages);
    formData.append('models', "test");
    formData.append('domain', domain);
    const response = await axios.post(`${API_URL}/uploadpdf`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });
    
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  var cookie = new Cookie();
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });
    console.log(response.data);
    return await response.data;
  } catch (error) {
    try {
      const response = await axios.post(`${API_URL}/session`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      var result = await response.data;
      cookie.set('access_token', result.access_token, { path: '/' });
      getUser();
      return await response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
