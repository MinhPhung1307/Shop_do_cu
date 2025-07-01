import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: null,
};

export const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    resetProducts: (state) => {
      state.products = [];
      state.selectedProduct = null;
    },
  },
});

export const { setProducts, setSelectedProduct, resetProducts } =
  productSlide.actions;

export default productSlide.reducer;
