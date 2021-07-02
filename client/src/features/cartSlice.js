import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  searchTerm: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );
      const newCart = [...state.cart];
      newCart.splice(index, 1);
      state.cart = newCart;
    },
    updateQuantity: (state, action) => {
      console.log(action.payload);
      var str = JSON.stringify(state.cart);
      var array = JSON.parse(str);
      var index = array.findIndex((item) => {
        return item.id === action.payload.id;
      });
      array[index].quantity = action.payload.quantity;
      state.cart = array;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, setSearchTerm } =
  cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectSearchTerm = (state) => state.cart.searchTerm;

export default cartSlice.reducer;
