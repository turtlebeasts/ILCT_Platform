import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';

const ChannelList = ({ channels, onChannelSelect, onCreateChannelClick }) => {
    return (
        <>
            <Button onClick={onCreateChannelClick} variant="contained" color="primary">
                Create Channel
            </Button>
            <List>
                {channels.map(channel => (
                    <ListItem button key={channel.id} onClick={() => onChannelSelect(channel)}>
                        <ListItemText primary={channel.name} />
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ChannelList;
