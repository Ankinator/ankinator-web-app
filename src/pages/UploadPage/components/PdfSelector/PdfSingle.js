import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { generateQuestions } from '../../../../api/api';
import Popup from '../Popup';
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

const PdfSingle = ({ pdfFile, extResults }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedPages, setSelectedPages] = useState({ selected: [] });
    const [position, setPosition] = useState(0);
    const pageRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const onDocumentLoadSuccess = ({ numPages }) => {
        resetStates();
        setNumPages(numPages);
    };

    const resetStates = () => {
        setNumPages(null);
        setPageNumber(1);
        setSelectedPages({ selected: [] });
        setPosition(0);
        setShowPopup(false);
    };

    /*useEffect(() => {
        enableSubmit();
    }, [selectedPages]);*/

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

    /*const enableSubmit = () => {
        const submitButton = document.getElementById('submitButton');
        if (submitButton && selectedPages) {
            submitButton.disabled = selectedPages.selected.length === 0;
        }
    };*/

    const handleGenerateCards = async (domain, models) => {
        const resultIds = [];
        if (models.length > 1) {
          await Promise.all(
            models.map(async (model) => {
              const id = await generateQuestions(extResults, selectedPages, domain, model.value);
              resultIds.push(id.result_id);
            })
          );
        } else {
          const id = await generateQuestions(extResults, selectedPages, domain, models[0].value);
          resultIds.push(id.result_id);
        }
      
        setShowPopup(false);
        navigate('/evaluation', { state: { resultIds } });
      };

    const isPageSelected = selectedPages.selected.includes(pageNumber);

return (
    <Container fluid className="p-0">
        <Row>
            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <Button id='submitButton' onClick={() => setShowPopup(true)} style={{ marginLeft: '10px', background: 'red', border: 'red' }}>Submit</Button>
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
