import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PdfViewer = ({ pdfData }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPages, setSelectedPages] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handlePageChange(newPageNumber) {
    setPageNumber(newPageNumber);
  }

  function togglePageSelection(pageNumber) {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((p) => p !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  }

  return (
    <div>
      <div className="text-center mb-3">
        <Button variant="primary" className="mr-3" onClick={() => handlePageChange(pageNumber - 1)}>
          Previous
        </Button>
        <Form inline>
          <Form.Label className="mr-2">Page:</Form.Label>
          <Form.Control type="number" min="1" max={numPages} value={pageNumber} onChange={(e) => handlePageChange(parseInt(e.target.value))} />
          <Form.Label className="ml-2">of {numPages}</Form.Label>
        </Form>
        <Button variant="primary" className="ml-3" onClick={() => handlePageChange(pageNumber + 1)}>
          Next
        </Button>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className={`pdf-page mr-2 mb-2 ${selectedPages.includes(index + 1) ? "selected" : ""}`} onClick={() => togglePageSelection(index + 1)}>
              <Page pageNumber={index + 1} />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
