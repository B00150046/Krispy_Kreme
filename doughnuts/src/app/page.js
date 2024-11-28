'use client';

import { useState, useEffect } from "react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

export default function DoughnutApp() {
    // State definitions
    const [data, setData] = useState([]);
    const [weather, setWeatherData] = useState(0);

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    // Handlers for Register and Login
    function handleRegister() {
        setShowRegister(true);
        setShowLogin(false);
    }

    function handleLogin() {
        setShowRegister(false);
        setShowLogin(true);
    }

    // Handler functions for form submissions
    const handleNewRegister = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('reg_name');
        const email = data.get('reg_email');
        const phone = data.get('reg_phone');

        runDBCallAsync(`http://localhost:3000/api/newregister?name=${name}&email=${email}&phone=${phone}`);
    };

    const handleNewLogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('log_email');
        const password = data.get('log_password');

        runDBCallAsync(`http://localhost:3000/api/getLogin?email=${email}&password=${password}`);
    };

    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res.json();
        alert(data.status);

        // Redirect to appropriate dashboard
        if (data.status.includes('valid')) {
            window.location = '/dashboard';
        } else {
            window.location = '/manager';
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        fetch('http://localhost:3000/api/getWeather')
            .then((res) => res.json())
            .then((weather) => setWeatherData(weather));

        fetch('http://localhost:3000/api/getData')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    // JSX rendering
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#006938' }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img
                            src="/img/Logo.png"
                            alt="Doughnuts"
                            width={100}
                            height={40}
                            style={{ textAlign: 'center' }}
                        />
                    </Typography>
                    <Button
                        onClick={handleRegister}
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            '&:hover': {
                                color: '#fff',
                            },
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        
                        onClick={handleLogin}
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            '&:hover': {
                                color: '#aab7b8',
                            },
                        }}
                    >
                        Login
                    </Button>
                    <Typography sx={{ ml: 2 }}>Today's temperature: {weather.temp || 'Loading...'}</Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="xs">
                {/* Register Form */}
                {showRegister && (
                    <Box component="form" onSubmit={handleNewRegister} noValidate sx={{ mt: 1 }}>
                        <Box sx={{ textAlign: 'center', height: '100vh', paddingTop: '125px' }}>
                            <Typography>Register for a new account</Typography>
                            <TextField
                                margin="normal"
                                required
                                id="reg_name"
                                label="Name"
                                name="reg_name"
                                autoComplete="name"
                                autoFocus
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        backgroundColor: '#b7edd4',
                                    },
                                }}
                            />
                            <br></br>
                            <TextField
                                margin="normal"
                                required
                                id="reg_email"
                                label="Email Address"
                                name="reg_email"
                                autoComplete="email"
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        backgroundColor: '#b7edd4',
                                    },
                                }}
                            />
                            <br></br>
                            <TextField
                                margin="normal"
                                required
                                id="reg_phone"
                                label="Phone Number"
                                name="reg_phone"
                                autoComplete="phone"
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        backgroundColor: '#b7edd4',
                                    },
                                }}
                            />
                            <br></br>
                            <Button type="submit" sx={{ mt: 3, mb: 2, backgroundColor: '#cd0f2a' }}>
                                Register
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Login Form */}
                {showLogin && (
                    <Box component="form" onSubmit={handleNewLogin} noValidate sx={{ mt: 1 }}>
                        <Box sx={{ textAlign: 'center', height: '100vh', paddingTop: '125px' }}>
                            <Typography>Log into an existing account</Typography>
                            <TextField
                                margin="normal"
                                required
                                id="log_email"
                                label="Email Address"
                                name="log_email"
                                autoComplete="email"
                                autoFocus
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        backgroundColor: '#b7edd4',
                                    },
                                }}
                            />
                            <br></br>
                            <TextField
                                margin="normal"
                                required
                                name="log_password"
                                label="Password"
                                type="password"
                                id="log_password"
                                autoComplete="current-password"
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        border: '1px solid #e7eAd4',
                                        backgroundColor: '#b7edd4',
                                    },
                                }}
                            />
                            <br></br>
                            <Button type="submit" sx={{ mt: 3, mb: 2, backgroundColor: '#cd0f2a' }}>
                                Login
                            </Button>
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
