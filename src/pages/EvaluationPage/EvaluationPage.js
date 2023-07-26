import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bgColors } from '../../App';
import { Container, Spinner } from 'react-bootstrap';
import Header from './components/Header';
import EvaluationComp from './components/EvaluationComp';
import { getResults, getResultPdf } from '../../api/api';
import './EvaluationPage.css';

const EvaluationPage = () => {
    const location = useLocation();
    const { documentIds } = location.state;
    const [pdfFile, setPdfFile] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {

        const loadPdf = async () => {
            try {
                const loadedPdf = await getResultPdf(documentIds[0]);
                if (loadedPdf.model_result === "PENDING") {
                    await new Promise((resolve) => setTimeout(resolve, 2500));
                    await loadPdf();
                } else {
                    setPdfFile(loadedPdf);
                }
            } catch (error) {
                console.error('Error loading PDF file:', error);
            }
        };

        const loadResults = async () => {
            const promises = documentIds.map(async (documentId) => {
                const loadedResults = await getResults(documentId);
                return loadedResults;
            });
            const loadedResults = await Promise.all(promises);
            const allNotPending = loadedResults.every((result) => result.model_result !== "PENDING");
            if (allNotPending) {
                setResults(loadedResults);
            } else {
                await new Promise(resolve => setTimeout(resolve, 2500));
                await loadResults();
            }
        };

        await Promise.all([loadPdf(), loadResults()]);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [documentIds]);

    return (
        <Container style={{ maxWidth: "100%", padding: 0, height: "100%", color: "white" }}>
            {loading ? (
                <div className="overlay">
                    <p className="overlay-text" style={{ marginTop: 15, marginRight: 10 }}>Generating Questions, please wait</p>
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
