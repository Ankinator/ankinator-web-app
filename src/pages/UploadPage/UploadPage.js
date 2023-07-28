import React, { useState } from 'react';
import './UploadPage.css';
import Header from '../../assets/components/Header';
import UploadPdfForm from './components/UploadPdfForm';
import PdfSelector from './components/PdfSelector/PdfSelector';
import { bgColors } from '../../App';
import { Container, Spinner } from 'react-bootstrap';
import { uploadPdf, extractionStart, getResults } from '../../api/api';

const UploadPage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [extPages, setExtPages] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePdfSelect = async (pdf) => {
    setLoading(true);
    setPdfFile(pdf);
    try {
      const uploadReturn = await uploadPdf(pdf);
      const extractStart = await extractionStart(uploadReturn.pdf_document_id);
      await extractionResult(extractStart.result_id);
    } catch (error) {
      console.error('Error handling PDF file:', error);
    }
  };

  const extractionResult = async (resultId) => {
    try {
      //UploadPdf
      const extResult = await getResults(resultId);
      if (extResult.pages === null) {
        await new Promise((resolve) => setTimeout(resolve, 2500));
        await extractionResult(resultId);
      } else {
        setExtPages(extResult.pages);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error getting extraction results:', error);
    }
  };

  return (
    <Container style={{ maxWidth: "100%", padding: 0, height: "100%", color: "white", backgroundImage: `url("/src/assets/images/background_image.jpg")` }}>
      <Header></Header>
      <UploadPdfForm onPdfSelect={handlePdfSelect} />
      {loading ? (
        <div className="overlay">
          <p className="overlay-text" style={{ marginTop: 15, marginRight: 10 }}>Extracting pdf, please wait</p>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <PdfSelector pdfFile={pdfFile} extPages={extPages}/>
        </>
      )}
    </Container>
  );
};

export default UploadPage;
