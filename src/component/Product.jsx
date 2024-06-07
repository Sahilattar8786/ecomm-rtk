import { Button, Card, CardActions, CardContent, CardMedia, Divider, Stack, Typography ,Grid  } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectCartCount } from '../app/cartSlice'
import { getProduct } from '../app/productSlice'

export default function Product() {

  const products=useSelector(state=>state.product.data); 
  const dispatch=useDispatch()

  const AddTocart=(product)=>{
    console.log(product)
    dispatch(addToCart(product))
   
  }
  useEffect(()=>{
     //api call
       dispatch(getProduct())
  },[]) 
  console.log("Products Called",products);
  const cartcount=useSelector(selectCartCount)
  return (
    <Grid container spacing={2} padding={2}>
    {products.map((data) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
        <Card sx={{
          height:600,  
          maxHeight: 600,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          boxShadow: 3,
          borderRadius: 2,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}>
          <CardMedia
            component="img"
            alt="product img"
            height="250"
            image={data.image}
            sx={{ width: 250, height: 250, objectFit: 'cover', alignSelf: 'center', margin:5  }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {data.title}
            </Typography>
            <Typography variant='body2' color="text.secondary" sx={{ maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {data.description}
            </Typography>
            <Typography variant='subtitle'>Price :{data.price}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' ,marginBottom:5 }}>
            <Button 
              size='small'
              variant="contained"
              color="primary"
              onClick={()=>AddTocart(data)}
              >
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
  )
}
