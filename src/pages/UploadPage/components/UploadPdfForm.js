import React, { useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Form, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from 'react-pdf';
import './UploadPdfForm.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const UploadPdfForm = ({ onPdfSelect }) => {
  const [selectedName, setSelectedName] = useState("")
  const fileInputRef = useRef(null);

  function handleButtonClick () {
    fileInputRef.current.click();
  };

  const handlePdfSelect = (event) => {
    const file = event.target.files[0];
    //Update Text: No file selected -> filename
    setSelectedName(file.name);
    //Transfer pdf to PdfGallery.js
    onPdfSelect(file);
    
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
