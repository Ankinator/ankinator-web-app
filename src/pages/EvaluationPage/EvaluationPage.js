import React, { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { bgColors } from '../../App';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import EvaluationComp from './components/EvaluationComp';


const EvaluationPage = () => {
    const location = useLocation();
    const { documentId, pdfFile } = location.state;

    return (
        <Container style={{ maxWidth: "100%", padding: 0, height: "100%", backgroundColor: bgColors.Hint }}>
            <Header/>
            <EvaluationComp documentId={documentId} pdfFile={pdfFile}/>
        </Container>
    );
};

export default EvaluationPage;
