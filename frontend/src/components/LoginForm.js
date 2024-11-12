// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(false); // Toggle between login and register

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const url = isRegister
            ? 'http://localhost:8000/api/user/register/' // Register endpoint
            : 'http://localhost:8000/api/user/login/';   // Login endpoint

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (data.success) {
                if (!isRegister) onLogin(); // Only trigger login action for login, not register
                setUsername('');
                setPassword('');
            } else {
                setError(data.error || (isRegister ? 'Registration failed' : 'Login failed'));
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    const toggleForm = () => {
        setIsRegister(!isRegister);
        setError('');
        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <h3>{isRegister ? 'Register' : 'Login'}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="mb-3">
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-2">
                {isRegister ? 'Register' : 'Login'}
            </button>
            <button type="button" onClick={toggleForm} className="btn btn-link w-100">
                {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
        </form>
    );
};

export default LoginForm;
