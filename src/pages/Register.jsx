import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordStrength from '../components/PasswordStrength';
import PasswordConfirmation from '../components/PasswordConfirmation';
import { check_email, register_user } from '../api/authService';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [check_email_message, setEmailMessage] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const response = await register_user(firstName, lastName, email, password)

        if (response.status == 201) {
            navigate('/login')
        } else {
            setMessage(response.data)
        }
    };

    const handleEmailCheck = async (e) => {
        e.preventDefault();

        email !== '' && setEmailMessage(await check_email(email))
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card sx={{ backgroundColor: 'background.blur', backdropFilter: 'blur(10px)' }}>
                <CardContent>
                    <Box sx={{ mt: 5 }}>
                        <Typography variant="h4" gutterBottom>
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="First Name"
                                fullWidth
                                margin="normal"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <TextField
                                label="Last Name"
                                fullWidth
                                margin="normal"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={handleEmailCheck}
                                required
                                autoComplete='new-email'
                                error={check_email_message !== null && check_email_message.status !== 200}
                                helperText={check_email_message !== null && check_email_message.status !== 200 && check_email_message.data}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete='new-password'
                            />
                            {password !== '' && "Password Strength "}
                            <PasswordStrength password={password} />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <PasswordConfirmation password={password} confirmPassword={confirmPassword} />
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                Register
                            </Button>
                        </form>
                        {message && <Typography variant="body1" color="error">{message}</Typography>}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Register;
