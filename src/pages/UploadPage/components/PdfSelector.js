import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfSelector = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <div>
      {pdfFile ? (
        <div>
          <Document file={pdfFile} onLoadSuccess={handleDocumentLoadSuccess}>
            <Page renderTextLayer={true} pageNumber={pageNumber} />
          </Document>
          <p>
            Seite {pageNumber} of {numPages}
          </p>
          <button disabled={pageNumber <= 1} onClick={() => handlePageChange(pageNumber - 1)}>
            Vorherige
          </button>
          <button disabled={pageNumber >= numPages} onClick={() => handlePageChange(pageNumber + 1)}>
            Nächste
          </button>
        </div>
      ) : (
        <p>Keine PDF Datei hochgeladen</p>
      )}
    </div>
  );
};

export default PdfSelector;
