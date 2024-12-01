'use client';

import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function CheckoutPage() {
    const [data, setData] = useState([])
    const [cart, setCart] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    

    useEffect(() => {
        fetch('../api/getData')
        .then((data) => data.json())
        .then((data) => {
           
            console.log("session status" + data.data)
    
            if(data.data == false){
                window.location = '../'
            }
        })

        fetch('../api/ShoppingCart')
            .then((res) => res.json())
            .then((data) => {
                setCart(data);
                const totalAmount = data.reduce((sum, item) => sum + item.price, 0);
                setTotal(totalAmount);
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });
    }, []);

    const handleBuyNow = async () => {
        try {
            const response = await fetch('/api/sendReciept', {
                method: 'POST', // Ensure method matches server endpoint
            });
    
            if (response.ok) {
                alert("Purchase successful!");
                setCart([]); // Clear local cart state
                setTotal(0);
            } else {
                const errorResponse = await response.json();
                alert(`Failed to purchase: ${errorResponse.error}`);
            }
        } catch (error) {
            console.error("Error during purchase:", error);
            alert("An error occurred while processing the purchase.");
        }
    };

    const deleteOldSession = async () => {
        const response = await fetch('/api/deleteSession');
        console.log(response);
        
        if (response.ok) {
            window.location = '/';
        } else {
            const errorResponse = await response.json();
            alert(`Failed to delete session: ${errorResponse.error}`);
        }
    }
    return (
     
        <div>
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
                </Toolbar>
            </AppBar>
          
            <Box onSubmit = {handleBuyNow}
             sx={{ p: 4, backgroundColor: '#d0f0c0', border: '2px solid #006938', color: '#000' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.length > 0 ? (
                                cart.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{item.p_name}</TableCell>
                                        <TableCell>€{item.price.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                                        Your cart is empty.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Total: €{total.toFixed(2)}
                </Typography>

                <Button
                    onClick={deleteOldSession}
                    sx={{
                        mt: 2,
                        backgroundColor: '#cd0f2a',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: '#cd0f2a',
                        },
                    }}
                >
                    Buy Now!
                </Button>
            </Box>
        </div>
       
    );
}
