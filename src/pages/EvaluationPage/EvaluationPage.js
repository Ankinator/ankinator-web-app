import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Header from '../../assets/components/Header';
import EvaluationComp from './components/EvaluationComp';
import { getResults, getResultPdf } from '../../api/api';
import './EvaluationPage.css';

const EvaluationPage = () => {
    const location = useLocation();
    const { resultIds, item } = location.state;
    const [pdfFile, setPdfFile] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {

        const loadPdf = async () => {
            try {
                const loadedPdf = await getResultPdf(resultIds[0]);
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
            const promises = resultIds.map(async (resultIds) => {
                const loadedResults = await getResults(resultIds);
                return loadedResults;
            });
            const loadedResults = await Promise.all(promises);
            const allNotPending = loadedResults.every((result) => result.model_result !== "PENDING" && result.model_result !== null);
            if (allNotPending) {
                loadedResults.resultId = resultIds[0];
                setResults(loadedResults);
            } else {
                await new Promise(resolve => setTimeout(resolve, 2500));
                await loadResults();
            }
        };

        await Promise.all([loadPdf(), loadResults()]);
        setLoading(false);
    };

    const getHistData = async () => {
        const loadedPdf = await getResultPdf(item.id);
        setPdfFile(loadedPdf);
        var loadedResults = [];
        loadedResults.resultId = item.id;
        loadedResults.push(item);
        setResults(loadedResults);
        setLoading(false);
    };

    useEffect(() => {
        if (item !== undefined) {
            getHistData();
        } else {
            loadData();
        }
        // eslint-disable-next-line
    }, [resultIds, item]);

    return (
        <Container style={{ maxWidth: "100%", padding: 0, height: "100%", color: "white" }}>
            {loading ? (
                <div className="overlay">
                    {item !== undefined ? (
                        <p className="overlay-text" style={{ marginTop: 15, marginRight: 10 }}>Loading Questions, please wait</p>
                    ) : (
                        <p className="overlay-text" style={{ marginTop: 15, marginRight: 10 }}>Generating Questions, please wait</p>
                    )}
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
