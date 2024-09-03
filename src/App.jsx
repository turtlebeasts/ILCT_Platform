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
import Navbar from './components/Navbar';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeChange = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Navbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
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
