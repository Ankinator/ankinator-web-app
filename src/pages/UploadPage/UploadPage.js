import React, { useState } from 'react';
import './UploadPage.css';
import Header from '../../assets/components/Header';
import UploadPdfForm from './components/UploadPdfForm';
import PdfSelector from './components/PdfSelector/PdfSelector';
import { Container, Spinner } from 'react-bootstrap';
import { uploadPdf, extractionStart, getResults, getPdf } from '../../api/api';

const UploadPage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [extResults, setextResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePdfUpload = async (pdf) => {
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

  const handlePdfSelect = async (pdf_document_id) => {
    setLoading(true);
    try {
      const pdf = await getPdf(pdf_document_id);
      pdfDecoder(pdf);
      const extractStart = await extractionStart(pdf_document_id);
      await extractionResult(extractStart.result_id);
    } catch (error) {
      console.error('Error handling PDF file:', error);
    }
  };

  const pdfDecoder = (pdf) => {
    const decodeBase64 = (base64String) => {
      const decodedString = atob(base64String);
      const bytes = new Uint8Array(decodedString.length);
      for (let i = 0; i < decodedString.length; i++) {
        bytes[i] = decodedString.charCodeAt(i);
      }
      return bytes;
    };

    // Base64-dekodierte Daten in ein Blob-Objekt umwandeln
    const byteData = decodeBase64(pdf);
    const blob = new Blob([byteData], { type: 'application/pdf' });

    // Blob-Objekt in eine URL umwandeln und im State speichern
    setPdfFile(URL.createObjectURL(blob));
  };

  const extractionResult = async (result_id) => {
    try {
      //UploadPdf
      const extResult = await getResults(result_id);
      if (extResult.pages === null) {
        await new Promise((resolve) => setTimeout(resolve, 2500));
        await extractionResult(result_id);
      } else {
        extResult.result_id = result_id;
        setextResults(extResult);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error getting extraction results:', error);
    }
  };

  return (
    <Container style={{ maxWidth: "100%", padding: 0, height: "100%", color: "white", backgroundImage: `url("/src/assets/images/background_image.jpg")` }}>
      <Header></Header>
      <UploadPdfForm onPdfUpload={handlePdfUpload} onPdfSelect={handlePdfSelect} />
      {loading ? (
        <div className="overlay">
          <p className="overlay-text" style={{ marginTop: 15, marginRight: 10 }}>Extracting PDF, please wait</p>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <PdfSelector pdfFile={pdfFile} extResults={extResults} />
        </>
      )}
    </Container>
  );
};

export default UploadPage;
