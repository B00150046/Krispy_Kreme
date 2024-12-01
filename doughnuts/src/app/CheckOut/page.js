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
import { Container, Table, TableContainer, TableHead } from '@mui/material';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function DoughnutApp() {
    const [data, setData] = useState([])
    const [order, setOrders] = useState([]);
    const [showCheckOut, setShowCheckout] = useState(true);

    useEffect(() => {
        fetch('/api/getCart')
            .then((res) => res.json())
            .then((data) => {
                setOrders(data); // Assuming API returns an array of cart items
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });
    }, []);

    // Calculate total
    const total = order.reduce((acc, item) => acc + item.price, 0);

    // Define `sendReciept` function
    const sendReciept = () => {
        alert("Receipt sent! Total: €" + total.toFixed(2));
        // You can add logic here to call an API endpoint for processing the order
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Menu Bar */}
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
                            sx={{ textAlign: "center" }}
                        />
                    </Typography>
                    <Button
                        sx={{
                            color: '#355746',
                            fontWeight: 'bold',
                            '&:hover': {
                                color: '#fff',
                            },
                        }}
                    >
                        Products
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Main Container */}
            <Container component="main" maxWidth="md">
                {showCheckOut && (
                    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{item.item_name}</TableCell>
                                            <TableCell>€{item.price.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Order Total: €{total.toFixed(2)}
                        </Typography>

                        <Button
                            onClick={sendReciept}
                            variant="contained"
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
                            Buy Now
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
