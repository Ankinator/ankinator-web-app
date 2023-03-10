import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";

const UploadPdfForm = ({ onPdfSelect }) => {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfSelect = (event) => {
    const selectedFile = event.target.files[0];
    setPdfFile(selectedFile);
    onPdfSelect(selectedFile);
  };

  return (
    <div className="UploadPdfForm">
    <h2>Skript hochladen (PDF)</h2>
    <Form>
      <Form.Group controlId="formFile">
        <Form.Control type="file" accept="application/pdf" onChange={handlePdfSelect} />
      </Form.Group>
    </Form>
  </div>
  );
};

export default UploadPdfForm;
