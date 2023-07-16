import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bgColors } from '../../App';
import { Container, Spinner } from 'react-bootstrap';
import Header from './components/Header';
import EvaluationComp from './components/EvaluationComp';
import { getResults, getResultPdf } from '../../api/api'; // Hier die richtige Import-Anweisung hinzufügen
import './EvaluationPage.css';

const EvaluationPage = () => {
    const location = useLocation();
    const { documentIds } = location.state;
    const [pdfFile, setPdfFile] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Funktion zum Laden der PDF-Datei
    const loadPdfFile = async () => {
        try {
            const loadedPdf = await getResultPdf(documentIds[0]); // Wir gehen davon aus, dass es nur eine PDF-Datei gibt, daher verwenden wir das erste Element im documentIds-Array.
            setPdfFile(loadedPdf);
        } catch (error) {
            console.error('Error loading PDF file:', error);
        }
    };

    // Funktion zum Laden der Ergebnisse der Modelle
    const loadResults = async () => {
        const promises = documentIds.map(async (documentId) => {
            const loadedResults = await getResults(documentId);
            return loadedResults;
        });
        const loadedResults = await Promise.all(promises);
        const allNotPending = loadedResults.every((result) => result.model_result !== "PENDING");
        if (allNotPending) {
            setResults(loadedResults);
            setLoading(false);
        } else {
            setTimeout(loadResults, 5000);
        }
    };

    useEffect(() => {
        // Laden sowohl der PDF-Datei als auch der Ergebnisse der Modelle beim ersten Rendern der Komponente
        loadPdfFile();
        loadResults();
    }, [documentIds]);

    return (
        <Container style={{maxWidth: "100%", padding: 0, height: "100%", color: "white"}}>
            {loading ? (
                <div className="overlay">
                    <p className="overlay-text" style={{marginTop: 15, marginRight: 10}}>Generating Questions, please wait</p>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <Header />
                    <EvaluationComp pdfFile={pdfFile} questions={results} />
                </>
            )}
        </Container>
    );
};

export default EvaluationPage;
