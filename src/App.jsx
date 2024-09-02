import { Container, CssBaseline, Switch, ThemeProvider, Typography, Link, Grid, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link as link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import { useState } from 'react';
import { lightTheme, darkTheme } from './theme';
import { ChannelProvider } from './pages/dashboard/components/context/channelContent';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Switch checked={darkMode} onChange={handleThemeChange} />
              <Typography variant="body1" display="inline">{darkMode ? 'Dark Mode' : 'Light Mode'}</Typography>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
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
              </Box>
            </Grid>
          </Grid>
        </Container>
        <ChannelProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </ChannelProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
