import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Link, Box, IconButton } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import DiamondIcon from '@mui/icons-material/Diamond';

export default function Navbar({ darkMode, handleThemeChange }) {
    const [shrink, setShrink] = useState(false);
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShrink(true);
            } else {
                setShrink(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navbarStyle = {
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Black with 20% opacity
        backdropFilter: 'blur(10px)', // Blur effect for background
        color: 'white',
        padding: shrink ? '8px' : '16px', // Adjust padding based on scroll
        height: shrink ? '50px' : '80px', // Adjust height based on scroll
        transition: 'height 0.3s ease, padding 0.3s ease',
        zIndex: 1000,
    };

    if (location.pathname !== '/dashboard') {
        return (
            <Box sx={navbarStyle}>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <DiamondIcon color="primary" />
                                <Typography color={darkMode ? "white" : "black"} sx={{ display: { sm: 'block', xs: 'none' } }}>
                                    ILCTp
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    typography: 'body1',
                                    '& > :not(style) ~ :not(style)': {
                                        ml: 2,
                                    },
                                }}
                            >
                                <Link component={RouterLink} to="/" color="text.secondary" underline='none'>
                                    Home
                                </Link>
                                <Link component={RouterLink} to="/login" color="text.secondary" underline='none'>
                                    Login
                                </Link>
                                <Link component={RouterLink} to="/register" color="text.secondary" underline='none'>
                                    Register
                                </Link>
                                <IconButton onClick={handleThemeChange}>
                                    {darkMode ? <BedtimeIcon /> : <Brightness5Icon />}
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )
    } else {
        return <></>
    }
}
