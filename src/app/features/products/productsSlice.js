import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (active, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/status/${active}`);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch products failed");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${productId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch product by ID failed");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    itemsStatus: "idle",
    itemsError: null,

    byId: {},
    detailStatusById: {},
    detailErrorById: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchProducts.pending, (state) => {
        state.itemsStatus = "loading";
        state.itemsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.itemsStatus = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.itemsStatus = "failed";
        state.itemsError = action.payload || action.error.message;
      })

      // detail
      .addCase(fetchProductById.pending, (state, action) => {
        const id = action.meta.arg;
        state.detailStatusById[id] = "loading";
        state.detailErrorById[id] = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const product = action.payload;
        state.byId[product.id] = product;
        state.detailStatusById[product.id] = "succeeded";
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        const id = action.meta.arg;
        state.detailStatusById[id] = "failed";
        state.detailErrorById[id] = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer; 
