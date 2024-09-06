import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, IconButton } from '@mui/material';
import socket from '../../../../../utils/socket';
import { useChannel } from '../../context/channelContent';
import { save_session } from '../../../../../api/jamboardService';
import LoadSessionButton from './loadSession';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const Jamboard = () => {
    const [code, setCode] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sessionName, setSessionName] = useState('');
    const { selectedChannel } = useChannel();
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    useEffect(() => {
        socket.on('code_update', (data) => {
            if (data.channel_id == selectedChannel.id) {
                setCode(data.code_update);
            }
        });

        return () => socket.off('code_update');
    }, [selectedChannel.id]);

    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;

            setCode(prevCode => prevCode.substring(0, start) + '\t' + prevCode.substring(end));

            setTimeout(() => {
                event.target.selectionStart = event.target.selectionEnd = start + 1;
            }, 0);
        }
    };

    const handleChange = (event) => {
        setCode(event.target.value);
        socket.emit('code_change', { channel_id: selectedChannel.id, code_update: event.target.value });
    };

    const handleSave = async () => {
        const data = {
            channel_id: selectedChannel.id,
            code,
            sessionName
        }
        if (await save_session(data)) {
            setDialogOpen(false)
            setSessionName('')
            setSnackBarOpen(true)
        }
    }

    return (
        <Box sx={{ padding: 2, bgcolor: 'background.blur', backdropFilter: 'blur(20px)' }}>
            <Typography variant="h5" gutterBottom color={'primary'}>
                Jamboard
            </Typography>
            <Card sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                    <textarea
                        value={code}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Start typing your code here..."
                        rows={20}
                        style={{
                            width: '100%',
                            height: '100%',
                            fontSize: '16px',
                            fontFamily: 'monospace',
                            padding: '16px',
                            border: 'none',
                            outline: 'none',
                            resize: 'none',
                            boxSizing: 'border-box',
                            backgroundColor: 'inherit', // Matches the CardContent background
                            color: 'inherit', // Inherits text color for consistency
                        }}
                    />
                </CardContent>
            </Card>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' sx={{ display: { xs: 'none', sm: 'block' } }} startIcon={<DeleteIcon />} onClick={() => setCode('')} disabled={code == ''}>Clear</Button>
                <IconButton sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => setCode('')} disabled={code == ''}>
                    <DeleteIcon />
                </IconButton>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <LoadSessionButton setCode={setCode} />
                    <Button variant="contained" color="primary" disabled={code == ''} onClick={() => setDialogOpen(true)} startIcon={<CloudUploadIcon />}>
                        Save Session
                    </Button>
                </Box>
            </Box>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Save Session</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Session Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
                message='Session saved'
                autoHideDuration={2000}
            />
        </Box>
    );
};

export default Jamboard;
