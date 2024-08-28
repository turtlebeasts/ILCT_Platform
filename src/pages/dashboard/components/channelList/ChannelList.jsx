import React from 'react';
import { List, ListItemText, Button, ListItemButton, ListItem } from '@mui/material';

const ChannelList = ({ channels, onChannelSelect, onCreateChannelClick, drawerClose }) => {
    const handleChannelSelect = (channel) => {
        onChannelSelect(channel)
        drawerClose()
    }
    return (
        <>
            <Button onClick={onCreateChannelClick} variant="contained" color="primary" sx={{ mx: 2 }}>
                Create Channel
            </Button>
            <List>
                {channels.map(channel => (
                    <ListItem key={channel.id} disablePadding>
                        <ListItemButton onClick={() => handleChannelSelect(channel)}>
                            <ListItemText primary={channel.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ChannelList;
