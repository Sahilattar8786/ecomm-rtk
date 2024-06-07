import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box,Card, CardContent, CardMedia,CardActions, Grid, Typography,Button} from '@mui/material';
import { addToCart,clearCart,removeFromCart } from '../app/cartSlice';
import { addOrder } from '../app/orderSlice';
export default function Cart() {
  const cartItems=useSelector(state =>state.cart.item) ;
  const dispatch=useDispatch();
  
  const deliveryCharge=100;
  const totalAmount=useMemo(()=>{
    return cartItems.reduce((total,item)=>total+(item.quantity*item.price),0);
  },[cartItems])

   const tax=useMemo(()=>{
    return totalAmount*0.18;
   },[cartItems])

   const grandTotal=useMemo(()=>{
    return totalAmount+tax+deliveryCharge;
   },[totalAmount,tax,deliveryCharge])

  useEffect(()=>{

  },[cartItems])

   const createOrder=()=>{
    const order = {
      products: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: totalAmount,
      tax: tax,
      deliveryCharge: deliveryCharge,
      grandTotal: grandTotal,
      orderDate: new Date().toISOString()
    };
     dispatch(addOrder(order));
     dispatch(clearCart());
   }

  return (
    <div>
      {
      cartItems && cartItems.length > 0 ? 
      <Grid container spacing={2} padding={2} >
       {
         cartItems.map((i)=>(
          <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}>
            <Card sx={{
               height:600,
               maxheight:600,
               diplay:'flex',
               flexDirection:'column',
               justifyContent:'space-between',
               overflow:'hidden',
               boxShadow:3,
               borderRadius:2,
               transition:'transform 0.2s',
               '&:hover':{
                 transform:'scale(1.05)',
               },
            }}>
              <CardMedia
              component="img"
              alt="product img"
              height="250"
              image={i.image}
              sx={{
                 width:250,
                 height:250,
                 objectFit:'cover',
                 alignSelf:'center',
                 margin:5,
 

              }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {i.title}
                </Typography>
                <Typography variant='body2' color="text.secondary" sx={{ maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {i.description}
                </Typography>
                <Typography variant='subtitle'>Price: {i.price}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', marginBottom: 5 }}>
                <Button
                  size='small'
                  variant="contained"
                  color="success"
                  onClick={() => dispatch(addToCart(i))}
                >
                  +
                </Button>
                <Typography variant='body2' color="text.secondary" sx={{ maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {i.quantity}
                </Typography>
                <Button
                  size='small'
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(removeFromCart(i))}
                >
                  -
                </Button>
              </CardActions>
            </Card>
          </Grid>
         ))
       }
        <Box mt={3} m={5} sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}}>
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Amount: ₹ {totalAmount}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Delivery Charge : ₹{deliveryCharge}
      </Typography>
      <Typography variant="body1" gutterBottom>
        GST : ₹{tax}
      </Typography>
      <Typography variant='h6' gutterBottom>
        Total Payable : ₹ {grandTotal.toFixed(2)}
      </Typography>
      <Button variant='contained' color='success' 
       onClick={()=>createOrder()} 
      >
        Make Order
      </Button>
    </CardContent>
  </Card>
</Box>

      </Grid> : "Please Add Items To Cart" }
    </div>
  )
}
