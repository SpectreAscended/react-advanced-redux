import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  cartOpen: false,
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    showCart(state) {
      state.cartOpen = !state.cartOpen;
    },
    addItem(state, item) {
      state.items = [...state.items, action.payload];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
