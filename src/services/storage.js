import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

function createNoopStorage() {
    return {
        getItem: () => Promise.resolve(null),
        setItem: (key, value) => Promise.resolve(value),
        removeItem: () => Promise.resolve(),
    }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

export default storage
