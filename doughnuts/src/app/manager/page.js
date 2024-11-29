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
import { Container, Icon, Table, TableContainer, TableHead } from '@mui/material';


export default function DoughnutApp() {
const [order, setOrders] = useState([])
const [weather, setWeatherData] = useState(0)


  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    alert(data);
    }  

useEffect(() => {

    
    fetch('http://localhost:3000/api/getWeather')
    .then((weather) => weather.json())
    .then((weather) => {
        setWeatherData(weather)
    })
    
    fetch('http://localhost:3000/api/getOrders')
    .then((order) => order.json())
    .then((order) => {
        setOrders(order)
    })
}, [])


 //____________________________________________________________________________________
//PAGES FOR MULTI-PAGE APP
   
    const [showProfile, setShowProfile] = useState(true);
   

    //____________________________________________________________________________________

   
    
    //if(!cart) return <p>No cart items sorry! </p>
   // if(!order) return <p>Loading</p>
   // if(!weather) return <p>No weather</p>
    //if(!pro) return <p>Loading</p>
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
                   <div>
                    Today's temperature: {JSON.stringify(weather.temp)}
                    </div>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
               
            </Container>
            {showProfile && (
                <Box>
                    <h1>Profile</h1>
                    <Button onClick={() => setShowProfile(false)}>Go to Orders</Button>
                    
                </Box>
            )}
           
        </Box>
    );
}
