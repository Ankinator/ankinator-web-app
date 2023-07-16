import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bgColors } from '../../App';
import { Container, Spinner } from 'react-bootstrap';
import Header from './components/Header';
import EvaluationComp from './components/EvaluationComp';
import { getResults } from '../../api/api';
import './EvaluationPage.css';


const EvaluationPage = () => {
    const location = useLocation();
    const { documentIds, pdfFile } = location.state;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        loadResults();
    }, []);

    return (
        <Container style={{ maxWidth: "100%", padding: 0, height: "100%", backgroundColor: bgColors.Hint }}>
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
