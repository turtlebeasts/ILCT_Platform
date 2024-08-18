import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CardActions, Avatar } from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL_GLOBAL);
const user_id = localStorage.getItem('user_id');
const user_email = localStorage.getItem('user_email');

socket.on('connect', () => {
    console.log('Connected to the server');
});

const ChatBox = ({ channelId, channelName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBAL}/channels/${channelId}/messages`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        // Fetch messages when component mounts
        fetchMessages();

        if (socket.connected) {
            socket.emit('joinChannel', channelId);
            // console.log("Joined Channel id: ", channelId)
        } else {
            socket.on('connect', () => {
                socket.emit('joinChannel', channelId);
            });
        }

        const handleNewMessage = (message) => {
            if (message.channel_id == channelId) {
                // console.log("New message")
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        };

        socket.on('newMessage', handleNewMessage);


        // Clean up the socket connection on component unmount
        return () => {
            socket.emit('leaveChannel', channelId);
            socket.off('newMessage', handleNewMessage);
        };
    }, [channelId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/channels/${channelId}/messages`, {
                    content: {
                        user_id: user_id,
                        message: newMessage,
                        email: user_email,
                        socketID: socket.id
                    },
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
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
                    {messages.map((message) => (
                        <Box key={message.id} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={message.email} src={message.profilePicture} sx={{ mr: 2, width: 24, height: 24 }}>
                                {message.email[0]}
                            </Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {message.email}
                                </Typography>
                                <Typography variant="body1">{message.content}</Typography>
                            </Box>
                        </Box>
                    ))}
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
