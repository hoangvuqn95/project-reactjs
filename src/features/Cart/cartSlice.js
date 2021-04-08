import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart_item')) || [];
  } catch (error) {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: getInitialCart(),
    promotion: 10,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const idx = state.cartItems.findIndex((x) => x.product.id === newItem.product.id);
      if (idx < 0) {
        state.cartItems.push(newItem);
      } else {
        state.cartItems[idx].quantity += newItem.quantity;
      }
    },

    removeFromCart(state, action) {
      const newItem = action.payload;
      const idx = state.cartItems.findIndex((x) => x.product.id === newItem.product.id);
      state.cartItems.splice(idx, 1);
    },

    removeAllFromCart(state, action) {},

    clearCart(state, action) {
      state.cartItems = [];
    },

    changePromotion(state, action) {
      state.promotion = action.payload;
    },
  },
});

const { reducer, actions } = cartSlice;
export const { addToCart, removeFromCart, removeAllFromCart, clearCart, changePromotion } = actions;
export default reducer;
