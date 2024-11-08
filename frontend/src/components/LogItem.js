import React, { useState } from 'react';
import { Button, Card } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const LogItem = ({ log }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    const truncateDescription = (description, maxLength = 50) => {
        return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
    };

    return (
        <Card
            className="mb-3 shadow-sm border-0"
            style={{ borderRadius: '10px', cursor: 'pointer' }}
        >
            <Card.Body>
                <div className="d-flex align-items-center">
                    <div className="col-3 text-muted">
                        {new Date(log.date).toLocaleDateString()}
                    </div>
                    <div className={`col-7 ${isExpanded ? "" : "text-truncate"}`}>
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
                                handleToggle();
                            }}
                        >
                            {isExpanded ? <BsChevronUp /> : <BsChevronDown />}
                        </Button>
                    </div>
                </div>

                {isExpanded && (
                    <div className="mt-3">
                        <p><strong>Full Description:</strong> {log.description}</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default LogItem;
