import { createSlice } from '@reduxjs/toolkit';

const countRequestUser = createSlice({
    name: 'countRequestUser',
    initialState: 0,
    reducers: {
        CHANGE_COUNT_REQUEST_USER: (state, action) => {
            return parseInt(action.payload);
        },
    }
});

const { reducer, actions } = countRequestUser;
export const { CHANGE_COUNT_REQUEST_USER } = actions;
export default reducer;
