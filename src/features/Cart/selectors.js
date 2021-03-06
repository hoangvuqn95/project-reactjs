import { createSelector } from 'reselect';

export const cartItemsSelector = (state) => state.cart.cartItems;
export const promotionSelector = (state) => state.cart.promotion;

export const itemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

export const cartTotalAmount = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
);

// quantity: so luong
