import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form, Button } from "react-bootstrap";
import './UploadPdfForm.css';

const UploadPdfForm = ({ onPdfSelect }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedName, setSelectedName] = useState("")

  const handlePdfSelect = (event) => {
    const selectedFile = event.target.files[0];
    setPdfFile(selectedFile);
    onPdfSelect(selectedFile);
    setSelectedName(selectedFile.name);
  };

  return (
    <div className="app">
      <div className="file-upload">
        <h3>Upload script</h3>
        <input type="file" onChange={handlePdfSelect} />
      </div>
      <p style={{marginTop: -20, textAlign: "center"}}>{selectedName ||"No file selected"}</p>
    </div>
  );
};

export default UploadPdfForm;
