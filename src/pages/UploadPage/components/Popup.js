import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { bgColors } from '../../../App';
import useNavToEv from '../../../hooks/useNavToEv';

const Popup = ({ show, handleClose, handleGenerateCards }) => {
  const [subject, setSubject] = useState('');
  const [domain, setDomain] = useState('');
  const { navToEvaluationPage } = useNavToEv();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleGenerateCards(subject, domain);
    handleClose();
    navToEvaluationPage();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{color: bgColors.Hint, textAlign: 'center'}}>Additional Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSubject">
            <Form.Label style={{color: bgColors.Hint}}>Subject of studies:</Form.Label>
            <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formDomain">
            <Form.Label style={{color: bgColors.Hint, marginTop: '10px'}}>Domain of the script:</Form.Label>
            <Form.Control type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: '15px'}}>
            Generate Cards
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Popup;