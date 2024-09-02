import React from 'react';
import { Box, Typography } from '@mui/material';

const Jamboard = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1">
                Jamboard
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                This is the Jamboard where you can collaborate with your team in real-time.
            </Typography>
        </Box>
    );
};

export default Jamboard;
