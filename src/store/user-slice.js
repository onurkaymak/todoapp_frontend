import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        token: null,
        expirationTime: null,
        isLoggedIn: false
    },
    reducers: {
        login(state, action) {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.expirationTime = action.payload.remainingTime;
        },
        logout(state) {
            state.token = null;
            state.expirationTime = null;
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;


// const userIsLoggedIn = !!token;