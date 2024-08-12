import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Drawer, AppBar, Toolbar, Typography, Box, CssBaseline, Button, Menu, MenuItem, IconButton, Divider } from '@mui/material';
import ChannelList from './ChannelList';
import CreateChannelModal from './CreateChannelModal';
import MainContent from './MainContent';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteChannelModal from './DeleteChannelModal';

const drawerWidth = 240;

const Dashboard = () => {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [channels, setChannels] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [toggleDeleteModal, setDeleteModal] = useState(false)
    const navigate = useNavigate();

    const fetchChannels = async () => {
        try {
            const response = await axios.get('https://ilct-platform.onrender.com/channels', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setChannels(response.data);
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/login', { replace: true })
        fetchChannels(); // Fetch channels on component mount
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCreateChannel = () => {
        fetchChannels(); // Refetch channels after creating a new one
    };

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel);
    };

    const handleLogout = () => {
        // Implement your logout logic here
        localStorage.removeItem('token');
        navigate('/login', { replace: true })
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {selectedChannel == null ? 'Dashboard' : selectedChannel.name}
                    </Typography>
                    <IconButton
                        onClick={handleClick}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { }}>Rename</MenuItem>
                        <MenuItem onClick={() => { }}>Members</MenuItem>
                        <Divider />
                        <MenuItem onClick={() => setDeleteModal(true)} color='text.error'>Delete</MenuItem>
                    </Menu>
                    {toggleDeleteModal && selectedChannel !== null && <DeleteChannelModal channelName={selectedChannel.name} onCancel={setDeleteModal} onDelete={() => { console.log("Delete") }} />}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <CreateChannelModal
                        open={openModal}
                        handleClose={handleCloseModal}
                        onChannelCreated={handleCreateChannel} // Pass the callback function
                    />
                    <ChannelList
                        channels={channels}
                        onChannelSelect={handleChannelSelect}
                        onCreateChannelClick={handleOpenModal}
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button sx={{ width: '100%' }} variant='outlined' color="error" onClick={handleLogout}>Logout</Button>
                </Box>
            </Drawer>
            <MainContent selectedChannel={selectedChannel} drawerWidth={drawerWidth} />
        </Box>
    );
};

export default Dashboard;
