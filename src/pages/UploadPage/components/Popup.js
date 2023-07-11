import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { bgColors } from '../../../App';
import Select from 'react-select';
import './Popup.css';

const Popup = ({ show, handleClose, handleGenerateCards }) => {
  const [domain, setDomain] = useState('');
  const [model, setModel] = useState([]);

  const options = [
    { value: 'Model 1', label: 'Model 1' },
    { value: 'Model 2', label: 'Model 2' },
    { value: 'Model 3', label: 'Model 3' }
  ];

  useEffect(() => {
    controlButton();
  }, [domain, model]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
    }),
  };

  const changeDomain = (event) => {
    setDomain(event.target.value);
  };

  const changeModel = (selectedOptions) => {
    setModel(selectedOptions);
  };

  const controlButton = () => {
    const submitButton = document.getElementById('submitButtonPopup');
    if (submitButton) {
      submitButton.disabled = !(domain && model.length > 0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleGenerateCards(domain, model);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: bgColors.Hint, textAlign: 'center' }}>Additional Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDomain">
            <Form.Label style={{ color: bgColors.Hint, marginTop: '10px' }}>Domain of the script:</Form.Label>
            <Form.Control type="text" value={domain} onChange={changeDomain}/>
          </Form.Group>
          <Form.Group controlId="formModel">
            <Form.Label style={{ color: bgColors.Hint, marginTop: '10px' }}>Select the model(s) you want to use:</Form.Label>
            <Select
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={changeModel}
              styles={customStyles}
            />
          </Form.Group>
          <Button id="submitButtonPopup" variant="primary" type="submit" disabled={!domain || model.length === 0} style={{ marginTop: '15px' }}>
            Generate Cards
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Popup;
