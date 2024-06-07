import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";


const store=configureStore({
  reducer:{
    cart:cartSlice,
    order:orderSlice,
    product:productSlice
  },
})


export default store;