import React, { useState } from 'react';
import axios from 'axios';


const LogForm = () => {
    const [hours, setHours] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setMessage('');
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        try {
            await axios.post('http://localhost:8000/api/log/create/', {
                date: formattedDate,
                hours: hours,
                description: description,
            });
            
            setMessage('Log entry added successfully!');
            setHours('');
            setDescription('');
        } catch (error) {
            console.error("There was an error creating the log entry:", error);
            setMessage('Failed to add log entry.');
        }
    };

    return (
        <div>
            <h2>Add Log Entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Hours Worked:</label>
                    <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        step="0.1"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Log Entry</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LogForm;
