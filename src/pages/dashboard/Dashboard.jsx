import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Drawer, AppBar, Toolbar, Typography, Box, CssBaseline, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChannelList from './ChannelList';
import CreateChannelModal from './CreateChannelModal';
import MainContent from './MainContent';
import TopMenu from './TopMenu';

const drawerWidth = 240;
const socket = io(import.meta.env.VITE_API_URL_GLOBAL);

const Dashboard = () => {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [channels, setChannels] = useState([]);
    const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const navigate = useNavigate();

    const fetchChannels = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL_GLOBAL}/channels`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setChannels(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login', { replace: true });
        fetchChannels();
    }, []);

    useEffect(() => {
        const updateChannels = () => fetchChannels();
        const updateSelectedChannel = async (data) => {
            await fetchChannels();
            if (selectedChannel?.id == data.id) setSelectedChannel((prev) => ({ ...prev, name: data.channel_name }));
        };

        socket.on('channel_delete', () => {
            fetchChannels();
            setSelectedChannel(null);
        });
        socket.on('channel_created', updateChannels);
        socket.on('channel_rename', updateSelectedChannel);

        return () => {
            socket.off('channel_delete');
            socket.off('channel_created');
            socket.off('channel_rename');
        };
    }, [selectedChannel]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`, ml: isMobile ? 0 : `${drawerWidth}px` }}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap>
                        {selectedChannel?.name || 'Dashboard'}
                    </Typography>
                    {selectedChannel && <TopMenu selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />}
                </Toolbar>
            </AppBar>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <CreateChannelModal
                        open={createChannelModalOpen}
                        handleClose={() => setCreateChannelModalOpen(false)}
                        onChannelCreated={fetchChannels}
                    />
                    <ChannelList
                        channels={channels}
                        onChannelSelect={setSelectedChannel}
                        drawerClose={handleDrawerToggle}
                        onCreateChannelClick={() => setCreateChannelModalOpen(true)}
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button fullWidth variant="outlined" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Drawer>
            <MainContent selectedChannel={selectedChannel} drawerWidth={drawerWidth} />
        </Box>
    );
};

export default Dashboard;
