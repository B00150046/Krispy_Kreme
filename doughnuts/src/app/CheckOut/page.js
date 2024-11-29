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
   
    const [showCheckOut, setShowCheckout] = useState(true);


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
         
            
            {showCheckOut && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    
                   

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
