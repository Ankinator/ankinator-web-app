import React, { useState } from 'react';
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import PdfGallery from './PdfGallery';
import PdfSingle from './PdfSingle';

const PdfSelector = ({ pdfFile }) => {
  const [selectedOption, setSelectedOption] = useState('gallery'); // Set the default selected option
  const handleSelect = (eventKey) => setSelectedOption(eventKey);

  return (
    <div>
      {pdfFile ? (
        <Container fluid className="p-0">
          <Row>
            <Col></Col>
            <Col style={{ textAlign: 'center' }}><h4>Select pages for slide generation</h4></Col>
            <Col>
              <Row>
                <Col style={{ textAlign: 'end' }}><Button>Select all pages</Button></Col>
                <Col>
                  <DropdownButton id="dropdown-basic-button" title={selectedOption === 'gallery' ? 'Gallery View' : 'Single View'} onSelect={handleSelect}>
                    <Dropdown.Item eventKey="gallery">Gallery View</Dropdown.Item>
                    <Dropdown.Item eventKey="single">Single View</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            {selectedOption === 'gallery' ? (
              <Col>
                Gallery
              </Col>
            ) : (
              <Col>
                <PdfSingle pdfFile={pdfFile}/>
              </Col>
            )}
          </Row>
        </Container>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default PdfSelector;
