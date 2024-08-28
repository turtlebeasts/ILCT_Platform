import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { fetchChannels } from '../../../../api/channelService';

const CreateChannelModal = ({ open, handleClose, setChannels }) => {
    const [newChannelName, setNewChannelName] = useState('');

    const handleSubmit = async () => {
        if (newChannelName) {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/channel/add-channel`, { name: newChannelName }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setNewChannelName('');
                handleClose();
                setChannels(await fetchChannels())
            } catch (error) {
                console.error('Error creating channel:', error);
            }
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-channel-modal"
            aria-describedby="create-channel-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    Create New Channel
                </Typography>
                <TextField
                    fullWidth
                    label="Channel Name"
                    variant="outlined"
                    margin="normal"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Create
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                    sx={{ ml: 1 }}
                >
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default CreateChannelModal;
