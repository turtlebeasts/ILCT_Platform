import React, { useState, useEffect } from 'react';
import { Drawer, AppBar, Toolbar, Typography, Box, CssBaseline, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ChannelList from './components/channelList/ChannelList';
import CreateChannelModal from './components/createChannelModal/CreateChannelModal';
import MainContent from './components/mainContent/MainContent';
import TopMenu from './components/topMenu/TopMenu';
import { fetchChannels } from '../../api/channelService';
import socket from '../../utils/socket';

const drawerWidth = 240;

const Dashboard = () => {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [channels, setChannels] = useState([]);
    const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login', { replace: true });
        const getChannels = async () => setChannels(await fetchChannels())
        getChannels()
    }, []);

    useEffect(() => {
        const updateChannels = async () => setChannels(await fetchChannels());
        const updateSelectedChannel = async (data) => {
            setChannels(await fetchChannels())
            if (selectedChannel?.id == data.id) setSelectedChannel((prev) => ({ ...prev, name: data.channel_name }));
        };

        socket.on('channel_delete', async () => {
            setChannels(await fetchChannels())
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
                            onClick={() => setMobileOpen(!mobileOpen)}
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
                onClose={() => setMobileOpen(!mobileOpen)}
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
                        setChannels={setChannels}
                    />
                    <ChannelList
                        channels={channels}
                        onChannelSelect={setSelectedChannel}
                        drawerClose={() => setMobileOpen(!mobileOpen)}
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
