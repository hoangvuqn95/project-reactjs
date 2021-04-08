import productReducer from 'features/Product/productSlice';
import userReducer from './userSlice';
import cartReducer from 'features/Cart/cartSlice';

const rootReducer = {
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
};

export default rootReducer;
