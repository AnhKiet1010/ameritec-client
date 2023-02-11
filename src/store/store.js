import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import piggyReducer from "../slices/piggySlice";
import levelUpListReducer from "../slices/levelUpListSlice";
import countPendingTransReducer from "../slices/countPendingTransSlice";
import countRequestUserReducer from "../slices/countRequestUserSlice";
import notiReducer from "../slices/notiSlice";

const rootReducer = {
    auth: authReducer,
    piggy: piggyReducer,
    levelUpList: levelUpListReducer,
    countPendingTrans: countPendingTransReducer,
    countRequestUser: countRequestUserReducer,
    noti: notiReducer
};
const store = configureStore({
    reducer: rootReducer,
});

export default store;
