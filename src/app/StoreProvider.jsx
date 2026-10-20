'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { makeStore } from '@/services/store';

function StoreProvider({ children }) {
    const [store] = useState(makeStore)

    useEffect(() => {
        persistStore(store)
    }, [store])

    return <Provider store={store}>{children}</Provider>
}
export default StoreProvider
