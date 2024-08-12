import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            if (response.data.token) {
                console.log(response.data)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('user_email', response.data.user.email);
                navigate('/dashboard'); // Redirect to dashboard after login
            } else {
                setMessage('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            setMessage('Invalid email or password');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="new-email"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
                {message && <Typography variant="body1" color="error">{message}</Typography>}
            </Box>
        </Container>
    );
};

export default Login;
