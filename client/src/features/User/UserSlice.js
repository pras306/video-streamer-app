import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    userId: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
        },
        signOut: (state) => {
            state.username = '';
            state.email = '';
            state.userId = '';
        }
    }
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;