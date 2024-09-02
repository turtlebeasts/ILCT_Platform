import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import socket from '../../../../../utils/socket';
import { useChannel } from '../../context/channelContent';

const Jamboard = () => {
    const [code, setCode] = useState('');
    const { selectedChannel } = useChannel()

    useEffect(() => {
        socket.on('code_update', (data) => {
            if (data.channel_id == selectedChannel.id) {
                setCode(data.code_update);
            }
        });

        return () => socket.off('code_update');
    }, []);

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

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Jamboard
            </Typography>
            <Card sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                    <textarea
                        value={code}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Start typing your code here..."
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
        </Box>
    );
};

export default Jamboard;
