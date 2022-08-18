import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    streamName: ''
};

const streamSlice = createSlice({
    name: 'stream',
    initialState,
    reducers: {
        createStream: (state, action) => {
            state.streamName = action.payload;
        }
    }
});

export const { createStream } = streamSlice.actions;

export default streamSlice.reducer;