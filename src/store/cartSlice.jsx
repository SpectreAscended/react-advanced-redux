import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: [],
  totalAmount: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(item => item.id === newItem.id);

      state.totalAmount++;
      state.changed = true;

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
      const id = action.payload;

      const existingItem = state.items.find(item => item.id === id);

      state.totalAmount--;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
    },
  },
});

// Thunk - A function that delays an action until later.
// An action creater function that does NOT return the action itself but another function which eventually returns the action

// You CANNOT have asynchronous code, or code the creates a side effect inside of a reducer.  We can, however, write one outside of the reducer within our slice.

// When using redux toolkit we CAN pass a function that returns another function as an action.  This is built into redux when using redux toolkit.

// export const sendCartData = cart => {
//   return async dispatch => {
//     dispatch(
//       uiActions.showNotification({
//         status: 'pending',
//         title: 'Sending...',
//         message: 'Sending cart data',
//       })
//     );

//     const sendRequest = async () => {
//       const res = await fetch(
//         'https://react-redux-f738e-default-rtdb.firebaseio.com/cart.json',
//         {
//           method: 'PUT',
//           body: JSON.stringify(cart),
//           headers: {
//             'Content-type': 'application/json',
//           },
//         }
//       );

//       if (!res.ok) throw new Error('Sending cart data failed.');
//     };

//     try {
//       await sendRequest();

//       dispatch(
//         uiActions.showNotification({
//           status: 'success',
//           title: 'Success',
//           message: 'Sent cart data successfully',
//         })
//       );
//     } catch (err) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           tittle: 'Error.',
//           message: 'Sending cart data failed',
//         })
//       );
//     }
//   };
// };

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
