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
      return await response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export const uploadPdf = async (pdfFile) => {
  var cookie = new Cookie();
  try {
    const formData = new FormData();
    formData.append('file', pdfFile, pdfFile.name);
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

export const getPdf = async (document_id) => {
  var cookie = new Cookie();
  try {
    const response = await axios.get(`${API_URL}/pdf?pdf_document_id=${document_id}`, {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const extractionStart = async (document_id) => {
  var cookie = new Cookie();
  try {
    const response = await axios.post(`${API_URL}/generation/extraction/classifier/start?pdf_document_id=${document_id}`, null, {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });

    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const generateQuestions = async (extResults, selectedPages, domain, model) => {
  var cookie = new Cookie();
  try {
    const requestData = {
      pdf_document_id: extResults.pdf_document_id,
      pages : selectedPages.selected,
      model: model,
      domain: domain,
    };

    const response = await axios.post(`${API_URL}/generation/questions/start`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });

    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserPdfs = async (result_id) => {
  var cookie = new Cookie();
  try {
    const response = await axios.get(`${API_URL}/users/me/pdfs`, {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });
    console.log(response.data);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getResults = async (result_id) => {
  var cookie = new Cookie();
  try {
    const response = await axios.get(`${API_URL}/generation/result?result_id=${result_id}`, {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });
    console.log(response.data);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getResultPdf = async (result_id) => {
  const cookie = new Cookie();
  try {
    const response = await axios.get(`${API_URL}/generation/result/pdf?result_id=${result_id}`, {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('access_token')
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const exportCards = async (result_id, acceptedQuestions) => {
  var cookie = new Cookie();
  try {
    const requestData = {
      result_id: result_id,
      questions: acceptedQuestions
    };
    
    const response = await axios.post(`${API_URL}/create_flashcards`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookie.get('access_token')
      },
      responseType: "blob"
    });

    return await response.data;
  } catch (error) {
    console.error(error);
  }
};