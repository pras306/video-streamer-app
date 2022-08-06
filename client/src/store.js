import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/User/UserSlice';

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
        user: userReducer
    },
    preloadedState: loadState(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
});