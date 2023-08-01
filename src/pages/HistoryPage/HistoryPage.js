import React, { useState, useEffect } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // useHistory für Navigation verwenden

import Header from '../../assets/components/Header';
import './HistoryPage.css';
import { getUser } from '../../api/api';

const HistoryPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    const userData = await getUser();
    const transformedData = Object.entries(userData.model_results).map(([id, item]) => ({ id, ...item }));
    setData(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (item) => {
    navigate('/evaluation', { state: { item } });  
  };

  return (
    <Container fluid style={{ maxWidth: '100%', padding: 0, height: '100%', color: 'white', alignContent: 'center' }}>
      <Header />
      {loading ? (
        <div className="overlay">
          <p className="overlay-text" style={{ marginTop: 15, marginRight: 10 }}>Loading data, please wait</p>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table bordered responsive style={{ width: '95%', marginLeft: '2.5%', marginTop: '2.5%', color: 'white' }}>
          <thead>
            <tr>
              <th>PDF Document</th>
              <th>Model</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              // Füge den onClick-Handler zur Tabellenzeile hinzu
              <tr key={item.id} className="custom" onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>
                <td>{item.pdf_document_name}</td>
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
