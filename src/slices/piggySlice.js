import { createSlice } from '@reduxjs/toolkit';

const piggy = createSlice({
    name: 'piggy',
    initialState: 0,
    reducers: {
        CHANGE: (state, action) => {
            return parseInt(action.payload);
        },
    }
});

const { reducer, actions } = piggy;
export const { CHANGE } = actions;
export default reducer;
