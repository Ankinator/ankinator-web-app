import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';

const EvaluationComp = ({ pdfFile, textData }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [text, setText] = useState(textData[0]);

  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
    setText(textData[0]);
  }, [pdfFile, textData]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      setText(textData[pageNumber]);
    }
  }

  function goToPrevPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setText(textData[pageNumber - 2]);
    }
  }

  if (!pdfFile) {
    return null; // Wenn pdfFile leer ist, wird die Komponente nicht gerendert
  }

  return (
    <Container fluid className="p-0">
      <Container fluid>
        <Row className="mx-0">
          <Col md={6} className="p-0">
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="page-navigation">
              <button onClick={goToPrevPage}>Prev</button>
              <span>{pageNumber} of {numPages}</span>
              <button onClick={goToNextPage}>Next</button>
            </div>
          </Col>
          <Col md={6}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EvaluationComp;
