import React from 'react';
import { Container} from 'react-bootstrap';
import PdfSingle from './PdfSingle';

const PdfSelector = ({ pdfFile, extResults }) => {
  //const [selectedOption, setSelectedOption] = useState('gallery'); // Set the default selected option
  //const handleSelect = (eventKey) => setSelectedOption(eventKey);

  return (
    <Container fluid className="p-0">
      {pdfFile ? (
        <PdfSingle pdfFile={pdfFile} extResults={extResults}/>
      ) : (
        <h3 style={{justifyContent: 'center', textAlign: 'center'}}>Welcome to Ankinator, a smart generator for anki flash card questions. Please upload your script and press submit. You can optionally select the pages for which you want to generate questions.</h3>
      )}
    </Container>

    // <div>
    //   {pdfFile ? (
    //     <Container fluid className="p-0">
    //       <Row>
    //         <Col></Col>
    //         <Col style={{ textAlign: 'center' }}><h4>Select pages for slide generation</h4></Col>
    //         <Col>
    //           <Row>
    //             <Col style={{ textAlign: 'end' }}><Button>Select all pages</Button></Col>
    //             <Col>
    //               <DropdownButton id="dropdown-basic-button" title={selectedOption === 'gallery' ? 'Gallery View' : 'Single View'} onSelect={handleSelect}>
    //                 <Dropdown.Item eventKey="gallery">Gallery View</Dropdown.Item>
    //                 <Dropdown.Item eventKey="single">Single View</Dropdown.Item>
    //               </DropdownButton>
    //             </Col>
    //           </Row>
    //         </Col>
    //       </Row>
    //       <Row>
    //         {selectedOption === 'gallery' ? (
    //           <Col>
    //             Gallery
    //           </Col>
    //         ) : (
    //           <Col>
    //             <PdfSingle pdfFile={pdfFile}/>
    //           </Col>
    //         )}
    //       </Row>
    //     </Container>
    //   ) : (
    //     <p></p>
    //   )}
    // </div>
  );
};

export default PdfSelector;
