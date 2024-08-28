import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import DeleteChannelModal from '../deleteChannelModal/DeleteChannelModal';
import RenameChannelModal from '../renameChannelModal/RenameChannelModal';
import { deleteChannel, renameChannel } from '../../../../api/channelService';

export default function TopMenu({ selectedChannel, setSelectedChannel }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteModalOpen, setDeleteModal] = useState(false)
    const [renameModalOpen, setRenameModal] = useState(false);

    const open = Boolean(anchorEl);

    const handleDeleteToggle = () => {
        setAnchorEl(null)
        setDeleteModal(prev => !prev)
    }

    const handleDeleteChannel = async () => {
        if (await deleteChannel(selectedChannel.id)) {
            setSelectedChannel(null)
        } else {
            console.log("Error while deleting channel!")
        }
    };


    const handleOpen = () => {
        setAnchorEl(null)
        setRenameModal(true)
    }
    const handleClose = () => setRenameModal(false);

    const handleRename = (newName) => renameChannel(selectedChannel.id, newName)

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
                onDelete={handleDeleteChannel}
            />
            <RenameChannelModal
                open={renameModalOpen}
                handleClose={handleClose}
                handleRename={handleRename}
            />
        </>
    )
}