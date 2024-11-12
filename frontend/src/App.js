// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import Bootstrap Icons
import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import WorkForm from './components/WorkForm';
import ListLog from './components/ListLog';
import HoursBarChart from './components/HoursBarChart';
import LoginForm from './components/LoginForm';

function App() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchLogs = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/log/');
                    setLogs(response.data);
                    setLoading(false);

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
        }
    }, [isAuthenticated]);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setSidebarOpen(false);
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div
                className={`d-flex flex-column p-3 bg-light position-fixed vh-100 ${sidebarOpen ? 'col-2' : 'col-1'}`}
                style={{ transition: 'width 0.3s ease' }}
            >
                <div className="text-center" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
                    {/* Toggle icon: arrow-right when closed, arrow-left when open */}
                    <i className={`bi ${sidebarOpen ? 'bi-arrow-left' : 'bi-arrow-right'}`} style={{ fontSize: '1.5rem' }}></i>
                </div>
                {sidebarOpen && (
                    <div className="mt-3">
                        {!isAuthenticated ? (
                            <LoginForm onLogin={handleLogin} />
                        ) : (
                            <p className="text-center">Welcome! You are logged in.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Main Content with Centered Container */}
            <div className={`flex-grow-1 ms-auto ${sidebarOpen ? 'col-9' : 'col-11'}`} style={{ transition: 'margin-left 0.3s ease' }}>
                <div className="container my-4">
                    <h1 className="text-center mb-4">Work Hours Tracker</h1>

                    {isAuthenticated ? (
                        loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <>
                                <Row className="mb-4">
                                    <Col md={9} className="mb-4 mb-md-0">
                                        <HoursBarChart logs={logs} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                                    </Col>
                                    <Col md={3}>
                                        <WorkForm />
                                    </Col>
                                </Row>
                                <hr />
                                <ListLog logs={logs} selectedMonth={selectedMonth} />
                                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                            </>
                        )
                    ) : (
                        <p className="text-center">Please log in to view the dashboard.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
