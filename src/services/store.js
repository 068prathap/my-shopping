import { configureStore } from '@reduxjs/toolkit'
import product from './slice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import { Tuple } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['selectedCategory', 'sorting', 'cartList', 'theme', 'previewParent', 'wishList', 'modalOpen'],
}

const persistedReducer = persistReducer(persistConfig, product)

export const store = configureStore({
    reducer: {
        product: persistedReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: () => new Tuple(thunk)
})

export const persistor = persistStore(store)