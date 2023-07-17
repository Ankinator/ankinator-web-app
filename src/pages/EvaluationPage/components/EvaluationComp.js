import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const EvaluationComp = ({ pdfFile, questions }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = pdfFile ? pdfFile.numPages : 0;
  const [acceptedQuestions, setAcceptedQuestions] = useState([]);
  const [pdfData, setPdfData] = useState(null); // State zum Speichern der dekodierten PDF-Daten

  useEffect(() => {
    setAcceptedQuestions([]);
    setPageNumber(1);
  }, [questions]);

  useEffect(() => {
    // Funktion zum Dekodieren der base64-kodierten Daten
    const decodeBase64 = (base64String) => {
      const decodedString = atob(base64String);
      const bytes = new Uint8Array(decodedString.length);
      for (let i = 0; i < decodedString.length; i++) {
        bytes[i] = decodedString.charCodeAt(i);
      }
      return bytes;
    };

    // Base64-dekodierte Daten in ein Blob-Objekt umwandeln
    const byteData = decodeBase64(pdfFile);
    const blob = new Blob([byteData], { type: 'application/pdf' });

    // Blob-Objekt in eine URL umwandeln und im State speichern
    setPdfData(URL.createObjectURL(blob));
  }, [pdfFile]);

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleQuestionAccept = (question) => {
    setAcceptedQuestions((prevAccepted) => [...prevAccepted, question]);
    handleNextPage();
  };

  return (
    <Container fluid className="p-0">
      <Row className="mb-3">
        <Col>
          <Button onClick={handlePrevPage} disabled={pageNumber === 1}>Prev</Button>
          <span className="mx-2">{pageNumber} of {totalPages}</span>
          <Button onClick={handleNextPage} disabled={pageNumber === totalPages}>Next</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {pdfData && (
            <div>
              <h4>Page {pageNumber}</h4>
              <Document
                file={pdfData} // Hier verwenden wir die erstellte URL mit den dekodierten Daten
                onLoadSuccess={({ numPages }) => console.log(`Number of pages: ${numPages}`)}
              >
                <Page pageNumber={pageNumber} width={600} renderTextLayer={true}/>
              </Document>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Questions</h4>
          {questions.map((model, index) => (
            <div key={index} className="mb-3">
              <h5>{model.model_name}</h5>
              {model.model_result[pageNumber - 1]?.map((question, qIndex) => (
                <div key={qIndex}>
                  <p>{question}</p>
                  <Button
                    variant="success"
                    className="rounded-circle"
                    onClick={() => handleQuestionAccept(question)}
                  >
                    ✓
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default EvaluationComp;
