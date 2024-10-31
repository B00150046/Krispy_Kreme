'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { AlignHorizontalCenter, SosOutlined } from '@mui/icons-material';

export default function Page() {
    // Removed unused state variables
        const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            // eslint-disable-next-line no-console
            let email = data.get('email');
            let password = data.get('password');
            let phoneNo = data.get('phoneNo');

            //Add new account entry to database
            
                
            console.log({
                email: data.get('email'),
                password: data.get('password'),
                phoneNo: data.get('phoneNo'),
            });
        }
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#006938' }}>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
                src="/img/Logo.png"
                alt="Doughnuts"
                width={100}
                height={40}
                sx={{ flexGrow: '1', 
                    AlignHorizontalCenter: "center" }}
            />
            </Typography>
            <Button 
            variant="outlined"
            sx={{ 
                border: '3px solid',
                borderColor: '#cd0f2a', 
                color: '#355746', 
                backgroundColor: '#fff',
                '&:hover': {
                    backgroundColor: '#cd0f2a',
                    borderColor: '#fff',
                    color: '#fff',
                }
            }}
            >Login</Button>
            </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
            <Box component={"form"} 
            onSubmit={handleSubmit} 
            noValidate sx={{ mt: 1 }}>
        <Box
            sx={{ 
                textAlign: 'center',
                height: '100vh',
             
               paddingTop: '125px',
            }}
            >
                Create a new account here
                <TextField 
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ 
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    borderColor: '#006938',
                    '&:hover': {
                        backgroundColor: '#b7edd4',
                        color: '#fff',
                    }}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                sx={{ 
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    borderColor: '#006938',
                    '&:hover': {
                        backgroundColor: '#b7edd4',
                        color: '#fff',
                    }}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNo"
                label="Phone Number"
                type="tel"
                id="phoneNo"
                autoComplete="phone-number"
                autoFocus
                sx={{ 
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    borderColor: '#006938',
                    '&:hover': {
                        backgroundColor: '#b7edd4',
                        color: '#fff',
                    }}}
                />
                <Button
                type="submit"
                width="20%"
                variant="contained"
                sx={{ mt: 3, mb: 2 ,
                       backgroundColor: '#cd0f2a',
                       
                }} 
                >Register</Button>
               
                </Box>
                </Box>
                </Container>
        </Box>
    );
}