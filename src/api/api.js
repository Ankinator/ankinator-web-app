import axios from 'axios';
import Cookie from 'universal-cookie';

const API_URL = 'http://localhost';

export const sessionLogin = async () => {
  try {
    const response = await axios.post(`${API_URL}/session`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    var result = await response.data;
    var cookieAcc = new Cookie();
    cookieAcc.set('access_token', result.access_token, { path: '/' });
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postSelectedPages = async (pdfFile, selectedPages, subject, domain) => {
  var cookie = new Cookie();
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile, pdfFile.name);
    /*formData.append('selectedPages', JSON.stringify(selectedPages));
    formData.append('subject', subject);
    formData.append('domain', domain);*/
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
