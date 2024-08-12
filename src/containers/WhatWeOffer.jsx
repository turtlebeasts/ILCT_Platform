import React from 'react';
import { Box, Container, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';

const WhatWeOffer = () => {
    const offers = [
        {
            title: 'Real-Time Coding Demonstrations',
            description: 'Teachers can write code live while students watch and learn.',
        },
        {
            title: 'Interactive Learning',
            description: 'Students can request to modify the code, ask questions, and get instant feedback.',
        },
        {
            title: 'Collaborative Environment',
            description: 'Foster a sense of community and teamwork as students and teachers collaborate on coding projects.',
        },
        {
            title: 'Comprehensive Learning Tools',
            description: 'Our platform includes various tools and features to enhance the learning experience, such as syntax highlighting, error detection, and version control.',
        },
    ];

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                color: 'text.primary',
                padding: '4rem 0',
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h3" component="h2" gutterBottom align="center">
                    What We Offer
                </Typography>
                <Grid container spacing={4}>
                    {offers.map((offer, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Box sx={{ padding: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                                <Typography variant="h6" component="h3" gutterBottom>
                                    {offer.title}
                                </Typography>
                                <Typography variant="body1">
                                    {offer.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default WhatWeOffer;
