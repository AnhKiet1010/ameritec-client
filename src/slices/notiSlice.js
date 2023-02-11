import { createSlice } from '@reduxjs/toolkit';

const noti = createSlice({
    name: 'noti',
    initialState: 0,
    reducers: {
        COUNT_NOTI_CHANGE: (state, action) => {
            return parseInt(action.payload);
        },
    }
});

const { reducer, actions } = noti;
export const { COUNT_NOTI_CHANGE } = actions;
export default reducer;
