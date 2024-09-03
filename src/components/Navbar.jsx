import { Container, Grid, Switch, Typography, Link, Box, ToggleButton, Button, IconButton } from "@mui/material";
import { Link as link } from "react-router-dom";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import Brightness5Icon from '@mui/icons-material/Brightness5';

export default function Navbar({ darkMode, handleThemeChange }) {
    return (
        <Container>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    {/* <Switch checked={darkMode} onChange={handleThemeChange} /> */}

                    <Typography variant="body1" display="inline">{darkMode ? 'Dark Mode' : 'Light Mode'}</Typography>
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
    )
}