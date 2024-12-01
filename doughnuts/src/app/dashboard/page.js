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
const [pro, setProducts] = useState([])
const [cart, setCart] = useState([])
const [order, setOrders] = useState([])
const [weather, setWeatherData] = useState(0)



const newCartItem = (pname, cost) => {
    const url = `/api/newCartItem?pname=${pname}&price=${cost}`;
    
    console.log("Handling submit for:", url);
    runDBCallAsync(url);
    alert("Item added to cart");
};

const deleteCartItem = (pname, cost) => {
    const url = `/api/deleteCartItem?pname=${pname}&price=${cost}`;
    console.log("Handling submit for:", url);
    runDBCallAsync(url);
    alert("Item removed from cart");
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

        fetch('/api/getDoughnuts')
        .then((pro )=> pro.json())
        .then((pro) => {
        setProducts(pro)
    })
    
    fetch('/api/ShoppingCart')
    .then((cart) => cart.json())
    .then((cart) => {
        setCart(cart)
    })
    
    
}, [])


 //____________________________________________________________________________________
//PAGES FOR MULTI-PAGE APP
   const [showHome, setShowHome] = useState(true);
    const [showCart, setShowCart] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    
    function handleHome() {
        setShowHome(true);
        setShowCart(false);
        setShowProducts(false);
        setShowCheckout(false);
    }

    function handleCart() {
        setShowHome(false);
        setShowCart(true);
        setShowProducts(false);
        setShowCheckout(false)
    }
    function handleProducts() {
        setShowHome(false);
        setShowCart(false);
        setShowProducts(true);
        setShowCheckout(false)
    }
    

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
                            onClick={handleHome}
                            src="/img/Logo.png"
                            alt="Doughnuts"
                            width={100}
                            height={40}
                            sx={{ flexGrow: 1, textAlign: 'center' }}
                        />
                    </Typography>
                    <Button
                        onClick={handleProducts}
                        sx ={{
                            color: '#355746',
                            //make font bold
                            fontWeight: 'bold',
                            '&:hover': {
                                color: '#fff',
                            },
                        }}>
                        Products
                    </Button>
                    
                    <div sx={{
                        size: 'small'
                    }}>  
                    Today's temperature: {JSON.stringify(weather.temp)}
                    </div>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
               
            </Container>
            {showHome && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>
                        Welcome to Doughnuts
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                        The best doughnuts in town!
                    </Typography>
                </Box>
            )}


            {showCart && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                   <div>
                          <h2>Shopping Cart</h2>
                          <TableContainer>
                            <Table>
                                 <TableHead>
                                      <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                      </tr>
                                 </TableHead>
                                 <TableBody>
    {cart && cart.length > 0 ? (
        cart.map((item, i) => (
            <tr key={i}>
                <td>{item.item_name}</td>
                <td>{item.price}</td>
                <td>
                    <Button
                        onClick={() => deleteCartItem(item.item_name, item.price)}
                        sx={{
                            backgroundColor: '#cd0f2a',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#fff',
                                color: '#cd0f2a',
                            },
                        }}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
                Your cart is empty.
            </td>
        </tr>
    )}
</TableBody>

                            </Table>
                          </TableContainer>
                   </div>

                   <Link href="/CheckOut">Checkout</Link>
                </Box>
            )}
            
            {showProducts && (
                
                <Box component="section" sx={{ p: 2, }}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>
                   
                        Our Products
                        </Typography>
                    <div
                    sx = {{
                    //Display in a grid
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',

                    
                    }}>
                    {
                     pro.map((item, i) => (
                     <div style={{padding: '20px',
                        margin: '20px',
                        border: '3px solid #cd0f2a',
                        background: '#b7edd4',
                        alignContent: 'center',
                        borderRadius: '5px',
                        width: '175px',
                     }} key={i} >
                     <img src={item.img_src} alt={item.p_name} width={100} height={100} />
                    <br></br>
                    <div sx={{
                        alignContent: 'center',
                        fontFamily: 'Arial',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        color: '#355746',
                    }}>
                    {item.p_name}
                    
                     
                    € {item.price}
                    </div>
                    <br></br>
                    <br></br>
                    <Button 
                    onClick={() => newCartItem(item.p_name, item.price)} 
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
                    <Button
                        onClick={ handleCart}
                        sx ={{
                            backgroundColor: '#cd0f2a',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#fff',
                                color: '#cd0f2a',
                            },
                        }}>
                        Checkout
                    </Button>
                   <IconButton
                    onClick={handleCart}
                    sx = {{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: '#cd0f2a',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: '#cd0f2a',
                        },
                    }}>
                          <ShoppingCartIcon />
                   </IconButton>
                    </div>
                </Box>
            )}
           
        </Box>
    );
}
