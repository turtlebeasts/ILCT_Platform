import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, IconButton } from '@mui/material';
import Jamboard from "../jamboard/jamboard";
import Notes from '../notes/notes';
import Files from '../files/files';
import Calendar from '../calendar/calendar';
import Tasks from '../tasks/tasks';
import { useChannelOptions } from '../../context/context';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const options = [
    { title: 'Jamboard', description: 'Collaborate on ideas with your team in real-time.', component: <Jamboard /> },
    { title: 'Notes', description: 'Keep track of important information and share with the channel.', component: <Notes /> },
    { title: 'Files', description: 'Access and share files with the team.', component: <Files /> },
    { title: 'Calendar', description: 'Schedule and manage events and meetings.', component: <Calendar /> },
    { title: 'Tasks', description: 'Organize and assign tasks to channel members.', component: <Tasks /> },
];

const ChannelOptions = () => {
    const { selectedOption, setSelectedOption, resetOptions } = useChannelOptions();

    const handleCardClick = (key) => setSelectedOption(key);

    return (
        <Box sx={{ flexGrow: 1 }}>
            {!selectedOption && selectedOption !== 0 ? (
                <Grid container spacing={2}>
                    {options.map((option, key) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                            <Card
                                onClick={() => handleCardClick(key)}
                                sx={{
                                    cursor: 'pointer',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {option.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {option.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box>
                    <IconButton
                        variant="contained"
                        color="primary"
                        onClick={resetOptions}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    {options[selectedOption].component}
                </Box>
            )}
        </Box>
    );
};

export default ChannelOptions;
