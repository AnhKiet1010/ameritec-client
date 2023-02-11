import { createSlice } from '@reduxjs/toolkit';

const countPendingTrans = createSlice({
    name: 'countPendingTrans',
    initialState: 0,
    reducers: {
        CHANGE_COUNT_PENDING_TRANS: (state, action) => {
            return parseInt(action.payload);
        },
    }
});

const { reducer, actions } = countPendingTrans;
export const { CHANGE_COUNT_PENDING_TRANS } = actions;
export default reducer;
