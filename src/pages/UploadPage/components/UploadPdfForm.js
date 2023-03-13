import React, { useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Form, Button } from "react-bootstrap";
import './UploadPdfForm.css';

const UploadPdfForm = ({ onPdfSelect }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedName, setSelectedName] = useState("")
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePdfSelect = (event) => {
    const selectedFile = event.target.files[0];
    setPdfFile(selectedFile);
    onPdfSelect(selectedFile);
    setSelectedName(selectedFile.name);
  };

  return (
    <Container className="app" style={{margin: 'auto', marginTop: '10px'}}>
      <Row className="file-upload">
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePdfSelect} />
          <Button type="button" onClick={handleButtonClick}>Upload script</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ textAlign: "center" }}>{selectedName || "No file selected"}</p>
        </Col>
      </Row>
    </Container>

  );
};

export default UploadPdfForm;
