import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartOpen: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    showCart(state) {
      state.cartOpen = !state.cartOpen;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
