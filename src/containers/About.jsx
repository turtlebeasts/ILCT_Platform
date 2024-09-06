import React from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';

const About = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.blur',
                color: 'text.primary',
                padding: '4rem 0',
                backdropFilter: 'blur(10px)'
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h3" component="h2" gutterBottom align="center">
                    About Us
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                        <Avatar
                            alt="Your Name"
                            src="/path/to/your-image.jpg" // Add your image path here
                            sx={{ width: 120, height: 120 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="body1">
                            Welcome to our Interactive Live Coding & Teaching Platform! Our mission is to revolutionize the way coding is taught and learned by creating an engaging, collaborative, and interactive educational experience.
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                            In today’s fast-paced world, traditional teaching methods can often fall short in keeping students engaged and providing real-time feedback. Our platform, built using Node.js and socket programming, aims to bridge this gap by allowing teachers to demonstrate coding in real-time. Students can observe the code as it is written, interact with the instructor, and even request permission to modify the code themselves, creating a dynamic and hands-on learning environment.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default About;
