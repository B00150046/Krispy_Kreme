'use client';

import * as React from 'react'; // Namespace import for React
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
    const [cart, setCart] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        fetch('/api/ShoppingCart')
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
            const response = await fetch('/api/sendReciept');
            if (response.ok) {
                alert("Purchase successful!");
                setCart([]);
                setTotal(0);
            } else {
                const result = await response.json();
                alert(`Failed to purchase: ${result.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Checkout
                    </Typography>
                </Toolbar>
            </AppBar>

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
                onClick={handleBuyNow}
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
    );
}
