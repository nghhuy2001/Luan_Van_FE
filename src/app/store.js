import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import supplierReducer from "./features/supplier/supplierSlice";

export const store = configureStore({
    reducer: {
        products : productsReducer,
        suppliers: supplierReducer,
    },
});


