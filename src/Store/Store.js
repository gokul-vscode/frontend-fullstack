import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "../../src/CartSlice/CartSlice";
import userReducer  from '../../src/CartSlice/UserSlice'

const store = configureStore({
  reducer: {
    cart: cartreducer,
    user: userReducer, 
  },
});

export default store;
