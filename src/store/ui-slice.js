import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notification: null,
    isLoading: false
  },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setNotification(state, action) {
      state.notification = null
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;