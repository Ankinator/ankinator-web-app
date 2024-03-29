import React, { useState, useRef, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { pdfjs } from 'react-pdf';
import Select from 'react-select';
import './UploadPdfForm.css';
import { getUserPdfs } from '../../../api/api'; // Importiere die Funktion getUserPdfs aus deiner api.js

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadPdfForm = ({ onPdfUpload, onPdfSelect }) => {
  const [selectedName, setSelectedName] = useState('');
  const fileInputRef = useRef(null);
  const [options, setOptions] = useState([]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      width: 200,
    }),
  };

  useEffect(() => {
    // Rufe die Funktion getUserPdfs auf, um die Options für die Select-Komponente zu erhalten
    const fetchUserPdfs = async () => {
      try {
        const pdfs = await getUserPdfs(); // Rufe die Funktion getUserPdfs aus deiner api.js auf
        const pdfOptions = pdfs.map((pdf) => ({ value: pdf.pdf_document_id, label: pdf.pdf_document_name }));
        setOptions(pdfOptions);
      } catch (error) {
        console.error('Error fetching user PDFs:', error);
      }
    };
    fetchUserPdfs();
  }, []);

  function handleButtonClick() {
    fileInputRef.current.click();
  }

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    setSelectedName(file.name);
    onPdfUpload(file);
  };

  const handlePdfSelect = (selectedOption) => {
    setSelectedName(selectedOption.label);
    onPdfSelect(selectedOption.value);
  };

  return (
    <Container fluid className="p-0" style={{ margin: 'auto', marginTop: '15px' }}>
      <Row className="file-upload">
        <Col style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePdfUpload} />
          <Button type="button" onClick={handleButtonClick}>
            Upload script
          </Button>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 80, marginTop: 5 }}>
          <h5> or </h5>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Form.Group controlId="formModel" style={{ width: 200}}>
            <Select
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handlePdfSelect}
              styles={customStyles}
              placeholder="Select PDF"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: 5, marginBottom: -5 }}>
          <p style={{ textAlign: 'center' }}>{selectedName || 'No file selected'}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPdfForm;
