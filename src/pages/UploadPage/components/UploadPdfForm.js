import React, { useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Form, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from 'react-pdf';
import Select from 'react-select';
import './UploadPdfForm.css';
import { bgColors } from '../../../App';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const UploadPdfForm = ({ onPdfSelect }) => {
  const [selectedName, setSelectedName] = useState("")
  const fileInputRef = useRef(null);

  const options = [
    { value: 'DEMO', label: 'DEMO' },
    { value: 'CHAT_GPT', label: 'CHAT_GPT' },
    { value: 'T5', label: 'T5' }
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      width: 135,
    }),
  };

  function handleButtonClick () {
    fileInputRef.current.click();
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setSelectedName(file.name);
    onPdfSelect(file);
  };

  const handlePdfSelect = (event) => {
    const file = event.target.files[0];
    setSelectedName(file.name);
    onPdfSelect(file);
  };

  return (
    <Container fluid className="p-0" style={{margin: 'auto', marginTop: '10px'}}>
      <Row className="file-upload">
        <Col style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePdfUpload} />
          <Button type="button" onClick={handleButtonClick}>Upload script</Button>
        </Col>
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 80, marginTop: 5}}>
          <h5> or </h5>
        </Col>
        <Col style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
        <Form.Group controlId="formModel">
            <Select
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handlePdfSelect}
              styles={customStyles}
              placeholder="Select a pdf"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col style={{marginTop: 5, marginBottom: -5}}>
          <p style={{ textAlign: "center" }}>{selectedName || "No file selected"}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPdfForm;
