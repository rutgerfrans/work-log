import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const ListLog = () => {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const [expandedLogId, setExpandedLogId] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/log/');
                setLogs(response.data);
            } catch (error) {
                console.error("Error fetching logs:", error);
                setError('Failed to fetch log entries.');
            }
        };

        fetchLogs();
    }, []);

    const truncateDescription = (description, maxLength = 50) => {
        return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
    };

    const toggleExpand = (logId) => {
        setExpandedLogId(expandedLogId === logId ? null : logId);
    };

    return (
        <div>
            <h2>Log Entries</h2>
            {error && <p className="text-danger">{error}</p>}
            {logs.map((log) => (
                <Card
                    key={log.id}
                    className="mb-3 shadow-sm border-0"
                    style={{ borderRadius: '10px', cursor: 'pointer' }}
                >
                    <Card.Body onClick={() => toggleExpand(log.id)}>
                        <div className="d-flex align-items-center">
                            <div className="col-3 text-muted">
                                {new Date(log.date).toLocaleDateString()}
                            </div>
                            <div className={`col-7 ${expandedLogId === log.id ? "" : "text-truncate"}`}>
                                <strong>{truncateDescription(log.description, 50)}</strong>
                            </div>
                            <div className="col-1 text-right">
                                {log.hours} hours
                            </div>
                            <div className="col-1 text-right">
                                <Button
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents card toggle on button click
                                        toggleExpand(log.id);
                                    }}
                                >
                                    {expandedLogId === log.id ? <BsChevronUp /> : <BsChevronDown />}
                                </Button>
                            </div>
                        </div>

                        {expandedLogId === log.id && (
                            <div className="mt-3">
                                <p><strong>Full Description:</strong> {log.description}</p>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ListLog;
