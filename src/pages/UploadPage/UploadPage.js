import React, { useState } from 'react';
import './UploadPage.css';
import UploadPdfForm from './components/UploadPdfForm';
import PdfSelector from './components/PdfSelector';
import { bgColors } from '../../App';
import { Container } from 'react-bootstrap';

const UploadPage = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfSelect = (pdf) => {
    setPdfFile(pdf);
  };

  return (
    <Container style={{maxWidth: "100%", padding: 0, height: "100%", backgroundColor: bgColors.Hint}}>
      <h1>PDF Viewer App</h1>
      <UploadPdfForm onPdfSelect={handlePdfSelect} />
      <PdfSelector pdfFile={pdfFile} />
    </Container>
  );
};

export default UploadPage;
