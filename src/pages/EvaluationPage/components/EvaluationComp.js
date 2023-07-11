import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';

const EvaluationComp = ({ documentId, pdfFile}) => {
  console.log(documentId, " + " , pdfFile);
  /*
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [slidePageNumbers, setSlidePageNumbers] = useState([]);

  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
    setSlidePageNumbers(Array(slidePdfs.length).fill(1));
  }, [pdfFile, slidePdfs]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      setSlidePageNumbers(slidePageNumbers.map((page) => page + 1));
    }
  }

  function goToPrevPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setSlidePageNumbers(slidePageNumbers.map((page) => page - 1));
    }
  }

  if (!pdfFile) {
    return null;
  }

  return (
    <Container fluid className="p-0">
      <Container fluid>
        <Row className="mx-0">
          <Col md={6} className="p-0">
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="page-navigation">
              <button onClick={goToPrevPage}>Prev</button>
              <span>{pageNumber} of {numPages}</span>
              <button onClick={goToNextPage}>Next</button>
            </div>
          </Col>
          <Col md={6}>
            {slidePdfs.map((slidePdf, index) => (
              <div key={index}>
                <h3>Slide PDF {index + 1}</h3>
                <Document file={slidePdf} onLoadSuccess={({ numPages }) => setSlidePageNumbers((prevPageNumbers) => {
                  const updatedPageNumbers = [...prevPageNumbers];
                  if (numPages > 0) {
                    updatedPageNumbers[index] = Math.min(updatedPageNumbers[index], numPages);
                  }
                  return updatedPageNumbers;
                })}>
                  <Page pageNumber={slidePageNumbers[index]} />
                </Document>
                <div className="page-navigation">
                  <button
                    disabled={slidePageNumbers[index] <= 1}
                    onClick={() => setSlidePageNumbers((prevPageNumbers) => {
                      const updatedPageNumbers = [...prevPageNumbers];
                      updatedPageNumbers[index] = updatedPageNumbers[index] - 1;
                      return updatedPageNumbers;
                    })}
                  >
                    Prev
                  </button>
                  <span>{slidePageNumbers[index]} of {numPages}</span>
                  <button
                    disabled={slidePageNumbers[index] >= numPages}
                    onClick={() => setSlidePageNumbers((prevPageNumbers) => {
                      const updatedPageNumbers = [...prevPageNumbers];
                      updatedPageNumbers[index] = updatedPageNumbers[index] + 1;
                      return updatedPageNumbers;
                    })}
                  >
                    Next
                  </button>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </Container>
  );*/
};

export default EvaluationComp;
