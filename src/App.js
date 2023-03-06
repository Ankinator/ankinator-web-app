import React, { useState } from 'react';
import UploadPdfForm from './components/UploadPdfForm';
import PdfSelector from './components/PdfSelector';

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfSelect = (pdf) => {
    setPdfFile(pdf);
  };

  return (
    <div>
      <h1>PDF Viewer App</h1>
      <UploadPdfForm onPdfSelect={handlePdfSelect} />
      <PdfSelector pdfFile={pdfFile} />
    </div>
  );
};

export default App;
