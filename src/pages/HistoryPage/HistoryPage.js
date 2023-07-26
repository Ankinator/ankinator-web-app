import React, { useState, useEffect } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Falls Sie react-router-dom verwenden

import Header from '../../assets/components/Header';
import './HistoryPage.css';

const HistoryPage = () => {
  // Zustand zum Speichern der geladenen Daten
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulierte API-Funktion zum Abrufen der Daten
  const fetchData = () => {
    // Hier rufen Sie Ihre tatsächliche API-Funktion auf, um die Daten abzurufen
    // Setzen Sie die Daten und beenden Sie das Laden, wenn die Daten geladen sind
    // Hier verwenden wir eine setTimeout-Funktion, um das Laden zu simulieren
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          pdfDocument: 'Document 1',
          model: 'Model A',
          timestamp: '2023-07-18 12:00:00',
        },
        {
          id: 2,
          pdfDocument: 'Document 2',
          model: 'Model B',
          timestamp: '2023-07-18 14:30:00',
        },
        // Weitere Datensätze
      ];
      setData(mockData);
      setLoading(false);
    }, 2000);
  };

  // Laden der Daten beim ersten Rendern
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid style={{ maxWidth: '100%', padding: 0, height: '100%', color: 'white', alignContent: 'center' }}>
      <Header />
      {loading ? (
        // Anzeigen eines Ladeindikators, während die Daten geladen werden
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
                <td>{item.model}</td>
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
