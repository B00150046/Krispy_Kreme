'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';

export default function DoughnutApp() {
    const [showRegister, setShowRegister] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showCheckOut, setShowCheckout] = useState(false);

    function handleRegister() {
        setShowRegister(true);
        setShowLogin(false);
        setShowCart(false);
        setShowProfile(false);
        setShowProducts(false);
        setShowCheckout(false)
    }

    function handleLogin() {
        setShowRegister(false);
        setShowLogin(true);
        setShowCart(false);
        setShowProfile(false);
        setShowProducts(false);
        setShowCheckout(false)
    }
    function handleCart() {
        setShowRegister(false);
        setShowLogin(false);
        setShowCart(true);
        setShowProfile(false);
        setShowProducts(false);
        setShowCheckout(false)
    }
    function handleProfile() {
        setShowRegister(false);
        setShowLogin(false);
        setShowCart(false);
        setShowProfile(true);
        setShowProducts(false);
        setShowCheckout(false)
    }
    function handleProducts() {
        setShowRegister(false);
        setShowLogin(false);
        setShowCart(false);
        setShowProfile(false);
        setShowProducts(true);
        setShowCheckout(false)
    }
    function handleCheckOut() {
        setShowRegister(false);
        setShowLogin(false);
        setShowCart(false);
        setShowProfile(false);
        setShowProducts(false);
        setShowCheckout(true)
    } 

    //REGISTER FORM
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const phoneNo = data.get('phoneNo');

        console.log({ email, password, phoneNo });
    };

    //LOGIN FORM
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        if('email'){
            handleDash();
        }
        else{
            handleLogin();
        }

        console.log({ email, password });
    }

    //GET PRODUCTS FOR PAGE
    const getProducts = async () => {
        const response = await fetch('/api/getDoughnuts');
        const data = await response.json();
        console.log(data);
    };

    //GET ORDERS FOR PAGE
    const getOrders = async () => {
        const response = await fetch('/api/getOrders');
        const data = await response.json();
        console.log(data);
    };

    //GET WEATHER FOR PAGE
    const getWeather = async () => {
        const response = await fetch('/api/getWeather');
        const data = await response.json();
        console.log(data);
    };

    return (
        //----MENU BAR----
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
                            sx={{ flexGrow: 1, textAlign: 'center' }}
                        />
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleLogin}
                        sx={{
                            border: '3px solid',
                            borderColor: '#cd0f2a',
                            color: '#355746',
                            backgroundColor: '#fff',
                            '&:hover': {
                                backgroundColor: '#cd0f2a',
                                borderColor: '#fff',
                                color: '#fff',
                            },
                        }}
                    
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
               
            </Container>
            { showRegister && (
             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             {showRegister && (
                 <Box
                     sx={{
                         textAlign: 'center',
                         height: '100vh',
                         paddingTop: '125px',
                     }}
                 >
                     <Typography>Create a new account here</Typography>
                     <TextField
                         margin="normal"
                         required
                         
                         id="email"
                         label="Email Address"
                         name="email"
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
                     <TextField
                         margin="normal"
                         required
                         
                         name="password"
                         label="Password"
                         type="password"
                         id="password"
                         autoComplete="current-password"
                         sx={{
                             backgroundColor: '#fff',
                             borderRadius: '5px',
                             '&:hover': {
                                 backgroundColor: '#b7edd4',
                             },
                         }}
                     />
                     <TextField
                         margin="normal"
                         required
                        
                         name="phoneNo"
                         label="Phone Number"
                         type="tel"
                         id="phoneNo"
                         autoComplete="phone-number"
                         sx={{
                             backgroundColor: '#fff',
                             borderRadius: '5px',
                             '&:hover': {
                                 backgroundColor: '#b7edd4',
                             },
                         }}
                     />
                    
                     <Button
                         type="submit"
                         variant="contained"
                         sx={{ mt: 3, mb: 2, backgroundColor: '#cd0f2a' }}
                     >
                         Register
                     </Button>
                 </Box>
             )}
         </Box>
            )}
            {showLogin && (
                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                 {showRegister && (
                     <Box
                         sx={{
                             textAlign: 'center',
                             height: '100vh',
                             paddingTop: '125px',
                         }}
                     >
                         <Typography>Create a new account here</Typography>
                         <TextField
                             margin="normal"
                             required
                             
                             id="email"
                             label="Email Address"
                             name="email"
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
                         <TextField
                             margin="normal"
                             required
                             
                             name="password"
                             label="Password"
                             type="password"
                             id="password"
                             autoComplete="current-password"
                             sx={{
                                 backgroundColor: '#fff',
                                 borderRadius: '5px',
                                 '&:hover': {
                                     backgroundColor: '#b7edd4',
                                 },
                             }}
                         />
                         <Button
                             type="submit"
                             variant="contained"
                             sx={{ mt: 3, mb: 2, backgroundColor: '#cd0f2a' }}
                         >
                             Login
                         </Button>
                     </Box>
                 )}
             </Box>
            )}

            {showCart && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    This could be the Shopping Cart!
                </Box>
            )}
            {showProfile && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    This could be the profile page!
                </Box>
            )}
            {showProducts && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    This could be the products page!
                </Box>
            )}
            {showCheckOut && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    This could be the checkout page!
                </Box>
            )}
        </Box>
    );
}
