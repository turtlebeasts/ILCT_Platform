// src/components/Features.js

import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Features = () => {
    const features = [
        {
            title: 'Easy control',
            description: 'Easy and known controls for better understanding of the environment.',
        },
        {
            title: 'Free for all',
            description: 'TLCT is free for all and open source, made for computer science students',
        },
        {
            title: 'Device compatibility',
            description: 'Compatible with almost all browsers in various devices',
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
                    Features
                </Typography>
                <List>
                    {features.map((feature, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body1" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {index < features.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Container>
        </Box>
    );
};

export default Features;
