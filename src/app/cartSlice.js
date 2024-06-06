import { createSlice } from "@reduxjs/toolkit";

const initialState={
    item:[]
}

const cart=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const  existingItemIndex = state.item.findIndex(item=>item.id ===action.payload.id)
            if(existingItemIndex !==-1){
                state.item[existingItemIndex].quantity+=1
            }
            else{
                state.item.push({
                    ...action.payload,
                    quantity:1
                })
            }
        },
        removeFromCart:(state,action)=>{
            const existingItemIndex=state.item.findIndex(item=>item.id ===action.payload.id);
            if(existingItemIndex !=-1){
           if(state.item[existingItemIndex].quantity >1){
            state.item[existingItemIndex].quantity-=1
           }
           else{
             state.item.splice(existingItemIndex,1)
           }
        }
     }
    }

})

export const selectCartCount = (state) => state.cart.item.length;
export const {addToCart ,removeFromCart}=cart.actions
export default cart.reducer;
