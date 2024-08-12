import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const HowItWorks = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                padding: '4rem 0',
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h3" component="h2" gutterBottom align="center">
                    How It Works
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ padding: '2rem', textAlign: 'center' }}>
                            <Typography variant="h6" component="h3" gutterBottom>
                                Step 1
                            </Typography>
                            <Typography variant="body1">
                                Register to TLCT Platform
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ padding: '2rem', textAlign: 'center' }}>
                            <Typography variant="h6" component="h3" gutterBottom>
                                Step 2
                            </Typography>
                            <Typography variant="body1">
                                Create a channel or join one
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ padding: '2rem', textAlign: 'center' }}>
                            <Typography variant="h6" component="h3" gutterBottom>
                                Step 3
                            </Typography>
                            <Typography variant="body1">
                                Start writing codes or view a host
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HowItWorks;
