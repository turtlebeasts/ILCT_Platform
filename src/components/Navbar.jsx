import { Container, Grid, Switch, Typography, Link, Box, ToggleButton, Button, IconButton, Card } from "@mui/material";
import { Link as link } from "react-router-dom";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import DiamondIcon from '@mui/icons-material/Diamond';

export default function Navbar({ darkMode, handleThemeChange }) {
    const style = {
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Black with 50% transparency
        backdropFilter: 'blur(10px)', // Blur effect for background
        color: 'white',
        padding: 2,
        zIndex: 1000,
    }
    return (
        <Box sx={style}>
            <Container>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <DiamondIcon color="primary" />
                            <Typography color={darkMode ? "white" : "black"}>ILCTp</Typography>
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
                            <Link component={link} to="/" color="text.secondary" underline='none'>
                                Home
                            </Link>
                            <Link component={link} to="/login" color="text.secondary" underline='none'>
                                Login
                            </Link>
                            <Link component={link} to="/register" color="text.secondary" underline='none'>
                                Register
                            </Link>
                            <IconButton onClick={handleThemeChange} >
                                {darkMode ? <BedtimeIcon /> : <Brightness5Icon />}
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}