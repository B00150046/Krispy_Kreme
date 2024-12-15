'use client';

import { useState, useEffect } from "react";
import escape from 'escape-html';
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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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

   

    const validateForm = (event) => {
        let errorMessage = '';
        const data = new FormData(event.currentTarget);
    
        // Fetch email and password
        const email = data.get("reg_email") || data.get("log_email");
        const password = data.get("reg_pass") || data.get("log_password");
        const phone = data.get("reg_phone"); // Only used in registration
    
        const validator = require("email-validator");
    
        // Email validation
        if (!email || !validator.validate(email) || email.length > 30) {
            errorMessage += "Invalid email address. ";
        }
    
        // Password validation
        if (!password || password.length < 8) {
            errorMessage += "Password must be at least 8 characters. ";
        }
    
        // Phone validation (registration only)
        if (phone && !/^1-\d{3}-\d{3}$/.test(phone)) {
            errorMessage += "Invalid phone number. ";
        }
    
        // If any errors were found
        if (errorMessage) {
            setErrorHolder(errorMessage);
            setOpen(true);
            return false;
        }
        return true;
    };
    

    // Handler functions for form submissions
    const handleNewRegister = async (event) => {
        event.preventDefault();
    

    
        // Extract form data
        const data = new FormData(event.currentTarget);
        const email = data.get("reg_email");
        const password = data.get("reg_pass");
        const phone = data.get("reg_phone");
    
        try {
            // Send API request
            const response = await runDBCallAsync(`/api/newregister?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&phone=${encodeURIComponent(phone)}`);
    
            if (response.ok) {
                setErrorHolder("Registration successful!");
                setOpen(true);
                window.location = "/dashboard";
            } else {
                setErrorHolder(response.message || "Invalid input. Please correct the errors.");
                setOpen(true);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorHolder(error.message || "An unexpected error occurred. Please try ag5ain.");
            setOpen(true);
        }
    };
    
    
    const handleNewLogin = async (event) => {
        event.preventDefault();
    
        // Validate the form
        if (!validateForm(event)) {
            setErrorHolder("Invalid input. Please correct the errors.");
            setOpen(true);
            return;
        }
    
        const data = new FormData(event.currentTarget);
        const email = data.get("log_email");
        const password = data.get("log_password");
    
        try {
            const response = await runDBCallAsync(`/api/getLogin?email=${email}&password=${password}`);
            if (response.status === 'valid' && response.role === 'customer') {
                window.location = '/dashboard';
            } else if (response.status === 'valid' && response.role === 'manager') {
                window.location = '/manager';
            } else {
                setErrorHolder(response.error || "Invalid login credentials.");
                setOpen(true);
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorHolder(error.message || "An unexpected error occurred. Please try again.");
            setOpen(true);
        }
    };

    async function runDBCallAsync(url) {
        const res = await fetch(url);
        
        
        if(!res.ok || res.status !== 200) {
            throw new Error(data.error || 'An unexpected error occurred.');
        }
        const data = await res.json();
        return data
    }

    // Fetch data on component mount
    useEffect(() => {
        fetch('/api/getWeather')
            .then((res) => res.json())
            .then((weather) => setWeatherData(weather));

        fetch('/api/getData')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

   
    // JSX rendering
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  // second
  const [errorHolder, setErrorHolder] = React.useState(false);

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
                                inputProps={{
                                    maxLength: 30,}}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                    helperText= "sample@site.com"
                            />
                            <br></br>
                            <TextField
                                margin="normal"
                                required
                                id="reg_pass"
                                label="Password"
                                name="reg_pass"
                                autoComplete="pass"
                                autoFocus
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        backgroundColor: '#b7edd4',
                                    },
                                }}
                                inputProps={{
                                    maxLength: 30,
                                    minLength: 8,
                                }}
                                helperText="At least 8 characters long."
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
                                inputProps={{
                                    maxLength: 12, // 9 characters: 1-902-758
                                    pattern: "^[1]-\\d{3}-\\d{3}$" // Matches "1-902-758"
                                }}
                                helperText="Format: 1-XXX-XXX"
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
                                        maxlength: '30',
                                    },
                                }}
                                inputProps={{
                                    maxLength: 30,
                                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
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
                                 inputProps={{ maxLength: 30 }}
                                 minLength={8}
                                    
                            />
                            <br></br>
                            <Button type="submit" sx={{ mt: 3, mb: 2, backgroundColor: '#cd0f2a', color: '#fff'}}>
                                Login
                            </Button>
                        </Box>
                    </Box>
                )}
            </Container>
            <React.Fragment>

     

      <Dialog

        open={open}

        onClose={handleClose}

        aria-labelledby="alert-dialog-title"

        aria-describedby="alert-dialog-description"

      >

        <DialogTitle id="alert-dialog-title">

          {"Error"}

        </DialogTitle>

        <DialogContent>

          <DialogContentText id="alert-dialog-description">

           {errorHolder}

          </DialogContentText>

        </DialogContent>

        <DialogActions>

   

          <Button onClick={handleClose} autoFocus>

            Close

          </Button>

        </DialogActions>

      </Dialog>

    </React.Fragment>
        </Box>
    );
}

