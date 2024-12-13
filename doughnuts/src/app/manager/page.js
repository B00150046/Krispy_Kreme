'use client';
import Link from 'next/link'
 
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container, Icon, Table, TableContainer, TableHead } from '@mui/material';


export default function DoughnutApp() {
const [data, setData] = useState([])
const [order, setOrders] = useState([])
const [weather, setWeatherData] = useState(0)



const newCartItem = (pname, cost) => {
    const url = `/api/newCartItem?pname=${pname}&price=${cost}`;
    
    console.log("Handling submit for:", url);
    runDBCallAsync(url);
    alert("Item added to cart");
};

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    alert(data);
    }  

useEffect(() => {


        
    fetch('/api/getData')
    .then((data) => data.json())
    .then((data) => {
       
        console.log("session status" + data.data)

        if(data.data == false){
            window.location = '../'
        }
    })
    
    fetch('/api/getWeather')
    .then((weather) => weather.json())
    .then((weather) => {
        setWeatherData(weather)
    })
    
    fetch('/api/getOrders')
    .then((order) => order.json())
    .then((order) => {
        setOrders(order)
    })
}, [])
return (
    <div>
        <AppBar position="static">
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
                    Krispee Doughnuts
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <TableContainer
                sx={{
                    backgroundColor: '#ffe4e1',
                    padding: '20px',
                    margin: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: '0.3s',
                    '&:hover': {
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                }}>
                    <Table>
                        <TableHead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </TableHead>
                        <tbody>
                            {order.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>(item.email)</td>
                                    <td>
                                        <Button variant="contained" color="primary" onClick={() => newCartItem(item.name, item.price)}>Add to cart</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    </div>
);

}