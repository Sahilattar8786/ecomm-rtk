import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";


const store=configureStore({
  reducer:{
    cart:cartSlice,
    order:orderSlice
  },
})


export default store;