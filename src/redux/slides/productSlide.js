import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchproduct: [],
  selectedProduct: null,
};

export const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // lưu danh sách sản phẩm search
    setSearchProducts: (state, action) => {
      state.searchproduct = action.payload;
    },
    // lưu 1 sản phẩm để xem chi tiết
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    resetProducts: (state) => {
      state.products = [];
      state.selectedProduct = null;
    },
  },
});

export const { setProducts, setSearchProducts, resetProducts } =
  productSlide.actions;

export default productSlide.reducer;
