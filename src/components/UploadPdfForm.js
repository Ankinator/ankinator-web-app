import { useState } from 'react';
import axios from 'axios';

const UploadPdfForm = ({ setPdfUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPdfUrl(response.data.fileUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="pdf" className="form-label">PDF-File auswählen:</label>
        <input type="file" className="form-control" id="pdf" accept=".pdf" onChange={(event) => setSelectedFile(event.target.files[0])} />
      </div>
      <button type="submit" className="btn btn-primary">Hochladen</button>
    </form>
  );
};

export default UploadPdfForm;
