import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Alert } from "react-bootstrap";

const WorkForm = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Set default date to today
    const [hours, setHours] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post('http://localhost:8000/api/log/create/', {
                date: date,
                hours: hours,
                description: description,
            });
            
            setHours('');
            setDescription('');
            setDate(new Date().toISOString().split('T')[0]); // Reset date to today
        } catch (error) {
            console.error("There was an error creating the log entry:", error);
        }
    };

    return (
        <Card className="p-4 mb-4">
            <h3 className="mb-3 text-center">Add Log Entry</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formDate" className="mb-2">
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formHours" className="mb-2">
                    <Form.Control
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        step="0.1"
                        min="0"
                        required
                        placeholder="Enter hours worked"
                    />
                </Form.Group>
                
                <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Control
                        as="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        required
                        placeholder="Enter a description of your work"
                    />
                </Form.Group>
                
                <div className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" type="submit" className="me-2">
                        Add Log Entry
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default WorkForm;
