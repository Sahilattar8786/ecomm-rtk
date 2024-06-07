import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initalState ={
    loading:false,
    data:[],
    error:""
}

// export const getProduct=()=>{
//     return async function getProductsThunk(dispatch,getState){
//         const response=await fetch("https://fakestoreapi.com/products")
//         const data=await response.json()
//         dispatch(fetchProducts(data))
//     }
// }
export const getProduct=createAsyncThunk(
    'products/get',async()=>{
        const response=await fetch("https://fakestoreapi.com/products")
        const data=await response.json()
        return data
    }
)

const product=createSlice({
    name:"product",
    initialState:initalState,
    reducers:{
        fetchProducts(state,action){
              state.data=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProduct.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
        .addCase(getProduct.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }

})

export default product.reducer;

export const {fetchProducts}=product.actions;