import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import socket from '../../../../utils/socket';
import { fetchMessages, sendMessage } from '../../../../api/messageService';
import Inbox from './Inbox';

const ChatBox = ({ channelId, channelName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchAndSetMessages = async () => setMessages(await fetchMessages(channelId))
        const handleNewMessage = (message) => message.channel_id == channelId ? setMessages((prevMessages) => [...prevMessages, message]) : null

        fetchAndSetMessages()
        socket.on('newMessage', handleNewMessage);
        return () => {
            socket.emit('leaveChannel', channelId);
            socket.off('newMessage', handleNewMessage);
        };
    }, [channelId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                await sendMessage(channelId, newMessage);
                setNewMessage('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 1 auto', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                    Chat for {channelName}
                </Typography>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                    <Inbox messages={messages} />
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, display: 'flex', flexShrink: 0 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </CardActions>
        </Card>
    );
};

export default ChatBox;
