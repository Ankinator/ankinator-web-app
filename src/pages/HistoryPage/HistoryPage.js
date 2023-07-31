import React, { useState, useEffect } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Falls Sie react-router-dom verwenden

import Header from '../../assets/components/Header';
import './HistoryPage.css';
import { getUser } from '../../api/api';

const HistoryPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulierte API-Funktion zum Abrufen der Daten
  const fetchData = async () => {
    const userData = await getUser();
    const transformedData = Object.entries(userData.model_results).map(([id, item]) => ({ id, ...item }));
    setData(transformedData);
    setLoading(false);
  };

  // Laden der Daten beim ersten Rendern
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid style={{ maxWidth: '100%', padding: 0, height: '100%', color: 'white', alignContent: 'center' }}>
      <Header />
      {loading ? (
        <div className="overlay">
          <p className="overlay-text" style={{ marginTop: 15, marginRight: 10 }}>Loading data, please wait</p>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        // Anzeigen der Tabelle, wenn die Daten geladen sind
        <Table bordered responsive style={{ width: '95%', marginLeft: '2.5%', marginTop: '2.5%', color: 'white' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>PDF Document</th>
              <th>Model</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="custom">
                <td>{item.id}</td>
                <td>
                  {/* Hier können Sie auf den Tabelleneintrag klicken und zur Evaluation-Seite navigieren */}
                  <Link to={`/evaluation/${item.id}`}>{item.pdfDocument}</Link>
                </td>
                <td>{item.model_name}</td>
                <td>{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default HistoryPage;
