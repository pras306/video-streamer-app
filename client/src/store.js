import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/User/UserSlice';
import streamReducer from './features/Stream/StreamSlice';

const authMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem('state', JSON.stringify(getState()));
        return result;
    }
};

const loadState = () => {
    if(localStorage.getItem('state') !== null) {
        return JSON.parse(localStorage.getItem('state'));
    }
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        stream: streamReducer
    },
    preloadedState: loadState(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
});