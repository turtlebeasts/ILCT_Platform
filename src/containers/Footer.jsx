import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                padding: '2rem 0',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Company
                        </Typography>
                        <Typography variant="body2" component="p">
                            Your company description or slogan.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Links
                        </Typography>
                        <Link href="#" color="inherit" variant="body2">
                            Home
                        </Link>
                        <br />
                        <Link href="#" color="inherit" variant="body2">
                            About
                        </Link>
                        <br />
                        <Link href="#" color="inherit" variant="body2">
                            Services
                        </Link>
                        <br />
                        <Link href="#" color="inherit" variant="body2">
                            Contact
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" component="p">
                            Email: info@yourcompany.com
                        </Typography>
                        <Typography variant="body2" component="p">
                            Phone: (123) 456-7890
                        </Typography>
                    </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
