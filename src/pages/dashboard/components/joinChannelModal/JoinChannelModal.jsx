import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Autocomplete, CircularProgress } from '@mui/material';
import { fetchChannels, joinChannel, searchChannels } from '../../../../api/channelService';

const JoinChannelModal = ({ open, handleClose, setChannels }) => {
    const [newChannelName, setNewChannelName] = useState('');
    const [channelLists, setChannelLists] = useState([])
    const [joinError, setJoinError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleJoinChannel = async (id) => {
        setLoading(true)
        const result = await joinChannel(id)
        if (result) {
            setChannels(await fetchChannels())
            handleClose()
        } else {
            setJoinError(true)
        }
    }

    useEffect(() => {
        const handleSubmit = async () => {
            if (newChannelName) {
                try {
                    setChannelLists(await searchChannels(newChannelName))
                } catch (error) {
                    console.error('Error creating channel:', error);
                }
            }
        };
        handleSubmit()
        setJoinError(false)
        return () => setChannelLists([])
    }, [newChannelName])

    return (
        <Modal
            open={open}
            onClose={() => loading ? null : handleClose}
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
                    Join channel
                </Typography>
                <Autocomplete
                    fullWidth
                    value={channelLists.find(option => option.name === newChannelName) || null}
                    options={channelLists}
                    getOptionLabel={channelLists => channelLists.name}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Channel Name"
                            variant="outlined"
                            margin="normal"
                            value={newChannelName}
                            onChange={(e) => setNewChannelName(e.target.value)}
                        />
                    }
                    onChange={(event, value) => handleJoinChannel(value.id)}
                />
                {joinError && <Typography color={'error'}>Already joined</Typography>}
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                    disabled={loading}
                >
                    {
                        loading ? <CircularProgress size={25} /> : 'cancel'
                    }
                </Button>
            </Box>
        </Modal>
    );
};

export default JoinChannelModal;
