import React, { useState } from 'react';

const UploadPdfForm = ({ onPdfSelect }) => {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfSelect = (event) => {
    const selectedFile = event.target.files[0];
    setPdfFile(selectedFile);
    onPdfSelect(selectedFile);
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handlePdfSelect} />
    </div>
  );
};

export default UploadPdfForm;
