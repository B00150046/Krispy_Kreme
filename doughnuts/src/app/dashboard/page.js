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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container, Table, TableBody, TableContainer, TableHead } from '@mui/material';

export default function DoughnutApp() {
    const [data, setData] = useState([]);
    const [pro, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [weather, setWeatherData] = useState(0);

    const newCartItem = async (pname, cost) => {
        const url = `/api/newCartItem?pname=${pname}&price=${cost}&time_added=${new Date().toLocaleString()}`;
        console.log("Handling submit for:", url);
        const result = await runDBCallAsync(url);
        if (result) {
            setCart(prevCart => [...prevCart, { item_name: pname, price: cost }]); // Add item to cart state
            alert("Item added to cart");
        }
    };

    const deleteCartItem = async (pname, cost, timer) => {
        const url = `/api/deleteCartItem?item_name=${pname}&price=${cost}&time_added=${encodeURIComponent(timer)}`;
        console.log("Handling submit for:", url);
        const result = await runDBCallAsync(url);
    
       
        if (result && result.data === "Item successfully deleted") {
            
            setCart(prevCart => prevCart.filter(item => item.item_name !== pname || item.price !== cost || item.time_added !== timer));
            alert("Item removed from cart");
        } else {
            alert("Failed to remove item from cart");
        }
    };

    async function runDBCallAsync(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data; // Returning the result for further processing
        } catch (error) {
            console.error("Error with DB call:", error);
            return null; // Return null in case of error
        }
    }

    useEffect(() => {
        async function fetchData() {
            const sessionResponse = await fetch('/api/getData');
            const sessionData = await sessionResponse.json();
            if (!sessionData.data) {
                window.location = '../'; // Redirect if session data is false
            }

            const weatherResponse = await fetch('/api/getWeather');
            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData);

            const productResponse = await fetch('/api/getDoughnuts');
            const productData = await productResponse.json();
            setProducts(productData);

            const cartResponse = await fetch('/api/ShoppingCart');
            const cartData = await cartResponse.json();
            setCart(cartData);
        }
        fetchData();
    }, []);

    // Page display logic for multi-page app
    const [showHome, setShowHome] = useState(true);
    const [showCart, setShowCart] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    function handleHome() {
        setShowHome(true);
        setShowCart(false);
        setShowProducts(false);
    }

    function handleCart() {
        setShowHome(false);
        setShowCart(true);
        setShowProducts(false);
    }

    function handleProducts() {
        setShowHome(false);
        setShowCart(false);
        setShowProducts(true);
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
                        sx={{ color: '#355746', fontWeight: 'bold', '&:hover': { color: '#fff' } }}
                    >
                        Products
                    </Button>
                    <Button
                        onClick={handleCart}
                        sx={{ color: '#355746', fontWeight: 'bold', '&:hover': { color: '#fff' } }}
                    >
                        <ShoppingCartIcon />
                    </Button>

                    <div sx={{ size: 'small' }}>
                        Today's temperature: {weather.temp}
                    </div>
                </Toolbar>
            </AppBar>

            {/* Cart Section */}
            {showCart && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
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
                                {cart.length > 0 ? (
                                    cart.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.item_name}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <Button
                                                    onClick={() => deleteCartItem(item.item_name, item.price)}
                                                    sx={{ backgroundColor: '#cd0f2a', color: '#fff', '&:hover': { backgroundColor: '#fff', color: '#cd0f2a' } }}
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
                    <Button sx={{ backgroundColor: '#cd0f2a', color: '#fff', '&:hover': { backgroundColor: '#fff', color: '#cd0f2a' } }} onClick={() => { window.location = '/CheckOut' }}>Checkout</Button>
                </Box>
            )}

            {/* Products Section */}
            {showProducts && (
                <Box component="section" sx={{ p: 2 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>Our Products</Typography>
                    <div sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        {pro.map((item, i) => (
                            <div key={i} style={{ padding: '20px', margin: '20px', border: '3px solid #cd0f2a', background: '#b7edd4', borderRadius: '5px', width: '175px' }}>
                                <img src={item.img_src} alt={item.p_name} width={100} height={100} />
                                <div sx={{ fontFamily: 'Arial', fontSize: '1.5em', fontWeight: 'bold', color: '#355746' }}>
                                    {item.p_name} € {item.price}
                                </div>
                                <Button
                                    onClick={() => newCartItem(item.p_name, item.price)}
                                    sx={{ backgroundColor: '#cd0f2a', color: '#fff', '&:hover': { backgroundColor: '#fff', color: '#cd0f2a' } }}
                                >
                                    Add to cart
                                </Button>
                            </div>
                        ))}
                    </div>
                </Box>
            )}

        </Box>
    );
}
