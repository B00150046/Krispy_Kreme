import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Box } from '@mui/material';

export default function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Fetch cart data
    useEffect(() => {
        fetch('/api/ShoppingCart')
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched cart:", data); // Debug log
                setCart(data);
                const totalAmount = data.reduce((sum, item) => sum + item.price, 0);
                setTotal(totalAmount);
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });
    }, []);

    // Handle Buy Now
    const sendReciept = () => {
        alert("Thank you for your purchase!");
        // Add your API call for order processing here
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Checkout
            </Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart && cart.length > 0 ? (
                            cart.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>{item.item_name}</TableCell>
                                    <TableCell>€{item.price.toFixed(2)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                                    Your cart is empty. Add some items to proceed.
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
                onClick={sendReciept}
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
