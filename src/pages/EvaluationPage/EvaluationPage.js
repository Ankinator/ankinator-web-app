import React, { useState } from 'react';
import { bgColors } from '../../App';
import { Container } from 'react-bootstrap';
import Header from './components/Header';

const EvaluationPage = () => {

  return (
    <Container style={{maxWidth: "100%", padding: 0, height: "100%", backgroundColor: bgColors.Hint}}>
        <Header></Header>
    </Container>
  );
};

export default EvaluationPage;
