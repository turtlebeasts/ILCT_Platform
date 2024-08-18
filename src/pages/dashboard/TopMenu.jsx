import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import DeleteChannelModal from './DeleteChannelModal';
import axios from 'axios';
import RenameChannelModal from './RenameChannelModal';

export default function TopMenu({ selectedChannel, setSelectedChannel }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteModalOpen, setDeleteModal] = useState(false)
    const [renameModalOpen, setRenameModal] = useState(false);

    const open = Boolean(anchorEl);

    const handleDeleteToggle = () => {
        setAnchorEl(null)
        setDeleteModal(prev => !prev)
    }

    const deleteChannel = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL_GLOBAL}/delete-channel/${selectedChannel.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token in the request headers
                }
            });

            if (response.status === 200) {
                console.log('Channel deleted successfully.');
                setSelectedChannel(null)
            } else {
                console.error('Failed to delete channel:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting channel:', error.message);
        }
    };


    const handleOpen = () => {
        setAnchorEl(null)
        setRenameModal(true)
    }
    const handleClose = () => setRenameModal(false);

    const handleRename = async (newName) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_GLOBAL}/rename-channel/${selectedChannel.id}`, { newName }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Channel renamed successfully.');
            } else {
                console.error('Failed to rename channel:', response.statusText);
            }
        } catch (error) {
            console.error('Error renaming channel:', error.message);
            if (error.response) {
                console.error('Error details:', error.response.data);
            }
        }
    };

    return (
        <>
            <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleOpen}>Rename</MenuItem>
                <MenuItem onClick={() => { }}>Members</MenuItem>
                <Divider />
                <MenuItem onClick={handleDeleteToggle} sx={{ color: 'error.main' }}>
                    Delete
                </MenuItem>
            </Menu>
            <DeleteChannelModal
                deleteModalOpen={deleteModalOpen}
                channelName={selectedChannel.name}
                onCancel={setDeleteModal}
                onDelete={deleteChannel}
            />
            <RenameChannelModal
                open={renameModalOpen}
                handleClose={handleClose}
                handleRename={handleRename}
            />
        </>
    )
}