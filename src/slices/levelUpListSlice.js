import { createSlice } from '@reduxjs/toolkit';

const levelUpList = createSlice({
    name: 'levelUpList',
    initialState: [],
    reducers: {
        LIST_CHANGE: (state, action) => {
            return [...action.payload];
        },
    }
});

const { reducer, actions } = levelUpList;
export const { LIST_CHANGE } = actions;
export default reducer;
