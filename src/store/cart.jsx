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
      console.log(state.cartOpen);
      state.cartOpen = !state.cartOpen;
      console.log(state.cartOpen);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
