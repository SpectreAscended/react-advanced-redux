import { createSlice, current } from '@reduxjs/toolkit';

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const existingItem = current(state.items).find(
        item => item.id === action.payload.id
      );

      const existingItemIndex = current(state.items).findIndex(
        item => item.id === action.payload.id
      );

      let item;

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + 1;

        item = {
          ...existingItem,
          quantity: updatedQuantity,
          total: updatedQuantity * action.payload.price,
        };
        state.items[existingItemIndex] = item;
      } else {
        item = {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: action.payload.quantity,
          total: action.payload.price * action.payload.quantity,
        };
        state.items = [...state.items, item];
      }

      state.totalAmount = state.totalAmount + 1;
    },

    removeItem(state, action) {
      const existingItem = current(state.items).find(
        item => item.id === action.payload
      );

      const existingItemIndex = current(state.items).findIndex(
        item => item.id === action.payload
      );

      let updatedItem;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload);
      } else {
        const updatedQuantity = existingItem.quantity - 1;

        state.items[existingItemIndex] = {
          ...existingItem,
          quantity: updatedQuantity,
          total: updatedQuantity * existingItem.price,
        };
      }

      state.totalAmount = state.totalAmount - 1;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
