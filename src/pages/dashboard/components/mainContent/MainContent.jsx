import React, { useEffect, useState } from 'react';
import { Typography, Toolbar, Box, Grid, IconButton, SwipeableDrawer } from '@mui/material';
import ChatBox from '../chatbox/ChatBox';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import GetStarted from '../getStarted/GetStarted';
import ChannelOptions from './channelOptions/channelOptions';
import { useChannelOptions } from '../context/context';

const MainContent = ({ selectedChannel }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { resetOptions } = useChannelOptions();
    const [chatOpen, setChatOpen] = useState(false);

    const toggleChatBox = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setChatOpen(open);
    };

    const isChannelSelected = selectedChannel !== null;

    useEffect(() => {
        resetOptions();
    }, [selectedChannel]);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.blur',
                backdropFilter: 'blur(5px)',
                p: 3,
                height: '100vh',
            }}
        >
            <Toolbar />
            <Grid container spacing={2} sx={{ height: 'calc(90vh - 64px)' }}>
                <Grid item xs={12} md={isChannelSelected && !isMobile ? 8 : 12} sx={{ overflowY: 'auto' }}>
                    <Typography variant="h6" component="h6" gutterBottom>
                        {selectedChannel == null ? <GetStarted /> : `${selectedChannel.name}`}
                    </Typography>
                    {isChannelSelected && <ChannelOptions />}
                </Grid>
                {!isMobile && isChannelSelected && (
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <ChatBox channelName={selectedChannel.name} channelId={selectedChannel.id} />
                    </Grid>
                )}
            </Grid>
            {isChannelSelected && isMobile && (
                <>
                    <IconButton
                        onClick={toggleChatBox(true)}
                        sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
                    >
                        <ChatIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor="right"
                        open={chatOpen}
                        onClose={toggleChatBox(false)}
                        onOpen={toggleChatBox(true)}
                        sx={{ '& .MuiDrawer-paper': { width: '80%' } }}
                    >
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <ChatBox channelName={selectedChannel.name} channelId={selectedChannel.id} />
                        </Box>
                    </SwipeableDrawer>
                </>
            )}
        </Box>
    );
};

export default MainContent;
