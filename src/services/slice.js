import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sorting: '',
    selectedCategory: 'All',
    productsList: [],
    cartList: [],
    theme: 'light',
    previewParent: '',
    wishList:[],
}

export const counterSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSorting: (state, value) => {
            state.sorting = value.payload
        },
        setSelectedCategory: (state, value) => {
            state.selectedCategory = value.payload
        },
        setProductsList: (state, value) => {
            state.productsList = value.payload
        },
        addCart: (state, value) => {
            value.payload.count = 1;
            value.payload.totalPrice = 1 * value.payload.price
            state.cartList.push(value.payload)
        },
        removeCart: (state, { payload }) => {
            const index = state.cartList.findIndex(obj => {
                return obj.id === payload
            });
            if (index >= 0) {
                state.cartList.splice(index, 1)
            }
        },
        sortCart: (state, { payload }) => {
            state.cartList = payload
        },
        changeTheme: (state, { payload }) => {
            state.theme = payload
        },
        setPreviewParent: (state, { payload }) => {
            state.previewParent = payload
        },
        changeCartCount: (state, { payload }) => {
            const index = state.cartList.findIndex(obj => {
                return obj.id === payload.id
            });
            if(!/[^0-9]/.test(payload.value) && payload.value>0 && payload.value<=100)
            {
                state.cartList[index].count = payload.value;
                state.cartList[index].totalPrice = state.cartList[index].count * state.cartList[index].price
            }
        },
        addWishList: (state, value) => {
            state.wishList.push(value.payload)
        },
        removeWishList: (state, { payload }) => {
            const index = state.wishList.findIndex(obj => {
                return obj.id === payload
            });
            // if (index >= 0) {
            //     state.cartList.splice(index, 1)
            // }
            state.wishList.splice(index, 1)
        },
        sortWishList: (state, { payload }) => {
            state.wishList = payload
        },
    },
})

export const { setSorting, setSelectedCategory, setProductsList, addCart, removeCart, sortCart, changeTheme, setPreviewParent, changeCartCount, addWishList, removeWishList, sortWishList } = counterSlice.actions

export default counterSlice.reducer 