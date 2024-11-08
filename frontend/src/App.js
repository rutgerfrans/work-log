import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import WorkForm from './components/WorkForm';
import ListLog from './components/ListLog';
import HoursBarChart from './components/HoursBarChart';

function App() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(''); // State to manage selected month

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/log/');
        setLogs(response.data);
        setLoading(false);

        // Set default selected month to the month of the first log if available
        if (response.data.length > 0) {
          const firstLogDate = new Date(response.data[0].date);
          setSelectedMonth(`${firstLogDate.getFullYear()}-${String(firstLogDate.getMonth() + 1).padStart(2, '0')}`);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError('Failed to fetch log entries.');
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Work Hours Tracker</h1>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={9} className="mb-4 mb-md-0">
              {/* Pass selectedMonth and setSelectedMonth to HoursBarChart */}
              <HoursBarChart logs={logs} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            </Col>
            <Col md={3}>
              <WorkForm />
            </Col>
          </Row>

          <hr />
          {/* Pass selectedMonth to ListLog */}
          <ListLog logs={logs} selectedMonth={selectedMonth} />
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </>
      )}
    </div>
  );
}

export default App;
