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
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalAmount++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          total: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + newItem.price;
      }
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
