import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SampleLogin from '../components/SampleLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/auth/login`, {
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('user_email', response.data.user.email);

                navigate('/dashboard');
            } else {
                setMessage('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card sx={{ backgroundColor: 'background.blur', backdropFilter: 'blur(10px)' }}>
                <CardContent>
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
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
                                {loading ? <CircularProgress size={25} /> : "login"}
                            </Button>
                            <SampleLogin setEmail={setEmail} setPassword={setPassword} />
                        </form>
                        {message && <Typography variant="body1" color="error">{message}</Typography>}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
