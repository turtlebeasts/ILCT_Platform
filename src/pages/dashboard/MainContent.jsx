// src/containers/MainContent.jsx

import React from 'react';
import { Typography, Toolbar, Box, Grid } from '@mui/material';
import ChatBox from './ChatBox';

const MainContent = ({ selectedChannel, drawerWidth }) => {
    const isChannelSelected = selectedChannel !== null;

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: `${drawerWidth}px`, height: '90vh' }}
        >
            <Toolbar />
            <Grid container spacing={2} sx={{ height: 'calc(90vh - 64px)' }}>
                <Grid item xs={isChannelSelected ? 8 : 12} sx={{ overflowY: 'auto' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {selectedChannel == null ? "No channel selected" : selectedChannel.name + ` (channel id: ${selectedChannel.id})`}
                    </Typography>
                    {/* Add your main content here */}
                </Grid>
                {isChannelSelected && (
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <ChatBox channelName={selectedChannel.name} channelId={selectedChannel.id} />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default MainContent;
