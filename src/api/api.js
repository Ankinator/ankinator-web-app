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

export const login = async () => {
  var cookie = new Cookie();
  if (cookie.get("access_token") === undefined) {
    try {
      const formData = new FormData();
      formData.append('username', 'testuser');
      formData.append('password', 'secret');
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
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

export const loginWithCred = async (username, password) => {
  var cookie = new Cookie();

  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const response = await axios.post(`${API_URL}/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    var result = await response.data;
    cookie.set('access_token', result.access_token, { path: '/' });
    getUser();
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
      const formData = new FormData();
      formData.append('username', 'testuser');
      formData.append('password', 'secret');
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
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

export const postSelectedPages = async (pdfFile, selectedPages, domain, model) => {
  var cookie = new Cookie();
  try {
    const formData = new FormData();
    if (selectedPages.selected.length !== 0) {
      formData.append('pages', selectedPages.selected);
    }
    formData.append('file', pdfFile, pdfFile.name);
    formData.append('model', model);
    formData.append('domain', domain);
    const response = await axios.post(`${API_URL}/uploadpdf`, formData, {
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

export const getResults = async (documentId) => {
  const cookie = new Cookie();
  try {
    const response = await axios.get(`${API_URL}/result?document_id=${documentId}`, {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getResultPdf = async (documentId) => {
  const cookie = new Cookie();
  try {
    const response = await axios.get(`${API_URL}/resultpdf?document_id=${documentId}`, {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};