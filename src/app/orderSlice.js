import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "./cartSlice";
import { useDispatch } from "react-redux";




const createOrder=createSlice({
    name:"order",
    initialState:[],
    reducers:{
        addOrder:(state,action)=>{
            state.push(action.payload)
        },
        cancelOrder:(state,action)=>{
            state.splice(action.payload,1)
        }


    },
})


export default createOrder.reducer;
export const {addOrder,cancelOrder}=createOrder.actions;