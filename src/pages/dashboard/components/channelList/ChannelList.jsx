import React from 'react';
import { List, ListItemText, Button, ListItemButton, ListItem, Box, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ChannelList = ({ channels, onChannelSelect, onCreateChannelClick, drawerClose, onJoinChannelClick }) => {
    const handleChannelSelect = (channel) => {
        onChannelSelect(channel)
        drawerClose()
    }
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup variant="contained">
                    <Button variant="contained" color="primary" onClick={onJoinChannelClick}>
                        Join channel
                    </Button>
                    <Button variant="contained" color="primary" onClick={onCreateChannelClick}>
                        <AddIcon />
                    </Button>
                </ButtonGroup>
            </Box>
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
