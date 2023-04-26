import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { postSelectedPages } from '../../../../api/api';
import Popup from '../Popup';
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

const PdfSingle = ({ pdfFile }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedPages, setSelectedPages] = useState({ selected: [] });
    const [position, setPosition] = useState(0);
    const pageRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => {
        setPosition(pageRef.current.scrollTop);
        setPageNumber((prevPageNumber) => {
            if (prevPageNumber - 1 <= 1) {
                return 1;
            } else {
                return prevPageNumber - 1;
            }
        });
    };

    const goToNextPage = () => {
        setPosition(pageRef.current.scrollTop);
        setPageNumber((prevPageNumber) => {
            if (prevPageNumber + 1 >= numPages) {
                return numPages;
            } else {
                return prevPageNumber + 1;
            }
        });
    };

    const handlePageSelect = () => {
        setSelectedPages(prevState => {
            const selected = [...prevState.selected];
            const index = selected.indexOf(pageNumber);
            if (index !== -1) {
                selected.splice(index, 1); // remove page from array
            } else {
                selected.push(pageNumber); // add page to array
            }
            return { ...prevState, selected };
        });
    };

    const handleSelectAllPages = () => {
        setSelectedPages((prevState) => {
            const allSelected = Array.from({ length: numPages }, (_, i) => i + 1);
            return {
                ...prevState,
                selected: allSelected,
            };
        });
    };

    const handleDeselectAllPages = () => {
        setSelectedPages((prevState) => {
            return {
                ...prevState,
                selected: [],
            };
        });
    };

    const handleGenerateCards = async (subject, domain) => {
        var formData = await postSelectedPages(pdfFile, selectedPages);
        setShowPopup(false);
        console.log(formData);
        navigate('/evaluation', {state: {formData: "test"}});
    };

    const isPageSelected = selectedPages.selected.includes(pageNumber);

    return (
        <Container fluid className="p-0">
            <Row>
                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <Button onClick={() => setShowPopup(true)} style={{ marginLeft: '10px', background: 'red', border: 'red' }}>Submit</Button>
                    <Popup show={showPopup} handleClose={() => setShowPopup(false)} handleGenerateCards={handleGenerateCards} />
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={goToPrevPage} style={{ marginRight: '10px' }}>Prev</Button>
                    <h6 style={{ margin: 0 }}>Page {pageNumber} of {numPages}</h6>
                    <Button onClick={goToNextPage} style={{ marginLeft: '10px' }}>Next</Button>
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <Form.Check
                        type="checkbox"
                        style={{ marginRight: '10px' }}
                        checked={isPageSelected}
                        onChange={handlePageSelect}
                        label={`Select page ${pageNumber}`}
                    />
                    <Button style={{ marginRight: '10px' }} onClick={handleSelectAllPages}>Select all</Button>
                    <Button style={{ marginRight: '10px' }} onClick={handleDeselectAllPages}>Deselect all</Button>
                </Col>
            </Row>
            <Row ref={pageRef} style={{ height: '80vh', overflow: 'hidden', marginTop: '10px' }}>
                <Col style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} renderTextLayer={false} onLoadSuccess={() => {
                            pageRef.current.scrollTo({ top: position });
                        }}
                        />
                    </Document>
                </Col>
            </Row>
        </Container>
    );
};

export default PdfSingle;
