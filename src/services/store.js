import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import product from './slice'
import storage from './storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['selectedCategory', 'shopSorting', 'wishListSorting', 'cartList', 'theme', 'previewParent', 'wishList'],
}

const persistedReducer = persistReducer(persistConfig, product)

export function makeStore() {
    return configureStore({
        reducer: {
            product: persistedReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    })
}
