import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                padding: '2rem 0',
                borderTop: '1px solid',
                borderColor: 'divider',
                textAlign: { xs: 'center', sm: 'start' }
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contributions
                        </Typography>
                        <Typography variant="body2" component="p">
                            Feel free to contribute with your ideas to this project at <br /><Link href="https://github.com/turtlebeasts/ILCT_Platform">turtlebeasts/ILCT_platform</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Links
                        </Typography>
                        <Link href="#" color="inherit" variant="body2">
                            Home
                        </Link>
                        <br />
                        <Link href="#" color="inherit" variant="body2">
                            About
                        </Link>
                        <br />
                        <Link href="#" color="inherit" variant="body2">
                            Services
                        </Link>
                        <br />
                        <Link href="#" color="inherit" variant="body2">
                            Contact
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Me
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'start' } }}>
                            <Link href="mailto:mrigz179@gmail.com?subject=ILCT+platform">
                                <EmailIcon />
                            </Link>

                            <Link target="_blank" href="https://www.linkedin.com/in/mriganka-das-05385822a/">
                                <LinkedInIcon />
                            </Link>

                            <Link target="_blank" href="https://www.github.com/turtlebeasts">
                                <GitHubIcon />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} Mriganka, Presidency College, Bangalore.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
