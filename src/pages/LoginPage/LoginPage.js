import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { loginWithCred, login } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import Cookie from 'universal-cookie';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  var cookie = new Cookie();

  useEffect(() => {
    // Überprüfen, ob ein access_token im Cookie vorhanden ist
    if (cookie.get('access_token') !== undefined) {
      // Führen Sie die automatische Anmeldung aus, wenn ein Token vorhanden ist
      login();
      navigate('/upload');
    }
  }, []);

  const handleLogin = async () => {
    try {
        const response = await loginWithCred(username, password);
        if (response) {
            navigate('/upload');
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
  };

  return (
    <Container fluid className="login-page" style={{ width: '1200px'}}> 
      <Row className="justify-content-center align-items-center h-100">
        <Col md={4}>
          <div className="login-box">
            <h2>Login</h2>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" style={{ marginTop: '10px'}}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" style={{ marginTop: '10px'}} onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
