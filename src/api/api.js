import axios from 'axios';

const API_URL = 'https://example.com/api';

export const postSelectedPages = async (pdfFile, selectedPages) => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile, pdfFile.name);
    formData.append('selectedPages', JSON.stringify(selectedPages));

    const response = await axios.post(`${API_URL}/selected-pages`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
