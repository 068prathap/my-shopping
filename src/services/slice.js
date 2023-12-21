import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sorting:'',
    selectedCategory:'All',
    productsList:[],
    cartList:[],
}

export const counterSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSorting:(state,value)=>{
            state.sorting=value.payload
        },
        setSelectedCategory:(state,value)=>{
            state.selectedCategory=value.payload
        },
        setProductsList:(state,value)=>{
            state.productsList=value.payload
        },
        addCart:(state,value)=>{
            state.cartList.push(value.payload)
        },
    },
})

export const { setSorting, setSelectedCategory, setProductsList, addCart } = counterSlice.actions

export default counterSlice.reducer