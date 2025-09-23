import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const currenItem = {
        title: product.title,
        key: product.key,
        price: product.price,
        image: product.image.url,
      };
      console.log("currentItem", currenItem);
      const index = state.cart.findIndex((item) => item.key === currenItem.key);
      if (index === -1) {
        state.cart.push({ ...currenItem, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const currenItem = action.payload;
      const index = state.cart.findIndex((item) => item.key === currenItem.key);
      if (index !== -1) {
        if (state.cart[index].quantity === 1) {
          state.cart = state.cart.filter((item) => item.key !== currenItem.key);
        } else {
          state.cart[index].quantity -= 1;
        }
      }
    },
    resetCart:(state,action)=>{
      state.cart=[]
    }
  },
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart,resetCart } = cartSlice.actions;
