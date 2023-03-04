import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { uploadPdf } from "../api/api";

const UploadPdfForm = ({ setPdfData }) => {
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await uploadPdf(file);
      setPdfData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="UploadPdfForm">
      <h2>PDF Upload</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile">
          <Form.Label>Choose a PDF file to upload:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button type="submit">Upload</Button>
      </Form>
    </div>
  );
};

export default UploadPdfForm;
