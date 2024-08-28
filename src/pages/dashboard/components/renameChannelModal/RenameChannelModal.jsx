import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const RenameChannelModal = ({ open, handleClose, handleRename }) => {
    const [newName, setNewName] = useState('');

    const handleSubmit = () => {
        handleRename(newName);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="rename-channel-modal-title"
            aria-describedby="rename-channel-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography id="rename-channel-modal-title" variant="h6" component="h2">
                    Rename Channel
                </Typography>
                <TextField
                    fullWidth
                    label="New Channel Name"
                    variant="outlined"
                    margin="normal"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                    Rename
                </Button>
            </Box>
        </Modal>
    );
};

export default RenameChannelModal;
