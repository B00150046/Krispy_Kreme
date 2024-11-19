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
import { Container, Table, TableContainer, TableHead } from '@mui/material';
//import { Tab } from "bootstrap";

export default function DoughnutApp() {
const [data, setData] = useState([])
const [pro, setProducts] = useState([])
const [cart, setCart] = useState(null)
const [order, setOrders] = useState([])
const [weather, setWeatherData] = useState(0)

const handleNewRegister = (event) => {
    console.log("handling submit");

    alert("clicked")
    event.preventDefault();
   
    const data = new FormData(event.currentTarget);
    let name = data.get('reg_name')
    let email = data.get('reg_email')
    let phone = data.get('reg_phone')

    
  runDBCallAsync(`http://localhost:3000/api/newregister?name=${name}&email=${email}&phone=${phone}`)
  }; // end handle submit



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

        fetch('http://localhost:3000/api/getDoughnuts')
        .then((pro )=> pro.json())
        .then((pro) => {
        setProducts(pro)
    })
    
    fetch('http://localhost:3000/api/ShoppingCart')
    .then((cart) => cart.json())
    .then((cart) => {
        setCart(cart)
    })
    
    fetch('http://localhost:3000/api/getOrders')
    .then((order) => order.json())
    .then((order) => {
        setOrders(order)
    })
}, [])


 //____________________________________________________________________________________
//PAGES FOR MULTI-PAGE APP
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showProducts, setShowProducts] = useState(true);
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

    //____________________________________________________________________________________

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
                    <div>  Today's temperature: {JSON.stringify(weather.temp)}</div>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
               
            </Container>
            { showRegister && (
             <Box component="form" onSubmit={handleNewRegister} noValidate sx={{ mt: 1 }}>
            
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
                         
                         name="reg_name"
                         label="Name"
                         type="text"
                         id="reg_name"
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
                        
                         name="reg_phone"
                         label="Phone Number"
                         type="tel"
                         id="reg_phone"
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

fullWidth

variant="contained"

sx={{ mt: 3, mb: 2 }}

>

Sign In

</Button>
                   
                 </Box>
             
         </Box>
            )}
            {showLogin && (
                 <Box component="form" noValidate sx={{ mt: 1 }}>
                
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
                             onClick={() => handleDash()}
                             sx={{ mt: 3, mb: 2, backgroundColor: '#cd0f2a' }}
                         >
                             Login
                         </Button>
                     </Box>
                 
             </Box>
            )}

            {showCart && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                   
                </Box>
            )}
            {showProfile && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                   <TableContainer component={Box}>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <Tab>Order ID</Tab>
                            <Tab>Product Name</Tab>
                            <Tab>Price</Tab>
                            <Tab>Sub Total</Tab>
                            <Tab>-</Tab>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                        {cart.map((item, i) => (
                            <React.Fragment key={i}>
                                <TableRow>
                                    <TableCell>{item.order_id}</TableCell>
                                    <TableCell>{item.p_name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.sub_total}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleCheckOut()}
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: '#cd0f2a',
                                                color: '#fff',
                                                '&:hover': {
                                                    backgroundColor: '#fff',
                                                    color: '#cd0f2a',
                                                },
                                            }}
                                        >
                                            Check Out
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total:</TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
                </Box>
            )}
            {showProducts && (
                
                <Box component="section" sx={{ p: 2, }}>
                    This could be the products page!
                    <div
                    sx = {{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}>
                    {
                     pro.map((item, i) => (
                     <div style={{padding: '20px',
                        border: '1px solid #cd0f2a',
                        borderRadius: '5px',
                     }} key={i} >
                     <img src={item.img_src} alt={item.p_name} width={100} height={100} />
                    <br></br>
                    {item.p_name}
                     -
                    {item.price}
                    <br></br>
                    <Button 
                    onClick={() => newCartItem(item.p_name, item.price)} 
                    variant="outlined"
                    sx={{
                        backgroundColor: '#cd0f2a',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: '#cd0f2a',
                        },
                    }}
                    > Add to cart </Button>
                    </div>
                    ))
                    }
                    </div>
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
