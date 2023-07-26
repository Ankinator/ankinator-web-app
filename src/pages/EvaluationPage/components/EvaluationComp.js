import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const EvaluationComp = ({ pdfFile, questions }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();
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
    } else {
      setPageNumber(1);
    }
  };

  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    console.log(`Number of pages: ${numPages}`);
  };

  const handleQuestionAccept = (question) => {
    acceptedQuestions[pageNumber - 1] = question;
    handleNextPage();
  };

  const isQuestionAccepted = (question) => {
    return acceptedQuestions.includes(question);
  };

  return (
    <Container fluid className="p-0">
      <Row className="mb-3" style={{ marginTop: '10px' }}>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button onClick={handlePrevPage} disabled={pageNumber === 1}>Prev</Button>
          <span className="mx-2">Page {pageNumber} of {totalPages}</span>
          <Button onClick={handleNextPage} disabled={pageNumber === totalPages}>Next</Button>
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
        </Col>
      </Row>
      <Row >
        <Col style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          {pdfData && (
            <div>
              <Document
                file={pdfData}
                onLoadSuccess={handleLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={800} renderTextLayer={true} />
              </Document>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        </Col>
        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: 10 }}>
          {questions.map((model, index) => (
            <div key={index} className="mb-3" style={{ width: 800 }}>
              <h5>Model: {model.model_name}</h5>
              <div className="d-flex justify-content-between align-items-center" style={{ marginTop: -10 }}>
                <p style={{ marginBottom: -3, marginRight: 2 }}>{model.model_result[pageNumber - 1][1]}</p>
                {isQuestionAccepted(model.model_result[pageNumber - 1][1]) ? (
                  // Render green button if question is accepted
                  <Button
                    variant="success"
                    className="rounded-circle"
                    style={{ marginBottom: 'auto' }}
                    disabled
                  >
                    ✓
                  </Button>
                ) : (
                  // Render gray button if question is not accepted
                  <Button
                    variant="secondary"
                    className="rounded-circle"
                    style={{ marginBottom: 'auto' }}
                    onClick={() => handleQuestionAccept(model.model_result[pageNumber - 1][1])}
                  >
                    ✓
                  </Button>
                )}
              </div>
            </div>
          ))}
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        </Col>
      </Row>
    </Container>
  );
};

export default EvaluationComp;
