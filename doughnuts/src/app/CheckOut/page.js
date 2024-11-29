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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container, Icon, Table, TableContainer, TableHead } from '@mui/material';


export default function DoughnutApp() {

const [order, setOrders] = useState([])




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
    
  
    
    fetch('/api/getCart')
    .then((order) => order.json())
    .then((order) => {
        setOrders(order)
    })
}, [])

let total = 0;
 //____________________________________________________________________________________
//PAGES FOR MULTI-PAGE APP
    const [showCart, setShowCart] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showCheckOut, setShowCheckout] = useState(true);

    
   

    function handleCart() {
;
        setShowCart(true);
        setShowProducts(false);
        setShowCheckout(false)
    }
    function handleProducts() {

        setShowCart(false);
        setShowProducts(true);
        setShowCheckout(false)
    }
    function handleCheckOut() {
        setShowRegister(false);
        setShowCart(false);
        setShowProducts(false);
        setShowCheckout(true)
    } 


    order.map((item, i) => (


           total = total + item.price
    
      ))

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
                
                    </div>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
               
            </Container>
         


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
                                 <tbody>
                                      {cart.map((item, i) => (
                                        <tr key={i}>
                                             <td>{item.item_name}</td>
                                             <td>{item.price}</td>
                                        </tr>
                                      ))}
                                 </tbody>
                            </Table>
                          </TableContainer>

                
                   </div>
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
                        onClick={handleCheckOut}
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
            {showCheckOut && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    This could be the checkout page!

                    <TableContainer>
                            <Table>
                                 <TableHead>
                                      <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                      </tr>
                                 </TableHead>
                                 <tbody>
                                      {
                                      
                                      order.map((item, i) => (


                                        <tr key={i}>
                                             <td>{item.item_name}</td>
                                             <td>{item.price}</td>
                                        </tr>
                                      ))

                                      }


                                 </tbody>
                            </Table>
                          </TableContainer>

                          The order total is  {total.toFixed(2)}

                </Box>
            )}
        </Box>
    );
}
